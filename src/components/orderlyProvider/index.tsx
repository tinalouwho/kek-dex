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

  // Get Privy configuration from environment
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Mobile-specific Privy configuration
  const getPrivyLoginMethods = useCallback((): Array<
    "wallet" | "email" | "google" | "twitter"
  > => {
    if (isMobileOrTablet) {
      // On mobile, prioritize wallet connections and reduce social options
      return ["wallet", "email"];
    }
    // On desktop, show all options
    return ["wallet", "email", "google", "twitter"];
  }, [isMobileOrTablet]);

  const getPrivyConfig = useCallback(
    () => ({
      appid: privyAppId!,
      config: {
        appearance: {
          theme: "dark" as const,
          accentColor: "#00FF37",
          logo: "/images/keklogo2.png",
          showWalletLoginFirst: isMobileOrTablet, // Show wallet options first on mobile
          loginMessage: isMobileOrTablet
            ? "Connect your wallet to start trading"
            : "Connect your wallet or create an account",
        },
        loginMethods: getPrivyLoginMethods(),
      },
    }),
    [privyAppId, isMobileOrTablet, getPrivyLoginMethods],
  );

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
      console.log("🔧 Privy login methods:", getPrivyLoginMethods());
      setIsReady(true);
    }
  }, [privyAppId, envConfig.network, isMobileOrTablet, getPrivyLoginMethods]);

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

  if (!isReady) {
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
            Initializing KEK DEX...
          </p>
        </div>
      </div>
    );
  }

  return (
    <LocaleProvider
      onLanguageChanged={onLanguageChanged}
      backend={{ loadPath }}
    >
      <WalletConnectorPrivyProvider
        network={
          envConfig.network === "mainnet" ? Network.mainnet : Network.testnet
        }
        privyConfig={getPrivyConfig()}
        wagmiConfig={{
          connectors: [], // Let Privy handle connector configuration for better mobile support
        }}
        headerProps={
          isMobileOrTablet
            ? {
                mobile: (
                  <div className="text-purple-100 text-sm text-center py-2">
                    Connect your wallet to access trading features
                  </div>
                ),
              }
            : undefined
        }
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
          wallets: [], // Let the connector auto-detect wallets for mobile compatibility
          onError: (error: Error, adapter?: unknown) => {
            console.log(
              "Solana wallet error (mobile optimized):",
              error,
              adapter,
            );
          },
        }}
      >
        <OrderlyAppProvider
          brokerId={envConfig.brokerId}
          networkId={envConfig.network as "mainnet" | "testnet"}
          brokerName={envConfig.brokerName || "KEK DEX"}
          appIcons={config.orderlyAppProvider.appIcons}
        >
          <OrderlyErrorBoundary>{props.children}</OrderlyErrorBoundary>
        </OrderlyAppProvider>
      </WalletConnectorPrivyProvider>
    </LocaleProvider>
  );
};

export { OrderlyProvider };
export default OrderlyProvider;
