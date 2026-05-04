"use client";

import { useRef, useEffect, useState } from "react";
import { m } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { Terminal, Shield, Lock } from "lucide-react";
import Link from "next/link";

// Typing effect hook
function useTypingEffect(texts: string[], typingSpeed = 60, deletingSpeed = 40, pauseMs = 2000) {
  const [display, setDisplay] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentText = texts[textIndex];

    if (!isDeleting) {
      if (display.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplay(currentText.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseMs);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(currentText.slice(0, display.length - 1));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseMs]);

  return display;
}

export default function HeroSection() {
  const typed = useTypingEffect(
    [
      "Penetration Tester",
      "DevOps Engineer",
      "CTF Player",
      "Linux Enthusiast",
      "Security Researcher",
    ],
    70,
    40,
    2200
  );

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,255,136,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 70% 60%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Hexagonal grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="container-custom relative z-10 flex flex-col items-center text-center px-4">
        {/* Status badge */}
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 mb-8 cyber-tag"
        >
          <span className="status-online" />
          <span className="text-[var(--cyber-green)] text-xs">
            AVAILABLE FOR INTERNSHIPS
          </span>
        </m.div>

        {/* Title line */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-3 mb-4"
        >
          <Shield className="w-5 h-5 text-[var(--cyber-green)] hidden sm:block" />
          <span className="font-mono text-xs sm:text-sm text-[var(--text-muted)] tracking-widest uppercase">
            {siteConfig.universityShort} {"//"} {siteConfig.year}
          </span>
          <Lock className="w-4 h-4 text-[var(--cyber-blue)] hidden sm:block" />
        </m.div>

        {/* Name */}
        <m.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-2 glitch-wrapper"
        >
          <span className="gradient-text glitch-text" data-text={siteConfig.nameEn.split(" ")[0]}>{siteConfig.nameEn.split(" ")[0]}</span>
          <br />
          <span className="text-[var(--text-primary)] glitch-text" data-text={siteConfig.nameEn.split(" ").slice(1).join(" ")}>
            {siteConfig.nameEn.split(" ").slice(1).join(" ")}
          </span>
        </m.h1>

        {/* Ukrainian name */}
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-mono text-xs text-[var(--text-muted)] tracking-[0.3em] uppercase mb-8"
        >
          {siteConfig.name}
        </m.p>

        {/* Typing effect */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex items-center gap-2 mb-10"
        >
          <Terminal className="w-4 h-4 text-[var(--cyber-green)]" />
          <span className="font-mono text-base sm:text-lg text-[var(--text-secondary)]">
            {typed}
          </span>
          <span className="w-[2px] h-5 bg-[var(--cyber-green)] animate-blink" />
        </m.div>

        {/* CTA Buttons */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/stats" className="magnetic-btn">
            <Shield className="w-4 h-4" />
            View Cyber Stats
          </Link>
          <a
            href="#contact"
            className="magnetic-btn"
            style={{
              "--btn-color": "var(--cyber-blue)",
            } as React.CSSProperties}
          >
            Get in Touch
          </a>
        </m.div>

      </div>
    </section>
  );
}
