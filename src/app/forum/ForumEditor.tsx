import { useSWRMutation } from "@/api/useFetch";
import { App } from "antd";
import TipTapEditor from "../components/TipTapEditor";

export default function ForumEditor({
  onPostSuccess,
}: {
  onPostSuccess: () => void;
}) {
  const message = App.useApp().message;
  const { trigger } = useSWRMutation("/floria-service/message/send", {
    method: "POST",
  });

  const handleUpload = async (html: string) => {
    try {
      await trigger({ content: html });
      onPostSuccess();
      message.success("留言已发送");
    } catch {
      message.error("发送失败");
    }
  };
  return <TipTapEditor onPost={handleUpload} />;
}
