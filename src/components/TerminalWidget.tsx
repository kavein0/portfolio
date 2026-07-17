"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { Maximize2, Minimize2, Terminal as TerminalIcon, X } from "lucide-react";
import {
  certifications,
  htbAcademyBadges,
  htbAcademyModules,
  htbChallenges,
  htbMachines,
  siteConfig,
  thmRooms,
} from "@/lib/data";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandRecord {
  cmd: string;
  output: ReactNode;
}

type RouteTarget = {
  label: string;
  href: string;
  aliases: string[];
};

type ProofItem = {
  label: string;
  source: string;
  url: string;
};

const platformRoutes: RouteTarget[] = [
  { label: "Home", href: "/", aliases: ["home", "index", "root"] },
  { label: "TryHackMe", href: "/tryhackme", aliases: ["tryhackme", "thm"] },
  { label: "HackTheBox", href: "/hackthebox", aliases: ["hackthebox", "htb"] },
  { label: "HTB Academy", href: "/htb-academy", aliases: ["htb-academy", "academy", "htba"] },
  { label: "PicoCTF", href: "/picoctf", aliases: ["picoctf", "pico"] },
  { label: "CryptoHack", href: "/cryptohack", aliases: ["cryptohack", "crypto"] },
  { label: "Matrix", href: "/learning-matrix", aliases: ["matrix", "learning-matrix", "roadmap"] },
  { label: "Cisco", href: "/cisco", aliases: ["cisco", "certs", "certificates"] },
];

const routeAliases = platformRoutes.reduce<Record<string, RouteTarget>>((acc, route) => {
  route.aliases.forEach((alias) => {
    acc[alias] = route;
  });

  return acc;
}, {});

const picoStats = {
  challenges: 8,
  easy: 4,
  medium: 4,
};

const cryptoHackStats = {
  level: 10,
  experience: 2180,
  courses: 5,
  lessons: 64,
};

const proofItems: ProofItem[] = [
  ...certifications
    .filter((certificate) => certificate.url)
    .map((certificate) => ({
      label: certificate.name,
      source: certificate.issuer,
      url: certificate.url as string,
    })),
  ...thmRooms
    .filter((room) => room.url)
    .map((room) => ({
      label: room.name,
      source: `TryHackMe / ${room.difficulty}`,
      url: room.url as string,
    })),
  ...htbMachines.map((machine) => ({
    label: machine.name,
    source: `HackTheBox machine / ${machine.difficulty}`,
    url: machine.url,
  })),
  ...htbChallenges.map((challenge) => ({
    label: challenge.name,
    source: `HackTheBox challenge / ${challenge.category}`,
    url: challenge.url,
  })),
  ...htbAcademyModules.map((module) => ({
    label: module.name,
    source: "HTB Academy module",
    url: module.url,
  })),
  ...htbAcademyBadges.map((badge) => ({
    label: badge.name,
    source: "HTB Academy badge",
    url: badge.url,
  })),
];

const cryptoRoomCount = thmRooms.filter((room) => {
  const roomName = room.name.toLowerCase();

  return roomName.includes("crypto") || roomName.includes("rsa");
}).length;

