import { NextRequest, NextResponse } from "next/server";
import WhisperEntry from "@/app/api/models/WhisperEntry";
import dbConnect from "@/app/api/lib/mongoose";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // 删除所有 whisper 记录
    const result = await WhisperEntry.deleteMany({ source: "whisper" });

    return NextResponse.json({
      success: true,
      message: "所有 whisper 记录已清空",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error clearing whisper entries:", error);
    return NextResponse.json(
      {
        error: "Failed to clear entries",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST to clear." },
    { status: 405 },
  );
}
