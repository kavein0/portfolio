import HTBAcademyClient from "./HTBAcademyClient";
import { siteConfig } from "@/lib/data";

export const metadata = {
  title: `HTBAcademy | ${siteConfig.name}`,
  description: "HackTheBox Academy modules, badges, and learning progress.",
};

export default function HTBAcademyPage() {
  return <HTBAcademyClient />;
}
