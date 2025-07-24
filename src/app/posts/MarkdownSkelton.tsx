import { Empty, Space, Skeleton } from "antd";
import {
  FileTextOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export function EmptyState() {
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

export function PostSkeleton() {
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
