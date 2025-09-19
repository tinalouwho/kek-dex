"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
    <div className="landing-page min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A] text-white overflow-hidden flex flex-col items-center justify-between">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00FF37]/10 via-transparent to-[#00E0D0]/10 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00FF37]/5 rounded-full blur-3xl animate-bounce"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E0D0]/5 rounded-full blur-3xl animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Navigation */}
      <div className="lg:container">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 lg:px-8">
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col items-center justify-center gap-8 font-bold mb-6">
            <p className="font-mono text-3xl font-bold bg-gradient-to-r from-[#00FF37] via-[#00E0D0] to-[#00FF37] bg-clip-text text-transparent animate-gradient">
              Trade Smarter. Trade KEK.
            </p>

            <p className="text-purple-100 text-lg max-w-2xl mx-auto">
              The first DEX that fuses AI-powered strategy generation, and
              smarttrading bots for low-risk perp + spot execution
            </p>
            <p className="text-purple-100 text-sm">
              Built on the Orderly Network
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="px-8 py-4 border border-gray-600 text-purple-100 font-semibold text-lg rounded-xl hover:border-kek-green hover:text-kek-green transition-all duration-300 w-full sm:w-auto">
              Documentation
            </button>
            <button
              onClick={handleStartTrading}
              className="px-8 py-4 min-w-[180px] h-[35px] bg-gradient-to-r from-kek-green to-kek-blue text-black font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-kek-green/30 transition-all duration-300 transform hover:scale-105 sm:w-auto"
            >
              Start Trading
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent mb-2">
              200+
            </div>
            <div className="text-gray-400 text-lg">Markets supported</div>
          </div>

          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent mb-2">
              $10B+
            </div>
            <div className="text-gray-400 text-lg">Trading volume</div>
          </div>

          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent mb-2">
              60k+
            </div>
            <div className="text-gray-400 text-lg">Active traders</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 lg:container py-20 px-6 lg:px-8 w-full flex flex-col items-center justify-center">
        <div className="mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-white">YOU DON&apos;T LEARN IT.</span>
              <br />
              <span className="font-mono bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent">
                YOU JUST DEPOSIT AND TRADE.
              </span>
            </h2>
            <p className="text-xl text-gray-300">Less UI. More KEK.</p>
          </div>

          <div className="flex flex-wrap w-full items-center gap-8 justify-center">
            {/* Feature 1 */}
            <div className="bg-gradient-to-b h-[350px] lg:w-[400px] w-full from-[#1B1B1B] to-[#0F0F0F] border border-[#3C3C3C] rounded-2xl p-8 hover:border-[#00FF37] transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"></div>
              <h3 className="text-xl font-bold mb-4 text-white">
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
              <h3 className="text-xl font-bold mb-4 text-white">
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
              <h3 className="text-xl font-bold mb-4 text-white">
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
              <h3 className="text-xl font-bold mb-4 text-white">
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
      <div className="relative z-10 py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            <span className="text-white">200+ perp & spot markets</span>
            <br />
            <span className="font-mono bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent">
              in one UI.
            </span>
          </h2>

          <button
            onClick={handleStartTrading}
            className="px-12 py-6 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black font-bold text-xl rounded-2xl hover:shadow-2xl hover:shadow-[#00FF37]/30 transition-all duration-300 transform hover:scale-105"
          >
            Start Trading Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#3C3C3C] py-8 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
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
