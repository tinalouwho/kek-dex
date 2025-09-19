"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "./Header";

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleStartTrading = () => {
    router.push("/en/perp/PERP_ETH_USDC");
  };

  return (
    <div className=" w-full min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A] text-purple-100 overflow-hidden flex flex-col items-center justify-between">
      {/* Animated Background */}

      {/* Navigation */}
      <div className="w-full z-50">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 py-12 min-h-[95vh] flex flex-col items-center justify-center  px-6 lg:px-8">
        <div
          className={`text-center  transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col items-center justify-center gap-8 font-bold mb-6">
            <p className="font-mono lg:text-6xl text-4xl font-bold bg-gradient-to-r from-[#00FF37] via-[#00E0D0] to-[#00FF37] bg-clip-text text-transparent animate-gradient">
              Trade Smarter. Trade KEK.
            </p>

            <p className="text-purple-100 text-xl max-w-3xl ">
              The first DEX that fuses AI-powered strategy generation and
              smart-trading bots for low-risk perp + spot execution
            </p>
            <p className="text-purple-200 text-sm">
              Built on the Orderly Network
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:gap-6 gap-2 justify-center items-center mb-16">
            <Link
              href="https://kekkoin.com/docs"
              target="_blank"
              className="px-8 py-4 border border-gray-600 text-purple-100 font-semibold text-lg rounded-xl hover:border-kek-green max-md:hidden hover:text-kek-green transition-all duration-300 w-full sm:w-auto"
            >
              Documentation
            </Link>
            <button
              onClick={handleStartTrading}
              className="primary-button px-12 py-6 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black font-bold text-xl md:w-[180px] w-full h-[35px] rounded-full hover:shadow-2xl hover:shadow-[#00FF37]/30 transition-all duration-300 transform hover:scale-105"
            >
              Start Trading
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={` bg-black/50 backdrop-blur-sm p-10 rounded-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold font-mono bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent mb-2">
              200+
            </div>
            <div className="text-purple-200 text-lg">Markets supported</div>
          </div>

          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold font-mono bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent mb-2">
              $10B+
            </div>
            <div className="text-purple-200 text-lg">Trading volume</div>
          </div>

          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold font-mono bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent mb-2">
              60k+
            </div>
            <div className="text-purple-200 text-lg">Active traders</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 min-h-[90vh]  py-8 px-6 lg:px-8 w-full flex flex-col items-center justify-center">
        <div className="mx-auto">
          <div className="text-center mb-16">
            <div className="text-4xl lg:text-6xl flex flex-col gap-6 font-bold mb-6 items-center justify-center">
              <p className="font-mono bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent">
                Not just a DEX—an ecosystem.
              </p>

              <p className="text-purple-200 text-2xl max-w-4xl pb-12">
                {" "}
                Share and copy strategies, compete on leaderboards, and grow
                with a community of traders leveraging the same tools as pros.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap w-full items-center gap-8 justify-center">
            {/* Feature 1 */}
            <div className="bg-gradient-to-b h-[350px] lg:w-[400px] w-full from-[#1B1B1B] to-[#0F0F0F] border border-[#3C3C3C] rounded-2xl p-8 hover:border-[#00FF37] transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold mb-4 text-purple-100">
                🔮 AI-Driven Strategy Generation
              </h3>
              <p className="text-purple-200 leading-relaxed pt-4">
                Let KEK Mix&apos;s multi-agent AI pipeline analyze market
                regimes, narratives, and assets to deliver validated strategies
                ready for action.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-b h-[350px] lg:w-[400px] w-full from-[#1B1B1B] to-[#0F0F0F] border border-[#3C3C3C] rounded-2xl p-8 hover:border-[#00FF37] transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold mb-4 text-purple-100">
                🤖 Automated Trading Bots
              </h3>
              <p className="text-purple-200 leading-relaxed pt-4">
                Deploy KEK Botz directly inside the DEX. Backtested,
                paper-traded, and risk-controlled bots execute with speed and
                discipline.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-b h-[350px] lg:w-[400px] w-full from-[#1B1B1B] to-[#0F0F0F] border border-[#3C3C3C] rounded-2xl p-8 hover:border-[#00FF37] transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold mb-4 text-purple-100">
                🛡️ Safety-First Execution
              </h3>
              <p className="text-purple-200 leading-relaxed pt-4">
                Start with paper trading and institutional-grade risk
                controls—before going live with real positions.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-b h-[350px] lg:w-[400px] w-full from-[#1B1B1B] to-[#0F0F0F] border border-[#3C3C3C] rounded-2xl p-8 hover:border-[#00FF37] transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold mb-4 text-purple-100">
                🌐 Built to Scale
              </h3>
              <p className="text-purple-200 leading-relaxed pt-4">
                Orderly&apos;s omnichain infrastructure + KEK’s AI layer = deep
                liquidity, resilient infrastructure, and a trading experience
                that adapts to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative min-h-[90vh] z-10 py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl lg:text-6xl font-bold mb-8">
            <p className="text-purple-200">Your Edge Starts Here.</p>
            <p className="text-purple-100 pt-6">
              AI-powered strategies, automated execution, real market depth—all
              in one DEX.
            </p>
            <span className="font-mono bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent"></span>
          </div>

          <button
            onClick={handleStartTrading}
            className="primary-button px-12 py-6 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black font-bold text-xl w-[200px] h-[35px] rounded-full hover:shadow-2xl hover:shadow-[#00FF37]/30 transition-all duration-300 transform hover:scale-105"
          >
            Start Trading Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#3C3C3C] py-8 px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image
              src="/images/keklogo2.png"
              alt="KEK Terminal"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-lg font-bold font-mono text-purple-50">
              KEK DEX
            </span>
          </div>

          <div className="text-purple-100 text-sm">
            © 2025 KEK DEX. Built on Orderly Network.
          </div>
        </div>
      </footer>
    </div>
  );
}
