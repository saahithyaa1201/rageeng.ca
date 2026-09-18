import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact Us | Range Engineering Inc.' },
      {
        name: 'description',
        content:
          'Get in touch with Range Engineering Inc. for coordinated MEP engineering designs across Ontario.',
      },
      { property: 'og:title', content: 'Contact Range Engineering' },
      {
        property: 'og:description',
        content: 'Get in touch with Range Engineering for coordinated MEP engineering designs.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: ContactPage,
});

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [responseMsg, setResponseMsg] = useState<{ success: boolean; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);

    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResponseMsg({ success: true, text: data.message });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '', website: '' });
      } else {
        setResponseMsg({ success: false, text: data.message || 'An error occurred.' });
      }
    } catch (err) {
      setResponseMsg({
        success: false,
        text: 'Unable to connect to the server. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch with our team"
        description="We'd love to hear from you and answer any questions."
        image="/contact.jpg"
      />
      <section className="container-page py-16 md:py-24">
        <div className="contact-form-container max-w-2xl mx-auto p-6 md:p-10 rounded-2xl border border-border bg-card shadow-card">
          <h2 className="mb-2 text-2xl md:text-3xl font-bold text-foreground">Send a Message</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Fill out the details below and our team will get back to you promptly.
          </p>

          {responseMsg && (
            <div
              className={`mb-6 p-4 rounded-xl text-sm font-medium border ${
                responseMsg.success
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}
            >
              {responseMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot field for bot protection */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-group flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-semibold text-foreground">
                Name <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                maxLength={100}
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            <div className="form-group flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength={254}
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-group flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-sm font-semibold text-foreground">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  maxLength={50}
                  placeholder="(416) 555-0199"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                />
              </div>

              <div className="form-group flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-sm font-semibold text-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  maxLength={200}
                  placeholder="MEP Fit-out Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
                />
              </div>
            </div>

            <div className="form-group flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-semibold text-foreground">
                Message <span className="text-primary">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                maxLength={5000}
                rows={5}
                required
                placeholder="Tell us about your project, location, and timeline..."
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-y"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-7 py-3.5 font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-all hover:opacity-95 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}