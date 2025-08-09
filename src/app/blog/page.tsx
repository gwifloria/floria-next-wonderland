"use client";
import { AuthProvider } from "@/context";
import type { TabsProps } from "antd";
import { Tabs } from "antd";
import { BlogList } from "./BlogList";
import "./index.scss";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "BlogList",
    children: (
      <div className="blog-list">
        <BlogList></BlogList>
      </div>
    ),
  },
  // {
  //   key: "2",
  //   label: "Upload",
  //   children: <BlogEditor></BlogEditor>,
  // },
];
const Blog = () => {
  return (
    <AuthProvider>
      <div className="blog-container justify-between">
        <Tabs
          type="card"
          size="large"
          tabPosition="left"
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </AuthProvider>
  );
};

export default Blog;
