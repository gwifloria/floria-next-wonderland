"use client";
import { useState } from "react";
import { PostContent } from "./PostContent";
import { PostList } from "./PostList";

export const MarkdownDisplay = () => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  return (
    <div className="markdown-display flex">
      <aside className="sm:w-72 md:w-144 lg:w-218 bg-white border-r border-gray-100 p-6 shadow-sm">
        <PostList
          selectedFileId={selectedFileId}
          setSelectedFileId={setSelectedFileId}
        ></PostList>
      </aside>
      <main className="w-full rounded-xl shadow-lg p-10 transition-all  overflow-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          <PostContent id={selectedFileId} />
        </div>
      </main>
    </div>
  );
};
