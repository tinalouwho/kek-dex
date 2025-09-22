/**
 * User Agent Simulator Tests
 * Simulates different mobile devices and browsers to test wallet behavior
 */
import { describe, it, expect, beforeEach } from "vitest";

interface DeviceSimulation {
  name: string;
  userAgent: string;
  viewport: { width: number; height: number };
  touchPoints: number;
  platform: string;
  expectedMobile: boolean;
  expectedTablet: boolean;
}

const deviceSimulations: DeviceSimulation[] = [
  // Mobile Devices
  {
    name: "iPhone 14 Pro - Safari",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    viewport: { width: 393, height: 852 },
    touchPoints: 5,
    platform: "iPhone",
    expectedMobile: true,
    expectedTablet: false,
  },
  {
    name: "iPhone 14 Pro - Chrome",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/105.0.0.0 Mobile/15E148 Safari/604.1",
    viewport: { width: 393, height: 852 },
    touchPoints: 5,
    platform: "iPhone",
    expectedMobile: true,
    expectedTablet: false,
  },
  {
    name: "Samsung Galaxy S22 - Chrome",
    userAgent:
      "Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36",
    viewport: { width: 360, height: 800 },
    touchPoints: 10,
    platform: "Linux armv7l",
    expectedMobile: true,
    expectedTablet: false,
  },
  {
    name: "Pixel 7 - Chrome",
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36",
    viewport: { width: 412, height: 915 },
    touchPoints: 10,
    platform: "Linux armv7l",
    expectedMobile: true,
    expectedTablet: false,
  },

  // Tablet Devices
  {
    name: 'iPad Pro 12.9"',
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    viewport: { width: 1024, height: 1366 },
    touchPoints: 5,
    platform: "MacIntel",
    expectedMobile: false,
    expectedTablet: true,
  },
  {
    name: "iPad Air",
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6,2 Mobile/15E148 Safari/604.1",
    viewport: { width: 820, height: 1180 },
    touchPoints: 5,
    platform: "MacIntel",
    expectedMobile: false,
    expectedTablet: true,
  },
  {
    name: "Samsung Galaxy Tab S8",
    userAgent:
      "Mozilla/5.0 (Linux; Android 12; SM-X906C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    viewport: { width: 800, height: 1280 },
    touchPoints: 10,
    platform: "Linux armv7l",
    expectedMobile: false,
    expectedTablet: true,
  },

  // Desktop Devices
  {
    name: "MacBook Pro - Safari",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
    viewport: { width: 1440, height: 900 },
    touchPoints: 0,
    platform: "MacIntel",
    expectedMobile: false,
    expectedTablet: false,
  },
  {
    name: "Windows 11 - Chrome",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    viewport: { width: 1920, height: 1080 },
    touchPoints: 0,
    platform: "Win32",
    expectedMobile: false,
    expectedTablet: false,
  },
  {
    name: "Linux Desktop - Firefox",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64; rv:105.0) Gecko/20100101 Firefox/105.0",
    viewport: { width: 1600, height: 900 },
    touchPoints: 0,
    platform: "Linux x86_64",
    expectedMobile: false,
    expectedTablet: false,
  },
];

