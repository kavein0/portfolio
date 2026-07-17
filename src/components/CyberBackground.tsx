"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  depth: number;
  alpha: number;
  phase: number;
  speed: number;
};

type Meteor = {
  x: number;
  y: number;
  length: number;
  speed: number;
  life: number;
  active: boolean;
};

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const stars: Star[] = [];
    const meteors: Meteor[] = [];
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
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.3 + Math.random() * 1.45 * depth,
          depth,
          alpha: 0.16 + Math.random() * 0.58,
          phase: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.6,
        });
      }

      meteors.length = 0;
      for (let index = 0; index < 2; index += 1) {
        meteors.push({ x: 0, y: 0, length: 0, speed: 0, life: 0, active: false });
      }
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
      lastFrame = timestamp;
      elapsed += delta / 1000;
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      context.clearRect(0, 0, width, height);

      const brightStars = stars.filter((star) => star.depth > 0.72).slice(0, 34);
      for (let index = 0; index < brightStars.length; index += 1) {
        const first = brightStars[index];
        for (let otherIndex = index + 1; otherIndex < brightStars.length; otherIndex += 1) {
          const second = brightStars[otherIndex];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 155) continue;

          context.beginPath();
          context.moveTo(first.x + pointer.x * first.depth * 8, first.y + pointer.y * first.depth * 5);
          context.lineTo(second.x + pointer.x * second.depth * 8, second.y + pointer.y * second.depth * 5);
          context.strokeStyle = `rgba(105, 159, 190, ${(1 - distance / 155) * 0.12})`;
          context.lineWidth = 0.5;
          context.stroke();
        }
      }

      for (const star of stars) {
        const twinkle = reducedMotion ? 1 : 0.72 + Math.sin(elapsed * star.speed + star.phase) * 0.28;
        const x = star.x + pointer.x * star.depth * 11;
        const y = star.y + pointer.y * star.depth * 7;
        const alpha = star.alpha * twinkle;

        if (star.radius > 1.15) {
          const glow = context.createRadialGradient(x, y, 0, x, y, star.radius * 5);
          glow.addColorStop(0, `rgba(205, 235, 250, ${alpha * 0.72})`);
          glow.addColorStop(1, "rgba(80, 142, 178, 0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(x, y, star.radius * 5, 0, Math.PI * 2);
          context.fill();
        }

        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(219, 240, 250, ${alpha})`;
        context.fill();
      }

      if (!reducedMotion) {
        if (Math.random() < 0.0018) {
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
          gradient.addColorStop(0, "rgba(220, 242, 252, 0.72)");
          gradient.addColorStop(1, "rgba(88, 151, 188, 0)");
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
      pointer.targetX = (event.clientX / width - 0.5) * -1;
      pointer.targetY = (event.clientY / height - 0.5) * -1;
    };

    buildScene();
    window.addEventListener("resize", buildScene);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    drawScene(0);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", buildScene);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="stellar-backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="stellar-canvas" />
      <div className="stellar-nebula" />
      <div className="stellar-vignette" />
    </div>
  );
}
