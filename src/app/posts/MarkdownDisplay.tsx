import { Empty, List, Skeleton, Space, Typography } from "antd";
import { Suspense, useState } from "react";
import { useMarkdown } from "./useMarkdown";
import { MdxPost } from "./MdxPost";
import { useSWR } from "@/api/useFetch";
import { FileTextOutlined, ClockCircleOutlined } from "@ant-design/icons";
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-2rem)] bg-gray-50/30 rounded-xl">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <div className="space-y-3 text-center">
            <p className="text-xl font-semibold text-gray-700">
              No Post Selected
            </p>
            <p className="text-sm text-gray-500 max-w-sm">
              Select a post from the sidebar to view its content. You can also
              upload new markdown files.
            </p>
          </div>
        }
      />
      <FileTextOutlined className="text-6xl mt-6 text-mint-300" />
    </div>
  );
}

function PostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-xl shadow-lg px-8 py-10 transition-all">
      <Space direction="vertical" className="w-full">
        <Skeleton.Input active block style={{ height: 40 }} />
        <div className="h-4" />
        <Skeleton.Input active block style={{ height: 28 }} />
        {[...Array(3)].map((_, i) => (
          <Skeleton
            key={i}
            active
            paragraph={{ rows: 4, width: ["100%", "95%", "98%", "90%"] }}
          />
        ))}
      </Space>
    </div>
  );
}

function PostContent({ id }: { id: string }) {
  const { data, isLoading } = useSWR(`/floria-service/markdown/${id}`);

  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <Suspense fallback={<PostSkeleton />}>
      <div className="transition-all duration-200 ease-in-out">
        <MdxPost content={data?.content} />
      </div>
    </Suspense>
  );
}
export const MarkdownDisplay = () => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const { data } = useMarkdown();
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
