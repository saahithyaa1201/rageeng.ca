import { Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Careers", to: "/careers" },
  { label: "Contact Us", to: "/contact" },
];

const expertise = [
  { label: "Mechanical Engineering", hash: "mechanical" },
  { label: "Electrical Systems", hash: "electrical" },
  { label: "Plumbing Design", hash: "plumbing" },
  { label: "Permit Coordination", hash: "permits" },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-footer-foreground"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(16,16,16,0.85), rgba(16,16,16,0.95)), url('/footer.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,white,transparent_55%)]" />
      <div className="container-page relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/Logo.png" alt="Range Engineering Inc." className="h-24 w-auto object-contain" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-footer-foreground/70">
            Delivering innovative engineering solutions and coordinated mechanical, electrical and
            plumbing design across Ontario.
          </p>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.24em] text-footer-foreground">
            Quick Links
          </h4>
          <ul className="mt-6 space-y-3">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="flex items-center gap-2 text-sm text-footer-foreground/75 transition-colors hover:text-primary"
                >
                  <ChevronRight className="size-4 text-primary" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.24em] text-footer-foreground">
            Our Expertise
          </h4>
          <ul className="mt-6 space-y-3">
            {expertise.map((l) => (
              <li key={l.label}>
                <Link
                  to="/services"
                  hash={l.hash}
                  className="flex items-center gap-2 text-sm text-footer-foreground/75 transition-colors hover:text-primary"
                >
                  <ChevronRight className="size-4 text-primary" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.24em] text-footer-foreground">
            Contact Us
          </h4>
          <ul className="mt-6 space-y-5 text-sm text-footer-foreground/80">
            <li className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/40">
                <Phone className="size-4 text-primary" />
              </span>
              <a href="tel:4168572414" className="font-semibold hover:text-primary">
                416-857-2414
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/40">
                <Mail className="size-4 text-primary" />
              </span>
              <a href="mailto:info@rangeeng.ca" className="font-semibold hover:text-primary">
                info@rangeeng.ca
              </a>
            </li>
            <li className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/40">
                <MapPin className="size-4 text-primary" />
              </span>
              <span className="font-semibold leading-relaxed">
                15 Peachill Crt, Brampton,<br />Canada.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/40">
                <Clock className="size-4 text-primary" />
              </span>
              <span className="font-semibold leading-relaxed">
                Mon – Fri: 8 AM – 5 PM<br />
                <span className="text-footer-foreground/60">Sat – Sun: Closed</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page relative flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-footer-foreground/60 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Range Engineering Inc. All rights reserved.</p>
        <p>Mechanical · Electrical · Plumbing</p>
      </div>
    </footer>
  );
}
