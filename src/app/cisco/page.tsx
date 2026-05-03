"use client";

import { motion } from "framer-motion";
import { certifications, siteConfig } from "@/lib/data";
import { Award, Calendar, ExternalLink, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { useState } from "react";

export default function CiscoPage() {
  const [expanded, setExpanded] = useState(false);
  const visibleCerts = expanded ? certifications : certifications.slice(0, 10);

  return (
    <div className="container-custom min-h-screen page-pad">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 md:mb-2 glitch-wrapper glitch-blue">
              <span className="glitch-text" data-text="Cisco Networking Academy">Cisco Networking Academy</span>{" "}
              <span className="text-[var(--cyber-blue)]">Certifications</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-mono text-lg">
              My academic achievements and specialized training completed through Cisco NetAcad.
            </p>
          </div>
          <a
            href={siteConfig.cisco?.profileUrl ?? "https://www.netacad.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--cyber-blue)]/10 text-[var(--cyber-blue)] border border-[var(--cyber-blue)]/20 hover:bg-[var(--cyber-blue)]/20 hover:border-[var(--cyber-blue)]/50 transition-all font-mono text-sm whitespace-nowrap group w-full md:w-auto"
          >
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
            View NetAcad Profile
          </a>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-16 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-blue)] transition-all group flex flex-col items-center text-center"
        >
          <Award className="w-8 h-8 mb-4 text-[var(--cyber-blue)] group-hover:scale-110 transition-transform" />
          <div className="text-3xl font-display font-bold text-[var(--text-primary)]">{certifications.length}</div>
          <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Certifications</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-blue)] transition-all group flex flex-col items-center text-center"
        >
          <GraduationCap className="w-8 h-8 mb-4 text-[var(--cyber-blue)] group-hover:scale-110 transition-transform" />
          <div className="text-3xl font-display font-bold text-[var(--text-primary)]">NetAcad</div>
          <div className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider">Platform</div>
        </motion.div>
      </div>

      {/* Certificates List */}
      <div className="space-y-4">
        {visibleCerts.map((cert, i) => {
          const Wrapper = cert.url ? "a" : "div";
          const wrapperProps = cert.url
            ? { href: cert.url, target: "_blank", rel: "noopener noreferrer", className: "block group" }
            : { className: "block" };

          return (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Wrapper {...wrapperProps}>
                <div
                  className={`p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-default)] ${
                    cert.url ? "group-hover:border-[var(--cyber-blue)] group-hover:bg-[var(--cyber-blue)]/5" : ""
                  } transition-all relative overflow-hidden`}
                >
                  {/* Hover shimmer */}
                  {cert.url && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyber-blue)]/0 via-[var(--cyber-blue)]/5 to-[var(--cyber-blue)]/0 opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out" />
                  )}

                  <div className="relative z-10 flex justify-between items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0 ${
                          cert.url ? "group-hover:scale-110" : ""
                        } transition-transform`}
                      >
                        <Award className="w-5 h-5 text-[var(--cyber-blue)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-base font-bold text-[var(--text-primary)] ${
                            cert.url ? "group-hover:text-[var(--cyber-blue)]" : ""
                          } transition-colors whitespace-normal break-words line-clamp-2`}
                        >
                          {cert.name}
                        </h3>
                        <p className="text-sm font-mono text-[var(--text-muted)] mt-0.5 truncate">{cert.issuer}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-2 text-sm font-mono text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-3 py-1.5 rounded-full">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{cert.date}</span>
                      </div>
                      <div className="flex items-center justify-center text-sm font-bold font-mono text-[var(--cyber-blue)] bg-[var(--cyber-blue)]/10 border border-[var(--cyber-blue)]/30 rounded-md w-8 h-8">
                        {cert.date.includes("2026") ? "6" : "5"}
                      </div>
                      <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                        {cert.url && (
                          <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--cyber-blue)] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>

      {/* Show more / less */}
      {certifications.length > 10 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-blue)] text-[var(--text-primary)] hover:text-[var(--cyber-blue)] transition-all group"
          >
            {expanded ? (
              <>Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /></>
            ) : (
              <>Show More ({certifications.length - 10}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
