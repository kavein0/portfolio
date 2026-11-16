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
  htbSherlocks,
  siteConfig,
  type HackTheBoxStats,
} from "@/lib/data";
import { Box, Crosshair, FileSearch, Server, Terminal } from "lucide-react";
import { hackTheBoxAchievementUrl, type HackTheBoxActivity } from "@/lib/api/hackthebox";

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
    meta={event.ownDate.slice(0, 10)} href={hackTheBoxAchievementUrl(event)} icon={<Box aria-hidden="true" />} />);
}

export default function HackTheBoxClient({ stats, activity }: { stats: HackTheBoxStats; activity: HackTheBoxActivity[] | null }) {
  return (
    <AtlasPage>
      <AtlasHero
        eyebrow="Hack The Box"
        title="HackTheBox Profile"
        description={
          <p>Profile totals, live achievement history and a curated archive. {stats.source === "live" ? "Profile data is rechecked after 15 minutes when the page is visited." : "Profile statistics are a snapshot from 28 October 2026; the source is currently unavailable."}</p>
        }
        action={{ label: "View Profile", href: siteConfig.hackthebox.profileUrl }}

        stats={[
          { label: "Rank", value: stats.rank || "…", icon: <Terminal aria-hidden="true" /> },
          { label: "Points", value: stats.points, icon: <Crosshair aria-hidden="true" /> },
          { label: "Machine Owns", value: stats.systemOwns || "…", detail: `${htbMachines.length} documented`, icon: <Server aria-hidden="true" /> },
          { label: "Challenges", value: stats.challenges || "…", detail: `${htbChallenges.length} documented`, icon: <Box aria-hidden="true" /> },
        ]}
      />

      <nav className="rf-training-links" aria-label="Hack The Box archives"><a href="#htb-machines">Machines · {htbMachines.length}</a><a href="#htb-sherlocks">Sherlocks · {htbSherlocks.length}</a><a href="#htb-challenges">Challenges · {htbChallenges.length}</a></nav>

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

      <section id="htb-machines" style={{ scrollMarginTop: 24 }}>
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
            trailing="View achievement"
            href={machine.url}
            icon={<Server aria-hidden="true" />}
          />
        ))}
      </AtlasSurface>
      </section>

      <section id="htb-sherlocks" style={{ scrollMarginTop: 24 }}>
      <AtlasSectionHeading eyebrow="Completed investigations" title="Solved Sherlocks" action={`${htbSherlocks.length} sherlocks`} />
      <AtlasSurface>
        {htbSherlocks.map((sherlock) => <AtlasRow key={sherlock.name} title={sherlock.name} description={`${sherlock.category} · ${sherlock.difficulty}`} meta={sherlock.date} trailing="View achievement" href={sherlock.url} icon={<FileSearch aria-hidden="true" />} />)}
      </AtlasSurface>
      </section>

      <section id="htb-challenges" style={{ scrollMarginTop: 24 }}>
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
      </section>
    </AtlasPage>
  );
}
