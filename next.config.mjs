const isProd = process.env.NODE_ENV === "production";

const online = "https://eco-node.onrender.com";
const local = "http://localhost:8080";
const ip = isProd ? online : local;

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    console.log("🚀 Rewrites configuration loaded");
    return [
      {
        source: "/web-vital/:path*",
        destination: `http://localhost:4001/:path*`,
      },
      { source: "/floria-service/:path*", destination: `${ip}/:path*` },
      {
        source: "/github-service/:path*",
        destination: `https://github.com/:path*`,
      },
    ];
  },
};

export default nextConfig;
