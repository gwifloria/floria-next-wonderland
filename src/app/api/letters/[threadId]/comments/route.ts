// src/app/api/letters/[threadId]/comments/route.ts
import { extractPlainText, sanitizeHtml } from "@/app/api/forum/util";
import dbConnect from "@/app/api/lib/mongoose";
import Comment from "@/app/api/models/Comment";
import { CommentApi, CommentCore, WithDbId } from "@/types/letter";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ threadId: string }> },
) {
  await dbConnect();
  const { threadId } = await ctx.params;
  const cmtDocs = await Comment.find({ threadId })
    .sort({ createdAt: 1 })
    .lean<WithDbId<CommentCore>[]>();

  const comments: CommentApi[] = (cmtDocs || []).map((c) => ({
    id: String(c._id),
    threadId: c.threadId,
    author: { name: c.author.name, address: c.author.address },
    content: c.content || "",
    createdAt: new Date(c.createdAt).toISOString(),
  }));

  return NextResponse.json(comments, { status: 201 });
}
export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ threadId: string }> },
) {
  await dbConnect();
  const { threadId } = await ctx.params;
  const { content, author } = await req.json();

  if (!content || typeof content !== "string") {
    return NextResponse.json(
      { error: "contentMd is required" },
      { status: 400 },
    );
  }
  if (content.length > 10_000) {
    // 10KB 级别，按需调整
    return NextResponse.json({ error: "Comment too long" }, { status: 413 });
  }

  const clean = sanitizeHtml(content);
  const plain = extractPlainText(content);

  if (!plain) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }
  if (clean.length > 10000) {
    return NextResponse.json({ error: "Content too long" }, { status: 413 });
  }
  const doc = await Comment.create({
    threadId,
    author: { name: author.name, address: author.address },
    content: clean,
  });

  const lean = await Comment.findById(doc._id).lean({ virtuals: true });
  return NextResponse.json(lean, { status: 201 });
}
export async function DELETE(req: NextRequest) {
  await dbConnect();
  const { commentId, address } = await req.json();
  if (!commentId || !address) {
    return NextResponse.json(
      { error: "Missing commentId or address" },
      { status: 400 },
    );
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  if (comment.author?.address !== address) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await Comment.deleteOne({ _id: commentId });
  return NextResponse.json({ success: true }, { status: 200 });
}
