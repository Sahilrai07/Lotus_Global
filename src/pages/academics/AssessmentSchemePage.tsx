import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { getSiteData } from "../../data/siteDataService";
import { Award, ClipboardCheck, BarChart3 } from "lucide-react";

interface AssessmentSchemePageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const AssessmentSchemePage: React.FC<AssessmentSchemePageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const siteData = getSiteData();
  const scheme = siteData.assessmentScheme;
  const bannerImage = siteData.pageBanners?.academics || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80";

  return (
    <InternalPageLayout
      title={scheme?.heading || "Assessment & Examination"}
      category="ACADEMICS"
      activePageId="academics-assessment"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[
        { label: "Academics", pageId: "academics" },
        { label: "Assessment Scheme" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            {scheme?.subheading || "Evaluation Architecture"}
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            {scheme?.heading || "Scholastic & Co-Scholastic Assessment Scheme"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {scheme?.leadText || "In alignment with the CBSE continuous and comprehensive assessment philosophy, evaluation at Lotus Global School is designed to foster growth rather than induce anxiety."}
        </p>

        {/* Dual Tables for Scholastic & Co-Scholastic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded overflow-hidden shadow-sm bg-white">
            <div className="bg-[#2F5187] text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-[#E87737]" />
              <span>{scheme?.scholastic?.title || "Scholastic Assessment Components"}</span>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-2.5">Milestone</th>
                  <th className="p-2.5">Weightage & Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                {(scheme?.scholastic?.components || []).map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-[#2F5187]">{c.name}</td>
                    <td className="p-2.5">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-slate-200 rounded overflow-hidden shadow-sm bg-white">
            <div className="bg-[#E87737] text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>{scheme?.coScholastic?.title || "Co-Scholastic Domains"}</span>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-2.5">Domain</th>
                  <th className="p-2.5">Parameters Evaluated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                {(scheme?.coScholastic?.components || []).map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-[#2F5187]">{c.name}</td>
                    <td className="p-2.5">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Standardized Grading Scale Table */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-lg text-[#2F5187] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#E87737]" />
            <span>Standardized Grading Scale</span>
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#1E375F] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-2.5 border-r border-[#2F5187]">Marks Range</th>
                  <th className="p-2.5 border-r border-[#2F5187]">Grade</th>
                  <th className="p-2.5">Qualitative Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {(scheme?.gradingScale || []).map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
                    <td className="p-2.5 font-semibold text-[#2F5187] border-r border-slate-200">
                      {row.marksRange}
                    </td>
                    <td className="p-2.5 font-bold text-[#E87737] border-r border-slate-200">
                      {row.grade}
                    </td>
                    <td className="p-2.5 text-slate-600">
                      {row.remark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Promotion & Attendance Rules */}
        <div className="p-5 rounded bg-[#FFF5EE] border-l-4 border-[#E87737] space-y-1.5 text-xs text-slate-700">
          <span className="font-bold text-[#2F5187] uppercase block text-sm">
            Promotion Criteria & Attendance Policy
          </span>
          <p>
            Promotion to the subsequent grade requires a minimum qualifying grade in all scholastic disciplines along with minimum 75% attendance across the academic term in accordance with CBSE affiliation norms.
          </p>
        </div>
      </div>
    </InternalPageLayout>
  );
};
