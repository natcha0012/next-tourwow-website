import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://media-prod.tourwow.com/**")],
  },
};

export default nextConfig;
