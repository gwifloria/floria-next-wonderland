"use client";

import { GalleryImage } from "@/types/gallery";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import { GALLERY_CONFIG, GALLERY_STYLES } from "../constants";
import { LazyImage } from "./LazyImage";

interface PolaroidFrameProps {
  image: GalleryImage;
  variant?: "tape" | "corner" | "simple";
  tapeColor?: "pink" | "beige" | "blue";
}

export function PolaroidFrame({ image, variant = "tape" }: PolaroidFrameProps) {
  const aspectRatio = image.height / image.width;
  const frameHeight = Math.min(
    aspectRatio * GALLERY_CONFIG.IMAGE.BASE_SIZE,
    GALLERY_CONFIG.IMAGE.MAX_HEIGHT,
  );

  // Generate random rotation for photo
  const randomRotation = useMemo(
    () =>
      Math.random() * GALLERY_CONFIG.ANIMATION.ROTATION_RANGE -
      GALLERY_CONFIG.ANIMATION.ROTATION_RANGE / 2,
    [],
  );

  // Select 2-4 random tapes per photo (mobile: 2, desktop: 3-4)
  const tapes = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const tapeCount = isMobile ? 2 : Math.floor(Math.random() * 2) + 3; // 2 on mobile, 3-4 on desktop
    const selectedTapes = [];
    const usedPositions = new Set<number>();

    for (let i = 0; i < tapeCount; i++) {
      let posIndex;
      do {
        posIndex = Math.floor(
          Math.random() * GALLERY_CONFIG.TAPE_POSITIONS.length,
        );
      } while (usedPositions.has(posIndex));

      usedPositions.add(posIndex);

      selectedTapes.push({
        src: GALLERY_CONFIG.WASHI_TAPE_VARIANTS[
          Math.floor(Math.random() * GALLERY_CONFIG.WASHI_TAPE_VARIANTS.length)
        ],
        position: GALLERY_CONFIG.TAPE_POSITIONS[posIndex],
        rotation: Math.random() * 30 - 15, // -15 to +15 degrees
      });
    }

    return selectedTapes;
  }, []);

  return (
    <motion.div
      className="relative group"
      whileHover={{
        y: -6,
        rotate: Math.random() * 2 - 1,
        transition: {
          duration: GALLERY_CONFIG.ANIMATION.DURATION,
          ease: "easeOut",
        },
      }}
    >
      <div
        className={GALLERY_STYLES.SCRAPBOOK_PHOTO}
        style={{
          transform: `rotate(${randomRotation}deg)`,
          filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))",
        }}
      >
        {/* Photo */}
        <div
          className="relative overflow-hidden bg-gray-100 rounded-sm"
          style={{ height: `${frameHeight}px` }}
        >
          <LazyImage
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={frameHeight}
            className="rounded-sm"
          />
        </div>

        {/* Caption below photo */}
        {image.caption && (
          <div className="mt-1 sm:mt-2 px-1 flex items-center justify-center min-h-[24px] sm:min-h-[28px]">
            <div
              className="text-milktea-700 text-xs sm:text-sm text-center truncate px-1"
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: "clamp(13px, 2vw, 15px)",
                transform: `rotate(${Math.random() * 6 - 3}deg)`,
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
              }}
              title={image.caption}
            >
              {image.caption}
            </div>
          </div>
        )}

        {/* Washi tapes - multiple per photo */}
        {variant === "tape" &&
          tapes.map((tape, index) => (
            <div
              key={index}
              className="absolute pointer-events-none opacity-85 w-[35px] sm:w-[45px] h-[24px] sm:h-[32px] z-10"
              style={{
                ...tape.position,
              }}
            >
              <Image
                src={tape.src}
                alt="washi tape"
                width={45}
                height={32}
                className="object-contain"
                style={{
                  filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.15))",
                }}
              />
            </div>
          ))}

        {/* Hover tooltip with location/date */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full
                     bg-milktea-50/95 px-3 py-2 rounded-lg shadow-lg
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     pointer-events-none z-20 whitespace-nowrap border border-milktea-200"
        >
          <div className="text-xs text-milktea-700 space-y-1">
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
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderBottom: `4px solid rgba(176, 139, 122, 0.95)`,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
