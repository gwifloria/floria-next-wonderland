"use client";
import { useSWRMutation } from "@/api/useFetch";
import { useConfetti } from "@/hooks/useConfetti";
import { App, Button } from "antd";
import { useCallback } from "react";
import { useTipTapEditor } from "../components/TipTapEditor/useTipTapEditor";
import { useThrottle } from "../tools/useThrottle";
const MAX_CHARS = 200;
export default function ForumEditor({
  onPostSuccess,
}: {
  onPostSuccess: () => void;
}) {
  const { element, editor } = useTipTapEditor();

  const { message } = App.useApp();
  const { show, confettiContext } = useConfetti();
  const { trigger } = useSWRMutation("/floria-service/message/send", {
    method: "POST",
  });

  const handleUpload = useCallback(async () => {
    if (!editor) return;
    const content = editor.getHTML();
    const plain = editor.getText().trim();

    if (!plain) {
      message.warning("内容不能为空");
      editor.commands.focus("end");
      return;
    }
    if (plain.length > MAX_CHARS) {
      message.warning(`最多只能输入 ${MAX_CHARS} 个字`);
      editor.commands.focus("end");
      return;
    }

    try {
      await trigger({ content: content });
      message.success("留言已发送");
      show({ numberOfPieces: 300, duration: 5000 });
      onPostSuccess();
      editor.commands.clearContent();
    } catch (err) {
      console.log(err);
      message.error("发送失败");
    }
  }, [editor, message, onPostSuccess, show, trigger]);

  const throttledPost = useThrottle(handleUpload, 3000);

  return (
    <div className="border rounded-xl p-4 bg-white mb-6">
      {confettiContext}

      {editor && (
        <>
          {element}
          <div className="flex justify-end mt-2">
            <Button
              danger
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
