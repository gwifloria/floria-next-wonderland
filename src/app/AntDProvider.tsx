"use client";

import UIProviders from "@/hooks/UIProviders";
import { themeConfig } from "@/theme";
import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { SWRConfig } from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function AntDProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyleProvider hashPriority="low">
      <AntdRegistry>
        <ConfigProvider theme={themeConfig}>
          <UIProviders>
            <SWRConfig
              value={{
                refreshInterval: 3000,
                fetcher: fetcher,
              }}
            >
              {children}
            </SWRConfig>
          </UIProviders>
        </ConfigProvider>
      </AntdRegistry>
    </StyleProvider>
  );
}
