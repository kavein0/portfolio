import { fetchHackTheBoxStats, getHackTheBoxDemoStats } from "@/lib/api/hackthebox";
import { siteConfig } from "@/lib/data";
import HackTheBoxClient from "./HackTheBoxClient";

export const revalidate = 900;

export default async function HackTheBoxPage() {
  let stats = await fetchHackTheBoxStats(siteConfig.hackthebox.userId);
  if (!stats) stats = getHackTheBoxDemoStats();

  return <HackTheBoxClient stats={stats} />;
}
