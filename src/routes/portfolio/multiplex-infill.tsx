import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/portfolio/multiplex-infill')({
  component: MultiplexInfillPage,
});

const MULTIPLEX_PROJECTS = [
  {
    id: '74-amherst',
    name: '74 Amherst Road',
    client: 'Private Developer',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '74 Amherst Road, Toronto, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. provided Mechanical and Electrical Engineering Design for a multiplex residential infill development at 74 Amherst Road, Toronto. The project is part of a broader infill portfolio addressing housing density in established Toronto neighbourhoods.',
    details:
      'Engineering services included HVAC design per dwelling unit, plumbing stack coordination, electrical panel and service sizing, and fire safety system integration. The design was optimized to fit within the existing streetscape while delivering modern, efficient building systems.',
    gallery: ['/amherst.png'],
  },
  {
    id: '119-belgravia',
    name: '119 Belgravia Road',
    client: 'Private Developer',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '119 Belgravia Road, Toronto, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. delivered MEP engineering for a multiplex infill project at 119 Belgravia Road, Toronto. The development adds needed density within a low-rise residential neighbourhood through a well-coordinated, code-compliant multiplex design.',
    details:
      'The engineering scope covered individual unit heating and cooling systems, plumbing rough-in, electrical distribution, and exterior lighting. All systems were designed for long-term reliability and ease of maintenance by future property managers.',
    gallery: ['/belgravia.png'],
  },
  {
    id: '521-lansdowne',
    name: '521 Lansdowne Avenue',
    client: 'Private Developer',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '521 Lansdowne Avenue, Toronto, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      "Range Engineering Inc. provided engineering design for a multiplex residential infill development at 521 Lansdowne Avenue, Toronto. The project contributes to the City of Toronto's \"missing middle\" housing initiatives in the Bloordale Village area.",
    details:
      'Mechanical and electrical systems were designed for multi-unit efficiency, including shared utility metering, individual suite controls, and central ventilation coordination. The design meets Toronto Green Standard requirements and applicable energy codes.',
    gallery: ['/lans.png'],
  },
  {
    id: '376-manning',
    name: '376 Manning Avenue',
    client: 'Private Developer',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '376 Manning Avenue, Toronto, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. provided Mechanical and Electrical Engineering for a multiplex infill at 376 Manning Avenue in the Trinity-Bellwoods neighbourhood of Toronto. The project delivers additional residential units within a heritage-sensitive streetscape.',
    details:
      'System design challenges included adapting modern MEP infrastructure to a constrained infill footprint. Solutions included compact air handling units, optimized plumbing configurations, and surface-mounted electrical distribution to preserve ceiling heights and architectural intent.',
    gallery: ['/Ramara V1.2.jpg', '/Ramara V1.1.jpg'],
  },
  {
    id: '277-cedarvale',
    name: '277 Cedarvale Road',
    client: 'Private Developer',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '277 Cedarvale Road, Toronto, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. delivered MEP engineering services for a multiplex residential infill development at 277 Cedarvale Road, Toronto. The development adds density to the East York neighbourhood through a carefully designed multiplex building.',
    details:
      'Engineering highlights include independent HVAC systems for each unit, domestic water supply and sanitary design, electrical panel and metering coordination, and exterior service connections. All systems comply with the Ontario Building Code and City of Toronto requirements.',
    gallery: ['/Ramara V1.1.jpg', '/Ramara V1.2.jpg'],
  },
  {
    id: '341-morningside',
    name: '341 Morningside Avenue',
    client: 'Private Developer',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '341 Morningside Avenue, Toronto, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      "Range Engineering Inc. provided comprehensive Mechanical and Electrical Engineering design for a multiplex infill development at 341 Morningside Avenue, Toronto (Scarborough district). The project is the sixth in Range Engineering's Toronto infill residential portfolio.",
    details:
      "The engineering scope included high-efficiency split systems for each dwelling unit, domestic hot and cold water distribution, sanitary drainage, electrical service sizing, and fire separation of mechanical and electrical systems between units. The design supports the City of Toronto's residential intensification goals.",
    gallery: ['/Ramara V1.2.jpg', '/Ramara V1.1.jpg'],
  },
];

function MultiplexInfillPage() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProjectIndex]);

  const activeProject = MULTIPLEX_PROJECTS[selectedProjectIndex];
  if (!activeProject) return null;

  return (
    <SiteLayout>
      <main className="bg-white min-h-screen text-ink pb-24">
        <div className="h-20 md:h-28 bg-white" />

        <div className="container-page px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 border-b border-ink/10 pb-6 mb-12">
            {MULTIPLEX_PROJECTS.map((project, idx) => (
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
