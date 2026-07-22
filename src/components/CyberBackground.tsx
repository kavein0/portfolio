"use client";

import { useEffect, useRef } from "react";
import styles from "./CyberBackground.module.css";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  depth: number;
  alpha: number;
  phase: number;
  twinkleSpeed: number;
};

type Meteor = {
  x: number;
  y: number;
  length: number;
  speed: number;
  life: number;
  active: boolean;
};

type Ripple = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
};

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, active: false };
    const stars: Star[] = [];
    const meteors: Meteor[] = [];
    const ripples: Ripple[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId = 0;
    let lastFrame = 0;
    let elapsed = 0;

    const buildScene = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars.length = 0;
      const count = Math.min(210, Math.max(90, Math.floor((width * height) / 8500)));
      for (let index = 0; index < count; index += 1) {
        const depth = 0.25 + Math.random() * 0.75;
        const angle = Math.random() * Math.PI * 2;
        const drift = (0.045 + Math.random() * 0.13) * depth;
        const baseVx = Math.cos(angle) * drift;
        const baseVy = Math.sin(angle) * drift;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          radius: 0.3 + Math.random() * 1.45 * depth,
          depth,
          alpha: 0.16 + Math.random() * 0.58,
          phase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.9 + Math.random() * 1.8,
        });
      }

      meteors.length = 0;
      for (let index = 0; index < 2; index += 1) {
        meteors.push({ x: 0, y: 0, length: 0, speed: 0, life: 0, active: false });
      }

      ripples.length = 0;
    };

    const launchMeteor = (meteor: Meteor) => {
      meteor.x = width * (0.25 + Math.random() * 0.7);
      meteor.y = -40 - Math.random() * 120;
      meteor.length = 80 + Math.random() * 130;
      meteor.speed = 7 + Math.random() * 5;
      meteor.life = 0;
      meteor.active = true;
    };

    const drawScene = (timestamp: number) => {
      if (!reducedMotion && timestamp - lastFrame < 32) {
        frameId = requestAnimationFrame(drawScene);
        return;
      }

      const delta = lastFrame ? Math.min(48, timestamp - lastFrame) : 16;
      const frameScale = Math.min(2.5, delta / 16.67);
      lastFrame = timestamp;
      elapsed += delta / 1000;

      context.clearRect(0, 0, width, height);

      if (pointer.active && !reducedMotion) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 180);
        glow.addColorStop(0, "rgba(183, 170, 255, 0.07)");
        glow.addColorStop(0.42, "rgba(111, 139, 218, 0.03)");
        glow.addColorStop(1, "rgba(40, 48, 104, 0)");
        context.fillStyle = glow;
        context.fillRect(pointer.x - 180, pointer.y - 180, 360, 360);
      }

      for (const star of stars) {
        if (!reducedMotion) {
          star.vx += (star.baseVx - star.vx) * 0.018 * frameScale;
          star.vy += (star.baseVy - star.vy) * 0.018 * frameScale;

          if (pointer.active) {
            const dx = star.x - pointer.x;
            const dy = star.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            const interactionRadius = 230;

            if (distance > 0 && distance < interactionRadius) {
              const influence = 1 - distance / interactionRadius;
              const impulse = influence * influence * 0.23 * star.depth * frameScale;
              star.vx += (dx / distance) * impulse;
              star.vy += (dy / distance) * impulse;

            }
          }

          const velocity = Math.hypot(star.vx, star.vy);
          if (velocity > 1.45) {
            star.vx = (star.vx / velocity) * 1.45;
            star.vy = (star.vy / velocity) * 1.45;
          }

          star.x += star.vx * frameScale;
          star.y += star.vy * frameScale;

          const edge = 12;
          if (star.x < -edge) star.x = width + edge;
          if (star.x > width + edge) star.x = -edge;
          if (star.y < -edge) star.y = height + edge;
          if (star.y > height + edge) star.y = -edge;
        }

        const twinkle = reducedMotion ? 1 : 0.68 + Math.sin(elapsed * star.twinkleSpeed + star.phase) * 0.32;
        const x = star.x;
        const y = star.y;
        const alpha = star.alpha * twinkle;

        if (star.radius > 1.15) {
          const glow = context.createRadialGradient(x, y, 0, x, y, star.radius * 5);
          glow.addColorStop(0, `rgba(235, 232, 255, ${alpha * 0.72})`);
          glow.addColorStop(1, "rgba(115, 105, 198, 0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(x, y, star.radius * 5, 0, Math.PI * 2);
          context.fill();
        }

        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(239, 237, 255, ${alpha})`;
        context.fill();
      }

      if (!reducedMotion) {
        for (let index = ripples.length - 1; index >= 0; index -= 1) {
          const ripple = ripples[index];
          ripple.radius += ripple.speed * frameScale;
          ripple.alpha -= 0.016 * frameScale;

          if (ripple.alpha <= 0) {
            ripples.splice(index, 1);
            continue;
          }

          context.beginPath();
          context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          context.strokeStyle = `rgba(184, 172, 255, ${ripple.alpha})`;
          context.lineWidth = 1;
          context.stroke();
        }

        if (Math.random() < 0.0007) {
          const dormantMeteor = meteors.find((meteor) => !meteor.active);
          if (dormantMeteor) launchMeteor(dormantMeteor);
        }

        for (const meteor of meteors) {
          if (!meteor.active) continue;
          meteor.life += delta / 1000;
          meteor.x -= meteor.speed * 1.7;
          meteor.y += meteor.speed;

          const gradient = context.createLinearGradient(
            meteor.x,
            meteor.y,
            meteor.x + meteor.length,
            meteor.y - meteor.length * 0.58,
          );
          gradient.addColorStop(0, "rgba(239, 235, 255, 0.72)");
          gradient.addColorStop(1, "rgba(127, 111, 211, 0)");
          context.beginPath();
          context.moveTo(meteor.x, meteor.y);
          context.lineTo(meteor.x + meteor.length, meteor.y - meteor.length * 0.58);
          context.strokeStyle = gradient;
          context.lineWidth = 1;
          context.stroke();

          if (meteor.y > height * 0.7 || meteor.life > 3) meteor.active = false;
        }

        frameId = requestAnimationFrame(drawScene);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || reducedMotion) return;

      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = event.pointerType !== "touch";
      ripples.push({ x: event.clientX, y: event.clientY, radius: 8, alpha: 0.68, speed: 5.2 });

      for (const star of stars) {
        const dx = star.x - event.clientX;
        const dy = star.y - event.clientY;
        const distance = Math.hypot(dx, dy);
        const waveRadius = 310;
        if (distance <= 0 || distance >= waveRadius) continue;

        const impulse = (1 - distance / waveRadius) * 1.15 * star.depth;
        star.vx += (dx / distance) * impulse;
        star.vy += (dy / distance) * impulse;
      }
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.relatedTarget === null) pointer.active = false;
    };

    const handleResize = () => {
      buildScene();
      if (reducedMotion) drawScene(performance.now());
    };

    const handleBlur = () => {
      pointer.active = false;
    };

    buildScene();
    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerout", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handleBlur);

    if (reducedMotion) {
      drawScene(performance.now());
    } else {
      frameId = requestAnimationFrame(drawScene);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerout", handlePointerLeave);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.nebula} />
      <div className={styles.vignette} />
    </div>
  );
}
