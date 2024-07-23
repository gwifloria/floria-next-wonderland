import { Button, DatePicker, Form, Input, Modal, Select, Space } from "antd";
import { MapMouseEvent } from "mapbox-gl";
import { useCallback, useState } from "react";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const useDestinationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = useCallback(
    (e: MapMouseEvent) => {
      const { lngLat } = e;
      const { lng, lat } = lngLat;
      form.setFieldsValue({ longitude: lng, latitude: lat });
      setIsModalOpen(true);
    },
    [form]
  );

  const handleOk = () => {
    form.validateFields().then((res) => {
      console.log(res);
      setIsModalOpen(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const dom = (
    <>
      <Modal
        title="New Destination!"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          preserve={false}
          {...layout}
          form={form}
          name="control-hooks"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="destination"
            label="destination"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="longitude"
            label="longitude"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="latitude"
            label="latitude"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item name="planning-date" label="planning-date">
            <DatePicker picker="month" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );

  return { dom, showModal };
};
