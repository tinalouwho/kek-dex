"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@orderly.network/hooks";
import { i18n, parseI18nLang } from "@orderly.network/i18n";
import { TradingPage, TradingPageProps } from "@orderly.network/trading";
import { API } from "@orderly.network/types";
import { OrderlyAuthWrapper } from "@/components/OrderlyAuthWrapper";
import { PathEnum } from "@/constant";
import { useOrderlyConfig } from "@/hooks/useOrderlyConfig";
import { updateSymbol } from "@/storage";

export type PerpViewProps = Pick<TradingPageProps, "symbol">;

export default function PerpView(props: PerpViewProps) {
  const [symbol, setSymbol] = useState(props.symbol);
  const config = useOrderlyConfig();
  const { account } = useAccount();

  const router = useRouter();

  // Debug: Check if we're getting the symbol, config, and account properly
  console.log("🔍 PerpView: symbol =", symbol);
  console.log("🔍 PerpView: config =", config);
  console.log("🔍 PerpView: account =", account);
  console.log("🔍 PerpView: account.accountId =", account?.accountId);
  console.log("🔍 PerpView: account.state =", account?.state);
  console.log("🔍 PerpView: account network =", {
    keyStoreNetwork: account?.keyStore?.networkId,
    configNetwork: account?.configStore?._originConfigStore?.get?.("networkId"),
    envNetwork: process.env.NEXT_PUBLIC_ORDERLY_NETWORK,
  });

  useEffect(() => {
    updateSymbol(symbol);
  }, [symbol]);

  const onSymbolChange = useCallback(
    (data: API.Symbol) => {
      const symbol = data.symbol;
      setSymbol(symbol);
      router.push(`/${parseI18nLang(i18n.language)}${PathEnum.Perp}/${symbol}`);
    },
    [router],
  );

  return (
    <OrderlyAuthWrapper>
      <div>
        {/* Debug: Show TradingPage props */}
        <div style={{ fontSize: "10px", color: "#666", padding: "4px" }}>
          Debug: symbol={symbol}, account=
          {account?.accountId ? "authenticated" : "not authenticated"},
          tradingViewConfig=
          {config.tradingPage.tradingViewConfig ? "loaded" : "missing"}
        </div>
        <div>
          <div
            style={{
              fontSize: "12px",
              color: "#888",
              padding: "8px",
              backgroundColor: "#1a1a1a",
              margin: "4px",
            }}
          >
            🔍 Debug Info: Symbol={symbol} | Account=
            {account?.accountId ? "Connected" : "Not Connected"} | Network=
            {account?.keyStore?.networkId || "Unknown"}
          </div>
          <TradingPage
            symbol={symbol}
            onSymbolChange={onSymbolChange}
            tradingViewConfig={config.tradingPage.tradingViewConfig}
            sharePnLConfig={config.tradingPage.sharePnLConfig}
          />
        </div>
      </div>
    </OrderlyAuthWrapper>
  );
}
