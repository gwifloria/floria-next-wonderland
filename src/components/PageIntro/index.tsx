"use client";

import AntDShell from "@/provider/AntDShell";
import { Popover } from "antd";
import Image from "next/image";
import { useState } from "react";

interface PageIntroProps {
  children?: React.ReactNode;
}

export default function PageIntro({ children }: PageIntroProps) {
  const [open, setOpen] = useState(false);

  const content = (
    <div className="max-w-xs">
      <div className="text-sm text-neutral-700 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <AntDShell>
      <Popover
        content={content}
        title={null}
        trigger="hover"
        placement="bottomLeft"
        open={open}
        onOpenChange={setOpen}
      >
        <button
          className="relative inline-block rotate-12 opacity-70 hover:opacity-100 transition-all duration-200 group"
          aria-label="查看页面详情"
          onClick={() => setOpen(!open)}
        >
          <Image
            src="/images/env-small.png"
            alt="Info tape"
            width={24}
            height={16}
            className="object-contain group-hover:scale-105 transition-transform"
          />
        </button>
      </Popover>
    </AntDShell>
  );
}
