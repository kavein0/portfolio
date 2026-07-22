import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ConstellationDisplay from "@/components/ConstellationDisplay";
import RoleTicker from "@/components/RoleTicker";
import { certifications, htbAcademyModules, siteConfig, thmRooms } from "@/lib/data";
import styles from "./Home.module.css";

const roles = [
  "Penetration Tester",
  "Digital Forensics Explorer",
  "CTF Player",
  "Security Researcher",
] as const;

const evidence = [
  { value: thmRooms.length, label: "TryHackMe rooms", detail: "hands-on practice", href: "/tryhackme" },
  { value: htbAcademyModules.length, label: "Academy modules", detail: "completed", href: "/htb-academy" },
  { value: certifications.length, label: "Certificates", detail: "verified learning", href: "/cisco" },
  { value: 8, label: "PicoCTF tasks", detail: "write-ups & proof", href: "/picoctf" },
] as const;

export default function HeroSection() {
  const [firstName, ...lastName] = siteConfig.nameEn.split(" ");

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.shell}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              <span>{firstName}</span>
              <span>{lastName.join(" ")}</span>
            </h1>
            <p className={styles.nativeName}>{siteConfig.name}</p>
            <p className={styles.heroSummary}>{siteConfig.title}</p>

            <div className={styles.roleLine} aria-label={`Current roles: ${roles.join(", ")}`}>
              <i className={styles.roleStar} aria-hidden="true" />
              <RoleTicker roles={roles} />
              <i className={styles.roleCaret} aria-hidden="true" />
            </div>

            <div className={styles.heroActions}>
              <Link href="/stats" className={styles.primaryAction}>
                View progress <ArrowRight aria-hidden="true" />
              </Link>
              <a href="#contact" className={styles.textAction}>Get in touch</a>
              <span className={styles.availability}><i aria-hidden="true" />Available for internships</span>
            </div>
          </div>

          <div className={styles.lensScene} aria-hidden="true">
            <div className={styles.lensOrbit} />
            <div className={styles.lensOrbitSecondary} />
            <div className={styles.lensHalo} />
            <div className={styles.heroLens}>
              <span className={styles.lensRefraction} />
              <ConstellationDisplay />
            </div>
            <span className={styles.crescentMoon} />
          </div>
        </div>

        <div className={styles.evidenceRail} aria-label="Portfolio evidence overview">
          {evidence.map((item) => (
            <Link key={item.label} href={item.href} className={styles.evidenceItem}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <small>{item.detail}</small>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.heroCoda} aria-hidden="true">
        <div className={styles.shell}>
          <span>Atlas</span>
          <strong>Charting curiosity.</strong>
        </div>
      </div>
    </section>
  );
}
