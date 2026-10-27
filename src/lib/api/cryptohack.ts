import { load } from "cheerio";

export interface CryptoHackStats {
  source: "live" | "snapshot";
  level: number;
  experience: number;
  pointsToNextLevel: number;
  levelProgress: number;
  rank: string;
  joined: string;
  profileUrl: string;
  challenges: CryptoHackChallenge[] | null;
}

export interface CryptoHackChallenge {
  name: string;
  category: string;
  solvedAt: string;
  points: number;
}

const profileUrl = "https://cryptohack.org/user/Larein/";

export async function fetchCryptoHackStats(): Promise<CryptoHackStats | null> {
  try {
    const response = await fetch(profileUrl, { next: { revalidate: 900 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) return null;
    const html = await response.text();
    const $ = load(html);
    if (!$('title').text().includes("Larein")) return null;
    const scoreText = $("#userScore").text().trim();
    const rank = $("p").toArray().map((p) => $(p).text().trim()).find((text) => /^Rank:\s*#\d+$/.test(text))?.replace(/^Rank:\s*/, "");
    const joined = $("[data-timestamp]").first().attr("data-timestamp");
    const levelsText = html.match(/var pointsLevels\s*=\s*\[([\d,\s]+)\]/)?.[1];
    if (!/^\d+$/.test(scoreText) || !rank || !joined || !levelsText) return null;
    const experience = Number(scoreText);
    const levels = levelsText.split(",").map((value) => Number(value.trim()));
    if (!levels.every(Number.isFinite) || levels.some((value, index) => index > 0 && value <= levels[index - 1])) return null;
    const level = levels.findIndex((value) => experience < value);
    if (level < 1) return null;
    const hasChallenges = $("h2,h3,h4,h5").toArray().some((heading) => $(heading).text().trim() === "Solved Challenges");
    const rows = $("tr.userrow").toArray();
    const challenges: CryptoHackChallenge[] = [];
    if (hasChallenges) {
      for (const row of rows) {
        const cells = $(row).find("td");
        const solvedAt = cells.eq(0).find("[data-timestamp]").attr("data-timestamp");
        const category = cells.eq(1).text().trim();
        const name = cells.eq(2).text().trim();
        const pointsText = cells.eq(3).find("span").first().text().trim();
        if (cells.length !== 4 || !solvedAt || !Number.isFinite(Date.parse(solvedAt)) ||
            !category || !name || !/^\d+$/.test(pointsText)) return null;
        challenges.push({ name, category, solvedAt, points: Number(pointsText) });
      }
    }
    return {
      source: "live", profileUrl, rank, joined: joined.slice(0, 10), experience, level,
      challenges: hasChallenges && rows.length > 0 ? challenges : null,
      pointsToNextLevel: levels[level] - experience,
      levelProgress: 100 * (experience - levels[level - 1]) / (levels[level] - levels[level - 1]),
    };
  } catch {
    return null;
  }
}

export const cryptoHackSnapshot: CryptoHackStats = {
  source: "snapshot", profileUrl, level: 10, experience: 2180,
  pointsToNextLevel: 380, levelProgress: 40.625, rank: "#1441", joined: "2026-06-12", challenges: null,
};
