import NotebookPaper from "@/components/NotebookPaper";
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
        <div className="flex h-full pt-8 justify-center">
          <NotebookPaper className="w-[300px] flex:1 md:flex-shrink-0 rounded-2xl  border-r p-6  overflow-y-auto h-full">
            <Sidebar activePost={activePost} />
          </NotebookPaper>
          <div className="hidden  md:block flex-1 py-4 px-6 ml-2 min-w-0 md:py-8 bg-[#fefdfc] backdrop-blur-[1px]  rounded-2xl shadow-lg h-full">
            <div className="overflow-hidden w-full h-full">{children}</div>
          </div>
        </div>
      </SWRShell>
    </AntDShell>
  );
}
