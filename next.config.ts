import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",  // temporarily disabled to enable API routes
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/pm-prep",
  assetPrefix: "/pm-prep",
};

export default nextConfig;
