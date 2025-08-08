import { motion } from "framer-motion";
import { cardVariants, Category, statusColor } from "./constant";

const typeStyle = {
  todo: "bg-green-100 text-green-800",
  bug: "bg-red-100 text-red-800",
  idea: "bg-blue-100 text-blue-800",
};

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
        <div className="flex items-center gap-2">
          <button
            title={
              type === "todo"
                ? "记录待办任务"
                : type === "bug"
                  ? "问题/故障记录"
                  : "灵感或想法"
            }
            className={`text-xs px-2 py-1 rounded-full font-medium ${typeStyle[type]} hover:brightness-110 transition`}
            onClick={() => {
              // You can pass a handler from parent to implement filtering
              console.log("Type badge clicked:", type);
            }}
          >
            {type === "todo" && "✅ Todo"}
            {type === "bug" && "🧩 Bug"}
            {type === "idea" && "💡 Idea"}
          </button>
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-mint-600 transition-colors duration-300">
            {title}
          </h2>
        </div>
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
