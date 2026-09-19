import { useTranslations } from "next-intl";
import type { SkillMeta } from "./types";

interface SkillStatsProps {
  skills: SkillMeta[];
}

export function SkillStats({ skills }: SkillStatsProps) {
  const t = useTranslations("skills");

  return (
    <div
      className="skills-stats mt-16 pt-8 border-t grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
      style={{ borderColor: "var(--border-color)" }}
    >
      <StatCard value={`${skills.length}+`} label={t("stats.technologies")} />
      <StatCard value="Strict" label={t("stats.architecture")} accent="cyan" />
      <StatCard value="100%" label={t("stats.production")} />
    </div>
  );
}

function StatCard({
  value,
  label,
  accent = "violet",
}: {
  value: string;
  label: string;
  accent?: "violet" | "cyan";
}) {
  const accentClass =
    accent === "cyan"
      ? "hover:border-[var(--accent-cyan)]"
      : "hover:border-[var(--accent-violet)]";

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300 ${accentClass}`}
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-color)",
      }}
    >
      <p className="text-3xl sm:text-4xl font-black text-gradient mb-1">
        {value}
      </p>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </p>
    </div>
  );
}
