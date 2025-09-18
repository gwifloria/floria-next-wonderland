import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// 用于 fetch 缓存选项（如果你希望 Github 请求能被 ISR 缓存）
const revalidateSeconds = 3600;

export async function GET(req: Request) {
  try {
    const repo = "eriko-gallery";
    const dir = "images";

    const owner = process.env.GITHUB_OWNER || "gwifloria";
    const branch = process.env.GITHUB_BRANCH || "main";
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN required for private repo access" },
        { status: 401 },
      );
    }

    // 构造 API（注意对路径 segment 做 encodeURIComponent）
    const api = `https://api.github.com/repos/${encodeURIComponent(
      owner,
    )}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(
      dir,
    )}?ref=${encodeURIComponent(branch)}`;

    // 不要打印 token！
    console.log("Fetching GitHub contents:", api);

    const res = await fetch(api, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        // "User-Agent": "eriko-gallery-app", // 可选
      },
      // Next fetch 缓存控制（如果需要）
      next: { revalidate: revalidateSeconds },
    });

    if (!res.ok) {
      // 如果是 403/401，提示鉴权失败；404 提示路径或分支不存在
      const status = res.status;
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `GitHub API returned ${status}`, detail: text },
        { status },
      );
    }

    const payload = await res.json();

    // GitHub /contents 对于目录返回数组，对于单文件返回对象
    const itemsArray = Array.isArray(payload) ? payload : [payload];

    // 类型安全过滤
    const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i;
    const images = itemsArray
      .filter(
        (item) =>
          item && item.type === "file" && imageExtensions.test(item.name),
      )
      .map((item) => ({
        name: item.name,
        path: item.path,
        size: item.size,
        // 使用我们的代理API而不是直接的GitHub URL
        imageUrl: `/api/github/gallery/image/${item.path}`,
        sha: item.sha,
        type: "image",
      }));

    const directories = itemsArray
      .filter((item) => item && item.type === "dir")
      .map((item) => ({
        name: item.name,
        path: item.path,
        type: "directory",
      }));

    return NextResponse.json({
      images,
      directories,
      currentPath: dir,
      repo: `${owner}/${repo}`,
      branch,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
