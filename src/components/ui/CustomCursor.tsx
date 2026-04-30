"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  // Use framer-motion values for better performance than state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for trailing elements
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  const slowSpringConfig = { damping: 30, stiffness: 150, mass: 0.8 };
  const slowCursorX = useSpring(mouseX, slowSpringConfig);
  const slowCursorY = useSpring(mouseY, slowSpringConfig);

  useEffect(() => {
    // Only enable custom cursor on devices with a fine pointer (mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsMobile(false);
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over an interactive element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("magnetic-btn")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      {/* 1. Core Pointer (Instant) */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      >
        <div 
          className={`w-[6px] h-[6px] bg-[var(--cyber-green)] shadow-[0_0_8px_var(--cyber-green)] transition-all duration-200 ${isHovering ? 'scale-0' : 'scale-100'}`} 
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} 
        />
        {/* On hover, a solid center dot appears */}
        <div className={`absolute w-[4px] h-[4px] rounded-full bg-[var(--cyber-green)] transition-all duration-200 ${isHovering ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
      </motion.div>

      {/* 2. Rotating HUD Reticle (Fast Spring) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] mix-blend-screen"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: "-50%", translateY: "-50%" }}
        animate={{
          rotate: isHovering ? 45 : 0,
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {/* Four corners of the reticle */}
        <div className={`absolute top-0 left-0 w-[6px] h-[6px] border-t-2 border-l-2 transition-colors ${isHovering ? 'border-[var(--cyber-green)]' : 'border-[var(--cyber-blue)]/80'}`} />
        <div className={`absolute top-0 right-0 w-[6px] h-[6px] border-t-2 border-r-2 transition-colors ${isHovering ? 'border-[var(--cyber-green)]' : 'border-[var(--cyber-blue)]/80'}`} />
        <div className={`absolute bottom-0 left-0 w-[6px] h-[6px] border-b-2 border-l-2 transition-colors ${isHovering ? 'border-[var(--cyber-green)]' : 'border-[var(--cyber-blue)]/80'}`} />
        <div className={`absolute bottom-0 right-0 w-[6px] h-[6px] border-b-2 border-r-2 transition-colors ${isHovering ? 'border-[var(--cyber-green)]' : 'border-[var(--cyber-blue)]/80'}`} />
        
        {/* Inner pulse ring on hover */}
        {isHovering && (
          <motion.div 
            className="absolute inset-0 rounded-full border border-[var(--cyber-green)]/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* 3. Outer rotating dashed ring (Slow Spring) */}
      <motion.div
        className="fixed top-0 left-0 w-14 h-14 pointer-events-none z-[9997] mix-blend-screen rounded-full border-[1px] border-dashed border-[var(--cyber-blue)]/40"
        style={{ x: slowCursorX, y: slowCursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          rotate: 360,
          scale: isHovering ? 0.5 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { type: "spring", stiffness: 200, damping: 20 },
          opacity: { duration: 0.2 }
        }}
      />

      {/* 4. Trailing Coordinates Text (Slowest Spring) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996] mix-blend-screen ml-5 mt-5"
        style={{ x: slowCursorX, y: slowCursorY }}
      >
        <motion.div 
          className="font-mono text-[9px] leading-[1.1] tracking-widest uppercase flex flex-col"
          animate={{ opacity: isHovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        >
          <span className="text-[var(--cyber-blue)]/80">SYS.OP <span className="opacity-50">||</span> VORON</span>
          <span className="text-[var(--cyber-green)]/80 font-bold">TRK_ACTIVE</span>
        </motion.div>
      </motion.div>
    </>
  );
}
