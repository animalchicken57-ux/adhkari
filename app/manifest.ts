import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "أذكاري · Adhkari",
    short_name: "أذكاري",
    description: "متتبّع أذكار الصباح والمساء مع مسبحة وأوقات الصلاة والقبلة.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1411",
    theme_color: "#0b6e4f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
