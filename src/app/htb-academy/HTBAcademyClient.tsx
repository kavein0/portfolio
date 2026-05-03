"use client";

import { motion } from "framer-motion";
import { htbAcademyModules, htbAcademyBadges, siteConfig } from "@/lib/data";
import { BookOpen, Shield, Award, ExternalLink, Terminal, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function HTBAcademyClient() {
  const [expandedModules, setExpandedModules] = useState(false);
  const [expandedBadges, setExpandedBadges] = useState(false);

  const visibleModules = expandedModules ? htbAcademyModules : htbAcademyModules.slice(0, 10);
  const visibleBadges = expandedBadges ? htbAcademyBadges : htbAcademyBadges.slice(0, 10);

  return (
    <div className="container-custom min-h-screen page-pad">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 md:mb-2 glitch-wrapper">
              <span className="glitch-text" data-text="HTB">HTB</span> <span className="text-[var(--cyber-green)]">Academy</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-mono text-lg">
              Completed learning modules and achievement badges from HackTheBox Academy.
            </p>
          </div>
          <a
            href={siteConfig.hackthebox.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--cyber-green)]/10 text-[var(--cyber-green)] border border-[var(--cyber-green)]/20 hover:bg-[var(--cyber-green)]/20 hover:border-[var(--cyber-green)]/50 transition-all font-mono text-sm whitespace-nowrap group w-full md:w-auto"
          >
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            View HTB Profile
          </a>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] transition-all group flex flex-col items-center text-center"
        >
          <BookOpen className="w-8 h-8 mb-4 text-[var(--cyber-green)] group-hover:scale-110 transition-transform" />
          <div className="text-3xl font-display font-bold text-[var(--text-primary)]">{htbAcademyModules.length}</div>
          <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Modules Completed</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] transition-all group flex flex-col items-center text-center"
        >
          <Award className="w-8 h-8 mb-4 text-[var(--cyber-green)] group-hover:scale-110 transition-transform" />
          <div className="text-3xl font-display font-bold text-[var(--text-primary)]">{htbAcademyBadges.length}</div>
          <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Badges Earned</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Completed Modules */}
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
            <BookOpen className="text-[var(--cyber-green)]" /> Completed Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleModules.map((module, i) => (
              <motion.a
                key={module.name}
                href={module.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative z-0 block p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] transition-all overflow-hidden"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[var(--cyber-green)]" />
                      <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">Module</span>
                    </div>
                    <div className="flex items-center justify-center text-[10px] font-bold font-mono text-[var(--cyber-green)] bg-[var(--cyber-green)]/10 border border-[var(--cyber-green)]/30 rounded w-5 h-5">
                      {["Linux Fundamentals", "Windows Fundamentals", "MacOS Fundamentals", "Setting Up"].includes(module.name) ? "5" : "6"}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--cyber-green)] transition-all" />
                </div>
                
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--cyber-green)] transition-colors pr-6">
                  {module.name}
                </h3>
                
                <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-[var(--cyber-green)]/10 text-[var(--cyber-green)] text-xs font-mono border border-[var(--cyber-green)]/20">
                  <Shield className="w-3 h-3" />
                  {module.status}
                </div>
              </motion.a>
            ))}
          </div>
          {htbAcademyModules.length > 10 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpandedModules(!expandedModules)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] text-[var(--text-primary)] hover:text-[var(--cyber-green)] transition-all group"
              >
                {expandedModules ? (
                  <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                  <>Show All ({htbAcademyModules.length - 10}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
            <Award className="text-[var(--cyber-green)]" /> Completion Badges
          </h2>
          <div className="space-y-4">
            {visibleBadges.map((badge, i) => (
              <motion.a
                key={badge.name}
                href={badge.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] transition-all flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-default)] group-hover:border-[var(--cyber-green)] flex items-center justify-center transition-colors shrink-0">
                  <Award className="w-6 h-6 text-[var(--cyber-green)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-green)] transition-colors">
                      {badge.name}
                    </h3>
                    <div className="flex items-center justify-center text-[10px] font-bold font-mono text-[var(--cyber-green)] bg-[var(--cyber-green)]/10 border border-[var(--cyber-green)]/30 rounded w-5 h-5">
                      {["Linux Fundamentals", "Windows Fundamentals", "MacOS Fundamentals", "Setting Up"].some(m => badge.description.includes(m)) ? "5" : "6"}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mt-1">
                    {badge.description}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--cyber-green)] transition-colors shrink-0 opacity-0 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>
          {htbAcademyBadges.length > 10 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpandedBadges(!expandedBadges)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] text-[var(--text-primary)] hover:text-[var(--cyber-green)] transition-all group"
              >
                {expandedBadges ? (
                  <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                  <>Show All ({htbAcademyBadges.length - 10}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

