"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { GithubIcon, TelegramIcon } from "@/components/icons/BrandIcons";
import { Menu, X, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "TryHackMe", href: "/tryhackme" },
  { label: "HackTheBox", href: "/hackthebox" },
  { label: "HTBAcademy", href: "/htb-academy" },
  { label: "Cisco", href: "/cisco" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? "rgba(10, 10, 15, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Home"
          >
            <Shield
              className="w-6 h-6 text-[var(--cyber-green)] group-hover:rotate-12 transition-transform duration-300"
              strokeWidth={2}
            />
            <span className="font-display text-sm font-bold tracking-widest uppercase text-[var(--text-primary)] hidden sm:inline">
              V<span className="text-[var(--cyber-green)]">.</span>E
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-mono transition-colors duration-200 relative group ${
                    isActive ? "text-[var(--cyber-green)]" : "text-[var(--text-secondary)] hover:text-[var(--cyber-green)]"
                  }`}
                >
                  <span className={`transition-opacity mr-1 ${isActive ? "opacity-100 text-[var(--cyber-green)]" : "opacity-0 group-hover:opacity-100 text-[var(--cyber-green)]"}`}>
                    {"//"}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop socials */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--cyber-green)] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-[18px] h-[18px]" />
            </a>

            <a
              href={siteConfig.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--cyber-blue)] transition-colors"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-[18px] h-[18px]" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[var(--text-primary)] p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-2xl font-display font-bold tracking-wider transition-colors ${
                    pathname === link.href ? "text-[var(--cyber-green)]" : "text-[var(--text-primary)] hover:text-[var(--cyber-green)]"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="flex gap-6 mt-8">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--cyber-green)] transition-colors"
              >
                <GithubIcon className="w-6 h-6" />
              </a>

              <a
                href={siteConfig.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--cyber-blue)] transition-colors"
              >
                <TelegramIcon className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
