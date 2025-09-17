import matter from "gray-matter";
import { useRef } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import useSWR from "swr";
import { textFetcher } from "../blog/util";

// Tailwind + Typography: nicer defaults for markdown
// We also override some elements to match your palette (nepal / neutral) and spacing

const mdxComponents: Components = {
  h1: ({ node, ...props }) => (
    <h1
      className="mt-2 scroll-m-20 text-2xl md:text-3xl font-bold tracking-tight text-neutral-800"
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h2
      className="mt-8 scroll-m-20 text-lg md:text-xl font-semibold tracking-tight border-b border-neutral-200/70pb-2 text-neutral-700"
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h3
      className="mt-6 scroll-m-20 text-base md:text-lg font-semibold tracking-tight text-neutral-700 "
      {...props}
    />
  ),
  p: ({ node, ...props }) => (
    <p
      className="leading-7 text-[13px] md:text-[14px] text-neutral-700"
      {...props}
    />
  ),
  a: ({ node, ...props }) => (
    <a
      className="font-medium underline-offset-4 text-nepal-600 hover:underline hover:text-nepal-500"
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul
      className="my-4 ml-6 list-disc space-y-2 marker:text-neutral-400"
      {...props}
    />
  ),
  ol: ({ node, ...props }) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 marker:text-neutral-400"
      {...props}
    />
  ),
  li: ({ node, ...props }) => (
    <li
      className="pl-1 text-[13px] md:text-[14px] text-neutral-700"
      {...props}
    />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-nepal-300/60 pl-4 text-neutral-700 bg-neutral-50/60 rounded-r"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-neutral-200" />,
};

export const GapMarkdown = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data: rawContent } = useSWR(
    `/api/github/content?path=GAP.md`,
    textFetcher,
  );
  const { content } = matter(rawContent ?? "");

  return (
    <div
      ref={containerRef}
      className="prose prose-neutral max-w-none prose-headings:scroll-mt-20 prose-a:no-underline"
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
        components={mdxComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
