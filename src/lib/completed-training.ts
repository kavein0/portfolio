export type TrainingProvider = "Basel LEARN" | "IBM" | "TryHackMe!" | "EC-Council" | "PicoCTF";

export type CompletedTraining = {
  name: string;
  provider: TrainingProvider;
  kind: "Course" | "Learning path" | "Challenge";
  status: "Completed";
  evidenceUrl?: string;
};

// Completion is recorded at the portfolio owner's request. Evidence and dates
// remain optional so completion never implies an independently verified credential.
export const completedTraining: CompletedTraining[] = [
  ...[
    "Open-source Intelligence",
    "Data Cleaning and Harvesting",
    "Operational Analysis of Suspicious Transaction Reports",
    "Financial Analysis using Excel",
    "Visualise Cases and Flows of Money",
    "Source and Application of Funds Analysis",
  ].map((name): CompletedTraining => ({ name, provider: "Basel LEARN", kind: "Course", status: "Completed" })),
  ...[
    "Кібербезпека",
    "Блокчейн",
    "Хмарні обчислення",
    "Штучний інтелект",
  ].map((name): CompletedTraining => ({ name, provider: "IBM", kind: "Course", status: "Completed" })),
  ...[
    "Introduction to Cyber Security",
    "Pre Security",
    "Web Fundamentals",
  ].map((name): CompletedTraining => ({ name, provider: "TryHackMe!", kind: "Learning path", status: "Completed" })),
  ...[
    "Cybersecurity for Small and Medium Size Business",
    "Make In-house Hacking and Pentesting Lab",
    "Comprehensive Guide to Industrial Cybersecurity with IEC 62443-3 Standards",
    "Introduction to Dark Web, Anonymity, and Cryptocurrency",
    "Android Bug Bounty Hunting: Hunt Like a Rat",
    "Cisco LABS Crash Course",
    "A Practical Introduction to Cloud Computing",
    "Build Your Own NetApp Storage Lab. for Free",
    "Introduction to SAN and NAS Storage",
    "SQL Injection Attacks",
    "Cybersecurity for Businesses - The Fundamental Edition",
  ].map((name): CompletedTraining => ({ name, provider: "EC-Council", kind: "Course", status: "Completed" })),
  ...[
    "Super SSH",
    "Local Authority",
    "dont-use-client-side",
    "Who are you?",
    "Big Zip",
    "Web Decode",
  ].map((name): CompletedTraining => ({ name, provider: "PicoCTF", kind: "Challenge", status: "Completed" })),
];

export const trainingProviders: TrainingProvider[] = ["Basel LEARN", "IBM", "TryHackMe!", "EC-Council", "PicoCTF"];

export function findCompletedTraining(provider: string, names: string[]) {
  const normalized = names.map((name) => name.toLowerCase().trim());
  return completedTraining.find((record) => record.provider === provider && normalized.includes(record.name.toLowerCase().trim()));
}
