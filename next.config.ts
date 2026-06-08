import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/AniversarioPart2',
  assetPrefix: '/AniversarioPart2/',
  images: { unoptimized: true },
  trailingSlash: true,
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
