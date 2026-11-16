"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CloudRain, Box, GraduationCap, Radio, KeyRound, Info, Landmark, ChartNoAxesColumn, Table2, Award, Layers } from "lucide-react";
import { GlassLayers } from "./LiquidGlass";

const platforms = [
  { name: "TryHackMe", url: "/tryhackme", Icon: CloudRain },
  { name: "Hack The Box", url: "/hackthebox", Icon: Box },
  { name: "HTB Academy", url: "/htb-academy", Icon: GraduationCap },
  { name: "Cisco", url: "/cisco", Icon: Radio },
  { name: "CryptoHack", url: "/cryptohack", Icon: KeyRound },
  { name: "picoCTF", url: "/picoctf", Icon: Info },
];
const training = [
  { name: "EC-Council", url: "/ec-council", Icon: Award },
  { name: "Basel LEARN", url: "/basel-learn", Icon: Landmark },
  { name: "Great Learning", url: "/great-learning", Icon: GraduationCap },
  { name: "IBM", url: "/ibm", Icon: Layers },
];
const overview = [
  { name: "Certificates & training", url: "/certificates", Icon: Award },
  { name: "Progress overview", url: "/stats", Icon: ChartNoAxesColumn },
  { name: "Learning matrix", url: "/learning-matrix", Icon: Table2 },
];

export default function ArchiveNav({ mode = "both" }: { mode?: "desktop" | "mobile" | "both" }) {
  const path = usePathname();
  const router = useRouter();
  function links(items: typeof platforms) {
    return items.map(({ name, url, Icon }) => <Link key={url} href={url} aria-current={path === url ? "page" : undefined}><Icon aria-hidden="true" /><span>{name}</span></Link>);
  }
  return <>
    {mode !== "mobile" ? <nav className="rf-platform-nav rf-liquid" aria-label="Platforms">
      <GlassLayers /><h2>Platforms</h2>
      {links(platforms)}
      <span className="rf-nav-unavailable"><Landmark aria-hidden="true" /><span>CyLab<small>Not connected</small></span></span>
      <h3 className="rf-nav-group-title">Course archives</h3>
      <div className="rf-nav-course-links">{links(training)}</div>
      <hr /><div className="rf-nav-overview-links">{links(overview)}</div>
    </nav> : null}
    {mode !== "desktop" ? <label className="rf-platform-select">Platform<select aria-label="Platform" value={path} onChange={(event) => router.push(event.target.value)}>
      <optgroup label="Platforms">{platforms.map((item) => <option key={item.url} value={item.url}>{item.name}</option>)}</optgroup>
      <optgroup label="Course archives">{training.map((item) => <option key={item.url} value={item.url}>{item.name}</option>)}</optgroup>
      <optgroup label="Overview">{overview.map((item) => <option key={item.url} value={item.url}>{item.name}</option>)}</optgroup>
    </select></label> : null}
  </>;
}
