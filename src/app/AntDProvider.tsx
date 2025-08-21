"use client";

import { themeConfig } from "@/theme";
import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";

export default function AntDProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyleProvider hashPriority="high">
      <App>
        <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
      </App>
    </StyleProvider>
  );
}
