"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useMarketMap } from "@orderly.network/hooks";
import { generatePath } from "@orderly.network/i18n";
import { TradingPage } from "@orderly.network/trading";
import { API } from "@orderly.network/types";
import { formatSymbol } from "@orderly.network/utils";
import { BaseLayout } from "@/components/baseLayout";
import { PathEnum } from "@/constant";
import { useOrderlyConfig } from "@/hooks/useOrderlyConfig";
import { getSymbol, updateSymbol } from "@/storage";
import { generatePageTitle, getSymbolFromPathname } from "@/utils";

export function PerpPage() {
  const pathname = usePathname();
  const marketMap = useMarketMap();
  let urlSymbol = getSymbolFromPathname(pathname)!;

  if (!marketMap?.[urlSymbol]) {
    urlSymbol = getSymbol();
  }

  const config = useOrderlyConfig();
  const [symbol, setSymbol] = useState(urlSymbol);

  useEffect(() => {
    setSymbol(urlSymbol);
  }, [urlSymbol]);

  useEffect(() => {
    updateSymbol(symbol);
    const title = formatSymbol(symbol, "base-type");
    document.title = generatePageTitle(title);
    const path = generatePath({
      path: `${PathEnum.Perp}/${symbol}`,
    });
    window.history.replaceState({}, "", path);
  }, [symbol]);

  const onSymbolChange = useCallback((data: API.Symbol) => {
    const symbol = data.symbol;
    setSymbol(symbol);
  }, []);

  return (
    <BaseLayout>
      <TradingPage
        symbol={symbol}
        onSymbolChange={onSymbolChange}
        tradingViewConfig={config.tradingPage.tradingViewConfig}
        sharePnLConfig={config.tradingPage.sharePnLConfig}
      />
    </BaseLayout>
  );
}
