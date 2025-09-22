"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@orderly.network/hooks";
import { i18n, parseI18nLang } from "@orderly.network/i18n";
import { TradingPage, TradingPageProps } from "@orderly.network/trading";
import { API } from "@orderly.network/types";
import { OrderlyAccountGuard } from "@/components/OrderlyAccountGuard";
import TradingErrorBoundary from "@/components/TradingErrorBoundary";
import { PathEnum } from "@/constant";
import { useOrderlyConfig } from "@/hooks/useOrderlyConfig";
import { updateSymbol } from "@/storage";

export type PerpViewProps = Pick<TradingPageProps, "symbol">;

export default function PerpView(props: PerpViewProps) {
  const [symbol, setSymbol] = useState(props.symbol);
  const config = useOrderlyConfig();
  const router = useRouter();

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
    <TradingErrorBoundary>
      <OrderlyAccountGuard>
        <TradingPage
          symbol={symbol}
          onSymbolChange={onSymbolChange}
          tradingViewConfig={config.tradingPage.tradingViewConfig}
          sharePnLConfig={config.tradingPage.sharePnLConfig}
        />
      </OrderlyAccountGuard>
    </TradingErrorBoundary>
  );
}
