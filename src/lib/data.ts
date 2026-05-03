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
  cisco: {
    profileUrl: "https://www.netacad.com",
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
  // === Semester 5 (2024–2025) ===
  {
    name: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    date: "Jun 17, 2024",
    url: "https://www.credly.com/badges/565b66b4-a45c-4dde-be6c-19d737d9b2a4",
  },
  {
    name: "Computer Hardware Basics",
    issuer: "Cisco Networking Academy",
    date: "Oct 28, 2025",
    url: "https://www.credly.com/badges/57d32137-a1a7-4444-b89c-7529443d7fab",
  },
  {
    name: "Operating Systems Basics",
    issuer: "Cisco Networking Academy",
    date: "Oct 28, 2025",
    url: "https://www.credly.com/badges/5f18bc0c-2e84-40cf-bf92-24b072c70414",
  },
  {
    name: "Мережні пристрої та початкове налаштування",
    issuer: "Cisco Networking Academy",
    date: "Oct 28, 2025",
    url: "https://www.credly.com/badges/af9194b0-2e5f-4ef6-abab-473da4b5eae3",
  },
  {
    name: "Основи роботи в мережі",
    issuer: "Cisco Networking Academy",
    date: "Nov 13, 2025",
    url: "https://www.credly.com/badges/82f3360d-1c52-44e9-8e98-6200e017a82e",
  },
  {
    name: "Network Addressing and Basic Troubleshooting",
    issuer: "Cisco Networking Academy",
    date: "Nov 13, 2025",
    url: "https://www.credly.com/badges/2bc79cb5-80c7-44d5-b566-fec2208b44cd",
  },
  {
    name: "Network Support and Security",
    issuer: "Cisco Networking Academy",
    date: "Nov 13, 2025",
    url: "https://www.credly.com/badges/e2165746-646b-4360-8370-f26ecdb5f4a2",
  },
  // === Semester 6 (2026) ===
  {
    name: "Управління загрозами у кібербезпеці",
    issuer: "Cisco Networking Academy",
    date: "Apr 29, 2026",
  },
  {
    name: "Безпека кінцевих вузлів",
    issuer: "Cisco Networking Academy",
    date: "Apr 29, 2026",
  },
  {
    name: "Початок роботи з Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "Apr 30, 2026",
  },
  {
    name: "Захист мережі",
    issuer: "Cisco Networking Academy",
    date: "Apr 30, 2026",
  },
  {
    name: "Вступ до кібербезпеки",
    issuer: "Cisco Networking Academy",
    date: "Apr 30, 2026",
  },
  {
    name: "Exploring Networking with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "Apr 30, 2026",
  },
  {
    name: "Exploring IoT with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "Apr 30, 2026",
  },
  {
    name: "Вступ до IoT та цифрової трансформації",
    issuer: "Cisco Networking Academy",
    date: "Apr 30, 2026",
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
  { name: "Forensics", type: "Room", difficulty: "Hard", date: "2024", url: "https://tryhackme.com/room/forensics" },
  { name: "Encryption - Crypto 101", type: "Room", difficulty: "Medium", date: "2024", url: "https://tryhackme.com/room/encryptioncrypto101" },
  { name: "Memory Forensics", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/memoryforensics" },
  { name: "Pentesting Fundamentals", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/pentestingfundamentals" },
  { name: "Passive Reconnaissance", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/passiverecon" },
  { name: "Active Reconnaissance", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/activerecon" },
  { name: "Cyber Kill Chain", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/cyberkillchain" },
  { name: "Windows Forensics 1", type: "Room", difficulty: "Medium", date: "2024", url: "https://tryhackme.com/room/windowsforensics1" },
  { name: "Intro to Digital Forensics", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/introdigitalforensics" },
  { name: "Introduction to Antivirus", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/introtoav" },
  { name: "Introduction to CryptOps", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/introtocryptops" },
  { name: "CyberChef: The Basics", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/cyberchefbasics" },
  { name: "Cryptography Basics", type: "Room", difficulty: "Easy", date: "2024", url: "https://tryhackme.com/room/cryptographybasics" },
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
  // === Semester 5 (2025, excl. MonitorsFour) ===
  { name: "Outbound",     os: "Linux",   difficulty: "Easy",   date: "2025", url: "https://labs.hackthebox.com/achievement/machine/1945093/672" },
  { name: "Editor",       os: "Linux",   difficulty: "Easy",   date: "2025", url: "https://labs.hackthebox.com/achievement/machine/1945093/684" },
  { name: "Soulmate",     os: "Linux",   difficulty: "Easy",   date: "2025", url: "https://labs.hackthebox.com/achievement/machine/1945093/721" },
  { name: "Expressway",   os: "Linux",   difficulty: "Easy",   date: "2025", url: "https://labs.hackthebox.com/achievement/machine/1945093/736" },
  // === Semester 6 (2026 + MonitorsFour) ===
  { name: "MonitorsFour", os: "Windows", difficulty: "Easy",   date: "2025", url: "https://labs.hackthebox.com/achievement/machine/1945093/814" },
  { name: "Overwatch",    os: "Windows", difficulty: "Medium", date: "2026", url: "https://labs.hackthebox.com/achievement/machine/1945093/826" },
  { name: "Facts",        os: "Linux",   difficulty: "Easy",   date: "2026", url: "https://labs.hackthebox.com/achievement/machine/1945093/829" },
  { name: "WingData",     os: "Linux",   difficulty: "Easy",   date: "2026", url: "https://labs.hackthebox.com/achievement/machine/1945093/835" },
  { name: "Interpreter",  os: "Linux",   difficulty: "Medium", date: "2026", url: "https://labs.hackthebox.com/achievement/machine/1945093/841" },
  { name: "CCTV",         os: "Linux",   difficulty: "Easy",   date: "2026", url: "https://labs.hackthebox.com/achievement/machine/1945093/847" },
];

export const htbChallenges = [
  // === Semester 5 ===
  { name: "You know 0xDiablos",   category: "Pwn",     difficulty: "Easy",      url: "https://labs.hackthebox.com/achievement/challenge/1945093/106" },
  { name: "Restaurant",           category: "Pwn",     difficulty: "Easy",      url: "https://labs.hackthebox.com/achievement/challenge/1945093/200" },
  { name: "Execute",              category: "Pwn",     difficulty: "Easy",      url: "https://labs.hackthebox.com/achievement/challenge/1945093/640" },
  { name: "CubeMadness1",         category: "GamePwn", difficulty: "Very Easy", url: "https://labs.hackthebox.com/achievement/challenge/1945093/302" },
  // === Semester 6 ===
  { name: "CubeMadness2",         category: "GamePwn", difficulty: "Easy",      url: "https://labs.hackthebox.com/achievement/challenge/1945093/305" },
  { name: "Micro Storage",        category: "Misc",    difficulty: "Easy",      url: "https://labs.hackthebox.com/achievement/challenge/1945093/252" },
  { name: "r0bob1rd",             category: "Pwn",     difficulty: "Easy",      url: "https://labs.hackthebox.com/achievement/challenge/1945093/837" },
  { name: "Broken Shell",         category: "Misc",    difficulty: "Easy",      url: "https://labs.hackthebox.com/achievement/challenge/1945093/883" },
  { name: "Not Posixtive",        category: "Misc",    difficulty: "Easy",      url: "https://labs.hackthebox.com/achievement/challenge/1945093/952" },
  { name: "Lucky Dice",           category: "Misc",    difficulty: "Very Easy", url: "https://labs.hackthebox.com/achievement/challenge/1945093/1180" },
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
  // === Semester 5 ===
  { name: "Linux Fundamentals",                  status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/18" },
  { name: "Windows Fundamentals",                 status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/49" },
  { name: "MacOS Fundamentals",                   status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/157" },
  { name: "Setting Up",                           status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/87" },
  // === Semester 6 ===
  { name: "File Inclusion",                       status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/23" },
  { name: "File Transfers",                       status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/24" },
  { name: "SQL Injection Fundamentals",           status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/33" },
  { name: "Introduction To Networking",           status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/34" },
  { name: "Web Requests",                         status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/35" },
  { name: "Using The Metasploit Framework",       status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/39" },
  { name: "Attacking Web Applications With Ffuf", status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/54" },
  { name: "Introduction To Active Directory",     status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/74" },
  { name: "Introduction To Web Applications",     status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/75" },
  { name: "Intro To Network Traffic Analysis",    status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/81" },
  { name: "Vulnerability Assessment",             status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/108" },
  { name: "Brief Intro To Hardware Attacks",      status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/230" },
  { name: "Security Incident Reporting",          status: "Completed", url: "https://academy.hackthebox.com/achievement/1315128/238" },
];

export interface HTBAcademyBadge {
  name: string;
  description: string;
  url: string;
}

export const htbAcademyBadges: HTBAcademyBadge[] = [
  // === Semester 5 ===
  { name: "Our favorite seabird",            description: "Linux Fundamentals module completed",                 url: "https://academy.hackthebox.com/achievement/badge/e60e345f-a06c-11ef-864f-bea50ffe6cb4" },
  { name: "Crawl, walk, run",                description: "Windows Fundamentals module completed",              url: "https://academy.hackthebox.com/achievement/badge/0c5915d6-a06f-11ef-864f-bea50ffe6cb4" },
  { name: "An apple a day...",               description: "MacOS Fundamentals module completed",                url: "https://academy.hackthebox.com/achievement/badge/8e561844-b444-11f0-9254-bea50ffe6cb4" },
  { name: "Start building your arsenal",     description: "Setting Up module completed",                        url: "https://academy.hackthebox.com/achievement/badge/56778ec4-b443-11f0-9254-bea50ffe6cb4" },
  // === Semester 6 ===
  { name: "Every road leads back to root",   description: "File Inclusion module completed",                    url: "https://academy.hackthebox.com/achievement/badge/97a1430d-439a-11f1-9254-bea50ffe6cb4" },
  { name: "Airborne delivery",               description: "File Transfers module completed",                    url: "https://academy.hackthebox.com/achievement/badge/d4186cff-439a-11f1-9254-bea50ffe6cb4" },
  { name: "DROP your weapon",                description: "SQL Injection Fundamentals module completed",        url: "https://academy.hackthebox.com/achievement/badge/26aff55e-439b-11f1-9254-bea50ffe6cb4" },
  { name: "Everything is connected",         description: "Introduction to Networking module completed",        url: "https://academy.hackthebox.com/achievement/badge/044b5e1f-4356-11f1-9254-bea50ffe6cb4" },
  { name: "Your request is my demand",       description: "Web Requests module completed",                      url: "https://academy.hackthebox.com/achievement/badge/bb642bf8-4359-11f1-9254-bea50ffe6cb4" },
  { name: "Combine the modules",             description: "Using The Metasploit Framework module completed",    url: "https://academy.hackthebox.com/achievement/badge/96b4c714-4399-11f1-9254-bea50ffe6cb4" },
  { name: "Fuzzing is power",                description: "Attacking Web Applications with Ffuf module completed", url: "https://academy.hackthebox.com/achievement/badge/e42d1761-4399-11f1-9254-bea50ffe6cb4" },
  { name: "Your white belt training begins", description: "Introduction to Active Directory module completed",  url: "https://academy.hackthebox.com/achievement/badge/2df7ab64-435b-11f1-9254-bea50ffe6cb4" },
  { name: "Developer",                       description: "Introduction to Web Applications module completed",  url: "https://academy.hackthebox.com/achievement/badge/14ac055c-4399-11f1-9254-bea50ffe6cb4" },
  { name: "Lurk in the packets",             description: "Intro to Network Traffic Analysis module completed", url: "https://academy.hackthebox.com/achievement/badge/78b20bad-4358-11f1-9254-bea50ffe6cb4" },
  { name: "Light in the dark",               description: "Vulnerability Assessment module completed",          url: "https://academy.hackthebox.com/achievement/badge/2aa06747-439a-11f1-9254-bea50ffe6cb4" },
  { name: "Humanoid",                        description: "Brief Intro To Hardware Attacks module completed",   url: "https://academy.hackthebox.com/achievement/badge/50255da2-439b-11f1-9254-bea50ffe6cb4" },
  { name: "Chronicle champion",              description: "Security Incident Reporting module completed",       url: "https://academy.hackthebox.com/achievement/badge/49abd452-4399-11f1-9254-bea50ffe6cb4" },
  { name: "Unwavering User",                 description: "Awarded when you achieve your first weekly streak",  url: "https://academy.hackthebox.com/achievement/badge/901ab868-199b-11ef-b18d-bea50ffe6cb4" },
  { name: "Cyber Rookie 365",                description: "Awarded after one year of learning at HTB Academy",  url: "https://academy.hackthebox.com/achievement/badge/a8f9e1b1-3946-11f0-bcfd-bea50ffe6cb4" },
];

