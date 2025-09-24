"use client";

import React, { FC, ReactNode, useEffect, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LocalStorageStore } from "@orderly.network/core";
import {
  LocaleProvider,
  LocaleCode,
  LocaleEnum,
  getLocalePathFromPathname,
  i18n,
} from "@orderly.network/i18n";
import { OrderlyAppProvider } from "@orderly.network/react-app";
import {
  WalletConnectorPrivyProvider,
  Network,
} from "@orderly.network/wallet-connector-privy";
import { OrderlyErrorBoundary } from "@/components/OrderlyErrorBoundary";
import { KekThemeProvider } from "@/components/theme/KekThemeProvider";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useNav } from "@/hooks/useNav";
import { useOrderlyConfig } from "@/hooks/useOrderlyConfig";
import { usePathWithoutLang } from "@/hooks/usePathWithoutLang";
import { validateOrderlyEnv } from "@/lib/env-validation";
import "@/utils/errorSupression";

// Register Solana Mobile Wallet Adapter for mobile Solana wallets
if (typeof window !== "undefined") {
  try {
    import("@solana-mobile/wallet-standard-mobile")
      .then(() => {
        // The mobile wallet adapter is automatically registered on import
        console.log("✅ Solana Mobile Wallet Adapter imported");
      })
      .catch(() => {
        console.log("ℹ️ Solana Mobile Wallet Adapter not available");
      });
  } catch {
    console.log("ℹ️ Solana Mobile Wallet Adapter not available");
  }
}

const OrderlyProvider: FC<{ children: ReactNode }> = (props) => {
  const config = useOrderlyConfig();
  const path = usePathWithoutLang();
  const pathname = usePathname();
  const {} = useNav();
  const { isMobile, isTablet, isMobileOrTablet } = useIsMobile();
  const [isReady, setIsReady] = React.useState(false);

  // Validate environment configuration on startup
  const envConfig = validateOrderlyEnv();

  // Initialize basic browser compatibility without clearing storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Fix navigator.wallets compatibility issue
      if (!window.navigator.wallets) {
        window.navigator.wallets = [];
      }

      // Initialize Orderly key store for WebSocket authentication
      const keyStore = new LocalStorageStore();
      // Set network ID using proper method
      try {
        // Use the public set method instead of private setItem
        (keyStore as any).set("networkId", envConfig.network);
        console.log("🔧 Network configured:", envConfig.network);
      } catch (error) {
        console.log("ℹ️ Network configuration skipped");
      }
    }
  }, [envConfig.network]);

  // Get Privy configuration from environment - simplified for Orderly
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Debug Privy configuration
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(
        "🔍 Privy App ID:",
        privyAppId ? "✅ Configured" : "❌ Missing",
      );
      if (!privyAppId) {
        console.error(
          "❌ NEXT_PUBLIC_PRIVY_APP_ID is required for wallet functionality",
        );
      }
    }
  }, [privyAppId]);

  // Simplified Privy config - let Orderly handle mobile detection and wallet types
  const getPrivyConfig = useCallback(() => {
    if (!privyAppId) {
      throw new Error("Privy App ID is required");
    }
    return {
      appid: privyAppId,
      config: {
        appearance: {
          theme: "dark" as const,
          accentColor: "#00FF37" as `#${string}`,
          logo: "/images/keklogo2.png",
          showWalletLoginFirst: true,
          landingHeader: "Connect Wallet",
          loginMessage: "Choose your wallet to start trading",
        },
        // Let Orderly determine appropriate login methods based on device
        loginMethods: ["wallet", "email", "google", "twitter"] as Array<
          "wallet" | "email" | "google" | "twitter"
        >,
        // Add Next.js 14 compatibility options
        ssr: false,
      },
    };
  }, [privyAppId]);

  // Simple client-side initialization without aggressive WebSocket checks
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("🚀 Client-side ready, initializing providers");
      console.log("✅ Privy wallet connector enabled for", envConfig.network);
      console.log("✅ Privy App ID:", privyAppId ? "configured" : "missing");
      console.log("✅ Solana wallet support enabled");
      console.log(
        "📱 Device type:",
        isMobileOrTablet ? "Mobile/Tablet" : "Desktop",
      );
      console.log("🔧 Privy login methods: wallet, email, google, twitter");
      setIsReady(true);
    }
  }, [privyAppId, envConfig.network, isMobileOrTablet]);

  const onLanguageChanged = async (lang: LocaleCode) => {
    window.history.replaceState({}, "", `/${lang}${path}`);
  };

  const loadPath = (lang: LocaleCode) => {
    if (lang === LocaleEnum.en) {
      // because en is built-in, we need to load the en extend only
      return `/locales/extend/${lang}.json`;
    }
    return [`/locales/${lang}.json`, `/locales/extend/${lang}.json`];
  };

  useEffect(() => {
    const lang = getLocalePathFromPathname(pathname);
    // if url is include lang, and url lang is not the same as the i18n language, change the i18n language
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [pathname]);

  if (!isReady || !privyAppId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-purple-100 font-bold font-mono flex flex-col items-center justify-center  text-2xl text-center">
          <Image
            src="/images/keklogo2.png"
            alt="KEK Terminal"
            width={100}
            height={100}
            className="animate-pulse"
          />
          <p className="text-purple-100 font-bold font-mono text-2xl text-center">
            {!privyAppId ? "Configuring Wallet..." : "Initializing KEK DEX..."}
          </p>
          {!privyAppId && (
            <p className="text-red-400 text-sm mt-2">
              Missing Privy App ID configuration
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <LocaleProvider
      onLanguageChanged={onLanguageChanged}
      backend={{ loadPath }}
    >
      <OrderlyErrorBoundary
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="max-w-md w-full bg-red-900/20 border border-red-600 rounded-lg p-6">
              <h2 className="text-xl font-bold text-red-400 mb-2">
                Wallet Connection Error
              </h2>
              <p className="text-gray-300 mb-4">
                Failed to initialize wallet provider. Please check your
                configuration.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Reload Page
              </button>
            </div>
          </div>
        }
      >
        <WalletConnectorPrivyProvider
          network={
            envConfig.network === "mainnet" ? Network.mainnet : Network.testnet
          }
          privyConfig={getPrivyConfig()}
          wagmiConfig={{
            // Let Orderly handle connector configuration automatically
            connectors: undefined,
          }}
          solanaConfig={{
            mainnetRpc:
              envConfig.network === "mainnet"
                ? process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
                  "https://api.mainnet-beta.solana.com"
                : undefined,
            devnetRpc:
              envConfig.network === "testnet"
                ? "https://api.devnet.solana.com"
                : undefined,
            // Let Orderly auto-detect and configure wallets for optimal mobile/desktop support
            wallets: [],
            onError: (error: Error) => {
              console.log("Solana wallet error:", error.message);
            },
          }}
        >
          <OrderlyAppProvider
            brokerId={envConfig.brokerId}
            networkId={envConfig.network as "mainnet" | "testnet"}
            brokerName={envConfig.brokerName || "KEK DEX"}
            appIcons={config.orderlyAppProvider.appIcons}
          >
            <KekThemeProvider>
              <OrderlyErrorBoundary>{props.children}</OrderlyErrorBoundary>
            </KekThemeProvider>
          </OrderlyAppProvider>
        </WalletConnectorPrivyProvider>
      </OrderlyErrorBoundary>
    </LocaleProvider>
  );
};

export { OrderlyProvider };
export default OrderlyProvider;
