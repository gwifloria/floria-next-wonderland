// Gallery相关常量配置
export const GALLERY_CONFIG = {
  // 图片尺寸配置
  IMAGE: {
    DEFAULT_WIDTH: 250,
    DEFAULT_HEIGHT: 375,
    BASE_SIZE: 200,
    MAX_HEIGHT: 350,
  },

  // 分页配置
  PAGINATION: {
    ITEMS_PER_PAGE: 16,
    API_PATH: "/api/gallery",
  },

  // 响应式断点配置
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 1024,
    DESKTOP: 1536,
  },

  // 列数配置
  COLUMNS: {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
    LARGE: 4,
  },

  // Intersection Observer 配置
  OBSERVER: {
    LAZY_LOAD_MARGIN: "50px",
    INFINITE_SCROLL_MARGIN: "200px",
    THRESHOLD: 0.1,
    DEBOUNCE_DELAY: 100,
  },

  // 动画配置
  ANIMATION: {
    DURATION: 0.3,
    LOAD_DURATION: 0.6,
    STAGGER_DELAY: 0.1,
    IMAGE_DELAY: 0.2,
    ROTATION_RANGE: 6, // -3 to +3 degrees
    SLIGHT_ROTATION_RANGE: 4, // -2 to +2 degrees
  },

  // 胶带位置配置
  TAPE_POSITIONS: [
    { top: "-8px", left: "-12px", rotate: "12deg" },
    { top: "-10px", right: "-15px", rotate: "-8deg" },
    { bottom: "-8px", left: "-10px", rotate: "-15deg" },
    { bottom: "-6px", right: "-12px", rotate: "10deg" },
  ],

  // 文件扩展名匹配
  IMAGE_EXTENSIONS: /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|avif)$/i,

  // Back to top配置
  BACK_TO_TOP: {
    SHOW_THRESHOLD: 300,
  },
} as const;

// CSS类名常量
export const GALLERY_STYLES = {
  CONTAINER:
    "min-h-screen bg-gradient-to-br from-milktea-50 via-rose-50 to-milktea-100",
  FONT_FAMILY: "'Caveat', cursive",
  POLAROID_FRAME:
    "relative bg-white p-2 sm:p-3 pb-8 sm:pb-12 shadow-lg transform polaroid-texture polaroid-frame",
  LOADING_GRADIENT: "bg-gradient-to-br from-milktea-100 to-rose-100",
  ERROR_GRADIENT: "bg-gradient-to-br from-gray-100 to-gray-200",
} as const;
