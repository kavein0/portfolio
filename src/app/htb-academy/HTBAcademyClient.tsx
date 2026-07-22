import {
  AtlasDetails,
  AtlasHero,
  AtlasPage,
  AtlasRow,
  AtlasSectionHeading,
  AtlasSurface,
} from "@/components/atlas/AtlasPage";
import { htbAcademyBadges, htbAcademyModules, siteConfig } from "@/lib/data";
import { Award, BookOpen, Shield, Terminal } from "lucide-react";

const foundationNames = [
  "Linux Fundamentals",
  "Windows Fundamentals",
  "MacOS Fundamentals",
  "Setting Up",
];

function ModuleRows({ start = 0 }: { start?: number }) {
  return htbAcademyModules.slice(start).map((module) => (
    <AtlasRow
      key={module.name}
      title={module.name}
      description="Hack The Box Academy module"
      meta={module.status}
      trailing={foundationNames.includes(module.name) ? "Semester 5" : "Semester 6"}
      href={module.url}
      icon={<Terminal aria-hidden="true" />}
    />
  ));
}

function BadgeRows({ start = 0 }: { start?: number }) {
  return htbAcademyBadges.slice(start).map((badge) => (
    <AtlasRow
      key={badge.name}
      title={badge.name}
      description={badge.description}
      meta="Badge"
      trailing={foundationNames.some((moduleName) => badge.description.includes(moduleName)) ? "Semester 5" : "Semester 6"}
      href={badge.url}
      icon={<Award aria-hidden="true" />}
    />
  ));
}

export default function HTBAcademyClient() {
  const remainingModules = Math.max(0, htbAcademyModules.length - 10);
  const remainingBadges = Math.max(0, htbAcademyBadges.length - 10);

  return (
    <AtlasPage tone="green">
      <AtlasHero
        visual="academy"
        eyebrow="Learning archive · HTB Academy"
        title="HTB Academy"
        description={
          <p>Completed learning modules and achievement badges from HackTheBox Academy.</p>
        }
        action={{ label: "View Profile", href: siteConfig.hackthebox.profileUrl }}
        constellationCaption="Foundations become a durable map through repetition, practice, and documented progress."
        stats={[
          { label: "Modules Completed", value: htbAcademyModules.length, icon: <BookOpen aria-hidden="true" /> },
          { label: "Badges Earned", value: htbAcademyBadges.length, icon: <Award aria-hidden="true" /> },
          { label: "Foundation Modules", value: foundationNames.length, detail: "Semester 5", icon: <Shield aria-hidden="true" /> },
          { label: "Advanced Modules", value: htbAcademyModules.length - foundationNames.length, detail: "Semester 6", icon: <Terminal aria-hidden="true" /> },
        ]}
      />

      <AtlasSectionHeading
        eyebrow="Observation log 01"
        title="Completed Modules"
        action={`${htbAcademyModules.length} modules`}
      />
      <AtlasSurface>
        {htbAcademyModules.slice(0, 10).map((module) => (
          <AtlasRow
            key={module.name}
            title={module.name}
            description="Hack The Box Academy module"
            meta={module.status}
            trailing={foundationNames.includes(module.name) ? "Semester 5" : "Semester 6"}
            href={module.url}
            icon={<Terminal aria-hidden="true" />}
          />
        ))}
        {remainingModules ? (
          <AtlasDetails label="Reveal remaining modules" count={remainingModules}>
            <ModuleRows start={10} />
          </AtlasDetails>
        ) : null}
      </AtlasSurface>

      <AtlasSectionHeading
        eyebrow="Observation log 02"
        title="Completion Badges"
        action={`${htbAcademyBadges.length} badges`}
      />
      <AtlasSurface>
        {htbAcademyBadges.slice(0, 10).map((badge) => (
          <AtlasRow
            key={badge.name}
            title={badge.name}
            description={badge.description}
            meta="Badge"
            trailing={foundationNames.some((moduleName) => badge.description.includes(moduleName)) ? "Semester 5" : "Semester 6"}
            href={badge.url}
            icon={<Award aria-hidden="true" />}
          />
        ))}
        {remainingBadges ? (
          <AtlasDetails label="Reveal remaining badges" count={remainingBadges}>
            <BadgeRows start={10} />
          </AtlasDetails>
        ) : null}
      </AtlasSurface>
    </AtlasPage>
  );
}
