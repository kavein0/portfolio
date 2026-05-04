"use client";

import { useState, useRef } from "react";
import { m, useInView } from "framer-motion";
import { skills, skillCategories, type Skill } from "@/lib/data";

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const categoryColor =
    skillCategories.find((c) => c.id === skill.category)?.color ?? "#00ff88";

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
          {skill.name}
        </span>
        <span
          className="font-mono text-xs font-bold"
          style={{ color: categoryColor }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="h-[6px] rounded-full bg-[var(--bg-elevated)] overflow-hidden">
        <m.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: `linear-gradient(90deg, ${categoryColor}88, ${categoryColor})`,
            boxShadow: `0 0 12px ${categoryColor}40`,
          }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
              animation: "shimmer 2s infinite",
            }}
          />
        </m.div>
      </div>
    </m.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section label */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-[1px] w-8 bg-[var(--cyber-green)]" />
          <span className="font-mono text-xs text-[var(--cyber-green)] tracking-widest uppercase">
            Skills
          </span>
        </m.div>

        <m.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="section-title mb-6"
        >
          Technical <span className="text-[var(--cyber-green)]">Arsenal</span>
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[var(--text-secondary)] text-base max-w-2xl mb-10"
        >
          A breakdown of my technical competencies across offensive security,
          infrastructure, and programming domains.
        </m.p>

        {/* Category filters */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`cyber-tag cursor-pointer transition-all ${
              activeCategory === "all"
                ? "border-[var(--cyber-green)] text-[var(--cyber-green)] bg-[rgba(0,255,136,0.05)]"
                : ""
            }`}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`cyber-tag cursor-pointer transition-all ${
                activeCategory === cat.id
                  ? "bg-[rgba(0,255,136,0.05)]"
                  : ""
              }`}
              style={
                activeCategory === cat.id
                  ? { borderColor: cat.color, color: cat.color }
                  : {}
              }
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: cat.color }}
              />
              {cat.label}
            </button>
          ))}
        </m.div>

        {/* Skill bars grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-5">
          {filtered.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} delay={0.05 * i} />
          ))}
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}
