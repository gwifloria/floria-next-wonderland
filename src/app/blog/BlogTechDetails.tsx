import { SITE_CONFIG } from "@/constants";
import Image from "next/image";

export default function BlogTechDetails() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg text-neutral-800">
        我是怎么折腾这个博客的
      </h3>
      <div className="space-y-3">
        <div>
          <strong>写作工具：</strong>Obsidian 写作，Git 自动同步
        </div>
        <div>
          <strong>前端渲染：</strong>调用 github API 获取 md 文件
        </div>
      </div>
      <div className="relative p-4 overflow-hidden min-h-[80px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-60">
          <Image
            src="/images/pink-sizhi.png"
            alt="Pink sticky note decoration"
            fill
            className="object-contain"
            sizes="300px"
          />
        </div>
        <div className="relative z-10 text-center">
          这样就不用多端手动同步了，
          <a
            href={`${SITE_CONFIG.url}/blog/ByteNotes/%E4%B8%AA%E4%BA%BA%E5%89%8D%E7%AB%AFBlog%E4%B8%8E%20Obsidian%20%E5%90%8C%E6%AD%A5.md`}
            // target="_blank"
            rel="noopener noreferrer"
            className="text-mint-600 hover:text-mint-700 underline ml-1"
          >
            详情见这里
          </a>
        </div>
      </div>
    </div>
  );
}
