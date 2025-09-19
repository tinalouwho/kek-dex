"use client";

import React, { FC, ReactNode, useEffect } from "react";
import { Adapter } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
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

  // Clear any cached keys from different network if network changed
  useEffect(() => {
    const cachedNetworkId = keyStore.getItem("networkId");
    console.log(
      `🔍 Current network: ${envConfig.network}, cached network: ${cachedNetworkId}`,
    );

    // Log all localStorage keys for debugging
    if (typeof window !== "undefined") {
      const allKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) allKeys.push(key);
      }
      console.log("📦 All localStorage keys:", allKeys);
    }

    if (cachedNetworkId && cachedNetworkId !== envConfig.network) {
      console.log(
        `🔄 Network changed from ${cachedNetworkId} to ${envConfig.network}, clearing cached keys`,
      );

      // Clear specific Orderly-related keys rather than all localStorage
      if (typeof window !== "undefined") {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (
            key &&
            (key.includes("orderly") ||
              key.includes("Orderly") ||
              key.includes("account") ||
              key.includes("key"))
          ) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
        console.log(
          `🧹 Removed ${keysToRemove.length} cached keys:`,
          keysToRemove,
        );
      }
    }
    keyStore.setItem("networkId", envConfig.network);
  }, [envConfig.network, keyStore]);

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
          connectors: [wagmiConnectors.injected()],
        }}
        solanaConfig={{
          endpoint:
            process.env.NEXT_PUBLIC_SOLANA_RPC_URL ||
            "https://api.mainnet-beta.solana.com",
          network:
            process.env.NEXT_PUBLIC_SOLANA_NETWORK === "devnet"
              ? "devnet"
              : "mainnet-beta",
          wallets: [new PhantomWalletAdapter()] as Adapter[],
          onError: (error: any, adapter?: Adapter) => {
            console.error("Solana wallet error:", error, adapter);
          },
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
