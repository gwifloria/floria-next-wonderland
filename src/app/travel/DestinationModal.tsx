import { useSWRMutation } from "@/api/useFetch";
import { DatePicker, Form, Input, Modal, Switch } from "antd";
import { MapMouseEvent } from "mapbox-gl";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import layout from "../layout";
const wc = require("which-country");

export const DestinationModal = forwardRef(function A(props, ref) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { trigger } = useSWRMutation("/floria-service/destination/add", {
    method: "POST",
  });

  const showModal = useCallback(
    (e: MapMouseEvent) => {
      const { lngLat } = e;
      const { lng, lat } = lngLat;
      const country = wc([lng, lat]);

      form.setFieldsValue({ longitude: lng, latitude: lat, country });
      setIsModalOpen(true);
    },
    [form],
  );

  const handleOk = async () => {
    const res = await form.validateFields();
    await trigger(res);
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        showModal,
      };
    },
    [showModal],
  );
  const dom = (
    <>
      <Modal
        title="New Destination!"
        open={isModalOpen}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {" "}
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
          <Form.Item name="visited" label="visited">
            <Switch />
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
          {/* <Form.Item name="planning-date" label="planning-date">
            <DatePicker picker="month" />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );

  return dom;
});
