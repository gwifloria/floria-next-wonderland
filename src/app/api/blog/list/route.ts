import dbConnect from "@/app/api/lib/mongoose";
import BlogPost from "@/app/api/models/BlogPost";
import { NextRequest, NextResponse } from "next/server";

interface GitHubFile {
  name: string;
  path: string;
  type: string;
}

interface BlogPostWithMetadata {
  name: string;
  path: string;
  isPinned: boolean;
  pinOrder: number;
  title?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category || !["ByteNotes", "Murmurs"].includes(category)) {
      return NextResponse.json(
        {
          error:
            "Invalid or missing category. Must be 'ByteNotes' or 'Murmurs'",
        },
        { status: 400 },
      );
    }

    if (!category) {
      return NextResponse.json({ error: "Missing ?category" }, { status: 400 });
    }

    const owner = process.env.GITHUB_OWNER || "gwifloria";
    const repo = process.env.GITHUB_REPO || "eriko-whispers";
    const branch = process.env.GITHUB_BRANCH || "main";

    const safe = category.split("/").map(encodeURIComponent).join("/");
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${safe}?ref=${encodeURIComponent(branch)}`;

    // Fetch files from GitHub API
    const githubResponse = await fetch(api, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!githubResponse.ok) {
      throw new Error(`GitHub API error: ${githubResponse.statusText}`);
    }

    const githubFiles: GitHubFile[] = await githubResponse.json();
    const markdownFiles = githubFiles.filter(
      (file) => file.type === "file" && file.name.endsWith(".md"),
    );

    // Connect to database and get only pinned posts for this category
    await dbConnect();
    const pinnedPosts = await BlogPost.find({
      category,
      isPinned: true,
    }).lean();

    const pinnedPostMap = new Map(pinnedPosts.map((post) => [post.path, post]));

    // Combine GitHub files with pinned post metadata
    const filesWithMetadata: BlogPostWithMetadata[] = markdownFiles.map(
      (file) => {
        const pinnedPost = pinnedPostMap.get(file.path);
        return {
          name: file.name,
          path: file.path,
          isPinned: Boolean(pinnedPost),
          pinOrder: pinnedPost?.pinOrder || 0,
          title: pinnedPost?.title || file.name.replace(".md", ""),
        };
      },
    );

    // Sort files: pinned first (by pinOrder), then unpinned (by name)
    const pinnedFiles = filesWithMetadata
      .filter((file) => file.isPinned)
      .sort((a, b) => a.pinOrder - b.pinOrder);

    const unpinnedFiles = filesWithMetadata
      .filter((file) => !file.isPinned)
      .sort((a, b) => a.name.localeCompare(b.name));

    const sortedFiles = [...pinnedFiles, ...unpinnedFiles];

    return NextResponse.json({
      success: true,
      data: sortedFiles,
      category,
    });
  } catch (error) {
    console.error("Error fetching blog list:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog list" },
      { status: 500 },
    );
  }
}
