"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { GithubIcon, TelegramIcon } from "@/components/icons/BrandIcons";
import { Menu, X, Shield, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";
import TerminalWidget from "./TerminalWidget";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "TryHackMe", href: "/tryhackme" },
  { label: "HackTheBox", href: "/hackthebox" },
  { label: "HTBAcademy", href: "/htb-academy" },
  { label: "PicoCTF", href: "/picoctf" },
  { label: "CryptoHack", href: "/cryptohack" },
  { label: "Matrix", href: "/learning-matrix" },
  { label: "Cisco", href: "/cisco" },
];

function getNavTheme(href: string) {
  void href;
  return {
    active: "text-[var(--text-primary)]",
    hover: "hover:text-[var(--text-primary)]",
    prefix: "text-[var(--cyber-blue)]",
  };
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <m.header
        initial={false}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(4, 7, 10, 0.9)" : "rgba(4, 7, 10, 0.68)",
          backdropFilter: "blur(24px) saturate(120%)",
          borderBottom: "1px solid var(--border-default)",
          transition: "background 0.3s ease",
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
              className="w-6 h-6 text-[var(--cyber-blue)] transition-colors duration-300 group-hover:text-[var(--text-primary)]"
              strokeWidth={2}
            />
            <span className="font-display text-sm font-bold tracking-widest uppercase text-[var(--text-primary)] hidden sm:inline">
              V<span className="text-[var(--cyber-blue)]">.</span>E
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const theme = getNavTheme(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-2 text-xs font-mono transition-colors duration-200 relative group ${
                    isActive
                      ? theme.active
                      : `text-[var(--text-secondary)] ${theme.hover}`
                  }`}
                >
                  <span
                    className={`transition-opacity mr-1 ${
                      isActive
                        ? `opacity-100 ${theme.prefix}`
                        : `opacity-60 group-hover:opacity-100 ${theme.prefix}`
                    }`}
                  >
                    {"//"}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop socials & terminal */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setTerminalOpen(!terminalOpen)}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
              aria-label="Toggle Terminal (~)"
            >
              <TerminalIcon className="w-5 h-5" />
            </button>
            <div className="w-px h-5 bg-[var(--border-default)]"></div>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-[18px] h-[18px]" />
            </a>

            <a
              href={siteConfig.socials.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-[18px] h-[18px]" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[var(--text-primary)] p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </m.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#04070a]/96 backdrop-blur-2xl flex flex-col items-center justify-center gap-5 lg:hidden"
          >
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              const theme = getNavTheme(link.href);

              return (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-xl font-display font-semibold transition-colors ${
                      isActive
                        ? theme.active
                        : `text-[var(--text-primary)] ${theme.hover}`
                    }`}
                  >
                    {link.label}
                  </Link>
                </m.div>
              );
            })}
            <div className="flex items-center gap-6 mt-8">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setTerminalOpen(true);
                }}
                className="text-[var(--text-muted)] hover:text-[var(--cyber-green)] transition-colors"
                aria-label="Open terminal"
              >
                <TerminalIcon className="w-6 h-6" />
              </button>
              <div className="w-px h-6 bg-[var(--border-default)]"></div>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--cyber-green)] transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-6 h-6" />
              </a>

              <a
                href={siteConfig.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--cyber-blue)] transition-colors"
                aria-label="Telegram"
              >
                <TelegramIcon className="w-6 h-6" />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <TerminalWidget isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
