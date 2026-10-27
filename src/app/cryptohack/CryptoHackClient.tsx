import EvidencePanel from "@/components/EvidencePanel";
import {
  AtlasPage,
  AtlasHero,
  AtlasDetails,
  AtlasRow,
  AtlasSectionHeading,
  AtlasSurface,
  atlasStyles,
} from "@/components/atlas/AtlasPage";
import { Award, BookOpen, Orbit, Zap } from "lucide-react";
import type { CryptoHackChallenge, CryptoHackStats } from "@/lib/api/cryptohack";

const cryptohackCourses = [
  { title: "Introduction to CryptoHack", lessons: 10, tags: ["#beginner"] },
  { title: "Modular Arithmetic", lessons: 11, tags: ["#beginner", "#mathematics"] },
  { title: "Symmetric Cryptography", lessons: 14, tags: ["#intermediate", "#AES"] },
  { title: "Public-Key Cryptography", lessons: 18, tags: ["#intermediate", "#RSA", "#Diffie-Hellman"] },
  { title: "Elliptic Curves", lessons: 11, tags: ["#hard"] },
] as const;

const totalLessons = cryptohackCourses.reduce((sum, course) => sum + course.lessons, 0);
function ChallengeRows({ challenges, profileUrl }: { challenges: CryptoHackChallenge[]; profileUrl: string }) {
  return challenges.map((challenge, index) => <AtlasRow
    key={`${challenge.name}-${challenge.solvedAt}-${index}`} title={challenge.name}
    description={challenge.category} meta={challenge.solvedAt.slice(0, 10)}
    trailing={`${challenge.points} points`} href={profileUrl} />);
}

export default function CryptoHackClient({ stats: cryptohackStats }: { stats: CryptoHackStats }) {
  const challenges = cryptohackStats.challenges;
  return (
    <AtlasPage tone="violet">
      <AtlasHero
        visual="cryptohack"
        eyebrow="Applied Cryptography"
        title="CryptoHack Progress"
        description={<p>Completed courses and profile progress. {cryptohackStats.source === "live" ? "Profile statistics are rechecked after 15 minutes when the page is visited." : "Profile statistics are a snapshot from 28 October 2026; the source is currently unavailable."}</p>}
        action={{ label: "View profile", href: cryptohackStats.profileUrl }}
        stats={[
          { label: "Level", value: cryptohackStats.level, detail: `rank ${cryptohackStats.rank}`, icon: <Orbit /> },
          { label: "Experience", value: cryptohackStats.experience, detail: `${cryptohackStats.pointsToNextLevel} to next level`, icon: <Zap /> },
          { label: "Courses", value: cryptohackCourses.length, detail: "completed", icon: <Award /> },
          { label: "Lessons", value: totalLessons, detail: "across five courses", icon: <BookOpen /> },
        ]}
        constellationCaption="CryptoHack course completions and cryptography challenges."
      />

      <AtlasSectionHeading
        eyebrow="Level Status"
        title="Level progress"
        action={<span>{cryptohackStats.pointsToNextLevel} points remaining</span>}
      />
      <AtlasSurface>
        <div className={atlasStyles.rowCopy}>
          <strong>Level {cryptohackStats.level} · {cryptohackStats.experience} XP</strong>
          <small>Joined {cryptohackStats.joined} · Rank {cryptohackStats.rank}</small>
        </div>
        <div
          role="progressbar"
          aria-label="CryptoHack level progress"
          aria-valuenow={Math.round(cryptohackStats.levelProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"
        >
          <span
            className="block h-full rounded-full bg-[#aa9cff] shadow-[0_0_18px_rgba(170,156,255,0.5)]"
            style={{ width: `${cryptohackStats.levelProgress}%` }}
          />
        </div>
      </AtlasSurface>

      <AtlasSectionHeading eyebrow="Public profile activity" title="Solved challenges"
        action={challenges === null ? "Currently unavailable" : `${challenges.length} challenges`} />
      <AtlasSurface>
        {challenges === null ? <p>The challenge list is temporarily unavailable. View the public profile for the latest progress.</p> :
          challenges.length === 0 ? <p>No solved challenges are listed on this profile.</p> : <>
            <ChallengeRows challenges={challenges.slice(0, 10)} profileUrl={cryptohackStats.profileUrl} />
            {challenges.length > 10 ? <AtlasDetails label="Reveal earlier challenges" count={challenges.length - 10}>
              <ChallengeRows challenges={challenges.slice(10)} profileUrl={cryptohackStats.profileUrl} />
            </AtlasDetails> : null}
          </>}
      </AtlasSurface>

      <AtlasSectionHeading
        eyebrow="Coursework / completed archive"
        title="Completed courses"
        action={<span>05 courses · {totalLessons} lessons</span>}
      />
      <AtlasSurface>
        {cryptohackCourses.map((course, index) => (
          <AtlasRow
            key={course.title}
            title={course.title}
            description={course.tags.join(" · ")}
            meta={`${course.lessons} lessons`}
            trailing={String(index + 1).padStart(2, "0")}
          />
        ))}
      </AtlasSurface>

      <AtlasSectionHeading
        eyebrow="Verification / source material"
        title="Progress evidence"
        action={<span>02 captures</span>}
      />
      <AtlasSurface>
        <div className={atlasStyles.detailsContent} style={{ display: "grid", gap: 12, paddingTop: 0 }}>
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
      </AtlasSurface>
    </AtlasPage>
  );
}
