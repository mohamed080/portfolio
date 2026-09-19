"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles,
  Layers,
  Terminal,
  Database,
  Wrench,
  Cookie,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  FileUp,
  MailCheck,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiShadcnui,
  SiMui,
  SiBootstrap,
  SiReacthookform,
  SiAxios,
  SiFramer,
  SiGreensock,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiZod,
  SiMongodb,
  SiMongoose,
  SiPostgresql,
  SiPrisma,
  SiGithub,
  SiGit,
  SiRedux,
  SiReactquery,
  SiPostman,
  SiSwagger,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { SkillCard } from "./skills/SkillCard";
import { SkillCategoryTabs } from "./skills/SkillCategoryTabs";
import { SkillStats } from "./skills/SkillStats";
import type { CategoryKey, FilterCategory, SkillMeta } from "./skills/types";

gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA: SkillMeta[] = [
  // Frontend
  {
    name: "React / Next.js",
    category: "frontend",
    icons: [
      { icon: SiNextdotjs, color: "#ffffff" },
      { icon: SiReact, color: "#61DAFB" },
    ],
    brandColor: "#61DAFB",
    tag: "SSR & App Router",
  },
  {
    name: "TypeScript",
    category: "frontend",
    icons: [{ icon: SiTypescript, color: "#3178C6" }],
    brandColor: "#3178C6",
    tag: "Type Safety",
  },
  {
    name: "JavaScript (ES6+)",
    category: "frontend",
    icons: [{ icon: SiJavascript, color: "#F7DF1E" }],
    brandColor: "#F7DF1E",
    tag: "Modern Runtime",
  },
  {
    name: "HTML5 / CSS3",
    category: "frontend",
    icons: [
      { icon: SiHtml5, color: "#E34F26" },
      { icon: FaCss3Alt, color: "#1572B6" },
    ],
    brandColor: "#E34F26",
    tag: "Responsive & Semantic",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    icons: [{ icon: SiTailwindcss, color: "#06B6D4" }],
    brandColor: "#06B6D4",
    tag: "Modern Styling",
  },
  {
    name: "shadcn/ui",
    category: "frontend",
    icons: [{ icon: SiShadcnui, color: "#f8fafc" }],
    brandColor: "#ffffff",
    tag: "UI Architecture",
  },
  {
    name: "Redux / Zustand",
    category: "frontend",
    icons: [{ icon: SiRedux, color: "#764ABC" }],
    brandColor: "#764ABC",
    tag: "State Management",
  },
  {
    name: "React Query",
    category: "frontend",
    icons: [{ icon: SiReactquery, color: "#FF4154" }],
    brandColor: "#FF4154",
    tag: "Server State & Cache",
  },
  {
    name: "MUI / Bootstrap",
    category: "frontend",
    icons: [
      { icon: SiMui, color: "#007FFF" },
      { icon: SiBootstrap, color: "#7952B3" },
    ],
    brandColor: "#007FFF",
    tag: "UI Components",
  },
  {
    name: "React Hook Form",
    category: "frontend",
    icons: [{ icon: SiReacthookform, color: "#EC5990" }],
    brandColor: "#EC5990",
    tag: "Form Management",
  },
  {
    name: "Axios",
    category: "frontend",
    icons: [{ icon: SiAxios, color: "#5A29E4" }],
    brandColor: "#5A29E4",
    tag: "HTTP Client",
  },
  {
    name: "Framer Motion",
    category: "frontend",
    icons: [{ icon: SiFramer, color: "#0055FF" }],
    brandColor: "#0055FF",
    tag: "UI Animation",
  },
  {
    name: "GSAP",
    category: "frontend",
    icons: [{ icon: SiGreensock, color: "#88CE02" }],
    brandColor: "#88CE02",
    tag: "Web Animation",
  },

  // Backend
  {
    name: "Node.js",
    category: "backend",
    icons: [{ icon: SiNodedotjs, color: "#5FA04E" }],
    brandColor: "#5FA04E",
    tag: "Server Environment",
  },
  {
    name: "Express.js",
    category: "backend",
    icons: [{ icon: SiExpress, color: "#cbd5e1" }],
    brandColor: "#94a3b8",
    tag: "REST Framework",
  },
  {
    name: "RESTful APIs",
    category: "backend",
    icons: [{ icon: TbApi, color: "#22D3EE" }],
    brandColor: "#22D3EE",
    tag: "API Architecture",
  },
  {
    name: "JWT Authentication",
    category: "backend",
    icons: [{ icon: SiJsonwebtokens, color: "#D63AFF" }],
    brandColor: "#D63AFF",
    tag: "Auth & Security",
  },
  {
    name: "Refresh Tokens",
    category: "backend",
    icons: [{ icon: RefreshCw, color: "#22D3EE" }],
    brandColor: "#22D3EE",
    tag: "Session Security",
  },
  {
    name: "Cookie Authentication",
    category: "backend",
    icons: [{ icon: Cookie, color: "#F59E0B" }],
    brandColor: "#F59E0B",
    tag: "Secure Sessions",
  },
  {
    name: "Role-Based Authorization (RBAC)",
    category: "backend",
    icons: [{ icon: ShieldCheck, color: "#10B981" }],
    brandColor: "#10B981",
    tag: "Access Control",
  },
  {
    name: "Express Validator",
    category: "backend",
    icons: [{ icon: KeyRound, color: "#8B5CF6" }],
    brandColor: "#8B5CF6",
    tag: "Request Validation",
  },
  {
    name: "Multer",
    category: "backend",
    icons: [{ icon: FileUp, color: "#F97316" }],
    brandColor: "#F97316",
    tag: "File Uploads",
  },
  {
    name: "Nodemailer",
    category: "backend",
    icons: [{ icon: MailCheck, color: "#EA4335" }],
    brandColor: "#EA4335",
    tag: "Email Services",
  },
  {
    name: "Zod Validation",
    category: "backend",
    icons: [{ icon: SiZod, color: "#3E67B1" }],
    brandColor: "#3E67B1",
    tag: "Schema Validation",
  },

  // Database
  {
    name: "MongoDB",
    category: "database",
    icons: [{ icon: SiMongodb, color: "#47A248" }],
    brandColor: "#47A248",
    tag: "Document NoSQL",
  },
  {
    name: "Mongoose",
    category: "database",
    icons: [{ icon: SiMongoose, color: "#e11d48" }],
    brandColor: "#e11d48",
    tag: "Data Modeling",
  },
  {
    name: "PostgreSQL",
    category: "database",
    icons: [{ icon: SiPostgresql, color: "#4169E1" }],
    brandColor: "#4169E1",
    tag: "Relational Database",
  },
  {
    name: "Prisma",
    category: "database",
    icons: [{ icon: SiPrisma, color: "#6366f1" }],
    brandColor: "#6366f1",
    tag: "TypeScript ORM",
  },

  // Tools
  {
    name: "Git & GitHub",
    category: "tools",
    icons: [
      { icon: SiGit, color: "#F05032" },
      { icon: SiGithub, color: "#cbd5e1" },
    ],
    brandColor: "#F05032",
    tag: "Version Control",
  },
  {
    name: "Postman / Swagger",
    category: "tools",
    icons: [
      { icon: SiPostman, color: "#FF6C37" },
      { icon: SiSwagger, color: "#85EA2D" },
    ],
    brandColor: "#FF6C37",
    tag: "API Testing & Docs",
  },
];

