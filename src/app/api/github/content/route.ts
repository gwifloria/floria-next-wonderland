import { NextResponse } from "next/server";

export const revalidate = 0; // always dynamic; do not statically cache
export const dynamic = "force-dynamic";

/**
 * GET /api/github/content?path=<dir/file.md>
 * Returns raw markdown/text from a private GitHub repository using the
 * Contents API with Accept: application/vnd.github.raw.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const p = searchParams.get("path");
    if (!p) {
      return NextResponse.json({ error: "Missing ?path" }, { status: 400 });
    }

    const owner = process.env.GITHUB_OWNER || "gwifloria";
    const repo = process.env.GITHUB_REPO || "eriko-whispers";
    const branch = process.env.GITHUB_BRANCH || "main";
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          error:
            "GITHUB_TOKEN is required on the server for private repo access. Set it in your environment.",
        },
        { status: 500 },
      );
    }
    // Encode each path segment to preserve '/'
    const safe = p.split("/").map(encodeURIComponent).join("/");
    const api = `https://api.github.com/repos/${owner}/${repo}/contents/${safe}?ref=${encodeURIComponent(
      branch,
    )}`;
    console.log(api);

    const res = await fetch(api, {
      headers: {
        Accept: "application/vnd.github.raw",
        Authorization: `Bearer ${token}`,
      },
      // Short revalidate to reduce API hits while keeping content fresh
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API ${res.status}`, url: api },
        { status: res.status },
      );
    }

    const text = await res.text();
    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
