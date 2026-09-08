import { defineConfig } from "vite";
import { existsSync, readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

const deploymentAssets = new Set([
  "233 Armstrong Ave_11 - Photo.jpg",
  "233 Armstrong Ave_16 - Photo.jpg",
  "233 Armstrong Ave_21 - Photo.jpg",
  "233 Armstrong Ave_22 - Photo.jpg",
  "233 Armstrong Ave_27 - Photo.jpg",
  "about.webp",
  "about2.jpg",
  "Building 1B.jpg",
  "Construction -1.jpg",
  "Construction -2.jpg",
  "Construction -3.jpg",
  "Construction -4.jpg",
  "Constrcution pic 1.jpg",
  "f1.png",
  "f2.png",
  "f3.png",
  "f4.png",
  "f5.png",
  "favicon.ico",
  "footer.jpg",
  "Hero.jpg",
  "Hero2.jpg",
  "Logo.png",
  "Rear Elevation-1.jpg",
  "Render 3.jpg",
  "robots.txt",
  "services.jpg",
  "Sutha.png",
  "her.webp",
  "her1.webp",
  "her2.webp",
  "her3.webp",
  "her4.webp",
  "batch.png",
]);

export default defineConfig({
  plugins: [
    tailwindcss(),
    TanStackRouterVite(),
    react(),
    tsconfigPaths(),
    {
      name: "copy-deployment-assets",
      closeBundle() {
        const outputDir = resolve("dist");
        for (const asset of readdirSync(outputDir)) {
          if (asset !== "assets" && asset !== "index.html" && !deploymentAssets.has(asset)) {
            const assetPath = resolve(outputDir, asset);
            if (existsSync(assetPath)) rmSync(assetPath, { recursive: true, force: true });
          }
        }
      },
    },
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
