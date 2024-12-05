"use client";
import { AuthProvider } from "@/context";
import { BlogList } from "./BlogList";
import withTheme from "@/theme";
import { BlogEditor } from "./BlogEditor";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
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
  {
    key: "2",
    label: "Upload",
    children: <BlogEditor></BlogEditor>,
  },
];
const Blog = () => {
  return (
    <AuthProvider>
      <div className="blog-container justify-between">
        <Tabs
          type="card"
          size="large"
          tabPosition="left"
          defaultActiveKey="2"
          items={items}
        />
      </div>
    </AuthProvider>
  );
};
const BlogPage = () => {
  return withTheme(<Blog />);
};
export default BlogPage;
