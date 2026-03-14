import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1920],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
