"use client";

import React from "react";
import { TradingRewards } from "@orderly.network/trading-rewards";
import { cn } from "@/lib/utils";

interface KekTradingRewardsProps {
  className?: string;
}

/**
 * KEK-themed wrapper for Orderly TradingRewards component
 * Uses composition pattern instead of aggressive CSS overrides
 */
export const KekTradingRewards: React.FC<KekTradingRewardsProps> = ({
  className,
}) => {
  return (
    <div className={cn("kek-scope", className)}>
      {/* Apply KEK theme context to Orderly component */}
      <TradingRewards.HomePage className="kek-trading-rewards" />
    </div>
  );
};
