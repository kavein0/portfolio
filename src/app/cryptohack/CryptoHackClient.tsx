"use client";

import Image from "next/image";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";

const cryptohackStats = {
  username: "Larein",
  level: 10,
  experience: 2180,
  pointsToNextLevel: 380,
  rank: "#4262",
  joined: "12 Jun 2026",
  profileUrl: "https://cryptohack.org/user/Larein/",
} as const;

const cryptohackCourses = [
  {
    title: "Introduction to CryptoHack",
    lessons: 10,
    tags: ["#beginner"],
  },
  {
    title: "Modular Arithmetic",
    lessons: 11,
    tags: ["#beginner", "#Mathematics"],
  },
  {
    title: "Symmetric Cryptography",
    lessons: 14,
    tags: ["#intermediate", "#AES"],
  },
  {
    title: "Public-Key Cryptography",
    lessons: 18,
    tags: ["#intermediate", "#RSA", "#Diffie-Hellman"],
  },
  {
    title: "Elliptic Curves",
    lessons: 11,
    tags: ["#hard"],
  },
] as const;

const totalLessons = cryptohackCourses.reduce(
  (sum, course) => sum + course.lessons,
  0,
);

const nextLevelTotal =
  cryptohackStats.experience + cryptohackStats.pointsToNextLevel;
const levelProgress =
  (cryptohackStats.experience / nextLevelTotal) * 100;

function EvidencePanel({
  id,
  title,
  description,
  image,
  alt,
  width,
  height,
}: {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-secondary)] overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={id}
        className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-[var(--cyber-orange)]/5 transition-colors group"
      >
        <span>
          <span className="block font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-orange)] transition-colors">
            {isOpen ? "Hide Screenshot" : "Show Screenshot"}
          </span>
          <span className="block mt-1 text-sm text-[var(--text-muted)]">
            {title} - {description}
          </span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[var(--cyber-orange)] shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--cyber-orange)] shrink-0 transition-colors" />
        )}
      </button>

      {isOpen ? (
        <div id={id}>
          <div className="px-4 pb-4">
            <div className="rounded-lg overflow-hidden border border-[var(--border-default)] bg-[#080d19]">
              <Image
                src={image}
                alt={alt}
                width={width}
                height={height}
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

export default function CryptoHackClient() {
  return (
    <div className="container-custom min-h-screen page-pad">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 md:mb-2 glitch-wrapper glitch-orange">
              <span className="glitch-text" data-text="CryptoHack">
                CryptoHack
              </span>{" "}
              <span className="text-[var(--cyber-orange)]">Progress</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-mono text-lg">
              Completed CryptoHack courses and profile progress.
            </p>
          </div>

          <a
            href={cryptohackStats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--cyber-orange)]/10 text-[var(--cyber-orange)] border border-[var(--cyber-orange)]/20 hover:bg-[var(--cyber-orange)]/20 hover:border-[var(--cyber-orange)]/50 transition-all font-mono text-sm whitespace-nowrap group w-full md:w-auto"
          >
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            View Profile
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { label: "Level", value: cryptohackStats.level },
          { label: "Experience", value: cryptohackStats.experience },
          { label: "Courses", value: cryptohackCourses.length },
          { label: "Lessons", value: totalLessons },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-5 md:p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-orange)] transition-all"
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

      <div className="mb-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 font-mono text-xs text-[var(--text-muted)]">
          <span>
            Joined {cryptohackStats.joined} - Rank {cryptohackStats.rank}
          </span>
          <span>{cryptohackStats.pointsToNextLevel} points to next level</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--cyber-orange)] to-[var(--cyber-yellow)]"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
          Completed Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {cryptohackCourses.map((course) => (
            <article
              key={course.title}
              className="p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-orange)] hover:bg-[var(--cyber-orange)]/5 transition-all group"
            >
              <h3 className="font-mono text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-orange)] transition-colors">
                {course.title}
              </h3>

              <div className="flex flex-wrap gap-2 mt-3">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)] font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border-default)] flex items-center justify-between gap-4">
                <span className="font-mono text-sm text-[var(--text-secondary)]">
                  {course.lessons} lessons
                </span>
                <span className="font-mono text-xs text-[var(--cyber-orange)]">
                  Done
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6">
          Progress Evidence
        </h2>

        <div className="space-y-4">
          <EvidencePanel
            id="cryptohack-profile-evidence"
            title="Profile, Level & Trophy Case"
            description="CryptoHack profile screenshot with level, XP, rank, and trophies."
            image="/cryptohack/profile.png"
            alt="CryptoHack profile showing Larein at level 10 with 2180 points"
            width={1478}
            height={670}
          />
          <EvidencePanel
            id="cryptohack-courses-evidence"
            title="Completed Course List"
            description="CryptoHack course cards marked as complete."
            image="/cryptohack/courses.png"
            alt="CryptoHack completed courses list showing five completed courses"
            width={1467}
            height={559}
          />
        </div>
      </section>
    </div>
  );
}
