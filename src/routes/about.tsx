import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";
import { ImageSlot } from "@/components/site/ImageSlot";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Range Engineering Inc." },
      { name: "description", content: "Engineering Excellence, Innovation, and Collaboration" },
      { property: "og:title", content: "About Range Engineering" },
      { property: "og:description", content: "Engineering Excellence, Innovation, and Collaboration" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2011", title: "Inception", text: "Established with a vision to deliver exceptional engineering solutions." },
  { year: "2018", title: "Diversification", text: "Expanded services to encompass comprehensive mechanical design solutions." },
  { year: "2019", title: "Electrical Expertise", text: "Introduced electrical design services, enhancing our capabilities and offerings." },
  { year: "2022", title: "Milestone Achievement", text: "Successfully completed over 300+ major projects, solidifying our industry reputation." },
];

const team = [
  { name: "Sutha Paramalingam", role: "P.Eng" },
  { name: "Jeff. K", role: "Mechanical Designer" },
  { name: "Priya. S", role: "Office Administrator" },
  { name: "Billal Fred", role: "Electrical Designer" },
];

const stats = [
  { value: "300+", label: "Projects", desc: "Over 300+ successful projects delivered with precision and expertise." },
  { value: "200+", label: "Clients", desc: "A growing base of satisfied clients who trust us with their engineering needs." },
  { value: "98%", label: "Satisfaction", desc: "Our commitment to quality has resulted in a 98% client satisfaction rate." },
];

const strengths = [
  {
    title: "Rocky Team",
    body: "Our highly capable, diverse engineers are the best in what they do. Your project is in capable hands since it brings a ton of expertise and knowledge to the table.",
  },
  {
    title: "Innovative Method",
    body: "We don't like to repeat the same routines. No, we are all about embracing innovation and staying up-to-date with the most recent building code developments and technology.",
  },
  {
    title: "Client-Centered Approach",
    body: "Our first priority is our client. We sincerely care about our clients and want them to have the best possible experience. Because of this, we collaborate closely with our clients to fully understand their requirements and aspirations in order to create specialized designs.",
  },
  {
    title: "Sustainable design",
    body: "We not only implement innovative MEP designs, but we also care about environmental consciousness and social responsibility. That’s why our designs have a minimal impact on the environment.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Us"
        title="Engineering Excellence, Innovation, and Collaboration"
        description="When giving you our designs, what we care about the most is the quality of our designs."
        image="/about.webp"
      />

      {/* Our Story */}
      <section className="container-page grid items-center gap-16 py-20 lg:grid-cols-2 md:py-28">
        <div>
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            Relationship of Trust and Excellence
          </h2>
          <p className="mt-6 leading-relaxed text-ink-soft">
            When giving you our designs, what we care about the most is the quality of our designs. From the best residential design to commercial building design, you can count on us. Making a real difference in the experience of our designs is our ultimate mission. Want to know the real fact that sets us apart from our competitors? That is our incredibly passionate team, which we empower every step of the way to take on new challenges.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            We believe in continuous learning. So we can guarantee you that we provide you the innovative and creative designs. There is no chance for obsolete ones.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center border-t border-border pt-8">
            <div>
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-wider text-ink-soft">Engineering Excellence</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-wider text-ink-soft">Innovation</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-wider text-ink-soft">Customer Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <ImageSlot
            src="/about2.jpg"
            alt="Range Engineering Team"
            label="Our Team working"
            className="aspect-[4/3] rounded-xl shadow-card"
          />
        </div>
      </section>

      {/* Principal Message */}
      <section className="border-t border-border bg-surface py-20 md:py-28">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">Sutha Paramalingam P.Eng</h2>
              <p className="mt-2 font-mono text-sm uppercase tracking-widest text-primary">Principal of Range Engineering Inc.</p>
              <div className="mt-8 space-y-6 text-lg italic leading-relaxed text-ink/80">
                <p>
                  "Welcome to Range Engineering Inc.! As the Principal, I am proud to lead a team of passionate professionals dedicated to engineering excellence and innovation. Our commitment to delivering top-notch services and creating a lasting impact on the built environment is at the core of everything we do. I worked for about 10 + years as a senior mechanical engineer for Spline Group since graduating from Ryerson university with a Bachelor of Engineering in the mechanical field."
                </p>
                <p>
                  "At Range Engineering Inc., we prioritize collaboration, expertise, and a customer-centric approach. We understand that successful projects are the result of understanding your unique needs and delivering tailored solutions that surpass expectations. With a focus on quality, efficiency, and sustainability, we strive to execute each step of the process with precision and attention to detail. Thank you for choosing Range Engineering Inc. We look forward to building lasting partnerships and delivering excellence in every endeavor."
                </p>
              </div>
            </div>
            <div>
              <ImageSlot
                src="/Sutha.png"
                alt="Sutha Paramalingam P.Eng"
                className="w-full max-w-sm mx-auto rounded-3xl shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Snapshot of our success */}
      <section className="container-page py-20 md:py-28">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">A Snapshot of Our Success</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Our track record is self-evident.</h2>
          </div>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-all hover:opacity-90"
          >
            View Portfolio
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <p className="mb-12 max-w-3xl leading-relaxed text-ink-soft">
          We’re not your typical engineering firm, and our strategy is exceptional. As significant as our design knowledge is, we think that having trustworthy relationships is even more essential. We’ve had the honor of working with a variety of clients along the way and developing long-lasting relationships. The foundation of our business is making sure that our clients are fulfilled and we always try to go above and beyond in every part of our work.
        </p>

        <div className="grid gap-y-12 divide-border border-y border-border bg-surface/50 py-12 sm:grid-cols-3 sm:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-8 text-center">
              <p className="font-display text-5xl font-semibold text-primary md:text-6xl">{s.value}</p>
              <p className="mt-4 font-mono text-sm font-bold uppercase tracking-[0.2em]">
                {s.label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Strengths */}
      <section className="border-t border-border bg-card py-20 md:py-28">
        <div className="container-page">
          <p className="eyebrow">Why Choose Range Engineering Inc.</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Our Key Strengths</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {strengths.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
                <p className="font-mono text-lg font-bold text-primary">0{i + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-border bg-surface py-20 md:py-28">
        <div className="container-page">
          <p className="eyebrow">What We Did</p>
          <h2 className="mb-12 mt-4 text-3xl font-semibold md:text-4xl">Company Timeline</h2>
          <div className="grid gap-10 md:grid-cols-4">
            {timeline.map((t) => (
              <div key={t.year} className="border-t-2 border-primary pt-6 hover:-translate-y-1 transition-transform">
                <p className="font-display text-3xl font-bold">{t.year}</p>
                <h3 className="mt-3 text-lg font-semibold text-ink">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container-page py-20 md:py-28">
        <p className="eyebrow">Our Team</p>
        <h2 className="mb-12 mt-4 text-3xl font-semibold md:text-4xl">Meet Our Staff</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="group">
              <ImageSlot
                alt={member.name}
                label={member.name}
                className="aspect-[3/4] w-full rounded-2xl shadow-card transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-lg"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="mt-2 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-primary">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
