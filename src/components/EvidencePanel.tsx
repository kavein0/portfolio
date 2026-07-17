"use client";

import Image from "next/image";
import { ChevronDown, Expand, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

type EvidencePanelProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

export default function EvidencePanel({
  title,
  description,
  image,
  alt,
  width,
  height,
}: EvidencePanelProps) {
  const generatedId = useId();
  const panelId = `evidence-${generatedId.replace(/:/g, "")}`;
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isFullscreen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFullscreen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isFullscreen]);

  return (
    <>
    <div className="liquid-surface overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="evidence-trigger group"
      >
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-[var(--text-primary)]">
            {title}
          </span>
          <span className="mt-1 block text-sm text-[var(--text-muted)]">
            {description}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-[var(--text-secondary)]">
          {isOpen ? "Hide" : "Show"}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {isOpen ? (
        <div id={panelId} className="border-t border-[var(--border-default)] p-3 sm:p-4">
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="group relative block w-full overflow-hidden rounded-xl border border-[var(--border-default)] bg-black/60"
            aria-label={`Open ${title} fullscreen`}
          >
            <Image
              src={image}
              alt={alt}
              width={width}
              height={height}
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
              sizes="(max-width: 768px) 100vw, 1200px"
              loading="eager"
              style={{ width: "100%", height: "auto" }}
            />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 px-3 py-2 font-mono text-xs text-white backdrop-blur-md">
              <Expand className="h-4 w-4" />
              Fullscreen
            </span>
          </button>
        </div>
      ) : null}

    </div>

      {isFullscreen ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020407]/95 p-3 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsFullscreen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-4 top-4 z-10 rounded-lg border border-white/10 bg-black/60 p-2 text-white backdrop-blur-md"
            aria-label="Close fullscreen screenshot"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="max-h-full max-w-[min(1600px,100%)] overflow-auto rounded-xl border border-[var(--border-strong)] bg-black shadow-2xl">
              <Image
                src={image}
                alt={alt}
                width={width}
                height={height}
                className="h-auto w-full"
                sizes="100vw"
                loading="eager"
                style={{ width: "100%", height: "auto", maxWidth: `${width}px` }}
              />
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
