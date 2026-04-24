"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCursorTracker } from "@/hooks/useCursorTracker";

export default function CustomCursor() {
  const { position, isHovering, isVisible } = useCursorTracker();
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Smooth outer cursor with lag
  useEffect(() => {
    if (!outerRef.current) return;
    gsap.to(outerRef.current, {
      x: position.x - 20,
      y: position.y - 20,
      duration: 0.15,
      ease: "power2.out",
    });
  }, [position]);

  // Inner dot follows exactly
  useEffect(() => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      x: position.x - 4,
      y: position.y - 4,
      duration: 0.05,
      ease: "none",
    });
  }, [position]);

  // Hide on mobile
  const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isMobile) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "var(--accent-cyan)" : "var(--accent-violet)"}`,
          opacity: isVisible ? 1 : 0,
          transform: isHovering ? "scale(1.6)" : "scale(1)",
          transition: "transform 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
          mixBlendMode: "difference",
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: isHovering ? "var(--accent-cyan)" : "var(--accent-violet)",
          opacity: isVisible ? 1 : 0,
          transition: "background 0.3s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
