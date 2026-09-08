import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { clients, sectors, type ServiceSector } from "@/data/site";

export const Route = createFileRoute("/")(
  {
    head: () => ({
      meta: [
        { title: "Range Engineering Inc. | Mechanical, Electrical & Plumbing" },
        {
          name: "description",
          content:
            "One coordinated team for mechanical, electrical and plumbing design. Restaurant, residential and institutional fit-outs engineered across Ontario.",
        },
        { property: "og:title", content: "Range Engineering Inc." },
        {
          property: "og:description",
          content: "Fit-outs, fully coordinated — MEP engineering across Ontario.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    }),
    component: Home,
  });

/* ─────────────────────────────────────────────── HERO */
const heroSlides = [
  {
    image: "/her.webp",
    title: "Comfort,\nengineered in.",
  },
  {
    image: "/her1.webp",
    title: "Systems,\ndesigned right.",
  },
  {
    image: "/her2.webp",
    title: "Vision,\nbrought to life.",
  },
  {
    image: "/her3.webp",
    title: "Built for\nbetter spaces.",
  },
  {
    image: "/her4.webp",
    title: "Performance,\nwithout compromise.",
  },
];

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[85vh] lg:h-[calc(100vh-5rem)] min-h-[500px] overflow-hidden bg-black">

      {/* Slider Backgrounds */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentSlide ? 1 : 0, zIndex: index === currentSlide ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt="Hero Background"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Top Left Badge (Full Edge) */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-30">
        <img
          src="/batch.png"
          alt="Hero Badge"
          className="h-24 md:h-28 lg:h-36 w-auto object-contain animate-fade-in-up drop-shadow-2xl"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container-page h-full flex flex-col justify-center">
        <div className="max-w-3xl pt-16">
          <h1
            key={currentSlide}
            className="font-display font-medium leading-[1.1] tracking-tight text-white animate-fade-in-up whitespace-pre-line"
            style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)", textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
          >
            {heroSlides[currentSlide]?.title}
          </h1>
        </div>
      </div>

      {/* Navigation Arrows (Right side) */}
      <div className="absolute right-4 sm:right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 hidden sm:flex">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Bottom Indicators */}
      <div className="absolute bottom-6 sm:bottom-10 right-8 sm:right-12 z-20 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="transition-all duration-300"
          >
            <div
              className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-2 bg-primary" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
            />
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────── image map for 12 sectors */
const sectorImages: Record<string, string> = {
  "restaurants": "/Construction -1.jpg",
  "custom-homes": "/Building 1B.jpg",
  "modular-house": "/233 Armstrong Ave_11 - Photo.jpg",
  "townhouse": "/233 Armstrong Ave_16 - Photo.jpg",
  "industrial": "/Constrcution pic 1.jpg",
  "multiplex-infill": "/233 Armstrong Ave_21 - Photo.jpg",
  "commercial-retail": "/Render 3.jpg",
  "daycare-recreation": "/233 Armstrong Ave_22 - Photo.jpg",
  "office": "/233 Armstrong Ave_27 - Photo.jpg",
  "laboratory": "/Construction -3.jpg",
  "automotive": "/Construction -4.jpg",
  "midrise-residential": "/Rear Elevation-1.jpg",
};

/* ─────────────────────────────────────────────── SECTOR MODAL */
function SectorModal({ sector, onClose }: { sector: ServiceSector; onClose: () => void }) {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const totalSectors = sectors.length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const img = sectorImages[sector.id];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(5,5,5,0.85)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div
        className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl"
        style={{ maxHeight: "90vh", background: "#0f0f0f", boxShadow: "0 40px 120px rgba(0,0,0,0.8)" }}
      >
        {/* hero image strip */}
        {img && (
          <div className="relative h-52 w-full flex-shrink-0 overflow-hidden">
            <img
              src={img}
              alt={sector.name}
              className="h-full w-full object-cover"
              style={{ filter: "brightness(0.55)" }}
            />
            {/* gradient */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(15,15,15,0) 30%, #0f0f0f 100%)" }}
            />
            {/* sector number + close */}
            <div className="absolute left-7 top-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
                {String(sectors.findIndex(s => s.id === sector.id) + 1).padStart(2, "0")} / {String(totalSectors).padStart(2, "0")}
              </p>
            </div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full transition-all"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}
            >
              <X className="size-4 text-white" />
            </button>
            {/* title over image */}
            <div className="absolute bottom-0 left-7 right-7 pb-0">
              <h3 className="text-2xl font-bold text-white tracking-tight">{sector.name}</h3>
            </div>
          </div>
        )}

        {/* body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 sm:px-7 sm:py-6">
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            {sector.fullDesc}
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sector.highlights.map((h, i) => (
              <div
                key={h}
                className="flex items-start gap-2.5 rounded-xl p-3.5"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span
                  className="mt-0.5 text-xs font-bold"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-snug text-white/80">{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* footer */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3 px-6 py-4 sm:px-7 sm:py-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <button
            onClick={() => {
              onClose();
              navigate({ to: `/portfolio/${sector.id}` });
            }}
            className="flex w-full flex-1 items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #c9a84c, #a07c2e)" }}
          >
            View Portfolio
            <ArrowUpRight className="size-4" />
          </button>
          <button
            onClick={onClose}
            className="flex w-full sm:w-auto items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white/60 transition-all hover:text-white"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── 12-GRID SECTORS */
function WhatWeDo() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      <section className="bg-white py-24 md:py-32 overflow-hidden">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between container-page">
          <div>
            <p
              className="font-mono text-[0.65rem] uppercase tracking-[0.3em]"
              style={{ color: "rgba(0,0,0,0.5)" }}
            >
              What We Do
            </p>
            <h2
              className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl"
            >
              Project Portfolio<br />
              <span style={{ color: "#c9a84c" }}>Built for every space.</span>
            </h2>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed md:text-right"
            style={{ color: "rgba(0,0,0,0.6)" }}
          >
            From restaurants to healthcare — we deliver coordinated MEP solutions across a wide
            range of building types and project needs.
          </p>
        </div>

        {/* ── Premium image grid (Full Width Edge-to-Edge) ── */}
        <div className="grid w-[100vw] grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-5">
          {sectors.map((sector, i) => {
            const img = sectorImages[sector.id];
            const isHovered = hoveredId === sector.id;

            return (
              <div
                key={sector.id}
                className="group relative cursor-pointer overflow-hidden bg-[#121212] transition-all duration-500 border border-white/5"
                style={{
                  minHeight: "420px",
                  aspectRatio: "1 / 1.15",
                  boxShadow: isHovered
                    ? "inset 0 0 0 1px rgba(201,168,76,0.45), 0 0 20px rgba(0,0,0,0.5)"
                    : "none",
                  zIndex: isHovered ? 10 : 1,
                }}
                onMouseEnter={() => setHoveredId(sector.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => navigate({ to: `/portfolio/${sector.id}` })}
              >
                {img && (
                  <img
                    src={img}
                    alt={sector.name}
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
                    style={{
                      transform: isHovered ? "scale(1.08)" : "scale(1)",
                    }}
                  />
                )}

                <div
                  className="absolute inset-x-0 bottom-0 top-1/2 transition-opacity duration-500"
                  style={{
                    background: isHovered
                      ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                  }}
                />

                <div
                  className="absolute right-0 top-0 h-20 w-20 opacity-80"
                  style={{
                    background: isHovered
                      ? "linear-gradient(135deg, rgba(201,168,76,0.5) 0%, rgba(201,168,76,0.06) 52%, transparent 100%)"
                      : "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 52%, transparent 100%)",
                  }}
                />

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <div
                      className="inline-flex items-center justify-center border border-white/20 bg-black/20 px-3 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.28em] transition-colors"
                      style={{ color: isHovered ? "#f0d280" : "rgba(255,255,255,0.85)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    <div
                      className="h-10 w-10 border border-white/15 bg-white/5 backdrop-blur-[2px]"
                      style={{
                        transform: isHovered ? "rotate(0deg)" : "rotate(45deg)",
                        transition: "transform 0.5s ease",
                      }}
                    />
                  </div>

                  <div>
                    <div
                      className="mb-3 inline-flex items-center gap-2 border border-white/10 bg-black/10 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.22em] transition-colors"
                      style={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      Sector
                    </div>

                    <h3
                      className="text-2xl font-bold leading-tight text-white md:text-[1.6rem]"
                      style={{ textShadow: "0 3px 18px rgba(0,0,0,0.6)" }}
                    >
                      {sector.name}
                    </h3>

                    <p
                      className="mt-3 max-w-[28ch] text-sm leading-relaxed text-white/80 transition-opacity duration-300"
                      style={{ opacity: isHovered ? 1 : 0.9 }}
                    >
                      {sector.shortDesc}
                    </p>

                    <div
                      className="mt-6 flex items-center gap-2 transition-all duration-300"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(6px)",
                      }}
                    >
                      <span
                        className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.28em]"
                        style={{ color: "#f0d280" }}
                      >
                        Explore
                      </span>
                      <ArrowUpRight className="size-4" style={{ color: "#f0d280" }} />
                    </div>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
                  style={{
                    width: isHovered ? "100%" : "0%",
                    background: "linear-gradient(to right, #c9a84c, #f0d280, #d9c07a)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* bottom CTA */}
        <div className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:justify-between container-page">
          <p
            className="font-mono text-[0.65rem] text-center uppercase tracking-[0.25em] sm:text-left"
            style={{ color: "rgba(0,0,0,0.5)" }}
          >
            GTA · Ottawa · Ontario
          </p>
          <Link
            to="/portfolio"
            search={{ sector: undefined }}
            className="inline-flex items-center gap-3 rounded-full px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-opacity hover:opacity-80"
            style={{ border: "1px solid rgba(0,0,0,0.2)" }}
          >
            Browse All Projects
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

    </>
  );
}

/* ─────────────────────────────────────────────── HOME PAGE */
function Home() {
  const marqueeClients = [...clients, ...clients];

  return (
    <SiteLayout>
      <Hero />
      <WhatWeDo />

      <section className="border-t border-border bg-white py-12 md:py-16">
        <div className="container-page">

          <div className="overflow-hidden border-y border-black/10 bg-black/[0.02]">
            <div
              className="flex w-max items-center gap-16 py-8"
              style={{
                animation: "franchise-scroll 22s linear infinite",
              }}
            >
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((num, i) => (
                <img
                  key={i}
                  src={`/f${num}.png`}
                  alt={`Franchise ${num}`}
                  className="h-16 w-auto object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-16 md:py-24">
        <div className="container-page flex flex-col items-center text-center justify-between gap-8 md:flex-row md:text-left md:items-center">
          <h2 className="max-w-xl text-3xl font-semibold md:text-4xl">
            Have drawings ready? Let's get your systems coordinated.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-9 py-5 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5"
          >
            Start Project
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes franchise-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </SiteLayout>
  );
}
