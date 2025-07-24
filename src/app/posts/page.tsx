"use client";

import { MarkdownUpload } from "./MarkdownUpload";
import { MarkdownDisplay } from "./MarkdownDisplay";

export default function PostPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <MarkdownUpload></MarkdownUpload>
      <MarkdownDisplay></MarkdownDisplay>
    </div>
  );
}
