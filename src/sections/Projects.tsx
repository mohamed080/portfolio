"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_GRADIENTS = [
  "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))",
  "linear-gradient(135deg, rgba(6,182,212,0.3), rgba(124,58,237,0.15))",
  "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(16,185,129,0.2))",
  "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(124,58,237,0.25))",
  "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(124,58,237,0.2))",
  "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(6,182,212,0.2))",
];

const PROJECT_IDS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

type FilterKey = "all" | "frontend" | "fullstack" | "backend";

function ProjectCard({
  image,
  title,
  description,
  tags,
  category,
  index,
  gradient,
  liveLabel,
  codeLabel,
  readMoreLabel,
  showLessLabel,
  liveUrl,
  repoUrl,
}: {
  image?: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  index: number;
  gradient: string;
  liveLabel: string;
  codeLabel: string;
  readMoreLabel: string;
  showLessLabel: string;
  liveUrl?: string;
  repoUrl?: string;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 140;
  const isLongDescription = description.length > maxLength;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="group relative rounded-2xl border overflow-hidden cursor-pointer h-full flex flex-col"
        style={{
          borderColor: "var(--border-color)",
          background: "var(--bg-card)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.5)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-color)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
        }}
      >
        {/* Card image area */}
        <div className="h-50 relative overflow-hidden shrink-0" style={{ background: gradient }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {image && !image.includes("items.") ? (
              <img src={image} alt={title} className="w-full h-full object-cover object-top" />
            ) : (
              <span className="text-6xl font-black opacity-10 select-none" style={{ color: "var(--text-primary)" }}>
                {title.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          {/* Category badge */}
          <div className="absolute top-3 inset-s-3">
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium border"
              style={{ background: "var(--bg-secondary)", borderColor: "var(--border-color)", color: "var(--accent-violet)" }}
            >
              {category}
            </span>
          </div>
          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4"
            style={{ background: "rgba(2,8,23,0.75)", backdropFilter: "blur(4px)" }}
          >
            {liveUrl && !liveUrl.includes("items.") && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold hover:scale-105 transition-transform"
                style={{ background: "var(--accent-violet)", color: "#fff" }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={12} /> {liveLabel}
              </a>
            )}
            {repoUrl && !repoUrl.includes("items.") && (
              repoUrl.toLowerCase() === "private" ? (
                <span
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border cursor-not-allowed opacity-60"
                  style={{ borderColor: "var(--border-color)", background: "var(--bg-glass)", color: "var(--text-secondary)" }}
                  onClick={(e) => e.stopPropagation()}
                  title="This repository is private"
                >
                  <FaGithub size={12} /> Private
                </span>
              ) : (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border hover:scale-105 transition-transform"
                  style={{ borderColor: "var(--border-color)", background: "var(--bg-glass)", color: "var(--text-primary)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub size={12} /> {codeLabel}
                </a>
              )
            )}
          </div>
        </div>

        {/* Card content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{title}</h3>
          <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
            {isExpanded || !isLongDescription ? description : `${description.slice(0, maxLength)}...`}
            {isLongDescription && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsExpanded(!isExpanded); }}
                className="mx-1 font-semibold hover:underline cursor-pointer"
                style={{ color: "var(--accent-violet)" }}
              >
                {isExpanded ? showLessLabel : readMoreLabel}
              </button>
            )}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-md font-mono"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  color: "var(--accent-violet)",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Normalize any localized category string → canonical FilterKey
function toFilterKey(category: string): FilterKey {
  const n = category.toLowerCase().replace(/[- ]/g, "");
  if (n.includes("front") || n.includes("أمامية")) return "frontend";
  if (n.includes("full") || n.includes("stack")) return "fullstack";
  if (n.includes("back") || n.includes("خلفية")) return "backend";
  return "frontend";
}

export default function Projects() {
  const t = useTranslations("projects");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-header", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all",       label: t("filter_all") },
    { key: "frontend",  label: t("filter_frontend") },
    { key: "fullstack", label: t("filter_fullstack") },
    { key: "backend",   label: t("filter_backend") },
  ];

  const handleFilterChange = (key: FilterKey) => {
    setActiveFilter(key);
    if (sectionRef.current) {
      const topOffset = sectionRef.current.getBoundingClientRect().top + window.scrollY + 370;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const allProjects = PROJECT_IDS.map((id, i) => ({
    id,
    index: i,
    image: t(`items.${id}.image`),
    title: t(`items.${id}.title`),
    description: t(`items.${id}.description`),
    tags: t.raw(`items.${id}.tags`) as string[],
    category: t(`items.${id}.category`),
    liveUrl: t(`items.${id}.liveUrl`),
    repoUrl: t(`items.${id}.repoUrl`),
    gradient: PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length],
  }));

  const filtered = activeFilter === "all"
    ? allProjects
    : allProjects.filter((p) => toFilterKey(p.category) === activeFilter);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute inset-s-0 bottom-0 w-96 h-96 rounded-full blur-[130px] opacity-10 pointer-events-none"
        style={{ background: "var(--accent-cyan)" }}
      />

      <div className="container-custom">
        {/* Header */}
        <div className="projects-header mb-10 max-w-2xl">
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
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>{t("subtitle")}</p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(({ key, label }) => {
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                onClick={() => handleFilterChange(key)}
                className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: isActive ? "rgba(139,92,246,0.15)" : "var(--bg-glass)",
                  color: isActive ? "var(--accent-violet)" : "var(--text-secondary)",
                  border: `1px solid ${isActive ? "rgba(139,92,246,0.4)" : "var(--border-color)"}`,
                  boxShadow: isActive ? "0 0 16px rgba(139,92,246,0.15)" : "none",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                }}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="filter-indicator"
                    className="absolute bottom-0 inset-s-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: "var(--accent-violet)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, visibleIndex) => (
              <ProjectCard
                key={p.id}
                index={visibleIndex}
                image={p.image}
                title={p.title}
                description={p.description}
                tags={p.tags}
                category={p.category}
                gradient={p.gradient}
                liveLabel={t("view_live")}
                codeLabel={t("view_code")}
                readMoreLabel={t("read_more")}
                showLessLabel={t("show_less")}
                liveUrl={p.liveUrl}
                repoUrl={p.repoUrl}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

