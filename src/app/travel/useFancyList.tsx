import { useSWRMutation } from "@/api/useFetch";
import { Destination, MapDestinationMarker } from "@/types";
import { Button, Card, Popconfirm, Space, Tag } from "antd";
const { Meta } = Card;
import type { PopconfirmProps } from "antd";
// TODO
interface FancyItem extends MapDestinationMarker {
  _id?: string;
}

const FancyItem = ({ item }: { item: FancyItem }) => {
  const { trigger } = useSWRMutation("/floria-service/destination/delete", {
    method: "DELETE",
  });

  const handleDelete: PopconfirmProps["onConfirm"] = (e) => {
    trigger({ id: item._id });
  };
  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
  };
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img alt={item.destination} src={item?.gitImages?.[0]?.download_url} />
      }
    >
      <Meta title={item.destination} description={item.destination} />
      <Tag>Domestic</Tag>
      <Space>
        <Button>编辑</Button>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={handleDelete}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </Space>
    </Card>
  );
};

export const useFancyList = (data?: FancyItem[]) => {
  return (
    <div className="fancy-container">
      {data?.map((d, i) => <FancyItem key={i} item={d}></FancyItem>)}
    </div>
  );
};
