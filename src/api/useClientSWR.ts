// filepath: /Users/guihuajiu/wonderland/floria-next-wonderland/src/api/useClientSWR.ts
"use client";
import type { CustomFetchOptions } from "./useFetch";
import { useSWR } from "./useFetch";

export function useClientSWR<T>(
  key: string | null,
  config?: CustomFetchOptions,
) {
  return useSWR<T>(key, config);
}
