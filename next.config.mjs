const ip = process.env.NEXT_PUBLIC_DEPLOYMENT_URL ?? "http://localhost:8080";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  reactStrictMode: false,
  basePath: "",
  assetPrefix: undefined,
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    NEXT_PUBLIC_COMMIT_ID: process.env.NEXT_PUBLIC_COMMIT_ID,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)\\.(avif|webp|jpg|jpeg|png)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          { key: "Vary", value: "Accept" },
        ],
      },
    ];
  },
  async rewrites() {
    console.log("🚀 Rewrites configuration loaded");
    return [
      {
        source: "/web-vital/:path*",
        destination: `http://localhost:4001/:path*`,
      },
      { source: "/floria-service/:path*", destination: `${ip}/:path*` },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
