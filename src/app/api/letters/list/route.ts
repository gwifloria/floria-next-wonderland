import { ThreadApi } from "@/types/letter";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/mongoose";
import Thread from "../../models/Thread";

// GET /api/letters/list - 线程列表（分页 + 搜索）
export async function GET(request: NextRequest): Promise<
  NextResponse<
    | {
        message: string;
        data: ThreadApi[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          pages: number;
        };
      }
    | { error: string }
  >
> {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      Math.max(1, parseInt(searchParams.get("limit") || "20", 10)),
      50,
    );

    const filter: any = {};
    if (q) {
      filter.subject = {
        $regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: "i",
      };
    }

    const cursor = Thread.find(filter)
      .sort({ updatedAt: -1 })
      .select({
        _id: 1,
        subject: 1,
        participants: 1,
        firstAt: 1,
        updatedAt: 1,
        messageCount: 1,
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const [items, total] = await Promise.all([
      cursor,
      Thread.countDocuments(filter),
    ]);

    const data = items.map((it: any) => ({
      id: typeof it._id === "string" ? it._id : String(it._id),
      subject: it.subject || "",
      participants: it.participants || [],
      firstAt: it.firstAt ? new Date(it.firstAt).toISOString() : null,
      updatedAt: it.updatedAt ? new Date(it.updatedAt).toISOString() : null,
      messageCount: it.messageCount ?? 0,
    }));

    return NextResponse.json({
      message: "Threads retrieved successfully",
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[letters/list] fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch threads" },
      { status: 500 },
    );
  }
}
