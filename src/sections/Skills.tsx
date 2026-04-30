"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkillItem = { name: string; level: number };

type CategoryKey = "frontend" | "styling" | "tools";

function SkillBar({ skill, delay }: { skill: SkillItem; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${skill.level}%`,
        duration: 1.2,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 90%",
          once: true,
        },
      }
    );
  }, [skill.level, delay]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          {skill.name}
        </span>
        <span ref={labelRef} className="text-xs font-mono" style={{ color: "var(--accent-violet)" }}>
          {skill.level}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--border-color)" }}
      >
        <div
          ref={barRef}
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))",
            width: "0%",
            boxShadow: "0 0 8px rgba(139,92,246,0.5)",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("skills");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("frontend");

  const categories: { key: CategoryKey; label: string }[] = [
    { key: "frontend", label: t("categories.frontend") },
    { key: "styling", label: t("categories.styling") },
    { key: "tools", label: t("categories.tools") },
  ];

  const currentSkills = (t.raw(`items.${activeCategory}`) as SkillItem[]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-header", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".skills-panel",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-panel", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background orb */}
      <div
        className="absolute end-0 top-1/3 w-80 h-80 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "var(--accent-cyan)" }}
      />

      <div className="container-custom">
        {/* Header */}
        <div className="skills-header mb-16 max-w-2xl">
          <span
            className="inline-flex items-center text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full border"
            style={{ color: "var(--accent-violet)", borderColor: "var(--border-color)", background: "var(--bg-glass)" }}
          >
            {t("badge")}
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {t("title").split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-gradient">{line}</span> : line}
              </span>
            ))}
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            {t("subtitle")}
          </p>
        </div>

        <div className="skills-panel glass rounded-2xl border p-8 md:p-12" style={{ borderColor: "var(--border-color)" }}>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border"
                style={
                  activeCategory === key
                    ? {
                        background: "linear-gradient(135deg, var(--accent-violet), #6d28d9)",
                        color: "#fff",
                        borderColor: "transparent",
                        boxShadow: "0 0 20px rgba(139,92,246,0.4)",
                      }
                    : {
                        background: "var(--bg-glass)",
                        color: "var(--text-secondary)",
                        borderColor: "var(--border-color)",
                      }
                }
              >
                {label}
              </button>
            ))}
          </div>

          {/* Skill bars */}
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
            {currentSkills.map((skill, i) => (
              <SkillBar key={`${activeCategory}-${skill.name}`} skill={skill} delay={i * 0.08} />
            ))}
          </div>

          {/* Bottom decoration */}
          <div className="mt-10 pt-8 border-t grid grid-cols-3 gap-4 text-center" style={{ borderColor: "var(--border-color)" }}>
            {[
              { label: "React Ecosystem", value: "Expert" },
              { label: "System Design", value: "Advanced" },
              { label: "Open Source", value: "Active" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
                <p className="text-sm font-semibold text-gradient">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
