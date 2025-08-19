"use client";
import { AuthProvider } from "@/context";
import "./index.scss";
import { useTravelTabs } from "./useTravelTabs";

export default function Travel() {
  const Tabs = useTravelTabs();

  return (
    <AuthProvider>
      <div className="travel-container justify-between h-dvh">{Tabs}</div>
    </AuthProvider>
  );
}
