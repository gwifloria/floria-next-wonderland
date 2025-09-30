"use client";

import { useMessage, useModal } from "@/provider/UIProviders";
import { WhisperEntryApi } from "@/types/whisper";
import { fmtDateTime } from "@/util/date";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
  const isAdmin = session?.user?.email === "ghuijue@gmail.com";

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

  return (
    <div className="relative pl-16">
      {/* Timeline marker */}
      <div className="absolute left-3 top-4 w-5 h-5 bg-gradient-to-br from-milktea-400 to-milktea-500 border-4 border-milktea-50 rounded-full shadow-sm"></div>

      {/* Entry card */}
      <div className="bg-gradient-to-br from-white to-milktea-50 border border-milktea-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
        {/* Entry header */}
        <div className="flex justify-between items-center mb-3 pb-2 border-b border-milktea-100">
          <time className="text-xs text-milktea-700 font-medium">
            {fmtDateTime(entry.timestamp.toString())}
          </time>
          {isAdmin && (
            <Button
              type="text"
              danger
              size="small"
              icon={<DeleteOutlined />}
              onClick={handleDelete}
              className="opacity-60 hover:opacity-100"
              title="删除"
            />
          )}
        </div>

        {/* Entry content */}
        <div className="mb-3 text-xs text-gray-700 leading-relaxed">
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
                className="relative rounded-lg overflow-hidden border border-milktea-100 shadow-sm"
              >
                <Image
                  src={image}
                  alt="Whisper image"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover transition-transform duration-200 hover:scale-105"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
                    ? "bg-milktea-500 text-white border-milktea-500"
                    : "bg-milktea-100 text-milktea-700 border-milktea-200 hover:bg-milktea-200"
                }`}
                onClick={() => onTagClick(tag)}
              >
                #{tag}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
