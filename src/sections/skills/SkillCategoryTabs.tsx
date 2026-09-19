"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import type { FilterCategory, SkillMeta } from "./types";

interface CategoryTab {
  key: FilterCategory;
  icon: ElementType;
}

interface SkillCategoryTabsProps {
  tabs: CategoryTab[];
  activeCategory: FilterCategory;
  skills: SkillMeta[];
  getLabel: (key: FilterCategory) => string;
  onCategoryChange: (category: FilterCategory) => void;
}

export function SkillCategoryTabs({
  tabs,
  activeCategory,
  skills,
  getLabel,
  onCategoryChange,
}: SkillCategoryTabsProps) {
  return (
    <div className="skills-tabs flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
      {tabs.map(({ key, icon: Icon }) => {
        const isActive = activeCategory === key;
        const count = key === "all"
          ? skills.length
          : skills.filter((skill) => skill.category === key).length;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onCategoryChange(key)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
              isActive
                ? "text-primary"
                : "text-(--text-secondary) hover:text-primary"
            }`}
            style={{
              background: isActive ? "transparent" : "var(--bg-card)",
              border: isActive ? "none" : "1px solid var(--border-color)",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategoryPill"
                className="absolute inset-0 rounded-xl border"
                style={{
                  background: "var(--bg-card)",
                  borderColor: "var(--accent-violet)",
                  boxShadow: "0 0 25px rgba(139, 92, 246, 0.25)",
                }}
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon
                className="w-4 h-4 transition-colors"
                style={{ color: isActive ? "var(--accent-violet)" : "inherit" }}
              />
              <span>{getLabel(key)}</span>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-md"
                style={{
                  background: isActive
                    ? "rgba(139, 92, 246, 0.2)"
                    : "var(--bg-glass)",
                  color: isActive
                    ? "var(--accent-violet)"
                    : "var(--text-muted)",
                }}
              >
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
