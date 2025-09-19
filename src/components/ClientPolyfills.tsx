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

  console.log("✅ Buffer BigInt methods patched immediately on module load");
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
