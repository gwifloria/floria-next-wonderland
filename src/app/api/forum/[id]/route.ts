import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lab/lib/mongoose";
import Message from "../models/Message";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  try {
    const { id } = await context.params;
    const trimmedId = id?.trim();
    if (!trimmedId) {
      return NextResponse.json({ error: "invalid id" }, { status: 400 });
    }

    const doc = await Message.findOne(
      { _id: trimmedId, deletedAt: { $exists: false } },
      "content createdAt",
    ).lean();

    if (!doc) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json(doc);
  } catch (err) {
    console.error("[messages:get]", err);
    return NextResponse.json(
      { error: "Failed to fetch message" },
      { status: 500 },
    );
  }
}
