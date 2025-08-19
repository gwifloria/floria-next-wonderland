import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./index.scss";
import Toolbar from "./Toolbar";

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
    </div>
  );
  return { element, editor };
};
