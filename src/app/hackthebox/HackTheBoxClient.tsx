"use client";

import { motion } from "framer-motion";
import { HackTheBoxStats, htbMachines, htbChallenges } from "@/lib/data";
import { Terminal, Server, Cpu, ExternalLink, Box, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function HackTheBoxClient({ stats }: { stats: HackTheBoxStats }) {
  const [expandedMachines, setExpandedMachines] = useState(false);
  const [expandedChallenges, setExpandedChallenges] = useState(false);

  const visibleMachines = expandedMachines ? htbMachines : htbMachines.slice(0, 10);
  const visibleChallenges = expandedChallenges ? htbChallenges : htbChallenges.slice(0, 10);
  return (
    <div className="container-custom min-h-screen" style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4">
          HackTheBox <span className="text-[var(--cyber-green)]">Profile</span>
        </h1>
        <p className="text-[var(--text-secondary)] font-mono text-lg">
          Compromised machines, solved challenges, and overall ownership statistics.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { label: "Rank", value: stats.rank || "...", icon: Terminal, color: "text-[var(--cyber-green)]" },
          { label: "System Owns", value: stats.systemOwns || "...", icon: Server, color: "text-red-400" },
          { label: "User Owns", value: stats.userOwns || "...", icon: Cpu, color: "text-blue-400" },
          { label: "Challenges", value: stats.challenges || "...", icon: Box, color: "text-purple-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] transition-all group"
          >
            <stat.icon className={`w-8 h-8 mb-4 ${stat.color} group-hover:scale-110 transition-transform`} />
            <div className="text-3xl font-display font-bold text-[var(--text-primary)]">{stat.value}</div>
            <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
          </motion.div>
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
              <motion.a
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
                </div>
              </motion.a>
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
            <Box className="text-[var(--cyber-blue)]" /> Solved Challenges
          </h2>
          <div className="space-y-4">
            {visibleChallenges.map((challenge, i) => (
              <motion.a
                key={challenge.name}
                href={challenge.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="block p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-blue)] hover:bg-[var(--cyber-blue)]/5 transition-all group"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-md font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-blue)] transition-colors truncate whitespace-normal break-words line-clamp-2">
                      {challenge.name}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      {challenge.category && (
                        <span className="text-xs font-mono text-[var(--cyber-blue)] bg-[var(--cyber-blue)]/10 px-2 py-1 rounded">
                          {challenge.category}
                        </span>
                      )}
                      {challenge.difficulty && (
                        <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-2 py-1 rounded">
                          {challenge.difficulty}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--cyber-blue)] opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
          {htbChallenges.length > 10 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpandedChallenges(!expandedChallenges)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-blue)] text-[var(--text-primary)] hover:text-[var(--cyber-blue)] transition-all group"
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
