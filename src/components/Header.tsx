import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [showCommunityPopup, setShowCommunityPopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleStartTrading = () => {
    console.log("Button clicked, navigating to trading page...");
    router.push("/en/perp/PERP_ETH_USDC");
  };

  const communityLinks = [
    {
      name: "DEX",
      icon: "/dex-logo.png",
      url: "https://dex.kekkoin.com",
      alt: "KEK DEX",
    },
    {
      name: "Telegram",
      icon: "/tg-logo.png",
      url: "https://t.me/kekkoin",
      alt: "Telegram",
    },
    {
      name: "Twitter",
      icon: "/x-logo.png",
      url: "https://twitter.com/kekkoin",
      alt: "Twitter/X",
    },
  ];
  return (
    <div className="header-component bg-black/75 backdrop-blur-sm w-full lg:px-4 px-2 lg:py-2 py-1 flex justify-between items-center relative z-20">
      <div className="flex items-center lg:space-x-2 ">
        <Link href="/" className="flex items-center lg:space-x-2 ">
          <Image
            src="/images/keklogo2.png"
            alt="KEK DEX"
            width={60}
            height={46}
          />
          <p className="lg:text-2xl text-xl font-mono text-purple-100 font-bold">
            KEK DEX
          </p>
        </Link>
        <div className="flex items-center gap-12 pl-16 max-[1200px]:hidden">
          <Link
            href="https://kekkoin.com/docs"
            target="_blank"
            className=" text-purple-200 font-bold"
          >
            Documentation
          </Link>
          <Link
            href="https://terminal.kekkoin.com"
            target="_blank"
            className=" text-purple-200 font-bold"
          >
            KEK Terminal
          </Link>

          <Link
            href="https://solscan.io/token/GXkoESRmdKJcQAPJrZCce6YR2bJe33QMC7fNVtTjvirt"
            target="_blank"
            className=" text-purple-200 font-bold"
          >
            $KEK Token
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setShowCommunityPopup(true)}
            onMouseLeave={() => setShowCommunityPopup(false)}
            onClick={() => setShowCommunityPopup(!showCommunityPopup)}
          >
            <button className="lg:text-2xl font-mono text-purple-200 font-bold hover:text-[#00FF37] transition-colors duration-300">
              Community
            </button>

            {/* Community Popup */}
            {showCommunityPopup && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 z-50">
                {/* Invisible bridge to prevent gap issues */}
                <div className="w-full h-2 bg-transparent"></div>

                <div className="bg-black/90 backdrop-blur-sm border border-[#3C3C3C] rounded-xl p-4 shadow-2xl min-w-[200px]">
                  <div className="flex flex-col gap-3">
                    {communityLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#00FF37]/10 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 relative">
                          <Image
                            src={link.icon}
                            alt={link.alt}
                            width={32}
                            height={32}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-purple-200 font-semibold group-hover:text-[#00FF37] transition-colors duration-300">
                          {link.name}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Arrow pointing up */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black/90 border-l border-t border-[#3C3C3C] rotate-45"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Start Trading Button */}
      <button
        onClick={handleStartTrading}
        className="header-start-button z-50 hover:cursor-pointer flex items-center justify-center px-6 w-40 h-[35px] py-2 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black font-semibold rounded-full hover:text-black transition-all duration-300 transform hover:scale-105 max-[1200px]:hidden"
      >
        Start Trading
      </button>

      {/* Mobile Hamburger Menu */}
      <button
        onClick={() => setShowMobileMenu(true)}
        className="min-[1201px]:hidden text-[#00FF37] transition-colors duration-300 z-50"
      >
        <GiHamburgerMenu size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          onClick={() => setShowMobileMenu(false)}
        >
          {/* Mobile Menu Sheet */}
          <div
            className="fixed right-0 top-0 h-full w-80 bg-black/75 backdrop-blur-sm border-l border-[#dadada] shadow-2xl transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setShowMobileMenu(false)}
                className="text-[#00FF37] transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6 px-6 py-4">
              <Link
                href="https://kekkoin.com/docs"
                target="_blank"
                className="text-purple-200 font-bold text-lg hover:text-[#00FF37] transition-colors duration-300"
                onClick={() => setShowMobileMenu(false)}
              >
                Documentation
              </Link>
              <Link
                href="https://terminal.kekkoin.com"
                target="_blank"
                className="text-purple-200 font-bold text-lg hover:text-[#00FF37] transition-colors duration-300"
                onClick={() => setShowMobileMenu(false)}
              >
                KEK Terminal
              </Link>
              <Link
                href="https://solscan.io/token/GXkoESRmdKJcQAPJrZCce6YR2bJe33QMC7fNVtTjvirt"
                target="_blank"
                className="text-purple-200 font-bold text-lg hover:text-[#00FF37] transition-colors duration-300"
                onClick={() => setShowMobileMenu(false)}
              >
                $KEK Token
              </Link>

              {/* Start Trading Button */}
              <button
                onClick={() => {
                  handleStartTrading();
                  setShowMobileMenu(false);
                }}
                className="header-start-button z-50 hover:cursor-pointer flex items-center justify-center px-6 w-40 h-[35px] py-2 bg-gradient-to-r from-[#00FF37] to-[#00E0D0] text-black font-semibold rounded-full hover:text-black transition-all duration-300 transform hover:scale-105 max-[1200px]:hidden"
              >
                Start Trading
              </button>
            </div>

            {/* Social Links at Bottom */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="border-t border-[#3C3C3C] pt-6">
                <div className="flex justify-center gap-6">
                  {communityLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-[#3C3C3C]/50 hover:bg-[#00FF37]/20 transition-all duration-300 group"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <div className="w-6 h-6 relative">
                        <Image
                          src={link.icon}
                          alt={link.alt}
                          width={30}
                          height={30}
                          className="w-full h-full rounded-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
