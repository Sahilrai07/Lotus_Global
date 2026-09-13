import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { HeartPulse, CheckCircle2, ShieldCheck, PhoneCall, Stethoscope, Bed } from "lucide-react";
import { SCHOOL_INFO } from "../../data/schoolData";

interface CampusInfirmaryPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const CampusInfirmaryPage: React.FC<CampusInfirmaryPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  return (
    <InternalPageLayout
      title="Campus Infirmary & Healthcare"
      category="CAMPUS FACILITIES"
      activePageId="facility-infirmary"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Facilities", pageId: "facilities" },
        { label: "Campus Infirmary" },
      ]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Health, Safety & Student Wellbeing
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Campus Infirmary & Medical Care Bay
          </h2>
        </div>

        {/* Lead Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200 items-center">
          <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
              alt="Campus Infirmary at Lotus Global School"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Prompt First-Aid, Rest & Student Medical Care
            </h3>
            <p className="leading-relaxed font-medium">
              The health and safety of our students is of paramount importance at Lotus Global School.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our campus infirmary is a calm, sterile healthcare station staffed by a qualified attendant during all school hours. Equipped with emergency first-aid supplies, recovery beds, oxygen support, and digital vitals monitors, the bay manages minor ailments and accidental injuries swiftly.
            </p>
          </div>
        </div>

        {/* Medical Capabilities */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-[#E87737]" />
            <span>Infirmary Capabilities & Protocols</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <Bed className="w-4 h-4 text-[#E87737]" />
                <span>Dedicated Recovery Beds</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quiet resting cubicles allowing unwell students to recuperate comfortably while parents are notified.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <HeartPulse className="w-4 h-4 text-[#2F5187]" />
                <span>Routine Health Monitoring</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Annual student health check-ups tracking vision, dental hygiene, height, weight, and general vitals.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <PhoneCall className="w-4 h-4 text-[#E87737]" />
                <span>Emergency Physician On-Call</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategic tie-up with nearby medical clinics and Vatar PHC ensures rapid response for advanced clinical care.
              </p>
            </div>
          </div>
        </div>

        {/* Safety Protocol Note */}
        <div className="p-5 rounded bg-[#FFF5EE] border-l-4 border-[#E87737] space-y-2 text-xs">
          <span className="font-bold text-[#2F5187] uppercase block text-sm">
            Parent Communication & Health Records
          </span>
          <p className="text-slate-700 leading-relaxed">
            The school maintains individualized medical record cards for every enrolled child, cataloging allergies, chronic medical conditions, and emergency parent contact numbers. Parents are immediately contacted whenever clinical attention is required.
          </p>
        </div>

        {/* Action Prompt */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            For medical inquiries or health form submissions, contact our campus office.
          </span>
          <button
            onClick={openInquiry}
            className="px-5 py-2.5 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
          >
            Admissions Inquiry
          </button>
        </div>
      </div>
    </InternalPageLayout>
  );
};
