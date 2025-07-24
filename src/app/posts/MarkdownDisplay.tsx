import { List, message, Modal, Skeleton, Space, Typography } from "antd";
import { Suspense, useState } from "react";
import { useMarkdown } from "./useMarkdown";
import { MdxPost } from "./MdxPost";
import { useSWR, useSWRMutation } from "@/api/useFetch";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { EmptyState, PostSkeleton } from "./MarkdownSkelton";

function PostContent({ id }: { id: string }) {
  const { data, isLoading } = useSWR(`/floria-service/markdown/${id}`);

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <Suspense fallback={<PostSkeleton />}>
      <div className="transition-all duration-200 ease-in-out">
        <MdxPost title={data?.title} content={data?.content} />
      </div>
    </Suspense>
  );
}
export const MarkdownDisplay = () => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const { data, mutate } = useMarkdown();

  const { trigger: deletePost } = useSWRMutation(
    "/floria-service/markdown/delete",
    {
      method: "DELETE",
    },
  );

  const handleDelete = async (fileId: string, e: React.MouseEvent) => {
    Modal.confirm({
      title: "Delete Post",
      content: "Are you sure you want to delete this post?",
      okText: "Delete",
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        try {
          await deletePost({ id: fileId });
          message.success("Post deleted successfully");
          mutate(); // Refresh the list
          if (selectedFileId === fileId) {
            setSelectedFileId(null);
          }
        } catch (error) {
          message.error("Failed to delete post");
        }
      },
    });
  };

  return (
    <div className="markdown-display flex">
      <aside className="w-72 bg-white border-r border-gray-100 p-6 shadow-sm">
        <div className="sticky top-6">
          <h2 className="font-semibold text-lg mb-4 text-gray-800">Posts</h2>
          <List
            className="posts-list"
            dataSource={data}
            renderItem={(file) => (
              <List.Item
                key={file.id}
                actions={[
                  <button
                    key={`delete-btn-${file.id}`}
                    onClick={(e) => handleDelete(file.id, e)}
                    title="Delete post"
                  >
                    <DeleteOutlined />
                  </button>,
                ]}
                className={`cursor-pointer rounded-lg px-4 py-3 mb-2 transition-all duration-150 
                  hover:bg-mint-50 hover:shadow-sm
                  ${selectedFileId === file.id ? "bg-mint-50 border-mint-500 shadow-sm" : ""}`}
                onClick={() => setSelectedFileId(file.id)}
              >
                <List.Item.Meta
                  avatar={<FileTextOutlined className="text-mint-500" />}
                  title={
                    <Typography.Text strong className="text-gray-700">
                      {file.title ||
                        file.title.replace(/\.md$/, "").replace(/-/g, " ")}
                    </Typography.Text>
                  }
                  description={
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <ClockCircleOutlined className="mr-1" />
                      {file.createdAt &&
                        new Date(file.createdAt).toLocaleDateString()}
                    </div>
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: "No markdown files yet" }}
          />
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {selectedFileId ? <PostContent id={selectedFileId} /> : <EmptyState />}
      </main>{" "}
    </div>
  );
};
