"use client";
import { Spin, Typography } from "antd";
import useSWR from "swr";
import ForumEditor from "./ForumEditor";
import ForumList from "./ForumList";
import { MessageItem } from "./type";

const { Title } = Typography;

export default function ForumPage() {
  const {
    data: messages,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<MessageItem[]>("/api/forum/list");

  return (
    <>
      {!isLoading ||
        (isValidating && (
          <div className="inset-0 z-10 flex items-center bg-white bg-opacity-70 align-center z-50 absolute justify-center py-12">
            <Spin size="large" />
          </div>
        ))}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Title level={2} className="mb-4">
          留言板 Message Board
        </Title>
        <ForumEditor onSendSuccess={mutate} />

        <ForumList messages={messages} refresh={mutate} />
      </div>
    </>
  );
}
