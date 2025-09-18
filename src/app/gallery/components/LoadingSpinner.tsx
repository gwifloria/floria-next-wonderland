"use client";

import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* 主要加载动画 */}
      <div className="relative">
        {/* 外圈旋转的相机图标 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-rose-200 border-t-rose-500 rounded-full"
        />

        {/* 中心的相机图标 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 flex items-center justify-center text-2xl"
        >
          📸
        </motion.div>
      </div>

      {/* 加载文本 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center"
      >
        <div
          className="text-xl text-rose-600 mb-2"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Loading...
        </div>
      </motion.div>

      {/* 装饰性的小点 */}
      <div className="flex gap-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
            className="w-2 h-2 bg-rose-300 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
