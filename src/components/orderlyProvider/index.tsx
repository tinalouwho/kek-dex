"use client";

import React, { FC, ReactNode, useEffect } from "react";
import { Adapter } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  CoinbaseWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter,
  LedgerWalletAdapter,
  MathWalletAdapter,
} from "@solana/wallet-adapter-wallets";
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
  wagmiConnectors,
} from "@orderly.network/wallet-connector-privy";
import { OrderlyErrorBoundary } from "@/components/OrderlyErrorBoundary";
import { useNav } from "@/hooks/useNav";
import { useOrderlyConfig } from "@/hooks/useOrderlyConfig";
import { usePathWithoutLang } from "@/hooks/usePathWithoutLang";
import { validateOrderlyEnv } from "@/lib/env-validation";

const OrderlyProvider: FC<{ children: ReactNode }> = (props) => {
  const config = useOrderlyConfig();
  const path = usePathWithoutLang();
  const pathname = usePathname();
  const { onRouteChange } = useNav();
  const [isReady, setIsReady] = React.useState(false);

  // Validate environment configuration on startup
  const envConfig = validateOrderlyEnv();

  // Initialize Orderly key store for WebSocket authentication
  const keyStore = new LocalStorageStore();

  // Initialize basic browser compatibility without clearing storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Fix navigator.wallets compatibility issue
      if (!window.navigator.wallets) {
        window.navigator.wallets = [];
      }

      // Only set network ID without clearing storage
      keyStore.setItem("networkId", envConfig.network);
      console.log("🔧 Network configured:", envConfig.network);
    }
  }, [envConfig.network, keyStore]);

  // Get Privy configuration from environment
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Configure Solana wallet adapters
  const solanaWallets: Adapter[] = [
    new PhantomWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
    new TrustWalletAdapter(),
    new LedgerWalletAdapter(),
    new MathWalletAdapter(),
  ];

  // Simple client-side initialization without aggressive WebSocket checks
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("🚀 Client-side ready, initializing providers");
      if (privyAppId) {
        console.log("✅ Privy unified wallet support enabled (EVM + Solana)");
      } else {
        console.log("⚠️ Privy not configured, Solana wallets only");
      }
      console.log("✅ Solana wallet support enabled for", envConfig.network);
      console.log(
        "✅ Available Solana wallets:",
        solanaWallets.map((w) => w.name).join(", "),
      );
      setIsReady(true);
    }
  }, [privyAppId, envConfig.network]);

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
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Initializing KEK Terminal...</p>
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
        privyConfig={
          privyAppId
            ? {
                appid: privyAppId,
                config: {
                  appearance: {
                    theme: "dark",
                    accentColor: "#00FF37", // KEK Terminal green
                  },
                  loginMethods: ["wallet"],
                  supportedChains: [1], // Ethereum mainnet
                  defaultChain: 1,
                },
              }
            : undefined
        }
        wagmiConfig={
          privyAppId
            ? {
                connectors: [wagmiConnectors.injected()],
              }
            : undefined
        }
        solanaConfig={{
          mainnetRpc: "https://api.mainnet-beta.solana.com",
          devnetRpc: "https://api.devnet.solana.com",
          wallets: solanaWallets,
          onError: (error: any, adapter?: Adapter) => {
            console.log("Solana wallet error:", error, adapter);
          },
        }}
      >
        <OrderlyErrorBoundary>
          <OrderlyAppProvider
            brokerId={envConfig.brokerId}
            networkId={envConfig.network}
            brokerName={envConfig.brokerName || "KEK DEX"}
            appIcons={config.orderlyAppProvider.appIcons}
          >
            {props.children}
          </OrderlyAppProvider>
        </OrderlyErrorBoundary>
      </WalletConnectorPrivyProvider>
    </LocaleProvider>
  );
};

export { OrderlyProvider };
export default OrderlyProvider;
