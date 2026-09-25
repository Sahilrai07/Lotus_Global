import React from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { ACADEMIC_STAGES, ASSESSMENT_STRUCTURE, SCHOOL_INFO } from "../data/schoolData";
import { BookOpen, Clock, Calendar, FileText, CheckCircle2, ShieldAlert } from "lucide-react";

import { getSiteData } from "../data/siteDataService";

interface AcademicsPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const siteData = getSiteData();
  const acad = siteData.academicsPage;
  const bannerImage = siteData.pageBanners?.academics || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80";

  return (
    <InternalPageLayout
      title={acad?.heading || "Academics & Pedagogy"}
      category="ACADEMICS"
      activePageId="academics"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[{ label: "Academics" }]}
    >
      <div className="space-y-10">
        {/* Section Heading */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            {acad?.subheading || "Academic Architecture"}
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            {acad?.heading || "Curriculum & Assessment Framework"}
          </h2>
        </div>

        {/* Lead Narrative */}
        <div className="p-5 rounded bg-[#F8FAFC] border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p className="font-semibold text-[#2F5187]">
            {acad?.leadParagraph || "Lotus Global School follows the National Curriculum Framework (NCERT) under its proposed CBSE affiliation from Nursery to Grade 10."}
          </p>
          <p>
            {acad?.subText || "Our academic delivery is designed around inquiry-driven pedagogy that transitions students from sensory discovery in early childhood to rigorous empirical analysis and board-examination readiness in senior years."}
          </p>
        </div>

        {/* 1. ACADEMIC STAGES - NATURALLY TABULAR (As requested in prompt) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <BookOpen className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Four-Stage Developmental Continuum
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3]">Developmental Stage</th>
                  <th className="p-3 border-r border-[#3d65a3]">Grade Levels</th>
                  <th className="p-3 border-r border-[#3d65a3]">Primary Focus</th>
                  <th className="p-3">Pedagogical Approach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {(siteData.academicStages || ACADEMIC_STAGES).map((stage, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC] hover:bg-slate-50"}
                  >
                    <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200 whitespace-nowrap">
                      {stage.phase}
                    </td>
                    <td className="p-3 font-semibold text-[#E87737] border-r border-slate-200 whitespace-nowrap">
                      {stage.levels}
                    </td>
                    <td className="p-3 font-medium text-slate-800 border-r border-slate-200">
                      {stage.focus}
                    </td>
                    <td className="p-3 text-slate-600 leading-relaxed">
                      {stage.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. ASSESSMENT & EVALUATION SCHEME */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <FileText className="w-5 h-5 text-[#E87737]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Continuous Comprehensive Assessment
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            In harmony with CBSE assessment guidelines, student evaluation is bifurcated into Scholastic and Co-Scholastic domains, monitoring conceptual mastery alongside character growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scholastic Table */}
            <div className="border border-slate-200 rounded overflow-hidden">
              <div className="bg-[#2F5187] text-white p-3 font-bold text-xs uppercase tracking-wider">
                Scholastic Assessment Components
              </div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="p-2.5">Component</th>
                    <th className="p-2.5">Purpose & Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  {ASSESSMENT_STRUCTURE.scholastic.components.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-[#2F5187]">{c.name}</td>
                      <td className="p-2.5">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Co-Scholastic Table */}
            <div className="border border-slate-200 rounded overflow-hidden">
              <div className="bg-[#E87737] text-white p-3 font-bold text-xs uppercase tracking-wider">
                Co-Scholastic Assessment Components
              </div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="p-2.5">Domain</th>
                    <th className="p-2.5">Evaluated Parameters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  {ASSESSMENT_STRUCTURE.coScholastic.components.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-[#2F5187]">{c.name}</td>
                      <td className="p-2.5">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. SCHOOL TIMINGS & DAILY ROUTINE (Tabular presentation) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Clock className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              School Timings & Operational Schedule
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1E375F] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#2F5187]">Section</th>
                  <th className="p-3 border-r border-[#2F5187]">Days</th>
                  <th className="p-3 border-r border-[#2F5187]">Arrival & Assembly</th>
                  <th className="p-3 border-r border-[#2F5187]">Departure</th>
                  <th className="p-3">Recess / Break</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                    Pre-Primary (Nursery, LKG, UKG)
                  </td>
                  <td className="p-3 border-r border-slate-200">Monday to Friday</td>
                  <td className="p-3 font-semibold border-r border-slate-200">08:45 AM</td>
                  <td className="p-3 font-semibold text-[#E87737] border-r border-slate-200">12:30 PM</td>
                  <td className="p-3 text-slate-600">10:15 AM – 10:45 AM</td>
                </tr>
                <tr className="bg-[#F8FAFC] hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                    Primary Section (Grade 1 to 5)
                  </td>
                  <td className="p-3 border-r border-slate-200">Monday to Saturday</td>
                  <td className="p-3 font-semibold border-r border-slate-200">07:50 AM</td>
                  <td className="p-3 font-semibold text-[#E87737] border-r border-slate-200">01:45 PM</td>
                  <td className="p-3 text-slate-600">10:30 AM – 11:00 AM</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                    Middle & Secondary (Grade 6 to 10)
                  </td>
                  <td className="p-3 border-r border-slate-200">Monday to Saturday</td>
                  <td className="p-3 font-semibold border-r border-slate-200">07:45 AM</td>
                  <td className="p-3 font-semibold text-[#E87737] border-r border-slate-200">02:15 PM</td>
                  <td className="p-3 text-slate-600">10:45 AM – 11:15 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            * 2nd and 4th Saturdays are observed as institutional holidays for co-curricular planning and staff development.
          </p>
        </div>

        {/* 4. CODE OF CONDUCT & EXPECTATIONS */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <CheckCircle2 className="w-5 h-5 text-[#E87737]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Student Code of Conduct & Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded space-y-2">
              <h4 className="font-bold text-xs uppercase text-[#2F5187]">
                Punctuality & Regularity
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Minimum 75% attendance is required to qualify for terminal examinations. Late arrivals require formal administrative clearance.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded space-y-2">
              <h4 className="font-bold text-xs uppercase text-[#2F5187]">
                Institutional Uniform
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students are expected to be impeccably turned out in the prescribed school uniform reflecting neatness and belonging.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded space-y-2">
              <h4 className="font-bold text-xs uppercase text-[#2F5187]">
                Campus Dignity & Care
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Respect for laboratory equipment, library volumes, sports gear, and peer collaboration anchors student citizenship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
