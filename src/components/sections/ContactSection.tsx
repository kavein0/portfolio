"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Radio } from "lucide-react";
import { GithubIcon, TelegramIcon } from "@/components/icons/BrandIcons";
import { siteConfig } from "@/lib/data";

const contactLinks = [
  { icon: Mail, label: "Email channel", value: siteConfig.socials.email, href: `mailto:${siteConfig.socials.email}` },
  { icon: TelegramIcon, label: "Telegram relay", value: "@Ranelin", href: siteConfig.socials.telegram },
  { icon: GithubIcon, label: "Code archive", value: "github.com/kavein0", href: siteConfig.socials.github },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-70px" });

  return (
    <section id="contact" ref={sectionRef} className="command-section contact-section">
      <div className="container-custom">
        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="contact-deck hud-panel"
        >
          <div className="contact-copy">
            <div className="panel-caption"><Radio /> Communication relay <span>OPEN</span></div>
            <span className="section-index">03 / CONTACT</span>
            <h2>Establish a secure channel.</h2>
            <p>Open to internships, cybersecurity collaboration and CTF teams.</p>
            <div className="contact-location"><MapPin /> Kamianets-Podilskyi, Ukraine</div>
          </div>

          <div className="contact-routes">
            {contactLinks.map((link, index) => (
              <m.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
              >
                <span className="contact-route-icon"><link.icon /></span>
                <span><small>{link.label}</small><strong>{link.value}</strong></span>
                <ArrowUpRight />
              </m.a>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
