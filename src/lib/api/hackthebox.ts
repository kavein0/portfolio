// HackTheBox unofficial API parser
// Fetches public profile data from HackTheBox

import { HackTheBoxStats } from "@/lib/data";

const HTB_BASE = "https://www.hackthebox.com/api/v4";

export async function fetchHackTheBoxStats(
  username: string,
  apiToken?: string
): Promise<HackTheBoxStats | null> {
  try {
    const headers: HeadersInit = {
      "User-Agent": "PortfolioBot/1.0",
      Accept: "application/json",
    };

    if (apiToken) {
      headers.Authorization = `Bearer ${apiToken}`;
    }

    // Try the public profile endpoint
    const res = await fetch(`${HTB_BASE}/profile/public/${username}`, {
      next: { revalidate: 3600 },
      headers,
    });

    if (!res.ok) return null;

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null;
    }

    const json = await res.json();
    const profile = json.profile;

    return {
      rank: profile?.rank_text ?? "—",
      points: profile?.points ?? 0,
      ownership: profile?.user_owns ?? 0,
      userOwns: profile?.user_owns ?? 0,
      systemOwns: profile?.system_owns ?? 0,
      challenges: profile?.challenge_owns ?? 0,
      ranking: profile?.ranking ?? 0,
      avatar: profile?.avatar ? `https://www.hackthebox.com${profile.avatar}` : undefined,
    };
  } catch (err) {
    console.error("[HTB] Failed to fetch stats:", err);
    return null;
  }
}

// Fallback demo data
export function getHackTheBoxDemoStats(): HackTheBoxStats {
  return {
    rank: "Apprentice",
    points: 0,
    ownership: 8,
    userOwns: 8,
    systemOwns: 8,
    challenges: 10,
    ranking: 0,
  };
}
