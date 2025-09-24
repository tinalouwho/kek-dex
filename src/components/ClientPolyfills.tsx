"use client";

import { useEffect } from "react";

// Immediate Buffer polyfill - executed as soon as this module loads
if (typeof window !== "undefined") {
  const { Buffer } = require("buffer");
  const process = require("process/browser");

  // Make Buffer available globally IMMEDIATELY
  (window as any).global = window;
  (window as any).Buffer = Buffer;
  (window as any).process = process;

  // Ensure fetch is available globally (some libraries expect it)
  if (!window.fetch) {
    console.warn(
      "⚠️ window.fetch not available, this may cause issues with some libraries",
    );
  } else {
    // Make fetch available in global scope for libraries that expect it there
    (window as any).global.fetch = window.fetch;
    globalThis.fetch = window.fetch;
  }

  // Fix globalScope issues for analytics libraries
  if (!(window as any).globalScope) {
    (window as any).globalScope = window;
  }

  // Ensure document is available globally (only if not already set)
  try {
    if (!(window as any).global.document) {
      (window as any).global.document = window.document;
    }
  } catch (e) {
    // Ignore if document is read-only
  }

  // Ensure navigator is available globally (only if not already set)
  try {
    if (!(window as any).global.navigator) {
      (window as any).global.navigator = window.navigator;
    }
  } catch (e) {
    // Ignore if navigator is read-only
  }

  // Enhanced crypto polyfill for Orderly SDK compatibility
  if (!window.crypto || !window.crypto.getRandomValues) {
    const crypto = require("crypto-browserify");

    const getRandomValues = (arr: any) => {
      if (crypto.randomBytes) {
        const bytes = crypto.randomBytes(arr.length);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = bytes[i];
        }
      } else {
        // Fallback using Math.random (less secure but functional)
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Math.floor(Math.random() * 256);
        }
      }
      return arr;
    };

    if (!window.crypto) {
      (window as any).crypto = {
        getRandomValues,
        subtle: crypto.webcrypto?.subtle,
      };
    } else if (!window.crypto.getRandomValues) {
      window.crypto.getRandomValues = getRandomValues;
    }

    // Ensure crypto is available globally
    (window as any).global.crypto = window.crypto;
    globalThis.crypto = window.crypto;
  }

  // Enhanced BigInt Buffer methods
  const addBigIntMethods = (proto: any) => {
    if (!proto) return;

    if (!proto.readBigUInt64LE) {
      proto.readBigUInt64LE = function (offset = 0) {
        const low = this.readUInt32LE(offset);
        const high = this.readUInt32LE(offset + 4);
        return BigInt(low) + (BigInt(high) << 32n);
      };
    }

    if (!proto.writeBigUInt64LE) {
      proto.writeBigUInt64LE = function (value: bigint, offset = 0) {
        const low = Number(value & 0xffffffffn);
        const high = Number(value >> 32n);
        this.writeUInt32LE(low, offset);
        this.writeUInt32LE(high, offset + 4);
        return offset + 8;
      };
    }

    if (!proto.readBigInt64LE) {
      proto.readBigInt64LE = function (offset = 0) {
        const low = this.readUInt32LE(offset);
        const high = this.readInt32LE(offset + 4);
        return BigInt(low) + (BigInt(high) << 32n);
      };
    }

    if (!proto.writeBigInt64LE) {
      proto.writeBigInt64LE = function (value: bigint, offset = 0) {
        const low = Number(value & 0xffffffffn);
        const high = Number(value >> 32n);
        this.writeUInt32LE(low, offset);
        this.writeUInt32LE(high, offset + 4);
        return offset + 8;
      };
    }
  };

  // Patch Buffer immediately
  addBigIntMethods(Buffer.prototype);

  // Intercept Buffer constructor calls to patch new instances
  const OriginalBuffer = Buffer;
  const BufferProxy = new Proxy(OriginalBuffer, {
    construct(target, args) {
      const instance = new target(...args);
      addBigIntMethods(Object.getPrototypeOf(instance));
      return instance;
    },
    apply(target, thisArg, args) {
      const result = target.apply(thisArg, args);
      if (result && typeof result === "object") {
        addBigIntMethods(Object.getPrototypeOf(result));
      }
      return result;
    },
  });

  // Replace global Buffer with our proxy
  (window as any).Buffer = BufferProxy;

  // Also patch Uint8Array for good measure
  if (typeof Uint8Array !== "undefined") {
    addBigIntMethods(Uint8Array.prototype);
  }

  // Add missing addEventListener for globalScope
  if (
    (window as any).globalScope &&
    !(window as any).globalScope.addEventListener
  ) {
    (window as any).globalScope.addEventListener =
      window.addEventListener.bind(window);
    (window as any).globalScope.removeEventListener =
      window.removeEventListener.bind(window);
  }

  // Ensure location is available globally (only if not already set)
  try {
    if (!(window as any).global.location) {
      (window as any).global.location = window.location;
    }
  } catch (e) {
    // Ignore if location is read-only
  }

  // Add polyfill for missing cookie access
  try {
    if (
      typeof document !== "undefined" &&
      typeof document.cookie === "undefined"
    ) {
      Object.defineProperty(document, "cookie", {
        get: () => "",
        set: () => {},
        configurable: true,
      });
    }
  } catch (e) {
    // Ignore if cookie property is read-only or already defined
  }

  console.log(
    "✅ Buffer BigInt methods and browser APIs patched immediately on module load",
  );
}

export default function ClientPolyfills() {
  useEffect(() => {
    // Additional runtime patches
    if (typeof window !== "undefined") {
      // Monitor for any new Buffer instances and patch them
      let patchCount = 0;
      const maxPatches = 10;

      const intervalId = setInterval(() => {
        patchCount++;

        // Look for any Buffer instances that might have been created
        if ((window as any).Buffer && (window as any).Buffer.prototype) {
          const proto = (window as any).Buffer.prototype;
          if (!proto.readBigUInt64LE) {
            proto.readBigUInt64LE = function (offset = 0) {
              const low = this.readUInt32LE(offset);
              const high = this.readUInt32LE(offset + 4);
              return BigInt(low) + (BigInt(high) << 32n);
            };
            console.log("🔧 Patched Buffer.readBigUInt64LE at runtime");
          }
        }

        if (patchCount >= maxPatches) {
          clearInterval(intervalId);
        }
      }, 100);

      // Cleanup
      return () => clearInterval(intervalId);
    }
  }, []);

  return null;
}
