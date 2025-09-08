import { postFetcher } from "@/util/fetch";
import { App, Popconfirm, Typography } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
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
    <article
      key={item.id}
      className="relative group rounded-2xl border border-dashed border-rose-200 bg-[#FFFDF9] shadow-[0_1px_0_rgba(0,0,0,0.04)] p-4"
    >
      {/* decoration: alternate between washi tape and bow */}
      {(() => {
        const sid = String(item.id ?? "");
        const hash = Array.from(sid).reduce(
          (acc, ch) => acc + ch.charCodeAt(0),
          0,
        );
        const v = hash % 2; // 0 or 1

        if (v === 0) {
          // Washi tape top-left
          return (
            <div
              className="pointer-events-none absolute -top-2 left-3 w-[56px] h-[18px] -rotate-2 opacity-70"
              aria-hidden="true"
            >
              <Image
                src="/images/tape-beige.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          );
        }
        // Bow top-left
        return (
          <div
            className="pointer-events-none absolute -top-3 right-5 w-8 h-8 rotate-6 opacity-55"
            aria-hidden="true"
          >
            <Image
              src="/images/washi-2.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        );
      })()}
      <div className="flex items-center justify-between mb-2">
        <span className="font-handwritten text-rose-700 text-base">匿名</span>
        <div className="flex items-center gap-3">
          <time className="text-[11px] text-neutral-400 italic">
            {format(item.createdAt, "yyyy-MM-dd HH:mm:ss")}
          </time>
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
        className="prose prose-sm max-w-none leading-relaxed text-neutral-700"
        dangerouslySetInnerHTML={{ __html: item.content }}
      />
    </article>
  );
}
