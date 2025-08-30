import { LabCategory, LabType } from "@/types/lab";
import { type Variants } from "framer-motion";

export const statusColor = {
  open: "bg-macaronblue-50 text-macaronblue-600 border border-macaronblue-200",
  inProgress:
    "bg-warmOrange-50 text-warmOrange-600 border border-warmOrange-200",
  resolved: "bg-rose-50 text-rose-600 border border-rose-200",
};

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const tabVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
export const typeStyle: Record<LabType, string> = {
  issue: "bg-green-50 text-green-800",
  bug: "bg-rose-50 text-rose-800",
  idea: "bg-nepal-50 text-nepal-800",
};

export const typeEmoji: Record<LabType, string> = {
  bug: "🐛",
  idea: "💡",
  issue: "📌",
};
export const categoryLabelEmoji: Record<LabCategory, string> = {
  tech: "🧑‍💻",
  life: "🍵",
};
export const confettiColors = [
  "#A8D8B9", // 薄荷绿
  "#F7DAD9", // 浅粉
  "#FCE5B0", // 奶油黄
  "#B5D6E0", // 雾蓝
  "#FFD6A5", // 蜜桃橙（高光点缀）
];
