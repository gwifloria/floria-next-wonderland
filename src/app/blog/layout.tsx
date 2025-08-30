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
    <div className="flex max-h-[calc(100vh-2rem)]">
      <div className="w-full md:w-64 rounded-2xl bg-neutral-50 border-r p-6 my-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
        <Sidebar activePost={activePost} />
      </div>
      <div className="hidden md:block flex-1 max-w-8xl py-4 px-6 mx-auto my-4 md:py-8 bg-white rounded-2xl shadow-lg max-h-[calc(100vh-10rem)]">
        <div className="overflow-hidden h-full">{children}</div>
      </div>
    </div>
  );
}
