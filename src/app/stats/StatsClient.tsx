"use client";

import { motion } from "framer-motion";
import { TryHackMeStats, HackTheBoxStats, siteConfig } from "@/lib/data";
import { Trophy, Target, Zap, Shield, Box, Terminal, ExternalLink } from "lucide-react";
import SkillsSection from "@/components/sections/SkillsSection";

export default function StatsClient({
  thmStats,
  htbStats,
}: {
  thmStats: TryHackMeStats;
  htbStats: HackTheBoxStats;
}) {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[var(--cyber-blue)]" />
            <span className="font-mono text-xs text-[var(--cyber-blue)] tracking-widest uppercase">
              Metrics
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-4 uppercase">
            Cyber <span className="text-[var(--cyber-blue)]">Stats</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl">
            Live overview of my performance on major cybersecurity platforms and technical skill distribution.
          </p>
        </motion.div>

        {/* Platform Summaries */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* TryHackMe Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 border-l-2 border-l-[var(--cyber-green)] relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--cyber-green)]/5 rounded-bl-full -z-10 group-hover:bg-[var(--cyber-green)]/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[var(--cyber-green)]" />
                  TryHackMe
                </h2>
                <a
                  href={siteConfig.tryhackme.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--cyber-green)] flex items-center gap-1 mt-1 transition-colors"
                >
                  @{siteConfig.tryhackme.username} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]/50 border border-[var(--border-default)]">
                <div className="text-xs font-mono text-[var(--text-muted)] mb-1 flex items-center gap-2">
                  <Trophy className="w-3 h-3 text-[#ffbd2e]" /> Rank
                </div>
                <div className="text-xl font-bold text-[var(--text-primary)]">
                  {thmStats.rank.toLocaleString()}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]/50 border border-[var(--border-default)]">
                <div className="text-xs font-mono text-[var(--text-muted)] mb-1 flex items-center gap-2">
                  <Target className="w-3 h-3 text-[var(--cyber-green)]" /> Rooms
                </div>
                <div className="text-xl font-bold text-[var(--text-primary)]">
                  {thmStats.roomsCompleted}
                </div>
              </div>
            </div>
          </motion.div>

          {/* HackTheBox Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 border-l-2 border-l-[var(--cyber-blue)] relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--cyber-blue)]/5 rounded-bl-full -z-10 group-hover:bg-[var(--cyber-blue)]/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Box className="w-6 h-6 text-[var(--cyber-blue)]" />
                  HackTheBox
                </h2>
                <a
                  href={siteConfig.hackthebox.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-muted)] hover:text-[var(--cyber-blue)] flex items-center gap-1 mt-1 transition-colors"
                >
                  @{siteConfig.hackthebox.username} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]/50 border border-[var(--border-default)]">
                <div className="text-xs font-mono text-[var(--text-muted)] mb-1 flex items-center gap-2">
                  <Trophy className="w-3 h-3 text-[var(--cyber-blue)]" /> Rank
                </div>
                <div className="text-xl font-bold text-[var(--text-primary)] capitalize">
                  {htbStats.rank}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-[var(--bg-tertiary)]/50 border border-[var(--border-default)]">
                <div className="text-xs font-mono text-[var(--text-muted)] mb-1 flex items-center gap-2">
                  <Terminal className="w-3 h-3 text-[var(--cyber-purple)]" /> Machine Owns
                </div>
                <div className="text-xl font-bold text-[var(--text-primary)]">
                  {htbStats.systemOwns}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="-mt-10">
        <SkillsSection />
      </div>
    </div>
  );
}
