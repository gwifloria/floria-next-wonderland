"use client";

import UIProviders from "@/hooks/UIProviders";
import { themeConfig } from "@/theme";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function AntDProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyleProvider hashPriority="low">
      <AntdRegistry>
        <ConfigProvider theme={themeConfig}>
          <UIProviders>{children}</UIProviders>
        </ConfigProvider>
      </AntdRegistry>
    </StyleProvider>
  );
}
