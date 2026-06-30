"use client";

import Image from "next/image";
import {
  Award,
  Binary,
  ChevronDown,
  ChevronUp,
  Eye,
  ExternalLink,
  Flag,
  KeyRound,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";

const picoChallenges = [
  { name: "interencdec", difficulty: "Easy" },
  { name: "Mod 26", difficulty: "Easy" },
  { name: "The Numbers", difficulty: "Easy" },
  { name: "13", difficulty: "Easy" },
  { name: "rsa_oracle", difficulty: "Medium" },
  { name: "Custom encryption", difficulty: "Medium" },
  { name: "C3", difficulty: "Medium" },
  { name: "Vigenere", difficulty: "Medium" },
] as const;

function EvidencePanel({
  id,
  title,
  description,
  image,
  alt,
}: {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={id}
        className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left hover:bg-[var(--cyber-green)]/5 transition-colors group"
      >
        <span className="flex items-center gap-4">
          <span className="w-11 h-11 rounded-lg bg-[var(--cyber-green)]/10 border border-[var(--cyber-green)]/20 flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5 text-[var(--cyber-green)]" />
          </span>
          <span>
            <span className="block font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-green)] transition-colors">
              {title}
            </span>
            <span className="block mt-1 text-sm text-[var(--text-muted)]">
              {description}
            </span>
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[var(--cyber-green)] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--cyber-green)] shrink-0 transition-colors" />
        )}
      </button>

      {isOpen ? (
          <div id={id}>
            <div className="px-4 pb-4 md:px-6 md:pb-6">
              <div className="rounded-lg overflow-hidden border border-[var(--border-default)] bg-black">
                <Image
                  src={image}
                  alt={alt}
                  width={1720}
                  height={914}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
              </div>
            </div>
          </div>
      ) : null}
    </div>
  );
}

export default function PicoCTFClient() {
  const easyCount = picoChallenges.filter(
    (challenge) => challenge.difficulty === "Easy",
  ).length;
  const mediumCount = picoChallenges.length - easyCount;

  return (
    <div className="container-custom min-h-screen page-pad">
      <div className="mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[var(--cyber-green)]" />
              <span className="font-mono text-xs text-[var(--cyber-green)] uppercase tracking-[0.2em]">
                Capture The Flag
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 glitch-wrapper">
              <span className="glitch-text" data-text="PicoCTF">
                PicoCTF
              </span>{" "}
              <span className="text-[var(--cyber-green)]">Challenges</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-mono text-base md:text-lg max-w-3xl">
              Completed cryptography challenges and profile progress documented
              through the CyLab Security Academy learning platform.
            </p>
          </div>

          <a
            href="https://learn.cylabacademy.org/users/Lareine"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full md:w-auto items-center justify-between gap-4 px-5 py-4 rounded-xl bg-[var(--cyber-green)]/10 border border-[var(--cyber-green)]/20 hover:border-[var(--cyber-green)]/60 hover:bg-[var(--cyber-green)]/15 transition-all group"
          >
            <UserRound className="w-5 h-5 text-[var(--cyber-green)]" />
            <div className="flex-1">
              <div className="font-mono text-sm font-bold text-[var(--text-primary)]">
                @Lareine
              </div>
              <div className="font-mono text-xs text-[var(--text-muted)]">
                Joined June 2026
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--cyber-green)] transition-colors" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6 mb-20 md:mb-24">
        {[
          { label: "Completed", value: picoChallenges.length, icon: Flag, color: "var(--cyber-green)" },
          { label: "Easy", value: easyCount, icon: ShieldCheck, color: "#22c55e" },
          { label: "Medium", value: mediumCount, icon: Award, color: "#f5b942" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-7 md:p-8 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] transition-all group flex flex-col items-center text-center"
          >
            <stat.icon
              className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform"
              style={{ color: stat.color }}
            />
            <div className="text-3xl font-display font-bold text-[var(--text-primary)]">
              {stat.value}
            </div>
            <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <section className="mb-20 md:mb-24">
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
          <KeyRound className="text-[var(--cyber-green)]" />
          Solved Cryptography Challenges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {picoChallenges.map((challenge) => {
            const isEasy = challenge.difficulty === "Easy";
            const difficultyColor = isEasy ? "#22c55e" : "#f5b942";

            return (
              <article
                key={challenge.name}
                className="p-6 min-h-44 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] hover:bg-[var(--cyber-green)]/5 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Binary className="w-4 h-4 text-[var(--cyber-green)] shrink-0" />
                      <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                        Cryptography
                      </span>
                    </div>
                    <h3 className="font-mono text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-green)] transition-colors break-words">
                      {challenge.name}
                    </h3>
                  </div>
                  <Flag className="w-5 h-5 text-amber-500/70 shrink-0" />
                </div>

                <div className="pt-5 mt-5 border-t border-[var(--border-default)]">
                  <span
                    className="font-display font-bold"
                    style={{ color: difficultyColor }}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8">
          <Eye className="text-[var(--cyber-green)]" />
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">
            Progress Evidence
          </h2>
        </div>

        <div className="space-y-6">
          <EvidencePanel
            id="picoctf-challenges-evidence"
            title="Challenge List"
            description="Show or hide the completed cryptography challenge overview."
            image="/picoctf/challenges.png"
            alt="CyLab cryptography challenge list showing eight PicoCTF challenges"
          />
          <EvidencePanel
            id="picoctf-profile-evidence"
            title="Profile & Completion Summary"
            description="Show or hide the profile statistics and challenge completion chart."
            image="/picoctf/profile.png"
            alt="CyLab profile for Lareine showing eight completed challenges"
          />
        </div>
      </section>
    </div>
  );
}
