import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  compiler: {
    styledComponents: true
  }
};

export default nextConfig;