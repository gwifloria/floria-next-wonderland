import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useState } from "react";
// lowlight v3
import { common, createLowlight } from "lowlight";
import "./index.scss";
import Toolbar from "./Toolbar";

// --- Minimal client-side HTML sanitizer (allow‑list) ---
// NOTE: Server already sanitizes, this is an extra guard in the client to mitigate XSS before sending/previewing.
const ALLOWED_TAGS = new Set([
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
]);
const DROP_ON_ATTR = /\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi; // onClick= etc.
const SRC_ATTR = /\s(src)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i;
const HREF_ATTR = /\s(href)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/i;

function safeUrl(url: string) {
  const val = (url || "").trim();
  if (!val) return "";
  // allow http/https and data:image only
  if (/^https?:\/\//i.test(val)) return val;
  if (/^data:image\//i.test(val)) return val;
  return "#"; // neutralize others (javascript:, data:text, etc.)
}

function sanitizeHtml(html: string): string {
  if (!html) return "";
  let out = String(html);
  // strip script/style blocks completely
  out = out.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<style[\s\S]*?<\/style>/gi, "");
  // drop inline event handlers
  out = out.replace(DROP_ON_ATTR, "");
  // normalize/opening tags & attributes
  out = out.replace(/<([^>\s\/]+)([^>]*)>/gi, (m, tag, attrs) => {
    const t = String(tag).toLowerCase();
    if (!ALLOWED_TAGS.has(t)) return ""; // drop unknown opening tags

    // handle <a> and <img> attributes safely
    if (t === "a") {
      const match = attrs.match(HREF_ATTR);
      const href = match ? match[3] || match[4] || match[5] || "" : "";
      const safe = safeUrl(href);
      return `<a href="${safe}" rel="noopener noreferrer" target="_blank">`;
    }
    if (t === "img") {
      const match = attrs.match(SRC_ATTR);
      const src = match ? match[3] || match[4] || match[5] || "" : "";
      const safe = safeUrl(src);
      return `<img src="${safe}" alt="" />`;
    }
    return `<${t}>`;
  });
  // keep only allowed closing tags
  out = out.replace(/<\/([^>]+)>/gi, (m, tag) =>
    ALLOWED_TAGS.has(String(tag).toLowerCase()) ? m : "",
  );
  // collapse empty paragraphs
  out = out.replace(/<p>\s*<\/p>/g, "");
  return out.trim();
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
          const clean = sanitizeHtml(html);
          // Insert sanitized HTML instead of raw paste
          // @ts-ignore
          view?.state?.schema && view.dispatch(view.state.tr.insertText(""));
          // Use command API to insert content
          setTimeout(() => {
            // defer to ensure focus
            view.dom?.focus();
            // @ts-ignore TipTap command chain available via editor instance
            (editor as any)?.chain?.().focus().insertContent(clean).run();
          }, 0);
          return true; // handled
        }
        return false; // default handling for plain text
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
