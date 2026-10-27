import { fetchHackTheBoxActivity, fetchHackTheBoxStats, getHackTheBoxDemoStats } from "@/lib/api/hackthebox";
import { siteConfig } from "@/lib/data";
import HackTheBoxClient from "./HackTheBoxClient";

export const revalidate = 900;

export default async function HackTheBoxPage() {
  const [profile, activity] = await Promise.all([
    fetchHackTheBoxStats(siteConfig.hackthebox.userId),
    fetchHackTheBoxActivity(siteConfig.hackthebox.userId),
  ]);
  const stats = profile ?? getHackTheBoxDemoStats();

  return <HackTheBoxClient stats={stats} activity={activity} />;
}