const CATEGORY_TABS: Array<{ key: FilterCategory; icon: React.ElementType }> = [
  { key: "all", icon: Sparkles },
  { key: "frontend", icon: Layers },
  { key: "backend", icon: Terminal },
  { key: "database", icon: Database },
  { key: "tools", icon: Wrench },
];

export default function Skills() {
  const t = useTranslations("skills");
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-header", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".skills-tabs",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-tabs", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".skills-stats",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".skills-stats", start: "top 90%" },
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
      {/* Background ambient orbs */}
      <div
        className="absolute end-0 top-1/4 w-96 h-96 rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{ background: "var(--accent-violet)" }}
      />
      <div
        className="absolute start-0 bottom-1/4 w-96 h-96 rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ background: "var(--accent-cyan)" }}
      />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="skills-header mb-12 max-w-2xl">
          <span
            className="inline-flex items-center text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full border"
            style={{
              color: "var(--accent-violet)",
              borderColor: "var(--border-color)",
              background: "var(--bg-glass)",
            }}
          >
            {t("badge")}
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            {t("title")
              .split("\n")
              .map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="text-gradient">{line}</span> : line}
                </span>
              ))}
          </h2>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            {t("subtitle")}
          </p>
        </div>

        <SkillCategoryTabs
          tabs={CATEGORY_TABS}
          activeCategory={activeCategory}
          skills={SKILLS_DATA}
          getLabel={(key) => t(`categories.${key}`)}
          onCategoryChange={setActiveCategory}
        />

        {/* Skills Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        <SkillStats skills={SKILLS_DATA} />
      </div>
    </section>
  );
}
