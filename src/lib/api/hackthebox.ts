import { HackTheBoxStats, siteConfig } from "@/lib/data";

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
