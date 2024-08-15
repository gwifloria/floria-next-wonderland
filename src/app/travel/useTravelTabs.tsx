import { useSWR } from "@/api/useFetch";
import { TabPaneProps, Tabs, TabsProps } from "antd";
import { useMapTab } from "./useMapTab";
import { useEffect, useMemo } from "react";
import { useFancyList } from "./useFancyList";
import { Destination } from "@/types";
import { useDestinationUrl } from "./useDestinationUrl";

export interface TabChildren extends Omit<TabPaneProps, "children"> {}

export const useTravelTabs = () => {
  const { data } = useSWR<{
    data: Destination[];
  }>("/floria-service/destination/list", {
    method: "GET",
  });

  const visited = useMemo(() => data?.data.filter((v) => v.visited), [data]);
  const unvisited = useMemo(() => data?.data.filter((v) => !v.visited), [data]);
  const des = useDestinationUrl(visited);

  const mapTab = useMapTab(des);
  const fancyTab = useFancyList(des);

  useEffect(() => {}, []);

  const items: TabsProps["items"] = [
    {
      key: "2",
      label: "Fancy",
      children: fancyTab,
    },
    {
      key: "1",
      label: "Arrived",
      children: mapTab,
    },
  ];

  return (
    <>
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey="2"
        tabPosition="left"
        size="large"
        style={{ height: "70%" }}
        items={items}
      />
    </>
  );
};
