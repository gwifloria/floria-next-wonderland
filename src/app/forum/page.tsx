"use client";
import AntDShell from "@/provider/AntDShell";
import { SWRShell } from "@/provider/SWRShell";
import { Spin } from "antd";
import useSWR from "swr";
import ForumEditor from "./ForumEditor";
import ForumList from "./ForumList";
import { MessageItem } from "./type";

export default function ForumContainer() {
  return (
    <AntDShell>
      <SWRShell>
        <ForumPage></ForumPage>
      </SWRShell>
    </AntDShell>
  );
}
function ForumPage() {
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
        <h1 className="mb-4 text-neutral-800">留言板 Message Board</h1>
        <ForumEditor onSendSuccess={mutate} />

        <ForumList messages={messages} refresh={mutate} />
      </div>
    </>
  );
}
