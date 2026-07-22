import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { GithubIcon, TelegramIcon } from "@/components/icons/BrandIcons";
import { siteConfig } from "@/lib/data";
import styles from "./Home.module.css";

const contactLinks = [
  { icon: Mail, label: "Email", value: siteConfig.socials.email, href: `mailto:${siteConfig.socials.email}` },
  { icon: TelegramIcon, label: "Telegram", value: "@Ranelin", href: siteConfig.socials.telegram },
  { icon: GithubIcon, label: "GitHub", value: "github.com/kavein0", href: siteConfig.socials.github },
];

export default function ContactSection() {
  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.shell}>
        <div className={styles.contactGrid}>
          <div>
            <h2 className={styles.contactTitle}>Establish a secure channel.</h2>
            <p className={styles.contactIntro}>Open to internships, cybersecurity collaboration and CTF teams.</p>
            <div className={styles.contactLocation}><MapPin aria-hidden="true" />Kamianets-Podilskyi, Ukraine</div>
          </div>

          <div className={styles.contactLens}>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className={styles.contactRoute}
              >
                <span className={styles.contactRouteIcon}><link.icon aria-hidden="true" /></span>
                <span><small>{link.label}</small><strong>{link.value}</strong></span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
