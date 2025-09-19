import { verifyMessage } from "ethers";
import { NextRequest, NextResponse } from "next/server";

interface VerifyWalletRequest {
  address: string;
  message: string;
  signature: string;
}

interface VerifyWalletResponse {
  success: boolean;
  address?: string;
  error?: string;
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<VerifyWalletResponse>> {
  try {
    const body: VerifyWalletRequest = await request.json();
    const { address, message, signature } = body;

    if (!address || !message || !signature) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Verify the signature
    const recoveredAddress = verifyMessage(message, signature);

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: "Invalid signature" },
        { status: 401 },
      );
    }

    // TODO: Store user session, check against database
    // TODO: Create or update user profile
    // TODO: Log authentication event for audit

    return NextResponse.json({
      success: true,
      address: recoveredAddress.toLowerCase(),
    });
  } catch (error) {
    console.error("Wallet verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
