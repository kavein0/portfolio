"use client";

import { useState } from "react";
import { skillCategories, skills } from "@/lib/data";
import styles from "./Home.module.css";

const categoryLabels = new Map(skillCategories.map((category) => [category.id, category.label]));

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const visibleSkills = activeCategory === "all"
    ? skills
    : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className={`${styles.section} ${styles.skillsSection}`}>
      <div className={styles.shell}>
        <div className={styles.skillsLens}>
          <div className={styles.skillsHeader}>
            <div>
              <h2>Capabilities</h2>
              <p>Tools I use to investigate, build and defend.</p>
            </div>
            <span className={styles.skillCount} aria-live="polite">{visibleSkills.length} skills</span>
          </div>

          <div className={styles.filters} aria-label="Skill category filters">
            <button
              type="button"
              aria-pressed={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              className={`${styles.filterButton} ${activeCategory === "all" ? styles.filterButtonActive : ""}`}
            >
              All
            </button>
            {skillCategories.map((category) => (
              <button
                type="button"
                key={category.id}
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`${styles.filterButton} ${activeCategory === category.id ? styles.filterButtonActive : ""}`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className={styles.skillList} role="list">
            {visibleSkills.map((skill) => (
              <div key={skill.name} role="listitem" className={styles.skillRow}>
                <i className={styles.skillStar} aria-hidden="true" />
                <strong className={styles.skillName}>{skill.name}</strong>
                <span className={styles.skillCategory}>{categoryLabels.get(skill.category)}</span>
                <span className={styles.skillLevel}>{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
