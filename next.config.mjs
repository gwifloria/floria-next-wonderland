const ip = process.env.NEXT_PUBLIC_DEPLOYMENT_URL ?? "http://localhost:8080";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  reactStrictMode: false,
  basePath: "",
  assetPrefix: undefined,
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
