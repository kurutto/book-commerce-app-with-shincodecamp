import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  reactStrictMode:false,//useEffectのデフォルトの2回発火が起こる場合はここをfalseにする（2回発火はローカルだけ）
};

export default nextConfig;
