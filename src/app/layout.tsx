import "antd/dist/reset.css"; // ✅ 必须放在最靠前

import "@ant-design/v5-patch-for-react-19";

import PageHeader from "@/components/PageHeader";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Delius } from "next/font/google";
import { Metadata } from "next/types";
import "./globals.css";

const delius = Delius({ subsets: ["latin"], weight: "400", display: "swap" });
export const metadata: Metadata = {
  title: "floria-wonderland",
  description:
    "floria's personal portfolio showcasing React, Next.js, and front-end projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html title="floria-wonderland" lang="en">
      <body className={`${delius.className} bg-mint-100`}>
        <div className="fixed inset-0 -z-10 bg-white/10 overflow-hidden" />
        {/* 柔化遮罩 */}
        <div className="main-background overflow-hidden mx-auto h-dvh p-16 pt-[56px]">
          <PageHeader />

          <div className="h-full overflow-auto">
            {children}
            <SpeedInsights></SpeedInsights>
          </div>
        </div>
      </body>
    </html>
  );
}
