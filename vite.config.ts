import { defineConfig } from "vite";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";
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
        name: "dev-php-middleware",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const url = req.url ? req.url.split("?")[0] : "";
            if (url.endsWith(".php")) {
              const filePath = resolve("public", url.replace(/^\//, ""));
              if (existsSync(filePath)) {
                let body = "";
                req.on("data", (chunk) => {
                  body += chunk;
                });
                req.on("end", () => {
                  const php = spawn("php", [filePath], {
                    env: {
                      ...process.env,
                      REQUEST_METHOD: req.method || "GET",
                      REMOTE_ADDR: req.socket.remoteAddress || "127.0.0.1",
                      CONTENT_TYPE: req.headers["content-type"] || "",
                      CONTENT_LENGTH: Buffer.byteLength(body).toString(),
                    },
                  });

                  if (body) {
                    php.stdin.write(body);
                  }
                  php.stdin.end();

                  let output = Buffer.alloc(0);
                  php.stdout.on("data", (chunk) => {
                    output = Buffer.concat([output, chunk]);
                  });

                  php.on("close", (code) => {
                    const rawOutput = output.toString("utf8");
                    const headerSplit = rawOutput.indexOf("\r\n\r\n");
                    const lfSplit = rawOutput.indexOf("\n\n");
                    const splitIndex = headerSplit !== -1 ? headerSplit : lfSplit;
                    const splitLength = headerSplit !== -1 ? 4 : 2;

                    if (splitIndex !== -1) {
                      const headerLines = rawOutput.slice(0, splitIndex).split(/\r?\n/);
                      const bodyContent = rawOutput.slice(splitIndex + splitLength);

                      for (const line of headerLines) {
                        const [key, ...vals] = line.split(":");
                        if (key && vals.length > 0) {
                          res.setHeader(key.trim(), vals.join(":").trim());
                        }
                      }
                      res.statusCode = 200;
                      res.end(bodyContent);
                    } else {
                      res.setHeader("Content-Type", "application/json");
                      res.end(rawOutput);
                    }
                  });

                  php.on("error", (err) => {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ success: false, message: err.message }));
                  });
                });
                return;
              }
            }
            next();
          });
        },
      },
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
