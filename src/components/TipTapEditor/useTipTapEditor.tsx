import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./index.scss";
import Toolbar from "./Toolbar";
const MAX_CHARS = 200;

const extensions = [TextStyleKit, StarterKit];

export const useTipTapEditor = () => {
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    content: ``,
  });

  const element = (
    <div>
      {editor && <Toolbar editor={editor}></Toolbar>}
      <EditorContent className="tiptap-editor" editor={editor} />
      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "flex-between",
          alignItems: "center",
        }}
      ></div>
    </div>
  );
  return { element, editor };
};
