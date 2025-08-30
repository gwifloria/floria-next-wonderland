"use client";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import useSWR from "swr";
import { EmptyState, PostSkeleton } from "./PostSkelton";

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export function MdxPost({ path }: { path: string }) {
  const { data: rawContent, error } = useSWR(
    path ? `/api/github/content?path=${path}` : null,
    fetcher
  );

  const metaUrl = path
    ? `/api/github/commit?path=${encodeURIComponent(path)}`
    : null;
  const { data: info } = useSWR(metaUrl, (u) => fetch(u).then((r) => r.json()));

  const infoDiv = () =>
    info?.updatedAt && (
      <div className="mb-4 text-xs text-neutral-500">
        最后更新：
        {new Intl.DateTimeFormat(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(info.updatedAt))}
      </div>
    );

  if (!path) {
    return <EmptyState></EmptyState>;
  }

  if (error) return <div>Error loading content.</div>;
  if (!rawContent) {
    return <PostSkeleton></PostSkeleton>;
  }

  const { content, data } = matter(rawContent);
  console.log(data, content);

  return (
    <div className="max-w-5xl mx-auto bg-white transition-all duration-200 ease-in-out">
      <article className="prose prose-lg">
        <ReactMarkdown>{content}</ReactMarkdown>
        {infoDiv()}
      </article>
    </div>
  );
}
