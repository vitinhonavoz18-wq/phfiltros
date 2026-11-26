import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PH Filtros",
    short_name: "PH Filtros",
    description: "Filtros e purificadores de água em Salvador e região.",
    start_url: "/",
    display: "standalone",
    background_color: "#020810",
    theme_color: "#020810",
    lang: "pt-BR",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
