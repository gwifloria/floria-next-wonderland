import { useSWR } from "@/api/useFetch";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
const owner = "gwifloria";
const repo = "note-archive";
const MarkdownViewer = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const { data } = useSWR<{ blogs: any[] }>(
    `https://api.github.com/repos/${owner}/${repo}/contents`,
    { token: "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" }
  );

  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
