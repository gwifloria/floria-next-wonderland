// app/api/forum/send/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lab/lib/mongoose";
import Message from "../models/Message";
import { extractPlainText, getRateLimit, sanitizeHtml } from "../util";

// Rate limiting storage (在生产环境中应使用 Redis 或数据库)

// ---- Very basic server-side HTML sanitizer (allow-list) ----

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const rateCheck = getRateLimit(ip);

  if (!rateCheck.allowed) {
    return NextResponse.json(
      { error: "Too many requests, please slow down." },
      { status: 429 },
    );
  }

  try {
    await dbConnect();

    const body = await request.json();
    const raw = typeof body?.content === "string" ? body.content : "";
    const clean = sanitizeHtml(raw);
    const plain = extractPlainText(clean);

    if (!plain) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }
    if (clean.length > 10000) {
      return NextResponse.json({ error: "Content too long" }, { status: 413 });
    }

    const doc = new Message({ content: clean, createdAt: Date.now() });
    await doc.save();

    return NextResponse.json({
      _id: doc._id,
      content: doc.content,
      createdAt: doc.createdAt,
    });
  } catch (err) {
    console.error("[messages:send]", err);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 },
    );
  }
}
