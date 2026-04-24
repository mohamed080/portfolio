"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Mail, MapPin, Zap } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

function FloatingInput({
  id,
  label,
  error,
  multiline = false,
  registration,
}: {
  id: string;
  label: string;
  error?: string;
  multiline?: boolean;
  registration: ReturnType<ReturnType<typeof useForm<FormData>>["register"]>;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const baseStyle: React.CSSProperties = {
    background: "var(--bg-glass)",
    border: `1px solid ${error ? "rgba(239,68,68,0.6)" : focused ? "var(--accent-violet)" : "var(--border-color)"}`,
    color: "var(--text-primary)",
    borderRadius: "0.75rem",
    width: "100%",
    padding: "1.25rem 1rem 0.75rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    resize: "none" as const,
    fontFamily: "inherit",
    backdropFilter: "blur(8px)",
  };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    top: focused || hasValue ? "0.45rem" : "1rem",
    insetInlineStart: "1rem",
    fontSize: focused || hasValue ? "0.65rem" : "0.875rem",
    color: error ? "rgb(239,68,68)" : focused ? "var(--accent-violet)" : "var(--text-muted)",
    transition: "all 0.2s ease",
    pointerEvents: "none",
    fontWeight: focused || hasValue ? 600 : 400,
    letterSpacing: focused || hasValue ? "0.05em" : "normal",
  };

  return (
    <div className="relative">
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          style={baseStyle}
          {...registration}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
            registration.onBlur(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            registration.onChange(e);
          }}
        />
      ) : (
        <input
          id={id}
          type={id === "email" ? "email" : "text"}
          style={baseStyle}
          {...registration}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(!!e.target.value);
            registration.onBlur(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            registration.onChange(e);
          }}
        />
      )}
      <label htmlFor={id} style={labelStyle}>{label}</label>
      {error && (
        <p className="text-xs mt-1.5 ms-1" style={{ color: "rgb(239,68,68)" }}>{error}</p>
      )}
    </div>
  );
}

export default function Contact() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-header", start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".contact-form",
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".contact-info",
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".contact-info", start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onSubmit = async (_data: FormData) => {
    setSubmitting(true);
    try{
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {          "Content-Type": "application/json"        },
        body: JSON.stringify(_data),
      });
      if(response.ok){
        setSubmitted(true);
        reset();
      } else {
        alert("Something went wrong. Please try again.")
      }
    }catch(err){
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  const socials = [
    { icon: FaGithub, href: "https://github.com/mohamed080", label: t("social.github") },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/mohamedayman13", label: t("social.linkedin") },
    { icon: FaTwitter, href: "https://x.com/Mohamed16193852", label: t("social.twitter") },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent-violet), var(--accent-cyan), transparent)" }}
      />
      <div
        className="absolute end-0 bottom-0 w-96 h-96 rounded-full blur-[130px] opacity-10 pointer-events-none"
        style={{ background: "var(--accent-violet)" }}
      />

      <div className="container-custom">
        {/* Header */}
        <div className="contact-header mb-16 max-w-2xl">
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

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info panel */}
          <div className="contact-info lg:col-span-2 space-y-8">
            <div className="space-y-4">
              {[
                { icon: Mail, value: t("info.email"), label: "Email" },
                { icon: MapPin, value: t("info.location"), label: "Location" },
                { icon: Zap, value: t("info.availability"), label: "Status" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(139,92,246,0.12)", border: "1px solid var(--border-color)" }}
                  >
                    <Icon size={16} style={{ color: "var(--accent-violet)" }} />
                  </div>
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--text-muted)" }}>
                Find me on
              </p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-violet-500/60 group"
                    style={{ borderColor: "var(--border-color)", background: "var(--bg-glass)" }}
                  >
                    <Icon size={16} className="group-hover:text-violet-400 transition-colors" style={{ color: "var(--text-muted)" }} />
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative quote */}
            <div
              className="p-5 rounded-xl border relative overflow-hidden"
              style={{ borderColor: "var(--border-color)", background: "var(--bg-card)" }}
            >
              <div
                className="absolute top-0 start-0 w-1 h-full"
                style={{ background: "linear-gradient(180deg, var(--accent-violet), var(--accent-cyan))" }}
              />
              <p className="text-sm italic leading-relaxed ps-3" style={{ color: "var(--text-secondary)" }}>
                &ldquo;The best code is the code that solves the problem simply and scales gracefully.&rdquo;
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form lg:col-span-3">
            {submitted ? (
              <div
                className="glass rounded-2xl border p-12 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[400px]"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}
                >
                  <CheckCircle2 size={32} style={{ color: "#10b981" }} />
                </div>
                <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {t("form.success_title")}
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>{t("form.success_desc")}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "rgba(139,92,246,0.15)", color: "var(--accent-violet)", border: "1px solid var(--border-color)" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="glass rounded-2xl border p-8 space-y-5"
                style={{ borderColor: "var(--border-color)" }}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingInput
                    id="name"
                    label={t("form.name")}
                    error={errors.name?.message}
                    registration={register("name")}
                  />
                  <FloatingInput
                    id="email"
                    label={t("form.email")}
                    error={errors.email?.message}
                    registration={register("email")}
                  />
                </div>
                <FloatingInput
                  id="subject"
                  label={t("form.subject")}
                  error={errors.subject?.message}
                  registration={register("subject")}
                />
                <FloatingInput
                  id="message"
                  label={t("form.message")}
                  error={errors.message?.message}
                  multiline
                  registration={register("message")}
                />

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-violet), #6d28d9)",
                    color: "#fff",
                    boxShadow: "0 0 30px rgba(139,92,246,0.35)",
                  }}
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      <Send size={15} /> {t("form.submit")}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
