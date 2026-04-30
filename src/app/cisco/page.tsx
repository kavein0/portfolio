"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import { Award, Calendar, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function CiscoPage() {
  const [expanded, setExpanded] = useState(false);
  const visibleCerts = expanded ? certifications : certifications.slice(0, 10);

  return (
    <div className="container-custom min-h-screen" style={{ paddingTop: "8rem", paddingBottom: "6rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--text-primary)] mb-4 glitch-wrapper glitch-blue">
          <span className="glitch-text" data-text="Cisco Networking Academy">Cisco Networking Academy</span> <span className="text-[var(--cyber-blue)]">Certifications</span>
        </h1>
        <p className="text-[var(--text-secondary)] font-mono text-lg">
          My academic achievements and specialized training completed through Cisco NetAcad.
        </p>
      </motion.div>

      <div className="relative border-l border-[var(--border-default)] ml-4 md:ml-8 pl-8 md:pl-12 py-4 space-y-12">
        {visibleCerts.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-6 w-4 h-4 rounded-full bg-[var(--cyber-blue)] shadow-[0_0_10px_var(--cyber-blue)] border-4 border-[var(--bg-primary)]" />

            {(() => {
              const Wrapper = cert.url ? 'a' : 'div';
              const wrapperProps = cert.url 
                ? { href: cert.url, target: "_blank", rel: "noopener noreferrer", className: "block group" } 
                : { className: "block" };

              return (
                <Wrapper {...wrapperProps}>
                  <div className={`p-6 md:p-8 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-default)] ${cert.url ? 'group-hover:border-[var(--cyber-blue)]' : ''} transition-all relative overflow-hidden`}>
                    {/* Hover Glow */}
                    {cert.url && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[var(--cyber-blue)]/0 via-[var(--cyber-blue)]/5 to-[var(--cyber-blue)]/0 opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out" />
                    )}
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className={`w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0 ${cert.url ? 'group-hover:scale-110' : ''} transition-transform`}>
                          <Award className="w-6 h-6 text-[var(--cyber-blue)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-xl font-bold text-[var(--text-primary)] ${cert.url ? 'group-hover:text-[var(--cyber-blue)]' : ''} transition-colors truncate whitespace-normal break-words line-clamp-2`}>
                            {cert.name}
                          </h3>
                          <p className="text-sm font-mono text-[var(--text-muted)] mt-1 truncate">
                            {cert.issuer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mt-4 md:mt-0 ml-16 md:ml-0 shrink-0">
                        <div className="flex items-center justify-center gap-2 text-sm font-mono text-[var(--text-muted)] bg-[var(--bg-tertiary)] px-3 py-1.5 rounded-full w-[145px]">
                          <Calendar className="w-4 h-4 shrink-0" />
                          <span>{cert.date}</span>
                        </div>
                        <div className="flex items-center justify-center text-sm font-mono text-[var(--cyber-blue)] bg-[var(--cyber-blue)]/10 border border-[var(--cyber-blue)]/30 px-3 py-1.5 rounded-full w-[110px]">
                          Semester {cert.date.includes("2026") ? "6" : "5"}
                        </div>
                        <div className="w-5 h-5 shrink-0 flex items-center justify-center ml-2">
                          {cert.url && (
                            <ExternalLink className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--cyber-blue)] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Wrapper>
              );
            })()}
          </motion.div>
        ))}

        {certifications.length > 10 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--cyber-blue)] text-[var(--text-primary)] hover:text-[var(--cyber-blue)] transition-all group"
            >
              {expanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  Show More ({certifications.length - 10}) <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
