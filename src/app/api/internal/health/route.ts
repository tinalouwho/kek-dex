import { NextRequest, NextResponse } from "next/server";

interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  broker: {
    id: string;
    name: string;
    network: string;
  };
  services: {
    orderlyApi: "healthy" | "unhealthy" | "unknown";
    orderlyWs: "healthy" | "unhealthy" | "unknown";
    database: "healthy" | "unhealthy" | "unknown";
  };
  uptime: number;
}

const startTime = Date.now();

export async function GET(
  request: NextRequest,
): Promise<NextResponse<HealthCheckResponse>> {
  try {
    const uptime = Math.floor((Date.now() - startTime) / 1000);

    // TODO: Add actual health checks for external services
    const services = {
      orderlyApi: "unknown" as const,
      orderlyWs: "unknown" as const,
      database: "unknown" as const,
    };

    // Check Orderly API health
    try {
      const apiUrl = process.env.NEXT_PUBLIC_ORDERLY_API_URL;
      if (apiUrl) {
        const response = await fetch(`${apiUrl}/v1/public/info`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        services.orderlyApi = response.ok ? "healthy" : "unhealthy";
      }
    } catch (error) {
      services.orderlyApi = "unhealthy";
    }

    // TODO: Check WebSocket connection health
    // TODO: Check database connection health

    const allHealthy = Object.values(services).every(
      (status) => status === "healthy",
    );
    const anyUnhealthy = Object.values(services).some(
      (status) => status === "unhealthy",
    );

    let overallStatus: "healthy" | "degraded" | "unhealthy";
    if (allHealthy) {
      overallStatus = "healthy";
    } else if (anyUnhealthy) {
      overallStatus = "degraded";
    } else {
      overallStatus = "unhealthy";
    }

    const healthCheck: HealthCheckResponse = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "0.1.0",
      broker: {
        id: process.env.NEXT_PUBLIC_ORDERLY_BROKER_ID || "kek_ai",
        name: process.env.NEXT_PUBLIC_ORDERLY_BROKER_NAME || "Kek AI",
        network: process.env.NEXT_PUBLIC_ORDERLY_NETWORK || "mainnet",
      },
      services,
      uptime,
    };

    // Return appropriate HTTP status code
    const httpStatus =
      overallStatus === "healthy"
        ? 200
        : overallStatus === "degraded"
          ? 200
          : 503;

    return NextResponse.json(healthCheck, { status: httpStatus });
  } catch (error) {
    console.error("Health check error:", error);

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        version: "0.1.0",
        broker: {
          id: "kek_ai",
          name: "Kek AI",
          network: "mainnet",
        },
        services: {
          orderlyApi: "unhealthy",
          orderlyWs: "unhealthy",
          database: "unhealthy",
        },
        uptime: Math.floor((Date.now() - startTime) / 1000),
      } as HealthCheckResponse,
      { status: 503 },
    );
  }
}
