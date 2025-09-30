"use client";

import { useMessage, useModal } from "@/provider/UIProviders";
import { WhisperEntryApi } from "@/types/whisper";
import { fmtDateTime } from "@/util/date";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { isAdminUser } from "@/constants/auth";

interface WhisperEntryCardProps {
  entry: WhisperEntryApi;
  selectedTag: string | null;
  onTagClick: (tag: string) => void;
  onDeleteSuccess: () => void;
}

export default function WhisperEntryCard({
  entry,
  selectedTag,
  onTagClick,
  onDeleteSuccess,
}: WhisperEntryCardProps) {
  const { data: session } = useSession();
  const messageApi = useMessage();
  const modalApi = useModal();

  // Check if user is admin
  const isAdmin = isAdminUser(session?.user?.email);

  const handleDelete = () => {
    modalApi.confirm({
      title: "确认删除",
      content: (
        <div>
          <p>确定要删除这条 whisper 记录吗？</p>
          <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-600">
            {entry.content.substring(0, 100)}...
          </div>
        </div>
      ),
      okText: "删除",
      okType: "danger",
      cancelText: "取消",
      onOk: async () => {
        try {
          const response = await fetch(`/api/whispers/list?id=${entry.id}`, {
            method: "DELETE",
          });

          if (response.ok) {
            messageApi.success("删除成功");
            onDeleteSuccess();
          } else {
            const errorData = await response.json();
            messageApi.error(errorData.error || "删除失败");
          }
        } catch (error) {
          console.error("Delete error:", error);
          messageApi.error("删除失败");
        }
      },
    });
  };

  // Calculate decoration type based on entry ID hash (same logic as DecorativeCard)
  const decorationHash = Array.from(String(entry.id)).reduce(
    (acc, ch) => acc + ch.charCodeAt(0),
    0,
  );
  const decorationType = decorationHash % 2;

  return (
    <div className="relative pl-16">
      {/* Timeline marker - positioned to align with the vertical line */}
      <div className="absolute left-[19px] top-4 w-[14px] h-[14px] bg-gradient-to-br from-milktea-400 to-milktea-500 border-[3px] border-white rounded-full shadow-sm z-10"></div>

      {/* Entry card with decorative elements */}
      <article className="group relative rounded-2xl border border-dashed border-rose-200 bg-[#FFFDF9] shadow-[0_1px_0_rgba(0,0,0,0.04)] p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        {/* Washi tape decoration - alternates based on entry ID */}
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

        {/* Entry header */}
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-rose-100">
          <time className="text-xs text-rose-700 font-medium">
            {fmtDateTime(entry.timestamp.toString())}
          </time>
          {isAdmin && (
            <Button
              type="text"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              title="删除"
            />
          )}
        </div>

        {/* Entry content */}
        <div className="mb-3 text-xs text-neutral-700 leading-relaxed prose prose-sm max-w-none">
          {entry.content.split("\n").map((paragraph, pIndex) =>
            paragraph.trim() ? (
              <p key={pIndex} className="mb-1 last:mb-0">
                {paragraph}
              </p>
            ) : (
              <div key={pIndex} className="h-1" />
            ),
          )}
        </div>

        {/* Images */}
        {entry.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
            {entry.images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className="relative rounded-lg overflow-hidden border border-rose-100 shadow-sm"
              >
                <Image
                  src={image}
                  alt={`Whisper image ${imgIndex + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform duration-200 hover:scale-105"
                  unoptimized
                  onError={(e) => {
                    // Hide broken images gracefully
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Tags - only show if tags exist */}
        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {entry.tags.map((tag) => (
              <Tag
                key={tag}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-rose-500 text-white border-rose-500"
                    : "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                }`}
                onClick={() => onTagClick(tag)}
              >
                #{tag}
              </Tag>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
