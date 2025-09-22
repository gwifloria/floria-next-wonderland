import dbConnect from "@/app/api/lib/mongoose";
import BlogPost from "@/app/api/models/BlogPost";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = "ghuijue@gmail.com";

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const session = await getServerSession();
    if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Unauthorized. Admin access required." },
        { status: 403 },
      );
    }

    const { path, category, title, isPinned } = await request.json();

    // Validate required fields
    if (!path || !category || !["ByteNotes", "Murmurs"].includes(category)) {
      return NextResponse.json(
        { error: "Invalid data. Path and valid category are required." },
        { status: 400 },
      );
    }

    await dbConnect();

    // Find existing blog post or create new one
    let blogPost = await BlogPost.findOne({ path });

    if (!blogPost) {
      // Create new blog post entry
      blogPost = new BlogPost({
        path,
        title: title || path.split("/").pop()?.replace(".md", "") || "Untitled",
        category,
        isPinned: false,
        pinOrder: 0,
      });
    }

    if (isPinned && !blogPost.isPinned) {
      // Pin the post
      // Get the highest pinOrder for this category
      const maxPinOrder = await BlogPost.findOne(
        { category, isPinned: true },
        { pinOrder: 1 },
        { sort: { pinOrder: -1 } },
      );

      blogPost.isPinned = true;
      blogPost.pinOrder = (maxPinOrder?.pinOrder || 0) + 1;
      blogPost.pinnedAt = new Date();
      blogPost.pinnedBy = session.user.email;
    } else if (!isPinned && blogPost.isPinned) {
      // Unpin the post
      const oldPinOrder = blogPost.pinOrder;

      blogPost.isPinned = false;
      blogPost.pinOrder = 0;
      blogPost.pinnedAt = undefined;
      blogPost.pinnedBy = undefined;

      // Reorder other pinned posts in the same category
      await BlogPost.updateMany(
        {
          category,
          isPinned: true,
          pinOrder: { $gt: oldPinOrder },
        },
        { $inc: { pinOrder: -1 } },
      );
    }

    // Update title if provided
    if (title) {
      blogPost.title = title;
    }

    await blogPost.save();

    return NextResponse.json({
      success: true,
      data: {
        path: blogPost.path,
        title: blogPost.title,
        category: blogPost.category,
        isPinned: blogPost.isPinned,
        pinOrder: blogPost.pinOrder,
        pinnedAt: blogPost.pinnedAt,
      },
    });
  } catch (error) {
    console.error("Error updating blog post pin status:", error);
    return NextResponse.json(
      { error: "Failed to update pin status" },
      { status: 500 },
    );
  }
}
