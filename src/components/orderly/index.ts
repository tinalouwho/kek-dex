// KEK-themed Orderly component wrappers
// Uses composition pattern for clean integration

export { KekTradingRewards } from "./KekTradingRewards";
export { KekScaffold } from "./KekScaffold";

// Re-export common Orderly components for convenience
export { TradingRewards } from "@orderly.network/trading-rewards";
export { Trading } from "@orderly.network/trading";
export { PortfolioLayoutWidget } from "@orderly.network/portfolio";
export { MarketsHomePage } from "@orderly.network/markets";
export { Dashboard as AffiliateDebugDashboard } from "@orderly.network/affiliate";
export type { ScaffoldProps } from "@orderly.network/ui-scaffold";
