import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout, PageHero } from "@/components/site/SiteLayout";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string; // Honeypot field
}

export const Contact: React.FC = () => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      <section className="container-page py-20 md:py-28">
        <div className="contact-form-container max-w-2xl mx-auto p-8 rounded-2xl border border-border bg-surface shadow-sm">
          <h2 className="mb-6 text-3xl font-semibold">Send a Message</h2>

          {responseMsg && (
            <div className={`mb-6 p-4 rounded-xl ${responseMsg.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {responseMsg.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div style={{ display: 'none' }}>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="form-group flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-semibold">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                maxLength={100}
                required
                value={formData.name}
                onChange={handleChange}
                className="rounded-lg border border-border p-3 bg-surface"
              />
            </div>

            <div className="form-group flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength={254}
                required
                value={formData.email}
                onChange={handleChange}
                className="rounded-lg border border-border p-3 bg-surface"
              />
            </div>

            <div className="form-group flex flex-col gap-2">
              <label htmlFor="phone" className="text-sm font-semibold">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                maxLength={50}
                value={formData.phone}
                onChange={handleChange}
                className="rounded-lg border border-border p-3 bg-surface"
              />
            </div>

            <div className="form-group flex flex-col gap-2">
              <label htmlFor="subject" className="text-sm font-semibold">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                maxLength={200}
                value={formData.subject}
                onChange={handleChange}
                className="rounded-lg border border-border p-3 bg-surface"
              />
            </div>

            <div className="form-group flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-semibold">Message *</label>
              <textarea
                id="message"
                name="message"
                maxLength={5000}
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="rounded-lg border border-border p-3 bg-surface resize-y"
              ></textarea>
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-full bg-primary px-7 py-3.5 font-bold uppercase tracking-wider text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

export const Route = createFileRoute('/contact')({
  component: Contact,
});

export default Contact;