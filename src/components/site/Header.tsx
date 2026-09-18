import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { sectors } from "@/data/site";

const sectorImages: Record<string, string> = {
  industrial: "/Jack1.png",
  "custom-homes": "/Gay.jpg",
  "modular-house": "/Render_260324_1.png",
  townhouse: "/br.png",
  "midrise-residential": "/king.jpg",
  "multiplex-infill": "/amherst.png",
  "commercial-retail": "/Render 3.jpg",
  "daycare-recreation": "/233 Armstrong Ave_22 - Photo.jpg",
  office: "/233 Armstrong Ave_Photo - 1.jpg",
  laboratory: "/Construction -3.jpg",
};

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="text-[0.95rem] font-medium text-white/90 transition-colors hover:text-primary [&.active]:text-primary [&.active]:underline [&.active]:underline-offset-[26px] [&.active]:decoration-2 flex items-center h-full"
      style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.9)" }}
    >
      {children}
    </Link>
  );
}

function PortfolioMegaMenu() {
  const router = useRouterState();
  const isPortfolio = router.location.pathname.startsWith('/portfolio');

  return (
    <div className="group/megamenu h-full flex items-center">
      <Link
        to="/portfolio/industrial"
        className={`flex h-full items-center gap-1 text-[0.95rem] font-medium transition-colors group-hover/megamenu:text-primary ${isPortfolio ? 'text-primary underline underline-offset-[26px] decoration-2' : 'text-white/90'}`}
        style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 0.9)" }}
      >
        Portfolio
        <ChevronDown className="size-4" />
      </Link>

      <div className="invisible pointer-events-none fixed left-0 right-0 top-[100px] opacity-0 shadow-2xl transition-all duration-300 z-50 group-hover/megamenu:visible group-hover/megamenu:opacity-100 group-hover/megamenu:pointer-events-auto">
        <div className="bg-white border-t-2 border-primary w-full py-12 max-h-[80vh] flex flex-col text-ink">
          <div className="container-page flex gap-12 lg:gap-20 flex-1 min-h-0 overflow-hidden">

            {/* Left Column - List of sectors */}
            <div className="w-1/4 shrink-0 flex flex-col justify-start">
              <h2 className="text-[2rem] font-serif text-primary font-bold mb-6 tracking-tight">
                Where We Work
              </h2>
              <div className="flex flex-col gap-4 text-[0.95rem] font-semibold text-ink/80 flex-1 overflow-y-auto pr-4">
                {sectors.map((sector) => (
                  <Link
                    key={sector.id}
                    to={`/portfolio/${sector.id}`}
                    className="hover:text-primary transition-colors py-1"
                  >
                    {sector.name.split(' (')[0]}
                  </Link>
                ))}
              </div>
              <Link to="/portfolio/industrial" className="text-primary font-bold mt-8 inline-flex items-center gap-2 text-sm hover:underline tracking-wide">
                View All Portfolio <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Right Column - Scrolling Cards */}
            <div className="flex-1 overflow-x-auto pb-6 -mb-6 scrollbar-hide">
              <div className="flex gap-6 w-max">
                {sectors.map((sector) => (
                  <Link
                    key={sector.id}
                    to={`/portfolio/${sector.id}`}
                    className="w-[280px] group/card shrink-0 flex flex-col gap-4"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={sectorImages[sector.id] || "/Hero.jpg"}
                        alt={sector.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover/card:bg-transparent transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-ink text-sm leading-snug group-hover/card:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                        {sector.shortDesc}
                      </h3>
                      <p className="text-[0.7rem] text-ink/60 mt-1.5 uppercase tracking-[0.1em] font-bold">
                        {sector.name.split(' (')[0]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouterState();
  const isPortfolio = router.location.pathname.startsWith('/portfolio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: scrolled || isPortfolio ? "rgba(10, 10, 10, 0.88)" : "transparent",
        backdropFilter: scrolled || isPortfolio ? "blur(18px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled || isPortfolio ? "blur(18px) saturate(180%)" : "none",
        borderBottom: scrolled || isPortfolio ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
        boxShadow: scrolled || isPortfolio ? "0 4px 32px rgba(0,0,0,0.35)" : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div className="w-full px-6 xl:px-12 flex h-[100px] items-center justify-between gap-10">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/Logo.png" alt="Range Engineering Inc." className="h-[95px] p-2 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex h-full flex-1 justify-end relative">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/services">Services</NavLink>
          <PortfolioMegaMenu />
          <NavLink to="/careers">Careers</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/20 p-2 text-white lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="absolute left-0 top-full w-full border-t border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl lg:hidden max-h-[85vh] overflow-y-auto">
          <div className="container-page flex flex-col gap-1 py-4">
            <Link to="/" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 font-medium text-white hover:bg-white/10">Home</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 font-medium text-white hover:bg-white/10">About Us</Link>
            <Link to="/services" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 font-medium text-white hover:bg-white/10">Services</Link>

            <MobileNavGroup label="Portfolio" items={sectors} onItemClick={() => setOpen(false)} />

            <Link to="/careers" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 font-medium text-white hover:bg-white/10">Careers</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 font-medium text-white hover:bg-white/10">Contact Us</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileNavGroup({ label, items, onItemClick }: { label: string; items: typeof sectors, onItemClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between rounded-lg px-4 py-3 font-medium text-white hover:bg-white/10 text-left"
      >
        {label}
        <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="ml-4 flex flex-col gap-1 border-l border-white/10 pl-2">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/portfolio/${item.id}`}
              onClick={onItemClick}
              className="block rounded-lg px-4 py-2.5 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
            >
              {item.name.split(' (')[0]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}