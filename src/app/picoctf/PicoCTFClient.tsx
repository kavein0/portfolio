"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState, type CSSProperties } from "react";

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

const picoPalette = {
  "--pico-blue": "#5aa9d6",
  "--pico-orange": "#ff7426",
  "--pico-orange-soft": "rgba(255, 116, 38, 0.1)",
  "--pico-orange-border": "rgba(255, 116, 38, 0.28)",
  "--pico-green": "#22c55e",
  "--pico-yellow": "#f5b942",
} as CSSProperties;

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
        className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-[var(--pico-orange-soft)] transition-colors group"
      >
        <span>
          <span className="block font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--pico-orange)] transition-colors">
            {isOpen ? "Hide Screenshot" : "Show Screenshot"}
          </span>
          <span className="block mt-1 text-sm text-[var(--text-muted)]">
            {title} · {description}
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[var(--pico-orange)] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--pico-orange)] shrink-0 transition-colors" />
        )}
      </button>

      {isOpen ? (
        <div id={id}>
          <div className="px-4 pb-4">
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
    <div className="container-custom min-h-screen page-pad" style={picoPalette}>
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 md:mb-2 glitch-wrapper glitch-cylab">
              <span className="glitch-text" data-text="PicoCTF">
                PicoCTF
              </span>{" "}
              <span className="text-[var(--pico-orange)]">Challenges</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-mono text-lg">
              Completed CyLab/PicoCTF cryptography challenges and profile proof.
            </p>
          </div>

          <a
            href="https://learn.cylabacademy.org/users/Lareine"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--pico-orange-soft)] text-[var(--pico-orange)] border border-[var(--pico-orange-border)] hover:bg-[var(--pico-orange)] hover:text-black hover:border-[var(--pico-orange)] transition-all font-mono text-sm font-bold whitespace-nowrap group w-full md:w-auto"
          >
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            View Profile
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
        {[
          { label: "Completed", value: picoChallenges.length },
          { label: "Easy", value: easyCount },
          { label: "Medium", value: mediumCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-5 md:p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--pico-orange)] transition-all"
          >
            <div className="text-3xl font-display font-bold text-[var(--text-primary)]">
              {stat.value}
            </div>
            <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
          Solved Cryptography Challenges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {picoChallenges.map((challenge) => {
            const isEasy = challenge.difficulty === "Easy";
            const difficultyColor = isEasy
              ? "var(--pico-green)"
              : "var(--pico-yellow)";

            return (
              <article
                key={challenge.name}
                className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--pico-orange)] hover:bg-[var(--pico-orange-soft)] transition-all group"
              >
                <h3 className="font-mono text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--pico-blue)] transition-colors break-words">
                  {challenge.name}
                </h3>
                <div className="mt-3">
                  <span
                    className="text-xs font-mono px-2 py-1 rounded bg-[var(--bg-tertiary)]"
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
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
          Progress Evidence
        </h2>

        <div className="space-y-4">
          <EvidencePanel
            id="picoctf-challenges-evidence"
            title="Challenge List"
            description="Completed cryptography challenge overview."
            image="/picoctf/challenges.png"
            alt="CyLab cryptography challenge list showing eight PicoCTF challenges"
          />
          <EvidencePanel
            id="picoctf-profile-evidence"
            title="Profile & Completion Summary"
            description="Profile statistics and challenge completion chart."
            image="/picoctf/profile.png"
            alt="CyLab profile for Lareine showing eight completed challenges"
          />
        </div>
      </section>
    </div>
  );
}
