import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/portfolio/commercial-retail')({
  component: CommercialRetailPage,
});

const COMMERCIAL_PROJECTS = [
  {
    id: 'bronte-oakville',
    name: 'Bronte Road & Charles Cornwall Road, Oakville',
    client: 'Private Developer',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: 'Bronte Road & Charles Cornwall Road, Oakville, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. provided Mechanical and Electrical Engineering Design services for a commercial and retail development at the intersection of Bronte Road and Charles Cornwall Road, Oakville. The mixed-use project features retail tenant spaces with flexible MEP infrastructure designed to accommodate a variety of tenants.',
    details:
      'Engineering highlights include base building HVAC with demisable tenant zones, plumbing rough-in for food service and retail tenants, electrical distribution to individual tenant panels, exterior signage power provisions, and parking lot lighting design. All systems were designed for adaptability and long-term operational efficiency.',
    gallery: ['/Building 1B.jpg', '/Ramara V1.1.jpg', '/Ramara V1.2.jpg'],
  },
  {
    id: '3250-argentia',
    name: '3250 Argentia Road, Mississauga',
    client: 'Private Developer',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '3250 Argentia Road, Mississauga, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. delivered Mechanical and Electrical Engineering Design for a commercial and retail development at 3250 Argentia Road, Mississauga. The project consists of retail/commercial units within a multi-tenant strip development in a high-traffic commercial corridor.',
    details:
      'The MEP scope included rooftop unit HVAC selection and ductwork coordination for each tenant bay, domestic water distribution and grease trap provisions for food service bays, individual electrical metering and panel scheduling, and site lighting design. The engineering approach ensures each tenant bay is fully serviced and independently metered.',
    gallery: ['/Ramara V1.1.jpg', '/Building 1B.jpg', '/Ramara V1.2.jpg'],
  },
  {
    id: '171-speers',
    name: '171 Speers Road, Oakville',
    client: 'Private Developer',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '171 Speers Road, Oakville, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. provided full Mechanical and Electrical Engineering Design for a commercial and retail project at 171 Speers Road, Oakville. Located in an established commercial zone, the development delivers modern retail space with comprehensive MEP infrastructure.',
    details:
      'Engineering services included HVAC zoning for retail and back-of-house spaces, plumbing for washrooms and service areas, electrical distribution including emergency and exit lighting, and coordination with the local utility for service entrance requirements. The design supports a professional retail environment with low ongoing maintenance demands.',
    gallery: ['/Ramara V1.2.jpg', '/Building 1B.jpg', '/Ramara V1.1.jpg'],
  },
];

function CommercialRetailPage() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProjectIndex]);

  const activeProject = COMMERCIAL_PROJECTS[selectedProjectIndex];
  if (!activeProject) return null;

  return (
    <SiteLayout>
      <main className="bg-white min-h-screen text-ink pb-24">
        <div className="h-20 md:h-28 bg-white" />

        <div className="container-page px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 border-b border-ink/10 pb-6 mb-12">
            {COMMERCIAL_PROJECTS.map((project, idx) => (
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
