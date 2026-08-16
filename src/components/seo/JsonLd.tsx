/**
 * JSON-LD Structured Data for SEO
 *
 * Injects schema.org markup into the page head.
 * This enables Google rich results such as:
 * - Knowledge Panel (Person schema)
 * - Site links (WebSite + SearchAction)
 */

const SITE_URL = "https://portfolio-ma-rouge.vercel.app";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohamed Ayman",
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  jobTitle: "Full Stack Engineer",
  description:
    "Full Stack Engineer & Frontend Developer from Mansoura, Egypt. Specializing in React, Next.js, TypeScript, and scalable web applications.",
  email: "mohayman080@gmail.com",
  nationality: "Egyptian",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "Frontend Development",
    "Full Stack Engineering",
    "UI/UX Design",
    "REST APIs",
    "Web Performance",
  ],
  sameAs: [
    "https://github.com/mohamed080",
    "https://www.linkedin.com/in/mohamedayman13/",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelancer",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mansoura",
    addressCountry: "EG",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mohamed Ayman — Portfolio",
  url: SITE_URL,
  description:
    "Portfolio of Mohamed Ayman, a Full Stack Engineer specializing in React, Next.js, and TypeScript.",
  author: {
    "@type": "Person",
    name: "Mohamed Ayman",
  },
  inLanguage: ["en", "ar"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/en#projects`,
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/en`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: `${SITE_URL}/en#projects`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Experience",
      item: `${SITE_URL}/en#experience`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: `${SITE_URL}/en#contact`,
    },
  ],
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
