import { Button, Form, Input, Select } from "antd";
import { LabEntry } from "./constant";

interface LabFormProps {
  initialValues?: Partial<LabEntry>;
  onSubmit: (values: Partial<LabEntry>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function LabForm({
  initialValues,
  onSubmit,
  onCancel,
  loading,
}: LabFormProps) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item
        name="title"
        label="标题"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input placeholder="输入标题" />
      </Form.Item>

      <Form.Item
        name="category"
        label="分类"
        rules={[{ required: true, message: "请选择分类" }]}
      >
        <Select placeholder="请选择分类">
          <Select.Option value="tech">🧑‍💻 技术</Select.Option>
          <Select.Option value="life">🍵 生活</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="type"
        label="类型"
        rules={[{ required: true, message: "请选择类型" }]}
      >
        <Select>
          <Select.Option value="idea">💡 想法</Select.Option>
          <Select.Option value="bug">🐛 问题</Select.Option>
          <Select.Option value="todo">📌 待办</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="content"
        label="内容"
        rules={[{ required: true, message: "请输入内容" }]}
      >
        <Input.TextArea rows={4} placeholder="详细描述..." />
      </Form.Item>

      <Form.Item name="tags" label="标签">
        <Select mode="tags" placeholder="添加标签" />
      </Form.Item>

      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onCancel}>取消</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          保存
        </Button>
      </div>
    </Form>
  );
}
