import { TabPaneProps, Tabs, TabsProps } from "antd";
import { useDestinations } from "./useData";
import { useMapTab } from "./useMapTab";

export interface TabChildren extends Omit<TabPaneProps, "children"> {}

export const useTravelTabs = () => {
  const data = useDestinations();

  const mapTab = useMapTab();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Arrived",
      children: mapTab,
    },
    {
      key: "2",
      label: "Fancy",
      children: <div></div>,
    },
  ];

  return (
    <>
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey="1"
        tabPosition="left"
        size="large"
        style={{ height: "70%" }}
        items={items}
      />
    </>
  );
};
