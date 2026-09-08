import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useEffect } from 'react';

export const Route = createFileRoute('/portfolio/sports-gym')({
  component: SportsGymPage,
});

function SportsGymPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SiteLayout>
      <main className="bg-white min-h-screen text-ink pb-24">
        <div className="h-32 md:h-48 bg-white" />
        <div className="container-page px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:gap-32">
            <div className="lg:w-48 shrink-0 mb-10 lg:mb-0 lg:pt-1">
              <h2 className="text-sm font-semibold text-ink/70">
                Place: <span className="font-normal text-ink/60">Ontario, Canada</span>
              </h2>
            </div>
            <div className="flex-1 max-w-4xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink/40 mb-3">
                PROJECT DETAILS
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 mt-2">
                About the Laboratory Projects
              </h1>
              <div className="text-lg leading-relaxed text-ink/70 space-y-6 mb-12 max-w-3xl">
                <p>
                  Technical laboratory spaces requiring precise ventilation, utility coordination, and clean system planning. We paid attention to every little detail and kept our awesome clients at the center of it all. We wanted to make sure that the facilities we delivered were nothing short of inspiring. In the end, it turned out to be an absolute blast.
                </p>
              </div>
              <h3 className="text-2xl font-bold mb-4">Empowering Excellence</h3>
              <p className="text-base leading-relaxed text-ink/70 mb-16 max-w-3xl">
                This environment is designed for maximum precision and quality. We're extremely proud to partner with our clients across these amazing locations to nurture the next generation of building standards.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {['/Construction -3.jpg', '/Construction -4.jpg', '/Hero2.jpg'].map((imgSrc, i) => (
              <div key={i} className="aspect-[4/3] bg-[#f8f8f8]">
                <img src={imgSrc} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
