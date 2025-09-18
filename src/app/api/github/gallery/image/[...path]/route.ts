import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * 图片代理 API
 * GET /api/github/gallery/image/[...path]
 * 代理 GitHub 私有仓库中的图片，解决 token 过期和 CORS 问题
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const imagePath = path.join("/");

    if (!imagePath) {
      return NextResponse.json({ error: "图片路径不能为空" }, { status: 400 });
    }

    const owner = process.env.GITHUB_OWNER || "gwifloria";
    const repo = "eriko-gallery";
    const branch = process.env.GITHUB_BRANCH || "main";
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "GitHub token 未配置" },
        { status: 500 },
      );
    }

    // 构造 GitHub Raw API URL（不是 Contents API）
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${imagePath}`;

    console.log(`Proxying image: ${imagePath}`);

    // 使用 GitHub token 获取图片
    const imageResponse = await fetch(rawUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "eriko-gallery-proxy",
      },
      // 不使用 Next.js 缓存，因为图片可能超过 2MB 限制
    });

    if (!imageResponse.ok) {
      console.error(
        `Failed to fetch image: ${imageResponse.status} ${imageResponse.statusText}`,
      );
      return NextResponse.json(
        { error: `图片获取失败: ${imageResponse.status}` },
        { status: imageResponse.status },
      );
    }

    // 获取图片数据
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType =
      imageResponse.headers.get("content-type") || "image/jpeg";

    // 返回图片数据，设置适当的缓存头
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // 1小时缓存
        "Content-Length": imageBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return NextResponse.json({ error: "图片代理服务错误" }, { status: 500 });
  }
}
