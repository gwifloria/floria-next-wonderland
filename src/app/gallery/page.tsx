"use client";

import { SWRShell } from "@/provider/SWRShell";
import { GalleryApiResponse, GalleryImage } from "@/types/gallery";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { HandwrittenTitle } from "../contact/components/ScrapbookCard";
import { GalleryAdminPanel } from "./components/AdminSyncButton";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { MasonryGallery } from "./components/MasonryGallery";
import { BackToTop } from "./components/BackToTop";
import { GALLERY_CONFIG, GALLERY_STYLES } from "./constants";
import { formatGalleryImages } from "./utils";
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
  const [isInitialized, setIsInitialized] = useState(false);

  const handleDataSuccess = useCallback(
    (newData: GalleryApiResponse) => {
      const formattedImages = formatGalleryImages(newData.images);

      if (page === 1) {
        // 初始加载或重置
        setAllImages(formattedImages);
        setIsInitialized(true);
      } else {
        // 分页加载 - 只有当新数据不为空时才拼接
        if (formattedImages.length > 0) {
          setAllImages((prev) => [...prev, ...formattedImages]);
        } else {
          // 如果新数据为空，但不影响现有数据，只更新 hasMore 状态
          console.log(
            `Page ${page} returned no images, maintaining existing data`,
          );
        }
      }

      setHasMore(newData.pagination.hasMore);
    },
    [page],
  );

  const { data, isLoading } = useSWR<GalleryApiResponse>(
    `${GALLERY_CONFIG.PAGINATION.API_PATH}?page=${page}&limit=${GALLERY_CONFIG.PAGINATION.ITEMS_PER_PAGE}`,
    { onSuccess: handleDataSuccess },
  );

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore]);

  const handleImageClick = useCallback((image: GalleryImage) => {
    // Image preview handled by Ant Design
  }, []);

  if (isLoading && images.length === 0) {
    return (
      <div
        className={`${GALLERY_STYLES.CONTAINER} flex items-center justify-center`}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className={`${GALLERY_STYLES.CONTAINER} gallery-container`}>
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
          style={{ fontFamily: GALLERY_STYLES.FONT_FAMILY }}
        ></motion.p>
      </motion.div>

      <div className="px-3 sm:px-6 pb-16 sm:pb-20 masonry-container">
        <MasonryGallery
          images={images}
          onImageClick={handleImageClick}
          onLoadMore={loadMore}
          hasMore={hasMore}
        />

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
                style={{ fontFamily: GALLERY_STYLES.FONT_FAMILY }}
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
            style={{ fontFamily: GALLERY_STYLES.FONT_FAMILY }}
          >
            <p className="text-lg">🎉 You&apos;ve seen all my photos!</p>
          </motion.div>
        )}
      </div>

      <GalleryAdminPanel />
      <BackToTop />
    </div>
  );
}
