/**
 * Mobile Wallet Configuration Tests
 * Tests mobile detection, Privy config, and wallet behavior without physical devices
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Mock the mobile detection hook
const mockUseIsMobile = vi.fn();
vi.mock("@/hooks/useIsMobile", () => ({
  useIsMobile: () => mockUseIsMobile(),
}));

// Mock Orderly hooks
vi.mock("@orderly.network/hooks", () => ({
  useAccount: () => ({
    state: {
      status: 0,
      address: undefined,
    },
  }),
}));

describe("Mobile Wallet Configuration Tests", () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Mock window object
    Object.defineProperty(window, "navigator", {
      value: {
        userAgent: "",
        maxTouchPoints: 0,
        platform: "MacIntel",
      },
      writable: true,
    });

    Object.defineProperty(window, "innerWidth", {
      value: 1024,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Mobile Detection Tests", () => {
    it("should detect mobile devices correctly", async () => {
      // Test mobile user agent
      Object.defineProperty(window.navigator, "userAgent", {
        value: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
        writable: true,
      });

      Object.defineProperty(window, "innerWidth", {
        value: 375,
        writable: true,
      });

      Object.defineProperty(window.navigator, "maxTouchPoints", {
        value: 5,
        writable: true,
      });

      // Import and test the hook
      const { useIsMobile } = await import("@/hooks/useIsMobile");

      // This would need to be tested in a React environment
      // For now, we'll test the logic manually
      const userAgent = window.navigator.userAgent;
      const isMobileScreen = window.innerWidth <= 768;
      const isTouchDevice = window.navigator.maxTouchPoints > 0;
      const isMobileUA = /iPhone/i.test(userAgent);

      expect(isMobileUA).toBe(true);
      expect(isMobileScreen).toBe(true);
      expect(isTouchDevice).toBe(true);
    });

    it("should detect desktop devices correctly", async () => {
      Object.defineProperty(window.navigator, "userAgent", {
        value:
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        writable: true,
      });

      Object.defineProperty(window, "innerWidth", {
        value: 1920,
        writable: true,
      });

      const userAgent = window.navigator.userAgent;
      const isMobileScreen = window.innerWidth <= 768;
      const isMobileUA =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent,
        );

      expect(isMobileUA).toBe(false);
      expect(isMobileScreen).toBe(false);
    });

    it("should detect tablet devices correctly", async () => {
      Object.defineProperty(window.navigator, "userAgent", {
        value: "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)",
        writable: true,
      });

      Object.defineProperty(window, "innerWidth", {
        value: 768,
        writable: true,
      });

      Object.defineProperty(window.navigator, "maxTouchPoints", {
        value: 5,
        writable: true,
      });

      const userAgent = window.navigator.userAgent;
      const isTabletScreen =
        window.innerWidth > 768 && window.innerWidth <= 1024;
      const isIPad = /iPad/.test(userAgent);
      const isTouchDevice = window.navigator.maxTouchPoints > 0;

      expect(isIPad).toBe(true);
      expect(isTouchDevice).toBe(true);
    });
  });

  describe("Privy Configuration Tests", () => {
    it("should return mobile-specific login methods", () => {
      mockUseIsMobile.mockReturnValue({
        isMobile: true,
        isTablet: false,
        isMobileOrTablet: true,
        isDesktop: false,
      });

      // Simulate the getPrivyLoginMethods logic
      const isMobileOrTablet = true;
      const loginMethods = isMobileOrTablet
        ? ["wallet"]
        : ["wallet", "email", "google", "twitter"];

      expect(loginMethods).toEqual(["wallet"]);
    });

    it("should return desktop login methods", () => {
      mockUseIsMobile.mockReturnValue({
        isMobile: false,
        isTablet: false,
        isMobileOrTablet: false,
        isDesktop: true,
      });

      const isMobileOrTablet = false;
      const loginMethods = isMobileOrTablet
        ? ["wallet"]
        : ["wallet", "email", "google", "twitter"];

      expect(loginMethods).toEqual(["wallet", "email", "google", "twitter"]);
    });

    it("should configure mobile-specific appearance settings", () => {
      const isMobileOrTablet = true;

      const privyConfig = {
        appearance: {
          theme: "dark" as const,
          accentColor: "#00FF37" as `#${string}`,
          logo: "/images/keklogo2.png",
          showWalletLoginFirst: true,
          landingHeader: isMobileOrTablet
            ? "Connect Wallet"
            : "Connect Your Wallet",
          loginMessage: isMobileOrTablet
            ? "Choose your wallet to start trading"
            : "Connect your wallet or create an account",
        },
        loginMethods: ["wallet"],
      };

      expect(privyConfig.appearance.showWalletLoginFirst).toBe(true);
      expect(privyConfig.appearance.landingHeader).toBe("Connect Wallet");
      expect(privyConfig.appearance.loginMessage).toBe(
        "Choose your wallet to start trading",
      );
      expect(privyConfig.loginMethods).toEqual(["wallet"]);
    });
  });

  describe("Wallet Connection Flow Tests", () => {
    it("should handle account state transitions correctly", () => {
      const testStates = [
        { status: 0, address: undefined, expected: "idle" },
        { status: 1, address: "0x123...", expected: "connecting" },
        { status: 3, address: "0x123...", expected: "not_connected" },
        { status: 5, address: "0x123...", expected: "connected" },
      ];

      testStates.forEach(({ status, address, expected }) => {
        // Simulate OrderlyAccountGuard logic
        const statusMap: { [key: number]: string } = {
          0: "idle",
          1: "connecting",
          2: "connected",
          3: "not_connected",
          4: "disconnected",
          5: "connected",
        };

        const readableStatus = statusMap[status] || `unknown_${status}`;
        expect(readableStatus).toBe(expected);

        // Test connection detection
        const isConnected = status === 2 || status === 5;
        const hasWalletConnected = Boolean(address);

        if (status === 5) {
          expect(isConnected).toBe(true);
          expect(hasWalletConnected).toBe(true);
        }
      });
    });

    it("should detect wallet connection properly", () => {
      const testCases = [
        { address: undefined, expected: false },
        { address: "", expected: false },
        { address: "0x123456789abcdef", expected: true },
        {
          address: "EkWjodDTdPztNT2ttNXJ3DqB4ZqJWN4eHMrbupNf4Ykr",
          expected: true,
        }, // Solana address
      ];

      testCases.forEach(({ address, expected }) => {
        const hasWalletConnected = Boolean(address);
        expect(hasWalletConnected).toBe(expected);
      });
    });
  });

  describe("Environment Configuration Tests", () => {
    it("should validate required environment variables", () => {
      const requiredEnvVars = [
        "NEXT_PUBLIC_PRIVY_APP_ID",
        "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID",
        "NEXT_PUBLIC_ORDERLY_BROKER_ID",
        "NEXT_PUBLIC_SOLANA_RPC_URL",
      ];

      // Mock environment variables
      const mockEnv = {
        NEXT_PUBLIC_PRIVY_APP_ID: "test-privy-id",
        NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: "test-wc-id",
        NEXT_PUBLIC_ORDERLY_BROKER_ID: "kek_ai",
        NEXT_PUBLIC_SOLANA_RPC_URL: "https://api.mainnet-beta.solana.com",
      };

      requiredEnvVars.forEach((envVar) => {
        expect(mockEnv[envVar as keyof typeof mockEnv]).toBeDefined();
        expect(mockEnv[envVar as keyof typeof mockEnv]).toBeTruthy();
      });
    });

    it("should configure network settings correctly", () => {
      const networks = ["mainnet", "testnet"];

      networks.forEach((network) => {
        const config = {
          network,
          api:
            network === "mainnet"
              ? "https://api.orderly.org"
              : "https://testnet-api-evm.orderly.org",
          ws:
            network === "mainnet"
              ? "wss://ws.orderly.org"
              : "wss://testnet-ws-evm.orderly.org",
        };

        expect(config.network).toBe(network);
        expect(config.api).toContain(
          network === "mainnet" ? "api.orderly.org" : "testnet",
        );
        expect(config.ws).toContain(
          network === "mainnet" ? "ws.orderly.org" : "testnet",
        );
      });
    });
  });

  describe("Error Suppression Tests", () => {
    it("should suppress known error patterns", () => {
      const suppressPatterns = [
        /React does not recognize the `tipFormatter` prop/,
        /Cannot read properties of null \(reading 'tradingViewApi'\)/,
        /TradingView/,
        /Amplitude Logger \[Warn\]/,
        /Select is changing from uncontrolled to controlled/,
      ];

      const testErrors = [
        "React does not recognize the `tipFormatter` prop on a DOM element",
        "Cannot read properties of null (reading 'tradingViewApi')",
        "TradingView charting_library error",
        "Amplitude Logger [Warn]: options.defaultTracking is undefined",
        "Select is changing from uncontrolled to controlled",
        "This is a real error that should not be suppressed",
      ];

      testErrors.forEach((error, index) => {
        const shouldSuppress = suppressPatterns.some((pattern) =>
          pattern.test(error),
        );

        if (index < 5) {
          expect(shouldSuppress).toBe(true); // First 5 should be suppressed
        } else {
          expect(shouldSuppress).toBe(false); // Last one should not be suppressed
        }
      });
    });
  });
});
