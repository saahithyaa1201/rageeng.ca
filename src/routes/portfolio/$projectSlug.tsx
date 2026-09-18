import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { projects, sectors } from "@/data/site";

const galleryBySector: Record<string, string[]> = {
  restaurants: ["/Construction -1.jpg", "/Construction -2.jpg", "/Construction -3.jpg", "/Construction -4.jpg"],
  "custom-homes": ["/Ramara V1.1.jpg", "/Ramara V1.2.jpg"],
  institutional: ["/233 Armstrong Ave_11 - Photo.jpg", "/233 Armstrong Ave_16 - Photo.jpg", "/233 Armstrong Ave_21 - Photo.jpg"],
  "commercial-retail": ["/233 Armstrong Ave_22 - Photo.jpg", "/233 Armstrong Ave_24 - Photo.jpg", "/233 Armstrong Ave_27 - Photo.jpg"],
  industrial: ["/Construction -3.jpg", "/Construction -4.jpg"],
  healthcare: ["/233 Armstrong Ave_21 - Photo.jpg", "/233 Armstrong Ave_28 - Photo.jpg", "/233 Armstrong Ave_36 - Photo.jpg"],
  offices: ["/Render 3.jpg", "/Render_260324_1.png", "/233 Armstrong Ave_Photo - 1.jpg"],
  worship: ["/233 Armstrong Ave_22 - Photo.jpg", "/233 Armstrong Ave_53 - Photo.jpg"],
  "premise-isolation": ["/233 Armstrong Ave_27 - Photo.jpg", "/233 Armstrong Ave_Photo - 2.jpg"],
  "sports-gym": ["/Construction -3.jpg", "/Construction -4.jpg", "/Hero2.jpg"],
};

const scopeItems = [
  { code: "M", label: "Mechanical", detail: "HVAC, ventilation, comfort, and equipment coordination." },
  { code: "E", label: "Electrical", detail: "Power distribution, lighting, controls, and life safety." },
  { code: "P", label: "Plumbing", detail: "Water supply, drainage, fixtures, and utility coordination." },
];

export const Route = createFileRoute("/portfolio/$projectSlug")({
  head: ({ params }) => {
    const project = projects.find((item) => item.slug === params.projectSlug);
    return {
      meta: [{ title: `${project?.title ?? "Project"} | Range Engineering Inc.` }],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { projectSlug } = Route.useParams();
  const project = projects.find((item) => item.slug === projectSlug);

  if (!project) {
    return (
      <SiteLayout>
        <main className="container-page py-32">
          <h1 className="text-4xl font-semibold text-ink">Project not found</h1>
          <Link to="/portfolio" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <ArrowLeft className="size-4" /> Back to portfolio
          </Link>
        </main>
      </SiteLayout>
    );
  }

  const sector = sectors.find((item) => item.id === project.sectorId);
  const gallery = galleryBySector[project.sectorId] ?? ["/Hero.jpg", "/Hero2.jpg", "/about.jpg"];

  return (
    <SiteLayout>
      <main className="bg-[#f5f3ef]">
        <section className="relative overflow-hidden bg-[#111b22] text-white">
          <img src={gallery[0]} alt={`${project.title} project`} className="absolute inset-0 h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111b22]/95 via-[#111b22]/70 to-[#111b22]/20" />
          <div className="container-page relative z-10 flex min-h-[68vh] items-end pb-16 pt-28 md:pb-24">
            <div className="max-w-3xl">
              <Link to="/portfolio" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-primary">
                <ArrowLeft className="size-4" /> Back to portfolio
              </Link>
              <p className="eyebrow text-primary-foreground/80">Completed project · {sector?.name ?? project.category}</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.96] text-white md:text-7xl">{project.title}</h1>
              <p className="mt-7 flex items-center gap-2 text-base text-white/75">
                <MapPin className="size-4 text-primary" /> {project.location}
              </p>
            </div>
          </div>
        </section>

        <section className="container-page grid gap-12 py-20 md:grid-cols-[0.75fr_1.25fr] md:py-28">
          <div>
            <p className="eyebrow text-primary">Project details</p>
            <h2 className="mt-5 max-w-sm text-4xl font-semibold leading-tight md:text-5xl">Built with every system in mind.</h2>
          </div>
          <div>
            <p className="text-xl leading-relaxed text-ink">{project.summary}</p>
            <div className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-3">
              {scopeItems.map((item) => (
                <div key={item.code} className="border border-border bg-white p-5">
                  <p className="text-3xl font-semibold text-primary">{item.code}</p>
                  <p className="mt-4 font-semibold text-ink">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#151f27] py-20 text-white md:py-28">
          <div className="container-page">
            <p className="eyebrow text-primary">Project gallery</p>
            <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">A closer look at the work.</h2>
            <div className="mt-12 grid gap-4 md:grid-cols-12">
              {gallery.map((image, index) => (
                <figure key={image} className={index === 0 ? "md:col-span-7" : "md:col-span-5"}>
                  <div className="aspect-[4/3] overflow-hidden bg-white/5">
                    <img src={image} alt={`${project.title} gallery view ${index + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
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
          <Link to="/contact" className="inline-flex shrink-0 items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-cta transition-transform hover:-translate-y-1">
            Start a conversation
            <ArrowUpRight className="size-4" />
          </Link>
        </section>
      </main>
    </SiteLayout>
  );
}
