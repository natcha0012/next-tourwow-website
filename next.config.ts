import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media-prod.tourwow.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-prod.twbits.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
