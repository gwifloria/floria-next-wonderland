import { Editor, useEditorState } from "@tiptap/react";
import { Button, Space } from "antd";

export default function Toolbar({ editor }: { editor: Editor }) {
  const s = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        // inline styles
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline:
          ctx.editor.can().chain().toggleUnderline?.().run?.() ?? true,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,

        // block/structure
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,

        // history
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <Space size={4} wrap>
      <Button
        data-testid="tt-btn-bold"
        size="small"
        type={s.isBold ? "primary" : "default"}
        disabled={!s.canBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        B
      </Button>

      <Button
        data-testid="tt-btn-italic"
        size="small"
        type={s.isItalic ? "primary" : "default"}
        disabled={!s.canItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        I
      </Button>

      <Button
        data-testid="tt-btn-underline"
        size="small"
        type={s.isUnderline ? "primary" : "default"}
        disabled={!s.canUnderline}
        onClick={() => editor.chain().focus().toggleUnderline?.().run?.()}
      >
        U
      </Button>

      <Button
        data-testid="tt-btn-h2"
        size="small"
        type={s.isHeading2 ? "primary" : "default"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </Button>

      <Button
        data-testid="tt-btn-h3"
        size="small"
        type={s.isHeading3 ? "primary" : "default"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </Button>

      <Button
        data-testid="tt-btn-bullet"
        size="small"
        type={s.isBulletList ? "primary" : "default"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        • 列表
      </Button>

      <Button
        data-testid="tt-btn-ordered"
        size="small"
        type={s.isOrderedList ? "primary" : "default"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. 列表
      </Button>

      <Button
        data-testid="tt-btn-quote"
        size="small"
        type={s.isBlockquote ? "primary" : "default"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        引用
      </Button>

      <Button
        data-testid="tt-btn-code"
        size="small"
        type={s.isCodeBlock ? "primary" : "default"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        代码
      </Button>

      <Button
        data-testid="tt-btn-undo"
        size="small"
        disabled={!s.canUndo}
        onClick={() => editor.chain().focus().undo().run()}
      >
        撤销
      </Button>

      <Button
        data-testid="tt-btn-clear"
        size="small"
        disabled={!s.canClearMarks}
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
      >
        清除格式
      </Button>
    </Space>
  );
}
