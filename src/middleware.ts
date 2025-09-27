import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// 管理员邮箱
const ADMIN_EMAIL = "ghuijue@gmail.com";

// 需要管理员权限的路由
const ADMIN_ROUTES = [
  "/api/lab/add",
  "/api/lab/update",
  "/api/lab/delete",
  "/api/gallery/sync",
  "/api/gallery/cleanup",
  "/api/monitoring",
];

// 简单的内存存储限流器（生产环境建议使用Redis）
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * 检查是否为管理员路由
 */
function isAdminRoute(pathname: string): boolean {
  return ADMIN_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * 获取客户端IP地址
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  const remoteAddr = request.headers.get("x-vercel-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (remoteAddr) {
    return remoteAddr.split(",")[0].trim();
  }

  return "unknown";
}

/**
 * API限流检查
 */
function checkRateLimit(
  ip: string,
  limit: number = 100,
  windowMs: number = 60000,
): boolean {
  const now = Date.now();
  const key = `${ip}:${Math.floor(now / windowMs)}`;

  // 清理过期的记录
  for (const [storeKey, data] of rateLimitStore.entries()) {
    if (data.resetTime < now) {
      rateLimitStore.delete(storeKey);
    }
  }

  const current = rateLimitStore.get(key);
  if (!current) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
}

/**
 * API请求日志记录
 */
function logAPIRequest(request: NextRequest, ip: string, duration?: number) {
  const logData = {
    method: request.method,
    url: request.nextUrl.pathname,
    ip,
    userAgent: request.headers.get("user-agent") || "unknown",
    timestamp: new Date().toISOString(),
    duration: duration || 0,
  };

  // 在控制台输出，生产环境可以发送到日志服务
  console.log("[API]", JSON.stringify(logData));
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ip = getClientIP(request);
  const startTime = Date.now();

  // 只处理API路由
  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  try {
    // 1. API限流检查
    if (!checkRateLimit(ip, 100, 60000)) {
      // 每分钟100次请求
      logAPIRequest(request, ip, Date.now() - startTime);
      return new NextResponse(
        JSON.stringify({
          error: "Too Many Requests",
          message: "Rate limit exceeded",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 2. 管理员路由认证检查
    if (isAdminRoute(pathname)) {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token || token.email !== ADMIN_EMAIL) {
        logAPIRequest(request, ip, Date.now() - startTime);
        return new NextResponse(
          JSON.stringify({
            error: "Unauthorized",
            message: "Admin access required",
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    // 3. 正常请求处理
    const response = NextResponse.next();

    // 添加CORS头（如果需要）
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    // 记录请求日志
    logAPIRequest(request, ip, Date.now() - startTime);

    return response;
  } catch (error) {
    console.error("[Middleware Error]", error);
    logAPIRequest(request, ip, Date.now() - startTime);

    return new NextResponse(
      JSON.stringify({
        error: "Internal Server Error",
        message: "Middleware error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
