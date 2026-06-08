import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/AniversarioPart2',
  assetPrefix: '/AniversarioPart2/',
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
