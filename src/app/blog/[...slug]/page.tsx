"use client";
import { toAbsPath } from "@/util/path";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import React from "react";
import { MarkdownWrapper } from "../MarkdownWrapper";

export default function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolved = React.use(params);
  const path = resolved.slug.map(decodeURIComponent).join("/");

  return (
    <>
      <Link
        className="mb-4 block"
        href={toAbsPath("/blog")}
        aria-label="返回文章列表"
      >
        <Button
          style={{ background: "#fff" }}
          type="default"
          size="small"
          icon={<LeftOutlined />}
        >
          返回
        </Button>
      </Link>
      <MarkdownWrapper path={path} />
    </>
  );
}
