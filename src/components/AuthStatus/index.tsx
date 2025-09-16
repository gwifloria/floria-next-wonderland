import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface AuthStatusProps {
  onAuthChange?: (isAuthenticated: boolean) => void;
  className?: string;
  compact?: boolean; // 紧凑模式，用于编辑器旁边显示
}

export default function AuthStatus({
  onAuthChange,
  className = "",
  compact = false,
}: AuthStatusProps) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("github");
      onAuthChange?.(true);
    } catch (error) {
      console.error("Sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      onAuthChange?.(false);
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-12 bg-rose-100 rounded-2xl"></div>
      </div>
    );
  }

  if (session?.user) {
    if (compact) {
      // 紧凑模式：只显示头像和简单信息，用于编辑器旁边
      return (
        <div className={`flex items-center gap-2 ${className}`}>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              width={24}
              height={24}
              className="rounded-full border border-rose-200"
            />
          )}
          <span className="text-xs text-neutral-600 truncate max-w-[120px]">
            {session.user.name || session.user.email}
          </span>
          <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="text-xs text-rose-500 hover:text-rose-600 transition-colors ml-1"
            title="退出登录"
          >
            {isLoading ? "..." : "退出"}
          </button>
        </div>
      );
    }

    return (
      <div className={`space-y-3 ${className}`}>
        {/* User info card */}
        <div className="relative bg-[#FFFDF9] border border-dashed border-rose-200 rounded-2xl p-3 shadow-[0_1px_0_rgba(0,0,0,0.04)] max-w-xs">
          {/* Decorative washi tape */}
          <div
            className="pointer-events-none absolute -top-1 right-3 w-[36px] h-[12px] rotate-3 opacity-70"
            aria-hidden="true"
          >
            <Image
              src="/images/tape-beige.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <div className="flex items-center gap-2">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={28}
                height={28}
                className="rounded-full border border-rose-200"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-handwritten text-rose-700 text-sm font-medium truncate">
                {session.user.name || "GitHub User"}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {session.user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Sign out button */}
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className="relative px-3 py-2 bg-white/80 hover:bg-white border border-dashed border-rose-200 rounded-xl text-xs text-rose-600 hover:text-rose-700 transition-all duration-200 font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden max-w-xs"
        >
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-rose-50/30 to-transparent pointer-events-none"></div>
          <span className="relative">
            {isLoading ? "退出中..." : "✨ 退出登录"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Not signed in card */}
      <div className="relative bg-[#FFFDF9] border border-dashed border-rose-200 rounded-2xl p-4 text-center shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        {/* Decorative bow */}
        <div
          className="pointer-events-none absolute -top-3 left-5 w-8 h-8 -rotate-12 opacity-60"
          aria-hidden="true"
        >
          <Image
            src="/images/washi-2.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <p className="text-neutral-600 text-sm mb-3 font-handwritten">
          登录后可以发表评论
        </p>

        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200 border border-dashed border-rose-300 rounded-2xl text-rose-700 font-medium transition-all duration-200 shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4_rgba(0,0,0,0.1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            "登录中..."
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub 登录
            </>
          )}
        </button>
      </div>
    </div>
  );
}
