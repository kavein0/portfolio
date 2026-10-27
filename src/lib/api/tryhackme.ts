import { TryHackMeRoom, TryHackMeStats } from "@/lib/data";

export interface TryHackMeBadge {
  name: string;
  description: string;
  url: string;
}

export interface TryHackMeAchievements {
  rooms: TryHackMeRoom[];
  badges: TryHackMeBadge[];
}

async function readPublicPages(username: string, resource: "completed-rooms" | "badges"): Promise<unknown[] | null> {
  const items: unknown[] = [];
  for (let page = 1; page <= 50; page++) {
    const url = new URL(`https://tryhackme.com/api/v2/public-profile/${resource}`);
    url.searchParams.set("username", username);
    url.searchParams.set("limit", "100");
    url.searchParams.set("page", String(page));
    const response = await fetch(url, { next: { revalidate: 900 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) return null;
    const { status, data } = await response.json();
    if (status !== "success" || !Array.isArray(data?.docs) || data.page !== page ||
        !Number.isInteger(data.totalPages) || data.totalPages < 0 ||
        !Number.isInteger(data.totalDocs) || data.totalDocs < 0) return null;
    items.push(...data.docs);
    if (page >= data.totalPages) return items.length === data.totalDocs ? items : null;
    if (data.docs.length === 0) return null;
  }
  return null;
}

export async function fetchTryHackMeAchievements(username: string): Promise<TryHackMeAchievements | null> {
  try {
    const [rawRooms, rawBadges] = await Promise.all([
      readPublicPages(username, "completed-rooms"), readPublicPages(username, "badges"),
    ]);
    if (!rawRooms || !rawBadges) return null;
    const rooms: TryHackMeRoom[] = [];
    for (const item of rawRooms) {
      if (!item || typeof item !== "object") return null;
      const room = item as Record<string, unknown>;
      if (typeof room.title !== "string" || !room.title.trim() || typeof room.code !== "string" || !/^[a-z0-9-]+$/i.test(room.code)) return null;
      const difficulty = typeof room.difficulty === "string" ? room.difficulty.toLowerCase() : "";
      const label: TryHackMeRoom["difficulty"] = difficulty === "easy" ? "Easy" : difficulty === "medium" ? "Medium" : difficulty === "hard" ? "Hard" : "Info";
      rooms.push({ name: room.title, type: "Room", difficulty: label, url: `https://tryhackme.com/room/${room.code}` });
    }
    const badges: TryHackMeBadge[] = [];
    for (const item of rawBadges) {
      if (!item || typeof item !== "object") return null;
      const badge = item as Record<string, unknown>;
      if (typeof badge.title !== "string" || !badge.title.trim() || typeof badge.description !== "string") return null;
      badges.push({ name: badge.title, description: badge.description, url: `https://tryhackme.com/p/${encodeURIComponent(username)}` });
    }
    return { rooms, badges };
  } catch {
    return null;
  }
}

// The public profile endpoint was discovered from the site's own requests.
export async function fetchTryHackMeStats(username: string): Promise<TryHackMeStats | null> {
  try {
    const url = new URL("https://tryhackme.com/api/v2/public-profile");
    url.searchParams.set("username", username);
    const res = await fetch(url, { next: { revalidate: 900 }, signal: AbortSignal.timeout(8000) });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return null;
    const { data } = await res.json();
    if (!data || data.username?.toLowerCase() !== username.toLowerCase() ||
        ![data.level, data.totalPoints, data.badgesNumber, data.completedRoomsNumber, data.streak, data.topPercentage].every(Number.isFinite)) return null;
    return {
      source: "live", rank: `Top ${data.topPercentage}%`, points: data.totalPoints,
      roomsCompleted: data.completedRoomsNumber, streak: data.streak,
      badges: data.badgesNumber, level: data.level,
      avatar: typeof data.avatar === "string" ? data.avatar : undefined,
    };
  } catch {
    return null;
  }
}

// Browser-observed public profile on 28 October 2026; not presented as live data.
export function getTryHackMeDemoStats(): TryHackMeStats {
  return { source: "snapshot", rank: "Top 7%", points: 6672, roomsCompleted: 53, streak: 2, badges: 7, level: 8 };
}
