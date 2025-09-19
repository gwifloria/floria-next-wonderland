import { useEffect, useRef, useState } from "react";
import { GALLERY_CONFIG } from "./constants";

export const useResponsiveColumns = () => {
  const [columns, setColumns] = useState<number>(
    GALLERY_CONFIG.COLUMNS.DESKTOP,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      if (width < GALLERY_CONFIG.BREAKPOINTS.MOBILE) {
        setColumns(GALLERY_CONFIG.COLUMNS.MOBILE);
      } else if (width < GALLERY_CONFIG.BREAKPOINTS.TABLET) {
        setColumns(GALLERY_CONFIG.COLUMNS.TABLET);
      } else if (width < GALLERY_CONFIG.BREAKPOINTS.DESKTOP) {
        setColumns(GALLERY_CONFIG.COLUMNS.DESKTOP);
      } else {
        setColumns(GALLERY_CONFIG.COLUMNS.LARGE);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return { columns, containerRef };
};

export const useInfiniteScroll = (onLoadMore?: () => void) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current || !onLoadMore) return;

    let timeoutId: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            onLoadMore();
          }, GALLERY_CONFIG.OBSERVER.DEBOUNCE_DELAY);
        }
      },
      {
        rootMargin: GALLERY_CONFIG.OBSERVER.INFINITE_SCROLL_MARGIN,
        threshold: GALLERY_CONFIG.OBSERVER.THRESHOLD,
      },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [onLoadMore]);

  return { loadMoreRef };
};
