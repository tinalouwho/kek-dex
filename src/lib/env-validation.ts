/**
 * Environment variable validation for production deployment
 * Ensures all critical Orderly Network configuration is properly set
 */

interface OrderlyEnvConfig {
  brokerId: string;
  brokerName: string;
  network: string;
  apiUrl: string;
  wsUrl: string;
  chainId: string;
  // Solana configuration
  solanaRpcUrl?: string;
  solanaNetwork?: string;
}

export function validateOrderlyEnv(): OrderlyEnvConfig {
  console.log("🔍 Starting environment validation...");
  console.log(
    "🔍 All env vars starting with NEXT_PUBLIC_:",
    Object.keys(process.env)
      .filter((key) => key.startsWith("NEXT_PUBLIC_"))
      .map((key) => `${key}=${process.env[key]}`),
  );

  const requiredVars = {
    brokerId: process.env.NEXT_PUBLIC_ORDERLY_BROKER_ID,
    brokerName: process.env.NEXT_PUBLIC_ORDERLY_BROKER_NAME,
    network: process.env.NEXT_PUBLIC_ORDERLY_NETWORK,
    apiUrl: process.env.NEXT_PUBLIC_ORDERLY_API_URL,
    wsUrl: process.env.NEXT_PUBLIC_ORDERLY_WS_URL,
    chainId: process.env.NEXT_PUBLIC_ORDERLY_CHAIN_ID,
  };

  // Optional Solana variables
  const optionalVars = {
    solanaRpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
    solanaNetwork: process.env.NEXT_PUBLIC_SOLANA_NETWORK,
  };

  console.log("🔍 Required vars loaded:", requiredVars);
  console.log("🔍 Optional vars loaded:", optionalVars);
  console.log(
    "🔍 Specific SOLANA_RPC_URL value:",
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
  );

  const missing: string[] = [];
  const config: Partial<OrderlyEnvConfig> = {};

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      missing.push(`NEXT_PUBLIC_ORDERLY_${key.toUpperCase()}`);
    } else {
      config[key as keyof OrderlyEnvConfig] = value;
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}\n` +
        "Please check your .env.local file and ensure all Orderly Network configuration is set.",
    );
  }

  // Validate network-specific configuration
  if (config.network === "mainnet") {
    if (!config.apiUrl?.includes("api-evm.orderly.org")) {
      console.warn(
        "⚠️  WARNING: Mainnet network specified but API URL does not match mainnet endpoint",
      );
    }
    if (!config.wsUrl?.includes("ws-evm.orderly.org")) {
      console.warn(
        "⚠️  WARNING: Mainnet network specified but WebSocket URL does not match mainnet endpoint",
      );
    }
  }

  if (config.network === "testnet") {
    if (!config.apiUrl?.includes("testnet-api-evm.orderly.org")) {
      console.warn(
        "⚠️  WARNING: Testnet network specified but API URL does not match testnet endpoint",
      );
    }
    if (!config.wsUrl?.includes("testnet-ws-evm.orderly.org")) {
      console.warn(
        "⚠️  WARNING: Testnet network specified but WebSocket URL does not match testnet endpoint",
      );
    }
  }

  // Add optional Solana configuration
  for (const [key, value] of Object.entries(optionalVars)) {
    console.log(`🔍 Processing optional var ${key}:`, value);
    if (value) {
      config[key as keyof OrderlyEnvConfig] = value;
      console.log(`✅ Added ${key} to config:`, value);
    } else {
      console.log(`❌ Skipping ${key} - value is undefined or empty`);
    }
  }

  // Validate broker configuration
  if (config.brokerId === "orderly" || config.brokerId === "demo") {
    console.warn(
      "⚠️  WARNING: Using default broker ID. Make sure this is intentional for production.",
    );
  }

  // Log Solana configuration if present
  if (config.solanaRpcUrl && config.solanaNetwork) {
    console.log(`✅ Solana wallet support enabled for ${config.solanaNetwork}`);
  }

  console.log(
    `✅ Orderly Network configured for ${config.network} with broker: ${config.brokerName} (${config.brokerId})`,
  );

  console.log("🔍 Final config object:", config);
  console.log("🔍 Final config.solanaRpcUrl:", config.solanaRpcUrl);

  return config as OrderlyEnvConfig;
}

export function getOrderlyConfig(): OrderlyEnvConfig {
  return validateOrderlyEnv();
}
