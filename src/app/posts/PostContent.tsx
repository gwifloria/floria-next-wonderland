"use client";

import { useClientSWR } from "@/api/useClientSWR";
import ReactMarkdown from "react-markdown";
import { EmptyState, PostSkeleton } from "./PostSkelton";

export function PostContent({ id }: { id?: string | null }) {
  const { data, isLoading } = useClientSWR<{ title: string; content: string }>(
    id ? `/floria-service/markdown/${id}` : null,
  );

  if (!id) {
    return <EmptyState />;
  }

  if (isLoading || !data) {
    return <PostSkeleton />;
  }

  return (
    <div className="transition-all duration-200 ease-in-out">
      <article className="prose">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </article>
    </div>
  );
}
