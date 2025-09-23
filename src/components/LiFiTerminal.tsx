"use client";

import { useState, useEffect } from "react";
import type { WidgetConfig } from "@lifi/widget";
import dynamic from "next/dynamic";
import Image from "next/image";

// KEK token configuration
const KEK_MINT =
  process.env.NEXT_PUBLIC_KEK_MINT ||
  "GXkoESRmdKJcQAPJrZCce6YR2bJe33QMC7fNVtTjvirt";
// Use native SOL for LiFi (not wrapped SOL)
const SOL_MINT = "11111111111111111111111111111111"; // Native SOL for LiFi
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

// Solana chain ID
const SOLANA_CHAIN_ID = 1151111081099710; // Solana mainnet chain ID for LI.FI

// Dynamically import LI.FI widget to avoid SSR issues
const LiFiWidget = dynamic(
  () => import("@lifi/widget").then((mod) => ({ default: mod.LiFiWidget })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="kek-text-success font-mono text-sm">
          Loading LI.FI Widget...
        </div>
      </div>
    ),
  },
);

// ClientOnly component for proper Next.js App Router rendering
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="kek-text-success font-mono text-sm">
          Loading LI.FI Widget...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function LiFiTerminal() {
  const [inputToken, setInputToken] = useState<"USDC" | "SOL">("USDC");
  const [widgetKey, setWidgetKey] = useState(0);

  const refreshWidget = () => {
    setWidgetKey((prev) => prev + 1);
    console.log("🔄 Manual widget refresh triggered");
  };

  // Reset widget when token changes to prevent stale routes
  useEffect(() => {
    setWidgetKey((prev) => prev + 1);
    console.log("🔄 LiFi widget reset for token:", inputToken);
    console.log("📋 Widget config:", {
      fromToken: inputToken === "USDC" ? USDC_MINT : SOL_MINT,
      toToken: KEK_MINT,
      direction: `${inputToken} → KEK`,
    });
  }, [inputToken]);

  // LI.FI widget configuration
  const widgetConfig: WidgetConfig = {
    integrator: "kek-terminal",
    fromChain: SOLANA_CHAIN_ID,
    toChain: SOLANA_CHAIN_ID,
    fromToken: inputToken === "USDC" ? USDC_MINT : SOL_MINT,
    toToken: KEK_MINT,
    variant: "compact",
    appearance: "dark",
    hiddenUI: ["appearance", "language"],
    // Add debouncing to reduce API calls
    debounceMs: 1500,
    // Disable auto-updates to prevent rate limiting
    disableAutoRefresh: true,
    // Add slippage tolerance for better routing
    slippage: 0.005, // 0.5%
    // Set reasonable amount limits
    fromAmount: "1",
    theme: {
      container: {
        border: "1px solid rgba(34, 197, 94, 0.3)",
        borderRadius: "12px",
        backgroundColor: "rgba(15, 15, 15, 0.9)",
      },
      palette: {
        primary: {
          main: "#22c55e", // green-500
        },
        secondary: {
          main: "#a855f7", // purple-500
        },
        background: {
          default: "#0f0f0f",
          paper: "#1a1a1a",
        },
        text: {
          primary: "#ffffff",
          secondary: "#a855f7",
        },
        grey: {
          800: "#1a1a1a",
          700: "#2a2a2a",
          600: "#3a3a3a",
          500: "#4a4a4a",
          400: "#5a5a5a",
          300: "#6a6a6a",
        },
      },
      shape: {
        borderRadius: 12,
        borderRadiusSecondary: 8,
      },
      components: {
        MuiCard: {
          defaultProps: {
            variant: "outlined",
          },
          styleOverrides: {
            root: {
              backgroundColor: "rgba(15, 15, 15, 0.8)",
              borderColor: "rgba(34, 197, 94, 0.2)",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "8px",
              textTransform: "none",
            },
          },
        },
      },
    },
  };

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Header with Instructions */}
      <div className="py-4 px-6 ">
        <div className="flex items-center gap-3 ">
          <Image
            src="/images/keklogo2.png"
            alt="KEK logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <h3 className="kek-text-success font-mono ">KEK Token Swap</h3>
        </div>
        <p className="text-xs kek-text-secondary ">
          Swap USDC or SOL for KEK tokens using LiFi&apos;s cross-chain protocol
        </p>
      </div>

      {/* Token Selector */}
      <div className="flex justify-center rounded-md bg-black/50 items-center gap-2 m-2 p-2">
        <p className="text-sm text-purple-200 mr-4">Buy KEK with:</p>
        <div className="flex items-center rounded-md  divide-x divide-green-500/10">
          <button
            onClick={() => setInputToken("USDC")}
            className={`py-1 px-4 text-sm font-mono transition-all ${
              inputToken === "USDC"
                ? "kek-text-success bg-green-500/10 rounded-l-md"
                : "rounded-l-md text-purple-200 bg-[#171717] kek-text-success hover:font-bold"
            }`}
          >
            USDC
          </button>
          <button
            onClick={() => setInputToken("SOL")}
            className={`py-1 px-4 text-sm font-mono transition-all ${
              inputToken === "SOL"
                ? "kek-text-success bg-green-500/10 rounded-r-md"
                : "rounded-r-md kek-text-secondary hover:font-bold"
            }`}
          >
            SOL
          </button>
        </div>
      </div>

      {/* LI.FI Widget Container */}
      <div className="flex-1 h-full mt-6 overflow-y-auto">
        <ClientOnly>
          <LiFiWidget
            key={`lifi-widget-${widgetKey}-${inputToken}`}
            config={widgetConfig}
            integrator="kek-terminal"
          />
        </ClientOnly>
      </div>

      {/* Troubleshooting Footer */}
      <div className="p-3 bg-black/30 border-t border-green-500/20 text-xs kek-text-secondary">
        <details className="cursor-pointer">
          <summary className="font-mono kek-text-success mb-2">
            🔧 Troubleshooting
          </summary>
          <div className="space-y-1 pl-4">
            <p>
              • <strong>No routes available:</strong> KEK may have low
              liquidity. Try smaller amounts.
            </p>
            <p>
              • <strong>Rate limit errors:</strong> Wait 30 seconds and click
              Refresh above.
            </p>
            <p>
              • <strong>Widget stuck:</strong> Switch between USDC/SOL tokens to
              reset.
            </p>
            <p>
              • <strong>High gas fees:</strong> Try swapping during off-peak
              hours.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
