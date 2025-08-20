import Link from "next/link";
import { readdirSync } from "node:fs";
import path from "node:path";
import { MdxPost } from "./MdxPost";

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ post?: string }>;
}) {
  const params = await searchParams; // Next 15: searchParams is a Promise

  const postsDir = path.join(process.cwd(), "src/app/content");
  const files = readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  if (files.length === 0) {
    return (
      <div className="mx-auto max-w-2xl p-8 text-sm text-neutral-600 dark:text-neutral-300">
        <h2 className="mb-2 text-lg font-semibold">Blog</h2>
        <p>
          暂无可用文章（.md）。请在 <code>src/app/content</code> 目录下添加
          Markdown 文件。
        </p>
      </div>
    );
  }

  const postFile =
    params?.post && files.includes(params.post) ? params.post : files[0];

  const filePath = path.join(postsDir, postFile);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-50 border-r p-8 my-12">
        <h2 className="font-bold text-lg mb-4">Blog</h2>
        <ul>
          {files.map((file) => (
            <li key={file}>
              <Link
                className={`block px-3 py-2 rounded-md transition-colors text-neutral-700 hover:text-neutral-900 hover:bg-mint-100 ${
                  file === postFile
                    ? "bg-mint-100 font-semibold text-neutral-900"
                    : ""
                }`}
                href={{ pathname: "/blog", query: { post: file } }}
              >
                {file.replace(/\.md$/, "")}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 ">
        <MdxPost filePath={filePath} />
      </main>
    </div>
  );
}
