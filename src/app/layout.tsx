"use client";
import "antd/dist/reset.css"; // ✅ 必须放在最靠前

import "@ant-design/v5-patch-for-react-19";

import PageHeader from "@/app/components/PageHeader";
import { themeConfig } from "@/theme";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import { Delius } from "next/font/google";
import CommitInfo from "./components/CommitInfo";
import "./globals.css";

const delius = Delius({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={delius.className}>
        <div className="main-background bg-mint-100 mx-auto min-h-screen p-20">
          <PageHeader />
          <CommitInfo></CommitInfo>
          <AntdRegistry>
            <App>
              <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
            </App>
          </AntdRegistry>
        </div>
      </body>
    </html>
  );
}
