import { HackTheBoxStats, siteConfig } from "@/lib/data";

export interface HackTheBoxActivity {
  type: string;
  id: number;
  name: string;
  ownDate: string;
  categoryName?: string;
}

// The public profile supplies individual flag, challenge and Sherlock events.
export async function fetchHackTheBoxActivity(userId: number): Promise<HackTheBoxActivity[] | null> {
  try {
    const events: HackTheBoxActivity[] = [];
    const seen = new Set<string>();
    const limit = 100;
    for (let page = 1; page <= 50; page++) {
      const url = new URL(`https://labs.hackthebox.com/api/v5/user/profile/activity/${userId}`);
      url.searchParams.set("per_page", String(limit));
      url.searchParams.set("page", String(page));
      const response = await fetch(url, { next: { revalidate: 900 }, signal: AbortSignal.timeout(8000) });
      if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) return null;
      const result = await response.json();
      if (!Array.isArray(result.data) || !Number.isInteger(result.meta?.page) ||
          result.meta.page !== page || !Number.isInteger(result.meta.lastPage) ||
          result.meta.lastPage < page || !Number.isInteger(result.meta.totalItems) ||
          result.meta.totalItems < 0) return null;
      for (const event of result.data) {
        if (typeof event.type !== "string" || !event.type.trim() ||
            !Number.isInteger(event.id) || event.id <= 0 || typeof event.name !== "string" ||
            !event.name.trim() || typeof event.ownDate !== "string" ||
            !Number.isFinite(Date.parse(event.ownDate))) return null;
        const key = `${event.type}:${event.id}:${event.ownDate}`;
        if (seen.has(key)) return null;
        seen.add(key);
        events.push({ type: event.type, id: event.id, name: event.name, ownDate: event.ownDate,
          categoryName: typeof event.categoryName === "string" ? event.categoryName : undefined });
      }
      if (page === result.meta.lastPage) return events.length === result.meta.totalItems ? events : null;
      if (result.data.length === 0) return null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchHackTheBoxStats(userId: number): Promise<HackTheBoxStats | null> {
  try {
    const base = "https://labs.hackthebox.com/api/v4/profile";
    const options = { next: { revalidate: 900 }, signal: AbortSignal.timeout(8000) };
    const [profileResponse, challengesResponse] = await Promise.all([
      fetch(`${base}/${userId}`, options),
      fetch(`${base}/progress/challenges/${userId}`, options),
    ]);
    if (!profileResponse.ok || !challengesResponse.ok ||
        !profileResponse.headers.get("content-type")?.includes("application/json") ||
        !challengesResponse.headers.get("content-type")?.includes("application/json")) return null;
    const { profile } = await profileResponse.json();
    const challenges = (await challengesResponse.json()).profile?.challenge_owns?.solved;
    if (profile?.id !== userId || profile?.name?.toLowerCase() !== siteConfig.hackthebox.username.toLowerCase() ||
        typeof profile.rank !== "string" ||
        ![profile.points, profile.user_owns, profile.system_owns, profile.ranking, challenges].every(Number.isFinite)) return null;
    return {
      source: "live", rank: profile.rank, points: profile.points,
      ownership: profile.system_owns, userOwns: profile.user_owns,
      systemOwns: profile.system_owns, challenges, ranking: profile.ranking,
    };
  } catch {
    return null;
  }
}

// Browser-observed public profile on 28 October 2026; not presented as live data.
export function getHackTheBoxDemoStats(): HackTheBoxStats {
  return { source: "snapshot", rank: "Hacker", points: 0, ownership: 10, userOwns: 12, systemOwns: 10, challenges: 10, ranking: 1019 };
}
