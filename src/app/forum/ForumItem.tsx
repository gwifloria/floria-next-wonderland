import CommentCard from "@/components/CommentCard";
import { postFetcher } from "@/util/fetch";
import { App } from "antd";
import useSWRMutation from "swr/mutation";
import { MessageItem } from "./type";

const isProd = process.env.NODE_ENV === "production";

export default function ForumItem({
  item,
  onDelete,
}: {
  item: MessageItem;
  onDelete: () => void;
}) {
  const { trigger } = useSWRMutation("/api/forum/delete", postFetcher);
  const { message } = App.useApp();

  const handleDelete = async (id: string) => {
    try {
      await trigger({ id });
      onDelete();
      message.success("已删除");
    } catch (e: any) {
      message.error(e?.message || "删除失败");
    }
  };

  return (
    <CommentCard
      id={String(item.id ?? "")}
      author="匿名"
      createdAt={new Date(item.createdAt)}
      content={item.content}
      onDelete={handleDelete}
      showDeleteButton={!!(item.id && !isProd)}
    />
  );
}
