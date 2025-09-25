"use client";

import Image from "next/image";
import { useState } from "react";

export const UsageGuide = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-[440px] opacity-65 flex justify-center py-4 hidden md:block">
      {/* 主便签 - 预留图片位置 */}
      <div className="absolute opacity-60 z-22 w-full">
        <Image
          alt="main"
          src="/images/guide.png"
          width={420}
          height={420}
        ></Image>
      </div>
      <div className="absolute top-0 w-full">
        <Image alt="dog" src="/images/dog.png" width={30} height={30}></Image>
      </div>
      <div
        className="relative w-full rounded-lg px-8 py-2 -rotate-2 transform transition-all duration-300 hover:rotate-0"
        style={{ transform: "rotate(-1.5deg)" }}
      >
        <div className="w-full relative px-4 flex justify-between gap-1 mb-3">
          <h3 className="ml-8 text-xs font-semibold text-amber-700 mb-1">
            💡 关于这个网站
          </h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-amber-600/60 hover:text-amber-800 transition-colors"
            aria-label="关闭指南"
          >
            ×
          </button>
        </div>

        <div className="px-4 text-xs text-amber-700/80">
          {/* 个人创作理念 */}
          <p>灵感由 ChatGPT 和Claude和我联袂赞助🌟</p>
          <p>感谢 Vercel+MongoDB+Github让我目前0元托管本网站的前后端</p>
          <p className="leading-relaxed mb-2">
            💻技术框架:
            <span className="list-disc list-inside space-y-1 text-xs">
              Next/React/TS/Express/Mongodb/AntD/Tailwind
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsageGuide;
