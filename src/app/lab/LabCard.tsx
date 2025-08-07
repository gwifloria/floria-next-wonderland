import { motion } from "framer-motion";
import { cardVariants, Category, statusColor, typeEmoji } from "./constant";

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

export default function LabCard({
  id,
  title,
  type,
  status,
  tags,
  content,
  createdAt,
}: LabEntry) {
  return (
    <motion.div
      key={id}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:border-mint-200"
      variants={cardVariants}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-mint-600 transition-colors duration-300">
          {typeEmoji[type]} {title}
        </h2>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ${statusColor[status]}`}
        >
          {status}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{content}</p>
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <span className="bg-gray-50 px-2 py-1 rounded-md">📅 {createdAt}</span>
        {tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-50 rounded-md hover:bg-mint-50 hover:text-mint-600 cursor-pointer transition-colors duration-200"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
