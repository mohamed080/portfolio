import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohamed Ayman — Full Stack Engineer",
    short_name: "Mohamed Ayman",
    description:
      "Portfolio of Mohamed Ayman, Full Stack Engineer specializing in React, Next.js & TypeScript.",
    start_url: "/en",
    display: "standalone",
    background_color: "#020817",
    theme_color: "#7c3aed",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    categories: ["portfolio", "technology", "developer"],
    lang: "en",
  };
}
