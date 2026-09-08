import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
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
      className={cn("border-b border-border bg-surface", image && "relative overflow-hidden bg-cover bg-center")}
      {...(image ? { style: { backgroundImage: `url(${image})` } } : {})}
    >
      {image && <div className="absolute inset-0 bg-ink/60" />}
      <div className={cn("container-page py-20 md:py-28 relative z-10", image && "*:text-surface")}>
        <p className={cn("eyebrow", image && "text-primary-foreground/90")}>{eyebrow}</p>
        <h1 className={cn("mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl", image && "text-white")}>
          {title}
        </h1>
        <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft", image && "text-white/90")}>{description}</p>
      </div>
    </section>
  );
}
