"use client";
import matter from "gray-matter";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import useSWR from "swr";
import { BlogSkeleton, EmptyState } from "./BlogSkelton";
import { CommitMeta, CONTAINER_CLASS, dtf, PROSE_CLASS } from "./constants";
import { mdxComponents } from "./mdxComponents";
import { useTableOfContents } from "./useToc";
import { textFetcher } from "./util";

export function MarkdownWrapper({ path }: { path?: string | null }) {
  const activePath = path ?? null;
  const encoded = activePath ? encodeURIComponent(activePath) : null;

  // Content & meta via SWR
  const { data: rawContent, error } = useSWR(
    encoded ? `/api/github/content?path=${encoded}` : null,
    textFetcher,
  );
  const { data: info } = useSWR<CommitMeta>(
    encoded ? `/api/github/commit?path=${encoded}` : null,
  );

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
      <div
        ref={scrollerRef}
        className={
          "overflow-auto pb-20 h-full md:grid md:grid-cols-[1fr,14rem] md:gap-8"
        }
      >
        <div ref={containerRef} className={CONTAINER_CLASS}>
          <article className={PROSE_CLASS}>
            {info?.updatedAt && (
              <div className="mb-4 text-xs text-neutral-500">
                最后更新：{dtf.format(new Date(info.updatedAt))}
              </div>
            )}
            <ReactMarkdown
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
              components={mdxComponents}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
        {Toc}
      </div>
    </>
  );
}

export default MarkdownWrapper;
