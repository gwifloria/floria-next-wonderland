import { Category, LabItemType } from "./type";

export const statusColor = {
  open: "bg-red-50 text-red-600 border border-red-200",
  thinking: "bg-blue-50 text-blue-600 border border-blue-200",
  resolved: "bg-green-50 text-green-600 border border-green-200",
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
export const typeStyle: Record<LabItemType, string> = {
  issue: "bg-green-100 text-green-800",
  bug: "bg-red-100 text-red-800",
  idea: "bg-blue-100 text-blue-800",
};

export const typeEmoji: Record<LabItemType, string> = {
  bug: "🐛",
  idea: "💡",
  issue: "📌",
};
export const categoryLabelEmoji: Record<Category, string> = {
  tech: "🧑‍💻",
  life: "🍵",
};
