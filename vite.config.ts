import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg"],
      workbox: {
        // O padrão do workbox não cobre fontes — sem isto o app instalado
        // perderia as fontes dos temas justamente quando está offline.
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
      },
      manifest: {
        name: "Dossiê a Dois",
        short_name: "Dossiê",
        description: "Jogo de investigação cooperativo para dois jogadores num só tablet",
        lang: "pt-BR",
        display: "fullscreen",
        orientation: "portrait",
        background_color: "#12141a",
        theme_color: "#12141a",
        icons: [
          { src: "icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      }
    })
  ],
  test: {
    environment: "node"
  }
} as any);
