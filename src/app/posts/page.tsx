import { App } from "antd";
import { MarkdownDisplay } from "./MarkdownDisplay";
import { MarkdownUpload } from "./MarkdownUpload";

export default function PostPage() {
  return (
    <div className="h-[calc(100vh-10rem)]">
      <App>
        <MarkdownUpload></MarkdownUpload>
        <MarkdownDisplay></MarkdownDisplay>
      </App>
    </div>
  );
}
