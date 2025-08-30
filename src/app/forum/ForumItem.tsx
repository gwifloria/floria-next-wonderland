import { useSWRMutation } from "@/api/useFetch";
import { App, Popconfirm, Typography } from "antd";
import { format } from "date-fns";
import { MessageItem } from "./type";

const { Text } = Typography;
const isProd = process.env.NODE_ENV === "production";

export default function ForumItem({
  item,
  onDelete,
}: {
  item: MessageItem;
  onDelete: () => void;
}) {
  const { trigger } = useSWRMutation("/api/forum/delete", {
    method: "post",
  });
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
    <article
      key={item.id}
      className="group rounded-xl border border-slate-200 bg-white shadow-sm p-4"
    >
      <div className="flex items-center justify-between mb-2">
        <Text strong>匿名</Text>
        <div className="flex items-center gap-3">
          <Text type="secondary" className="text-xs">
            {format(item.createdAt, "yyyy-MM-dd HH:mm:ss")}
          </Text>
          {/* 删除按钮，仅在 hover 时可见（可改为始终显示） */}
          {item.id && !isProd && (
            <Popconfirm
              title="删除确认"
              description="确定要删除这条留言吗？"
              okText="删除"
              cancelText="取消"
              onConfirm={() => handleDelete(String(item.id))}
            >
              <button
                className="opacity-0 text-rose-500 bg-rose-100 group-hover:opacity-100 transition-opacity text-xs border px-2 py-0.5 rounded"
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
