import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/portfolio/industrial')({
    component: IndustrialPage,
});

// Industrial Projects Data Array
const INDUSTRIAL_PROJECTS = [
    {
        id: 'tcs-sluse',
        name: '91 Sluse Road – Technical Concrete Solutions (TCS)',
        client: 'TCS Construction',
        value: 'Approximately $18 Million',
        scope: 'SPA & Mechanical and Electrical Engineering Design',
        status: 'Final Stage of Site Plan Approval | Building Permit Design in Progress',
        location: '91 Sluse Road, Ontario, Canada',
        mepType: 'Mechanical & Electrical',
        overview:
            "Range Engineering Inc. is providing comprehensive mechanical and electrical engineering services for the new Technical Concrete Solutions (TCS) headquarters and manufacturing facility located at 91 Sluse Road. The development consists of a new integrated industrial and office complex designed to consolidate TCS's existing operations in Newmarket into a single, purpose-built facility. The project includes a 30,000 sq. ft. manufacturing building and a three-storey, 9,000 sq. ft. administration office (approximately 3,000 sq. ft. per floor).",
        details:
            'The administration building is designed to provide a modern and efficient workplace featuring executive and administrative offices, meeting rooms, employee amenities, lunch and break areas, washrooms, and support spaces. The industrial facility is designed to accommodate TCS\'s manufacturing operations while supporting future growth and operational efficiency.',
        gallery: ['/Constrcution pic 1.jpg', '/Construction -3.jpg', '/Construction -4.jpg'],
    },
    {
        id: 'fasan-drive',
        name: '2183–2187 Fasan Drive, Oldcastle',
        client: 'Fasan Development Inc.',
        value: 'Approximately $10 Million',
        scope: 'Site Plan Approval (SPA), Mechanical and Electrical Engineering Design',
        status: 'Site Plan Approval | Building Permit Design in Progress',
        location: '2183–2187 Fasan Drive, Oldcastle, Tecumseh, ON',
        mepType: 'Mechanical & Electrical',
        overview:
            'Range Engineering Inc. is providing comprehensive Site Plan Approval (SPA), Mechanical, and Electrical Engineering Design services for a new truck service facility and office complex located in Oldcastle, Tecumseh, Ontario. The development consists of an 8,000 sq. ft. truck service shop and a two-storey, 3,500 sq. ft. administration office.',
        details:
            "The administration building features modern office spaces, executive offices, meeting rooms, employee lunch and break areas, washrooms, and other support amenities to create an efficient and comfortable working environment. The truck service facility has been designed to accommodate heavy vehicle maintenance and servicing operations with efficient workflow, durable building systems, and reliable mechanical and electrical infrastructure.",
        gallery: ['/Construction -3.jpg', '/Constrcution pic 1.jpg', '/Construction -4.jpg'],
    },
    {
        id: 'jack-chute',
        name: '15 Jack Chute Road, Killaloe',
        client: 'AXKO Construction',
        value: 'Approximately $2 Million',
        scope: 'Mechanical and Electrical Engineering Design',
        status: 'Construction in Progress',
        location: '15 Jack Chute Road, Killaloe, ON',
        mepType: 'Mechanical & Electrical (Off-Grid Utility System)',
        overview:
            "Range Engineering Inc. is providing comprehensive Mechanical and Electrical Engineering Design services for a new office and training facility located at 15 Jack Chute Road, Killaloe, Ontario. The project consists of a 3,600 sq. ft. pre-engineered steel building situated in a remote location without access to municipal water, sanitary sewer, or natural gas services.",
        details:
            'To address the site\'s servicing challenges, Range Engineering designed an integrated off-grid utility system, including a potable water storage and booster pump system, onsite septic system, and propane storage and distribution system. These systems were carefully coordinated to provide reliable, efficient, and code-compliant building services while meeting operational requirements.',
        gallery: ['/Construction -4.jpg', '/Constrcution pic 1.jpg', '/Construction -3.jpg'],
    },
];

function IndustrialPage() {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedProjectIndex]);

    const activeProject = INDUSTRIAL_PROJECTS[selectedProjectIndex];
    if (!activeProject) return null;

    return (
        <SiteLayout>
            <main className="bg-white min-h-screen text-ink pb-24">
                <div className="h-20 md:h-28 bg-white" />

                <div className="container-page px-6 lg:px-12">
                    {/* Category Selection Tabs */}
                    <div className="flex flex-wrap gap-3 border-b border-ink/10 pb-6 mb-12">
                        {INDUSTRIAL_PROJECTS.map((project, idx) => (
                            <button
                                key={project.id}
                                onClick={() => setSelectedProjectIndex(idx)}
                                className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 rounded-md ${selectedProjectIndex === idx
                                    ? 'bg-ink text-white shadow-md'
                                    : 'bg-gray-100 text-ink/70 hover:bg-gray-200'
                                    }`}
                            >
                                {project.name.split('–')[0].trim()}
                            </button>
                        ))}
                    </div>

                    {/* Project Header Info */}
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
                                <span className="font-semibold block text-ink/90">Project Value:</span>
                                <span>{activeProject.value}</span>
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
                            <h3 className="text-xl font-bold mb-3">Project Infrastructure & Scope</h3>
                            <p className="text-base leading-relaxed text-ink/70 mb-8 max-w-3xl">
                                {activeProject.details}
                            </p>
                        </div>
                    </div>

                    {/* Image Gallery */}
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