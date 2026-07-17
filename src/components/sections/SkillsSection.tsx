"use client";

import { useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { Cpu, SlidersHorizontal } from "lucide-react";
import { skillCategories, skills } from "@/lib/data";

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const visibleSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="command-section command-section-tight">
      <div className="container-custom">
        <div className="section-heading-deck">
          <div>
            <span className="section-index">02 / CAPABILITIES</span>
            <h2>Technical systems</h2>
          </div>
          <p>Current working knowledge across offensive security, infrastructure and code.</p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="hud-panel skill-console"
        >
          <div className="skill-console-header">
            <div className="panel-caption"><Cpu /> Capability matrix <span>{String(visibleSkills.length).padStart(2, "0")} SIGNALS</span></div>
            <div className="skill-filters" aria-label="Skill category filters">
              <button type="button" onClick={() => setActiveCategory("all")} className={activeCategory === "all" ? "active" : ""}>
                <SlidersHorizontal /> All
              </button>
              {skillCategories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={activeCategory === category.id ? "active" : ""}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="skill-table" role="list">
            {visibleSkills.map((skill, index) => (
              <m.div
                layout
                key={skill.name}
                role="listitem"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.32, delay: Math.min(index * 0.035, 0.25) }}
                className="skill-row"
              >
                <span className="skill-number">{String(index + 1).padStart(2, "0")}</span>
                <strong>{skill.name}</strong>
                <span className="skill-category">{skill.category}</span>
                <div className="skill-meter"><i style={{ width: `${skill.level}%` }} /></div>
                <span className="skill-level">{skill.level}%</span>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
