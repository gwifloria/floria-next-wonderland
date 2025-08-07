"use client";
import { useState } from "react";
import { PostContent } from "./PostContent";
import { PostList } from "./PostList";

export const MarkdownDisplay = () => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  return (
    <div className="markdown-display h-[calc(100vh-8rem)] flex">
      <aside className="sm:w-72 md:w-144 rounded-xl lg:w-218 bg-white border-r border-gray-100 p-6">
        <PostList
          selectedFileId={selectedFileId}
          setSelectedFileId={setSelectedFileId}
        ></PostList>
      </aside>
      <main className="w-full rounded-xl p-10 bg-mint-50 transition-all  overflow-auto">
        <div className="bg-white rounded-xl shadow-md p-10">
          <PostContent id={selectedFileId} />
        </div>
      </main>
    </div>
  );
};
