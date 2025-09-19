"use client";

import React, { FC, ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { OrderlyKeyStore, LocalStorageStore } from "@orderly.network/core";
import {
  LocaleProvider,
  LocaleCode,
  LocaleEnum,
  getLocalePathFromPathname,
  i18n,
} from "@orderly.network/i18n";
import { OrderlyAppProvider, NetworkId } from "@orderly.network/react-app";
import {
  WalletConnectorPrivyProvider,
  Network,
  wagmiConnectors,
} from "@orderly.network/wallet-connector-privy";
import { useNav } from "@/hooks/useNav";
import { useOrderlyConfig } from "@/hooks/useOrderlyConfig";
import { usePathWithoutLang } from "@/hooks/usePathWithoutLang";
import { validateOrderlyEnv } from "@/lib/env-validation";

const OrderlyProvider: FC<{ children: ReactNode }> = (props) => {
  const config = useOrderlyConfig();
  const path = usePathWithoutLang();
  const pathname = usePathname();
  const { onRouteChange } = useNav();

  // Validate environment configuration on startup
  const envConfig = validateOrderlyEnv();

  // Initialize Orderly key store for WebSocket authentication
  const keyStore = new LocalStorageStore();

  // Get Privy configuration from environment
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!privyAppId) {
    console.error("Missing NEXT_PUBLIC_PRIVY_APP_ID in environment variables");
    throw new Error("Privy App ID is required for wallet authentication");
  }

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

  return (
    <LocaleProvider
      onLanguageChanged={onLanguageChanged}
      backend={{ loadPath }}
    >
      <WalletConnectorPrivyProvider
        network={
          envConfig.network === "mainnet" ? Network.mainnet : Network.testnet
        }
        privyConfig={{
          appid: privyAppId || "",
          config: {
            appearance: {
              theme: "dark",
              accentColor: "#181C23",
              logo:
                config.orderlyAppProvider.appIcons?.main || "/orderly-logo.svg",
              showWalletLoginFirst: true,
            },
            loginMethods: ["wallet", "email", "google", "twitter"],
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
          },
        }}
        wagmiConfig={{
          connectors: [
            wagmiConnectors.injected(),
            wagmiConnectors.walletConnect({
              projectId:
                process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
                "your_walletconnect_project_id_here",
              showQrModal: true,
              metadata: {
                name: "KEK Terminal",
                description: "KEK Terminal - AI-Powered DeFi Trading",
                url: "https://kek.ai",
                icons: [
                  config.orderlyAppProvider.appIcons?.main ||
                    "/orderly-logo.svg",
                ],
              },
            }),
          ],
        }}
        solanaConfig={{
          endpoint:
            process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
            "https://api.mainnet-beta.solana.com",
          network:
            process.env.NEXT_PUBLIC_SOLANA_NETWORK === "devnet"
              ? "devnet"
              : "mainnet-beta",
        }}
      >
        <OrderlyAppProvider
          brokerId={envConfig.brokerId}
          brokerName={envConfig.brokerName}
          networkId={envConfig.network as NetworkId}
          keyStore={keyStore}
          appIcons={config.orderlyAppProvider.appIcons}
          onRouteChange={onRouteChange}
        >
          {props.children}
        </OrderlyAppProvider>
      </WalletConnectorPrivyProvider>
    </LocaleProvider>
  );
};

export default OrderlyProvider;
