import { useSWRMutation } from "@/api/useFetch";
import { App } from "antd";
import TipTapEditor from "../components/TipTapEditor";

interface ForumEditorProps {
  refresh: () => void;
}

export default function ForumEditor({ refresh }: ForumEditorProps) {
  const message = App.useApp().message;
  const { trigger } = useSWRMutation("/floria-service/message/send", {
    method: "POST",
  });

  const handleUpload = async (html: string) => {
    try {
      await trigger({ content: html });
      refresh();
      message.success("留言已发送");
    } catch {
      message.error("发送失败");
    }
  };
  return <TipTapEditor onPost={handleUpload} />;
}
