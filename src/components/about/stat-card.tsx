"use client";

import { useCounter } from "@/hooks/use-counter";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  icon: LucideIcon;
  shouldAnimate: boolean;
}

export function StatCard({ value, label, icon: Icon, shouldAnimate }: StatCardProps) {
  // Extract number (e.g., "1.5+" -> 1.5)
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const suffix = value.replace(/[0-9.]/g, '');
  const isDecimal = value.includes('.');
  
  const count = useCounter(numericValue, 2500, shouldAnimate);
  
  // Format based on whether the original string had a decimal
  const displayValue = isDecimal 
    ? count.toFixed(1) + suffix 
    : Math.floor(count) + suffix;

  return (
    <div
      className="stat-card glass rounded-xl p-5 border hover:border-violet-500/40 transition-colors duration-300 group"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-3xl font-black text-gradient">
          {shouldAnimate ? displayValue : value}
        </span>
        <Icon
          size={18}
          className="opacity-40 group-hover:opacity-70 transition-opacity"
          style={{ color: "var(--accent-cyan)" }}
        />
      </div>
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</p>
    </div>
  );
}