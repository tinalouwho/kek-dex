/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Using Next.js 14.2.18 for stability (Next.js 15.4.6 had console intercept bugs)
  webpack: (config, { isServer }) => {
    // Fix Module not found: Can't resolve 'pino-pretty' warning
    config.externals = [...config.externals, "pino-pretty"];

    // Add webpack DefinePlugin for both server and client
    const webpack = require("webpack");
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        "typeof globalThis": JSON.stringify("object"),
        "typeof global": JSON.stringify("object"),
      }),
    ];

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
        globalThis: false, // Let webpack handle globalThis
        fs: false,
        net: false,
        tls: false,
        // Add specific polyfills for LiFi compatibility
        "crypto-browserify": require.resolve("crypto-browserify"),
      };

      // Define global Buffer for browser environment
      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
          global: "globalThis",
          globalThis: "globalThis",
        }),
      );
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

module.exports = nextConfig;
