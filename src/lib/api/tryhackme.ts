// TryHackMe unofficial API parser
// Fetches public profile data from TryHackMe

import { TryHackMeStats } from "@/lib/data";

const THM_BASE = "https://tryhackme.com/api";

export async function fetchTryHackMeStats(
  username: string
): Promise<TryHackMeStats | null> {
  try {
    const res = await fetch(`${THM_BASE}/user/rank/${username}`, {
      next: { revalidate: 3600 }, // cache 1 hour
      headers: { "User-Agent": "PortfolioBot/1.0" },
    });

    if (!res.ok) return null;

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null;
    }

    const data = await res.json();

    return {
      rank: data.userRank ?? "—",
      points: data.points ?? 0,
      roomsCompleted: data.roomsCompleted ?? 0,
      streak: data.streak ?? 0,
      badges: data.badges ?? 0,
      level: data.level ?? 0,
      avatar: data.avatar
        ? `https://tryhackme-images.s3.amazonaws.com/${data.avatar}`
        : undefined,
    };
  } catch (err) {
    console.error("[THM] Failed to fetch stats:", err);
    return null;
  }
}

// Fallback demo data (used when API is unreachable or no username set)
export function getTryHackMeDemoStats(): TryHackMeStats {
  return {
    rank: "Top 15% (Adept)",
    points: 0,
    roomsCompleted: 20,
    streak: 0,
    badges: 2,
    level: 44,
  };
}
