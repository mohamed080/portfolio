"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GSAPCallback = (gsap: typeof import("gsap").gsap, ScrollTrigger: typeof ScrollTrigger) => gsap.core.Timeline | void;

export function useGSAPAnimation(callback: GSAPCallback, deps: React.DependencyList = []) {
  const ctx = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctx.current = gsap.context(() => {
      callback(gsap, ScrollTrigger);
    });

    return () => {
      ctx.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx;
}

export function useScrollReveal(selector: string, options?: ScrollTrigger.Vars) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: selector,
            start: "top 85%",
            toggleActions: "play none none none",
            ...options,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [selector, options]);
}

export function useCountUp(ref: React.RefObject<HTMLElement | null>, end: number, options?: { duration?: number; suffix?: string }) {
  const animate = useCallback(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: options?.duration ?? 2,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val) + (options?.suffix ?? "");
        }
      },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        once: true,
      },
    });
  }, [ref, end, options]);

  useEffect(() => {
    animate();
  }, [animate]);
}
