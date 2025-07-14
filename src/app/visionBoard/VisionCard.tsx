import { Collapse } from "antd";
import { VisionItemProps } from "./constants";
import { useVisionItems } from "./useVisionItems";

export const VisionCard = ({ items }: { items: VisionItemProps[] }) => {
  const itemsDom = useVisionItems(items);

  return <Collapse defaultActiveKey={["0", "1", "2"]} ghost items={itemsDom} />;
};
