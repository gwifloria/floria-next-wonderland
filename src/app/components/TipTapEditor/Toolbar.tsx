import { Editor } from "@tiptap/react";
import { Button, Space } from "antd";

export default function Toolbar({
  editor,
  fileRef,
  promptLink,
}: {
  editor: Editor | null;
  fileRef: React.RefObject<HTMLInputElement>;
  promptLink: () => void;
}) {
  const canUndo = !!editor?.can().undo();
  const canRedo = !!editor?.can().redo();

  return (
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
        type={editor?.isActive("heading", { level: 2 }) ? "primary" : "default"}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        H2
      </Button>
      <Button
        size="small"
        type={editor?.isActive("heading", { level: 3 }) ? "primary" : "default"}
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
  );
}
