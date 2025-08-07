import { FileTextOutlined } from "@ant-design/icons";
import { Empty, Skeleton, Space } from "antd";

export function EmptyState() {
  return (
    <div className=" flex items-center flex-col justify-center bg-gray-50/30 rounded-xl">
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
    <div className=" rounded-xl shadow-lg  transition-all">
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
