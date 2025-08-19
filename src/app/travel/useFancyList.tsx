import { useSWRMutation } from "@/api/useFetch";
import { MapDestinationMarker } from "@/types";
import type { PopconfirmProps } from "antd";
import { Button, Card, Image, Popconfirm, Space, Tag } from "antd";
const { Meta } = Card;
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
        <Image
          alt={item.destination}
          src={item?.gitImages?.[0]?.download_url}
          width={240}
          height={160}
        />
      }
    >
      <Meta title={item.destination} description={item.destination} />
      <Tag>Domestic</Tag>
      <Space>
        <Button>编辑</Button>
        <Popconfirm
          title="Delete the issue"
          description="Are you sure to delete this issue?"
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
      {data?.map((d, i) => (
        <FancyItem key={i} item={d}></FancyItem>
      ))}
    </div>
  );
};
