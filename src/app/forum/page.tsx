"use client";
import { useSWR } from "@/api/useFetch";
import { Typography } from "antd";
import ForumEditor from "./ForumEditor";
import ForumList from "./ForumList";
import { MessageItem } from "./forumUtils";

const { Title, Paragraph, Text } = Typography;

export default function ForumPage() {
  const { data, error, isLoading, mutate } = useSWR<MessageItem[]>(
    "/floria-service/message/list",
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Title level={2} className="mb-4">
        留言板 Message Board
      </Title>
      <ForumEditor />
      {isLoading ? (
        <div className="text-slate-500">加载中…</div>
      ) : error ? (
        <div className="text-red-500">加载失败</div>
      ) : (
        <ForumList messages={data || []} />
      )}
    </div>
  );
}
