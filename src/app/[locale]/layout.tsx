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
export const metadata: Metadata = {
  title: "Mohamed Ayman — Full Stack Engineer",
  description:
    "Portfolio of Mohamed Ayman, a Full Stack Engineer specializing in Next.js, TypeScript, and scalable web applications. Available for freelance and full-time opportunities.",
  keywords: ["Full Stack Engineer", "Next.js", "TypeScript", "React", "Portfolio"],
  authors: [{ name: "Mohamed Ayman" }],
  openGraph: {
    title: "Mohamed Ayman — Full Stack Engineer",
    description: "Crafting digital experiences at the intersection of design and engineering.",
    type: "website",
  },
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
