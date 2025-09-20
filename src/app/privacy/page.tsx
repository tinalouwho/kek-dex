"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

export default function PrivacyPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#151515] via-[#0F0F0F] to-[#0A0A0A] text-purple-100 overflow-hidden">
      {/* Navigation */}
      <div className="w-full z-50">
        <Header />
      </div>

      {/* Privacy Policy Content */}
      <div className="relative flex flex-col z-10 py-12 px-4 lg:px-8 max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-4xl text-left font-bold font-mono bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent py-12  ">
            Privacy Policy
          </p>

          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24  backdrop-blur-sm py-6 mr-4 rounded-xl border border-[#3C3C3C]">
                <p className="text-2xl font-mono text-purple-200 py-10">
                  Table of Contents
                </p>
                <nav className="space-y-2">
                  <a
                    href="#personal-data"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Personal Data
                  </a>
                  <a
                    href="#traffic-data"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Traffic Data
                  </a>
                  <a
                    href="#cookies"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Cookies
                  </a>
                  <a
                    href="#third-party-services"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Third-party Services
                  </a>
                  <a
                    href="#third-party-websites"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Third-party Websites
                  </a>
                  <a
                    href="#data-security"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Data Security
                  </a>
                  <a
                    href="#data-transfer"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Data Transfer
                  </a>
                  <a
                    href="#regulatory-compliance"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Regulatory Compliance
                  </a>
                  <a
                    href="#policy-changes"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Policy Changes
                  </a>
                  <a
                    href="#contact"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    Contact Information
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="prose prose-invert max-w-none text-purple-200 space-y-6">
                <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-[#3C3C3C]">
                  <p className="text-lg leading-relaxed">
                    KEK DEX (we, us, our) operates kekdex.io (our services). By
                    using our services, you agree to the collection, use and
                    disclosure of personal data according to this policy.
                  </p>
                </div>

                <div
                  id="personal-data"
                  className="backdrop-blur-sm p-6 rounded-xl  scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Personal Data
                  </h2>

                  <p className="text-lg leading-relaxed">
                    When you use our services, we may ask for information that
                    can be used to contact or identify you. This may include,
                    but is not limited to, your name and e-mail address
                    (personal data). We use your personal data to provide and
                    improve our services. We will not use or share your personal
                    data except as described in this policy.
                  </p>
                </div>

                <div
                  id="traffic-data"
                  className=" backdrop-blur-sm p-6 rounded-xl  scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Traffic Data
                  </h2>

                  <p className="text-lg leading-relaxed">
                    When you use our services, we may collect data sent by your
                    browser. This may include your IP address, browser type,
                    browser version, the pages on our website that you visit,
                    the time and date of your visit (traffic data). We may use
                    third-party services such as Google Analytics to collect and
                    analyze this data, to increase our website's functionality.
                    These third-party services may have their own privacy
                    policies.
                  </p>
                </div>

                <div
                  id="cookies"
                  className="backdrop-blur-sm p-6 rounded-xl scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Cookies
                  </h2>

                  <p className="text-lg leading-relaxed">
                    It is rare these days but we do not use cookies within our
                    website.
                  </p>
                </div>

                <div
                  id="third-party-services"
                  className="backdrop-blur-sm p-6 rounded-xl  scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Third-party Services
                  </h2>

                  <p className="text-lg leading-relaxed">
                    We may use third-party service providers to facilitate our
                    services on our behalf, or to assist us in analyzing how our
                    services are used. These third parties have access to your
                    personal data only to perform these tasks on our behalf, and
                    are obligated not to use or share it for any other purpose.
                  </p>
                </div>

                <div
                  id="third-party-websites"
                  className=" backdrop-blur-sm p-6 rounded-xl  scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Third-party Websites
                  </h2>

                  <p className="text-lg leading-relaxed">
                    We may link to third-party websites on our website. If you
                    click on a third-party link, you will be directed to their
                    website. We have no control over, and assume no
                    responsibility for the content or policy of any third-party
                    website or service.
                  </p>
                </div>

                <div
                  id="data-security"
                  className="backdrop-blur-sm p-6 rounded-xl  scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Data Security
                  </h2>

                  <p className="text-lg leading-relaxed">
                    Your personal data is very important to us, but remember
                    that no method of electronic transmission or storage is 100%
                    secure. We use robust, industry-standard methods to protect
                    your information, but we cannot guarantee its absolute
                    security.
                  </p>
                </div>

                <div
                  id="data-transfer"
                  className=" backdrop-blur-sm p-6 rounded-xl  scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Data Transfer
                  </h2>

                  <p className="text-lg leading-relaxed">
                    Your personal data may be sent to (and stored on) servers
                    located outside of your state, province or country, where
                    data protection laws may differ from those in your
                    jurisdiction. When you consent to this policy and provide
                    data to us, you agree to this transfer.
                  </p>
                </div>

                <div
                  id="regulatory-compliance"
                  className=" backdrop-blur-sm p-6 rounded-xl  scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Regulatory Compliance
                  </h2>

                  <p className="text-lg leading-relaxed">
                    We will disclose your personal data when required to do so
                    by law, or if we believe that this is necessary to comply
                    with the law and reasonable requests of law enforcement, or
                    to protect the security of our services.
                  </p>
                </div>

                <div
                  id="policy-changes"
                  className=" backdrop-blur-sm p-6 rounded-xl  scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Policy Changes
                  </h2>

                  <p className="text-lg leading-relaxed">
                    This policy is effective from January 2025. Please consult
                    this page on a regular basis for updates to our policy.
                  </p>
                </div>

                <div
                  id="contact"
                  className="backdrop-blur-sm p-6 rounded-xl  scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Contact Information
                  </h2>

                  <p className="text-lg leading-relaxed mb-4">
                    Please contact KEK DEX through any of our official channels
                    if you have any questions about this document or our
                    services:
                  </p>

                  <div className="flex items-center gap-4 mt-12 ">
                    <Link
                      href="https://t.me/+1jKPWSYZYQVmYjYx"
                      target="_blank"
                      className="flex items-center gap-2 hover:text-[#00FF37] transition-colors"
                    >
                      <Image
                        src="/tg-logo.png"
                        alt="Telegram"
                        width={24}
                        height={24}
                        className="w-8 h-8 rounded-lg"
                      />
                      <span>Telegram</span>
                    </Link>

                    <Link
                      href="https://x.com/askkekai"
                      target="_blank"
                      className="flex items-center gap-2 hover:text-[#00FF37] transition-colors"
                    >
                      <Image
                        src="/x-logo.png"
                        alt="Twitter"
                        width={24}
                        height={24}
                        className="w-8 h-8 rounded-lg"
                      />
                      <span>Twitter</span>
                    </Link>

                    <Link
                      href="https://dexscreener.com/solana/5hanztfqggnj13keqxmzxvfzwq2zbxhy3r6qxuw1qpvf"
                      target="_blank"
                      className="flex items-center gap-2 hover:text-[#00FF37] transition-colors"
                    >
                      <Image
                        src="/dex-logo.png"
                        alt="Dex Screener"
                        width={24}
                        height={24}
                        className="w-8 h-8 rounded-lg "
                      />
                      <span>DEX Screener</span>
                    </Link>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-[#3C3C3C] text-center">
                  <p className="leading-relaxed  text-purple-200">
                    Best regards,
                  </p>
                  <p className="text-2xl font-bold font-mono text-[#00FF37] mt-4">
                    KEK DEX
                  </p>
                </div>

                <div className="text-center py-8">
                  <p className="text-purple-300">
                    Last updated: September 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t bg-black/40 backdrop-blur-sm py-8 px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end lg:mx-12">
          <div className="flex flex-col gap-3">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image
                src="/images/keklogo2.png"
                alt="KEK Terminal"
                width={50}
                height={50}
                className=""
              />
              <span className="text-2xl font-bold font-mono text-purple-50">
                KEK DEX
              </span>
            </div>
          </div>

          <div className="text-purple-200 text-sm flex flex-col items-end justify-end gap-2">
            <p>
              Powered by{" "}
              <Link
                href="https://orderly.network"
                target="_blank"
                className="text-purple-100"
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
