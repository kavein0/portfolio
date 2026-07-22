import EvidencePanel from "@/components/EvidencePanel";
import {
  AtlasPage,
  AtlasHero,
  AtlasRow,
  AtlasSectionHeading,
  AtlasSurface,
  atlasStyles,
} from "@/components/atlas/AtlasPage";
import { Award, BookOpen, Orbit, Zap } from "lucide-react";

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
    <AtlasPage tone="violet">
      <AtlasHero
        visual="cryptohack"
        eyebrow="Applied Cryptography"
        title="CryptoHack Progress"
        description={<p>Completed courses, current level and verified profile progress.</p>}
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
          aria-valuenow={cryptohackStats.experience}
          aria-valuemin={0}
          aria-valuemax={nextLevelTotal}
          className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10"
        >
          <span
            className="block h-full rounded-full bg-[#aa9cff] shadow-[0_0_18px_rgba(170,156,255,0.5)]"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
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
