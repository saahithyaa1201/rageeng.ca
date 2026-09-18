import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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
  { icon: MapPin, label: "Office", value: "15 Peachill Crt, Brampton, Canada." },
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check (client-side fast-exit)
    if (data.get("website")) return;

    const payload = {
      name: (data.get("name") as string).trim(),
      email: (data.get("email") as string).trim(),
      phone: (data.get("phone") as string).trim(),
      subject: (data.get("company") as string).trim()
        ? `Enquiry from ${(data.get("company") as string).trim()}`
        : "Website Enquiry",
      message: (data.get("message") as string).trim(),
      website: (data.get("website") as string) ?? "",
    };

    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setServerMessage(result.message ?? "Your message has been sent successfully.");
        formRef.current?.reset();
      } else {
        setStatus("error");
        setServerMessage(result.message ?? "Unable to send your message. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Unable to reach the server. Please try again later.");
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact Us"
        title="Let's scope your project."
        description="Send drawings, a site address or a rough idea — we'll come back with scope, timeline and fee."
        image="/contact.jpg"
      />

      <section className="relative z-10 container-page grid gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr] md:py-28">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-border bg-card p-8 shadow-card"
          noValidate
        >
          <h2 className="text-2xl font-semibold">Start a project</h2>

          {/* Honeypot field */}
          <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] opacity-0">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="Full name" name="name" required />
            <Field label="Company" name="company" required={false} />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" required={false} />
          </div>

          <div className="mt-5">
            <label className="eyebrow" htmlFor="message">
              Project details <span className="text-destructive">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              defaultValue=""
              className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-cta transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Send enquiry"
            )}
          </button>

          {status === "success" && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              <span>
                <strong>Thank you!</strong> {serverMessage} We'll reply within one business day.
              </span>
            </div>
          )}

          {status === "error" && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{serverMessage}</span>
            </div>
          )}
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
            <p className="mt-3 whitespace-pre-line text-ink-soft">
              Mon – Fri: 8 AM – 5 PM{"\n"}SAT - Sun: Closed
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

// Sub-component placed outside the main function
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
        {required && <span className="text-destructive"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue=""
        className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
    </div>
  );
}