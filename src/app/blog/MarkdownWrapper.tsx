"use client";
import matter from "gray-matter";
import "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import { BlogSkeleton, EmptyState } from "./BlogSkelton";
import { CommitMeta } from "@/types/blog";
import { dtf, PROSE_CLASS } from "./constants";
import { mdxComponents } from "./mdxComponents";
import { useTableOfContents } from "./useToc";
import { textFetcher } from "./util";

export function MarkdownWrapper({ path }: { path?: string | null }) {
  const activePath = path ?? null;
  const encoded = activePath ? encodeURIComponent(activePath) : null;

  // Content & meta via SWR
  const { data: contentResponse, error } = useSWR(
    encoded ? `/api/posts/content?path=${encoded}` : null,
    (url: string) => fetch(url).then((res) => res.json()),
  );
  const { data: info } = useSWR<CommitMeta>(
    encoded ? `/api/posts/metadata?path=${encoded}` : null,
  );

  const rawContent = contentResponse?.content;

  // Parse front-matter
  const { content } = matter(rawContent ?? "");

  // TOC collection (optional)
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const Toc = useTableOfContents(containerRef, scrollerRef);

  // Guard: no active file selected
  if (!activePath) return <EmptyState />;

  // Loading & error states
  if (!rawContent && !error) return <BlogSkeleton />;
  if (error)
    return <div className="text-sm text-red-600">Error loading content.</div>;

  return (
    <>
      <div ref={containerRef} className={"h-full flex w-full"}>
        <div ref={scrollerRef} className="overflow-auto min-w-0 mr-16">
          <article className={PROSE_CLASS}>
            {info?.updatedAt && (
              <div className="mb-4 text-xs text-neutral-500">
                最后更新：{dtf.format(new Date(info.updatedAt))}
              </div>
            )}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypePrism]}
              components={mdxComponents}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
        <div className="hidden lg:block">{Toc}</div>
      </div>
    </>
  );
}

export default MarkdownWrapper;
