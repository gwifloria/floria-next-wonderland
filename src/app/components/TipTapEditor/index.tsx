import { useThrottle } from "@/app/tools/useThrottle";
import { Button } from "antd";
import { useCallback } from "react";
import { useTipTapEditor } from "./Editor";
import "./index.scss";

export default function TipTapEditor({
  onPost,
}: {
  onPost?: (content: string) => void;
}) {
  const { element, editor } = useTipTapEditor();

  const handlePost = useCallback(() => {
    if (!editor) return;
    const content = editor.getHTML();
    try {
      onPost?.(content);
      editor.commands.clearContent();
    } catch (error) {
      console.error("Error posting content:", error);
    }
  }, [editor, onPost]);

  const throttledPost = useThrottle(handlePost, 3000);

  return (
    <div className="border rounded-xl p-4 bg-white mb-6">
      {editor && (
        <>
          {element}
          <div className="flex justify-end mt-2">
            <Button
              onClick={throttledPost}
              data-testid="post-btn"
              className="bg-mint-400 hover:bg-mint-300 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
            >
              发布
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
