import { defineConfig } from "vite";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(function ({ command }) {
  return {
    publicDir: command === "serve" ? "public" : false,
    plugins: [
      tailwindcss(),
      TanStackRouterVite(),
      react(),
      {
        name: "copy-all-public-assets",
        closeBundle() {
          const outputDir = resolve("dist");
          const publicDir = resolve("public");

          mkdirSync(outputDir, { recursive: true });

          // Remove old non-asset files from dist (keep assets/ and index.html)
          for (const asset of readdirSync(outputDir)) {
            if (asset !== "assets" && asset !== "index.html") {
              const assetPath = resolve(outputDir, asset);
              if (existsSync(assetPath)) rmSync(assetPath, { recursive: true, force: true });
            }
          }

          // Copy ALL files from public/ to dist/ so nothing is ever missing on deployment
          for (const file of readdirSync(publicDir)) {
            const sourcePath = resolve(publicDir, file);
            const destPath = resolve(outputDir, file);
            if (statSync(sourcePath).isFile()) {
              copyFileSync(sourcePath, destPath);
            }
          }
        },
      },
    ],
    resolve: {
      tsconfigPaths: true,
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});
