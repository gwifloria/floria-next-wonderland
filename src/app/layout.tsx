import "antd/dist/reset.css"; // ✅ 必须放在最靠前

import "@ant-design/v5-patch-for-react-19";

import PageHeader from "@/components/PageHeader";
import { AntdRegistry } from "@ant-design/nextjs-registry";

import ClientProviders from "./AntDProvider";

import { Delius } from "next/font/google";
import Debug from "./Debug";
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
        <div className="main-background bg-mint-100 mx-auto min-h-screen p-16">
          <PageHeader />
          <AntdRegistry>
            <ClientProviders>{children}</ClientProviders>
            <Debug></Debug>
          </AntdRegistry>
        </div>
      </body>
    </html>
  );
}
