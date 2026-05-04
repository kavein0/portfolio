"use client";

import { m } from "framer-motion";
import { HackTheBoxStats, htbMachines, htbChallenges, siteConfig } from "@/lib/data";
import { Terminal, Server, ExternalLink, Box, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function HackTheBoxClient({ stats }: { stats: HackTheBoxStats }) {
  const [expandedMachines, setExpandedMachines] = useState(false);
  const [expandedChallenges, setExpandedChallenges] = useState(false);

  const visibleMachines = expandedMachines ? htbMachines : htbMachines.slice(0, 10);
  const visibleChallenges = expandedChallenges ? htbChallenges : htbChallenges.slice(0, 10);
  return (
    <div className="container-custom min-h-screen page-pad">
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 md:mb-2 glitch-wrapper">
              <span className="glitch-text" data-text="HackTheBox">HackTheBox</span> <span className="text-[var(--cyber-green)]">Profile</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-mono text-lg">
              Compromised machines, solved challenges, and overall ownership statistics.
            </p>
          </div>
          <a
            href={siteConfig.hackthebox.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--cyber-green)]/10 text-[var(--cyber-green)] border border-[var(--cyber-green)]/20 hover:bg-[var(--cyber-green)]/20 hover:border-[var(--cyber-green)]/50 transition-all font-mono text-sm whitespace-nowrap group w-full md:w-auto"
          >
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            View @{siteConfig.hackthebox.username}
          </a>
        </div>
      </m.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {[
          { label: "Rank", value: stats.rank || "...", icon: Terminal },
          { label: "Machine Owns", value: stats.systemOwns || "...", icon: Server },
          { label: "Challenges", value: stats.challenges || "...", icon: Box },
        ].map((stat, i) => (
          <m.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] transition-all group flex flex-col items-center text-center"
          >
            <stat.icon className="w-8 h-8 mb-4 text-[var(--cyber-green)] group-hover:scale-110 transition-transform" />
            <div className="text-3xl font-display font-bold text-[var(--text-primary)]">{stat.value}</div>
            <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
          </m.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Pwned Machines */}
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
            <Server className="text-[var(--cyber-green)]" /> Owned Machines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleMachines.map((machine, i) => (
              <m.a
                key={machine.name}
                href={machine.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="block p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] hover:bg-[var(--cyber-green)]/5 transition-all group"
              >
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-green)] transition-colors truncate whitespace-normal break-words line-clamp-2">
                    {machine.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--cyber-green)] opacity-0 group-hover:opacity-100 transition-all mt-1" />
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {machine.os && (
                    <span className={`text-xs font-mono px-2 py-1 rounded ${machine.os === 'Linux' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {machine.os}
                    </span>
                  )}
                  {machine.difficulty && (
                    <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-1 rounded">
                      {machine.difficulty}
                    </span>
                  )}
                  <span className="text-xs font-bold font-mono text-[var(--cyber-green)] bg-[var(--cyber-green)]/10 border border-[var(--cyber-green)]/30 px-2 py-1 rounded min-w-[1.5rem] text-center">
                    {(machine.date === "2026" || machine.name === "MonitorsFour") ? "6" : "5"}
                  </span>
                </div>
              </m.a>
            ))}
          </div>
          {htbMachines.length > 10 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpandedMachines(!expandedMachines)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] text-[var(--text-primary)] hover:text-[var(--cyber-green)] transition-all group"
              >
                {expandedMachines ? (
                  <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                  <>Show More ({htbMachines.length - 10}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Challenges */}
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
            <Box className="text-[var(--cyber-green)]" /> Solved Challenges
          </h2>
          <div className="space-y-4">
            {visibleChallenges.map((challenge, i) => (
              <m.a
                key={challenge.name}
                href={challenge.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="block p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] hover:bg-[var(--cyber-green)]/5 transition-all group"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-md font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-green)] transition-colors truncate whitespace-normal break-words line-clamp-2">
                      {challenge.name}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      {challenge.category && (
                        <span className="text-xs font-mono text-[var(--cyber-green)] bg-[var(--cyber-green)]/10 px-2 py-1 rounded">
                          {challenge.category}
                        </span>
                      )}
                      {challenge.difficulty && (
                        <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-1 rounded">
                          {challenge.difficulty}
                        </span>
                      )}
                      <span className="text-xs font-bold font-mono text-[var(--cyber-green)] bg-[var(--cyber-green)]/10 border border-[var(--cyber-green)]/30 px-2 py-1 rounded min-w-[1.5rem] text-center">
                        {["CubeMadness2", "Broken Shell", "Not Posixtive", "Lucky Dice", "Micro Storage", "r0bob1rd"].includes(challenge.name) ? "6" : "5"}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--cyber-green)] opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </m.a>
            ))}
          </div>
          {htbChallenges.length > 10 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpandedChallenges(!expandedChallenges)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] text-[var(--text-primary)] hover:text-[var(--cyber-green)] transition-all group"
              >
                {expandedChallenges ? (
                  <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                  <>Show More ({htbChallenges.length - 10}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
