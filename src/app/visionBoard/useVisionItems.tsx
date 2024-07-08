import _ from "lodash";
import { VisionItemProps } from "./constants";

export const useVisionItems = (items: VisionItemProps[]) => {
  const itemsDom = items?.map((item) => {
    return {
      label: item.label,
      children: _.isArray(item.children) ? (
        item.children.map((v) => <p key={v}>{v}</p>)
      ) : (
        <p>{item.children}</p>
      ),
    };
  });

  return itemsDom;
};
