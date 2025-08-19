import { App, Drawer } from "antd";
import { useState } from "react";
import LabForm from "./LabForm";
import { LabEntry } from "./type";
import { useLabApi } from "./useLab";

interface UseLabUpdaterProps {
  entry?: LabEntry | null;
}

export function useLabUpdater({ entry }: UseLabUpdaterProps) {
  const { message } = App.useApp();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateEntry, refresh } = useLabApi();

  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const handleSubmit = async (values: Partial<LabEntry>) => {
    if (!entry) return;
    setLoading(true);
    try {
      await updateEntry({
        id: entry.id,
        ...values,
      });
      close();
      refresh();
      console.log(message);
      message.success("更新成功");
    } catch (err) {
      message.error("更新失败");
    } finally {
      setLoading(false);
    }
  };

  const drawer = (
    <Drawer
      title="编辑实验室内容"
      open={visible}
      onClose={close}
      width={480}
      destroyOnHidden
    >
      <LabForm
        initialValues={entry ?? undefined}
        onSubmit={handleSubmit}
        onCancel={close}
        loading={loading}
      />
    </Drawer>
  );

  return { open, close, drawer, visible };
}
