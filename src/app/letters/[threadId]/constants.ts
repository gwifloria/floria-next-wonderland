// ---------- visual constants ----------
export const MESSAGE_TEXTURES = [
  "/images/pintie.png", // 便签/拼贴底
  "/images/pink_sizhi.png", // 四色纸（统一下划线命名）
  "/images/washi-1.png", // 和纸纹理
] as const;

export const STICKER_IMGS = [
  "/images/daisy-flower-single.png",
  "/images/orange-flowers.png",
] as const;

export const STICKER_POS = [
  "-left-2 bottom-2 h-7 w-7 rotate-0", // 左下
  "right-2 -top-2 h-8 w-8 rotate-[8deg]", // 右上
  "left-2 top-3 h-8 w-8 -rotate-[6deg]", // 左上
] as const;
