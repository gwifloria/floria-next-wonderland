export const statusColor = {
  open: "bg-red-50 text-red-600 border border-red-200",
  thinking: "bg-blue-50 text-blue-600 border border-blue-200",
  resolved: "bg-green-50 text-green-600 border border-green-200",
};

export const categoryLabel = {
  tech: "🧑‍💻 技术",
  life: "🍵 生活",
};
export type Category = keyof typeof categoryLabel;

export type LabEntry = {
  id: string;
  title: string;
  type: "idea" | "bug" | "todo";
  status: "open" | "thinking" | "resolved";
  tags?: string[];
  content: string;
  createdAt: string;
  category: Category;
};

export const exampleEntries: LabEntry[] = [
  {
    id: "1",
    title: "next.config.js rewrites 不生效",
    type: "bug",
    status: "resolved",
    tags: ["Next.js", "部署", "Render"],
    content:
      "原因是缺少 basePath + SSR 时读取失败。已通过 dynamic + no SSR 包装组件解决。",
    createdAt: "2025-08-07",
    category: "tech",
  },
  {
    id: "2",
    title: "是否要把 3D 模型和普通页面内容混在一个页面？",
    type: "idea",
    status: "thinking",
    tags: ["设计", "体验"],
    content: "当前 /space 页面是否能承担导航 / 介绍作用？是否可分层展示？",
    createdAt: "2025-08-06",
    category: "tech",
  },
  {
    id: "3",
    title: "为 3D 模型添加漫游功能",
    type: "todo",
    status: "open",
    tags: ["three.js", "交互"],
    content: "添加箭头或锚点以支持点击跳转 + camera 动画过渡。",
    createdAt: "2025-08-05",
    category: "tech",
  },
  {
    id: "4",
    title: "为什么最近容易烦躁？",
    type: "idea",
    status: "thinking",
    tags: ["情绪", "生活观察"],
    content: "可能和运动减少 / 睡眠质量有关。记录每日状态对比后再分析。",
    createdAt: "2025-08-03",
    category: "life",
  },
];

export const typeEmoji = {
  bug: "🐛",
  idea: "💡",
  todo: "📌",
};
export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const tabVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const cardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
export const typeStyle = {
  task: "bg-green-100 text-green-800",
  issue: "bg-red-100 text-red-800",
  idea: "bg-blue-100 text-blue-800",
};

export type LabCardType = keyof typeof typeStyle;
