import { fetchTryHackMeAchievements, fetchTryHackMeStats, getTryHackMeDemoStats } from "@/lib/api/tryhackme";
import { siteConfig } from "@/lib/data";
import TryHackMeClient from "./TryHackMeClient";

export const revalidate = 900;

export default async function TryHackMePage() {
  const liveStats = await fetchTryHackMeStats(siteConfig.tryhackme.username);
  const achievements = liveStats ? await fetchTryHackMeAchievements(siteConfig.tryhackme.username) : null;
  const stats = liveStats ?? getTryHackMeDemoStats();

  return <TryHackMeClient stats={stats} achievements={achievements} />;
}
