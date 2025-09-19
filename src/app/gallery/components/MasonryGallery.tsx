"use client";

import { GalleryImage } from "@/types/gallery";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PolaroidFrame } from "./PolaroidFrame";

interface MasonryGalleryProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
  onLoadMore?: () => void;
}

export function MasonryGallery({
  images,
  onImageClick,
  onLoadMore,
}: MasonryGalleryProps) {
  const [columns, setColumns] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 响应式列数计算
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      if (width < 640) {
        setColumns(1); // 手机端
      } else if (width < 1024) {
        setColumns(2); // 平板端
      } else if (width < 1536) {
        setColumns(3); // 桌面端
      } else {
        setColumns(4); // 大屏幕
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "100px", // Trigger 100px before element comes into view
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [onLoadMore]);

  // 计算每列的图片
  const organizeImages = () => {
    const columnArrays: GalleryImage[][] = Array.from(
      { length: columns },
      () => [],
    );
    const columnHeights = new Array(columns).fill(0);

    images?.forEach((image) => {
      const shortestIndex = columnHeights.reduce(
        (minIdx, cur, i) => (cur < columnHeights[minIdx] ? i : minIdx),
        0,
      );
      // 将图片添加到该列
      columnArrays[shortestIndex].push(image);

      // 更新该列的高度（按比例计算）
      const aspectRatio = image.height / image.width;
      columnHeights[shortestIndex] += aspectRatio * 200; // 进一步调整基准宽度为200px
    });

    return columnArrays;
  };

  const columnArrays = organizeImages();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto"
    >
      <div
        className="flex gap-4 justify-center"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {columnArrays.map((columnImages, columnIndex) => (
          <motion.div
            key={columnIndex}
            variants={columnVariants}
            className="flex flex-col gap-6"
            style={{ flex: 1, maxWidth: `${100 / columns}%` }}
          >
            {columnImages.map((image, imageIndex) => (
              <motion.div
                key={image.id}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: Math.random() * 10 - 5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: Math.random() * 6 - 3, // 随机轻微旋转
                }}
                transition={{
                  delay: columnIndex * 0.1 + imageIndex * 0.2,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.02,
                  rotate: 0, // 悬停时回正
                  transition: { duration: 0.3 },
                }}
                className="cursor-pointer"
                onClick={() => onImageClick(image)}
              >
                <PolaroidFrame
                  image={image}
                  variant={imageIndex % 2 === 0 ? "tape" : "corner"}
                  tapeColor={
                    ["pink", "beige", "blue"][imageIndex % 3] as
                      | "pink"
                      | "beige"
                      | "blue"
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Invisible element for intersection observer */}
      <div ref={loadMoreRef} className="h-1" />
    </motion.div>
  );
}
