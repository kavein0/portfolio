import { fetchTryHackMeStats, getTryHackMeDemoStats } from "@/lib/api/tryhackme";
import { siteConfig } from "@/lib/data";
import TryHackMeClient from "./TryHackMeClient";

export const revalidate = 900;

export default async function TryHackMePage() {
  let stats = await fetchTryHackMeStats(siteConfig.tryhackme.username);
  if (!stats) stats = getTryHackMeDemoStats();

  return <TryHackMeClient stats={stats} />;
}
