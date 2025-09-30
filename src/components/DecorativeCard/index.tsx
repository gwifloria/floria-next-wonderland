import { Popconfirm } from "antd";
import { format } from "date-fns";
import Image from "next/image";
import { ReactNode } from "react";

/**
 * DecorativeCard - A journal-style decorative card component
 * Features washi tape decorations, dashed borders, and warm paper-like background
 * Perfect for comments, messages, or any content that needs a scrapbook aesthetic
 */
interface DecorativeCardProps {
  id: string;
  author: string;
  createdAt: Date | string;
  content: string | ReactNode;
  onDelete?: (id: string) => void;
  showDeleteButton?: boolean;
  className?: string;
}

export default function DecorativeCard({
  id,
  author,
  createdAt,
  content,
  onDelete,
  showDeleteButton = false,
  className = "",
}: DecorativeCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  const decorationHash = Array.from(String(id)).reduce(
    (acc, ch) => acc + ch.charCodeAt(0),
    0,
  );
  const decorationType = decorationHash % 2;

  return (
    <article
      className={`relative group rounded-2xl border border-dashed border-rose-200 bg-[#FFFDF9] shadow-[0_1px_0_rgba(0,0,0,0.04)] p-4 ${className}`}
    >
      {/* Decoration: washi tape or small icon */}
      {decorationType === 0 ? (
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
      ) : (
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
      )}

      {/* Header with author and date */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-handwritten text-rose-700 text-base">
          {author}
        </span>
        <div className="flex items-center gap-3">
          <time className="text-[11px] text-neutral-400 italic">
            {typeof createdAt === "string"
              ? createdAt
              : format(createdAt, "yyyy-MM-dd HH:mm:ss")}
          </time>
          {showDeleteButton && (
            <Popconfirm
              title="删除确认"
              description="确定要删除这条留言吗？"
              okText="删除"
              cancelText="取消"
              onConfirm={handleDelete}
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

      {/* Content */}
      <div className="prose prose-sm max-w-none leading-relaxed text-neutral-700">
        {typeof content === "string" ? (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        ) : (
          content
        )}
      </div>
    </article>
  );
}
