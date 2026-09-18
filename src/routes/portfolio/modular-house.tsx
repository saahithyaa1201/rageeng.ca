import { createFileRoute } from '@tanstack/react-router';
import { SiteLayout } from '@/components/site/SiteLayout';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/portfolio/modular-house')({
    component: ModularHousePage,
});

const MODULAR_PROJECTS = [
    {
        id: '83-lincoln',
        name: '83 Lincoln Avenue Townhouse Development',
        client: 'Private Developer',
        scope: 'Mechanical & Electrical Engineering Design',
        status: 'Design Completed',
        location: '83 Lincoln Avenue, St. Catharines, ON',
        mepType: 'Mechanical & Electrical',
        overview:
            'Range Engineering Inc. provided comprehensive Mechanical and Electrical Engineering Design services for a new modular townhouse development at 83 Lincoln Avenue, St. Catharines. The project consists of compact, efficiently planned modular residential units designed to meet contemporary living standards in an urban infill context.',
        details:
            'Engineering systems were tailored to the modular construction methodology, incorporating prefabricated MEP components and integrated energy-efficient HVAC, plumbing, and electrical systems. The design prioritizes code compliance, sustainability, and occupant comfort across all units.',
        gallery: ['/Render_260324_1.png'],
    },
    {
        id: '129-kent',
        name: '129 Kent Street',
        client: 'Private Developer',
        scope: 'Mechanical & Electrical Engineering Design',
        status: 'Design Completed',
        location: '129 Kent Street, Campbellford, ON',
        mepType: 'Mechanical & Electrical',
        overview:
            'Range Engineering Inc. delivered Mechanical and Electrical Engineering Design services for a new modular residential development located at 129 Kent Street, Campbellford. The project features compact modular living units designed for efficient assembly and long-term operational reliability.',
        details:
            'The engineering scope included full HVAC design, plumbing layout, and electrical service coordination tailored for modular assembly. Systems were optimized to reduce on-site installation time while maintaining high standards of indoor comfort and energy performance.',
        gallery: ['/Render 3.jpg'],
    },
    {
        id: '1041-willowdale',
        name: '1041 Willowdale Avenue',
        client: 'Private Developer',
        scope: 'Mechanical & Electrical Engineering Design',
        status: 'Design Completed',
        location: '1041 Willowdale Avenue, North York, ON',
        mepType: 'Mechanical & Electrical',
        overview:
            'Range Engineering Inc. provided full Mechanical and Electrical Engineering Design for a modular residential development at 1041 Willowdale Avenue, North York. The project involves compact living units within a well-established urban neighbourhood, requiring careful coordination of MEP systems within modular unit constraints.',
        details:
            'Engineering highlights include high-efficiency forced-air systems, zonal electrical distribution, and plumbing layouts specifically adapted to the modular construction sequence. The design ensures all units meet Ontario Building Code standards while maximizing livable space.',
        gallery: ['/Ramara V1.2.jpg', '/Ramara V1.1.jpg'],
    },
];

function ModularHousePage() {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [selectedProjectIndex]);

    const activeProject = MODULAR_PROJECTS[selectedProjectIndex];
    if (!activeProject) return null;

    return (
        <SiteLayout>
            <main className="bg-white min-h-screen text-ink pb-24">
                <div className="h-20 md:h-28 bg-white" />

                <div className="container-page px-6 lg:px-12">
                    {/* Project Selection Tabs */}
                    <div className="flex flex-wrap gap-3 border-b border-ink/10 pb-6 mb-12">
                        {MODULAR_PROJECTS.map((project, idx) => (
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
