import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import matter from "gray-matter";
import { MdxPost } from "./MdxPost";

export default async function PostPage({
  searchParams,
}: {
  searchParams?: { post?: string };
}) {
  const postsDir = path.join(process.cwd(), "src/app/posts/content");

  const files = readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  // Read frontmatter for all posts
  const postMeta = files.map((file) => {
    const raw = readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      file,
      title: data.title || file.replace(/\.md$/, ""),
    };
  });

  const postFile =
    searchParams?.post && files.includes(searchParams.post)
      ? searchParams.post
      : files[0];

  const filePath = path.join(postsDir, postFile);

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-50 border-r p-8 my-12">
        <h2 className="font-bold text-lg mb-4">Posts</h2>
        <ul>
          {postMeta.map(({ file, title }) => (
            <li key={file}>
              <Link
                className={`block px-2 py-1 rounded hover:bg-mint-100 ${file === postFile ? "bg-mint-100 font-bold" : ""}`}
                href={{ pathname: "/posts", query: { post: file } }}
              >
                {title}
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
