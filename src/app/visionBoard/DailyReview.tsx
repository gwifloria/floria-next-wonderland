import { Card, Form, Input, Space } from "antd";

export const DailyReview = () => {
  const [form] = Form.useForm();
  return (
    <div className="daily-review">
      <Card>
        <Form
          form={form}
          name="dynamic_form_complex"
          style={{ maxWidth: 600 }}
          autoComplete="off"
          initialValues={{ items: [{}] }}
        >
          <Form.List name="items">
            {(fields) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key}>
                    <Form.Item
                      label="highlight"
                      name={[field.name, "highlight"]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="improvement"
                      name={[field.name, "improvement"]}
                    >
                      <Input />
                    </Form.Item>
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </Card>
    </div>
  );
};
