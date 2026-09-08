import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, MapPin, Utensils, Wrench } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

const gallery = [
  { src: "/Construction -1.jpg", alt: "Lava Grille project exterior concept" },
  { src: "/Construction -2.jpg", alt: "Lava Grille architectural project view" },
  { src: "/Construction -3.jpg", alt: "Lava Grille commercial project view" },
  { src: "/Construction -4.jpg", alt: "Lava Grille building detail" },
];
const heroImage = gallery[0]!;

export const Route = createFileRoute("/portfolio/lava-grille-markham")({
  head: () => ({
    meta: [
      { title: "Lava Grille | Range Engineering Inc." },
      {
        name: "description",
        content: "Explore Range Engineering's MEP design work for Lava Grille in Markham, Ontario.",
      },
    ],
  }),
  component: LavaGrillePage,
});

function LavaGrillePage() {
  return (
    <SiteLayout>
      <main className="bg-[#f5f3ef]">
        <section className="relative min-h-[76vh] overflow-hidden bg-[#111b22] text-white">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            className="absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111b22]/95 via-[#111b22]/65 to-[#111b22]/20" />
          <div className="container-page relative z-10 flex min-h-[76vh] items-end pb-16 pt-24 md:pb-24">
            <div className="max-w-3xl">
              <Link
                to="/portfolio"
                className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" />
                Back to portfolio
              </Link>
              <p className="eyebrow text-primary-foreground/80">Featured project · Restaurants</p>
              <div className="mt-6 flex flex-wrap items-center gap-6">
                <img src="/f1.png" alt="Lava logo" className="h-12 w-auto object-contain" />
                <span className="h-10 w-px bg-white/30" />
                <p className="flex items-center gap-2 text-sm text-white/75">
                  <MapPin className="size-4 text-primary" /> Markham, Ontario
                </p>
              </div>
              <h1 className="mt-8 max-w-2xl text-5xl font-semibold leading-[0.96] text-white md:text-7xl">
                Lava Grille
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
                A bold restaurant environment engineered from the inside out, balancing a high-energy dining experience with dependable building systems.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 hidden border-l border-t border-white/20 bg-[#111b22]/75 px-8 py-6 backdrop-blur md:block">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">Project no. 01</p>
            <p className="mt-2 text-sm text-white/70">Full MEP design set</p>
          </div>
        </section>

        <section className="container-page grid gap-12 py-20 md:grid-cols-[0.8fr_1.4fr] md:py-28">
          <div>
            <p className="eyebrow text-primary">Project details</p>
            <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-tight md:text-5xl">About the project</h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-xl leading-relaxed text-ink">
              Lava Grille is a dynamic restaurant space where atmosphere, flow, and performance work together. Range Engineering delivered the mechanical, electrical, and plumbing design needed to support a busy commercial kitchen and a comfortable guest experience.
            </p>
            <p className="mt-7 leading-relaxed text-ink-soft">
              From kitchen exhaust and make-up air to lighting, power distribution, plumbing, and life-safety coordination, every system was considered as part of the larger guest journey. The result is an environment that feels effortless for diners and works hard behind the scenes.
            </p>
            <div className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-3">
              <div>
                <Utensils className="size-5 text-primary" />
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink-soft">Sector</p>
                <p className="mt-2 font-semibold text-ink">Restaurant</p>
              </div>
              <div>
                <Wrench className="size-5 text-primary" />
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink-soft">Scope</p>
                <p className="mt-2 font-semibold text-ink">Full MEP set</p>
              </div>
              <div>
                <MapPin className="size-5 text-primary" />
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-ink-soft">Location</p>
                <p className="mt-2 font-semibold text-ink">Markham, ON</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#151f27] py-20 text-white md:py-28">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow text-primary">Inside the work</p>
                <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Designed for the experience</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-white/60">
                A considered mix of comfort, circulation, and behind-the-scenes performance brings the concept to life.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-12">
              {gallery.map((image, index) => (
                <figure key={image.src} className={index === 0 ? "md:col-span-7" : "md:col-span-5"}>
                  <div className="aspect-[4/3] overflow-hidden bg-white/5">
                    <img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center md:py-24">
          <div>
            <p className="eyebrow text-primary">Have a project in mind?</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight md:text-5xl">Let&apos;s engineer what comes next.</h2>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-cta transition-transform hover:-translate-y-1"
          >
            Start a conversation
            <ArrowUpRight className="size-4" />
          </Link>
        </section>
      </main>
    </SiteLayout>
  );
}
