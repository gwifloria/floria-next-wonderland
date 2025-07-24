"use client";

import { useSWR } from "@/api/useFetch";

interface MarkdownFile {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export function useMarkdown() {
  const { data, error, isLoading } = useSWR<{ data: MarkdownFile[] }>(
    "/floria-service/markdown/list",
  );

  return {
    data: data?.data || [],
    isLoading,
    error,
  };
}
