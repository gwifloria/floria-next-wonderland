import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: pathSegments } = await params;
    if (!pathSegments || pathSegments.length === 0) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const filePath = pathSegments.join("/");
    const repo = "eriko-gallery";
    const owner = process.env.GITHUB_OWNER || "gwifloria";
    const branch = process.env.GITHUB_BRANCH || "main";
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN required for private repo access" },
        { status: 401 },
      );
    }

    // Construct GitHub raw content URL for private repository
    const githubUrl = `https://api.github.com/repos/${encodeURIComponent(
      owner,
    )}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(
      filePath,
    )}?ref=${encodeURIComponent(branch)}`;

    const response = await fetch(githubUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "User-Agent": "floria-gallery",
      },
    });

    if (!response.ok) {
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status}` },
        { status: response.status },
      );
    }

    const fileData = await response.json();

    // GitHub API returns file content as base64 encoded
    if (!fileData.content || fileData.type !== "file") {
      return NextResponse.json(
        { error: "Invalid file data from GitHub" },
        { status: 404 },
      );
    }

    // Decode base64 content
    const imageBuffer = Buffer.from(fileData.content, "base64");

    // Determine content type based on file extension
    const extension = filePath.toLowerCase().split(".").pop();
    let contentType = "image/jpeg"; // default

    switch (extension) {
      case "avif":
        contentType = "image/avif";
        break;
      case "webp":
        contentType = "image/webp";
        break;
      case "png":
        contentType = "image/png";
        break;
      case "jpg":
      case "jpeg":
        contentType = "image/jpeg";
        break;
      case "gif":
        contentType = "image/gif";
        break;
      case "svg":
        contentType = "image/svg+xml";
        break;
    }

    // Return image with appropriate headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
        "Content-Length": imageBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 },
    );
  }
}
