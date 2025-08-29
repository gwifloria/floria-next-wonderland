const ip = process.env.NEXT_PUBLIC_DEPLOYMENT_URL;

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

export default nextConfig;
