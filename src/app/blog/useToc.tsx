import { useScroll, useSize } from "ahooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TocAside } from "./TocAside";

export type UseTocOptions = {
  /** Sticky header offset (px). Default: 96 */
  offset?: number;
  /** Heading selector to collect. Default: 'h2[id], h3[id]' */
  selector?: string;
};

/**
 * TOC + ScrollSpy relative to a scrollable container (non-window friendly).
 * - Finds the nearest scrollable ancestor of `containerRef`
 * - Computes heading positions relative to that ancestor
 * - Listens directly to the scroller's `scroll` event
 */
export const useTableOfContents = (
  containerRef: React.RefObject<HTMLElement | null>,
  scrollerRef: React.RefObject<HTMLElement | null>,
  options?: UseTocOptions,
) => {
  type TocItem = {
    id: string;
    text: string;
    level: 2 | 3;
    el: HTMLHeadingElement;
  };

  const scroll = useScroll(scrollerRef);
  const size = useSize(containerRef);

  const offset = options?.offset ?? 96;
  const selector = options?.selector ?? "h2[id], h3[id]";

  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [tocPositions, setTocPositions] = useState<number[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState("");

  const container = containerRef.current;

  // Collect headings matching selector within container
  const collect = useCallback(() => {
    if (!container) return;
    const headings = Array.from(
      container.querySelectorAll<HTMLHeadingElement>(selector),
    );
    setTocItems(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent || "",
        level: h.tagName === "H2" ? 2 : 3,
        el: h,
      })),
    );
  }, [container, selector]);

  useEffect(() => {
    collect();
  }, [collect]);

  // Compute positions of headings relative to scroller
  useEffect(() => {
    if (tocItems.length === 0) {
      setTocPositions([]);
      return;
    }

    const scrollerEl = scrollerRef.current;
    if (!scrollerEl) return;

    const computePositions = () => {
      const scrollerRect = scrollerEl.getBoundingClientRect();
      const currentScrollTop = scroll?.top ?? 0;
      return tocItems.map(
        (item) =>
          item.el.getBoundingClientRect().top -
          scrollerRect.top +
          currentScrollTop,
      );
    };

    setTocPositions(computePositions());
  }, [tocItems, scroll?.top, scrollerRef, size]);

  // Determine active heading based on scroll position and offset
  useEffect(() => {
    if (tocItems.length === 0 || tocPositions.length === 0) return;

    let rafId = 0;
    const scrollTop = scroll?.top ?? 0;

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const y = scrollTop + offset;
      let activeIndex = 0;
      for (let i = 0; i < tocPositions.length; i++) {
        if (tocPositions[i] <= y + 1) activeIndex = i;
        else break;
      }
      const currentId = tocItems[activeIndex]?.id ?? tocItems[0].id;
      setActiveHeadingId((prev) => (prev === currentId ? prev : currentId));
    });

    return () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };
  }, [tocItems, tocPositions, scroll?.top, offset]);

  const aside = useMemo(
    () => <TocAside items={tocItems} activeId={activeHeadingId} />,
    [tocItems, activeHeadingId],
  );
  return aside;
};
