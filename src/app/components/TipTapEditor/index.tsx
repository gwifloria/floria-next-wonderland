import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "antd";
import { useCallback, useRef, useState } from "react";
// lowlight v3
import { common, createLowlight } from "lowlight";
import "./index.scss";
import Toolbar from "./Toolbar";
const lowlight = createLowlight(common);

export default function TipTapEditor({
  onPost,
}: {
  onPost?: (content: string) => void;
}) {
  const [posting, setPosting] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }), // use Lowlight version
      CodeBlockLowlight.configure({ lowlight }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
        validate: (href) => /^https?:\/\//i.test(href),
      }),
      Image.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder: "在这里输入内容…" }),
    ],
    immediatelyRender: false,
    autofocus: false,
    content: "",
  });

  const promptLink = useCallback(() => {
    const url = window.prompt("输入链接（以 http/https 开头）:")?.trim();
    if (!url) return;
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const handlePost = useCallback(() => {
    if (!editor) return;
    const html = editor.getHTML();
    if (!html || html === "<p></p>") return;
    setPosting(true);
    try {
      onPost?.(html);
      editor.commands.clearContent();
    } finally {
      setPosting(false);
    }
  }, [editor, onPost]);

  return (
    <div className="border rounded-xl p-4 bg-white mb-6">
      {/* Toolbar */}
      <div className="mb-2 flex gap-2 flex-wrap items-center">
        <Toolbar editor={editor} fileRef={fileRef} promptLink={promptLink} />
      </div>

      {editor && (
        <EditorContent
          editor={editor}
          onClick={() => editor?.chain().focus().run()}
          className="tiptap prose prose-sm max-w-none min-h-[200px] p-4 outline-none focus:outline-none ring-0 focus:ring-0 cursor-text"
        />
      )}

      <div className="flex justify-end mt-2">
        <Button type="primary" loading={posting} onClick={handlePost}>
          发布
        </Button>
      </div>
    </div>
  );
}
