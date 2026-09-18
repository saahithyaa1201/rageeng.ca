import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/portfolio/custom-homes')({
  component: CustomHomesPage,
});

// Residential Projects Data Array
const RESIDENTIAL_PROJECTS = [
  {
    id: '115-zaph',
    name: '115 Zaph Avenue',
    client: 'Private Residence',
    scope: 'Mechanical and Electrical Engineering Design',
    status: 'Construction Completed',
    location: 'Scarborough, ON, Canada',
    mepType: 'Mechanical & Electrical',
    overview:
      "Range Engineering Inc. provided comprehensive Mechanical Design services for a new two-storey custom residence located at 115 Zaph Avenue, Scarborough, Ontario. The project has been successfully completed and reflects Range Engineering Inc.'s commitment to delivering innovative, efficient, and code-compliant engineering solutions for high-quality custom residential developments.",
    details:
      'The engineering focus centered on optimizing heating, cooling, and plumbing layouts to integrate seamlessly within the luxury architecture while maintaining clean structural aesthetics.',
    gallery: ['/Ramara V1.1.jpg', '/Ramara V1.2.jpg'],
  },
  {
    id: 'ramara-house',
    name: 'Ramara House (7558 Cronk Side Road)',
    client: 'Private Residence',
    scope: 'Architectural & Mechanical Integration',
    status: 'Completed / Design Finalized',
    location: '7558 Cronk Side Road, Ramara, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Two bungalow single family dwelling in one lot, designed of traditional style with material of brick, stone and board and batten wood siding and metal ribbed roofing, showcases its simplicity bereft of complication. Truly an adaptable building design in a serene plot of land in one of the Muskoka localities.',
    details:
      "Owners' aspiration has well been served with the simple and functional design. Engineering systems were crafted to maximize efficiency and seasonal climate adaptability in a serene country property setting.",
    gallery: ['/Ramara V1.1.jpg', '/Ramara V1.2.jpg', '/Ramara V2.1.jpg', '/Ramara V2.2.jpg', '/Construction -1.jpg', '/Construction -2.jpg', '/Construction -3.jpg', '/Construction -4.jpg'],
  },
  {
    id: '11-gaydon',
    name: '11 Gaydon Avenue',
    client: 'Private Residence',
    scope: 'Mechanical Engineering Design',
    status: 'Construction Completed',
    location: '11 Gaydon Avenue, North York, ON',
    mepType: 'Mechanical (HVAC, Radiant Heating & Pool Systems)',
    overview:
      'Range Engineering Inc. provided comprehensive Mechanical Engineering Design services for a luxury two-storey custom residence located at 11 Gaydon Avenue, North York, Ontario. The project was designed to deliver exceptional comfort, energy efficiency, and year-round functionality through the integration of advanced residential mechanical systems.',
    details:
      'The home features a dual heating system utilizing a high-efficiency forced-air HVAC system complemented by hydronic in-floor radiant heating. Exterior amenities include mechanical systems for the outdoor swimming pool and hydronic snow-melting systems for the main driveway.',
    gallery: ['/Gay.jpg', '/Gay1.png', '/Gay2.png', '/Gay3.png'],
  },
  {
    id: '499-rebecca',
    name: '499 Rebecca St. Oakville',
    client: 'Private Residence',
    scope: 'Mechanical & Electrical Design',
    status: 'Completed',
    location: '499 Rebecca St., Oakville, ON',
    mepType: 'Mechanical & Electrical',
    overview:
      'Range Engineering Inc. delivered custom engineering solutions for a modern 2-storey custom home situated in Oakville, Ontario. The layout required precise coordination between architectural features and mechanical/electrical utilities.',
    details:
      'Designed for optimum thermal comfort and indoor air quality, the facility incorporates energy-efficient ventilation, quiet zonal heating, and customized residential power distribution.',
    gallery: ['/name.jpg', '/name2.jpg', '/name3.jpg'],
  },
];

function CustomHomesPage() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProjectIndex]);

  const activeProject = RESIDENTIAL_PROJECTS[selectedProjectIndex];

  return (
    <SiteLayout>
      <main className="bg-white min-h-screen text-ink pb-24">
        <div className="h-20 md:h-28 bg-white" />

        <div className="container-page px-6 lg:px-12">
          {/* Category / Project Selection Tabs */}
          <div className="flex flex-wrap gap-3 border-b border-ink/10 pb-6 mb-12">
            {RESIDENTIAL_PROJECTS.map((project, idx) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectIndex(idx)}
                className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-md ${selectedProjectIndex === idx
                  ? 'bg-ink text-white shadow-md'
                  : 'bg-gray-100 text-ink/70 hover:bg-gray-200'
                  }`}
              >
                {project.name.split(',')[0].trim()}
              </button>
            ))}
          </div>

          {/* Project Details View Header */}
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

          {/* Project Image Gallery */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-ink/50 mb-4">
              Project Gallery
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeProject.gallery.map((imgSrc, i) => (
                <div key={i} className="aspect-[4/3] bg-[#f8f8f8] overflow-hidden rounded-md shadow-sm">
                  <img
                    src={imgSrc}
                    alt={`${activeProject.name} image ${i + 1}`}
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