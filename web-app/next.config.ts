import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["coin-images.coingecko.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://api.coincap.io/:path*",
      },
    ];
  },
};

export default nextConfig;
