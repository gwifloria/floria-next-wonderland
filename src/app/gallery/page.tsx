"use client";

import { SWRShell } from "@/provider/SWRShell";
import {
  GalleryApiResponse,
  GalleryImage,
  GitHubImageItem,
} from "@/types/gallery";
import { Modal } from "antd";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import useSWR from "swr";
import { HandwrittenTitle } from "../contact/components/ScrapbookCard";
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
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const { data, isLoading: loading } = useSWR<GalleryApiResponse>(
    "/api/github/gallery",
  );

  // 转换API数据为组件所需格式
  const images = useMemo(() => {
    if (!data?.images) return [];

    return data.images.map(
      (item: GitHubImageItem): GalleryImage => ({
        id: item.sha,
        src: item.imageUrl,
        alt: item.name,
        width: 400, // 默认宽度
        height: 600, // 默认高度，保持合理的宽高比
        caption: item.name.replace(
          /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i,
          "",
        ),
      }),
    );
  }, [data?.images]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setPreviewVisible(true);
  };
  const handlePreviewClose = () => {
    setPreviewVisible(false);
    setSelectedImage(null);
  };

  if (loading) {
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
        <MasonryGallery images={images} onImageClick={handleImageClick} />
      </div>

      {/* 图片预览弹窗 */}
      <Modal
        open={previewVisible}
        onCancel={handlePreviewClose}
        footer={null}
        width="90vw"
        style={{ maxWidth: "1200px" }}
        centered
        className="gallery-preview-modal"
      >
        {selectedImage && (
          <div className="text-center">
            <div className="relative max-w-full max-h-[70vh] sm:max-h-[80vh] mx-auto">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                className="max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain mx-auto rounded-lg shadow-lg"
                priority
              />
            </div>
            {selectedImage.caption && (
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-milktea-50 rounded-lg mx-auto max-w-md">
                <h3
                  className="text-rose-700 text-lg sm:text-xl font-semibold mb-2"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {selectedImage.caption}
                </h3>
                <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-sm sm:text-base text-milktea-600">
                  {selectedImage.location && (
                    <span>📍 {selectedImage.location}</span>
                  )}
                  {selectedImage.date && <span>📅 {selectedImage.date}</span>}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
