import { useSWRMutation } from "@/api/useFetch";
import { message as antdMessage, Popconfirm, Typography } from "antd";
import { format } from "date-fns";
import { MessageItem } from "./forumUtils";

const { Text } = Typography;

export default function ForumItem({
  item,
  onDelete,
}: {
  item: MessageItem;
  onDelete: () => void;
}) {
  const { trigger } = useSWRMutation("/floria-service/message/delete", {
    method: "post",
  });

  const handleDelete = async (id: string) => {
    try {
      await trigger({ id });
      onDelete();
    } catch (e: any) {
      antdMessage.error(e?.message || "删除失败");
    }
    antdMessage.success("已删除");
  };
  return (
    <article
      key={item._id}
      className="group rounded-xl border border-slate-200 bg-white shadow-sm p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <Text strong>匿名</Text>
        <div className="flex items-center gap-3">
          <Text type="secondary" className="text-xs">
            {format(item.createdAt, "yyyy-MM-dd HH:mm:ss")}
          </Text>
          {/* 删除按钮，仅在 hover 时可见（可改为始终显示） */}
          {item._id && (
            <Popconfirm
              title="删除确认"
              description="确定要删除这条留言吗？"
              okText="删除"
              cancelText="取消"
              onConfirm={() => handleDelete(String(item._id))}
            >
              <button
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 text-xs border border-red-200 px-2 py-0.5 rounded"
                aria-label="删除"
              >
                删除
              </button>
            </Popconfirm>
          )}
        </div>
      </div>
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </article>
  );
}
