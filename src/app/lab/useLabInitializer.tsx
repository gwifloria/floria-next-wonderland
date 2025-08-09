import { Modal, message } from "antd";
import { useState } from "react";
import { Category, LabEntry } from "./constant";
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
      message.success("创建成功");
      close();
      refresh();
    } catch (err) {
      message.error("创建失败");
    } finally {
      setLoading(false);
    }
  };

  const modal = (
    <Modal
      title="新增实验室内容"
      open={visible}
      onCancel={close}
      footer={null}
      width={600}
    >
      <LabForm
        onSubmit={handleSubmit}
        onCancel={close}
        loading={loading}
        initialValues={{ category: defaultCategory }}
      />
    </Modal>
  );

  return { open, close, modal, visible };
}
