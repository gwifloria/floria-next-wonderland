import { App, List, Typography } from "antd";

import {
  ClockCircleOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useMarkdown } from "./useMarkdown";
export const PostList = ({
  setSelectedFileId,
  selectedFileId,
}: {
  setSelectedFileId: (id: string | null) => void;
  selectedFileId: string | null;
}) => {
  const { modal, message } = App.useApp();

  const { deletePost, isListLoading, getMarkdownList, data } = useMarkdown();

  const handleDelete = async (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    modal.confirm({
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
          if (selectedFileId === fileId) {
            setSelectedFileId(null);
          }
          getMarkdownList();
        } catch (error) {
          message.error("Failed to delete post");
        }
      },
    });
  };

  return (
    <div className="sticky rounded-xl top-6">
      <h2 className="font-semibold text-lg mb-4 text-gray-800">Posts</h2>
      <List
        loading={isListLoading}
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
  );
};
