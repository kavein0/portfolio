"use client";

import { Radio, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer-orbit">
      <div className="container-custom">
        <div className="footer-deck">
          <span><ShieldCheck /> {new Date().getFullYear()} {siteConfig.nameEn}</span>
          <span className="footer-signal"><i /> SYSTEM ONLINE</span>
          <span><Radio /> {siteConfig.universityUa}</span>
        </div>
      </div>
    </footer>
  );
}
