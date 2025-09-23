"use client";

import { useState, useEffect } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BsRobot } from "react-icons/bs";
import { FaUncharted } from "react-icons/fa6";
import { LuBrainCircuit } from "react-icons/lu";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/kek-ui";
import { cn } from "@/lib/utils";
import Header from "./Header";

const Bars = dynamic(() => import("./Bars"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-kek-green/5 via-transparent to-kek-blue/5 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-kek-green/10 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-kek-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-kek-green/15 rounded-full blur-2xl animate-ping delay-500"></div>
    </div>
  ),
});

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleStartTrading = () => {
    console.log("LandingPage: Start Trading button clicked");
    console.log("LandingPage: Current router:", router);
    console.log("LandingPage: Navigating to /en/perp/PERP_ETH_USDC");
    try {
      router.push("/en/perp/PERP_ETH_USDC");
      console.log("LandingPage: Navigation command sent successfully");
    } catch (error) {
      console.error("LandingPage: Navigation error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen kek-bg-main  kek-text-primary overflow-hidden flex flex-col items-center justify-between">
      {/* Animated Background */}

      {/* Navigation */}
      <div className="w-full z-50">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 py-12 min-h-[95vh] max-md:mt-12 flex flex-col items-center justify-center  px-4 lg:px-8">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 w-full h-full opacity-20">
          <Bars />
        </div>
        <div
          className={`relative z-20 text-center  transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col items-center justify-center gap-8 font-bold mb-6">
            <p className="font-mono lg:text-6xl text-4xl font-bold kek-text-gradient animate-gradient">
              Trade Smarter. Trade KEK.
            </p>

            <p className="kek-text-primary text-xl max-md:text-base max-w-3xl">
              The first DEX that fuses AI-powered strategy generation and
              smart-trading bots for low-risk perp + spot execution
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:gap-6 gap-4 justify-center items-center mb-16">
            <Link
              href="https://kekkoin.com/docs"
              target="_blank"
              className="px-8 py-2 border kek-border kek-text-primary font-semibold text-lg rounded-full hover:border-kek-green max-md:hidden hover:text-kek-green transition-all duration-300 w-full sm:w-auto text-center"
            >
              Documentation
            </Link>

            <Button
              variant="primary"
              size="md"
              onClick={handleStartTrading}
              className=" text-lg md:w-[200px] text-nowrap w-full kek-shadow-primary"
            >
              Start Trading
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={cn(
            "relative z-20 bg-black/50 backdrop-blur-sm p-10 rounded-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-300",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="text-center">
            <div className="text-2xl lg:text-5xl font-bold font-mono kek-text-gradient mb-2">
              200+
            </div>
            <div className="kek-text-secondary lg:text-lg">
              Markets supported
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl lg:text-5xl font-bold font-mono kek-text-gradient mb-2">
              $10B+
            </div>
            <div className="kek-text-secondary lg:text-lg">Trading volume</div>
          </div>

          <div className="text-center">
            <div className="text-2xl lg:text-5xl font-bold font-mono kek-text-gradient mb-2">
              60k+
            </div>
            <div className="kek-text-secondary lg:text-lg">Active traders</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 min-h-[90vh]  py-8 px-6 lg:px-8 w-full flex flex-col items-center justify-center">
        <div className="mx-auto">
          <div className="text-center mb-16">
            <div className="text-4xl lg:text-6xl flex flex-col gap-6 font-bold mb-6 items-center justify-center">
              <p className="font-mono kek-text-gradient">
                Not just a DEX—an ecosystem.
              </p>

              <p className="kek-text-secondary lg:text-2xl mt-8 text-base max-w-4xl pb-12">
                Share and copy strategies, compete on leaderboards, and grow
                with a community of traders leveraging the same tools as pros.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap w-full items-center gap-8 justify-center">
            {/* Feature 1 */}
            <div className="h-[350px] lg:w-[400px] w-full bg-gradient-to-b hover:border-[#00FF37]  p-4 lg:p-6 rounded-xl border  border-[#1B1B1B] from-[#1B1B1B] to-transparent backdrop-blur-sm group">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#00FF37] to-[#00E0D0] rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <LuBrainCircuit className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-6 kek-text-secondary">
                AI-Driven Strategy Generation
              </h3>
              <p className="kek-text-secondary text-base leading-relaxed pt-4">
                Let KEK Mix&apos;s multi-agent AI pipeline analyze market
                regimes, narratives, and assets to deliver validated strategies
                ready for action.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="h-[350px] lg:w-[400px] w-full bg-gradient-to-b hover:border-[#00FF37] border p-4 lg:p-6 rounded-xl  border-[#1B1B1B] from-[#1B1B1B] to-transparent backdrop-blur-sm group">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#00FF37] to-[#00E0D0] rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <BsRobot className="w-[28px] h-[28px] text-black" />
              </div>
              <h3 className="text-xl font-bold mb-6 kek-text-secondary">
                Automated Trading Bots
              </h3>
              <p className="kek-text-secondary leading-relaxed pt-4">
                Deploy KEK Botz directly inside the DEX. Backtested,
                paper-traded, and risk-controlled bots execute with speed and
                discipline.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="h-[350px] lg:w-[400px] w-full bg-gradient-to-b hover:border-[#00FF37] border p-4 lg:p-6 rounded-xl  border-[#1B1B1B] from-[#1B1B1B] to-transparent backdrop-blur-sm group">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#00FF37] to-[#00E0D0] rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <AiOutlineSafetyCertificate className="w-[28px] h-[28px] text-black" />
              </div>
              <h3 className="text-xl font-bold mb-6 kek-text-secondary">
                Safety-First Execution
              </h3>
              <p className="kek-text-secondary leading-relaxed pt-4">
                Start with paper trading and institutional-grade risk
                controls—before going live with real positions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="h-[350px] lg:w-[400px] w-full bg-gradient-to-b hover:border-[#00FF37] border p-4 lg:p-6 rounded-xl  border-[#1B1B1B] from-[#1B1B1B] to-transparent backdrop-blur-sm group">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-[#00FF37] to-[#00E0D0] rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUncharted className="w-[28px] h-[28px] text-black" />
              </div>
              <h3 className="text-xl font-bold mb-6 kek-text-secondary">
                Built to Scale
              </h3>
              <p className="kek-text-secondary leading-relaxed pt-4">
                Orderly&apos;s omnichain infrastructure + KEK’s AI layer = deep
                liquidity, resilient infrastructure, and a trading experience
                that adapts to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative min-h-[90vh] flex flex-col items-center justify-center z-10 py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl lg:text-6xl font-bold mb-8">
            <p className="kek-text-secondary font-extrabold">
              Your Edge Starts Here.
            </p>
            <p className="kek-text-secondary pt-6">
              AI-powered strategies, automated execution, real market depth—all
              in one DEX.
            </p>
            <span className="font-mono kek-text-gradient"></span>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleStartTrading}
            className=" py-2 text-xl w-[280px] kek-shadow-primary text-nowrap"
          >
            Start Trading Now
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t kek-border kek-bg-card/40 backdrop-blur-sm py-8 px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end lg:mx-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center max-md:flex-col max-md:items-end space-x-2 mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/keklogo2.png"
                  alt="KEK Terminal"
                  width={50}
                  height={50}
                  className=""
                />
                <span className="text-2xl font-bold font-mono kek-text-primary">
                  KEK DEX
                </span>
              </div>
            </div>
          </div>

          <div className="kek-text-secondary text-sm flex flex-col items-end justify-end gap-2">
            <div className="flex items-center gap-4 mb-4">
              <Link href="https://t.me/+1jKPWSYZYQVmYjYx" target="_blank">
                <Image
                  src="/tg-logo.png"
                  alt="Telegram"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-lg"
                />
              </Link>
              <Link
                href="https://dexscreener.com/solana/5hanztfqggnj13keqxmzxvfzwq2zbxhy3r6qxuw1qpvf"
                target="_blank"
              >
                <Image
                  src="/dex-logo.png"
                  alt="Dex Screener"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-lg"
                />
              </Link>
              <Link href="https://x.com/askkekai" target="_blank">
                <Image
                  src="/x-logo.png"
                  alt="Twitter"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-lg"
                />
              </Link>
            </div>
            <div className="flex items-center mb-4 gap-6 max-md:gap-4 max-md:flex-col max-md:items-end">
              <Link href="/privacy" className=" ">
                <p className="underline font-mono text-kek-green">
                  Privacy Policy
                </p>
              </Link>
              <Link href="/terms" className=" ">
                <p className="underline font-mono text-kek-green">
                  Terms of Service
                </p>
              </Link>
            </div>

            <p>
              Powered by{" "}
              <Link
                href="https://orderly.network"
                target="_blank"
                className="kek-text-primary"
              >
                Orderly Network
              </Link>
            </p>
            <p>© 2025 KEK DEX. Built on Orderly Network.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
