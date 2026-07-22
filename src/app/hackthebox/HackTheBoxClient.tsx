import {
  AtlasHero,
  AtlasPage,
  AtlasRow,
  AtlasSectionHeading,
  AtlasSurface,
} from "@/components/atlas/AtlasPage";
import {
  htbChallenges,
  htbMachines,
  siteConfig,
  type HackTheBoxStats,
} from "@/lib/data";
import { Box, Crosshair, Server, Terminal } from "lucide-react";

const semesterForMachine = (name: string, date: string) =>
  date === "2026" || name === "MonitorsFour" ? "Semester 6" : "Semester 5";

const semesterForChallenge = (name: string) =>
  ["CubeMadness2", "Broken Shell", "Not Posixtive", "Lucky Dice", "Micro Storage", "r0bob1rd"].includes(name)
    ? "Semester 6"
    : "Semester 5";

export default function HackTheBoxClient({ stats }: { stats: HackTheBoxStats }) {
  return (
    <AtlasPage tone="green">
      <AtlasHero
        visual="hackthebox"
        eyebrow="Hack The Box"
        title="HackTheBox Profile"
        description={
          <p>Compromised machines, solved challenges, and overall ownership statistics.</p>
        }
        action={{ label: "View Profile", href: siteConfig.hackthebox.profileUrl }}
        constellationCaption="Hack The Box machine owns and challenge write-ups."
        stats={[
          { label: "Rank", value: stats.rank || "…", icon: <Terminal aria-hidden="true" /> },
          { label: "Points", value: stats.points || "…", icon: <Crosshair aria-hidden="true" /> },
          { label: "Machine Owns", value: stats.systemOwns || "…", detail: `${htbMachines.length} documented`, icon: <Server aria-hidden="true" /> },
          { label: "Challenges", value: stats.challenges || "…", detail: `${htbChallenges.length} documented`, icon: <Box aria-hidden="true" /> },
        ]}
      />

      <AtlasSectionHeading
        eyebrow="Machines"
        title="Owned Machines"
        action={`${htbMachines.length} machines`}
      />
      <AtlasSurface>
        {htbMachines.map((machine) => (
          <AtlasRow
            key={machine.name}
            title={machine.name}
            description={`${machine.os ?? "Unknown OS"} · ${machine.difficulty ?? "Unrated"}`}
            meta={machine.date ?? "Archive"}
            trailing={semesterForMachine(machine.name, machine.date ?? "")}
            href={machine.url}
            icon={<Server aria-hidden="true" />}
          />
        ))}
      </AtlasSurface>

      <AtlasSectionHeading
        eyebrow="Challenges"
        title="Solved Challenges"
        action={`${htbChallenges.length} challenges`}
      />
      <AtlasSurface>
        {htbChallenges.map((challenge) => (
          <AtlasRow
            key={challenge.name}
            title={challenge.name}
            description={`${challenge.category ?? "Challenge"} · ${challenge.difficulty ?? "Unrated"}`}
            meta={challenge.category ?? "Challenge"}
            trailing={semesterForChallenge(challenge.name)}
            href={challenge.url}
            icon={<Box aria-hidden="true" />}
          />
        ))}
      </AtlasSurface>
    </AtlasPage>
  );
}
