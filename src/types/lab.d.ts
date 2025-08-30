// 1. 类型定义 types/lab.ts
export type LabCategory = "tech" | "life";
export type LabType = "bug" | "idea" | "issue";
export type LabStatus = "open" | "inProgress" | "resolved";

export interface LabCreateInput {
  title: string;
  content?: string;
  type: LabType;
  status?: LabStatus;
  category: LabCategory;
}

export type Lab = Required<LabCreateInput> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LabUpdateInput = Partial<LabCreateInput>;

export interface LabListResponse {
  message: string;
  data: Lab[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
  details?: string[];
}
