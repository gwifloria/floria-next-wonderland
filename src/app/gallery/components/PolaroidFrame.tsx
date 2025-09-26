"use client";

import { GalleryImage } from "@/types/gallery";
import { motion } from "framer-motion";
import Image from "next/image";
import { TAPE_VARIANTS } from "../../contact/constants";
import { GALLERY_CONFIG, GALLERY_STYLES } from "../constants";
import { LazyImage } from "./LazyImage";

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
  const aspectRatio = image.height / image.width;
  const frameHeight = Math.min(
    aspectRatio * GALLERY_CONFIG.IMAGE.BASE_SIZE,
    GALLERY_CONFIG.IMAGE.MAX_HEIGHT,
  );

  const tapePosition =
    GALLERY_CONFIG.TAPE_POSITIONS[
      Math.floor(Math.random() * GALLERY_CONFIG.TAPE_POSITIONS.length)
    ];

  const randomRotation =
    Math.random() * GALLERY_CONFIG.ANIMATION.SLIGHT_ROTATION_RANGE -
    GALLERY_CONFIG.ANIMATION.SLIGHT_ROTATION_RANGE / 2;

  return (
    <motion.div
      className="relative group polaroid-hover"
      whileHover={{
        scale: 1.02,
        transition: { duration: GALLERY_CONFIG.ANIMATION.DURATION },
      }}
    >
      <div
        className={GALLERY_STYLES.POLAROID_FRAME}
        style={{
          transform: `rotate(${randomRotation}deg)`,
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
        }}
      >
        <div
          className="relative overflow-hidden bg-gray-100"
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
