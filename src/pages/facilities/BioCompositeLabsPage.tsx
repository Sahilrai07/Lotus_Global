import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { getSiteData } from "../../data/siteDataService";
import { CheckCircle2, Microscope, Dna } from "lucide-react";

interface BioCompositeLabsPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const BioCompositeLabsPage: React.FC<BioCompositeLabsPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const siteData = getSiteData();
  const bio = siteData.facilities.find((f) => f.id === "biology-lab");
  const comp = siteData.facilities.find((f) => f.id === "composite-lab");
  const bannerImage = siteData.pageBanners?.facilities || "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80";

  return (
    <InternalPageLayout
      title="Biology & Composite Science Laboratories"
      category="CAMPUS FACILITIES"
      activePageId="facility-bio-composite"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[
        { label: "Facilities", pageId: "facilities" },
        { label: "Biology & Composite Lab" },
      ]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Life Sciences & Interdisciplinary STEM
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Biology & Composite Science Laboratories
          </h2>
        </div>

        {/* Lead Summary */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Our Life Science and Composite Science laboratories introduce students to the intricate mechanisms of living organisms and interdisciplinary STEM experimentation. Here, observation, botanical dissection, and computational data logging unite.
        </p>

        {/* 1. Biology Laboratory */}
        <div className="p-6 rounded border border-slate-200 bg-[#F8FAFC] space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Microscope className="w-5 h-5 text-[#E87737]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              {bio?.name || "Biology Laboratory & Cellular Microscopy"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
              <img
                src={bio?.image || "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"}
                alt={bio?.name || "Biology Laboratory"}
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed">
                {bio?.description || "Equipped with high-precision compound binocular microscopes, projection microscopes, botanical physiology apparatus, and taxonomical specimens. Students prepare microscopic slides, examine plant stomatal anatomy, observe osmosis, and study physiological adaptations."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(bio?.features || [
                  "High-Resolution Binocular Microscopes",
                  "Botanical & Zoological Specimen Sanctum",
                  "Permanent Cellular Staining Kits",
                  "Human Anatomical 3D Torso Models"
                ]).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Composite Science Laboratory */}
        <div className="p-6 rounded border border-slate-200 bg-[#F8FAFC] space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Dna className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              {comp?.name || "Composite Science Lab & STEM Prototyping"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm md:order-last">
              <img
                src={comp?.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"}
                alt={comp?.name || "Composite Science Laboratory"}
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed">
                {comp?.description || "An integrated, collaborative workspace designed primarily for middle school grades (Grades 4 to 8). It bridges physical sciences, biological observation, and computational logic. Students work in groups to construct functional models, record environmental sensory data, and present empirical findings."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(comp?.features || [
                  "Multi-Disciplinary Group Workstations",
                  "Digital Temperature & Light Sensors",
                  "Interactive Demonstration Projection",
                  "STEM Prototyping & Robotics Kits"
                ]).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
