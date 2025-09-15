import {
  MailMessageApi,
  MailMessageCore,
  ThreadApi,
  ThreadCore,
  WithDbId,
} from "@/types/letter";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/mongoose";
import MailMessage from "../../models/MailMessage";
import Thread from "../../models/Thread";

// GET /api/letters/[threadId]
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ threadId: string }> },
) {
  try {
    await dbConnect();

    const { threadId } = await ctx.params;
    if (!threadId) {
      return NextResponse.json({ error: "threadId required" }, { status: 400 });
    }

    const threadDoc = await Thread.findById(threadId)
      .select({
        _id: 1,
        subject: 1,
        participants: 1,
        firstAt: 1,
        updatedAt: 1,
        messageCount: 1,
      })
      .lean<WithDbId<ThreadCore>>();

    if (!threadDoc) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    const msgDocs = await MailMessage.find({ threadId })
      .sort({ sentAt: 1 })
      .lean<WithDbId<MailMessageCore>[]>();

    const thread: ThreadApi = {
      id: String(threadDoc._id),
      subject: threadDoc.subject || "",
      participants:
        threadDoc.participants?.map((p) => ({
          name: p.name ?? null,
          address: p.address ?? "",
        })) || [],
      firstAt: threadDoc.firstAt
        ? new Date(threadDoc.firstAt).toISOString()
        : null,
      updatedAt: threadDoc.updatedAt
        ? new Date(threadDoc.updatedAt).toISOString()
        : null,
      messageCount: threadDoc.messageCount ?? (msgDocs?.length || 0),
    };

    const messages: MailMessageApi[] = (msgDocs || []).map((m) => ({
      id: String(m._id),
      threadId: m.threadId,
      from: {
        name: m.from?.name ?? null,
        address: m.from?.address ?? "",
      },
      to: (m.to || []).map((p) => ({
        name: p.name ?? null,
        address: p.address ?? "",
      })),
      sentAt: new Date(m.sentAt).toISOString(),
      subject: m.subject || "",
      bodyPreview: m.bodyPreview || "",
      html: m.html || "",
      attachments: m.attachments || [],
    }));

    return NextResponse.json({ thread, messages });
  } catch (error) {
    console.error("[letters/:threadId] fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch thread detail" },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
