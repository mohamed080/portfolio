  import { useTranslations, useLocale } from "next-intl";
  import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

  export default function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale();
    const year = new Date().getFullYear();

    const socials = [
      { icon: FaGithub, href: "https://github.com/mohamed080", label: "GitHub" },
      { icon: FaLinkedin, href: "https://www.linkedin.com/in/mohamedayman13", label: "LinkedIn" },
      { icon: FaTwitter, href: "https://x.com/Mohamed16193852", label: "Twitter" },
    ];

    return (
      <footer
        className="border-t"
        style={{ borderColor: "var(--border-color)", background: "var(--bg-secondary)" }}
      >
        <div className="container-custom py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              Mohamed Ayman
            </span>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © {year} — {t("rights")}
            </p>
          </div>

          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {t("built_with")}
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-md border flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-violet-500"
                style={{
                  borderColor: "var(--border-color)",
                  color: "var(--text-muted)",
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    );
  }
