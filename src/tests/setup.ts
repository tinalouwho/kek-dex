/**
 * Test Setup - Global configuration for all tests
 */
import { vi } from "vitest";

// Mock Next.js environment
process.env.NODE_ENV = "test";

// Mock environment variables
process.env.NEXT_PUBLIC_PRIVY_APP_ID = "test-privy-id";
process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID = "test-wc-id";
process.env.NEXT_PUBLIC_ORDERLY_BROKER_ID = "kek_ai";
process.env.NEXT_PUBLIC_SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";
process.env.NEXT_PUBLIC_ORDERLY_NETWORK = "mainnet";

// Global DOM mocks
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock window properties that might not exist in test environment
Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost:3000",
    origin: "http://localhost:3000",
    protocol: "http:",
    host: "localhost:3000",
    hostname: "localhost",
    port: "3000",
    pathname: "/",
    search: "",
    hash: "",
  },
  writable: true,
});

// Mock crypto for wallet testing
Object.defineProperty(global, "crypto", {
  value: {
    getRandomValues: (arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
    randomUUID: () => "test-uuid-" + Math.random().toString(36).substr(2, 9),
  },
});

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Console spy to track error suppression
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

console.error = vi.fn((...args) => {
  // Only show errors that would not be suppressed by our error suppression
  const message = args.join(" ");
  const suppressPatterns = [
    /React does not recognize the `tipFormatter` prop/,
    /Cannot read properties of null \(reading 'tradingViewApi'\)/,
    /TradingView/,
    /Amplitude Logger/,
  ];

  const shouldSuppress = suppressPatterns.some((pattern) =>
    pattern.test(message),
  );
  if (!shouldSuppress) {
    originalConsoleError(...args);
  }
});

console.warn = vi.fn((...args) => {
  const message = args.join(" ");
  const suppressPatterns = [
    /Select is changing from uncontrolled to controlled/,
    /Warning: validateDOMNesting/,
  ];

  const shouldSuppress = suppressPatterns.some((pattern) =>
    pattern.test(message),
  );
  if (!shouldSuppress) {
    originalConsoleWarn(...args);
  }
});
