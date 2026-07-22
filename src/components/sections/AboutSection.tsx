import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/data";
import styles from "./Home.module.css";

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.shell}>
        <header className={styles.sectionHeading}>
          <h2>Profile</h2>
          <p>Security practice grounded in evidence, software engineering and public service.</p>
        </header>

        <div className={styles.profileGrid}>
          <div className={styles.profileCopy}>
            <p className={styles.profileLead}>
              I&apos;m a 3rd-year cadet at {siteConfig.university}, focusing my professional growth on cybersecurity with an emphasis on programming, reverse engineering, and process automation.
            </p>
            <p>
              My work connects offensive security with low-level systems and infrastructure knowledge: CTF practice, homelab environments, Linux internals, network security, and automation. I study how systems fail so they can be defended with better evidence and clearer engineering.
            </p>
            <p>
              I strive to apply and deepen my skills in Python, Rust, C/C++, and C# to build custom tools for system analysis, data processing, and solving digital forensics tasks.
            </p>
            <p>
              My long-term objective is to contribute to Ukraine&apos;s cyber defence by combining law-enforcement education with practical technical and software development capabilities.
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
      </div>
    </section>
  );
}
