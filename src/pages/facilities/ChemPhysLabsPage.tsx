import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { ShieldCheck, CheckCircle2, FlaskConical, Atom, Eye, Compass } from "lucide-react";

interface ChemPhysLabsPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const ChemPhysLabsPage: React.FC<ChemPhysLabsPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  return (
    <InternalPageLayout
      title="Chemistry & Physics Laboratories"
      category="CAMPUS FACILITIES"
      activePageId="facility-chem-phys"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80"
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
              Chemistry Laboratory & Chemical Inquiry
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80"
                alt="Chemistry Laboratory at Lotus Global School"
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed">
                Engineered with acid-resistant workbenches, individual reagent stations, fume extractors, and safety showers. Students perform chemical reaction analyses, qualitative salt testing, molecular crystallization, and acid-base titrations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Analytical Digital Balances</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Borosilicate Glassware Sets</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Emergency Eyewash & Safety Shower</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Flamehood & Direct Exhaust</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Physics Laboratory Section */}
        <div className="p-6 rounded border border-slate-200 bg-[#F8FAFC] space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Atom className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Physics Laboratory & Mechanics Arena
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm md:order-last">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                alt="Physics Laboratory at Lotus Global School"
                className="w-full h-56 object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
              <p className="leading-relaxed">
                Dedicated optical benches, kinematic setups, and electrodynamics testing stations transform theoretical formulas into clear physical observations. Students study optics, ray refraction, magnetic resonance, electrical circuit dynamics, and thermodynamics.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Optical Benches & Prism Setups</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Precision Galvano & Multimeters</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Kinematics & Pulley Dynamic Kits</span>
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-[#2F5187]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Wave Resonance & Sound Sonometers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Protocols Table */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-base text-[#2F5187] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E87737]" />
            <span>Strict Laboratory Safety Protocols</span>
          </h4>
          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-2.5 border-r border-[#3d65a3]">Standard</th>
                  <th className="p-2.5 border-r border-[#3d65a3]">Protocol Requirement</th>
                  <th className="p-2.5">Supervision Measure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="bg-white">
                  <td className="p-2.5 font-bold text-[#2F5187] border-r border-slate-200">Personal Protection</td>
                  <td className="p-2.5 border-r border-slate-200">Mandatory lab coats, safety goggles, and thermal gloves.</td>
                  <td className="p-2.5">Inspected by lab demonstrator prior to bench access.</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="p-2.5 font-bold text-[#2F5187] border-r border-slate-200">Chemical Management</td>
                  <td className="p-2.5 border-r border-slate-200">Lockable double-containment storage for concentrated reagents.</td>
                  <td className="p-2.5">Pre-diluted solutions distributed directly by staff.</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-2.5 font-bold text-[#2F5187] border-r border-slate-200">Electrical Safeguards</td>
                  <td className="p-2.5 border-r border-slate-200">Isolated step-down transformers and earth-leakage circuit breakers.</td>
                  <td className="p-2.5">Centralized master shut-off switch at educator console.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
