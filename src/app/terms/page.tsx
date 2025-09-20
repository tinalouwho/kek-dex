"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";

export default function TermsPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A] text-purple-100 overflow-hidden">
      {/* Navigation */}
      <div className="w-full z-50">
        <Header />
      </div>

      {/* Terms Content */}
      <div className="relative flex flex-col z-10 py-12 px-4 lg:px-8 max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-4xl text-left font-bold font-mono bg-gradient-to-r from-[#00FF37] to-[#00E0D0] bg-clip-text text-transparent py-12">
            Terms & Conditions
          </p>

          <div className="flex gap-8">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 backdrop-blur-sm py-6 mr-4 rounded-xl border border-[#3C3C3C]">
                <p className="text-2xl font-mono text-purple-200 py-10">
                  Table of Contents
                </p>
                <nav className="space-y-2">
                  <a
                    href="#user-rights"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    1. User Rights and Responsibilities
                  </a>
                  <a
                    href="#intellectual-property"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    2. Intellectual Property
                  </a>
                  <a
                    href="#modification"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    3. Modification and Termination
                  </a>
                  <a
                    href="#warranties"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    4. Warranties and Disclaimers
                  </a>
                  <a
                    href="#prohibited-uses"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    5. Prohibited Uses
                  </a>
                  <a
                    href="#disclosures"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    6. Disclosures and Disclaimers
                  </a>
                  <a
                    href="#third-party"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    7. Third-Party Services
                  </a>
                  <a
                    href="#limitation"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    8. Limitation of Liability
                  </a>
                  <a
                    href="#indemnification"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    9. Indemnification
                  </a>
                  <a
                    href="#governing-law"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    10. Governing Law
                  </a>
                  <a
                    href="#dispute-resolution"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    11. Dispute Resolution
                  </a>
                  <a
                    href="#miscellaneous"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    12. Miscellaneous
                  </a>
                  <a
                    href="#services"
                    className="block text-purple-200 hover:text-[#00FF37] transition-colors py-1 text-sm"
                  >
                    13. Services Provided
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
                    These Terms and Conditions (&quot;Terms&quot;) constitute a
                    binding agreement between you (&quot;User&quot;,
                    &quot;you&quot;, or &quot;your&quot;) and KEK DEX (&quot;KEK
                    DEX&quot;, &quot;we&quot;, &quot;us&quot;). They govern your
                    use of the services provided through the KEK DEX website
                    (https://kekdex.io and its subdomains) (&quot;the
                    Site&quot;), including transactions in Digital Assets and
                    other services offered (collectively, the
                    &quot;Services&quot;).
                  </p>

                  <p className="mt-4 text-lg leading-relaxed">
                    KEK DEX is a software interface that connects users to
                    decentralized blockchain protocols. It does not hold,
                    custody, or control user assets or private keys. All
                    transactions are executed directly by users via third-party
                    smart contracts and wallets.
                  </p>

                  <p className="mt-4 text-lg leading-relaxed">
                    KEK DEX is not a wallet, exchange, broker, or financial
                    service provider. KEK DEX is not licensed by the Monetary
                    Authority of Singapore (MAS) or any other regulatory
                    authority, and its Services are not subject to financial
                    supervision.
                  </p>

                  <p className="mt-4 text-lg leading-relaxed">
                    By using the Services, you confirm that you have read,
                    understood, and accepted these Terms, including any related
                    policies that may be updated periodically on the Site. You
                    agree to comply with these Terms and any amendments.
                  </p>

                  <p className="mt-4 text-lg leading-relaxed">
                    The Services are not available to individuals or entities in
                    the United States of America, Singapore, or any other
                    Restricted Territory as defined in Section 1.1.5. For the
                    purposes of these Terms, &quot;Digital Assets&quot; include
                    Bitcoin, Ethereum, and any other cryptocurrencies, virtual
                    currencies, or tokens available for transactions through our
                    Services.
                  </p>
                </div>

                <div
                  id="user-rights"
                  className="backdrop-blur-sm p-6 rounded-xl scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    1. User Rights and Responsibilities
                  </h2>

                  <p className="text-lg leading-relaxed mb-4">
                    KEK DEX does not take possession, custody, or control of any
                    Digital Assets that appear on the Site, nor does it directly
                    manage the user&apos;s funds. KEK DEX operates solely as a
                    platform or interface that facilitates transactions without
                    holding any Digital Assets itself. You retain complete
                    control over your Digital Assets at all times, as KEK DEX
                    does not have the ability to access your private keys.
                  </p>

                  <h3 className="text-xl font-bold text-[#00E0D0] mb-3">
                    1.1. User Representations and Warranties
                  </h3>

                  <p className="mb-3">
                    As a condition to accessing or using the Site or the
                    Services, you represent and warrant to KEK DEX the
                    following:
                  </p>

                  <div className="space-y-3 ml-4">
                    <p>
                      <strong>1.1.1. Legal Age and Capacity:</strong> If you are
                      an individual, you are of legal age in your jurisdiction
                      and have the legal capacity to enter into these Terms.
                    </p>

                    <p>
                      <strong>1.1.2. Authority to Represent:</strong> If you are
                      representing an entity, you have the legal authority to
                      accept these Terms on that entity&apos;s behalf, in which
                      case &quot;you&quot; refers to that entity.
                    </p>

                    <p>
                      <strong>1.1.3. U.S. Person Exclusion:</strong> You are not
                      a U.S. Person, as defined by applicable laws.
                    </p>

                    <p>
                      <strong>1.1.4. Singapore Exclusion:</strong> You are not a
                      resident or national of Singapore.
                    </p>

                    <p>
                      <strong>1.1.5. Exclusion of Sanctioned Regions:</strong>{" "}
                      You are not a resident, national, or agent of any country
                      subject to embargoes or similar sanctions by the United
                      States or Singapore (collectively, &quot;Restricted
                      Territories&quot;).
                    </p>

                    <p>
                      <strong>1.1.6. Sanctions Compliance:</strong> You are not
                      subject to economic or trade sanctions administered or
                      enforced by any governmental authority.
                    </p>

                    <p>
                      <strong>1.1.7. Restricted Transactions:</strong> You do
                      not intend to transact with any individuals or entities
                      designated as restricted or sanctioned (Restricted Persons
                      or Sanctions List Persons).
                    </p>

                    <p>
                      <strong>1.1.8. No Circumvention of Restrictions:</strong>{" "}
                      You do not, and will not, use technologies or methods
                      (e.g. VPN) to circumvent geographical or regulatory
                      restrictions.
                    </p>

                    <p>
                      <strong>1.1.9. Lawful Use of Services:</strong> Your
                      access and use of the Site and Services do not violate any
                      applicable laws.
                    </p>
                  </div>

                  <h3 className="text-xl font-bold text-[#00E0D0] mb-3 mt-6">
                    1.2. Acknowledgments and Agreements
                  </h3>

                  <p className="mb-3">
                    As a condition of accessing or using the Site or the
                    Services, you acknowledge, understand, and agree to the
                    following:
                  </p>

                  <div className="space-y-3 ml-4">
                    <p>
                      <strong>1.2.1. Service availability:</strong> The Site and
                      Services may be inaccessible or inoperable due to (a)
                      equipment malfunctions; (b) periodic maintenance
                      procedures or repairs by KEK DEX; (c) unforeseeable causes
                      beyond KEK DEX&apos;s control; (d) disruptions within the
                      underlying blockchain infrastructure; or (e)
                      unavailability of third-party service providers or
                      external partners.
                    </p>

                    <p>
                      <strong>1.2.2. Access Modification Rights:</strong> KEK
                      DEX reserves the right to disable or modify access to the
                      Site at any time if you breach these Terms. KEK DEX is not
                      liable for any losses or damages arising from or related
                      to the Site or Services being inaccessible.
                    </p>

                    <p>
                      <strong>1.2.3. Service Changes:</strong> The Services are
                      subject to change, and third parties may modify, replace,
                      or discontinue access at their sole discretion without
                      liability.
                    </p>

                    <p>
                      <strong>1.2.4. Pricing Information:</strong> Pricing
                      information on the Site does not constitute an offer or
                      solicitation for transactions, nor does it constitute
                      financial advice or a recommendation to transact.
                    </p>

                    <p>
                      <strong>1.2.5. Non-Advisory Role:</strong> KEK DEX does
                      not act as a broker, advisor, or fiduciary to you.
                    </p>

                    <p>
                      <strong>1.2.6. User responsibilities:</strong> You are
                      solely responsible for your use of the Site and Services,
                      including all transfers of Digital Assets.
                    </p>

                    <p>
                      <strong>1.2.7. No Fiduciary Duties:</strong> We do not owe
                      you or any third party any fiduciary duties, which are
                      legal obligations to act in your best interest. Wherever
                      the law allows, we disclaim any such duties, and you agree
                      to waive and relinquish any claims related to such duties.
                    </p>

                    <p>
                      <strong>1.2.8. Tax Obligations:</strong> You are solely
                      responsible for reporting and paying any taxes arising
                      from your use of the Services.
                    </p>

                    <p>
                      <strong>1.2.9. Transaction Risks:</strong> KEK DEX is not
                      responsible for the delivery, quality, safety, legality,
                      or any aspects of Digital Assets transferred with third
                      parties. We cannot guarantee that transactions initiated
                      through the Site will be completed by third parties or are
                      authorized. You assume all risks associated with these
                      transactions.
                    </p>

                    <p>
                      <strong>1.2.10. Transaction Fees:</strong> You are
                      responsible for paying all applicable fees associated with
                      transactions conducted on specified blockchain networks.
                      This includes, but is not limited to, network
                      &apos;gas&apos; fees, transaction processing fees, and
                      trading fees, as detailed on the Interface at the time of
                      your transaction. These fees may vary and are your
                      responsibility to pay as incurred.
                    </p>

                    <p>
                      <strong>1.2.11. Advisory Disclaimer:</strong> Nothing on
                      the Site constitutes legal, financial, business, or tax
                      advice. The content is provided for informational purposes
                      only. You are advised to consult with a professional
                      advisor(s) before engaging in any activities based on such
                      information. You should not take or refrain from taking
                      any action based solely on the information provided on the
                      Site or any related communications, including, but not
                      limited to, blog posts, articles, links to third-party
                      content, discord content, news feeds, tutorials, tweets,
                      and videos. The Terms do not create or imply any fiduciary
                      duties between us and you or any other party.
                    </p>

                    <p>
                      <strong>
                        1.2.12. Functional Dependence on Third Parties:
                      </strong>{" "}
                      KEK DEX operates solely as a non-custodial interface and
                      depends on third-party protocols, blockchain networks,
                      smart contracts, oracles, wallet providers, and other
                      external systems to deliver its functionality. You
                      acknowledge and accept that KEK DEX does not own, control,
                      or guarantee the availability, reliability, accuracy, or
                      security of any such third-party components. Service
                      interruptions, transaction failures, execution delays, or
                      errors may occur due to issues within these third-party
                      systems, and KEK DEX shall not be held liable for any such
                      disruptions, malfunctions, or losses resulting therefrom.
                      You use the Site and interact with such third-party
                      infrastructure entirely at your own risk.
                    </p>
                  </div>
                </div>

                <div
                  id="intellectual-property"
                  className="backdrop-blur-sm p-6 rounded-xl scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    2. Intellectual Property
                  </h2>

                  <p>
                    <strong>2.1. Ownership of Intellectual Property:</strong>{" "}
                    KEK DEX retains all intellectual property rights in the
                    names, logos, and marks displayed on the Site. This includes
                    copyrights for content, code, data, and other materials
                    available through the Site. Your access to and use of the
                    Site does not confer any ownership or other proprietary
                    rights to you, except as explicitly stated in these Terms.
                  </p>

                  <p className="mt-4">
                    <strong>2.2. Use of feedback:</strong> You acknowledge that
                    any comments, bug reports, ideas, or other feedback you
                    provide to KEK DEX may be used and shared at our discretion.
                    KEK DEX may utilize or disregard such feedback, and may
                    share it with or without modification with third parties,
                    without obligation to you. If you submit or post any
                    materials or content to the Site, you grant KEK DEX a
                    perpetual, irrevocable, worldwide, royalty-free, and
                    non-exclusive license to use, reproduce, modify, distribute,
                    and display such materials in any manner without
                    compensation or obligation to you.
                  </p>
                </div>

                <div
                  id="modification"
                  className="backdrop-blur-sm p-6 rounded-xl scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    3. Modification and Termination
                  </h2>

                  <p>
                    <strong>
                      3.1. Modification, Suspension, and Termination of
                      Services:
                    </strong>{" "}
                    KEK DEX reserves the right, at our sole discretion, to
                    modify, suspend, or disable (temporarily or permanently) the
                    Site, in whole or in part, at any time and without prior
                    notice, for any reason. Should your access to the Site be
                    terminated, your right to use the Site will immediately
                    cease. KEK DEX will not be liable for any losses you may
                    incur due to any modification, suspension, or termination of
                    the Site or your access to it.
                  </p>

                  <p className="mt-4">
                    <strong>3.2. Amendments to Terms:</strong> KEK DEX may
                    revise these Terms at any time. Revisions become effective
                    immediately upon posting. By continuing to access or use the
                    Site after these revisions are posted, you agree to be bound
                    by the revised Terms.
                  </p>
                </div>

                <div
                  id="warranties"
                  className="backdrop-blur-sm p-6 rounded-xl scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    4. Warranties and Disclaimers
                  </h2>

                  <p>
                    <strong>4.1. Blockchain Technology Risks:</strong> Engaging
                    with blockchain networks, smart contracts, and Digital
                    Assets inherently involves risks. By using these
                    technologies via the Site, you acknowledge and accept these
                    risks. KEK DEX does not own, control, or influence the
                    underlying software that facilitates blockchain operations.
                    You are responsible for securing your private keys; loss of
                    these keys will result in irreversible access loss to your
                    Digital Assets.
                  </p>

                  <div className="ml-4 mt-4 space-y-3">
                    <p>
                      <strong>4.1.1. Technology Operations:</strong> KEK DEX
                      does not own or control the open-source software and
                      networks that blockchain technologies rely upon. By using
                      the Site, you acknowledge that KEK DEX is not responsible
                      for the operation or maintenance of this underlying
                      software.
                    </p>

                    <p>
                      <strong>4.1.2. No Guarantees:</strong> There are no
                      guarantees of functionality, security, or availability of
                      the software and networks underlying blockchain
                      technologies. You acknowledge that using these
                      technologies involves risk of operational failures and
                      security breaches.
                    </p>

                    <p>
                      <strong>4.1.3. Blockchain Network Changes:</strong> The
                      blockchain networks may undergo sudden changes in
                      operating rules (&quot;forks&quot;), which could
                      materially affect the Site and the Digital Assets managed
                      within. You acknowledge and accept the risks of such
                      changes.
                    </p>

                    <p>
                      <strong>4.1.4. Private Key Management:</strong> You are
                      solely responsible for securing your private keys. Losing
                      control of your private keys will permanently and
                      irreversibly deny you access to your Digital Assets. KEK
                      DEX cannot retrieve or protect your Digital Assets if you
                      lose access to your private keys.
                    </p>
                  </div>

                  <p className="mt-4">
                    <strong>4.2. Third-Party Content and Promotions:</strong>{" "}
                    KEK DEX is not responsible for any third-party content,
                    including information, materials, products, or services not
                    owned or controlled by KEK DEX. Additionally, third parties
                    may offer promotions through the Site. KEK DEX does not
                    endorse and is not responsible for any of these third-party
                    resources or promotions. If you choose to access these
                    resources or participate in promotions, you do so at your
                    own risk.
                  </p>

                  <p className="mt-4">
                    <strong>4.3. Blockchain Transaction Costs:</strong> You
                    acknowledge that the cost of transacting on blockchain
                    networks is variable and may increase at any time, causing
                    an impact on any activities taking place on these
                    blockchains, which may result in price fluctuations or
                    increased costs when using the Interface.
                  </p>

                  <p className="mt-4">
                    <strong>4.4. Irreversibility of Transactions:</strong>{" "}
                    Transactions sent using the Site are irreversible and final,
                    and there are no refunds. You acknowledge and agree that you
                    will access and use the Site at your own risk.
                  </p>

                  <p className="mt-4">
                    <strong>4.5. Legal Compliance:</strong> We must comply with
                    Applicable Law, which may require us to, upon request by
                    government agencies, take certain actions or provide
                    information that may not be in your best interests.
                  </p>

                  <p className="mt-4">
                    <strong>4.6. Assumption of Risks:</strong> By using the
                    Site, you acknowledge and accept all risks associated with
                    its use as detailed in this Section. You agree that KEK DEX
                    and its affiliates, including their shareholders, directors,
                    officers, employees, agents, representatives, suppliers, and
                    contractors, will not be liable for these risks. You also
                    irrevocably waive and release any claims, whether known or
                    unknown, arising from these risks.
                  </p>
                </div>

                <div
                  id="prohibited-uses"
                  className="backdrop-blur-sm p-6 rounded-xl scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    5. Prohibited Uses
                  </h2>

                  <p className="mb-4">
                    <strong>5.1 General Agreement:</strong> You agree not to
                    engage in any of the prohibited activities listed below.
                    This list is indicative and not exhaustive. By using the
                    Site, you confirm your commitment to abide by these
                    restrictions:
                  </p>

                  <div className="space-y-3 ml-4">
                    <p>
                      <strong>5.1.1 Illegal Activities:</strong> You shall not
                      promote, facilitate, or engage in illegal activities, such
                      as money laundering, terrorist financing, tax evasion, or
                      the trade of illegal drugs, contraband, counterfeit goods,
                      or illegal weapons.
                    </p>

                    <p>
                      <strong>5.1.2 Intellectual Property Violations:</strong>{" "}
                      You shall not engage in transactions that infringe on
                      copyrights, trademarks, rights of publicity, privacy
                      rights, or any proprietary rights owned or controlled by
                      KEK DEX.
                    </p>

                    <p>
                      <strong>5.1.3 Abusive Trading Practices:</strong> You are
                      prohibited from engaging in manipulative or fraudulent
                      trading activities including, but not limited to,
                      front-running, fraudulent trading, accommodation trading,
                      fictitious transactions, pre-arranged or non-competitive
                      transactions, and market cornering.
                    </p>

                    <p>
                      <strong>5.1.4 Malware and Disruptions:</strong> You must
                      not upload or transmit viruses, worms, Trojan horses, time
                      bombs, cancelbots, spiders, malware, or any other types of
                      malicious code that could impact the functionality or
                      operation of the Site.
                    </p>

                    <p>
                      <strong>5.1.5 Offensive Behavior:</strong> You shall not
                      use the Site in a manner that is libelous, defamatory,
                      obscene, pornographic, sexually explicit, offensive, or
                      excessively violent, or engage in behavior that is
                      harassing, abusive, discriminatory, or intended to incite
                      or promote hatred or violence against others.
                    </p>

                    <p>
                      <strong>5.1.6 Harassment and Harm:</strong> You are
                      prohibited from harassing, abusing, or harming other
                      persons or entities, including KEK DEX&apos;s
                      collaborators and service providers.
                    </p>

                    <p>
                      <strong>
                        5.1.7 Impersonation and Misrepresentation:
                      </strong>{" "}
                      You shall not impersonate any person or entity or falsely
                      state or otherwise misrepresent your affiliation with a
                      person or entity.
                    </p>

                    <p>
                      <strong>5.1.8 Encouraging Prohibited Behavior:</strong>{" "}
                      You shall not encourage, induce, or assist any third party
                      to engage in any of the activities prohibited by this
                      Section or any other provisions of these Terms.
                    </p>
                  </div>
                </div>

                <div
                  id="contact"
                  className="backdrop-blur-sm p-6 rounded-xl scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold text-[#00FF37] mb-4">
                    Contact Information
                  </h2>

                  <p className="text-lg leading-relaxed mb-4">
                    Please contact KEK DEX through any of our official channels
                    if you have any questions about these Terms and Conditions
                    or the Site:
                  </p>

                  <div className="flex items-center gap-4 mt-12">
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
                        className="w-8 h-8 rounded-lg"
                      />
                      <span>DEX Screener</span>
                    </Link>
                  </div>
                </div>

                <div className="bg-black/50 backdrop-blur-sm p-6 rounded-xl border border-[#3C3C3C] text-center">
                  <p className="leading-relaxed text-purple-200">
                    Best regards,
                  </p>
                  <p className="text-2xl font-bold font-mono text-[#00FF37] mt-4">
                    KEK DEX
                  </p>
                </div>

                <div className="text-center py-8">
                  <p className="text-purple-300">Last updated: January 2025</p>
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
