"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SkillMeta } from "./types";

interface SkillCardProps {
  skill: SkillMeta;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.03, 0.3),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl p-5 sm:p-6 transition-all duration-300 border flex flex-col justify-between"
      style={{
        background: "var(--bg-card)",
        borderColor: isHovered
          ? `${skill.brandColor}66`
          : "var(--border-color)",
        boxShadow: isHovered
          ? `0 12px 30px -10px ${skill.brandColor}25, 0 0 0 1px ${skill.brandColor}33`
          : "none",
        transform: isHovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, ${skill.brandColor}18, transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex items-start justify-between gap-3 mb-5">
        <div
          className="flex items-center gap-2 p-3 rounded-xl border transition-all duration-300 group-hover:scale-105"
          style={{
            background: `${skill.brandColor}12`,
            borderColor: `${skill.brandColor}30`,
            boxShadow: isHovered ? `0 0 18px ${skill.brandColor}30` : "none",
          }}
        >
          {skill.icons.map(({ icon: Icon, color }, iconIndex) => (
            <Icon
              key={`${skill.name}-${iconIndex}`}
              className="w-6 h-6 transition-transform duration-300"
              style={{ color }}
            />
          ))}
        </div>

        <span
          className="text-[11px] font-medium text-center tracking-wide uppercase px-2.5 py-1 rounded-full border transition-colors duration-300"
          style={{
            background: "var(--bg-glass)",
            borderColor: isHovered
              ? `${skill.brandColor}40`
              : "var(--border-color)",
            color: isHovered ? "var(--text-primary)" : "var(--text-secondary)",
          }}
        >
          {skill.tag}
        </span>
      </div>

      <div className="relative z-10">
        <h3
          className="font-bold text-base sm:text-lg tracking-tight mb-1 transition-colors duration-300 group-hover:text-primary"
          style={{ color: "var(--text-primary)" }}
        >
          {skill.name}
        </h3>
        <p
          className="text-xs uppercase tracking-wider font-semibold opacity-70 transition-colors duration-300"
          style={{ color: skill.brandColor }}
        >
          {skill.category}
        </p>
      </div>
    </motion.div>
  );
}
