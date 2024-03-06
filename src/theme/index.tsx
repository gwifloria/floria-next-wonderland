"use client";

import { ConfigProvider } from "antd";
import { ThemeConfig } from "antd";

export const themeConfigToken: ThemeConfig["token"] = {
  colorPrimary: "#a7c7b0",
  colorInfo: "#9cbfa6",
  colorWarning: "#c9957a",
  colorError: "#af5554",
  colorSuccess: "#148426",
  colorBgBase: "#9cada1",
  colorTextBase: "#3a3636",
};

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: themeConfigToken,
      }}
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
