// Gallery API 图片项
export interface GitHubImageItem {
  name: string;
  path: string;
  size: number;
  imageUrl: string;
  sha: string;
  type: "image";
}

// Gallery API 目录项
export interface GitHubDirectoryItem {
  name: string;
  path: string;
  type: "directory";
}

// Gallery API 响应
export interface GalleryApiResponse {
  images: GitHubImageItem[];
  directories: GitHubDirectoryItem[];
  currentPath: string;
  repo: string;
  branch: string;
}

// 组件使用的图片数据
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  location?: string;
  date?: string;
}
