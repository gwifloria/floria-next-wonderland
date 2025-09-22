"use client";
import { useSession } from "next-auth/react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { postFetcher } from "@/util/fetch";
import { BlogPostItem } from "../constants";

const ADMIN_EMAIL = "ghuijue@gmail.com";

interface PinControlProps {
  post: BlogPostItem;
  category: string;
}

interface PinRequest {
  path: string;
  category: string;
  title: string;
  isPinned: boolean;
}

export default function PinControl({ post, category }: PinControlProps) {
  const { data: session } = useSession();

  const { trigger: togglePin, isMutating: isLoading } = useSWRMutation<
    any,
    Error,
    string,
    PinRequest
  >("/api/blog/pin", postFetcher, {
    onSuccess: () => {
      // 自动刷新博客列表
      mutate(`/api/blog/list?category=${category}`);
    },
    onError: (error) => {
      console.error("Error toggling pin:", error);
      // 可以添加错误提示
    },
  });

  // Only show to admin users
  if (!session?.user?.email || session.user.email !== ADMIN_EMAIL) {
    return null;
  }

  const handleTogglePin = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();

    try {
      await togglePin({
        path: post.path,
        category,
        title: post.title || post.name.replace(/\.(md|mdx)$/i, ""),
        isPinned: !post.isPinned,
      });
    } catch (error) {
      // Error is already handled in onError callback
    }
  };

  return (
    <button
      onClick={handleTogglePin}
      disabled={isLoading}
      className={`
        absolute right-0 top-1/2 transform -translate-y-1/2
        opacity-0 group-hover:opacity-100 transition-opacity duration-200
        p-1 rounded text-xs
        ${
          post.isPinned
            ? "text-amber-600 hover:text-amber-700 hover:bg-amber-50"
            : "text-neutral-400 hover:text-amber-600 hover:bg-amber-50"
        }
        ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      title={post.isPinned ? "取消置顶" : "置顶文章"}
    >
      {isLoading ? "⏳" : post.isPinned ? "📌" : "📍"}
    </button>
  );
}
