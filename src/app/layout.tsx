import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/data";

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
    <html lang="en" className="dark">
      <body className="noise">
        <MotionProvider>
          <CyberBackgroundWrapper />
          <Navbar />
          <main className="relative z-10 pt-[72px]">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
