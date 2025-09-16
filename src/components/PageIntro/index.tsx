"use client";

import AntDShell from "@/provider/AntDShell";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import { useState } from "react";

interface PageIntroProps {
  title: string;
  emoji: string;
  children?: React.ReactNode;
}

// 内嵌版本 - 只显示图标和 Popover
export function PageIntro({ title, emoji, children }: PageIntroProps) {
  const content = (
    <div className="max-w-sm">
      <div className="prose prose-sm max-w-none text-neutral-700">
        {children}
      </div>
    </div>
  );

  return (
    <AntDShell>
      <Popover
        content={content}
        title={
          <div className="flex items-center gap-2">
            <span>{emoji}</span>
            <span className="font-semibold">{title} - 技术实现</span>
          </div>
        }
        trigger="hover"
        placement="bottomLeft"
      >
        <button className="flex items-center justify-center w-5 h-5 rounded-full text-gray-400/60 hover:text-gray-500 hover:bg-gray-50/50 transition-all duration-200 group">
          <InfoCircleOutlined className="text-sm group-hover:scale-110 transition-transform" />
        </button>
      </Popover>
    </AntDShell>
  );
}

// 完整版本 - 包含展开的内容区域
export default function PageIntroFull({
  title,
  emoji,
  children,
}: PageIntroProps) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="max-w-sm">
      <div className="prose prose-sm max-w-none text-neutral-700">
        {children}
      </div>
    </div>
  );

  return (
    <AntDShell>
      <div className="flex items-center gap-3 mb-6">
        {/* 信息图标 - 悬浮显示详细信息 */}
        <Popover
          content={content}
          title={
            <div className="flex items-center gap-2">
              <span>{emoji}</span>
              <span className="font-semibold">{title} - 技术实现</span>
            </div>
          }
          trigger="hover"
          placement="bottomLeft"
          open={open}
          onOpenChange={setOpen}
        >
          <button
            className="flex items-center justify-center w-5 h-5 rounded-full text-gray-400/60 hover:text-gray-500 hover:bg-gray-50/50 transition-all duration-200 group"
            aria-label="查看技术实现详情"
            onClick={() => setOpen(!open)}
          >
            <InfoCircleOutlined className="text-sm group-hover:scale-110 transition-transform" />
          </button>
        </Popover>
      </div>
    </AntDShell>
  );
}
