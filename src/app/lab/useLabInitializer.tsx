import { App, Modal } from "antd";
import { useState } from "react";
import LabForm from "./LabForm";
import { Category, LabEntry } from "./type";
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
  const { message } = App.useApp();

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
      close();
      refresh();
      message.success("🎉 创建成功！");
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
          <span>New Lab Inspiration</span>
        </span>
      }
      open={visible}
      onCancel={close}
      footer={null}
      width={480}
      centered
      className="init-modal"
      destroyOnHidden
      styles={{
        body: {
          borderRadius: 16,
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
