import { Empty, Skeleton, Space } from "antd";

export function EmptyState() {
  return (
    <div className=" flex items-center flex-col justify-center bg-gray-50/30 rounded-xl">
      <Empty
        description={
          <div className="max-w-5xl mx-auto bg-white p-6">
            <h2 className="text-xl font-semibold mb-4">欢迎来到我的 blog 区</h2>
            <p className="text-neutral-600 mb-2">在这里你可以浏览两类文章：</p>
            <ul className="list-disc list-inside text-neutral-700">
              <li>
                <strong>ByteNotes</strong>：技术学习与开发笔记
              </li>
              <li>
                <strong>Murmurs</strong>：日常感想与随笔（可能会有点读书笔记）
              </li>
            </ul>
            <p className="mt-4 text-neutral-500 text-sm">
              从左侧选择一篇文章开始阅读吧。
            </p>
          </div>
        }
      />
    </div>
  );
}

export function BlogSkeleton() {
  return (
    <div className="rounded-xl shadow-lg transition-all">
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
