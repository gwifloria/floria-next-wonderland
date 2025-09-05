"use client";

import {
  Lab,
  LabCreateInput,
  LabListResponse,
  LabStatus,
  LabType,
  LabUpdateInput,
} from "@/types/lab";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

interface UseLabsFilters {
  type?: LabType;
  status?: LabStatus;
  search?: string;
  page?: number;
  limit?: number;
}

interface UseLabsReturn {
  labs: Lab[];
  loading: boolean;
  error: string | null;
  pagination: LabListResponse["pagination"] | null;
  fetchLabs: (filters?: UseLabsFilters) => Promise<void>;
  addLab: (labData: LabCreateInput) => Promise<Lab>;
  updateLab: (id: string, labData: LabUpdateInput) => Promise<Lab>;
  deleteLab: (id: string) => Promise<void>;
  clearAllLabs: () => Promise<void>;
}

export function useLabs(): UseLabsReturn {
  const [filters, setFilters] = useState<UseLabsFilters>({});

  const listKey = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.append(k, String(v));
    });
    const qs = params.toString();
    return `/api/lab/list${qs ? `?${qs}` : ""}`;
  }, [filters]);

  const { data, error, isLoading, mutate } = useSWR<LabListResponse>(listKey);

  const fetchLabs = useCallback(
    async (next?: UseLabsFilters) => {
      setFilters((prev) => ({ ...prev, ...(next || {}) }));
      // 让 SWR 使用新 key 重新请求
      await mutate();
    },
    [mutate],
  );

  const addLab = useCallback(
    async (labData: LabCreateInput): Promise<Lab> => {
      const response = await fetch("/api/lab/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(labData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "创建失败");
      await mutate();
      return result.data as Lab;
    },
    [mutate],
  );

  const updateLab = useCallback(
    async (id: string, labData: LabUpdateInput): Promise<Lab> => {
      const response = await fetch(`/api/lab/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(labData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "更新失败");
      await mutate();
      return result.data as Lab;
    },
    [mutate],
  );

  const deleteLab = useCallback(
    async (id: string): Promise<void> => {
      const response = await fetch(`/api/lab/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || "删除失败");
      await mutate();
    },
    [mutate],
  );

  const clearAllLabs = useCallback(async (): Promise<void> => {
    const response = await fetch("/api/lab", { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) throw new Error(result?.error || "清空失败");
    await mutate();
  }, [mutate]);

  return {
    labs: data?.data ?? [],
    loading: isLoading,
    error: error ? (error as Error).message : null,
    pagination: data?.pagination ?? null,
    fetchLabs,
    addLab,
    updateLab,
    deleteLab,
    clearAllLabs,
  };
}
