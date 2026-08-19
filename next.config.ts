import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: 'export', // Outputs a static 'out' folder instead of a Node server
  images: {
    unoptimized: true, // GitHub Pages doesn't support the default Next.js Image Optimization API
  },

  basePath: '/linktree',
};

export default nextConfig;
