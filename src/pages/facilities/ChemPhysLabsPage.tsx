import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { getSiteData } from "../../data/siteDataService";
import { CheckCircle2, FlaskConical, Atom } from "lucide-react";

interface ChemPhysLabsPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const ChemPhysLabsPage: React.FC<ChemPhysLabsPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const siteData = getSiteData();
  const chem = siteData.facilities.find((f) => f.id === "chemistry-lab");
  const phys = siteData.facilities.find((f) => f.id === "physics-lab");
  const bannerImage = siteData.pageBanners?.facilities || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80";

  return (
    <InternalPageLayout
      title="Chemistry & Physics Laboratories"
      category="CAMPUS FACILITIES"
      activePageId="facility-chem-phys"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[
        { label: "Facilities", pageId: "facilities" },
        { label: "Chemistry & Physics Labs" },
      ]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Empirical Physical Sciences
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Advanced Chemistry & Physics Laboratories
          </h2>
        </div>

        {/* Lead Summary */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          At Lotus Global School, our Chemistry and Physics laboratories are designed to turn abstract scientific principles into tangible empirical discoveries. Under strictly monitored safety protocols, students from middle through secondary stages conduct hands-on experiments aligned with the NCERT curriculum.
        </p>

        {/* 1. Chemistry Laboratory Section */}
        <div className="p-6 rounded border border-slate-200 bg-[#F8FAFC] space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <FlaskConical className="w-5 h-5 text-[#E87737]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              {chem?.name || "Chemistry Laboratory & Chemical Inquiry"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
              <img
                src={chem?.image || "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"}
                alt={chem?.name || "Chemistry Laboratory"}
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed">
                {chem?.description || "Engineered with acid-resistant workbenches, individual reagent stations, fume extractors, and safety showers. Students perform chemical reaction analyses, qualitative salt testing, molecular crystallization, and acid-base titrations."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(chem?.features || [
                  "Analytical Digital Balances",
                  "Borosilicate Glassware Sets",
                  "Emergency Eyewash & Safety Shower",
                  "Flamehood & Direct Exhaust"
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

        {/* 2. Physics Laboratory Section */}
        <div className="p-6 rounded border border-slate-200 bg-[#F8FAFC] space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Atom className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              {phys?.name || "Physics Laboratory & Mechanics Arena"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm md:order-last">
              <img
                src={phys?.image || "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"}
                alt={phys?.name || "Physics Laboratory"}
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed">
                {phys?.description || "Dedicated optical benches, kinematic setups, and electrodynamics testing stations transform theoretical formulas into clear physical observations. Students study optics, ray refraction, magnetic resonance, electrical circuit dynamics, and thermodynamics."}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(phys?.features || [
                  "Optical Benches & Prism Setups",
                  "Precision Galvano & Multimeters",
                  "Kinematic Motion Track Units",
                  "Wave Dynamics Sonometer Kits"
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