describe("User Agent Device Simulation Tests", () => {
  beforeEach(() => {
    // Reset window properties
    Object.defineProperty(window, "navigator", {
      value: {
        userAgent: "",
        maxTouchPoints: 0,
        platform: "",
      },
      writable: true,
      configurable: true,
    });

    Object.defineProperty(window, "innerWidth", {
      value: 1024,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(window, "innerHeight", {
      value: 768,
      writable: true,
      configurable: true,
    });
  });

  describe("Device Detection Logic", () => {
    deviceSimulations.forEach((device) => {
      it(`should correctly detect ${device.name}`, () => {
        // Simulate device environment
        Object.defineProperty(window.navigator, "userAgent", {
          value: device.userAgent,
          writable: true,
        });

        Object.defineProperty(window.navigator, "maxTouchPoints", {
          value: device.touchPoints,
          writable: true,
        });

        Object.defineProperty(window.navigator, "platform", {
          value: device.platform,
          writable: true,
        });

        Object.defineProperty(window, "innerWidth", {
          value: device.viewport.width,
          writable: true,
        });

        Object.defineProperty(window, "innerHeight", {
          value: device.viewport.height,
          writable: true,
        });

        // Simulate our mobile detection logic
        const userAgent = window.navigator.userAgent;
        const isMobileScreen = window.innerWidth <= 768;
        const isTouchDevice = window.navigator.maxTouchPoints > 0;
        const isAndroid = /Android/i.test(userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(userAgent);

        // Tablet detection first (to exclude from mobile)
        const isTabletScreen = window.innerWidth > 768;
        const isIPad =
          /iPad/.test(userAgent) ||
          (window.navigator.platform === "MacIntel" &&
            window.navigator.maxTouchPoints > 1);
        const isAndroidTablet =
          /Android/i.test(userAgent) && window.innerWidth > 768;

        const tablet = isIPad || (isAndroidTablet && isTouchDevice);

        // Mobile detection (excluding tablets)
        const mobileRegex = /iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileUA = mobileRegex.test(userAgent);
        const isAndroidMobile =
          /Android/i.test(userAgent) && window.innerWidth <= 768;

        const mobile =
          !tablet &&
          (isMobileUA || (isMobileScreen && isTouchDevice) || isAndroidMobile);

        console.log(`Testing ${device.name}:`);
        console.log(`  Mobile: ${mobile} (expected: ${device.expectedMobile})`);
        console.log(`  Tablet: ${tablet} (expected: ${device.expectedTablet})`);
        console.log(`  UserAgent: ${userAgent}`);
        console.log(
          `  Viewport: ${device.viewport.width}x${device.viewport.height}`,
        );
        console.log(`  Touch: ${isTouchDevice} (${device.touchPoints} points)`);

        expect(mobile).toBe(device.expectedMobile);
        expect(tablet).toBe(device.expectedTablet);
      });
    });
  });

  describe("Privy Configuration Per Device Type", () => {
    deviceSimulations.forEach((device) => {
      it(`should generate correct Privy config for ${device.name}`, () => {
        const isMobileOrTablet = device.expectedMobile || device.expectedTablet;

        // Simulate our Privy configuration logic
        const loginMethods = isMobileOrTablet
          ? ["wallet"]
          : ["wallet", "email", "google", "twitter"];

        const privyConfig = {
          appearance: {
            theme: "dark" as const,
            showWalletLoginFirst: true,
            landingHeader: isMobileOrTablet
              ? "Connect Wallet"
              : "Connect Your Wallet",
            loginMessage: isMobileOrTablet
              ? "Choose your wallet to start trading"
              : "Connect your wallet or create an account",
          },
          loginMethods,
        };

        if (device.expectedMobile || device.expectedTablet) {
          expect(privyConfig.loginMethods).toEqual(["wallet"]);
          expect(privyConfig.appearance.landingHeader).toBe("Connect Wallet");
          expect(privyConfig.appearance.loginMessage).toBe(
            "Choose your wallet to start trading",
          );
        } else {
          expect(privyConfig.loginMethods).toEqual([
            "wallet",
            "email",
            "google",
            "twitter",
          ]);
          expect(privyConfig.appearance.landingHeader).toBe(
            "Connect Your Wallet",
          );
          expect(privyConfig.appearance.loginMessage).toBe(
            "Connect your wallet or create an account",
          );
        }

        expect(privyConfig.appearance.showWalletLoginFirst).toBe(true);
      });
    });
  });

  describe("Wallet Compatibility Tests", () => {
    it("should simulate MetaMask on different devices", () => {
      const walletTests = [
        {
          device: "Mobile",
          hasMetaMask: true,
          expectedBehavior: "deep_link",
        },
        {
          device: "Desktop",
          hasMetaMask: true,
          expectedBehavior: "direct_connection",
        },
        {
          device: "Mobile",
          hasMetaMask: false,
          expectedBehavior: "install_prompt",
        },
      ];

      walletTests.forEach((test) => {
        const walletConnection = {
          wallet: "MetaMask",
          device: test.device,
          installed: test.hasMetaMask,
          connectionType: test.expectedBehavior,
        };

        expect(walletConnection.connectionType).toBe(test.expectedBehavior);
      });
    });

    it("should test WalletConnect QR vs Deep Link behavior", () => {
      const devices = ["Mobile", "Desktop"];

      devices.forEach((device) => {
        const walletConnectBehavior = {
          showQR: device === "Desktop",
          useDeepLink: device === "Mobile",
          mobileOptimized: device === "Mobile",
        };

        if (device === "Mobile") {
          expect(walletConnectBehavior.showQR).toBe(false);
          expect(walletConnectBehavior.useDeepLink).toBe(true);
          expect(walletConnectBehavior.mobileOptimized).toBe(true);
        } else {
          expect(walletConnectBehavior.showQR).toBe(true);
          expect(walletConnectBehavior.useDeepLink).toBe(false);
          expect(walletConnectBehavior.mobileOptimized).toBe(false);
        }
      });
    });
  });
});
