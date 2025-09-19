"use client";

import { postFetcher } from "@/util/fetch";
import { FloatButton, message, Popconfirm } from "antd";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

const ADMIN_EMAIL = "ghuijue@gmail.com";

interface SyncResult {
  success: boolean;
  stats: {
    total: number;
    new: number;
    updated: number;
    skipped: number;
    errors: number;
    deleted: number;
  };
  syncTime: string;
}

interface CleanupResult {
  success: boolean;
  message: string;
  stats: {
    existingCount: number;
    deletedCount: number;
  };
  cleanupTime: string;
}

export function GalleryAdminPanel() {
  const { data: session } = useSession();
  const [authLoading, setAuthLoading] = useState(false);
  const isAdmin = session?.user?.email === ADMIN_EMAIL;

  // 公共的成功处理函数
  const handleOperationSuccess = (
    operation: "sync" | "cleanup",
    result: SyncResult | CleanupResult,
  ) => {
    if (operation === "sync") {
      const syncResult = result as SyncResult;
      const { stats } = syncResult;
      const hasErrors = stats.errors > 0;

      const messageProps = {
        content: `同步完成${hasErrors ? `(有${stats.errors}个错误)` : ""}! 新增: ${stats.new}, 更新: ${stats.updated}, 删除: ${stats.deleted}`,
        duration: hasErrors ? 4 : 3,
      };

      hasErrors ? message.warning(messageProps) : message.success(messageProps);
    } else {
      const cleanupResult = result as CleanupResult;
      message.success({
        content: `数据库清理完成! 删除了 ${cleanupResult.stats.deletedCount} 张图片`,
        duration: 3,
      });
    }

    // 统一的页面刷新
    window.location.reload();
  };

  // 公共的错误处理函数
  const handleOperationError = (operation: "sync" | "cleanup", error: any) => {
    console.error(
      `${operation === "sync" ? "Sync" : "Cleanup"} failed:`,
      error,
    );
    message.error({
      content: `${operation === "sync" ? "同步" : "清理"}失败，请检查控制台`,
      duration: 3,
    });
  };

  const { trigger: handleSync, isMutating: syncing } =
    useSWRMutation<SyncResult>(`/api/github/gallery/sync`, postFetcher, {
      onSuccess: (result) => handleOperationSuccess("sync", result),
      onError: (error) => handleOperationError("sync", error),
    });

  const { trigger: handleCleanup, isMutating: cleaning } =
    useSWRMutation<CleanupResult>(`/api/github/gallery/cleanup`, postFetcher, {
      onSuccess: (result) => handleOperationSuccess("cleanup", result),
      onError: (error) => handleOperationError("cleanup", error),
    });

  const isLoading = syncing || cleaning || authLoading;

  // Auth handlers
  const handleLogin = async () => {
    if (authLoading) return;
    setAuthLoading(true);
    try {
      await signIn("github");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (authLoading) return;
    setAuthLoading(true);
    try {
      await signOut();
    } finally {
      setAuthLoading(false);
    }
  };

  const onSyncClick = () => {
    if (!isLoading) {
      handleSync();
    }
  };

  const onCleanupConfirm = () => {
    if (!isLoading) {
      handleCleanup();
    }
  };

  return (
    <FloatButton.Group>
      {/* Login/Logout Button - always visible */}
      {!session ? (
        <FloatButton
          icon={authLoading ? "⏳" : "🔑"}
          tooltip={authLoading ? "登录中..." : "GitHub 登录"}
          onClick={handleLogin}
          style={{
            backgroundColor: authLoading ? "#bfdbfe" : "#dbeafe",
            borderColor: "#3b82f6",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
          className={authLoading ? "animate-pulse" : ""}
        />
      ) : (
        <Popconfirm
          title="退出登录"
          description={`确定要退出登录吗？\n当前用户: ${session.user?.name || session.user?.email?.split("@")[0]}`}
          onConfirm={handleLogout}
          okText="确认退出"
          cancelText="取消"
          okButtonProps={{ danger: true }}
          disabled={isLoading}
        >
          <FloatButton
            icon={authLoading ? "⏳" : "👤"}
            tooltip={
              authLoading
                ? "退出中..."
                : `已登录: ${session.user?.name || session.user?.email?.split("@")[0]} (点击退出)`
            }
            style={{
              backgroundColor: authLoading
                ? "#bfdbfe"
                : isAdmin
                  ? "#dcfce7"
                  : "#dbeafe",
              borderColor: isAdmin ? "#22c55e" : "#3b82f6",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
            className={authLoading ? "animate-pulse" : ""}
          />
        </Popconfirm>
      )}

      {/* Admin-only buttons */}
      {isAdmin && (
        <>
          {/* Sync Button */}
          <FloatButton
            icon={syncing ? "⏳" : "💫"}
            tooltip={syncing ? "同步中..." : "同步 GitHub 图片"}
            onClick={onSyncClick}
            style={{
              backgroundColor: syncing ? "#fca5a5" : "#fecaca",
              borderColor: "#f87171",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
            className={syncing ? "animate-pulse" : ""}
          />

          {/* Cleanup Button */}
          <Popconfirm
            title="清理数据库"
            description="确定要删除所有图片数据吗？此操作不可逆！"
            onConfirm={onCleanupConfirm}
            okText="确认清理"
            cancelText="取消"
            okButtonProps={{ danger: true }}
            disabled={isLoading}
          >
            <FloatButton
              icon={cleaning ? "⏳" : "🗑️"}
              tooltip={cleaning ? "清理中..." : "清理数据库"}
              style={{
                backgroundColor: cleaning ? "#fca5a5" : "#fef3c7",
                borderColor: cleaning ? "#f87171" : "#f59e0b",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
              }}
              className={cleaning ? "animate-pulse" : ""}
            />
          </Popconfirm>
        </>
      )}
    </FloatButton.Group>
  );
}
