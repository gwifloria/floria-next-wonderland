"use client";
import { useEffect } from "react";
import { useTableOfContents } from "./useToc";

export default function TocClient() {
  const { containerRef, scrollerRef, tocAside } = useTableOfContents();

  useEffect(() => {
    // 连接到 SSR 渲染的 DOM 元素
    const container = document.querySelector(
      "[data-markdown-container]",
    ) as HTMLElement;
    const scroller = document.querySelector(
      "[data-markdown-scroller]",
    ) as HTMLElement;

    if (container && scroller) {
      containerRef.current = container;
      scrollerRef.current = scroller;
    }
  }, [containerRef, scrollerRef]);

  return <div className="hidden lg:block">{tocAside}</div>;
}
