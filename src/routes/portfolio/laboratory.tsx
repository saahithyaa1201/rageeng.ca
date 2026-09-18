import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/portfolio/laboratory')({
  component: LaboratoryPage,
});

const LAB_PROJECTS = [
  {
    id: 'merieux-millcreek',
    name: 'Merieux NutriSciences – 6665 Millcreek Drive, Unit 2',
    client: 'Merieux NutriSciences',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '6665 Millcreek Drive, Unit 2, Mississauga, ON',
    mepType: 'Mechanical & Electrical (Laboratory)',
    overview:
      'Range Engineering Inc. provided comprehensive Mechanical and Electrical Engineering Design for the Merieux NutriSciences laboratory facility at 6665 Millcreek Drive, Unit 2, Mississauga. The project involved the fit-out of a specialized food testing and analytical laboratory requiring precise environmental control and dedicated laboratory utilities.',
    details:
      'Engineering highlights include laboratory exhaust and supply air systems with HEPA filtration, chemical-resistant plumbing for lab sinks and eyewash stations, dedicated laboratory electrical panels and circuits, emergency power provisions, and specialized gas distribution systems for analytical instruments.',
    gallery: ['/Ramara V1.1.jpg', '/Ramara V1.2.jpg'],
  },
  {
    id: 'merieux-campobello',
    name: 'Merieux NutriSciences – 6660 Campobello Road',
    client: 'Merieux NutriSciences',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '6660 Campobello Road, Mississauga, ON',
    mepType: 'Mechanical & Electrical (Laboratory)',
    overview:
      "Range Engineering Inc. delivered Mechanical and Electrical Engineering Design for the second Merieux NutriSciences laboratory location at 6660 Campobello Road, Mississauga. This facility serves as an extension of the company's analytical and food safety testing operations in the Greater Toronto Area.",
    details:
      'The MEP engineering scope included laboratory-grade HVAC with precise temperature and humidity control, ducted fume hood exhaust systems, dedicated electrical services for testing equipment and refrigeration units, and chemical waste drainage systems. Systems were designed for operational continuity and compliance with laboratory accreditation requirements.',
    gallery: ['/Ramara V1.1.jpg', '/Ramara V1.2.jpg'],
  },
  {
    id: 'merieux-gough',
    name: 'Merieux NutriSciences – 90 Gough Road, Units 3 & 4, Markham',
    client: 'Merieux NutriSciences',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '90 Gough Road, Units 3 & 4, Markham, ON',
    mepType: 'Mechanical & Electrical (Laboratory)',
    overview:
      "Range Engineering Inc. provided full Mechanical and Electrical Engineering Design for the Merieux NutriSciences laboratory expansion at 90 Gough Road, Units 3 & 4, Markham. The multi-unit facility consolidates additional laboratory and support functions for the organization's York Region operations.",
    details:
      'Engineering services encompassed laboratory supply and exhaust ventilation, process cooling water systems, uninterruptible power supplies (UPS) for critical instruments, specialized laboratory lighting, plumbing for multiple laboratory zones, and coordination of building automation system (BAS) integration for environmental monitoring across both units.',
    gallery: ['/Ramara V1.2.jpg', '/Ramara V1.1.jpg'],
  },
];

function LaboratoryPage() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProjectIndex]);

  const activeProject = LAB_PROJECTS[selectedProjectIndex];
  if (!activeProject) return null;

  return (
    <SiteLayout>
      <main className="bg-white min-h-screen text-ink pb-24">
        <div className="h-20 md:h-28 bg-white" />

        <div className="container-page px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 border-b border-ink/10 pb-6 mb-12">
            {LAB_PROJECTS.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-md ${selectedProjectIndex === idx
                  ? 'bg-ink text-white shadow-md'
                  : 'bg-gray-100 text-ink/70 hover:bg-gray-200'
                  }`}
              >
                {project.name.split('–')[1]?.split(',')[0].trim() ?? project.name.split(',')[0].trim()}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-24 mb-12">
            <div className="lg:w-64 shrink-0 mb-8 lg:mb-0 space-y-4 text-sm text-ink/70">
              <div>
                <span className="font-semibold block text-ink/90">Location:</span>
                <span>{activeProject.location}</span>
              </div>
              <div>
                <span className="font-semibold block text-ink/90">Client:</span>
                <span>{activeProject.client}</span>
              </div>
              <div>
                <span className="font-semibold block text-ink/90">MEP Scope Type:</span>
                <span className="inline-block bg-ink/5 px-2 py-0.5 rounded text-xs font-medium mt-1">
                  {activeProject.mepType}
                </span>
              </div>
              <div>
                <span className="font-semibold block text-ink/90">Status:</span>
                <span className="text-xs">{activeProject.status}</span>
              </div>
            </div>

            <div className="flex-1 max-w-4xl">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink/40 mb-3">
                PROJECT DETAILS
              </p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                {activeProject.name}
              </h1>
              <div className="text-base md:text-lg leading-relaxed text-ink/70 space-y-6 mb-8 max-w-3xl">
                <p>{activeProject.overview}</p>
              </div>
              <h3 className="text-xl font-bold mb-3">Engineering Highlights</h3>
              <p className="text-base leading-relaxed text-ink/70 mb-8 max-w-3xl">
                {activeProject.details}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink/50 mb-4">
              Project Gallery
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeProject.gallery.map((imgSrc, i) => (
                <div key={i} className="aspect-[4/3] bg-[#f8f8f8] overflow-hidden rounded-md shadow-sm">
                  <img
                    src={imgSrc}
                    alt={`${activeProject.name} photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </SiteLayout>
  );
}
