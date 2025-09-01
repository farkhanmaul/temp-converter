import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/temp-converter',
  assetPrefix: '/temp-converter/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
