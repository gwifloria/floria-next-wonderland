import { useSWRMutation } from "@/api/useFetch";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";

export const BlogUpload = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const { isMutating, trigger } = useSWRMutation(
    "/floria-service/excerpt/upload",
    { method: "POST" }
  );

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    form.validateFields().then(async (values) => {
      try {
        await trigger(values);
        setOpen(false);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    setOpen(false);
  };

  type FieldType = {
    bookName?: string;
    content?: string;
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Upload
      </Button>
      <Modal
        title="Upload Excerpt"
        open={open}
        confirmLoading={isMutating}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="upload excerpt"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="bookName"
            name="bookName"
            rules={[{ required: true, message: "Please input your bookName!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="content"
            name="content"
            rules={[{ required: true, message: "Please input your content!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
