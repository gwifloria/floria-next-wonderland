"use client";
import { SWRShell } from "@/provider/SWRShell";
import matter from "gray-matter";
import "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/themes/prism-tomorrow.css";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import { BlogSkeleton, EmptyState } from "./BlogSkelton";
import { dtf, PROSE_CLASS } from "./constants";
import { createMarkdownComponents } from "@/components/MarkdownComponents";
import TocClient from "./TocClient";
export function MarkdownWrapperShell({
  path,
  toc = true,
  size = "default",
}: {
  path?: string | null;
  toc?: boolean;
  size?: "default" | "compact";
}) {
  return (
    <SWRShell>
      <MarkdownWrapper path={path} toc={toc} size={size}></MarkdownWrapper>
    </SWRShell>
  );
}

function MarkdownWrapper({
  path,
  toc = true,
  size = "default",
}: {
  path?: string | null;
  toc?: boolean;
  size?: "default" | "compact";
}) {
  const activePath = path ?? null;
  // Guard: no active file selected

  // Fetch content and metadata using SWR
  const { data: contentData, error: contentError } = useSWR(
    activePath
      ? `/api/posts/content?path=${encodeURIComponent(activePath)}`
      : null,
  );

  const { data: commitInfo } = useSWR(
    activePath
      ? `/api/posts/metadata?path=${encodeURIComponent(activePath)}`
      : null,
  );
  if (!activePath) return <EmptyState />;

  // Handle loading state
  if (!contentData && !contentError) {
    return <BlogSkeleton />;
  }

  // Handle error state
  if (contentError) {
    return <div className="text-sm text-red-600">Error loading content.</div>;
  }

  if (!contentData) {
    return <BlogSkeleton />;
  }

  // Parse front-matter
  const { content } = matter(contentData.content);

  return (
    <>
      <div data-markdown-container className="h-full flex w-full">
        <div
          data-markdown-scroller
          className={`overflow-auto min-w-0 ${toc ? "mr-16" : ""}`}
        >
          <article className={PROSE_CLASS}>
            {commitInfo?.updatedAt && (
              <div className="mb-4 text-xs text-neutral-500">
                最后更新：{dtf.format(new Date(commitInfo.updatedAt))}
              </div>
            )}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypePrism]}
              components={createMarkdownComponents(size)}
            >
              {content}
            </ReactMarkdown>
          </article>
        </div>
        {toc && <TocClient />}
      </div>
    </>
  );
}

export default MarkdownWrapperShell;
