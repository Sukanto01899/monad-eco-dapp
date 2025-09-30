import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push({
        "react-native-web":
          "var { AppRegistry } = require('react-native-web'); AppRegistry.runApplication('App', { rootTag: document.getElementById('root') })",
        "@react-native-async-storage/async-storage":
          "var { AsyncStorage } = require('react-native-web');",
      });
    }

    return config;
  },
};

export default nextConfig;
