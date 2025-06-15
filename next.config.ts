import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com", // your image host
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
