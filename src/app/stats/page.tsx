import { fetchTryHackMeStats, getTryHackMeDemoStats } from "@/lib/api/tryhackme";
import { fetchHackTheBoxStats, getHackTheBoxDemoStats } from "@/lib/api/hackthebox";
import { siteConfig } from "@/lib/data";
import StatsClient from "./StatsClient";

export const revalidate = 900;

export default async function StatsPage() {
  // Fetch stats in parallel
  const [thmStatsResponse, htbStatsResponse] = await Promise.all([
    fetchTryHackMeStats(siteConfig.tryhackme.username),
    fetchHackTheBoxStats(siteConfig.hackthebox.userId)
  ]);

  const thmStats = thmStatsResponse || getTryHackMeDemoStats();
  const htbStats = htbStatsResponse || getHackTheBoxDemoStats();

  return <StatsClient thmStats={thmStats} htbStats={htbStats} />;
}
