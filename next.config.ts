import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    // Fix Module not found: Can't resolve 'pino-pretty' warning
    config.externals = [...config.externals, "pino-pretty"];

    // Only add client-side polyfills
    if (!isServer) {
      // Add Node.js polyfills for Solana compatibility (client-side only)
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve("buffer"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
        util: require.resolve("util"),
        global: false, // Use webpack's ProvidePlugin instead
        fs: false,
        net: false,
        tls: false,
        // Add specific polyfills for LiFi compatibility
        "crypto-browserify": require.resolve("crypto-browserify"),
      };

      // Define global Buffer for browser environment
      const webpack = require("webpack");
      config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
          global: "globalThis",
        }),
        new webpack.DefinePlugin({
          global: "globalThis",
          "global.global": "globalThis",
        }),
      ];
    }

    return config;
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
