import { Modal, message } from "antd";
import { useState } from "react";
import { Category, LabEntry } from "./constant";
import "./index.scss";
import LabForm from "./LabForm";
import { useLabApi } from "./useLab";

interface UseLabInitializerProps {
  defaultCategory?: Category;
}

export function useLabInitializer({
  defaultCategory = "tech",
}: UseLabInitializerProps = {}) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addEntry, refresh } = useLabApi();

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const handleSubmit = async (values: Partial<LabEntry>) => {
    setLoading(true);
    try {
      await addEntry({
        ...values,
        category: defaultCategory,
        status: "open",
        createdAt: new Date().toISOString(),
      });
      message.success("🎉 创建成功！");
      close();
      refresh();
    } catch (err) {
      message.error("😢 创建失败，请重试！");
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <Modal
      title={
        <span className="flex items-center gap-2 text-xl font-bold text-mint-600">
          <span>🌱</span>
          <span>新增实验室内容</span>
        </span>
      }
      open={visible}
      onCancel={close}
      footer={null}
      width={480}
      centered
      className="init-modal"
      styles={{
        body: {
          borderRadius: 16,
          background: "#f7fafc",
          boxShadow: "0 4px 24px 0 rgba(0,0,0,0.04)",
          padding: 32,
        },
      }}
    >
      <LabForm
        onSubmit={handleSubmit}
        onCancel={close}
        loading={loading}
        initialValues={{ category: defaultCategory }}
      />
      <div className="text-center mt-4 text-xs text-gray-400">✨ ✨</div>
    </Modal>
  );

  return { open, close, modal, visible };
}
