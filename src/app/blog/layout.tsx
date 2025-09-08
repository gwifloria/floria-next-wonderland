import AntDShell from "@/provider/AntDShell";
import { SWRShell } from "@/provider/SWRShell";
import React from "react";
import { Sidebar } from "./SideBar";

export default function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string[] }>;
}) {
  const resolved = React.use(params);
  const activePost = Array.isArray(resolved?.slug)
    ? resolved.slug.map(decodeURIComponent).join("/")
    : "";

  return (
    <AntDShell>
      <SWRShell>
        <div className="flex h-full pt-8">
          <div className="min-w-[300px] flex-shrink-0 rounded-2xl bg-neutral-50 border-r p-6  overflow-y-auto h-full">
            <Sidebar activePost={activePost} />
          </div>
          <div className="hidden  md:block flex-1 py-4 px-6 min-w-0 md:py-8 bg-white rounded-2xl shadow-lg h-full">
            <div className="overflow-hidden w-full h-full">{children}</div>
          </div>
        </div>
      </SWRShell>
    </AntDShell>
  );
}
