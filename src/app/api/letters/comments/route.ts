import { extractPlainText, sanitizeHtml } from "@/app/api/lib/htmlUtils";
import dbConnect from "@/app/api/lib/mongoose";
import Comment from "@/app/api/models/Comment";
import { CommentApi, CommentCore, WithDbId } from "@/types/letter";
import { NextRequest, NextResponse } from "next/server";

// GET /api/letters/comments - Get comments for a thread
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const threadId = searchParams.get("threadId");

    if (!threadId) {
      return NextResponse.json({ error: "threadId required" }, { status: 400 });
    }

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

    return NextResponse.json(comments);
  } catch (error) {
    console.error("[letters/comments] GET failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

// POST /api/letters/comments - Add a new comment
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { threadId, content, author } = await req.json();

    if (!threadId) {
      return NextResponse.json({ error: "threadId required" }, { status: 400 });
    }

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 },
      );
    }

    if (content.length > 10_000) {
      return NextResponse.json({ error: "Comment too long" }, { status: 413 });
    }

    const clean = sanitizeHtml(content);
    const plain = extractPlainText(content);

    if (!plain) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
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
  } catch (error) {
    console.error("[letters/comments] POST failed:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}

// DELETE /api/letters/comments - Delete a comment
export async function DELETE(req: NextRequest) {
  try {
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
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[letters/comments] DELETE failed:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
