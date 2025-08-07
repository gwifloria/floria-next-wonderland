import { App } from "antd";
import { MarkdownDisplay } from "./MarkdownDisplay";
import { MarkdownUpload } from "./MarkdownUpload";

export default function PostPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <App>
        <MarkdownUpload></MarkdownUpload>
        <MarkdownDisplay></MarkdownDisplay>
      </App>
    </div>
  );
}
