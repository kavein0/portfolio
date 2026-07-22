import {
  AtlasPage,
  AtlasHero,
  AtlasRow,
  AtlasSectionHeading,
  AtlasSurface,
} from "@/components/atlas/AtlasPage";
import SkillsSection from "@/components/sections/SkillsSection";
import {
  type HackTheBoxStats,
  type TryHackMeStats,
  certifications,
  htbAcademyBadges,
  htbAcademyModules,
  siteConfig,
} from "@/lib/data";
import { Award, Box, GraduationCap, Shield } from "lucide-react";

export default function StatsClient({
  thmStats,
  htbStats,
}: {
  thmStats: TryHackMeStats;
  htbStats: HackTheBoxStats;
}) {
  return (
    <AtlasPage tone="cyan">
      <AtlasHero
        visual="stats"
        eyebrow="Platform Overview"
        title="Cyber Stats"
        description={<p>Overview of my performance on major cybersecurity platforms and technical skill distribution.</p>}
        stats={[
          { label: "TryHackMe rooms", value: thmStats.roomsCompleted, detail: `Rank ${thmStats.rank}`, icon: <Shield /> },
          { label: "HTB machine owns", value: htbStats.systemOwns, detail: `Rank ${htbStats.rank}`, icon: <Box /> },
          { label: "Academy modules", value: htbAcademyModules.length, detail: `${htbAcademyBadges.length} badges`, icon: <GraduationCap /> },
          { label: "Cisco certificates", value: certifications.length, detail: "official certifications", icon: <Award /> },
        ]}
        constellationCaption="Summary of progress across cybersecurity learning platforms."
      />

      <AtlasSectionHeading
        eyebrow="Platforms"
        title="Learning Platforms"
        action={<span>4 active platforms</span>}
      />
      <AtlasSurface>
        <AtlasRow
          title="TryHackMe"
          description={`@${siteConfig.tryhackme.username} · ${thmStats.roomsCompleted} completed rooms`}
          meta={`Rank ${thmStats.rank}`}
          href={siteConfig.tryhackme.profileUrl}
          icon={<Shield />}
          trailing="THM"
        />
        <AtlasRow
          title="HackTheBox"
          description={`@${siteConfig.hackthebox.username} · ${htbStats.systemOwns} machine owns`}
          meta={`Rank ${htbStats.rank}`}
          href={siteConfig.hackthebox.profileUrl}
          icon={<Box />}
          trailing="HTB"
        />
        <AtlasRow
          title="HTB Academy"
          description={`${htbAcademyModules.length} completed modules · ${htbAcademyBadges.length} badges`}
          meta="Continuous learning"
          href="/htb-academy"
          icon={<GraduationCap />}
          trailing="ACADEMY"
        />
        <AtlasRow
          title="Cisco Academy"
          description={`${certifications.length} official certifications`}
          meta="Credential archive"
          href="/cisco"
          icon={<Award />}
          trailing="CISCO"
        />
      </AtlasSurface>

      <div style={{ marginTop: "clamp(44px, 7vw, 92px)" }}>
        <SkillsSection />
      </div>
    </AtlasPage>
  );
}
