"use client";

import Image from "next/image";
import {
  Award,
  BookOpenCheck,
  Brain,
  ChevronDown,
  ChevronUp,
  Eye,
  ExternalLink,
  KeyRound,
  LockKeyhole,
  Medal,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  Zap,
} from "lucide-react";
import { useState } from "react";

const cryptohackStats = {
  username: "Larein",
  level: 10,
  experience: 2180,
  pointsToNextLevel: 380,
  rank: "#4262",
  joined: "12 Jun 2026",
  trophiesEarned: 7,
  profileUrl: "https://cryptohack.org/user/Larein/",
} as const;

const cryptohackCourses = [
  {
    title: "Introduction to CryptoHack",
    lessons: 10,
    tags: ["#beginner"],
    icon: Brain,
  },
  {
    title: "Modular Arithmetic",
    lessons: 11,
    tags: ["#beginner", "#Mathematics"],
    icon: Sparkles,
  },
  {
    title: "Symmetric Cryptography",
    lessons: 14,
    tags: ["#intermediate", "#AES"],
    icon: LockKeyhole,
  },
  {
    title: "Public-Key Cryptography",
    lessons: 18,
    tags: ["#intermediate", "#RSA", "#Diffie-Hellman"],
    icon: KeyRound,
  },
  {
    title: "Elliptic Curves",
    lessons: 11,
    tags: ["#hard"],
    icon: ShieldCheck,
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
        className="w-full p-5 md:p-6 flex items-center justify-between gap-4 text-left hover:bg-[var(--cyber-orange)]/5 transition-colors group"
      >
        <span className="flex items-center gap-4">
          <span className="w-11 h-11 rounded-lg bg-[var(--cyber-orange)]/10 border border-[var(--cyber-orange)]/25 flex items-center justify-center shrink-0">
            <Eye className="w-5 h-5 text-[var(--cyber-orange)]" />
          </span>
          <span>
            <span className="block font-display font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-orange)] transition-colors">
              {title}
            </span>
            <span className="block mt-1 text-sm text-[var(--text-muted)]">
              {description}
            </span>
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
          <div className="px-4 pb-4 md:px-6 md:pb-6">
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
      <div className="mb-16 md:mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-[var(--cyber-orange)]" />
              <span className="font-mono text-xs text-[var(--cyber-orange)] uppercase tracking-[0.2em]">
                Cryptography Practice
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 glitch-wrapper">
              <span className="glitch-text" data-text="CryptoHack">
                CryptoHack
              </span>{" "}
              <span className="text-[var(--cyber-orange)]">Progress</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-mono text-base md:text-lg max-w-3xl">
              Completed CryptoHack learning courses focused on modular
              arithmetic, symmetric cryptography, public-key cryptography, and
              elliptic curves.
            </p>
          </div>

          <a
            href={cryptohackStats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full lg:w-auto min-w-0 lg:min-w-[360px] p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-orange)] hover:bg-[var(--cyber-orange)]/5 transition-all group"
          >
            <div className="flex items-center justify-between gap-4 mb-5">
              <div>
                <div className="font-display font-bold text-2xl text-[var(--text-primary)]">
                  {cryptohackStats.username}
                </div>
                <div className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                  Joined {cryptohackStats.joined} · Rank{" "}
                  {cryptohackStats.rank}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[var(--cyber-orange)]/10 border border-[var(--cyber-orange)]/25 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-[var(--cyber-orange)] group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono text-sm">
              <span className="inline-flex items-center gap-2 text-[var(--text-primary)]">
                <Zap className="w-4 h-4 text-[var(--cyber-orange)] fill-[var(--cyber-orange)]" />
                Level{" "}
                <span className="text-[var(--cyber-orange)] font-bold">
                  {cryptohackStats.level}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 text-[var(--text-primary)]">
                <Star className="w-4 h-4 text-[var(--cyber-orange)] fill-[var(--cyber-orange)]" />
                {cryptohackStats.experience} XP
              </span>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-4 mb-2 font-mono text-xs text-[var(--text-muted)]">
                <span>{cryptohackStats.experience} points</span>
                <span>{cryptohackStats.pointsToNextLevel} to next level</span>
              </div>
              <div className="h-2 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--cyber-orange)] to-[var(--cyber-yellow)]"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-20 md:mb-24">
        {[
          {
            label: "Level",
            value: cryptohackStats.level,
            icon: Zap,
            color: "var(--cyber-orange)",
          },
          {
            label: "Experience",
            value: cryptohackStats.experience,
            icon: Star,
            color: "var(--cyber-yellow)",
          },
          {
            label: "Courses",
            value: cryptohackCourses.length,
            icon: BookOpenCheck,
            color: "var(--cyber-blue)",
          },
          {
            label: "Lessons",
            value: totalLessons,
            icon: Trophy,
            color: "var(--cyber-green)",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-7 md:p-8 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-orange)] transition-all group flex flex-col items-center text-center"
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
          <BookOpenCheck className="text-[var(--cyber-orange)]" />
          Completed Courses
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {cryptohackCourses.map((course) => (
            <article
              key={course.title}
              className="relative p-6 min-h-64 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-orange)] hover:bg-[var(--cyber-orange)]/5 transition-all group overflow-hidden"
            >
              <div className="absolute -right-10 top-6 rotate-45 bg-[var(--cyber-orange)] text-black font-mono text-xs font-bold px-10 py-1 shadow-lg">
                Complete
              </div>

              <div className="w-12 h-12 rounded-xl bg-[var(--cyber-orange)]/10 border border-[var(--cyber-orange)]/25 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <course.icon className="w-6 h-6 text-[var(--cyber-orange)]" />
              </div>

              <h3 className="font-display text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-orange)] transition-colors uppercase tracking-wide pr-10">
                {course.title}
              </h3>

              <div className="flex flex-wrap gap-2 mt-5">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded bg-[var(--cyber-orange)]/15 border border-[var(--cyber-orange)]/25 text-[var(--cyber-orange)] font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-[var(--border-default)] flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 font-mono text-sm text-[var(--text-primary)]">
                  <Brain className="w-4 h-4 text-[var(--cyber-orange)]" />
                  {course.lessons} Lessons
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-xs text-[var(--cyber-green)]">
                  <Medal className="w-4 h-4" />
                  Done
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-20 md:mb-24">
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-8 flex items-center gap-3">
          <Award className="text-[var(--cyber-orange)]" />
          Trophy Case
        </h2>

        <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6 md:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: cryptohackStats.trophiesEarned }).map(
              (_, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)] p-5 flex flex-col items-center justify-center text-center"
                >
                  <Trophy
                    className={`w-9 h-9 mb-3 ${
                      index % 3 === 0
                        ? "text-slate-300"
                        : "text-[var(--cyber-orange)]"
                    }`}
                  />
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    Trophy #{index + 1}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-8">
          <Eye className="text-[var(--cyber-orange)]" />
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">
            Progress Evidence
          </h2>
        </div>

        <div className="space-y-6">
          <EvidencePanel
            id="cryptohack-profile-evidence"
            title="Profile, Level & Trophy Case"
            description="Show or hide the CryptoHack profile screenshot with level, XP, rank, and trophies."
            image="/cryptohack/profile.png"
            alt="CryptoHack profile showing Larein at level 10 with 2180 points"
            width={1478}
            height={670}
          />
          <EvidencePanel
            id="cryptohack-courses-evidence"
            title="Completed Course List"
            description="Show or hide the CryptoHack course cards marked as complete."
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
