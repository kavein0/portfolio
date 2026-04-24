// ============================================================
// Site-wide configuration — single source of truth
// ============================================================

export const siteConfig = {
  name: "Євгеній Воронянський",
  nameEn: "Yevhenii Voronianskyi",
  title: "Cybersecurity Student & Researcher",
  university: "Kharkiv National University of Internal Affairs",
  universityShort: "KNUIA",
  universityUa: "Харківський національний університет внутрішніх справ",
  year: "3rd Year Cadet",
  department: "Faculty of Cybersecurity",

  description:
    "Portfolio of Євгеній Воронянський — 3rd-year cybersecurity cadet at KNUIA, specializing in penetration testing, DevOps, and digital forensics.",

  socials: {
    github: "https://github.com/kavein0",
    linkedin: "https://linkedin.com/in/voronianskyi",
    telegram: "https://t.me/Ranelin",
    email: "bprooturbo@gmail.com",
  },

  tryhackme: {
    username: "Larein",
    profileUrl: "https://tryhackme.com/p/Larein",
  },
  hackthebox: {
    username: "Ranelin",
    userId: 1945093,
    profileUrl: "https://app.hackthebox.com/public/users/1945093",
  },
} as const;

// ============================================================
// Skills data
// ============================================================

export interface Skill {
  name: string;
  level: number; // 0–100
  category: "offensive" | "defensive" | "devops" | "programming" | "networking";
  icon?: string;
}

export const skills: Skill[] = [
  // Offensive
  { name: "Pentesting Fundamentals", level: 75, category: "offensive" },
  { name: "Web App Security", level: 65, category: "offensive" },
  { name: "Network Exploitation", level: 70, category: "offensive" },
  { name: "OSINT", level: 80, category: "offensive" },

  // Defensive
  { name: "Digital Forensics", level: 75, category: "defensive" },
  { name: "Cryptography", level: 65, category: "defensive" },
  { name: "Malware / AV Analysis", level: 55, category: "defensive" },

  // Networking
  { name: "Network Routing & Switching", level: 85, category: "networking" },
  { name: "Network Security", level: 80, category: "networking" },
  { name: "Packet Analysis", level: 70, category: "networking" },

  // DevOps
  { name: "Linux Administration", level: 75, category: "devops" },
  { name: "Docker", level: 50, category: "devops" },
  { name: "Git / Version Control", level: 60, category: "devops" },

  // Programming
  { name: "Bash / Shell", level: 70, category: "programming" },
  { name: "Python", level: 65, category: "programming" },
  { name: "SQL", level: 50, category: "programming" },
  { name: "C / C++", level: 45, category: "programming" },
];

export const skillCategories = [
  { id: "offensive", label: "Offensive Security", color: "#ff3333" },
  { id: "defensive", label: "Defensive Security", color: "#00d4ff" },
  { id: "devops", label: "DevOps & Infra", color: "#00ff88" },
  { id: "programming", label: "Programming", color: "#7c3aed" },
  { id: "networking", label: "Networking", color: "#ff8800" },
] as const;

// ============================================================
// Certifications
// ============================================================

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  badge?: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    name: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "Jun 17, 2024",
  },
  {
    name: "Network Support and Security",
    issuer: "Cisco Networking Academy",
    date: "Nov 13, 2023",
  },
  {
    name: "Network Addressing and Basic Troubleshooting",
    issuer: "Cisco Networking Academy",
    date: "Nov 13, 2023",
  },
  {
    name: "Основи роботи в мережі",
    issuer: "Cisco Networking Academy",
    date: "Nov 13, 2023",
  },
  {
    name: "Мережні пристрої та початкове налаштування",
    issuer: "Cisco Networking Academy",
    date: "Oct 28, 2023",
  },
  {
    name: "Основи мережних протоколів",
    issuer: "Cisco Networking Academy",
    date: "Oct 28, 2023",
  },
  {
    name: "Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    date: "Oct 28, 2023",
  },
  {
    name: "Computer Hardware Basics",
    issuer: "Cisco Networking Academy",
    date: "Oct 28, 2023",
  },
];

// ============================================================
// TryHackMe / HackTheBox type definitions
// ============================================================

export interface TryHackMeStats {
  rank: string;
  points: number;
  roomsCompleted: number;
  streak: number;
  badges: number;
  level: number;
  avatar?: string;
}

export interface HackTheBoxStats {
  rank: string;
  points: number;
  ownership: number;
  userOwns: number;
  systemOwns: number;
  challenges: number;
  ranking: number;
  avatar?: string;
}

// ============================================================
// Detailed TryHackMe Data
// ============================================================

