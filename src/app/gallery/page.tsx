"use client";

import { SWRShell } from "@/provider/SWRShell";
import {
  GalleryApiResponse,
  GalleryImage,
  GitHubImageItem,
} from "@/types/gallery";
import { motion } from "framer-motion";
import { useState } from "react";
import useSWR from "swr";
import { HandwrittenTitle } from "../contact/components/ScrapbookCard";
import { GalleryAdminPanel } from "./components/AdminSyncButton";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { MasonryGallery } from "./components/MasonryGallery";
import "./styles.css";

export default function GalleryPage() {
  return (
    <SWRShell>
      <Gallery></Gallery>
    </SWRShell>
  );
}
function Gallery() {
  const [page, setPage] = useState(1);
  const [images, setAllImages] = useState<GalleryImage[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // 提取公共的图片格式化函数
  const formatGalleryImages = (items: GitHubImageItem[]): GalleryImage[] => {
    return items.map(
      (item: GitHubImageItem): GalleryImage => ({
        id: item.sha,
        src: item.imageUrl,
        alt: item.name,
        width: 250,
        height: 375,
        caption: item.name.replace(
          /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)$/i,
          "",
        ),
      }),
    );
  };

  const { data, isLoading } = useSWR<GalleryApiResponse>(
    `/api/github/gallery?page=${page}&limit=16`,
    {
      onSuccess: (newData) => {
        const { images } = newData;
        const formattedImages = formatGalleryImages(images);

        if (page === 1) {
          // First page - replace all images
          setAllImages(formattedImages);
        } else {
          // Subsequent pages - append images
          setAllImages((prev) => [...prev, ...formattedImages]);
        }

        setHasMore(newData.pagination.hasMore);
      },
    },
  );

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // 转换API数据为组件所需格式

  const handleImageClick = (image: GalleryImage) => {
    // 使用 Ant Design 的 Image 预览，不需要手动管理状态
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-milktea-50 via-rose-50 to-milktea-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-milktea-50 via-rose-50 to-milktea-100 gallery-container">
      {/* 页面头部 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-16 sm:pt-20 pb-8 sm:pb-12 px-4 sm:px-6 text-center"
      >
        <HandwrittenTitle
          size="xl"
          className="text-rose-700 mb-4 text-2xl sm:text-3xl lg:text-4xl"
        >
          📸 My Gallery
        </HandwrittenTitle>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-milktea-600 text-base sm:text-lg max-w-2xl mx-auto px-4"
          style={{
            fontFamily: "'Caveat', cursive",
          }}
        ></motion.p>
      </motion.div>

      {/* 瀑布流图片展示 */}
      <div className="px-3 sm:px-6 pb-16 sm:pb-20 masonry-container">
        <MasonryGallery
          images={images}
          onImageClick={handleImageClick}
          onLoadMore={loadMore}
        />

        {/* Load More Button / Loading Indicator */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={loadMore}
                className="px-6 py-3 bg-rose-200/80 hover:bg-rose-300/80 text-rose-700 rounded-full font-medium transition-colors duration-200"
                style={{
                  fontFamily: "'Caveat', cursive",
                }}
              >
                Load More Photos 📸
              </motion.button>
            )}
          </div>
        )}

        {!hasMore && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-milktea-600"
            style={{
              fontFamily: "'Caveat', cursive",
            }}
          >
            <p className="text-lg">🎉 You&apos;ve seen all my photos!</p>
          </motion.div>
        )}
      </div>

      {/* Admin panel */}
      <GalleryAdminPanel />
    </div>
  );
}
