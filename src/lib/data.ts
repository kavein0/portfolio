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
  { name: "Pentesting Fundamentals", level: 85, category: "offensive" },
  { name: "Web App Security", level: 75, category: "offensive" },
  { name: "Network Security", level: 85, category: "networking" },
  { name: "Windows Forensics", level: 78, category: "defensive" },
  { name: "Linux System Internals", level: 82, category: "programming" },
  { name: "Digital Forensics", level: 70, category: "defensive" },
  { name: "Reverse Engineering", level: 55, category: "offensive" },
  { name: "Python for Security", level: 75, category: "programming" },
  { name: "C++ for Low-Level", level: 50, category: "programming" },
  { name: "Docker & Container Security", level: 60, category: "devops" },

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
  { name: "Investigating Windows", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/investigatingwindows" },
  { name: "Blue", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/blue" },
  { name: "OhSINT", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/ohsint" },
  { name: "Forensics", type: "Room", difficulty: "Medium", date: "2024", url: "https://tryhackme.com/room/forensics" },
  { name: "Encryption - Crypto 101", type: "Room", difficulty: "Medium", date: "2024", url: "https://tryhackme.com/room/encryptioncrypto101" },
  { name: "Memory Forensics", type: "Room", difficulty: "Medium", date: "2024", url: "https://tryhackme.com/room/memoryforensics" },
  { name: "Pentesting Fundamentals", type: "Room", difficulty: "Info", date: "2024", url: "https://tryhackme.com/room/pentestingfundamentals" },
  { name: "Passive Reconnaissance", type: "Room", difficulty: "Info", date: "2024", url: "https://tryhackme.com/room/passiverecon" },
  { name: "Active Reconnaissance", type: "Room", difficulty: "Info", date: "2024", url: "https://tryhackme.com/room/activerecon" },
  { name: "Cyber Kill Chain", type: "Room", difficulty: "Info", date: "2024", url: "https://tryhackme.com/room/cyberkillchain" },
  { name: "Introduction to Antivirus", type: "Room", difficulty: "Info", date: "2024", url: "https://tryhackme.com/room/introtoav" },
  { name: "Introduction to CryptOps", type: "Room", difficulty: "Info", date: "2024", url: "https://tryhackme.com/room/introtocryptops" },
  { name: "CyberChef: The Basics", type: "Room", difficulty: "Info", date: "2024", url: "https://tryhackme.com/room/cyberchefbasics" },
  { name: "Cryptography Basics", type: "Room", difficulty: "Info", date: "2024", url: "https://tryhackme.com/room/cryptographybasics" },
  { name: "Windows Forensics 1", type: "Room", difficulty: "Medium", date: "2024", url: "https://tryhackme.com/room/windowsforensics1" },
  { name: "Intro to Digital Forensics", type: "Room", difficulty: "Info", date: "2024", url: "https://tryhackme.com/room/introdigitalforensics" },
  { name: "Tony the Tiger", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/tonythetiger" },
  { name: "NahamStore", type: "Room", difficulty: "Medium", date: "2024", url: "https://tryhackme.com/room/nahamstore" },
  { name: "Neighbour", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/neighbour" },
  { name: "SSRF", type: "Room", difficulty: "Medium", date: "2024", url: "https://tryhackme.com/room/ssrf" },
];

export const thmBadges = [
  { name: "OhSINT", description: "Completing the OhSINT room", url: "https://tryhackme.com/p/Larein" },
  { name: "Blue", description: "Hacking into Windows via EternalBlue", url: "https://tryhackme.com/p/Larein" },
];

// ============================================================
// Detailed HackTheBox Data
// ============================================================

export const htbMachines = [
  { name: "CCTV", os: "Linux", difficulty: "Easy", date: "2026", url: "https://app.hackthebox.com/machines/CCTV" },
  { name: "Interpreter", os: "Linux", difficulty: "Medium", date: "2026", url: "https://app.hackthebox.com/machines/Interpreter" },
  { name: "WingData", os: "Linux", difficulty: "Easy", date: "2026", url: "https://app.hackthebox.com/machines/WingData" },
  { name: "Facts", os: "Linux", difficulty: "Easy", date: "2026", url: "https://app.hackthebox.com/machines/Facts" },
  { name: "Overwatch", os: "Windows", difficulty: "Medium", date: "2026", url: "https://app.hackthebox.com/machines/Overwatch" },
  { name: "MonitorsFour", os: "Windows", difficulty: "Easy", date: "2025", url: "https://app.hackthebox.com/machines/MonitorsFour" },
  { name: "Expressway", os: "Linux", difficulty: "Easy", date: "2025", url: "https://app.hackthebox.com/machines/Expressway" },
  { name: "Soulmate", os: "Linux", difficulty: "Easy", date: "2025", url: "https://app.hackthebox.com/machines/Soulmate" },
  { name: "Editor", os: "Linux", difficulty: "Easy", date: "2025", url: "https://app.hackthebox.com/machines/Editor" },
  { name: "Outbound", os: "Linux", difficulty: "Easy", date: "2025", url: "https://app.hackthebox.com/machines/Outbound" },
];

export const htbChallenges = [
  { name: "Lucky Dice", category: "Misc", difficulty: "Very Easy", url: "https://app.hackthebox.com/challenges/Lucky%20Dice" },
  { name: "CubeMadness1", category: "GamePwn", difficulty: "Very Easy", url: "https://app.hackthebox.com/challenges/CubeMadness1" },
  { name: "Not Posixtive", category: "Misc", difficulty: "Easy", url: "https://app.hackthebox.com/challenges/Not%20Posixtive" },
  { name: "Broken Shell", category: "Misc", difficulty: "Easy", url: "https://app.hackthebox.com/challenges/Broken%20Shell" },
  { name: "r0bob1rd", category: "Pwn", difficulty: "Easy", url: "https://app.hackthebox.com/challenges/r0bob1rd" },
  { name: "Execute", category: "Pwn", difficulty: "Easy", url: "https://app.hackthebox.com/challenges/Execute" },
  { name: "CubeMadness2", category: "GamePwn", difficulty: "Easy", url: "https://app.hackthebox.com/challenges/CubeMadness2" },
  { name: "Micro Storage", category: "Misc", difficulty: "Easy", url: "https://app.hackthebox.com/challenges/Micro%20Storage" },
  { name: "Restaurant", category: "Pwn", difficulty: "Easy", url: "https://app.hackthebox.com/challenges/Restaurant" },
  { name: "You know 0xDiablos", category: "Pwn", difficulty: "Easy", url: "https://app.hackthebox.com/challenges/You%20know%200xDiablos" },
];

// ============================================================
// Detailed HackTheBox Academy Data
// ============================================================

export interface HTBAcademyModule {
  name: string;
  status: string;
  url: string;
}

export const htbAcademyModules: HTBAcademyModule[] = [
  { name: "Linux Fundamentals", status: "Completed", url: "https://academy.hackthebox.com/module/details/18" },
  { name: "Introduction To Networking", status: "Completed", url: "https://academy.hackthebox.com/module/details/34" },
  { name: "Web Requests", status: "Completed", url: "https://academy.hackthebox.com/module/details/35" },
  { name: "Windows Fundamentals", status: "Completed", url: "https://academy.hackthebox.com/module/details/49" },
  { name: "Introduction To Active Directory", status: "Completed", url: "https://academy.hackthebox.com/module/details/167" },
  { name: "Intro To Network Traffic Analysis", status: "Completed", url: "https://academy.hackthebox.com/module/details/119" },
  { name: "Setting Up", status: "Completed", url: "https://academy.hackthebox.com/module/details/87" },
  { name: "MacOS Fundamentals", status: "Completed", url: "https://academy.hackthebox.com/module/details/168" },
];

export interface HTBAcademyBadge {
  name: string;
  description: string;
}

export const htbAcademyBadges: HTBAcademyBadge[] = [
  { name: "Our favorite seabird", description: "Linux Fundamentals module completed" },
  { name: "Everything is connected", description: "Introduction to Networking module completed" },
  { name: "Your request is my demand", description: "Web Requests module completed" },
  { name: "Crawl, walk, run", description: "Windows Fundamentals module completed" },
  { name: "Your white belt training begins", description: "Introduction to Active Directory module completed" },
  { name: "Lurk in the packets", description: "Intro To Network Traffic Analysis module completed" },
  { name: "Start building your arsenal", description: "Setting Up module completed" },
  { name: "An apple a day...", description: "MacOS Fundamentals module completed" },
];

