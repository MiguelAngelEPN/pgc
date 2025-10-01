import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // acepta cualquier dominio HTTPS
      },
    ],  },
};

export default nextConfig;
