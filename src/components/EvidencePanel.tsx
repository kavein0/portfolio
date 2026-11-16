"use client";

import Image from "next/image";
import { ChevronDown, Expand, X } from "lucide-react";
import { useId, useRef, useState } from "react";

type EvidencePanelProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  downloadUrl?: string;
};

export default function EvidencePanel({
  title,
  description,
  image,
  alt,
  width,
  height,
  downloadUrl,
}: EvidencePanelProps) {
  const generatedId = useId();
  const panelId = `evidence-${generatedId.replace(/:/g, "")}`;
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
    <div className="rf-evidence">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="rf-evidence-trigger"
      >
        <span>
          <strong>
            {title}
          </strong>
          <small>
            {description}
          </small>
        </span>
        <span className="rf-evidence-state">
          {isOpen ? "Hide" : "Show"}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {isOpen ? (
        <div id={panelId} className="rf-evidence-content">
          {downloadUrl ? <a className="rf-evidence-download" href={downloadUrl} download>Download original PNG ↗</a> : null}
          <button
            type="button"
            onClick={() => dialog.current?.showModal()}
            className="rf-evidence-image"
            aria-label={`Open ${title} fullscreen`}
          >
            <Image
              src={image}
              alt={alt}
              width={width}
              height={height}
              className="rf-evidence-capture"
              sizes="(max-width: 768px) 100vw, 1200px"
              loading="eager"
              style={{ width: "100%", height: "auto" }}
            />
            <span className="rf-evidence-expand">
              <Expand className="h-4 w-4" />
              Fullscreen
            </span>
          </button>
        </div>
      ) : null}

    </div>

      <dialog ref={dialog}
          className="rf-evidence-modal"
          aria-label={title}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="rf-evidence-close"
            aria-label="Close fullscreen screenshot"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="rf-evidence-full-image">
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
        </dialog>
    </>
  );
}
