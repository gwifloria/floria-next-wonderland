"use client";

import "@ant-design/v5-patch-for-react-19";

import PageHeader from "@/app/components/PageHeader";
import { useConfetti } from "@/hooks/useConfetti";
import { themeConfig } from "@/theme";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import { Delius } from "next/font/google";
import "./globals.css";

const delius = Delius({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { confettiContext } = useConfetti();

  return (
    <html className="dark" lang="en">
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body className={delius.className}>
        <div className="main-background bg-mint-100 mx-auto min-h-screen p-20">
          <PageHeader />
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
