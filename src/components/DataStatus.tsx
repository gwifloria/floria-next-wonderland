import React from "react";

type DataStatusProps = {
  isLoading?: boolean;
  error?: unknown;
  data?: unknown;
  children: React.ReactNode;
};

export function DataStatus({
  isLoading,
  error,
  data,
  children,
}: DataStatusProps) {
  if (isLoading) {
    return <div className="p-8 text-center text-neutral-500">加载中…</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">加载失败</div>;
  }
  if (!data) {
    return <div className="p-8 text-center text-neutral-500">未找到</div>;
  }
  return <>{children}</>;
}
