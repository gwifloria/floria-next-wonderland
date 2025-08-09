"use client";
import { AuthProvider } from "@/context";
import "./index.scss";
import { useTravelTabs } from "./useTravelTabs";

const Travel = () => {
  const Tabs = useTravelTabs();

  return (
    <AuthProvider>
      <div className="travel-container justify-between h-dvh">{Tabs}</div>
    </AuthProvider>
  );
};

export default Travel;
