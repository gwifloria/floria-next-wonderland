"use client";

import AntDShell from "@/provider/AntDShell";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import Image from "next/image";
import { useState } from "react";

interface PageIntroProps {
  title: string;
  emoji: string;
  children?: React.ReactNode;
}

// 完整版本 - 包含展开的内容区域
export default function PageIntro({ title, emoji, children }: PageIntroProps) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="max-w-sm relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 opacity-70">
        <Image
          src="/images/intro-bg.png"
          alt="Background"
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 384px) 100vw, 384px"
          priority
        />
      </div>
      <div className="relative z-10 p-4 bg-white/30 rounded-xl">
        <div className="prose prose-sm max-w-none text-neutral-700">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <AntDShell>
      <div className="flex items-center gap-3 mb-6">
        {/* 信息图标 - 悬浮显示详细信息 */}
        <Popover
          content={content}
          title={null}
          className="p-0"
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
