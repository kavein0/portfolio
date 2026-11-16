export type TrainingEvidence = {
  imageUrl: string;
  originalUrl: string;
  width: number;
  height: number;
  issuedOn: string;
  number: string;
  durationHours?: number;
};

function document(slug: string, number: string, issuedOn: string, durationHours?: number, height = 1101): TrainingEvidence {
  return {
    imageUrl: `/certificates/ec-council/${slug}.webp`,
    originalUrl: `/certificates/ec-council/${slug}.png`,
    width: 1428, height, issuedOn, number, durationHours,
  };
}

// Transcribed from the nine documents supplied by the portfolio owner.
export const ecCouncilEvidence: Record<string, TrainingEvidence> = {
  "Make In-house Hacking and Pentesting Lab": document("pentesting-lab", "459155", "2025-12-17", 2, 1102),
  "Cybersecurity for Businesses - The Fundamental Edition": document("cybersecurity-for-businesses", "447242", "2025-11-03", 2),
  "Cisco LABS Crash Course": document("cisco-labs", "494611", "2026-04-29", 1),
  "Introduction to Dark Web, Anonymity, and Cryptocurrency": document("dark-web", "453887", "2025-11-27", 1),
  "SQL Injection Attacks": document("sql-injection", "471989", "2026-02-03", 1),
  "A Practical Introduction to Cloud Computing": document("cloud-computing", "494609", "2026-04-29", 3),
  "Digital Forensics Essentials (DFE)": document("digital-forensics-essentials", "339936", "2024-06-27"),
  "Android Bug Bounty Hunting: Hunt Like a Rat": document("android-bug-bounty", "484486", "2026-03-20", 1),
  "Introduction to SAN and NAS Storage": document("san-nas-storage", "494601", "2026-04-29", 4),
};
