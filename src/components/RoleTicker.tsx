"use client";

import { useEffect, useState } from "react";

export default function RoleTicker({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || roles.length < 2) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [roles]);

  return <span>{roles[index]}</span>;
}
