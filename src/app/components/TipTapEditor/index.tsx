import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useState } from "react";
// lowlight v3
import DOMPurify from "dompurify";
import { common, createLowlight } from "lowlight";
import "./index.scss";
import Toolbar from "./Toolbar";

// Client-side sanitizer using DOMPurify (extra guard; server also sanitizes)
function sanitizeHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "b",
      "strong",
      "i",
      "em",
      "u",
      "s",
      "span",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "code",
      "pre",
      "h2",
      "h3",
      "img",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "target", "rel"],
    ALLOWED_URI_REGEXP: /^https?:|^data:image\//i,
    FORBID_TAGS: ["script", "style"],
    FORBID_ATTR: ["on*"],
    ADD_ATTR: ["rel", "target"],
  }) as string;
}

const lowlight = createLowlight(common);

export default function TipTapEditor({
  onPost,
}: {
  onPost?: (content: string) => void;
}) {
  const [posting, setPosting] = useState(false);

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
    editorProps: {
      handlePaste(view, event) {
        const e = event as ClipboardEvent;
        const html = e.clipboardData?.getData("text/html");
        if (html) {
          e.preventDefault();
          const clean = sanitizeHtml(html);
          // Insert sanitized HTML
          // @ts-ignore editor is captured from outer scope
          (editor as any)?.chain?.().focus().insertContent(clean).run();
          return true;
        }
        return false;
      },
    },
  });

  const handlePost = useCallback(() => {
    if (!editor) return;
    setPosting(true);
    const raw = editor.getHTML();
    if (!raw || raw === "<p></p>") return;
    const html = sanitizeHtml(raw);
    if (!html) return;
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
        <Toolbar editor={editor} />
      </div>

      {editor && (
        <EditorContent
          editor={editor}
          onClick={() => editor?.chain().focus().run()}
          className="tiptap prose prose-sm max-w-none min-h-[200px] p-4 outline-none focus:outline-none ring-0 focus:ring-0 cursor-text"
        />
      )}

      <div className="flex justify-end mt-2">
        <button
          disabled={posting}
          onClick={handlePost}
          className="bg-mint-400 hover:bg-mint-300 text-white px-4 py-2 rounded disabled:opacity-50 transition-colors"
        >
          发布
        </button>
      </div>
    </div>
  );
}
