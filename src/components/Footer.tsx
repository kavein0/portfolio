import { siteConfig } from "@/lib/data";
import styles from "./SiteChrome.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLine}>
        <span>2026 {siteConfig.nameEn}</span>
        <div className={styles.footerSignature} aria-hidden="true">
          <i /><i /><i /><i /><i />
          <strong>V.E</strong>
        </div>
        <span>{siteConfig.university}</span>
      </div>
    </footer>
  );
}
