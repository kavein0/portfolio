"use client";

import { m } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/lib/data";
import {
  GraduationCap,
  MapPin,
  Target,
  BookOpen,
  Zap,
  ServerCrash,
} from "lucide-react";

const highlights = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    label: "University",
    value: siteConfig.universityShort,
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Location",
    value: "Kamianets-Podilskyi, Ukraine",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Focus",
    value: "Cybersecurity",
  },
  {
    icon: <Target className="w-5 h-5" />,
    label: "Year",
    value: siteConfig.year,
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section label */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-[1px] w-8 bg-[var(--cyber-green)]" />
          <span className="font-mono text-xs text-[var(--cyber-green)] tracking-widest uppercase">
            About
          </span>
        </m.div>

        <m.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title mb-12"
        >
          Who I <span className="text-[var(--cyber-green)]">Am</span>
        </m.h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text block */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              I&apos;m a <span className="text-[var(--text-primary)] font-semibold">3rd-year cadet</span> at{" "}
              <span className="text-[var(--cyber-green)]">{siteConfig.university}</span>,
              specializing in cybersecurity and digital forensics. My academic journey is driven by a
              passion for understanding how systems can be both defended and ethically challenged.
            </p>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              Beyond the classroom, I actively participate in <span className="text-[var(--cyber-blue)]">CTF competitions</span>,
              build homelab environments, and practice on platforms like TryHackMe and HackTheBox.
              I focus on penetration testing, network security, and DevOps automation — blending
              offensive skills with infrastructure knowledge.
            </p>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed">
              My goal is to contribute to Ukraine&apos;s cybersecurity defense as a skilled professional,
              combining law enforcement knowledge from KNUIA with practical technical expertise.
            </p>

          </m.div>

          {/* Visual block — terminal card */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card overflow-hidden"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-default)]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-[var(--text-muted)]">
                ~/Larein — zsh
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-sm leading-loose space-y-1">
              <p>
                <span className="text-[var(--cyber-green)]">Larein@KNUIA</span>
                <span className="text-[var(--text-muted)]">:</span>
                <span className="text-[var(--cyber-blue)]">~</span>
                <span className="text-[var(--text-muted)]">$</span>{" "}
                <span className="text-[var(--text-primary)]">whoami</span>
              </p>
              <p className="text-[var(--text-secondary)]">
                {siteConfig.nameEn}
              </p>

              <p className="pt-2">
                <span className="text-[var(--cyber-green)]">Larein@KNUIA</span>
                <span className="text-[var(--text-muted)]">:</span>
                <span className="text-[var(--cyber-blue)]">~</span>
                <span className="text-[var(--text-muted)]">$</span>{" "}
                <span className="text-[var(--text-primary)]">cat interests.txt</span>
              </p>
              <div className="text-[var(--text-secondary)] space-y-1 pl-0">
                <p className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-[var(--cyber-green)]" /> Penetration Testing
                </p>
                <p className="flex items-center gap-2">
                  <ServerCrash className="w-3 h-3 text-[var(--cyber-blue)]" /> DevOps & Infrastructure
                </p>
                <p className="flex items-center gap-2">
                  <Target className="w-3 h-3 text-[var(--cyber-purple)]" /> CTF Competitions
                </p>
                <p className="flex items-center gap-2">
                  <BookOpen className="w-3 h-3 text-[var(--cyber-orange)]" /> Digital Forensics
                </p>
              </div>

              <p className="pt-2">
                <span className="text-[var(--cyber-green)]">Larein@KNUIA</span>
                <span className="text-[var(--text-muted)]">:</span>
                <span className="text-[var(--cyber-blue)]">~</span>
                <span className="text-[var(--text-muted)]">$</span>{" "}
                <span className="text-[var(--text-primary)]">echo $STATUS</span>
              </p>
              <p className="text-[var(--cyber-green)]">
                Active & Learning ▮
              </p>
            </div>
          </m.div>
        </div>

        {/* Quick stats - Full width horizontal layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {highlights.map((item, i) => (
            <m.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="glass-card p-5 flex items-start sm:items-center gap-4"
            >
              <div className="text-[var(--cyber-green)] mt-1 sm:mt-0">
                {item.icon}
              </div>
              <div>
                <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
                  {item.value}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
