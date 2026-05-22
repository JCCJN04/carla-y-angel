import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/carlayangel",
  assetPrefix: "/carlayangel",
  async redirects() {
    return [
      {
        source: "/v2",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
