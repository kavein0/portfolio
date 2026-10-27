import {
  AtlasHero,
  AtlasDetails,
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
import type { HackTheBoxActivity } from "@/lib/api/hackthebox";

const semesterForMachine = (name: string, date: string) =>
  date === "2026" || name === "MonitorsFour" ? "Semester 6" : "Semester 5";

const semesterForChallenge = (name: string) =>
  ["CubeMadness2", "Broken Shell", "Not Posixtive", "Lucky Dice", "Micro Storage", "r0bob1rd"].includes(name)
    ? "Semester 6"
    : "Semester 5";

const activityLabel: Record<string, string> = {
  user: "Machine · user flag", root: "Machine · root flag", challenge: "Challenge", sherlock: "Sherlock",
};

function ActivityRows({ events }: { events: HackTheBoxActivity[] }) {
  return events.map((event) => <AtlasRow key={`${event.type}-${event.id}-${event.ownDate}`}
    title={event.name} description={[activityLabel[event.type] ?? `Activity · ${event.type}`, event.categoryName].filter(Boolean).join(" · ")}
    meta={event.ownDate.slice(0, 10)} href={siteConfig.hackthebox.profileUrl} icon={<Box aria-hidden="true" />} />);
}

export default function HackTheBoxClient({ stats, activity }: { stats: HackTheBoxStats; activity: HackTheBoxActivity[] | null }) {
  return (
    <AtlasPage tone="green">
      <AtlasHero
        visual="hackthebox"
        eyebrow="Hack The Box"
        title="HackTheBox Profile"
        description={
          <p>Profile totals, live achievement history and a curated archive. {stats.source === "live" ? "Profile data is rechecked after 15 minutes when the page is visited." : "Profile statistics are a snapshot from 28 October 2026; the source is currently unavailable."}</p>
        }
        action={{ label: "View Profile", href: siteConfig.hackthebox.profileUrl }}
        constellationCaption="Hack The Box machine owns and challenge write-ups."
        stats={[
          { label: "Rank", value: stats.rank || "…", icon: <Terminal aria-hidden="true" /> },
          { label: "Points", value: stats.points, icon: <Crosshair aria-hidden="true" /> },
          { label: "Machine Owns", value: stats.systemOwns || "…", detail: `${htbMachines.length} documented`, icon: <Server aria-hidden="true" /> },
          { label: "Challenges", value: stats.challenges || "…", detail: `${htbChallenges.length} documented`, icon: <Box aria-hidden="true" /> },
        ]}
      />

      <AtlasSectionHeading eyebrow="Public profile activity" title="Achievement history"
        action={activity === null ? "Currently unavailable" : `${activity.length} events`} />
      <AtlasSurface>
        {activity === null ? <p>Live achievement history is temporarily unavailable. The documented archive remains below.</p> :
          activity.length === 0 ? <p>No public activity is available on this profile.</p> : <>
            <ActivityRows events={activity.slice(0, 10)} />
            {activity.length > 10 ? <AtlasDetails label="Reveal earlier activity" count={activity.length - 10}>
              <ActivityRows events={activity.slice(10)} />
            </AtlasDetails> : null}
          </>}
      </AtlasSurface>

      <AtlasSectionHeading
        eyebrow="Documented archive · machines"
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
        eyebrow="Documented archive · challenges"
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
