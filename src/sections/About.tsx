"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Users, Star, GitCommit } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import Image from "next/image";
import { StatCard } from "@/components/about/stat-card";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [shouldStartCounter, setShouldStartCounter] = useState(false);


  const stats = [
    { value: t("stats.projects.value"), label: t("stats.projects.label"), icon: Code2 },
    { value: t("stats.years.value"), label: t("stats.years.label"), icon: Star },
    { value: t("stats.clients.value"), label: t("stats.clients.label"), icon: Users },
    { value: t("stats.commits.value"), label: t("stats.commits.label"), icon: GitCommit },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        ".about-text-item",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );

      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
          },
        }
      );

      ScrollTrigger.create({
      trigger: statsRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        setShouldStartCounter(true);
      },
    });

      // Stats
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background accent */}
      <div
        className="absolute end-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "var(--accent-violet)" }}
      />

      <div className="container-custom">
        {/* Section header */}
        <div className="mb-16 about-text-item">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase mb-4 px-3 py-1.5 rounded-full border"
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

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div ref={textRef} className="space-y-6">
            <p className="text-lg leading-relaxed about-text-item" style={{ color: "var(--text-secondary)" }}>
              {t("bio1")}
            </p>
            <p className="text-lg leading-relaxed about-text-item" style={{ color: "var(--text-secondary)" }}>
              {t("bio2")}
            </p>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4 pt-4">
              {stats.map(({ value, label, icon }) => (
                 <StatCard
                  key={label}
                  value={value}
                  label={label}
                  icon={icon}
                  shouldAnimate={shouldStartCounter}
                />
              ))}
            </div>
          </div>

          {/* Right — Visual */}
          <div ref={imageRef} className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Outer animated ring */}
              <div
                className="absolute inset-0 rounded-full animated-border opacity-40"
                style={{ transform: "scale(1.15)" }}
              />
              {/* Main circle */}
              <div
                className="absolute inset-0 rounded-full overflow-hidden glass border"
                style={{ borderColor: "var(--border-color)" }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Mohamed Ayman"
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(6,182,212,0.2) 100%)",
                  }}
                />
              </div>
              {/* Social Icons - Positioned on the circle */}
              <a
                href="https://www.linkedin.com/in/mohamedayman13/" // Replace with your LinkedIn URL
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn profile"
                className="absolute -top-4 -start-4 glass p-3 rounded-xl border transition-all duration-300 hover:border-cyan-500/60 hover:scale-110 hover:-translate-x-1 group float-1"
                style={{ borderColor: "var(--border-color)" }}
              >
                <FaLinkedin
                  size={20}
                  className="transition-colors group-hover:opacity-100 opacity-70"
                  style={{ color: "var(--accent-cyan)" }}
                />
              </a>
              <a
                href="https://github.com/mohamed080/" // Replace with your GitHub URL
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub profile"
                className="absolute -bottom-4 -end-4 glass p-3 rounded-xl border transition-all duration-300 hover:border-cyan-500/60 hover:scale-110 hover:-translate-x-1 group float-2"
                style={{ borderColor: "var(--border-color)" }}
              >
                <FaGithub
                  size={20}
                  className="transition-colors group-hover:opacity-100 opacity-70"
                  style={{ color: "var(--accent-cyan)" }}
                />
              </a>
              {/* Floating badges */}
              <div
                className="absolute -top-4 -end-4 glass px-4 py-2 rounded-xl border text-xs font-semibold float-1"
                style={{ borderColor: "var(--border-glow)", color: "var(--accent-violet)" }}
              >
                ✦ Available for hire
              </div>
              <div
                className="absolute -bottom-4 -start-4 glass px-4 py-2 rounded-xl border text-xs font-semibold float-2"
                style={{ borderColor: "var(--border-glow)", color: "var(--accent-violet)" }}
              >
                1.5+ Years XP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
