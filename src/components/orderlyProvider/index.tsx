"use client";

import React, { FC, ReactNode, useEffect } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
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
import { WalletConnectorProvider } from "@orderly.network/wallet-connector";
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

  // Simple client-side initialization without aggressive WebSocket checks
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("🚀 Client-side ready, initializing providers");
      console.log(
        "✅ Orderly standard wallet connector enabled for",
        envConfig.network,
      );
      console.log("✅ Solana wallet support enabled");
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
      <WalletConnectorProvider
        solanaInitial={{
          network:
            envConfig.network === "mainnet"
              ? WalletAdapterNetwork.Mainnet
              : WalletAdapterNetwork.Devnet,
        }}
      >
        <OrderlyAppProvider
          brokerId={envConfig.brokerId}
          networkId={envConfig.network}
          brokerName={envConfig.brokerName || "KEK DEX"}
          appIcons={config.orderlyAppProvider.appIcons}
        >
          <OrderlyErrorBoundary>{props.children}</OrderlyErrorBoundary>
        </OrderlyAppProvider>
      </WalletConnectorProvider>
    </LocaleProvider>
  );
};

export { OrderlyProvider };
export default OrderlyProvider;
