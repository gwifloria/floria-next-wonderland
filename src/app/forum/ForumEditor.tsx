"use client";
import { useMessage } from "@/hooks/UIProviders";
import { useConfetti } from "@/hooks/useConfetti";
import { postFetcher } from "@/util/fetch";
import { Button } from "antd";
import { useCallback } from "react";
import useSWRMutation from "swr/mutation";
import { useTipTapEditor } from "../../components/TipTapEditor/useTipTapEditor";
import { useThrottle } from "../tools/useThrottle";
const MAX_CHARS = 200;
export default function ForumEditor({
  onSendSuccess,
}: {
  onSendSuccess: () => void;
}) {
  const { element, editor } = useTipTapEditor();
  const message = useMessage();

  const { show, confettiContext } = useConfetti();
  const { trigger } = useSWRMutation("/api/forum/send", postFetcher);

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
      onSendSuccess();
      editor.commands.clearContent();
    } catch (err) {
      console.log(err);
      message.error("发送失败");
    }
  }, [editor, message, onSendSuccess, show, trigger]);

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
