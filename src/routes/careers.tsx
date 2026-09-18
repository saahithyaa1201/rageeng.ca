import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { ImageSlot } from "@/components/site/ImageSlot";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at Range Engineering | MEP Engineering Jobs Ontario" },
      {
        name: "description",
        content:
          "Join Range Engineering. Open roles for mechanical, electrical and plumbing designers and EITs working on fit-outs across Ontario.",
      },
      { property: "og:title", content: "Careers at Range Engineering" },
      {
        property: "og:description",
        content: "Open MEP design roles on a small, coordinated Ontario engineering team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CareersPage,
});

const roles = [
  {
    title: "Mechanical Designer",
    type: "Full-time · Markham",
    blurb: "HVAC layouts, load calcs and permit sets for restaurant and institutional fit-outs.",
  },
  {
    title: "Electrical EIT",
    type: "Full-time · Markham",
    blurb: "Power distribution, lighting design and life-safety coordination under a P.Eng.",
  },
  {
    title: "Plumbing Designer",
    type: "Contract · Hybrid",
    blurb: "Supply, drainage and venting design for commercial and residential projects.",
  },
  {
    title: "Junior Drafter (Revit)",
    type: "Full-time · Markham",
    blurb: "Model coordination and drawing production across mechanical and electrical sets.",
  },
];

const perks = [
  "Direct mentorship from a licensed P.Eng.",
  "Real project ownership from day one",
  "Hybrid schedule after onboarding",
  "Licensing and course support",
];

function CareersPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Careers"
        title="Build systems that buildings depend on."
        description="A small team where designers see a project from first sketch to final inspection."
        image="/career.jpg"
      />

      <section className="container-page grid items-center gap-14 py-20 lg:grid-cols-2 md:py-28">
        <ImageSlot
          src="/233 Armstrong Ave_Photo - 1.jpg"
          alt="Range Engineering team at work"
          className="aspect-[4/3] rounded-2xl shadow-card"
        />
        <div>
          <p className="eyebrow">Why Range</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
            Small team, serious projects
          </h2>
          <ul className="mt-8 space-y-4">
            {perks.map((p) => (
              <li key={p} className="flex gap-3 text-ink-soft">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 md:py-28">
        <div className="container-page">
          <p className="eyebrow">Open roles</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Currently hiring</h2>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {roles.map((r) => (
              <div
                key={r.title}
                className="grid gap-4 py-8 md:grid-cols-[1fr_1.4fr_auto] md:items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{r.title}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                    {r.type}
                  </p>
                </div>
                <p className="text-ink-soft">{r.blurb}</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 justify-self-start rounded-full border border-ink px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary md:justify-self-end"
                >
                  Apply
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
