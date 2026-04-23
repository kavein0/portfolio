import { NextResponse } from "next/server";
import {
  fetchTryHackMeStats,
  getTryHackMeDemoStats,
} from "@/lib/api/tryhackme";
import {
  fetchHackTheBoxStats,
  getHackTheBoxDemoStats,
} from "@/lib/api/hackthebox";
import { siteConfig } from "@/lib/data";

export const revalidate = 3600; // revalidate every hour

export async function GET() {
  // Attempt live fetches in parallel
  const [thm, htb] = await Promise.all([
    fetchTryHackMeStats(siteConfig.tryhackme.username),
    fetchHackTheBoxStats(siteConfig.hackthebox.username),
  ]);

  return NextResponse.json({
    tryhackme: thm ?? getTryHackMeDemoStats(),
    hackthebox: htb ?? getHackTheBoxDemoStats(),
    live: {
      tryhackme: thm !== null,
      hackthebox: htb !== null,
    },
    fetchedAt: new Date().toISOString(),
  });
}
