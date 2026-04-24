"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { RiGlobalFill } from "react-icons/ri";

const NAV_ITEMS = [
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress();

  useEffect(() => setMounted(true), []);

  /* HEADER ANIMATION */
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 2.2 },
    );
  }, []);

    /* SCROLL EFFECT */
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const items = menuRef.current.querySelectorAll(".mobile-nav-item");
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
      );
      gsap.fromTo(
        items,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.06,
          delay: 0.05,
        },
      );
    }
  }, [menuOpen]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/") || "/");
  };

  const scrollTo = (id: string) => {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setMenuOpen(false);
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        },
      });
    } else {
      setMenuOpen(false);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

const toggleMenu = useCallback(() => {
  if (!menuOpen) {
    setMenuOpen(true);
  } else {
    if (menuRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setMenuOpen(false),
      });
    } else {
      setMenuOpen(false);
    }
  }
}, [menuOpen]);

  /* CLICK OUTSIDE HANDLER */
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    // If menu is open and click is NOT inside menuRef and NOT inside headerRef
    if (
      menuOpen &&
      menuRef.current && 
      !menuRef.current.contains(event.target as Node) &&
      headerRef.current && 
      !headerRef.current.contains(event.target as Node)
    ) {
      toggleMenu(); // This will trigger your GSAP animate-out
    }
  };

  if (menuOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [menuOpen, toggleMenu]); // Dependency on menuOpen to toggle the listener

  return (
    <>
      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      <header
        ref={headerRef}
        className="fixed top-0 inset-x-0 z-1000 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(2, 8, 23, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
        }}
      >
        <div className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5 group"
            aria-label="Mohamed Ayman — Home"
          >
            <div
              className="w-8 h-8 rounded-lg animated-border flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: "var(--bg-card)" }}
            >
              <span className="text-gradient font-black text-sm">MA</span>
            </div>
            <span
              className="font-semibold text-sm hidden sm:block"
              style={{ color: "var(--text-primary)" }}
            >
              Mohamed Ayman
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="px-3 py-1.5 text-sm rounded-md transition-all duration-200 hover:bg-white/10 hover:text-white"
                style={{ color: "var(--text-secondary)" }}
              >
                {t(item)}
              </button>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Lang switcher */}
            <button
              onClick={switchLocale}
              className="w-12 h-9 text-xs font-medium rounded-md border transition-all duration-200 hover:scale-105 flex justify-center items-center gap-1"
              style={{
                color: "var(--accent-violet)",
                borderColor: "var(--border-color)",
                background: "var(--bg-glass)",
              }}
              aria-label={t("switchLang")}
            >
              {t("switchLang")}
              <RiGlobalFill />
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-md border flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  borderColor: "var(--border-color)",
                  background: "var(--bg-glass)",
                  color: "var(--text-secondary)",
                }}
                aria-label={t("toggleTheme")}
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            {/* Mobile menu */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md"
              onClick={toggleMenu}
              style={{ color: "var(--text-secondary)" }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="md:hidden border-t px-6 py-4 flex flex-col gap-1"
            style={{
              background: "var(--bg-secondary)",
              borderColor: "var(--border-color)",
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="mobile-nav-item text-left py-2.5 text-sm border-b last:border-0 transition-colors flex items-center gap-3 group"
                style={{
                  color: "var(--text-secondary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <span
                  className="w-1 h-1 rounded-full shrink-0 transition-colors duration-200"
                  style={{ background: "var(--accent-violet)" }}
                />
                <span className="group-hover:text-white transition-colors duration-200">
                  {t(item)}
                </span>
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
