"use client";

import { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from "lucide-react";
import { siteConfig } from "@/lib/data";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandRecord {
  cmd: string;
  output: React.ReactNode;
}

export default function TerminalWidget({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandRecord[]>([
    { cmd: "systemctl status voron", output: "Status: ONLINE. Ready for commands. Type 'help' for available commands." }
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

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");

    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="flex flex-col gap-1 text-[var(--text-secondary)]">
            <div><span className="text-[var(--cyber-green)]">whoami</span>  - Display user information</div>
            <div><span className="text-[var(--cyber-green)]">skills</span>  - List technical capabilities</div>
            <div><span className="text-[var(--cyber-green)]">clear</span>   - Clear the terminal screen</div>
            <div><span className="text-[var(--cyber-green)]">exit</span>    - Close the terminal</div>
          </div>
        );
        break;
      case "whoami":
        output = `voron\n${siteConfig.title}\n${siteConfig.university}`;
        break;
      case "skills":
        output = "Networking, Linux, Penetration Testing, Python, Cyber Forensics";
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        onClose();
        return;
      case "cscking":
        output = (
          <span className="text-[var(--cyber-red)] font-bold tracking-widest glitch-text" data-text="CURSE YOU NOSOV VV">
            CURSE YOU NOSOV VV
          </span>
        );
        break;
      default:
        output = <span className="text-red-400">Command not found: {cmd}</span>;
    }

    setHistory((prev) => [...prev, { cmd, output }]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`fixed z-50 flex flex-col bg-[#0a0a0f]/95 backdrop-blur-xl border border-[var(--border-active)] shadow-[0_0_40px_rgba(0,255,136,0.15)] rounded-xl overflow-hidden transition-all duration-300 ${
            isMaximized ? "inset-4" : "bottom-4 right-4 w-[90vw] sm:w-[500px] h-[400px]"
          }`}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-default)] bg-black/40">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <TerminalIcon className="w-4 h-4 text-[var(--cyber-green)]" />
              <span className="font-mono text-xs tracking-wider">voron@system: ~</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsMaximized(!isMaximized)} className="text-[var(--text-muted)] hover:text-white transition-colors">
                {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--cyber-red)] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm" onClick={() => inputRef.current?.focus()}>
            <div className="flex flex-col gap-3">
              {history.map((record, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--cyber-green)]">➜</span>
                    <span className="text-[var(--cyber-blue)]">~</span>
                    <span className="text-white">{record.cmd}</span>
                  </div>
                  <div className="text-[var(--text-secondary)] whitespace-pre-wrap pl-5">{record.output}</div>
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex items-center gap-2">
                <span className="text-[var(--cyber-green)]">➜</span>
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
