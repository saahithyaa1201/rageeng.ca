import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Range Engineering | Start Your MEP Project" },
      {
        name: "description",
        content:
          "Talk to Range Engineering about mechanical, electrical and plumbing design for your Ontario project. Call 416-857-2414 or send us your drawings.",
      },
      { property: "og:title", content: "Contact Range Engineering" },
      {
        property: "og:description",
        content: "Start your MEP project with a coordinated engineering team in Ontario.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const details = [
  { icon: Phone, label: "Phone", value: "416-857-2414", href: "tel:4168572414" },
  { icon: Mail, label: "Email", value: "info@rangeeng.ca", href: "mailto:info@rangeeng.ca" },
  { icon: MapPin, label: "Office", value: "Markham, Ontario" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact Us"
        title="Let's scope your project."
        description="Send drawings, a site address or a rough idea — we'll come back with scope, timeline and fee."
      />

      <section className="container-page grid gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr] md:py-28">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-2xl border border-border bg-card p-8 shadow-card"
        >
          <h2 className="text-2xl font-semibold">Start a project</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="name" />
            <Field label="Company" name="company" required={false} />
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" type="tel" required={false} />
          </div>
          <div className="mt-5">
            <label className="eyebrow" htmlFor="message">
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <button
            type="submit"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5"
          >
            Send enquiry
          </button>
          {sent ? (
            <p className="mt-4 text-sm text-primary">
              Thanks — your enquiry has been noted. We'll reply within one business day.
            </p>
          ) : null}
        </form>

        <div className="space-y-8">
          {details.map((d) => (
            <div key={d.label} className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent">
                <d.icon className="size-5 text-accent-foreground" />
              </span>
              <div>
                <p className="eyebrow">{d.label}</p>
                {d.href ? (
                  <a href={d.href} className="text-lg font-semibold hover:text-primary">
                    {d.value}
                  </a>
                ) : (
                  <p className="text-lg font-semibold">{d.value}</p>
                )}
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-surface p-8">
            <p className="eyebrow">Hours</p>
            <p className="mt-3 text-ink-soft">Monday – Friday, 8:30am – 5:30pm ET</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="eyebrow" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}
