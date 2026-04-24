"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ArrowDown, Download, Sparkles } from "lucide-react";
import Link from "next/link";

const ROLES_EN = ["Full Stack Engineer", "UI/UX Enthusiast", "Open Source Contributor", "Problem Solver"];
const ROLES_AR = ["مهندس برمجيات متكامل", "مطور واجهات وتجارب", "مساهم في المصدر المفتوح", "حلّال مشكلات"];


export default function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Raw roles from translation
  const roles = [t("roles.0"), t("roles.1"), t("roles.2")];

  // Typewriter effect
  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => setIsPaused(false), 1600);
      return () => clearTimeout(pauseTimer);
    }

    const current = roles[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length + 1 === current.length) {
          setIsPaused(true);
          setIsDeleting(true);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayText, isDeleting, roleIndex, isPaused]);

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.4 });

    tl.fromTo(greetingRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(nameRef.current, { opacity: 0, y: 40, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 0.9, ease: "power4.out" }, "-=0.3")
      .fromTo(roleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .fromTo(taglineRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2");

    return () => { tl.kill(); };
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-mesh"
    >
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large violet orb */}
        <div
          className="absolute w-150 h-150 rounded-full blur-[120px] opacity-20 float-1"
          style={{ background: "var(--accent-violet)", top: "-10%", right: "-5%" }}
        />
        {/* Cyan accent orb */}
        <div
          className="absolute w-100 h-100 rounded-full blur-[100px] opacity-15 float-2"
          style={{ background: "var(--accent-cyan)", bottom: "5%", left: "-5%" }}
        />
        {/* Small bright orb */}
        <div
          className="absolute w-50 h-50 rounded-full blur-[60px] opacity-20 float-3"
          style={{ background: "var(--accent-violet)", bottom: "30%", right: "20%" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--border-color) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-color) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating geometric shapes */}
        <div
          className="absolute top-1/4 inset-s-[8%] w-16 h-16 float-1 opacity-30"
          style={{
            border: "1px solid var(--accent-violet)",
            borderRadius: "4px",
            transform: "rotate(15deg)",
          }}
        />
        <div
          className="absolute bottom-1/3 inset-e-[12%] w-10 h-10 float-2 opacity-25"
          style={{
            border: "1px solid var(--accent-cyan)",
            borderRadius: "50%",
          }}
        />
        <div
          className="absolute top-2/3 inset-s-[20%] w-6 h-6 float-3 opacity-20"
          style={{
            background: "var(--accent-violet)",
            borderRadius: "2px",
            transform: "rotate(45deg)",
          }}
        />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 opacity-0" ref={greetingRef}>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium"
              style={{
                background: "var(--bg-glass)",
                borderColor: "var(--border-color)",
                color: "var(--accent-violet)",
              }}
            >
              <Sparkles size={14} />
              <span>{t("greeting")}</span>
            </div>
          </div>

          {/* Name */}
          <h1
            ref={nameRef}
            className="text-5xl sm:text-7xl md:text-8xl font-black leading-none tracking-tight mb-4 opacity-0"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="block">{t("name")}</span>
          </h1>

          {/* Animated role */}
          <div className="flex items-center gap-3 mb-6 h-12 opacity-0" ref={roleRef}>
            <div
              className="w-6 h-0.5 shrink-0"
              style={{ background: "var(--accent-cyan)" }}
            />
            <span
              className="text-xl sm:text-2xl md:text-3xl font-light"
              style={{ color: "var(--accent-cyan)" }}
            >
              {displayText}
              <span
                className="inline-block w-0.5 h-[1em] ms-0.5 align-middle"
                style={{
                  background: "var(--accent-violet)",
                  animation: "cursor-blink 1s step-end infinite",
                }}
              />
            </span>
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 opacity-0"
            style={{ color: "var(--text-secondary)" }}
          >
            {t("tagline")}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 opacity-0">
            <button
              onClick={scrollToAbout}
              className="group relative px-7 py-3.5 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--accent-violet), #6d28d9)",
                color: "#fff",
                boxShadow: "0 0 30px rgba(139,92,246,0.4)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t("cta_primary")}
                <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
              </span>
            </button>

            <Link
              href="/cv/Mohamed Ayman - Frontend_Developer.pdf"
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-300 hover:scale-105"
              style={{
                borderColor: "var(--border-color)",
                background: "var(--bg-glass)",
                color: "var(--text-primary)",
              }}
              download
            >
              <Download size={15} />
              {t("cta_secondary")}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 cursor-pointer"
        onClick={scrollToAbout}
      >
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
          {t("scroll")}
        </span>
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
          style={{ borderColor: "var(--border-color)" }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{
              background: "var(--accent-violet)",
              animation: "float 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
