"use client";

import { useEffect, useRef } from "react";

/**
 * Animated matrix-style particle grid background
 * Uses canvas for performance — no DOM thrashing
 */
export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      size: number;
      opacity: number;
      color: string;
    }

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking (instant update for smooth repulsion)
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    window.addEventListener("mousemove", onMouseMove);

    // Create particles
    const count = Math.min(42, Math.floor((window.innerWidth * window.innerHeight) / 26000));
    const colors = ["#8ca9ba", "#5d7889", "#c0d0d9"];

    for (let i = 0; i < count; i++) {
      const baseVx = reducedMotion ? 0 : (Math.random() - 0.5) * 0.18;
      const baseVy = reducedMotion ? 0 : (Math.random() - 0.5) * 0.18;
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: baseVx,
        vy: baseVy,
        baseVx,
        baseVy,
        size: Math.random() * 1.3 + 0.35,
        opacity: Math.random() * 0.22 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 175) {
            const opacity = (1 - dist / 175) * 0.07;
            ctx!.strokeStyle = `rgba(126, 159, 179, ${opacity})`;
            ctx!.lineWidth = 0.55;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Update and draw particles
      for (const p of particles) {
        // Mouse repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (!reducedMotion && mDist > 0 && mDist < 130) {
          const force = (150 - mDist) / 150;
          p.vx += (mdx / mDist) * force * 0.018;
          p.vy += (mdy / mDist) * force * 0.018;
        }

        // Smoothly return to base velocity
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        // Draw particle
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.opacity;
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }

      if (!reducedMotion) animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.48 }}
      aria-hidden="true"
    />
  );
}
