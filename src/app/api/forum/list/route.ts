// app/api/forum/list/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lab/lib/mongoose";
import Message, { IMessage } from "../models/Message"; // 调整路径根据你的项目结构

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 50);
    const before = searchParams.get("before")
      ? Number(searchParams.get("before"))
      : null;
    const q = searchParams.get("q")?.trim() || "";

    const filter: any = { deletedAt: { $exists: false } };
    if (!Number.isNaN(before) && !!before && before > 0) {
      filter.createdAt = { $lt: before };
    }
    if (q) {
      // simple case-insensitive search on raw HTML; escape regex specials
      const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.content = { $regex: esc, $options: "i" };
    }

    const messages = await Message.find(filter, "content createdAt")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<IMessage[]>();
    const data = messages.map((msg) => ({
      ...msg,
      id: msg._id.toString(),
    }));

    return NextResponse.json(data);
  } catch (err) {
    console.error("[messages:list]", err);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}
