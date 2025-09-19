"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  onLoad,
  onError,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // 提前50px开始加载
        threshold: 0.1,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* 占位符 */}
      {!isInView && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-milktea-100 to-rose-100 animate-pulse"
          style={{ aspectRatio: `${width} / ${height}` }}
        />
      )}

      {/* 图片 */}
      {isInView && !hasError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: isLoaded ? 1 : 0.7, scale: isLoaded ? 1 : 0.95 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={handleLoad}
            onError={handleError}
            className="w-full h-auto object-cover"
            priority={false}
            loading="lazy"
          />

          {/* 加载中覆盖层 */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-milktea-100/80 to-rose-100/80 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-rose-300 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </motion.div>
      )}

      {/* 错误状态 */}
      {hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          <div className="text-gray-400 text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Failed to load</div>
          </div>
        </div>
      )}
    </div>
  );
}
