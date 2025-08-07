"use client";

import { useSWR, useSWRMutation } from "@/api/useFetch";

interface MarkdownFile {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export function useMarkdown() {
  const {
    data,
    error,
    isLoading: isListLoading,
    mutate: getMarkdownList,
  } = useSWR<{ data: MarkdownFile[] }>("/floria-service/markdown/list");

  const { trigger: deletePost } = useSWRMutation(
    "/floria-service/markdown/delete",
    {
      method: "POST",
    },
  );

  const { trigger: addPost, isMutating: isPosting } = useSWRMutation(
    "/floria-service/markdown/add",
    {
      method: "POST",
    },
  );

  return {
    data: data?.data || [],
    isListLoading,
    error,
    deletePost,
    getMarkdownList,
    addPost,
    isPosting,
  };
}
