"use client";

import EvidencePanel from "@/components/EvidencePanel";
import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";

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

export default function PicoCTFClient() {
  const easyCount = picoChallenges.filter(({ difficulty }) => difficulty === "Easy").length;
  const mediumCount = picoChallenges.length - easyCount;

  return (
    <div className="container-custom min-h-screen page-pad hud-page">
      <header className="hud-page-intro mb-10 md:mb-12">
        <div className="platform-eyebrow mb-5">CyLab Academy</div>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <h1 className="platform-heading">PicoCTF <span>Challenges</span></h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Completed cryptography challenges with profile evidence from CyLab Academy.
            </p>
          </div>
          <a
            href="https://learn.cylabacademy.org/users/Lareine"
            target="_blank"
            rel="noopener noreferrer"
            className="platform-action w-full md:w-auto"
          >
            <ExternalLink className="h-4 w-4" />
            View profile
          </a>
        </div>
      </header>

      <div
        className="liquid-surface stat-rail mb-14 md:mb-16"
        style={{ "--stat-count": 3, "--mobile-stat-count": 3 } as CSSProperties}
      >
        {[
          { label: "Completed", value: picoChallenges.length },
          { label: "Easy", value: easyCount },
          { label: "Medium", value: mediumCount },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">{stat.value}</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{stat.label}</div>
          </div>
        ))}
      </div>

      <section className="mb-14 md:mb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="platform-eyebrow mb-3">Cryptography</div>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Solved challenges</h2>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)]">08 entries</span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {picoChallenges.map((challenge, index) => (
            <article key={challenge.name} className="liquid-row flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
              <div className="flex min-w-0 items-center gap-4">
                <span className="font-mono text-xs text-[var(--text-muted)]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="break-words font-mono text-sm font-semibold text-[var(--text-primary)] sm:text-base">{challenge.name}</h3>
              </div>
              <span className="shrink-0 rounded-md border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]">
                {challenge.difficulty}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="platform-eyebrow mb-3">Verification</div>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Progress evidence</h2>
        <div className="space-y-3">
          <EvidencePanel
            title="Challenge list"
            description="Completed cryptography challenge overview."
            image="/picoctf/challenges.png"
            alt="CyLab cryptography challenge list showing eight PicoCTF challenges"
            width={1720}
            height={914}
          />
          <EvidencePanel
            title="Profile and completion summary"
            description="Profile statistics and challenge completion chart."
            image="/picoctf/profile.png"
            alt="CyLab profile for Lareine showing eight completed challenges"
            width={1720}
            height={914}
          />
        </div>
      </section>
    </div>
  );
}
