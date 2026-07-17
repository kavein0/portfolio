"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { BookOpen, GraduationCap, MapPin, RadioTower, Target } from "lucide-react";
import { siteConfig } from "@/lib/data";

const dossier = [
  { label: "Institution", value: siteConfig.universityShort },
  { label: "Specialization", value: "Cybersecurity" },
  { label: "Location", value: "Kamianets-Podilskyi, UA" },
  { label: "Status", value: "Active / learning" },
];

const disciplines = ["Penetration testing", "Digital forensics", "Network security", "DevOps infrastructure"];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-90px" });

  return (
    <section id="about" ref={sectionRef} className="command-section">
      <div className="container-custom">
        <div className="section-heading-deck">
          <div>
            <span className="section-index">01 / PROFILE</span>
            <h2>Operator dossier</h2>
          </div>
          <p>Academic path, security focus and the environment behind the work.</p>
        </div>

        <div className="dossier-layout">
          <m.article
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="hud-panel narrative-panel"
          >
            <div className="panel-caption"><RadioTower /> Transmission / about <span>DECRYPTED</span></div>
            <div className="narrative-copy">
              <p className="narrative-lead">
                I&apos;m a <strong>3rd-year cadet</strong> at {siteConfig.university}, focused on cybersecurity and digital forensics.
              </p>
              <p>
                My work connects offensive security with infrastructure knowledge: CTF practice, homelab environments, Linux, network security and automation. I study how systems fail so they can be defended with better evidence and clearer engineering.
              </p>
              <p>
                The long-term objective is to contribute to Ukraine&apos;s cyber defence by combining law-enforcement education with practical technical experience.
              </p>
            </div>
            <div className="discipline-rail">
              {disciplines.map((discipline, index) => (
                <span key={discipline}><i>{String(index + 1).padStart(2, "0")}</i>{discipline}</span>
              ))}
            </div>
          </m.article>

          <m.aside
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="hud-panel identity-panel"
          >
            <div className="panel-caption"><Target /> Identity file <span>VE-26</span></div>
            <div className="identity-mark" aria-hidden="true">
              <span>V</span><i /><strong>E</strong>
            </div>
            <div className="dossier-rows">
              {dossier.map((item) => (
                <div key={item.label}><span>{item.label}</span><strong>{item.value}</strong></div>
              ))}
            </div>
          </m.aside>
        </div>

        <div className="profile-instruments">
          {[
            { icon: GraduationCap, label: "Education", value: "KNUIA / 3rd year" },
            { icon: MapPin, label: "Base", value: "Ukraine" },
            { icon: BookOpen, label: "Primary track", value: "Cybersecurity" },
            { icon: Target, label: "Objective", value: "Security engineer" },
          ].map((item, index) => (
            <m.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }}
            >
              <item.icon />
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
