"use client";
import { Spin } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  cardVariants,
  Category,
  categoryLabel,
  containerVariants,
  tabVariants,
} from "./constant";
import LabCard from "./LabCard";
import { useLabApi } from "./useLab";

export default function LabPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("tech");
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const { entries, isLoading, deleteEntry, updateEntry, refresh } = useLabApi();

  const filteredEntries =
    entries?.filter(
      (entry) =>
        entry.category === activeCategory &&
        (!showOnlyPending || entry.status !== "resolved"),
    ) || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry(id);
      await refresh();
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateEntry({ id, status: newStatus });
      await refresh();
    } catch (error) {
      console.error("Failed to update entry:", error);
    }
  };

  return (
    <motion.main
      className="max-w-4xl mx-auto px-4 py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-8 bg-gradient-to-r from-mint-600 to-mint-400 bg-clip-text text-transparent"
        variants={tabVariants}
        initial="hidden"
        animate="visible"
      >
        🧪实验室
      </motion.h1>

      <motion.div
        className="flex flex-wrap justify-between items-center gap-4 mb-8"
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
      >
        <div className="flex gap-4">
          {(Object.keys(categoryLabel) as Category[]).map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-mint-500 text-white shadow-lg shadow-mint-500/30"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:shadow-md"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {categoryLabel[category]}
            </motion.button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyPending}
            onChange={(e) => setShowOnlyPending(e.target.checked)}
            className="w-4 h-4 accent-yellow-500"
          />
          👀 仅看未完成
        </label>
      </motion.div>

      <motion.div
        className="grid gap-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spin size="large" />
          </div>
        ) : filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <LabCard
              key={entry.id}
              {...entry}
              onDelete={() => handleDelete(entry.id)}
              onStatusChange={(status) => handleStatusChange(entry.id, status)}
            />
          ))
        ) : (
          <motion.div
            className="text-center py-12 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            暂无符合条件的记录 🤔
          </motion.div>
        )}
      </motion.div>
    </motion.main>
  );
}
