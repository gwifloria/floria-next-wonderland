import { useSWRMutation } from "@/api/useFetch";
import TipTapEditor from "../components/TipTapEditor";

export default function ForumEditor() {
  const { trigger } = useSWRMutation("/floria-service/message/send", {
    method: "POST",
  });
  return <TipTapEditor onPost={(html: string) => trigger({ content: html })} />;
}
