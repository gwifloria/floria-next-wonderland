"use client";

import { ThreadApi, MailMessageApi } from "@/types/letter";
import useSWR from "swr";

interface LetterDetailResponse {
  thread: ThreadApi;
  messages: MailMessageApi[];
}

export function useLetterDetail(threadId: string | null) {
  const { data, error, mutate } = useSWR<LetterDetailResponse>(
    threadId ? ["/api/letters/detail", { threadId }] : null,
    ([url, body]) =>
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => res.json()),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    thread: data?.thread,
    messages: data?.messages,
    loading: !error && !data,
    error,
    refetch: mutate,
  };
}
