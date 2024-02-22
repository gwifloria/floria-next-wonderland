const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath : isProd ? "/bj-next-wonderland" : "/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
