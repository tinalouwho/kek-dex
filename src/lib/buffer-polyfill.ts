/**
 * Buffer polyfill for browser environment
 * Required for Solana operations that use Node.js Buffer methods
 */

if (typeof window !== "undefined") {
  const { Buffer } = require("buffer");
  const process = require("process/browser");

  // Make Buffer available globally in browser
  (window as any).global = window;
  (window as any).Buffer = Buffer;
  (window as any).process = process;

  // Initialize enhanced Buffer methods for Solana
  import("./solana-buffer-utils").then(({ ensureBufferMethods }) => {
    ensureBufferMethods();
  });
}

export {};
