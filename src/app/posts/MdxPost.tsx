import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { Spin } from "antd";
import { Suspense } from "react";
import { useSWR } from "@/api/useFetch";

export async function MdxPost(data: any) {
  const { content, title } = data;
  return (
    <div className="max-w-4xl mx-auto my-12 bg-white rounded-2xl shadow-lg px-6 py-8">
      {title && (
        <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>
      )}
      <article className="prose prose-lg">
        <MDXRemote source={content} />
      </article>
    </div>
  );
}
