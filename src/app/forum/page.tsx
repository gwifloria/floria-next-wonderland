"use client";
import { useSWR } from "@/api/useFetch";
import { App, Spin, Typography } from "antd";
import ForumEditor from "./ForumEditor";
import ForumList from "./ForumList";
import { MessageItem } from "./forumUtils";

const { Title } = Typography;

export default function ForumPage() {
  const {
    data: messages,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<MessageItem[]>("/floria-service/message/list");

  return (
    <Spin spinning={isLoading || isValidating}>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Title level={2} className="mb-4">
          留言板 Message Board
        </Title>
        <App>
          <ForumEditor onPostSuccess={mutate} />
        </App>

        <ForumList messages={messages} refresh={mutate} />
      </div>
    </Spin>
  );
}
