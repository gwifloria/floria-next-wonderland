import { Category, LabItemType } from "./type";

function genStatusColor(name: string) {
  return `bg-${name}-50 text-${name}-500 border border-${name}-100`;
}

export const statusColor = {
  open: genStatusColor("macaron-blue"),
  inProgress: genStatusColor("warmOrange"),
  resolved: genStatusColor("rose"),
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
function genTypeColor(name: string) {
  return `bg-${name}-50 text-${name}-800`;
}

export const typeStyle: Record<LabItemType, string> = {
  issue: genTypeColor("mint"),
  bug: genTypeColor("rose"),
  idea: genTypeColor("nepal"),
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
