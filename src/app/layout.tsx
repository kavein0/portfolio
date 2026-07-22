import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Cyber Security Portfolio`,
  description: siteConfig.description,
  keywords: [
    "cybersecurity",
    "portfolio",
    "penetration testing",
    "KNUIA",
    "DevOps",
    "CTF",
    siteConfig.nameEn,
  ],
  authors: [{ name: siteConfig.nameEn }],
  openGraph: {
    title: `${siteConfig.nameEn} — Cybersecurity Portfolio`,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.nameEn} — Cybersecurity Portfolio`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Navbar from "@/components/Navbar";
import CyberBackgroundWrapper from "@/components/CyberBackgroundWrapper";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable} noise`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <MotionProvider>
          <CyberBackgroundWrapper />
          <Navbar />
          <main id="main-content" className="site-main relative z-10">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
