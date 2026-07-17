"use client";

import { useEffect, useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import { Activity, ArrowRight, Radio, Shield, Terminal } from "lucide-react";
import ConstellationDisplay from "@/components/ConstellationDisplay";
import { certifications, htbAcademyModules, siteConfig, thmRooms } from "@/lib/data";

const roles = [
  "Penetration Tester",
  "DevOps Engineer",
  "CTF Player",
  "Security Researcher",
];

const activity = [
  "Cryptography track updated",
  "31 TryHackMe rooms",
  "5 CryptoHack courses",
];

function useTypingEffect(texts: string[], typingSpeed = 58, deletingSpeed = 34, pauseMs = 1800) {
  const [display, setDisplay] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const atEnd = !deleting && display.length === currentText.length;
    const delay = atEnd ? pauseMs : deleting ? deletingSpeed : typingSpeed;
    const timeout = window.setTimeout(() => {
      if (!deleting && display.length < currentText.length) {
        setDisplay(currentText.slice(0, display.length + 1));
        return;
      }
      if (!deleting) {
        setDeleting(true);
        return;
      }
      if (display.length > 0) {
        setDisplay(currentText.slice(0, -1));
        return;
      }
      setDeleting(false);
      setTextIndex((current) => (current + 1) % texts.length);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, deletingSpeed, display, pauseMs, textIndex, texts, typingSpeed]);

  return display;
}

export default function HeroSection() {
  const typed = useTypingEffect(roles);

  return (
    <section id="hero" className="command-hero">
      <div className="container-custom">
        <div className="hero-telemetry-row">
          <m.aside
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="telemetry-panel telemetry-status"
          >
            <div className="panel-caption"><Radio /> System status <span>01</span></div>
            <div className="telemetry-radar" aria-hidden="true">
              <span /><span /><span /><span />
              <i />
            </div>
            <div className="telemetry-meta"><span>GLOBAL NODES</span><strong>ONLINE</strong></div>
          </m.aside>

          <m.div
            initial={{ opacity: 0, scaleX: 0.94 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="telemetry-panel telemetry-signal"
          >
            <div className="signal-bracket signal-bracket-left" />
            <ConstellationDisplay compact />
            <div className="signal-bracket signal-bracket-right" />
          </m.div>

          <m.aside
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="telemetry-panel telemetry-activity"
          >
            <div className="panel-caption"><Activity /> Activity feed <span>LIVE</span></div>
            <div className="activity-feed">
              {activity.map((item, index) => (
                <div key={item}><span>{item}</span><time>{index + 1}h</time></div>
              ))}
            </div>
            <div className="telemetry-meta"><span>LOG STREAM</span><strong>ACTIVE</strong></div>
          </m.aside>
        </div>

        <div className="hero-stage">
          <div className="hero-frame hero-frame-back" aria-hidden="true" />
          <div className="hero-frame hero-frame-mid" aria-hidden="true" />
          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.28 }}
            className="hero-viewport"
          >
            <div className="hero-reflection" aria-hidden="true" />
            <div className="hero-copy">
              <div className="hero-status"><span /> Available for internships</div>
              <p className="hero-kicker">{siteConfig.universityShort} &nbsp;//&nbsp; {siteConfig.year}</p>
              <h1>
                <span>{siteConfig.nameEn.split(" ")[0]}</span>
                <strong>{siteConfig.nameEn.split(" ").slice(1).join(" ")}</strong>
              </h1>
              <p className="hero-native-name">{siteConfig.name}</p>
              <div className="hero-role"><Terminal /> <span>{typed}</span><i /></div>
              <div className="hero-actions">
                <Link href="/stats" className="command-button primary"><Shield /> View progress <ArrowRight /></Link>
                <a href="#contact" className="command-button">Get in touch</a>
              </div>
            </div>

            <div className="hero-visual">
              <ConstellationDisplay />
              <div className="coordinate-readout">
                <span>LAT 48.6839° N</span>
                <span>LON 26.5852° E</span>
              </div>
              <div className="hero-axis" aria-hidden="true"><span /><span /><span /><span /><span /></div>
            </div>
          </m.div>
        </div>

        <div className="hero-lower-deck">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55 }}
            className="lower-panel overview-panel"
          >
            <div className="panel-caption"><Shield /> Platform overview <span>SYNCED</span></div>
            <div className="overview-stats">
              <div><strong>{thmRooms.length}</strong><span>THM rooms</span></div>
              <div><strong>{htbAcademyModules.length}</strong><span>Academy</span></div>
              <div><strong>{certifications.length}</strong><span>Certificates</span></div>
              <div><strong>08</strong><span>PicoCTF</span></div>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.64 }}
            className="lower-panel focus-panel"
          >
            <div className="panel-caption"><Activity /> Current focus <span>2026</span></div>
            <div className="focus-track">
              <span>Offensive security</span>
              <span>Digital forensics</span>
              <span>Infrastructure</span>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