export default function TerminalWidget({ isOpen, onClose }: TerminalProps) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandRecord[]>([
    { cmd: "systemctl status voron", output: "Status: ONLINE. Ready for commands. Type 'help' for available commands." },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const renderCommandList = (items: { command: string; description: string }[]) => (
    <div className="grid gap-1 text-[var(--text-secondary)]">
      {items.map((item) => (
        <div key={item.command}>
          <span className="text-[var(--cyber-green)]">{item.command}</span>
          <span className="text-[var(--text-muted)]"> - </span>
          {item.description}
        </div>
      ))}
    </div>
  );

  const executeCommand = (rawCommand: string): ReactNode => {
    const normalizedCommand = rawCommand.trim().toLowerCase();
    const [baseCommand, ...args] = normalizedCommand.split(/\s+/);

    switch (baseCommand) {
      case "help":
        return (
          <div className="flex flex-col gap-1 text-[var(--text-secondary)]">
            {renderCommandList([
              { command: "whoami", description: "Display profile information" },
              { command: "skills", description: "List technical capabilities" },
              { command: "platforms", description: "Show available portfolio pages" },
              { command: "stats", description: "Show current portfolio progress" },
              { command: "certs", description: "List certificate highlights" },
              { command: "ctf", description: "Show CTF and crypto progress" },
              { command: "open <page>", description: "Navigate to a page, e.g. open picoctf" },
              { command: "random", description: "Open a random proof link" },
              { command: "cat flag.txt", description: "Read the hidden terminal flag" },
              { command: "clear", description: "Clear the terminal screen" },
              { command: "exit", description: "Close the terminal" },
            ])}
          </div>
        );
      case "whoami":
        return `voron\n${siteConfig.title}\n${siteConfig.university}`;
      case "skills":
        return "Networking, Linux, Penetration Testing, Python, Cyber Forensics, Cryptography, Web Security";
      case "platforms":
        return (
          <div className="grid gap-1">
            {platformRoutes.map((route) => (
              <div key={route.href} className="flex flex-wrap gap-x-2">
                <span className="text-[var(--cyber-green)]">{route.label}</span>
                <span className="text-[var(--text-muted)]">{route.href}</span>
                <span className="text-[var(--text-muted)]">open {route.aliases[0]}</span>
              </div>
            ))}
          </div>
        );
      case "stats":
        return (
          <div className="grid gap-1">
            <div>Certificates: <span className="text-[var(--cyber-green)]">{certifications.length}</span></div>
            <div>TryHackMe rooms: <span className="text-[var(--cyber-green)]">{thmRooms.length}</span></div>
            <div>HackTheBox machines: <span className="text-[var(--cyber-green)]">{htbMachines.length}</span></div>
            <div>HackTheBox challenges: <span className="text-[var(--cyber-green)]">{htbChallenges.length}</span></div>
            <div>HTB Academy modules: <span className="text-[var(--cyber-green)]">{htbAcademyModules.length}</span></div>
            <div>HTB Academy badges: <span className="text-[var(--cyber-green)]">{htbAcademyBadges.length}</span></div>
            <div>PicoCTF challenges: <span className="text-[var(--cyber-green)]">{picoStats.challenges}</span></div>
            <div>CryptoHack courses: <span className="text-[var(--cyber-green)]">{cryptoHackStats.courses}</span></div>
          </div>
        );
      case "certs":
        return (
          <div className="grid gap-1">
            {certifications.slice(0, 10).map((certificate) => (
              <div key={`${certificate.issuer}-${certificate.name}`}>
                <span className="text-[var(--cyber-green)]">{certificate.name}</span>
                <span className="text-[var(--text-muted)]"> / {certificate.issuer} / {certificate.date}</span>
              </div>
            ))}
            <div className="text-[var(--text-muted)]">Showing 10 of {certifications.length}. Use: open cisco</div>
          </div>
        );
      case "ctf":
        return (
          <div className="grid gap-1">
            <div>PicoCTF: <span className="text-[var(--cyber-green)]">{picoStats.challenges}</span> solved ({picoStats.easy} easy, {picoStats.medium} medium)</div>
            <div>CryptoHack: level <span className="text-[var(--cyber-green)]">{cryptoHackStats.level}</span>, {cryptoHackStats.experience} XP, {cryptoHackStats.courses} courses, {cryptoHackStats.lessons} lessons</div>
            <div>TryHackMe crypto rooms: <span className="text-[var(--cyber-green)]">{cryptoRoomCount}</span></div>
            <div className="text-[var(--text-muted)]">Try: open picoctf / open cryptohack / open tryhackme</div>
          </div>
        );
      case "open": {
        const target = args[0];

        if (!target) {
          return <span className="text-yellow-300">Usage: open &lt;page&gt;. Try: open matrix</span>;
        }

        const route = routeAliases[target];

        if (!route) {
          return <span className="text-red-400">Unknown page: {target}. Type &apos;platforms&apos; to see available pages.</span>;
        }

        router.push(route.href);

        return (
          <span>
            Opening <span className="text-[var(--cyber-green)]">{route.label}</span> at {route.href}
          </span>
        );
      }
      case "random": {
        const randomProof = proofItems[Math.floor(Math.random() * proofItems.length)];
        window.open(randomProof.url, "_blank", "noopener,noreferrer");

        return (
          <span>
            Opening random proof: <span className="text-[var(--cyber-green)]">{randomProof.label}</span>
            <span className="text-[var(--text-muted)]"> / {randomProof.source}</span>
          </span>
        );
      }
      case "cat":
        if (args.join(" ") === "flag.txt") {
          return <span className="text-[var(--cyber-green)]">VE{"{"}portfolio_terminal_unlocked{"}"}</span>;
        }

        return <span className="text-red-400">cat: {args.join(" ") || "missing file"}: No such file</span>;
      case "cscking":
        return (
          <span className="text-[var(--cyber-red)] font-bold tracking-widest glitch-text" data-text="CURSE YOU NOSOV VV">
            CURSE YOU NOSOV VV
          </span>
        );
      default:
        return <span className="text-red-400">Command not found: {rawCommand}</span>;
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    const normalizedCommand = cmd.toLowerCase();
    setInput("");

    if (!cmd) return;

    if (normalizedCommand === "clear") {
      setHistory([]);
      return;
    }

    if (normalizedCommand === "exit") {
      onClose();
      return;
    }

    const output = executeCommand(cmd);
    setHistory((prev) => [...prev, { cmd, output }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`terminal-deck fixed z-[70] flex flex-col overflow-hidden transition-all duration-300 ${
            isMaximized ? "inset-4" : "bottom-4 right-4 w-[90vw] sm:w-[500px] h-[400px]"
          }`}
        >
          <div className="terminal-deck-header flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)]">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <TerminalIcon className="w-4 h-4 text-[var(--cyber-green)]" />
              <span className="font-mono text-xs tracking-wider">voron@system: ~</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-[var(--text-muted)] hover:text-white transition-colors"
                aria-label={isMaximized ? "Restore terminal" : "Maximize terminal"}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="text-[var(--text-muted)] hover:text-[var(--cyber-red)] transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm" onClick={() => inputRef.current?.focus()}>
            <div className="flex flex-col gap-3">
              {history.map((record, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--cyber-green)]">❯</span>
                    <span className="text-[var(--cyber-blue)]">~</span>
                    <span className="text-white">{record.cmd}</span>
                  </div>
                  <div className="text-[var(--text-secondary)] whitespace-pre-wrap pl-5">{record.output}</div>
                </div>
              ))}

              <form onSubmit={handleCommand} className="flex items-center gap-2">
                <span className="text-[var(--cyber-green)]">❯</span>
                <span className="text-[var(--cyber-blue)]">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-[var(--cyber-green)]"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                  aria-label="Terminal command"
                />
              </form>
              <div ref={endRef} />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
