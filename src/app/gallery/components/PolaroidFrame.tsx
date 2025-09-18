"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { TAPE_VARIANTS } from "../../contact/constant";
import { GalleryImage } from "@/types/gallery";

interface PolaroidFrameProps {
  image: GalleryImage;
  variant?: "tape" | "corner" | "simple";
  tapeColor?: "pink" | "beige" | "blue";
}

export function PolaroidFrame({
  image,
  variant = "tape",
  tapeColor = "beige",
}: PolaroidFrameProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const aspectRatio = image.height / image.width;
  const frameHeight = Math.min(aspectRatio * 300, 500); // 限制最大高度

  const getTapePosition = () => {
    const positions = [
      { top: "-8px", left: "-12px", rotate: "12deg" },
      { top: "-10px", right: "-15px", rotate: "-8deg" },
      { bottom: "-8px", left: "-10px", rotate: "-15deg" },
      { bottom: "-6px", right: "-12px", rotate: "10deg" },
    ];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  const tapePosition = getTapePosition();

  const getRandomRotation = () => {
    return Math.random() * 4 - 2; // -2 到 2 度的随机旋转
  };

  return (
    <motion.div
      className="relative group polaroid-hover"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
    >
      {/* Polaroid 相框 */}
      <div
        className="relative bg-white p-2 sm:p-3 pb-8 sm:pb-12 shadow-lg transform polaroid-texture polaroid-frame"
        style={{
          transform: `rotate(${getRandomRotation()}deg)`,
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
        }}
      >
        {/* 图片容器 */}
        <div
          className="relative overflow-hidden bg-gray-100"
          style={{ height: `${frameHeight}px` }}
        >
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-milktea-100 to-milktea-200 animate-pulse flex items-center justify-center">
              <div className="text-milktea-400 text-sm">Loading...</div>
            </div>
          )}

          {!imageError && (
            <Image
              src={image.src}
              alt="p"
              fill
              className={`object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
              }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {imageError && (
            <div className="absolute inset-0 bg-milktea-100 flex flex-col items-center justify-center text-milktea-500">
              <div className="text-2xl mb-2">📷</div>
              <div className="text-sm">图片加载失败</div>
            </div>
          )}
        </div>

        {/* 底部标题区域 */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 h-6 sm:h-8 flex items-center justify-center">
          {image.caption && (
            <div
              className="text-gray-600 text-xs sm:text-sm text-center truncate px-1 sm:px-2"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(14px, 2vw, 16px)",
                transform: `rotate(${Math.random() * 4 - 2}deg)`,
              }}
              title={image.caption}
            >
              {image.caption}
            </div>
          )}
        </div>

        {/* 胶带装饰 */}
        {variant === "tape" && (
          <motion.div
            className="absolute pointer-events-none opacity-90 w-[40px] sm:w-[50px] h-[28px] sm:h-[35px] z-10 tape-shadow"
            style={{
              ...tapePosition,
            }}
            whileHover={{
              scale: 1.1,
              opacity: 1,
              transition: { duration: 0.2 },
            }}
          >
            <Image
              src={TAPE_VARIANTS[tapeColor]}
              alt="tape"
              width={50}
              height={35}
              className="object-contain"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
              }}
            />
          </motion.div>
        )}

        {/* 翘角效果 */}
        {variant === "corner" && (
          <div
            className="absolute bottom-0 right-0 w-0 h-0 pointer-events-none"
            style={{
              borderLeft: "15px solid transparent",
              borderTop: "15px solid rgba(0, 0, 0, 0.1)",
              transform: "rotate(180deg)",
            }}
          />
        )}

        {/* 悬停时显示的信息卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full
                     bg-white px-3 py-2 rounded-lg shadow-lg
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     pointer-events-none z-20 whitespace-nowrap"
        >
          <div className="text-xs text-gray-600 space-y-1">
            {image.location && (
              <div className="flex items-center gap-1">
                <span>📍</span>
                <span>{image.location}</span>
              </div>
            )}
            {image.date && (
              <div className="flex items-center gap-1">
                <span>📅</span>
                <span>{image.date}</span>
              </div>
            )}
          </div>
          {/* 小箭头 */}
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: "4px solid white",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
