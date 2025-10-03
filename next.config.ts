import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@metamask/sdk", "@wagmi/connectors"],
};

export default nextConfig;
