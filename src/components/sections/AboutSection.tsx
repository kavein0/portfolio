import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";
import styles from "./Home.module.css";

const disciplines = [
  "Penetration testing",
  "Digital forensics",
  "Network security",
  "DevOps infrastructure",
] as const;

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.shell}>
        <header className={styles.sectionHeading}>
          <h2>Profile</h2>
          <p>Security practice grounded in evidence, infrastructure and public service.</p>
        </header>

        <div className={styles.profileGrid}>
          <div className={styles.profileCopy}>
            <p className={styles.profileLead}>
              I&apos;m a 3rd-year cadet at {siteConfig.university}, focused on cybersecurity and digital forensics.
            </p>
            <p>
              My work connects offensive security with infrastructure knowledge: CTF practice, homelab environments, Linux, network security and automation. I study how systems fail so they can be defended with better evidence and clearer engineering.
            </p>
            <p>
              The long-term objective is to contribute to Ukraine&apos;s cyber defence by combining law-enforcement education with practical technical experience.
            </p>
            <Link href="/learning-matrix" className={styles.matrixLink}>
              Open learning matrix <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.identityStage}>
            <div className={styles.identityLens}>
              <div className={styles.identityCore}>
                <span>{siteConfig.universityShort}</span>
                <strong>3rd year</strong>
                <em>Cybersecurity</em>
                <div className={styles.identityLocation}><MapPin aria-hidden="true" />Kamianets-Podilskyi, Ukraine</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.disciplineOrbit} aria-label="Core disciplines">
          {disciplines.map((discipline) => <div key={discipline} className={styles.discipline}>{discipline}</div>)}
        </div>
      </div>
    </section>
  );
}
