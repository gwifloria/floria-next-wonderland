"use client";
import { AuthProvider } from "@/context";
import "./index.scss";
import withTheme from "@/theme";
import { useTravelTabs } from "./useTravelTabs";

const Travel = () => {
  const Tabs = useTravelTabs();

  return (
    <AuthProvider>
      <div className="travel-container justify-between h-dvh">{Tabs}</div>
    </AuthProvider>
  );
};
const BlogPage = () => {
  return withTheme(<Travel />);
};
export default BlogPage;
