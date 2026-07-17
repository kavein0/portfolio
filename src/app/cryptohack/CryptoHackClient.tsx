"use client";

import EvidencePanel from "@/components/EvidencePanel";
import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";

const cryptohackStats = {
  level: 10,
  experience: 2180,
  pointsToNextLevel: 380,
  rank: "#4262",
  joined: "12 Jun 2026",
  profileUrl: "https://cryptohack.org/user/Larein/",
} as const;

const cryptohackCourses = [
  { title: "Introduction to CryptoHack", lessons: 10, tags: ["#beginner"] },
  { title: "Modular Arithmetic", lessons: 11, tags: ["#beginner", "#mathematics"] },
  { title: "Symmetric Cryptography", lessons: 14, tags: ["#intermediate", "#AES"] },
  { title: "Public-Key Cryptography", lessons: 18, tags: ["#intermediate", "#RSA", "#Diffie-Hellman"] },
  { title: "Elliptic Curves", lessons: 11, tags: ["#hard"] },
] as const;

const totalLessons = cryptohackCourses.reduce((sum, course) => sum + course.lessons, 0);
const nextLevelTotal = cryptohackStats.experience + cryptohackStats.pointsToNextLevel;
const levelProgress = (cryptohackStats.experience / nextLevelTotal) * 100;

export default function CryptoHackClient() {
  return (
    <div className="container-custom min-h-screen page-pad">
      <header className="mb-10 md:mb-12">
        <div className="platform-eyebrow mb-5">Applied cryptography</div>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <h1 className="platform-heading">CryptoHack <span>Progress</span></h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              Completed courses, current level and verified profile progress.
            </p>
          </div>
          <a href={cryptohackStats.profileUrl} target="_blank" rel="noopener noreferrer" className="platform-action w-full md:w-auto">
            <ExternalLink className="h-4 w-4" />
            View profile
          </a>
        </div>
      </header>

      <div
        className="liquid-surface stat-rail stat-rail-mobile-2 mb-6"
        style={{ "--stat-count": 4, "--mobile-stat-count": 2 } as CSSProperties}
      >
        {[
          { label: "Level", value: cryptohackStats.level },
          { label: "Experience", value: cryptohackStats.experience },
          { label: "Courses", value: cryptohackCourses.length },
          { label: "Lessons", value: totalLessons },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">{stat.value}</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="liquid-surface mb-14 p-4 md:mb-16 md:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
          <span>Joined {cryptohackStats.joined} · Rank {cryptohackStats.rank}</span>
          <span>{cryptohackStats.pointsToNextLevel} points to next level</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
          <div className="h-full rounded-full bg-[#809dad]" style={{ width: `${levelProgress}%` }} />
        </div>
      </div>

      <section className="mb-14 md:mb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="platform-eyebrow mb-3">Coursework</div>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Completed courses</h2>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)]">05 courses</span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {cryptohackCourses.map((course, index) => (
            <article key={course.title} className="liquid-row px-4 py-4 sm:px-5">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 font-mono text-xs text-[var(--text-muted)]">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">{course.title}</h3>
                    <span className="shrink-0 font-mono text-xs text-[var(--text-secondary)]">{course.lessons} lessons</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span key={tag} className="rounded-md border border-[var(--border-default)] bg-[var(--bg-tertiary)] px-2 py-1 font-mono text-xs text-[var(--text-muted)]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="platform-eyebrow mb-3">Verification</div>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">Progress evidence</h2>
        <div className="space-y-3">
          <EvidencePanel
            title="Profile, level and trophy case"
            description="Level, XP, rank and trophy overview."
            image="/cryptohack/profile.png"
            alt="CryptoHack profile showing Larein at level 10 with 2180 points"
            width={1478}
            height={670}
          />
          <EvidencePanel
            title="Completed course list"
            description="Five course cards marked complete."
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
