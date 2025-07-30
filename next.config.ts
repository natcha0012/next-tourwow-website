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
      {
        protocol: "https",
        hostname: "media-staging2.tourwow.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-staging2.twbits.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-dev2.tourwow.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-dev2.twbits.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
