import { PROSE_CLASS } from "@/app/blog/constants";
import { ScrapbookCard } from "@/app/contact/components/ScrapbookCard";
import { getTapeVariant } from "@/app/contact/utils";
import {
  createMarkdownComponents,
  type MarkdownSize,
} from "@/components/MarkdownComponents";
import matter from "gray-matter";
import { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface ResumeWrapperProps {
  /** Resume 内容 */
  content?: string;
  /** 静态组件降级 */
  fallbackComponent: ReactNode;
  /** 字号大小 */
  size?: MarkdownSize;
}

interface ResumeSection {
  title: string;
  content: string;
  order: number;
}

export const ResumeWrapper = ({
  content,
  fallbackComponent,
  size = "default",
}: ResumeWrapperProps) => {
  // 有内容就解析显示，没内容显示静态降级
  if (content) {
    console.log(
      "ResumeWrapper: Using dynamic content",
      content.slice(0, 100) + "...",
    );
    const { content: markdownContent } = matter(content);
    const sections = parseMarkdownSections(markdownContent);
    return <ResumeContent sections={sections} size={size} />;
  }

  // 没有内容，显示静态组件
  console.log("ResumeWrapper: Using static fallback");
  return <>{fallbackComponent}</>;
};

// 提取渲染逻辑为独立组件
const ResumeContent = ({
  sections,
  size,
}: {
  sections: ResumeSection[];
  size: MarkdownSize;
}) => {
  return (
    <div className="space-y-10">
      {sections.map((section, index) => (
        <ScrapbookCard
          key={section.title}
          title={section.title}
          tapeVariant={getTapeVariant(index)}
        >
          <div className={`prose prose-sm max-w-none ${PROSE_CLASS}`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings, rehypePrism]}
              components={createMarkdownComponents(size)}
            >
              {section.content}
            </ReactMarkdown>
          </div>
        </ScrapbookCard>
      ))}
    </div>
  );
};

/**
 * 解析markdown内容，按二级标题分段
 */
function parseMarkdownSections(content: string): ResumeSection[] {
  const lines = content.split("\n");
  const sections: ResumeSection[] = [];
  let currentSection: ResumeSection | null = null;
  let order = 0;

  for (const line of lines) {
    // 检测二级标题
    if (line.startsWith("## ")) {
      // 保存上一个section
      if (currentSection) {
        sections.push(currentSection);
      }

      // 开始新的section
      const title = line.replace("## ", "").trim();
      currentSection = {
        title,
        content: "",
        order: order++,
      };
    } else if (currentSection) {
      // 添加内容到当前section
      currentSection.content += line + "\n";
    }
  }

  // 添加最后一个section
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections.map((section) => ({
    ...section,
    content: section.content.trim(),
  }));
}

export default ResumeWrapper;
