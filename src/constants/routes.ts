export type PageRoute =
  | "blog"
  | "letters"
  | "contact"
  | "tools"
  | "space"
  | "lab"
  | "travel"
  | "dance";

type PartialRouteMap<T> = Partial<Record<PageRoute, T>>;

// 路由图标配置 - 支持 emoji 和本地图标文件
export const routes: PartialRouteMap<{ emoji: string; icon?: string }> = {
  blog: { emoji: "🪶", icon: "blog-icon" },
  letters: { emoji: "✉️", icon: "letters-icon" },
  lab: { emoji: "🪴", icon: "lab-icon" },
  contact: { emoji: "👋", icon: "contact-icon" },
};

export const hiddenRoutes = ["tools", "space", "travel", "dance"];

export const routeLabels: PartialRouteMap<string> = {
  blog: "Blog",
  letters: "Letters",
  contact: "Contact",
  lab: "Lab",
  tools: "Tools",
  space: "Space",
  travel: "Travel",
  dance: "Dance",
};

export const routeDescriptions: PartialRouteMap<string> = {
  blog: "技术笔记与生活感悟，从 Obsidian 同步",
  letters: "与家人的邮件往来，记录温馨时光",
  contact: "了解我的经历与联系方式",
  lab: "实验室 - 记录想法与项目进展",
  tools: "实用工具集合",
  space: "3D 交互体验空间",
  travel: "足迹记录与旅行故事",
  dance: "舞蹈相关内容",
};
