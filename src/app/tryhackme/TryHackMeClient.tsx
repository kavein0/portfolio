"use client";

import { motion } from "framer-motion";
import { TryHackMeStats, thmRooms, thmBadges } from "@/lib/data";
import { Trophy, Target, Zap, Shield, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function TryHackMeClient({ stats }: { stats: TryHackMeStats }) {
  const [expandedRooms, setExpandedRooms] = useState(false);
  const [expandedBadges, setExpandedBadges] = useState(false);

  const visibleRooms = expandedRooms ? thmRooms : thmRooms.slice(0, 10);
  const visibleBadges = expandedBadges ? thmBadges : thmBadges.slice(0, 10);
  return (
    <div className="container-custom min-h-screen" style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4">
          TryHackMe <span className="text-[var(--cyber-green)]">Profile</span>
        </h1>
        <p className="text-[var(--text-secondary)] font-mono text-lg">
          Detailed overview of my learning paths, completed rooms, and earned badges.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { label: "Rank", value: stats.rank || "...", icon: Trophy, color: "text-yellow-400" },
          { label: "Level", value: stats.level || "...", icon: Zap, color: "text-purple-400" },
          { label: "Rooms", value: stats.roomsCompleted || "...", icon: Target, color: "text-red-400" },
          { label: "Badges", value: stats.badges || "...", icon: Shield, color: "text-blue-400" },
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
        {/* Completed Rooms/Paths */}
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
            <Target className="text-[var(--cyber-green)]" /> Completed Paths & Rooms
          </h2>
          <div className="space-y-4">
            {visibleRooms.map((room, i) => (
              <motion.a
                key={room.name}
                href={room.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="block p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] hover:bg-[var(--cyber-green)]/5 transition-all group"
              >
                <div className="flex justify-between items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-green)] transition-colors truncate whitespace-normal break-words line-clamp-2">
                      {room.name}
                    </h3>
                    <span className="text-xs font-mono text-[var(--text-muted)] uppercase bg-[var(--bg-tertiary)] px-2 py-1 rounded mt-2 inline-block">
                      {room.type}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--cyber-green)] opacity-0 group-hover:opacity-100 transition-all" />
                </div>
              </motion.a>
            ))}
          </div>
          {thmRooms.length > 10 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpandedRooms(!expandedRooms)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-green)] text-[var(--text-primary)] hover:text-[var(--cyber-green)] transition-all group"
              >
                {expandedRooms ? (
                  <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                  <>Show More ({thmRooms.length - 10}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-3">
            <Shield className="text-[var(--cyber-blue)]" /> Earned Badges
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleBadges.map((badge, i) => (
              <motion.a
                key={badge.name}
                href={badge.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="block p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-blue)] hover:bg-[var(--cyber-blue)]/5 transition-all group text-center"
              >
                <div className="w-12 h-12 mx-auto bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-md font-bold text-[var(--text-primary)] group-hover:text-[var(--cyber-blue)] transition-colors">
                  {badge.name}
                </h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">{badge.description}</p>
              </motion.a>
            ))}
          </div>
          {thmBadges.length > 10 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setExpandedBadges(!expandedBadges)}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-blue)] text-[var(--text-primary)] hover:text-[var(--cyber-blue)] transition-all group"
              >
                {expandedBadges ? (
                  <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
                ) : (
                  <>Show More ({thmBadges.length - 10}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
