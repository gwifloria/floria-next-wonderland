"use client";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function SWRShell({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={{ fetcher, refreshInterval: 3000 }}>{children}</SWRConfig>
  );
}
