import { fetchHackTheBoxStats, getHackTheBoxDemoStats } from "@/lib/api/hackthebox";
import { siteConfig } from "@/lib/data";
import HackTheBoxClient from "./HackTheBoxClient";

export default async function HackTheBoxPage() {
  let stats = await fetchHackTheBoxStats(siteConfig.hackthebox.username);
  if (!stats) stats = getHackTheBoxDemoStats();

  return <HackTheBoxClient stats={stats} />;
}
