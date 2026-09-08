import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { sectors } from "@/data/site";
import { useEffect } from "react";

// For the gallery, we can reuse some mapping or just use sectorImages from index.tsx?
// Since we don't have sectorImages exported from data/site, we'll recreate a simple mapping
const galleryBySector: Record<string, string[]> = {
    industrial: ["/Constrcution pic 1.jpg", "/Construction -3.jpg", "/Construction -4.jpg"],
    "custom-homes": ["/Building 1B.jpg", "/Ramara V1.1.jpg", "/Ramara V1.2.jpg"],
    institutional: ["/233 Armstrong Ave_11 - Photo.jpg", "/233 Armstrong Ave_16 - Photo.jpg", "/233 Armstrong Ave_21 - Photo.jpg"],
    "commercial-retail": ["/233 Armstrong Ave_22 - Photo.jpg", "/233 Armstrong Ave_24 - Photo.jpg", "/233 Armstrong Ave_27 - Photo.jpg"],
    restaurants: ["/Construction -1.jpg", "/Construction -2.jpg", "/Construction -3.jpg"],
    healthcare: ["/233 Armstrong Ave_21 - Photo.jpg", "/233 Armstrong Ave_28 - Photo.jpg", "/233 Armstrong Ave_36 - Photo.jpg"],
};

export const Route = createFileRoute("/portfolio/sector/$sectorId")({
    component: SectorDetailPage,
});

function SectorDetailPage() {
    const { sectorId } = Route.useParams();
    const sector = sectors.find((s) => s.id === sectorId);
    const images = galleryBySector[sectorId] ?? ["/Hero.jpg", "/Hero2.jpg", "/Construction -1.jpg"];

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!sector) {
        return (
            <SiteLayout>
                <div className="container-page py-32 text-center">
                    <h1 className="text-3xl font-bold">Sector not found</h1>
                </div>
            </SiteLayout>
        );
    }

    return (
        <SiteLayout>
            <main className="bg-white min-h-screen text-ink pb-24">
                {/* Top spacer for header */}
                <div className="h-32 md:h-48 bg-white" />

                <div className="container-page px-6 lg:px-12">
                    {/* Main Content Layout */}
                    <div className="flex flex-col lg:flex-row lg:gap-32">

                        {/* Left Column - Meta */}
                        <div className="lg:w-48 shrink-0 mb-10 lg:mb-0 lg:pt-1">
                            <h2 className="text-sm font-semibold text-ink/70">
                                Place: <span className="font-normal text-ink/60">Ontario, Canada</span>
                            </h2>
                        </div>

                        {/* Right Column - Project description */}
                        <div className="flex-1 max-w-4xl">
                            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink/40 mb-3">
                                PROJECT DETAILS
                            </p>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 mt-2">
                                About the {sector.name.split(' (')[0]} Sector
                            </h1>

                            <div className="text-lg leading-relaxed text-ink/70 space-y-6 mb-12 max-w-3xl">
                                <p>
                                    {sector.fullDesc} We paid attention to every little detail and kept our awesome clients at the center of it all. We wanted to make sure that the facilities we delivered were nothing short of inspiring. In the end, it turned out to be an absolute blast.
                                </p>
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                Empowering Communities
                            </h3>
                            <p className="text-base leading-relaxed text-ink/70 mb-16 max-w-3xl">
                                This sector is like a dream come true for our team. Do you know why? Because they've created an environment that's all about precision and quality. We're super proud to be partnering with our clients to nurture the next generation of building standards.
                            </p>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {images.slice(0, 3).map((imgSrc, i) => (
                            <div key={i} className="aspect-[4/3] bg-[#f8f8f8]">
                                <img
                                    src={imgSrc}
                                    alt={`${sector.name} Gallery ${i + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </main>
        </SiteLayout>
    );
}
