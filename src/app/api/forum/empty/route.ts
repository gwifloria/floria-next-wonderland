// app/api/forum/empty/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lab/lib/mongoose";
import Message from "../models/Message";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    await Message.deleteMany({});
    return NextResponse.json(
      { message: "All messages deleted successfully" },
      { status: 200 },
    );
  } catch (err) {
    console.error("[messages:empty]", err);
    return NextResponse.json(
      { error: "Failed to delete all messages" },
      { status: 500 },
    );
  }
}
