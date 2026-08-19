import type { NextConfig } from "next";

const repo = "LinkTree";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },

  // Helps GitHub Pages serve routes as /about/ -> /about/index.html
  trailingSlash: true,

  // Only use basePath on GitHub Pages (production build)
  basePath: process.env.NODE_ENV === "production" ? `/${repo}` : undefined,

  // Ensures _next assets are loaded from /LinkTree/_next/...
  assetPrefix: process.env.NODE_ENV === "production" ? `/${repo}/` : undefined,
};

export default nextConfig;