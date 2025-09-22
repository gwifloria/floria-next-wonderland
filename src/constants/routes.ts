export type PageRoute =
  | "blog"
  | "letters"
  | "contact"
  | "tools"
  | "space"
  | "lab"
  | "travel"
  | "dance"
  | "gallery";

type PartialRouteMap<T> = Partial<Record<PageRoute, T>>;

// 路由图标配置 - 支持 emoji 和本地图标文件
export const routes: PartialRouteMap<{ emoji: string; icon?: string }> = {
  blog: { emoji: "🪶", icon: "blog-icon" },
  letters: { emoji: "✉️", icon: "letters-icon" },
  gallery: { emoji: "📸", icon: "gallery-icon" },
  contact: { emoji: "👋", icon: "contact-icon" },
};

export const hiddenRoutes = ["tools", "space", "travel", "dance", "lab"];

export const routeLabels: PartialRouteMap<string> = {
  blog: "Blog",
  letters: "Letters",
  contact: "Contact",
  lab: "Lab",
  tools: "Tools",
  space: "Space",
  travel: "Travel",
  dance: "Dance",
  gallery: "Gallery",
};

export const routeDescriptions: PartialRouteMap<string> = {
  blog: "技术笔记与生活感悟，从 Obsidian 同步",
  letters: "记录和小庄的邮件往来",
  contact: "简历&个人状态",
  lab: "实验室 - 记录想法与项目进展",
  tools: "实用工具集合",
  space: "3D 交互体验空间",
  travel: "足迹记录与旅行故事",
  dance: "舞蹈相关内容",
  gallery: "手帐风格的旅行相册与记忆收藏",
};
