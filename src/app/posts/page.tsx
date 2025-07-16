import { MDXRemote } from "next-mdx-remote/rsc";
import { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export default async function PostPage() {
  const filePath = path.join(process.cwd(), "src/app/posts/content/demo.md");
  const rawContent = readFileSync(filePath, "utf-8");
  const { content, data } = matter(rawContent);
  console.log(content, data);

  return (
    <div className="max-w-3xl mx-auto my-12 bg-white rounded-2xl shadow-lg p-8">
      {data.title && (
        <h1 className="text-3xl font-bold mb-6 text-center">{data.title}</h1>
      )}
      <article className="prose prose-lg">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
