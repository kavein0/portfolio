"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Only enable custom cursor on devices with a fine pointer (mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsMobile(false);
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Central dot - exact position */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--cyber-green)] rounded-full pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      
      {/* Outer ring - lagged spring position */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] flex items-center justify-center mix-blend-screen"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(0, 255, 136, 0.1)" : "transparent",
          borderColor: isHovering ? "var(--cyber-green)" : "rgba(0, 212, 255, 0.5)",
          borderWidth: isHovering ? "1px" : "1px",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      >
        {/* Optional crosshair bits for extra cyberpunk feel */}
        <div className={`absolute w-1 h-[1px] bg-[var(--cyber-blue)] -left-1 opacity-50 ${isHovering ? 'hidden' : 'block'}`} />
        <div className={`absolute w-1 h-[1px] bg-[var(--cyber-blue)] -right-1 opacity-50 ${isHovering ? 'hidden' : 'block'}`} />
        <div className={`absolute w-[1px] h-1 bg-[var(--cyber-blue)] -top-1 opacity-50 ${isHovering ? 'hidden' : 'block'}`} />
        <div className={`absolute w-[1px] h-1 bg-[var(--cyber-blue)] -bottom-1 opacity-50 ${isHovering ? 'hidden' : 'block'}`} />
      </motion.div>
    </>
  );
}
