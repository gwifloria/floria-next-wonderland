import { useSWRMutation } from "@/api/useFetch";
import { Button, Form, Input, Select, Space } from "antd";
import { layout, options, tailLayout, teachers } from "./constants";
import { useEffect } from "react";
const { Option } = Select;

export const CasterForm = () => {
  const [form] = Form.useForm();

  const { trigger } = useSWRMutation("/floria-service/caster/subscribe", {
    method: "POST",
  });
  const onFinish = (values: any) => {
    trigger(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldValue("row", [1, 2]);
  }, [form]);

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="teacher" label="teacher" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {Object.keys(teachers).map((key: string) => (
            <Option key={key} value={key}>
              {String(teachers[key as any])}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="index" label="index" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="row" label="row">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          options={options.map((i) => {
            return {
              label: i,
              value: i,
            };
          })}
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
