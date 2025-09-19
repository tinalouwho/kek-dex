import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import ClientPolyfills from "@/components/ClientPolyfills";
import OrderlyProvider from "@/components/orderlyProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "KEK Dex",
  description: "KEK Dex",
};

// Google Fonts
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-mono",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout(props: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${orbitron.variable} ${inter.variable}`}
    >
      <head>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
      </head>
      <body>
        <ClientPolyfills />
        <OrderlyProvider>{props.children}</OrderlyProvider>
      </body>
    </html>
  );
}
