import { NextResponse } from "next/server";

// Always run on server, don't statically cache the route file itself
export const dynamic = "force-dynamic";
export const revalidate = 3600; // cache directory listings for 1 hour

// GET /api/gh/list?dir=<folder>
// Returns a simplified list of files under a folder in a private GitHub repo
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dir = searchParams.get("dir");
  if (!dir) {
    return NextResponse.json({ error: "Missing ?dir" }, { status: 400 });
  }

  const owner = process.env.GITHUB_OWNER || "gwifloria";
  const repo = process.env.GITHUB_REPO || "eriko-whispers";
  const branch = process.env.GITHUB_BRANCH || "main";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN required for private repo" },
      { status: 500 }
    );
  }

  // Encode each path segment to preserve '/'
  const safe = dir.split("/").map(encodeURIComponent).join("/");
  const api = `https://api.github.com/repos/${owner}/${repo}/contents/${safe}?ref=${encodeURIComponent(branch)}`;

  const res = await fetch(api, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `GitHub API ${res.status}`, url: api },
      { status: res.status }
    );
  }

  const items = (await res.json()) as Array<{
    name: string;
    path: string;
    type: string;
  }>;

  // Only return md/mdx files; normalize the shape
  const files = items
    .filter((i) => i.type === "file" && /\.(md|mdx)$/i.test(i.name))
    .map((i) => ({ name: i.name, path: i.path, type: i.type }));

  return NextResponse.json(files);
}
