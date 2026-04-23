"use client";

import { siteConfig } from "@/lib/data";
import { Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-default)] py-8">
      <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[var(--cyber-green)]" />
          <span className="font-mono text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} {siteConfig.nameEn}
          </span>
        </div>

        <div className="flex items-center gap-1 font-mono text-xs text-[var(--text-muted)]">
          <span>Built with</span>
          <Heart className="w-3 h-3 text-[var(--cyber-magenta)] mx-1" />
          <span>& Next.js</span>
        </div>

        <div className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">
          {siteConfig.universityUa}
        </div>
      </div>
    </footer>
  );
}
