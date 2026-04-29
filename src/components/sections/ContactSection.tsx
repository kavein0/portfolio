"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { GithubIcon, TelegramIcon } from "@/components/icons/BrandIcons";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: siteConfig.socials.email,
    href: `mailto:${siteConfig.socials.email}`,
    color: "var(--cyber-green)",
  },
  {
    icon: <TelegramIcon className="w-5 h-5" />,
    label: "Telegram",
    value: "@Ranelin",
    href: siteConfig.socials.telegram,
    color: "var(--cyber-blue)",
  },
  {
    icon: <GithubIcon className="w-5 h-5" />,
    label: "GitHub",
    value: "kavein0",
    href: siteConfig.socials.github,
    color: "var(--text-primary)",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-grid pointer-events-none opacity-20" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-[1px] w-8 bg-[var(--cyber-green)]" />
          <span className="font-mono text-xs text-[var(--cyber-green)] tracking-widest uppercase">
            Contact
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title mb-6"
        >
          Get in <span className="text-[var(--cyber-green)]">Touch</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[var(--text-secondary)] text-base max-w-xl mb-12"
        >
          Interested in cybersecurity collaboration, CTF teaming, or internship
          opportunities? Feel free to reach out.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              className="glass-card p-5 flex-1 flex items-center gap-4 group hover:border-[var(--border-active)] transition-all min-w-[250px]"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
                style={{
                  background: "var(--bg-elevated)",
                  color: link.color,
                }}
              >
                {link.icon}
              </div>
              <div className="flex-1">
                <p className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  {link.label}
                </p>
                <p className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--cyber-green)] transition-colors">
                  {link.value}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--cyber-green)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          ))}
        </div>

        {/* Location note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center gap-2 mt-10 text-[var(--text-muted)]"
        >
          <MapPin className="w-4 h-4" />
          <span className="font-mono text-xs">
            Based in Kamianets-Podilsk, Ukraine 🇺🇦
          </span>
        </motion.div>
      </div>
    </section>
  );
}
