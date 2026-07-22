"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, FolderOpen, Mail, Menu, Terminal as TerminalIcon, X } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { siteConfig } from "@/lib/data";
import styles from "./SiteChrome.module.css";

const TerminalWidget = dynamic(() => import("./TerminalWidget"), { ssr: false });

const primaryLinks = [
  { id: "hero", label: "Home", href: "/" },
  { id: "about", label: "Profile", href: "/#about" },
  { id: "skills", label: "Capabilities", href: "/#skills" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

type PrimarySectionId = (typeof primaryLinks)[number]["id"];

type NavIndicatorGeometry = {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
};

const scrollKeys = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Spacebar"]);

const archiveLinks = [
  { label: "Progress overview", detail: "All verified activity", href: "/stats" },
  { label: "TryHackMe", detail: "Rooms & badges", href: "/tryhackme" },
  { label: "Hack The Box", detail: "Machines & challenges", href: "/hackthebox" },
  { label: "HTB Academy", detail: "Modules & badges", href: "/htb-academy" },
  { label: "PicoCTF", detail: "Challenge record", href: "/picoctf" },
  { label: "CryptoHack", detail: "Courses & lessons", href: "/cryptohack" },
  { label: "Learning matrix", detail: "Structured roadmap", href: "/learning-matrix" },
  { label: "Cisco", detail: "Certificates", href: "/cisco" },
] as const;

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

export default function Navbar() {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<PrimarySectionId>("hero");
  const [navIndicator, setNavIndicator] = useState<NavIndicatorGeometry | null>(null);
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const primaryNavRef = useRef<HTMLElement>(null);
  const primaryLinkRefs = useRef<Partial<Record<PrimarySectionId, HTMLAnchorElement | null>>>({});
  const scrollFrameRef = useRef<number | null>(null);
  const scrollLockTimerRef = useRef<number | null>(null);
  const programmaticTargetRef = useRef<PrimarySectionId | null>(null);
  const scrollSpyScheduleRef = useRef<() => void>(() => {});
  const displayedSection = pathname === "/" ? activeSection : null;

  const releaseProgrammaticScroll = useCallback(() => {
    const wasLocked = programmaticTargetRef.current !== null;
    programmaticTargetRef.current = null;

    if (scrollLockTimerRef.current !== null) {
      window.clearTimeout(scrollLockTimerRef.current);
      scrollLockTimerRef.current = null;
    }

    if (wasLocked) scrollSpyScheduleRef.current();
  }, []);

  const measurePrimaryIndicator = useCallback(() => {
    const nav = primaryNavRef.current;
    const activeLink = displayedSection ? primaryLinkRefs.current[displayedSection] : null;

    if (!nav || !activeLink) {
      setNavIndicator((current) => current?.visible ? { ...current, visible: false } : current);
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const next: NavIndicatorGeometry = {
      x: linkRect.left - navRect.left,
      y: linkRect.top - navRect.top,
      width: linkRect.width,
      height: linkRect.height,
      visible: true,
    };

    setNavIndicator((current) => {
      const unchanged = current?.visible
        && Math.abs(current.x - next.x) < 0.5
        && Math.abs(current.y - next.y) < 0.5
        && Math.abs(current.width - next.width) < 0.5
        && Math.abs(current.height - next.height) < 0.5;
      return unchanged ? current : next;
    });
  }, [displayedSection]);

  useLayoutEffect(() => {
    let cancelled = false;
    let frame: number | null = null;
    const scheduleMeasure = () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        frame = null;
        if (!cancelled) measurePrimaryIndicator();
      });
    };

    scheduleMeasure();
    const observer = new ResizeObserver(scheduleMeasure);
    if (primaryNavRef.current) observer.observe(primaryNavRef.current);
    for (const link of Object.values(primaryLinkRefs.current)) {
      if (link) observer.observe(link);
    }

    void document.fonts.ready.then(scheduleMeasure);

    return () => {
      cancelled = true;
      observer.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [measurePrimaryIndicator]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === "`" || event.key === "~") && !event.altKey && !event.ctrlKey && !event.metaKey && !isEditableTarget(event.target)) {
        event.preventDefault();
        setTerminalOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setArchiveOpen(false);
        setMobileOpen(false);
        setTerminalOpen(false);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setArchiveOpen(false);
      setMobileOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      programmaticTargetRef.current = null;
      return;
    }

    const syncActiveSection = () => {
      scrollFrameRef.current = null;
      const lockedSection = programmaticTargetRef.current;

      if (lockedSection) {
        setActiveSection((current) => current === lockedSection ? current : lockedSection);
        return;
      }

      const anchor = Math.min(window.innerHeight * 0.34, 320);
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      let nextSection: PrimarySectionId = atPageEnd ? "contact" : "hero";

      if (!atPageEnd) {
        for (const link of primaryLinks) {
          const section = document.getElementById(link.id);
          if (section && section.getBoundingClientRect().top <= anchor) nextSection = link.id;
        }
      }

      setActiveSection((current) => current === nextSection ? current : nextSection);
    };

    const scheduleSync = () => {
      if (scrollFrameRef.current !== null) return;
      scrollFrameRef.current = window.requestAnimationFrame(syncActiveSection);
    };

    const isProgrammaticTargetSettled = () => {
      const targetId = programmaticTargetRef.current;
      if (!targetId) return false;
      if (targetId === "hero") return window.scrollY <= 3;

      const target = document.getElementById(targetId);
      if (!target) return true;
      const scrollMarginTop = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      return Math.abs(target.getBoundingClientRect().top - scrollMarginTop) <= 4
        || (targetId === "contact" && atPageEnd);
    };

    const handleScrollEnd = () => {
      if (isProgrammaticTargetSettled()) releaseProgrammaticScroll();
    };

    const handleManualScrollIntent = () => releaseProgrammaticScroll();
    const handleManualScrollKey = (event: KeyboardEvent) => {
      if (!isEditableTarget(event.target) && scrollKeys.has(event.key)) releaseProgrammaticScroll();
    };

    scrollSpyScheduleRef.current = scheduleSync;
    scheduleSync();
    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync, { passive: true });
    window.addEventListener("hashchange", scheduleSync);
    window.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("wheel", handleManualScrollIntent, { passive: true });
    window.addEventListener("touchstart", handleManualScrollIntent, { passive: true });
    window.addEventListener("pointerdown", handleManualScrollIntent, { passive: true });
    window.addEventListener("keydown", handleManualScrollKey);

    return () => {
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("hashchange", scheduleSync);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("wheel", handleManualScrollIntent);
      window.removeEventListener("touchstart", handleManualScrollIntent);
      window.removeEventListener("pointerdown", handleManualScrollIntent);
      window.removeEventListener("keydown", handleManualScrollKey);
      if (scrollFrameRef.current !== null) window.cancelAnimationFrame(scrollFrameRef.current);
      if (scrollLockTimerRef.current !== null) window.clearTimeout(scrollLockTimerRef.current);
      scrollSpyScheduleRef.current = () => {};
      programmaticTargetRef.current = null;
      scrollFrameRef.current = null;
      scrollLockTimerRef.current = null;
    };
  }, [pathname, releaseProgrammaticScroll]);

  const openTerminal = () => {
    setArchiveOpen(false);
    setMobileOpen(false);
    setTerminalOpen(true);
  };

  const closeMenus = () => {
    setArchiveOpen(false);
    setMobileOpen(false);
  };

  const handlePrimaryClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    link: (typeof primaryLinks)[number],
  ) => {
    setActiveSection(link.id);
    closeMenus();

    if (pathname !== "/") return;

    const section = document.getElementById(link.id);
    if (!section) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reducedMotion ? "auto" : "smooth";
    programmaticTargetRef.current = link.id;

    if (scrollLockTimerRef.current !== null) window.clearTimeout(scrollLockTimerRef.current);

    if (link.id === "hero") {
      window.scrollTo({ top: 0, behavior });
    } else {
      section.scrollIntoView({ behavior, block: "start" });
    }

    window.history.replaceState(window.history.state, "", link.href);
    scrollLockTimerRef.current = window.setTimeout(
      releaseProgrammaticScroll,
      reducedMotion ? 120 : 1800,
    );
  };

  return (
    <>
      <header ref={headerRef} className={styles.header}>
        <div className={styles.navGlass}>
          <Link href="/" onClick={closeMenus} className={styles.brand} aria-label="Yevhenii Voronianskyi — home">
            <span className={styles.brandStar} aria-hidden="true" />
            <span><strong>V.E</strong><small>portfolio</small></span>
          </Link>

          <nav ref={primaryNavRef} className={styles.primaryNav} aria-label="Primary navigation">
            {navIndicator ? (
              <m.span
                data-nav-indicator
                className={styles.activeLiquid}
                initial={false}
                animate={{
                  x: navIndicator.x,
                  y: navIndicator.y,
                  width: navIndicator.width,
                  height: navIndicator.height,
                  opacity: navIndicator.visible ? 1 : 0,
                }}
                transition={prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 245, damping: 30, mass: 0.72 }}
                aria-hidden="true"
              />
            ) : null}
            {primaryLinks.map((link) => {
              const active = displayedSection === link.id;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(element) => {
                    primaryLinkRefs.current[link.id] = element;
                  }}
                  onClick={(event) => handlePrimaryClick(event, link)}
                  className={active ? styles.activeLink : undefined}
                  aria-current={active ? "location" : undefined}
                >
                  <span className={styles.navLinkLabel}>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className={styles.navActions}>
            <button
              type="button"
              className={styles.archiveButton}
              onClick={() => setArchiveOpen((current) => !current)}
              aria-expanded={archiveOpen}
              aria-controls="portfolio-archive"
            >
              <FolderOpen aria-hidden="true" />
              <span>Explore archive</span>
              <ChevronDown aria-hidden="true" />
            </button>

            <span className={styles.navDivider} aria-hidden="true" />
            <button type="button" className={styles.iconButton} onClick={openTerminal} aria-label="Open terminal">
              <TerminalIcon aria-hidden="true" />
            </button>
            <a className={styles.iconButton} href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon aria-hidden="true" />
            </a>
            <a className={styles.iconButton} href={`mailto:${siteConfig.socials.email}`} aria-label="Email">
              <Mail aria-hidden="true" />
            </a>
          </div>

          <div className={styles.mobileActions}>
            <button type="button" className={styles.iconButton} onClick={openTerminal} aria-label="Open terminal">
              <TerminalIcon aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setMobileOpen((current) => !current)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {archiveOpen ? (
            <m.nav
              id="portfolio-archive"
              aria-label="Portfolio archive"
              initial={{ opacity: 0, y: -8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.99 }}
              transition={{ duration: 0.18 }}
              className={styles.archivePanel}
            >
              <div className={styles.archiveIntro}>
                <strong>Platform archive</strong>
                <span>Courses, certifications and completed challenges.</span>
              </div>
              <div className={styles.archiveGrid}>
                {archiveLinks.map((link, index) => (
                  <Link key={link.href} href={link.href} onClick={closeMenus}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span><strong>{link.label}</strong><small>{link.detail}</small></span>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </m.nav>
          ) : null}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {mobileOpen ? (
            <m.nav
              id="mobile-navigation"
              aria-label="Primary navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className={styles.mobilePanel}
            >
              <div className={styles.mobilePrimary}>
                {primaryLinks.map((link) => {
                  const active = displayedSection === link.id;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(event) => handlePrimaryClick(event, link)}
                      className={active ? styles.mobileActive : undefined}
                      aria-current={active ? "location" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              <span className={styles.mobileLabel}>Archive</span>
              <div className={styles.mobileArchive}>
                {archiveLinks.map((link) => <Link key={link.href} href={link.href} onClick={closeMenus}>{link.label}<ArrowUpRight aria-hidden="true" /></Link>)}
              </div>
              <div className={styles.mobileSocials}>
                <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer"><GithubIcon aria-hidden="true" />GitHub</a>
                <a href={`mailto:${siteConfig.socials.email}`}><Mail aria-hidden="true" />Email</a>
              </div>
            </m.nav>
          ) : null}
        </AnimatePresence>
      </header>

      {terminalOpen ? <TerminalWidget isOpen onClose={() => setTerminalOpen(false)} /> : null}
    </>
  );
}
