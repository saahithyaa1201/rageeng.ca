import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/portfolio/daycare-recreation')({
  component: DaycareRecreationPage,
});

const DAYCARE_PROJECTS = [
  {
    id: 'kidsville-halton',
    name: 'Kidsville Daycare – 15 St. Albans Street',
    client: 'Kidsville Daycare',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '15 St. Albans Street, Halton Hills, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. provided Mechanical and Electrical Engineering Design services for the Kidsville Daycare facility at 15 St. Albans Street, Halton Hills. The project involved the fit-out of a new childcare centre designed to create a safe, healthy, and stimulating environment for young children and staff.',
    details:
      'Engineering highlights include enhanced indoor air quality ventilation systems (exceeding ASHRAE 62.1 minimums), washroom plumbing scaled for young children, dedicated electrical circuits for kitchen and learning equipment, and occupancy-controlled lighting throughout classrooms and corridors.',
    gallery: ['/Ramara V1.1.jpg', '/Ramara V1.2.jpg'],
  },
  {
    id: 'kidsville-scarborough',
    name: 'Kidsville Daycare – 5637 Finch Avenue East',
    client: 'Kidsville Daycare',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '5637 Finch Avenue East, Scarborough, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. delivered Mechanical and Electrical Engineering Design for the Kidsville Daycare location at 5637 Finch Avenue East, Scarborough. The centre serves as a childcare hub for the Scarborough community, and the MEP design prioritizes child safety, comfort, and operational efficiency.',
    details:
      'The MEP scope included supply and exhaust ventilation, domestic hot water systems (thermostatic mixing for scalding prevention), dedicated kitchen mechanical and electrical services, child-height fixture specifications, and emergency lighting and fire alarm integration.',
    gallery: ['/Ramara V1.1.jpg', '/Ramara V1.2.jpg'],
  },
  {
    id: 'aerosports-scarborough',
    name: 'Aerosports Parks – 1120 Birchmount Road',
    client: 'Aerosports Parks',
    scope: 'Mechanical & Electrical Engineering Design',
    status: 'Design Completed',
    location: '1120 Birchmount Road, Scarborough, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. provided full Mechanical and Electrical Engineering Design for the Aerosports Parks recreation facility at 1120 Birchmount Road, Scarborough. The large-format indoor recreation centre features trampoline parks, active play zones, and spectator areas requiring robust MEP infrastructure.',
    details:
      'Engineering for large-span recreation spaces included high-volume low-speed (HVLS) fan coordination, industrial-grade HVAC for high-occupancy activity areas, extensive LED sports lighting, high-capacity electrical distribution for arcade and attraction equipment, and washroom and concession plumbing facilities.',
    gallery: ['/Ramara V1.2.jpg', '/Ramara V1.1.jpg'],
  },
];

function DaycareRecreationPage() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProjectIndex]);

  const activeProject = DAYCARE_PROJECTS[selectedProjectIndex];
  if (!activeProject) return null;

  return (
    <SiteLayout>
      <main className="bg-white min-h-screen text-ink pb-24">
        <div className="h-20 md:h-28 bg-white" />

        <div className="container-page px-6 lg:px-12">
          <div className="flex flex-wrap gap-3 border-b border-ink/10 pb-6 mb-12">
            {DAYCARE_PROJECTS.map((project, idx) => (
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
