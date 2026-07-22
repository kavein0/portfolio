import {
  AtlasDetails,
  AtlasHero,
  AtlasPage,
  AtlasRow,
  AtlasSectionHeading,
  AtlasSurface,
} from "@/components/atlas/AtlasPage";
import {
  siteConfig,
  thmBadges,
  thmRooms,
  type TryHackMeRoom,
  type TryHackMeStats,
} from "@/lib/data";
import { Shield, Target, Trophy, Zap } from "lucide-react";

function RoomRow({ room }: { room: TryHackMeRoom }) {
  return (
    <AtlasRow
      title={room.name}
      description={`${room.type}${room.date ? ` · completed ${room.date}` : " · completed"}`}
      meta={room.difficulty}
      trailing={room.url ? room.date ?? "Archive" : "Link pending"}
      href={room.url}
      icon={<Target aria-hidden="true" />}
    />
  );
}

export default function TryHackMeClient({ stats }: { stats: TryHackMeStats }) {
  const primaryRooms = thmRooms.slice(0, 10);
  const remainingRooms = thmRooms.slice(10);

  return (
    <AtlasPage tone="red">
      <AtlasHero
        visual="tryhackme"
        eyebrow="Training archive · TryHackMe"
        title="TryHackMe Profile"
        description={
          <p>Detailed overview of my learning paths, completed rooms, and earned badges.</p>
        }
        action={{ label: "View Profile", href: siteConfig.tryhackme.profileUrl }}
        constellationCaption="A patient route through reconnaissance, forensics, cryptography, and offensive security."
        stats={[
          { label: "Rank", value: stats.rank || "…", icon: <Trophy aria-hidden="true" /> },
          { label: "Level", value: stats.level || "…", icon: <Zap aria-hidden="true" /> },
          { label: "Rooms", value: stats.roomsCompleted || "…", detail: `${thmRooms.length} catalogued`, icon: <Target aria-hidden="true" /> },
          { label: "Badges", value: stats.badges || "…", detail: `${thmBadges.length} documented`, icon: <Shield aria-hidden="true" /> },
        ]}
      />

      <AtlasSectionHeading
        eyebrow="Observation log 01"
        title="Completed Paths & Rooms"
        action={`${thmRooms.length} entries`}
      />
      <AtlasSurface>
        {primaryRooms.map((room) => <RoomRow key={room.name} room={room} />)}
        {remainingRooms.length ? (
          <AtlasDetails label="Reveal remaining rooms" count={remainingRooms.length}>
            {remainingRooms.map((room) => <RoomRow key={room.name} room={room} />)}
          </AtlasDetails>
        ) : null}
      </AtlasSurface>

      <AtlasSectionHeading
        eyebrow="Observation log 02"
        title="Earned Badges"
        action={`${thmBadges.length} badges`}
      />
      <AtlasSurface>
        {thmBadges.map((badge) => (
          <AtlasRow
            key={badge.name}
            title={badge.name}
            description={badge.description}
            meta="Badge"
            href={badge.url}
            icon={<Trophy aria-hidden="true" />}
          />
        ))}
      </AtlasSurface>
    </AtlasPage>
  );
}