export const thmRooms = [
  { name: "Investigating Windows", type: "Room", date: "2024", url: "https://tryhackme.com/room/investigatingwindows" },
  { name: "Blue", type: "Room", date: "2024", url: "https://tryhackme.com/room/blue" },
  { name: "OhSINT", type: "Room", date: "2024", url: "https://tryhackme.com/room/ohsint" },
  { name: "Forensics", type: "Room", date: "2024", url: "https://tryhackme.com/room/forensics" },
  { name: "Encryption - Crypto 101", type: "Room", date: "2024", url: "https://tryhackme.com/room/encryptioncrypto101" },
  { name: "Memory Forensics", type: "Room", date: "2024", url: "https://tryhackme.com/room/memoryforensics" },
  { name: "Pentesting Fundamentals", type: "Room", date: "2024", url: "https://tryhackme.com/room/pentestingfundamentals" },
  { name: "Passive Reconnaissance", type: "Room", date: "2024", url: "https://tryhackme.com/room/passiverecon" },
  { name: "Active Reconnaissance", type: "Room", date: "2024", url: "https://tryhackme.com/room/activerecon" },
  { name: "Cyber Kill Chain", type: "Room", date: "2024", url: "https://tryhackme.com/room/cyberkillchain" },
  { name: "Introduction to Antivirus", type: "Room", date: "2024", url: "https://tryhackme.com/room/introtoav" },
  { name: "Introduction to CryptOps", type: "Room", date: "2024", url: "https://tryhackme.com/room/introtocryptops" },
  { name: "CyberChef: The Basics", type: "Room", date: "2024", url: "https://tryhackme.com/room/cyberchefbasics" },
  { name: "Cryptography Basics", type: "Room", date: "2024", url: "https://tryhackme.com/room/cryptographybasics" },
  { name: "Windows Forensics 1", type: "Room", date: "2024", url: "https://tryhackme.com/room/windowsforensics1" },
  { name: "Intro to Digital Forensics", type: "Room", date: "2024", url: "https://tryhackme.com/room/introdigitalforensics" },
  { name: "Tony the Tiger", type: "Room", date: "2024", url: "https://tryhackme.com/room/tonythetiger" },
  { name: "NahamStore", type: "Room", date: "2024", url: "https://tryhackme.com/room/nahamstore" },
  { name: "Neighbour", type: "Room", date: "2024", url: "https://tryhackme.com/room/neighbour" },
  { name: "SSRF", type: "Room", date: "2024", url: "https://tryhackme.com/room/ssrf" },
];

export const thmBadges = [
  { name: "OhSINT", description: "Completing the OhSINT room", url: "https://tryhackme.com/p/Larein" },
  { name: "Blue", description: "Hacking into Windows via EternalBlue", url: "https://tryhackme.com/p/Larein" },
];

// ============================================================
// Detailed HackTheBox Data
// ============================================================

export const htbMachines = [
  { name: "Overwatch", os: "", difficulty: "", date: "2024", url: "https://app.hackthebox.com/machines/Overwatch" },
  { name: "Interpreter", os: "", difficulty: "", date: "2024", url: "https://app.hackthebox.com/machines/Interpreter" },
  { name: "Pterodactyl", os: "", difficulty: "", date: "2024", url: "https://app.hackthebox.com/machines/Pterodactyl" },
  { name: "MonitorsFour", os: "", difficulty: "", date: "2024", url: "https://app.hackthebox.com/machines/MonitorsFour" },
  { name: "WingData", os: "", difficulty: "", date: "2024", url: "https://app.hackthebox.com/machines/WingData" },
  { name: "Soulmate", os: "", difficulty: "", date: "2024", url: "https://app.hackthebox.com/machines/Soulmate" },
  { name: "Outbound", os: "", difficulty: "", date: "2024", url: "https://app.hackthebox.com/machines/Outbound" },
  { name: "Editor", os: "", difficulty: "", date: "2024", url: "https://app.hackthebox.com/machines/Editor" },
];

export const htbChallenges = [
  { name: "Micro Storage", category: "Pwn", difficulty: "", url: "https://app.hackthebox.com/challenges/Micro%20Storage" },
  { name: "Lucky Dice", category: "Misc", difficulty: "", url: "https://app.hackthebox.com/challenges/Lucky%20Dice" },
  { name: "Not Posixtive", category: "Reversing", difficulty: "", url: "https://app.hackthebox.com/challenges/Not%20Posixtive" },
  { name: "Broken Shell", category: "Misc", difficulty: "", url: "https://app.hackthebox.com/challenges/Broken%20Shell" },
  { name: "CubeMadness2", category: "Misc", difficulty: "", url: "https://app.hackthebox.com/challenges/CubeMadness2" },
  { name: "Execute", category: "Pwn", difficulty: "", url: "https://app.hackthebox.com/challenges/Execute" },
  { name: "r0bob1rd", category: "Forensics", difficulty: "", url: "https://app.hackthebox.com/challenges/r0bob1rd" },
  { name: "Restaurant", category: "Web", difficulty: "", url: "https://app.hackthebox.com/challenges/Restaurant" },
  { name: "You know 0xDiablos", category: "Pwn", difficulty: "", url: "https://app.hackthebox.com/challenges/You%20know%200xDiablos" },
  { name: "CubeMadness1", category: "Misc", difficulty: "", url: "https://app.hackthebox.com/challenges/CubeMadness1" },
];
