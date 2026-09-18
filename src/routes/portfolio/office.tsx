import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/portfolio/office')({
  component: OfficePage,
});

const OFFICE_PROJECTS = [
  {
    id: '233-armstrong',
    name: '233 Armstrong Avenue',
    client: 'Private Owner',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '233 Armstrong Avenue, Georgetown, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. provided comprehensive Mechanical and Electrical Engineering Design for an office fit-out at 233 Armstrong Avenue, Georgetown, Ontario. The project involved transforming an existing space into a modern, functional work environment with fully coordinated building systems.',
    details:
      'Engineering scope included zonal HVAC design for open-plan and private office areas, energy-efficient LED lighting with daylight and occupancy controls, power distribution for workstations and IT infrastructure, washroom plumbing, and fire alarm integration. The design was optimized for occupant comfort, energy performance, and operational simplicity.',
    gallery: [
      '/233 Armstrong Ave_11 - Photo.jpg',
      '/233 Armstrong Ave_16 - Photo.jpg',
      '/233 Armstrong Ave_21 - Photo.jpg',
      '/233 Armstrong Ave_22 - Photo.jpg',
      '/233 Armstrong Ave_24 - Photo.jpg',
      '/233 Armstrong Ave_27 - Photo.jpg',
      '/233 Armstrong Ave_28 - Photo.jpg',
      '/233 Armstrong Ave_36 - Photo.jpg',
      '/233 Armstrong Ave_53 - Photo.jpg',
      '/233 Armstrong Ave_Photo - 1.jpg',
      '/233 Armstrong Ave_Photo - 2.jpg',
      '/233 Armstrong Ave_Photo - 3.jpg',
    ],
  },
];

function OfficePage() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProjectIndex]);

  const activeProject = OFFICE_PROJECTS[selectedProjectIndex];
  if (!activeProject) return null;

  return (
    <SiteLayout>
      <main className="bg-white min-h-screen text-ink pb-24">
        <div className="h-20 md:h-28 bg-white" />

        <div className="container-page px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 border-b border-ink/10 pb-6 mb-12">
            {OFFICE_PROJECTS.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-md ${selectedProjectIndex === idx
                  ? 'bg-ink text-white shadow-md'
                  : 'bg-gray-100 text-ink/70 hover:bg-gray-200'
                  }`}
              >
                {project.name.split(',')[0]?.trim() ?? project.name}
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
