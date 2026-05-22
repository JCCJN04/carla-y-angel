import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

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

export default withPWA(nextConfig);
