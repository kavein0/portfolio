import { TryHackMeStats } from "@/lib/data";

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
