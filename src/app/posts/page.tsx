import { MarkdownDisplay } from "./MarkdownDisplay";
import { MarkdownUpload } from "./MarkdownUpload";

export default function PostPage() {
  return (
    <div className="h-[calc(100vh-10rem)]">
      <MarkdownUpload></MarkdownUpload>
      <MarkdownDisplay></MarkdownDisplay>
    </div>
  );
}
