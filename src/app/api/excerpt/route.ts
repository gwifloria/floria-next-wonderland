import { NextRequest, NextResponse } from "next/server";
import Excerpt from "@/models/Excerpt";
import dbConnect from "@/utils/dbConnect";

// GET /api/excerpt?type=list
export async function GET(request: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  switch (type) {
    case "list":
      try {
        const documents = await Excerpt.find({});
        const data = documents.map((doc: any) => {
          const { _id, _doc } = doc;
          return { id: _id, ..._doc };
        });
        return NextResponse.json({ blogs: data });
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    default:
      return NextResponse.json({ error: "Invalid GET type" }, { status: 400 });
  }
}

// POST /api/excerpt with { action: "upload" | "delete" | "edit", ... }
export async function POST(request: NextRequest) {
  await dbConnect();
  const body = await request.json();
  const { action } = body;

  switch (action) {
    case "upload": {
      const { bookName, content } = body;
      if (!bookName || !content) {
        return NextResponse.json(
          { error: "please complete the required info" },
          { status: 401 },
        );
      }
      try {
        const excerpt = new Excerpt({ bookName, content });
        await excerpt.save();
        return NextResponse.json({ message: "success" });
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    case "delete": {
      const { id } = body;
      if (!id) {
        return NextResponse.json(
          { error: "please complete id" },
          { status: 401 },
        );
      }
      try {
        await Excerpt.findOneAndDelete({ _id: id });
        return NextResponse.json({ message: "success" });
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    case "edit": {
      const { id, content } = body;
      if (!id) {
        return NextResponse.json(
          { error: "please complete id" },
          { status: 401 },
        );
      }
      try {
        await Excerpt.updateOne({ _id: id }, { $set: { content } });
        return NextResponse.json({ message: "success" });
      } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    default:
      return NextResponse.json(
        { error: "Invalid POST action" },
        { status: 400 },
      );
  }
}
