import React from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { ADMISSION_STEPS, REQUIRED_DOCUMENTS } from "../data/schoolData";
import { Compass, FileCheck, CheckCircle2, AlertCircle, ArrowRight, Phone, MessageSquare } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";

interface AdmissionsPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const ageEligibility = [
    { grade: "Nursery", minAge: "3 Years+", note: "As on 31st March of academic year" },
    { grade: "Junior KG (LKG)", minAge: "4 Years+", note: "Foundational stage orientation" },
    { grade: "Senior KG (UKG)", minAge: "5 Years+", note: "Early literacy & motor skill focus" },
    { grade: "Grade 1", minAge: "6 Years+", note: "Mandatory as per NEP 2020 framework" },
    { grade: "Grade 2 to 5", minAge: "Appropriate Age", note: "TC and previous grade marksheet mandatory" },
    { grade: "Grade 6 to 10", minAge: "Appropriate Age", note: "Diagnostic appraisal and TC required" },
  ];

  return (
    <InternalPageLayout
      title="Admissions Pathway"
      category="ADMISSIONS"
      activePageId="admissions"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[{ label: "Admissions" }]}
    >
      <div className="space-y-10">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Enrollment Guidance
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Admissions Process & Criteria
          </h2>
        </div>

        {/* Lead Narrative */}
        <div className="p-5 rounded bg-[#F8FAFC] border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p className="font-semibold text-[#2F5187]">
            Admissions are open for the upcoming academic session from Nursery to Grade 10 at our campus in Vatar, Vapi.
          </p>
          <p>
            Our admission process is transparent, student-centered, and designed to ensure mutual alignment between family aspirations and our institutional pedagogy.
          </p>
        </div>

        {/* 1. FOUR STEP ADMISSION PROCESS */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Compass className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Four-Step Admissions Pathway
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded border border-slate-200 bg-white shadow-sm flex flex-col justify-between hover:border-[#E87737] transition-all"
              >
                <div className="space-y-2">
                  <div className="text-2xl font-display font-extrabold text-[#E87737]">
                    {step.step}
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#2F5187]">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  {step.details}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MANDATORY DOCUMENT CHECKLIST */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <FileCheck className="w-5 h-5 text-[#E87737]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Required Document Checklist
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Please prepare self-attested photocopies alongside original documents for in-person administrative verification at our Vatar, Vapi campus:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REQUIRED_DOCUMENTS.map((doc, idx) => (
              <div
                key={idx}
                className="p-4 rounded border border-slate-200 bg-[#F8FAFC] flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#E87737] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-xs text-[#2F5187]">
                      {doc.name}
                    </h5>
                    {doc.required && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-1.5 py-0.2 rounded">
                        Mandatory
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {doc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. AGE ELIGIBILITY TABLE (Tabular) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Age Eligibility Guidelines (NEP Aligned)
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3]">Grade / Class</th>
                  <th className="p-3 border-r border-[#3d65a3]">Minimum Age Requirement</th>
                  <th className="p-3">Compliance & Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {ageEligibility.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC] hover:bg-slate-50"}
                  >
                    <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                      {row.grade}
                    </td>
                    <td className="p-3 font-semibold text-[#E87737] border-r border-slate-200">
                      {row.minAge}
                    </td>
                    <td className="p-3 text-slate-600">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. FAST TRACK ACTION DESK */}
        <div className="p-6 bg-[#2F5187] text-white rounded border border-[#1E375F] space-y-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87737]">
              Immediate Admissions Support
            </span>
            <h3 className="font-display font-bold text-xl text-white">
              Connect Directly with the Admissions Desk
            </h3>
            <p className="text-xs text-slate-300">
              Our counsellors are available on weekdays to guide you through seat availability, document submission, and fee inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={openInquiry}
              className="px-6 py-3 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow flex items-center gap-2"
            >
              <span>Fill Online Inquiry Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${SCHOOL_INFO.phone}`}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded border border-white/20 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E87737]" />
              <span>Call +91 {SCHOOL_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=Hello%20Lotus%20Global%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-emerald-600/80 hover:bg-emerald-600 text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inquiries</span>
            </a>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
