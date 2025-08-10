"use client";
import withTheme from "@/theme";
import { PlusOutlined } from "@ant-design/icons";
import { App, Button, Spin } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  cardVariants,
  categoryLabelEmoji,
  containerVariants,
  tabVariants,
} from "./constant";
import LabCard from "./LabCard";
import { Category, LabEntry } from "./type";
import { useLabApi } from "./useLab";
import { useLabInitializer } from "./useLabInitializer";
import { useLabUpdater } from "./useLabUpdater";

const LabPageContainer = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("tech");
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const [editingEntry, setEditingEntry] = useState<LabEntry | null>(null);

  const { entries, isLoading, deleteEntry, updateEntry, refresh, isDeleting } =
    useLabApi();

  // 新建弹窗
  const labInit = useLabInitializer({ defaultCategory: activeCategory });

  // 编辑抽屉
  const labUpdater = useLabUpdater({ entry: editingEntry });

  const filteredEntries =
    entries?.filter(
      (entry) =>
        entry.category === activeCategory &&
        (!showOnlyPending || entry.status !== "resolved"),
    ) || [];

  const handleDelete = async (id: string) => {
    try {
      await deleteEntry({ id: id });
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

  // 打开编辑抽屉
  const handleEdit = (entry: LabEntry) => {
    console.log(entry);
    setEditingEntry(entry);
    labUpdater.open();
  };

  // 关闭编辑抽屉时清空 entry
  if (!labUpdater.visible && editingEntry) {
    setEditingEntry(null);
  }

  return (
    <motion.main
      className="max-w-4xl mx-auto px-4 py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <Spin size="large" tip="正在删除...">
            <div style={{ width: 100, height: 100 }} />{" "}
          </Spin>
        </div>
      )}
      <motion.h1
        className="text-xl font-bold mb-8 bg-gradient-to-r from-mint-600 to-mint-400 bg-clip-text text-transparent"
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
          {(Object.keys(categoryLabelEmoji) as Category[]).map((category) => (
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
              {categoryLabelEmoji[category]} {category.toUpperCase()}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button
            type="default"
            icon={<PlusOutlined />}
            onClick={labInit.open}
            className="bg-mint-500 hover:bg-mint-600"
          >
            New
          </Button>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyPending}
              onChange={(e) => setShowOnlyPending(e.target.checked)}
              className="w-4 h-4 accent-yellow-500"
            />
            👀 仅看未完成
          </label>
        </div>
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
              onEdit={() => handleEdit(entry)}
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

      {/* 新建弹窗 */}
      {labInit.modal}
      {/* 编辑抽屉 */}
      {labUpdater.drawer}
    </motion.main>
  );
};

const LabPage = () => {
  return withTheme(
    <App>
      <div className="lab-page-container">
        <LabPageContainer />
      </div>
    </App>,
  );
};
export default LabPage;
