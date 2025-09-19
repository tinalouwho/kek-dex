import { NextRequest, NextResponse } from "next/server";

interface FeeStructure {
  tier: string;
  makerFee: string;
  takerFee: string;
  volumeRequirement?: string;
  description: string;
}

interface BrokerFeesResponse {
  brokerId: string;
  brokerName: string;
  defaultFees: {
    maker: string;
    taker: string;
  };
  feeTiers: FeeStructure[];
  timestamp: string;
}

// KEK AI Broker Fee Structure
const KEK_FEE_STRUCTURE: FeeStructure[] = [
  {
    tier: "Standard",
    makerFee: "0.015%",
    takerFee: "0.045%",
    description: "Default trading fees for all users",
  },
  {
    tier: "Volume Trader",
    makerFee: "0.010%",
    takerFee: "0.035%",
    volumeRequirement: "$100,000",
    description: "Reduced fees for high-volume traders",
  },
  {
    tier: "KEK Holder",
    makerFee: "0.005%",
    takerFee: "0.025%",
    volumeRequirement: "10,000 KEK",
    description: "Special rates for KEK token holders",
  },
  {
    tier: "Institutional",
    makerFee: "0.000%",
    takerFee: "0.020%",
    volumeRequirement: "$1,000,000",
    description: "Institutional trading accounts",
  },
];

export async function GET(
  request: NextRequest,
): Promise<NextResponse<BrokerFeesResponse>> {
  try {
    const url = new URL(request.url);
    const userAddress = url.searchParams.get("address");

    // TODO: If userAddress provided, calculate user-specific fee tier
    // TODO: Check KEK token holdings
    // TODO: Check 30-day trading volume
    // TODO: Check if user has institutional status

    const response: BrokerFeesResponse = {
      brokerId: process.env.NEXT_PUBLIC_ORDERLY_BROKER_ID || "kek_ai",
      brokerName: process.env.NEXT_PUBLIC_ORDERLY_BROKER_NAME || "Kek AI",
      defaultFees: {
        maker: "0.015%",
        taker: "0.045%",
      },
      feeTiers: KEK_FEE_STRUCTURE,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Fee structure error:", error);
    return NextResponse.json(
      {
        error: "Failed to retrieve fee structure",
        brokerId: "kek_ai",
        brokerName: "Kek AI",
        defaultFees: { maker: "0.015%", taker: "0.045%" },
        feeTiers: [],
        timestamp: new Date().toISOString(),
      } as BrokerFeesResponse,
      { status: 500 },
    );
  }
}
