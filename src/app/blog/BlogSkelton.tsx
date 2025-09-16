import PageIntro from "@/components/PageIntro";
import { Skeleton, Space } from "antd";
import Image from "next/image";

export function EmptyState() {
  return (
    <>
      <div className=" relative flex items-center flex-col justify-center bg-gray-50/30 rounded-xl">
        <Image
          className="opacity-80 mx-auto mb-6"
          alt="note"
          height={100}
          width={100}
          src="/images/note-rose.png"
        ></Image>
        <div className="max-w-5xl text-left mx-auto p-6">
          <h2 className="text-xl font-semibold mb-4">欢迎来到我的 blog 区</h2>
          <PageIntro title="Blog" emoji="✏️">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-neutral-800">
                技术实现
              </h3>
              <div className="space-y-3">
                <div>
                  <strong>内容创作：</strong>使用 Obsidian
                  进行写作，支持双向链接和图谱结构
                </div>
                <div>
                  <strong>自动同步：</strong>通过 Git 仓库自动同步 Obsidian
                  笔记到项目
                </div>
                <div>
                  <strong>API 集成：</strong>后端 API 实时读取 Markdown
                  文件并解析为 HTML
                </div>
                <div>
                  <strong>分类系统：</strong>
                  <ul className="ml-4 mt-2 space-y-1">
                    <li>
                      • <strong>ByteNotes</strong>：技术学习与开发笔记
                    </li>
                    <li>
                      • <strong>LifeNotes</strong>：生活感悟与思考
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <strong>特色功能：</strong>
                支持语法高亮、数学公式、目录导航和标签检索
              </div>
            </div>
          </PageIntro>
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
      </div>
      <div className="h-[260px] w-[200px] right-0 bottom-0 absolute opacity-20">
        <Image alt="corner" fill src="/images/girl-with-book-brown.png"></Image>
      </div>
    </>
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
