// 通用类型工具库
import { StaticImageData } from "next/image";

// 数据库和API通用包装类型
export type WithDbId<T> = T & { _id: string };
export type WithApiId<T> = T & { id: string };

// 时间相关通用类型
export interface TimeRange {
  startTime: string;
  endTime?: string;
}

// GitHub API 通用类型
export interface GitHubFile {
  download_url: string;
  git_url: string;
  html_url: string;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: StaticImageData;
  _links: {
    git: string;
    html: string;
    self: string;
  };
}

// 通用API响应格式
export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: string[];
}
