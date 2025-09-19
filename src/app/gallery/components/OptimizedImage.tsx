"use client";

import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  style,
  className,
}: OptimizedImageProps) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Next.js Image with AVIF optimization */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          ...style,
        }}
        className={className}
        quality={85}
        priority={false}
        placeholder="empty"
      />
    </div>
  );
}
