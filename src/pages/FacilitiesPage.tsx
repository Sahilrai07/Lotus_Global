import React from "react";
import { FacilityExplorer } from "../components/FacilityExplorer";
import { ShieldCheck, HeartPulse, Sparkles, Activity } from "lucide-react";

interface FacilitiesPageProps {
  openInquiry: () => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ openInquiry }) => {
  return (
    <div className="pt-28 pb-20 animate-fade-in bg-[#F8FAFC]">
      {/* Page Hero */}
      <section className="bg-[#0B1B3D] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider">
              <span>Campus Infrastructure</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
              Facilities & Learning Spaces
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Purpose-built spaces in Vatar, Vapi, designed to cultivate empirical science inquiry, computational fluency, artistic expression, and athletic endurance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Facility Explorer */}
      <FacilityExplorer />

      {/* Safety, Health & Infrastructure Standards */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
              Safety & Wellbeing
            </span>
            <h2 className="font-display font-bold text-3xl text-[#0B1B3D] tracking-tight mt-1">
              Institutional Safeguards & Campus Care
            </h2>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">
              Every facility at Lotus Global School is designed with student safety, environmental hygiene, and continuous monitoring as paramount priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#E86A2C] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                Laboratory Safety Protocols
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chemical fume extraction, eye-wash stations, non-slip flooring, and mandatory personal protective wear during all empirical laboratory experiments.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0B1B3D] flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                Campus Infirmary Care
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated healthcare bay with first-aid kits, recovery beds, routine health observation records, and immediate medical on-call protocols.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                Ergonomics & Climate
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Well-ventilated classrooms, child-friendly ergonomic seating, and child-safe computing networks shielded with content protection firewalls.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-xs text-slate-600">
              <strong className="text-slate-800">Campus Note:</strong> Facility appointments and specifications are regularly inspected in preparation for registration and CBSE affiliation review.
            </div>
            <button
              onClick={openInquiry}
              className="px-5 py-2.5 bg-[#0B1B3D] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E86A2C] transition-colors shrink-0"
            >
              Enquire About Campus
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
