import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { routing } from "@/i18n/routing";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import PageLoader from "@/components/layout/PageLoader";
import JsonLd from "@/components/seo/JsonLd";

/* ---------------- Fonts (BEST WAY) ---------------- */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

/* ---------------- Metadata ---------------- */
const SITE_URL = "https://portfolio-ma-rouge.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Mohamed Ayman — Full Stack Engineer",
    template: "%s | Mohamed Ayman",
  },

  description:
    "Portfolio of Mohamed Ayman, a Full Stack Engineer & Frontend Developer from Egypt. Specializing in React, Next.js, TypeScript, and scalable web applications. Available for freelance and full-time opportunities.",

  keywords: [
    "Mohamed Ayman",
    "Mohamed Ayman developer",
    "Mohamed Ayman portfolio",
    "Full Stack Engineer Egypt",
    "Full Stack Developer",
    "Frontend Developer Egypt",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer portfolio",
    "Mansoura developer",
    "مطور واجهات",
    "مطور ويب",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "web developer for hire",
    "freelance frontend developer",
  ],

  authors: [{ name: "Mohamed Ayman", url: SITE_URL }],

  creator: "Mohamed Ayman",
  publisher: "Mohamed Ayman",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "en": `${SITE_URL}/en`,
      "ar": `${SITE_URL}/ar`,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_EG",
    url: SITE_URL,
    siteName: "Mohamed Ayman — Portfolio",
    title: "Mohamed Ayman — Full Stack Engineer",
    description:
      "Full Stack Engineer & Frontend Developer specializing in React, Next.js, and TypeScript. Crafting digital experiences at the intersection of design and engineering.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mohamed Ayman — Full Stack Engineer Portfolio",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mohamed Ayman — Full Stack Engineer",
    description:
      "Full Stack Engineer & Frontend Developer specializing in React, Next.js, and TypeScript. Available for freelance and full-time opportunities.",
    images: ["/opengraph-image.png"],
    creator: "@mohamedayman",
  },

  verification: {
    google: "googled867061e4a7d905b",
  },

  category: "technology",
};

/* ---------------- Locale Params ---------------- */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/* ---------------- Layout ---------------- */
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} className={`${inter.variable} ${arabic.variable}`} suppressHydrationWarning>
      <body className="noise font-sans">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <NextIntlClientProvider messages={messages}>
            <JsonLd />
            <PageLoader />
            <CustomCursor />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
