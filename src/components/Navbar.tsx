"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { GithubIcon, TelegramIcon } from "@/components/icons/BrandIcons";
import { Menu, Shield, Terminal as TerminalIcon, X } from "lucide-react";
import { siteConfig } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TerminalWidget from "./TerminalWidget";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "TryHackMe", href: "/tryhackme" },
  { label: "HackTheBox", href: "/hackthebox" },
  { label: "HTB Academy", href: "/htb-academy" },
  { label: "PicoCTF", href: "/picoctf" },
  { label: "CryptoHack", href: "/cryptohack" },
  { label: "Matrix", href: "/learning-matrix" },
  { label: "Cisco", href: "/cisco" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "`" || event.key === "~") {
        event.preventDefault();
        setTerminalOpen((current) => !current);
      }
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`nav-orbit ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-deck">
          <Link href="/" className="nav-brand" aria-label="Home">
            <span className="nav-brand-mark">
              <Shield aria-hidden="true" />
            </span>
            <span className="nav-brand-copy">
              <strong>V.E</strong>
              <small>SECURITY LOG</small>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${active ? "active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span aria-hidden="true">{"//"}</span>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-tools">
            <button
              type="button"
              onClick={() => setTerminalOpen((current) => !current)}
              className="nav-tool"
              aria-label="Toggle terminal"
            >
              <TerminalIcon />
            </button>
            <span className="nav-divider" aria-hidden="true" />
            <a className="nav-tool" href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a className="nav-tool" href={siteConfig.socials.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
              <TelegramIcon />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((current) => !current)}
            className="nav-mobile-toggle"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <m.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.22 }}
            className="mobile-nav-deck"
          >
            <div className="mobile-nav-grid">
              {navLinks.map((link, index) => {
                const active = pathname === link.href;
                return (
                  <m.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.035 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`mobile-nav-link ${active ? "active" : ""}`}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {link.label}
                    </Link>
                  </m.div>
                );
              })}
            </div>

            <div className="mobile-nav-tools">
              <button type="button" onClick={() => setTerminalOpen(true)}>
                <TerminalIcon /> Terminal
              </button>
              <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer"><GithubIcon /> GitHub</a>
              <a href={siteConfig.socials.telegram} target="_blank" rel="noopener noreferrer"><TelegramIcon /> Telegram</a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      <TerminalWidget isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  );
}
