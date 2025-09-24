"use client";

import Image from "next/image";
import { useState } from "react";

export const UsageGuide = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative max-w-md flex justify-center py-4">
      <div className="relative w-[300px]">
        {/* 主便签 - 预留图片位置 */}
        <div className="absolute opacity-60 z-22 w-full">
          <Image
            alt="main"
            src="/images/bg.png"
            width={350}
            height={600}
          ></Image>
        </div>
        <div className="absolute top-0 w-full">
          <Image alt="dog" src="/images/dog.png" width={40} height={40}></Image>
        </div>
        <div
          className="relative w-full rounded-lg px-4 py-8 -rotate-2 transform transition-all duration-300 hover:rotate-0"
          style={{ transform: "rotate(-1.5deg)" }}
        >
          <div className="w-full relative px-4 flex justify-between gap-3 mb-3">
            <h3 className="ml-8 text-sm font-semibold text-amber-800 mb-1">
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

          {/* 指南内容 */}
          <div className="space-y-3 px-4 text-xs text-amber-800/90">
            {/* 个人创作理念 */}
            <div>
              <p className="leading-relaxed text-amber-700/80">
                灵感由 ChatGPT 和Claude和我联袂赞助🌟
              </p>
              <div className="text-amber-700/80">
                <p className="leading-relaxed mb-2">技术框架是</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Next+ React +Typescript</li>
                  <li>Express+Mongodb💻</li>
                  <li>AntD+Tailwind</li>
                </ul>
              </div>
              <p className="leading-relaxed text-amber-700/80">
                感谢 Vercel+MongoDB+Github让我目前0元托管本网站的前后端
              </p>
            </div>
          </div>
        </div>

        {/* 装饰性小便签 */}
        <div
          className="absolute bottom-2 left-2 "
          style={{ transform: "rotate(8deg)" }}
        >
          <Image alt="tape" src="/images/tutorial-tape.png" fill></Image>
        </div>
      </div>
    </div>
  );
};

export default UsageGuide;
