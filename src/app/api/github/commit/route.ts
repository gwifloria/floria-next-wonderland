import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // always run on server
export const revalidate = 3600; // cache responses for 1h

// GET /api/github/commit?path=<dir/file.md>
// Returns the latest commit info for a given file in your private GitHub repo
// Shape: { updatedAt: ISOString | null, sha: string | null, url: string | null }
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const p = searchParams.get("path");
  if (!p) return NextResponse.json({ error: "Missing ?path" }, { status: 400 });

  const owner = process.env.GITHUB_OWNER || "gwifloria";
  const repo = process.env.GITHUB_REPO || "eriko-whispers";
  const branch = process.env.GITHUB_BRANCH || "main";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN required for private repo" },
      { status: 500 },
    );
  }

  // Encode each segment to preserve '/'
  const safePath = p.split("/").map(encodeURIComponent).join("/");
  const api = `https://api.github.com/repos/${owner}/${repo}/commits?path=${safePath}&per_page=1&sha=${encodeURIComponent(branch)}`;

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
      { status: res.status },
    );
  }

  const commits = (await res.json()) as Array<any>;
  if (!Array.isArray(commits) || commits.length === 0) {
    return NextResponse.json({ updatedAt: null, sha: null, url: null });
  }

  const c = commits[0];
  const updatedAt: string | null =
    c.commit?.committer?.date || c.commit?.author?.date || null;
  const sha: string | null = c.sha || null;
  const url: string | null = c.html_url || null;

  return NextResponse.json({ updatedAt, sha, url });
}
