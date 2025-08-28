"use client";
import "./index.scss";
import { useTravelTabs } from "./useTravelTabs";

export default function Travel() {
  const Tabs = useTravelTabs();

  return <div className="travel-container justify-between h-dvh">{Tabs}</div>;
}
