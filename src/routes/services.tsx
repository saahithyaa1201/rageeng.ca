import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Ruler, Users, ThumbsUp } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { ImageSlot } from "@/components/site/ImageSlot";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Range Engineering Inc." },
      { name: "description", content: "Complete Solutions for Your MEP Engineering Design Needs" },
    ],
  }),
  component: ServicesPage,
});

const featuredProjects = [
  { category: "Sports and Gym Facilities", name: "Free Bird 24/7 Gym – Ontario", img: "/Construction -3.jpg" },
  { category: "Restaurants", name: "Lava Grille – Markham", img: "/Construction -1.jpg" },
  { category: "Custom Homes & Residentials", name: "2 Storley Addition to Existing Single Storley building", img: "/Building 1B.jpg" },
  { category: "Institutional", name: "Code Ninjas – Remebrance Rd. Brampton", img: "/233 Armstrong Ave_11 - Photo.jpg" },
  { category: "Custom Homes & Residentials", name: "Custom Home – Havelock Cottage", img: "/Rear Elevation-1.jpg" },
  { category: "Custom Homes & Residentials", name: "Custom Home – Dominica Cottage Project", img: "/Building 1B.jpg" },
  { category: "Custom Homes & Residentials", name: "Custom Home – Ajax Resident", img: "/Rear Elevation-1.jpg" },
  { category: "Custom Homes & Residentials", name: "Custom Home – Vauhan", img: "/Building 1B.jpg" },
  { category: "Custom Homes & Residentials", name: "Custom Home – Brampton", img: "/Rear Elevation-1.jpg" },
];

const stats = [
  { value: "300+", label: "Projects", desc: "Over 300+ successful projects delivered with precision and expertise." },
  { value: "200+", label: "Clients", desc: "A growing base of satisfied clients who trust us with their engineering needs." },
  { value: "98%", label: "Satisfaction", desc: "Our commitment to quality has resulted in a 98% client satisfaction rate." },
];

const mechanicalServices = [
  "Forced Air System Design",
  "Hydronic Heating System Design",
  "Commercial, Industrial, and Residential H.V.A.C. System Design",
  "General Exhaust System Design",
  "Commercial Kitchen Exhaust Systems Design",
  "Dust Collector Systems Design",
  "Building Automation and Controls Design (BAS)",
];

const electricalServices = [
  "Life Safety System Design",
  "Lighting and Associated Control Design",
  "Power Distribution System Design",
  "Communication System Design",
];

const plumbingServices = [
  "Above/Underground Storm & Sanitary Drainage System Design",
  "Domestic Cold & Hot Water Distribution Design",
  "Backflow Preventer System Design",
  "Radiant & Snow Melting System Design",
];

function ServicesPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 450;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="What We Offer"
        title="Complete Solutions for Your MEP Engineering Design Needs"
        description="We are aware that every project is different, therefore, we take the time to fully comprehend your needs in order to complete the job on schedule."
        image="/services.jpg"
      />

      {/* Intro Section */}
      <section className="container-page py-20 md:py-28 relative">
        <div className="grid gap-16 lg:gap-8 lg:grid-cols-2">
          {/* Left Text Content */}
          <div className="flex flex-col justify-center pr-4 lg:pr-12">
            <p className="eyebrow tracking-[0.2em] text-primary/80 uppercase font-bold text-xs">What We Offer</p>
            <h2 className="mt-6 text-4xl font-bold leading-[1.1] md:text-5xl lg:text-[3.5rem] text-ink">
              Complete Solutions for
              <br />
              Your MEP Engineering
              <br />
              Design Needs
            </h2>
            <p className="mt-8 leading-relaxed text-ink-soft opacity-90">
              We are aware that every project is different, therefore, we take the time to fully
              comprehend your needs in order to complete the job on schedule. Our
              knowledgeable staff is prepared to take on mechanical, electrical and plumbing
              design with a dash of creativity and a ton of passion.
            </p>
            <p className="mt-6 leading-relaxed text-ink-soft opacity-90">
              We go above and beyond to deliver services that are nothing less than amazing.
              We would be more than happy to discuss your engineering needs with you. Let us
              guide you in achieving the goals of your project. Contact us right now to get
              started.
            </p>
            <div className="mt-10 md:mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-border bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-primary hover:text-primary"
              >
                Know More
                <ArrowUpRight className="size-4 opacity-80" />
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* 01 Mechanical Image */}
              <a href="#mechanical" className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-surface">
                <img src="/Construction -1.jpg" alt="Mechanical" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"></div>
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white drop-shadow-md">
                  <span className="font-mono text-sm font-bold opacity-80">01.</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1">Mechanical</h3>
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f0c14b] flex items-center gap-1.5 transition-colors group-hover:text-white">
                      View More <ArrowUpRight className="size-3" />
                    </p>
                  </div>
                </div>
              </a>
              {/* 03 Plumbing Image */}
              <a href="#plumbing" className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-surface">
                <img src="/Building 1B.jpg" alt="Plumbing" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"></div>
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white drop-shadow-md">
                  <span className="font-mono text-sm font-bold opacity-80">03.</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1">Plumbing</h3>
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f0c14b] flex items-center gap-1.5 transition-colors group-hover:text-white">
                      View More <ArrowUpRight className="size-3" />
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="flex flex-col gap-4 lg:gap-6 pt-12 lg:pt-20">
              {/* 02 Electrical Image */}
              <a href="#electrical" className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-surface">
                <img src="/Construction -3.jpg" alt="Electrical" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"></div>
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between text-white drop-shadow-md">
                  <span className="font-mono text-sm font-bold opacity-80">02.</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-1">Electrical</h3>
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-[#f0c14b] flex items-center gap-1.5 transition-colors group-hover:text-white">
                      View More <ArrowUpRight className="size-3" />
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-[#161d26] text-white py-12 md:py-16 overflow-hidden">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-5 pr-2">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60">
                BRINGING VISION TO REALITY
              </p>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl lg:text-4xl leading-tight text-white">
                Our Featured
                <br />
                Projects
              </h2>
              <p className="mt-4 text-xs md:text-sm leading-relaxed text-white/70 max-w-md">
                We have a portfolio loaded with outstanding projects that highlight our amazing skills. It must be seen to be believed. See for yourself how we manifest desires and build masterpieces of engineering that survive the test of time.
              </p>

              <div className="mt-6 flex items-center justify-between lg:justify-start gap-4">
                <Link
                  to="/portfolio"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-[0.7rem] font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 hover:border-white/40"
                >
                  VIEW PORTFOLIO
                  <ArrowUpRight className="size-3.5 opacity-80" />
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleScroll("left")}
                    aria-label="Previous project"
                    className="flex size-9 items-center justify-center border border-white/15 bg-[#121820] text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    onClick={() => handleScroll("right")}
                    aria-label="Next project"
                    className="flex size-9 items-center justify-center border border-white/15 bg-[#121820] text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Slider Column */}
            <div className="lg:col-span-7 relative min-w-0 w-full overflow-hidden">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory hide-scrollbar scroll-smooth w-full"
              >
                {featuredProjects.map((project, i) => (
                  <div
                    key={i}
                    className="w-[280px] sm:w-[320px] snap-start shrink-0 rounded-none bg-[#1d2633] overflow-hidden flex flex-col border border-white/10 group cursor-pointer"
                  >
                    <div className="h-44 w-full overflow-hidden relative">
                      <img
                        src={project.img}
                        alt={project.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-1 justify-between bg-[#1d2633]">
                      <div>
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/60 mb-2">
                          {project.category}
                        </p>
                        <h3 className="text-base font-bold text-white leading-snug mb-4 line-clamp-2">
                          {project.name}
                        </h3>
                      </div>
                      <Link
                        to="/portfolio"
                        className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-white/80 transition-colors group-hover:text-primary"
                      >
                        VIEW MORE <ArrowUpRight className="size-3 text-primary" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
            </div>

          </div>
        </div>
      </section>

      {/* Snapshot */}
      <section className="relative overflow-hidden bg-surface py-0 border-t border-border">
        <div className="grid lg:grid-cols-12 min-h-[540px]">

          {/* Left Visual Column with Overlapping Blueprint Image */}
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full flex items-center justify-center p-6 lg:p-0">
            {/* Background image on the far left */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/1O3A4987-HDR.jpg"
                alt="Architecture background"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Overlapping blueprint card */}
            <div className="relative z-10 w-[85%] max-w-[360px] lg:translate-x-12 shadow-2xl rounded-sm overflow-hidden border-4 border-white bg-white">
              <img
                src="/Building 1B.jpg"
                alt="Blueprint drafting"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Content Column */}
          <div className="lg:col-span-7 bg-[#f8f9fa] dark:bg-[#121820] py-16 px-8 sm:px-14 lg:px-20 lg:pl-24 relative flex flex-col justify-center overflow-hidden">

            {/* Giant Faint Outline Background Watermark 'DATA' */}
            <div className="absolute top-2 right-6 select-none pointer-events-none text-[9rem] sm:text-[13rem] font-black text-black/[0.03] dark:text-white/[0.02] leading-none uppercase tracking-tighter font-mono">
              DATA
            </div>

            {/* Header */}
            <div className="relative z-10 mb-10">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-soft opacity-70">
                WHAT WE DO
              </p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-extrabold text-ink tracking-tight">
                Company Snapshot
              </h2>
            </div>

            {/* Stats Grid */}
            <div className="relative z-10 grid gap-8 sm:grid-cols-2">
              {/* Stat 1: Projects */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-[#e0a810] p-1.5 rounded-md bg-[#f0c14b]/15">
                    <Ruler className="size-6 text-[#d9a014]" />
                  </div>
                  <span className="text-4xl sm:text-5xl font-extrabold text-ink">
                    300<sup className="text-2xl font-bold text-[#d9a014]">+</sup>
                  </span>
                </div>
                <h3 className="text-sm font-bold text-ink mb-1.5">Projects</h3>
                <p className="text-xs text-ink-soft opacity-80 leading-relaxed max-w-xs">
                  Over 300+ successful projects delivered with precision and expertise.
                </p>
              </div>

              {/* Stat 2: Clients */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-[#e0a810] p-1.5 rounded-md bg-[#f0c14b]/15">
                    <Users className="size-6 text-[#d9a014]" />
                  </div>
                  <span className="text-4xl sm:text-5xl font-extrabold text-ink">
                    200<sup className="text-2xl font-bold text-[#d9a014]">+</sup>
                  </span>
                </div>
                <h3 className="text-sm font-bold text-ink mb-1.5">Clients</h3>
                <p className="text-xs text-ink-soft opacity-80 leading-relaxed max-w-xs">
                  A growing base of satisfied clients who trust us with their engineering needs.
                </p>
              </div>

              {/* Stat 3: Satisfaction */}
              <div className="sm:col-start-2">
                <div className="flex items-center gap-3 mb-1">
                  <div className="text-[#e0a810] p-1.5 rounded-md bg-[#f0c14b]/15">
                    <ThumbsUp className="size-6 text-[#d9a014]" />
                  </div>
                  <span className="text-4xl sm:text-5xl font-extrabold text-ink">
                    98<sup className="text-2xl font-bold text-[#d9a014]">%</sup>
                  </span>
                </div>
                <h3 className="text-sm font-bold text-ink mb-1.5">Satisfaction</h3>
                <p className="text-xs text-ink-soft opacity-80 leading-relaxed max-w-xs">
                  Our commitment to quality has resulted in a 98% client satisfaction rate.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Mechanical */}
      <section id="mechanical" className="border-t border-border bg-surface py-20 md:py-28 scroll-mt-20">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="eyebrow tracking-[0.2em] text-primary/80 uppercase font-bold text-xs">
              Enhancing Quality and Efficiency
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl text-ink">Mechanical Services</h2>
            <p className="mt-6 leading-relaxed text-ink-soft opacity-90">
              Our specialties are forced air system designs, hydronic heating solutions, and comprehensive HVAC designs. We make sure your indoor spaces are cozy and efficient with optimal airflow, energy-efficient heating, and precise temperature control.
            </p>
            <div className="mt-8">
              <Link
                to="/portfolio"
                search={{ sector: "restaurants" as any }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition-opacity"
              >
                VIEW OUR WORKS
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 grid gap-3">
            {mechanicalServices.map((service, i) => (
              <div
                key={i}
                className="group flex items-center justify-between rounded-lg bg-card border border-border p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                <p className="font-semibold text-sm text-ink">{service}</p>
                <p className="font-mono text-sm font-bold text-primary/60 group-hover:text-primary transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Electrical */}
      <section id="electrical" className="py-20 md:py-28 scroll-mt-20 bg-background">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="grid gap-3">
            {electricalServices.map((service, i) => (
              <div
                key={i}
                className="group flex items-center justify-between rounded-lg bg-surface border border-border p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                <p className="font-semibold text-sm text-ink">{service}</p>
                <p className="font-mono text-sm font-bold text-primary/60 group-hover:text-primary transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p className="eyebrow tracking-[0.2em] text-primary/80 uppercase font-bold text-xs">
              Powering Innovation and Reliability
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl text-ink">Electrical Services</h2>
            <p className="mt-6 leading-relaxed text-ink-soft opacity-90">
              We cover life safety, power distribution and communication system design. Our team delivers innovative solutions that prioritize safety, efficiency, and smooth operation. Let us put our expertise to work for you. We are providing reliable and cutting-edge electrical designs to power your projects.
            </p>
            <div className="mt-8">
              <Link
                to="/portfolio"
                search={{ sector: "institutional" as any }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition-opacity"
              >
                VIEW OUR WORKS
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plumbing */}
      <section id="plumbing" className="border-t border-border bg-surface py-20 md:py-28 scroll-mt-20">
        <div className="container-page grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <p className="eyebrow tracking-[0.2em] text-primary/80 uppercase font-bold text-xs">
              Seamless Solutions for Efficient Water Management
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl text-ink">Plumbing Services</h2>
            <p className="mt-6 leading-relaxed text-ink-soft opacity-90">
              You can trust us to handle all your plumbing needs with precision and professionalism. We’ve got the expertise to deliver plumbing solutions.
            </p>
            <div className="mt-8">
              <Link
                to="/portfolio"
                search={{ sector: "custom-homes" as any }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:opacity-80 transition-opacity"
              >
                VIEW OUR WORKS
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 grid gap-3">
            {plumbingServices.map((service, i) => (
              <div
                key={i}
                className="group flex items-center justify-between rounded-lg bg-card border border-border p-5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                <p className="font-semibold text-sm text-ink">{service}</p>
                <p className="font-mono text-sm font-bold text-primary/60 group-hover:text-primary transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20 md:py-28 text-center">
        <p className="eyebrow">Ready to Get Started?</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-4xl max-w-2xl mx-auto">
          Get in Touch with Us for The Ideal Solution
        </h2>
        <p className="mt-6 text-ink-soft max-w-xl mx-auto leading-relaxed">
          Take the first step to get personalized solutions tailored to your MEP Design requirements. We’re sure you’ll be happy with your decision.
        </p>
        <div className="mt-10">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-9 py-5 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5"
          >
            Contact Us
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

    </SiteLayout>
  );
}
