"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
      <p className="font-mono text-[var(--cyber-green)] text-xs tracking-widest uppercase">
        System Error
      </p>
      <h1 className="text-4xl font-display font-black text-[var(--text-primary)]">
        Something went wrong
      </h1>
      <p className="text-[var(--text-secondary)] text-sm max-w-md text-center">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="magnetic-btn"
      >
        Try again
      </button>
    </div>
  );
}
