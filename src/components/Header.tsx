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
    <div className="header-component bg-black/75 backdrop-blur-sm w-full lg:px-4 px-1 lg:py-2 py-1 flex justify-between items-center relative z-20">
      <div className="flex items-center lg:space-x-2 ">
        <Image
          src="/images/keklogo2.png"
          alt="KEK DEX"
          width={60}
          height={46}
        />
        <p className="lg:text-2xl font-mono text-purple-100 font-bold">
          KEK DEX
        </p>
        <div className="flex items-center gap-12 pl-20 max-[1200px]:hidden">
          <button className="lg:text-2xl font-mono text-purple-200 font-bold">
            Documentation
          </button>
          <button className="lg:text-2xl font-mono text-purple-200 font-bold">
            Product
          </button>

          <button className="lg:text-2xl font-mono text-purple-200 font-bold">
            $KEK Token
          </button>
          <button className="lg:text-2xl font-mono text-purple-200 font-bold">
            Community
          </button>
        </div>
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
