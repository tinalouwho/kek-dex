/**
 * Utility functions for Solana Buffer operations
 * Provides fallbacks for missing Buffer methods
 */

export function ensureBufferMethods() {
  if (typeof window !== "undefined" && window.Buffer) {
    const BufferProto = window.Buffer.prototype;

    // Add readBigUInt64LE if it doesn't exist
    if (!BufferProto.readBigUInt64LE) {
      BufferProto.readBigUInt64LE = function (offset = 0) {
        const low = this.readUInt32LE(offset);
        const high = this.readUInt32LE(offset + 4);
        return BigInt(low) + (BigInt(high) << 32n);
      };
    }

    // Add writeBigUInt64LE if it doesn't exist
    if (!BufferProto.writeBigUInt64LE) {
      BufferProto.writeBigUInt64LE = function (value: bigint, offset = 0) {
        const low = Number(value & 0xffffffffn);
        const high = Number(value >> 32n);
        this.writeUInt32LE(low, offset);
        this.writeUInt32LE(high, offset + 4);
        return offset + 8;
      };
    }

    // Add readBigInt64LE if it doesn't exist
    if (!BufferProto.readBigInt64LE) {
      BufferProto.readBigInt64LE = function (offset = 0) {
        const low = this.readUInt32LE(offset);
        const high = this.readInt32LE(offset + 4);
        return BigInt(low) + (BigInt(high) << 32n);
      };
    }

    console.log("✅ Solana Buffer methods initialized");
  }
}

// Auto-initialize when module loads in browser
if (typeof window !== "undefined") {
  ensureBufferMethods();
}
