//@ts-nocheck
import { Suspense, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { tinyEditorPluginConst, tinyEditorApiKey } from "./constants";
import { Button } from "antd";
import { Space } from "antd";

export const TinyEditor = () => {
  const editorRef = useRef();
  const isEditorInit = useRef(false);
  const log = () => {
    if (!editorRef.current) {
      return;
    }
    console.log(editorRef.current.getContent());
  };

  const onInit = (_, editor) => {
    isEditorInit.current = true;
    editorRef.current = editor;
  };

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Editor
          apiKey={tinyEditorApiKey}
          onInit={onInit}
          init={{
            plugins: tinyEditorPluginConst,
            menubar: "edit view",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
          }}
          initialValue="Welcome to TinyMCE!"
        />
        <Button type="primary" onClick={log}>
          提交
        </Button>
      </Space>
    </>
  );
};
