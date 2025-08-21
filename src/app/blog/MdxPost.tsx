import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { readFileSync } from "node:fs";

type MdxPostProps = {
  filePath: string;
};
export async function MdxPost({ filePath }: MdxPostProps) {
  const rawContent = readFileSync(filePath, "utf-8");
  const { content, data } = matter(rawContent);
  return (
    <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-lg px-6 py-8">
      {data.title && (
        <h1 className="text-3xl font-bold mb-6 text-center">{data.title}</h1>
      )}
      <article className="prose prose-lg">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
