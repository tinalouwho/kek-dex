import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  const handleStartTrading = () => {
    console.log("Button clicked, navigating to trading page...");
    router.push("/en/perp/PERP_ETH_USDC");
  };
  return (
    <div className="header-component   w-full px-4 py-2 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Image
          src="/images/keklogo2.png"
          alt="KEK DEX"
          width={60}
          height={46}
        />
        <span className="text-2xl font-mono text-purple-50 font-bold">
          KEK DEX
        </span>
      </div>
      <button
        onClick={handleStartTrading}
        className="header-start-button z-50 hover:cursor-pointer flex items-center justify-center px-6 w-40 h-[35px] py-2 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black font-semibold rounded-full hover:text-black transition-all duration-300 transform hover:scale-105"
      >
        Start Trading
      </button>
    </div>
  );
}
