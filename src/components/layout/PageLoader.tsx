"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";

export default function PageLoader() {
  const t = useTranslations("loader");
  const loaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!loaderRef.current || !progressRef.current || !countRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => setIsVisible(false),
        });
      },
    });

    const obj = { val: 0 };

    tl.to(obj, {
      val: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(obj.val);
        if (countRef.current) countRef.current.textContent = String(rounded);
        if (progressRef.current) {
          progressRef.current.style.width = `${rounded}%`;
        }
      },
    });

    return () => { tl.kill(); };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background mesh */}
      <div className="absolute inset-0 hero-mesh opacity-50" />

      {/* Floating orbs */}
      <div
        className="absolute w-64 h-64 rounded-full float-1 blur-3xl opacity-20"
        style={{ background: "var(--accent-violet)", top: "20%", left: "15%" }}
      />
      <div
        className="absolute w-48 h-48 rounded-full float-2 blur-3xl opacity-15"
        style={{ background: "var(--accent-cyan)", bottom: "25%", right: "20%" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo / Name */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl animated-border flex items-center justify-center"
            style={{ background: "var(--bg-card)" }}
          >
            <span className="text-gradient font-black text-lg">M</span>
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: "var(--text-primary)" }}>
            Mohamed Ayman
          </span>
        </div>

        {/* Count */}
        <div className="flex items-end gap-1">
          <span
            ref={countRef}
            className="text-8xl font-black tabular-nums leading-none text-gradient"
          >
            0
          </span>
          <span className="text-4xl font-light pb-2" style={{ color: "var(--text-secondary)" }}>%</span>
        </div>

        {/* Progress bar */}
        <div
          className="w-64 h-[2px] rounded-full overflow-hidden"
          style={{ background: "var(--border-color)" }}
        >
          <div
            ref={progressRef}
            className="h-full rounded-full transition-none"
            style={{
              width: "0%",
              background: "linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))",
            }}
          />
        </div>

        {/* Label */}
        <p className="text-sm tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>
          {t("loading")}
        </p>
      </div>
    </div>
  );
}
