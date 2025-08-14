import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button, Space, message } from "antd";
import { useCallback, useMemo, useRef, useState } from "react";
// lowlight v3
import { common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);

export default function ForumEditor({
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

  // --- helpers ---
  const canUndo = !!editor?.can().undo();
  const canRedo = !!editor?.can().redo();
  const canPost = useMemo(() => {
    const txt = editor?.getText() ?? "";
    return txt.trim().length > 0;
  }, [editor]);

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

  const triggerImagePick = useCallback(() => fileRef.current?.click(), []);

  const onPickImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = ""; // reset so same file can be picked again
      if (!file) return;
      if (!/^image\//.test(file.type)) {
        message.error("请选择图片文件");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const src = String(reader.result || "");
        editor?.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    },
    [editor],
  );

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
        <Space size={4} wrap>
          <Button
            size="small"
            type={editor?.isActive("bold") ? "primary" : "default"}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            B
          </Button>
          <Button
            size="small"
            type={editor?.isActive("italic") ? "primary" : "default"}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            I
          </Button>
          <Button
            size="small"
            type={editor?.isActive("underline") ? "primary" : "default"}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            U
          </Button>

          <Button
            size="small"
            type={
              editor?.isActive("heading", { level: 2 }) ? "primary" : "default"
            }
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </Button>
          <Button
            size="small"
            type={
              editor?.isActive("heading", { level: 3 }) ? "primary" : "default"
            }
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            H3
          </Button>

          <Button
            size="small"
            type={editor?.isActive("bulletList") ? "primary" : "default"}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            • 列表
          </Button>
          <Button
            size="small"
            type={editor?.isActive("orderedList") ? "primary" : "default"}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            1. 列表
          </Button>

          <Button
            size="small"
            type={editor?.isActive("blockquote") ? "primary" : "default"}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            引用
          </Button>
          <Button
            size="small"
            type={editor?.isActive("codeBlock") ? "primary" : "default"}
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          >
            代码
          </Button>

          <Button size="small" onClick={promptLink}>
            链接
          </Button>
          <Button size="small" onClick={triggerImagePick}>
            图片
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={onPickImage}
          />

          <Button
            size="small"
            disabled={!canUndo}
            onClick={() => editor?.chain().focus().undo().run()}
          >
            撤销
          </Button>
          <Button
            size="small"
            disabled={!canRedo}
            onClick={() => editor?.chain().focus().redo().run()}
          >
            重做
          </Button>
          <Button
            size="small"
            danger
            onClick={() =>
              editor?.chain().focus().clearNodes().unsetAllMarks().run()
            }
          >
            清除格式
          </Button>
        </Space>
      </div>

      {editor && (
        <EditorContent
          editor={editor}
          className="prose prose-sm max-w-none min-h-[160px]"
        />
      )}

      <div className="flex justify-end mt-2">
        <Button
          type="primary"
          loading={posting}
          disabled={!canPost}
          onClick={handlePost}
        >
          发布
        </Button>
      </div>
    </div>
  );
}
