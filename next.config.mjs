const isProd = process.env.NODE_ENV === "production";

const ip = isProd ? "http://47.99.33.238" : "http://localhost";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? "/bj-next-wonderland" : "",
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/web-vital/:path*",
        destination: `http://localhost:4001/:path*`,
      },
      {
        source: "/floria-service/:path*",
        destination: `${ip}:8080/:path*`,
      },
      {
        source: "/github-service/:path*",
        destination: `https://github.com/:path*`,
      },
    ];
  },
};

export default nextConfig;
