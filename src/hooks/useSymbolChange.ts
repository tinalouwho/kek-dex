"use client";

import { useCallback } from "react";
import { API } from "@orderly.network/types";
import { useNavigatePerp } from "./useNavigatePerp";

export function useSymbolChange() {
  const navigatePerp = useNavigatePerp();

  const onSymbolChange = useCallback(
    (data: API.Symbol) => {
      navigatePerp(data.symbol);
    },
    [navigatePerp],
  );

  return onSymbolChange;
}
