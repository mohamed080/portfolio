"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EXP_IDS = ["0", "1", "2", "3"] as const;

export default function Experience() {
  const t = useTranslations("experience");
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".exp-entry",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-entry", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".exp-dot",
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: "back.out(2)",
          scrollTrigger: { trigger: ".exp-dot", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".exp-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".exp-header", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute start-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[130px] pointer-events-none"
        style={{ background: "var(--accent-violet)", opacity: 0.08 }}
      />

      <div className="container-custom">
        {/* Header */}
        <div className="exp-header mb-16 max-w-2xl">
          <span
            className="inline-flex items-center text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full border"
            style={{ color: "var(--accent-violet)", borderColor: "var(--border-color)", background: "var(--bg-glass)" }}
          >
            {t("badge")}
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {t("title").split("\n").map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-gradient">{line}</span> : line}
              </span>
            ))}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute start-6 top-0 bottom-0 w-[1px] hidden sm:block"
            style={{ background: "var(--border-color)" }}
          >
            <div
              ref={lineRef}
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, var(--accent-violet), var(--accent-cyan))",
                transformOrigin: "top",
              }}
            />
          </div>

          <div className="space-y-8">
            {EXP_IDS.map((id, i) => {
              const tags = [
                t(`items.${id}.tags.0`),
                t(`items.${id}.tags.1`),
                t(`items.${id}.tags.2`),
                t(`items.${id}.tags.3`),
              ];

              return (
                <div key={id} className="exp-entry relative flex gap-6 sm:gap-10 group">
                  {/* Dot */}
                  <div className="hidden sm:flex flex-col items-center flex-shrink-0">
                    <div
                      className="exp-dot w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110"
                      style={{
                        borderColor: i === 0 ? "var(--accent-violet)" : "var(--border-color)",
                        background: i === 0
                          ? "linear-gradient(135deg, var(--accent-violet), #6d28d9)"
                          : "var(--bg-secondary)",
                        boxShadow: i === 0 ? "0 0 20px rgba(139,92,246,0.4)" : "none",
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 glass rounded-xl border p-6 mb-2 transition-all duration-300"
                    style={{
                      borderColor: "var(--border-color)",
                      background: "var(--bg-card)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color)";
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-lg font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>
                          {t(`items.${id}.role`)}
                        </h3>
                        <p className="font-semibold text-gradient text-sm">{t(`items.${id}.company`)}</p>
                      </div>
                      {i === 0 && (
                        <span
                          className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                          style={{
                            background: "rgba(16,185,129,0.15)",
                            color: "#10b981",
                            border: "1px solid rgba(16,185,129,0.3)",
                            animation: "pulse-glow 2s ease-in-out infinite",
                          }}
                        >
                          ● Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Calendar size={12} /> {t(`items.${id}.period`)}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                        <MapPin size={12} /> {t(`items.${id}.location`)}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                      {t(`items.${id}.description`)}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-md font-mono"
                          style={{
                            background: "rgba(139,92,246,0.08)",
                            color: "var(--accent-violet)",
                            border: "1px solid rgba(139,92,246,0.15)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
