export interface GitHubFile {
  name: string;
  path: string;
  type: string;
  sha: string;
  size: number;
  download_url: string;
}

export interface BlogMeta {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  category?: string;
}

export interface BlogContent {
  content: string;
  meta: BlogMeta;
}

export interface CommitMeta {
  updatedAt: string;
  author: string;
  message: string;
  sha: string;
  url: string;
}

export interface BlogPostItem {
  name: string;
  path: string;
  isPinned: boolean;
  pinOrder: number;
  title?: string;
}

export interface PinnedPost {
  path: string;
  category: string;
  title?: string;
  isPinned: boolean;
  pinOrder: number;
}

export interface BlogListResponse {
  success: boolean;
  data: BlogPostItem[];
  category: string;
}

export interface GitHubServiceConfig {
  owner?: string;
  repo?: string;
  branch?: string;
  token?: string;
}

export interface GitHubAPIError extends Error {
  status: number;
  url: string;
}
