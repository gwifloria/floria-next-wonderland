// app/api/forum/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lab/lib/mongoose";
import Message from "../models/Message";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "invalid id" }, { status: 400 });
    }

    const doc = await Message.findByIdAndUpdate(id, {
      $set: { deletedAt: Date.now() },
    });

    if (!doc) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, _id: id });
  } catch (err) {
    console.error("[messages:delete]", err);
    return NextResponse.json(
      { error: "Failed to delete message" },
      { status: 500 },
    );
  }
}
