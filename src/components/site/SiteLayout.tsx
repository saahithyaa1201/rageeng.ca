import { useEffect, useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleImageClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement) || !target.closest("main")) return;

      setLightboxImage({ src: target.currentSrc || target.src, alt: target.alt });
    };

    document.addEventListener("click", handleImageClick);
    return () => document.removeEventListener("click", handleImageClick);
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxImage(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <style>{`main img { cursor: zoom-in; }`}</style>
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded portfolio image"
          onClick={() => setLightboxImage(null)}
        >
          <button
            type="button"
            aria-label="Close expanded image"
            className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full bg-white/15 text-2xl text-white transition-colors hover:bg-white/25"
            onClick={() => setLightboxImage(null)}
          >
            &times;
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="max-h-full max-w-full rounded-md object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section
      className={cn("-mt-[100px] border-b border-border bg-surface isolate", image && "relative overflow-hidden bg-cover bg-center")}
      {...(image ? { style: { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } } : {})}
    >
      {image && <div className="absolute inset-0 z-0 bg-black/45" />}
      <div className="container-page flex min-h-[420px] items-start justify-start pt-36 md:pt-44 pb-20 md:pb-28 relative z-10">
        <div className="max-w-3xl text-left">
          <p className={cn("eyebrow", image ? "text-primary-foreground/90" : "text-muted-foreground")}>{eyebrow}</p>
          <h1 className={cn("mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl", image ? "text-white" : "text-ink")}>
            {title}
          </h1>
          <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", image ? "text-white/90" : "text-ink-soft")}>{description}</p>
        </div>
      </div>
    </section>
  );
}

