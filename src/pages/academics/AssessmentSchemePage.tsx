import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { ASSESSMENT_STRUCTURE } from "../../data/schoolData";
import { FileText, CheckCircle2, Award, ClipboardCheck, BarChart3 } from "lucide-react";

interface AssessmentSchemePageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const AssessmentSchemePage: React.FC<AssessmentSchemePageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const gradingScale = [
    { marksRange: "91% – 100%", grade: "A1", remark: "Outstanding Conceptual Mastery" },
    { marksRange: "81% – 90%", grade: "A2", remark: "Excellent Subject Competency" },
    { marksRange: "71% – 80%", grade: "B1", remark: "Very Good Understanding" },
    { marksRange: "61% – 70%", grade: "B2", remark: "Good Academic Progression" },
    { marksRange: "51% – 60%", grade: "C1", remark: "Fair Performance & Steady Growth" },
    { marksRange: "41% – 50%", grade: "C2", remark: "Satisfactory with Remedial Support" },
    { marksRange: "33% – 40%", grade: "D", remark: "Marginal; Requires Targeted Guidance" },
  ];

  return (
    <InternalPageLayout
      title="Assessment & Examination"
      category="ACADEMICS"
      activePageId="academics-assessment"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Academics", pageId: "academics" },
        { label: "Assessment Scheme" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Evaluation Architecture
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Scholastic & Co-Scholastic Assessment Scheme
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          In alignment with the CBSE continuous and comprehensive assessment philosophy, evaluation at Lotus Global School is designed to foster growth rather than induce anxiety. We assess cognitive conceptual depth alongside behavioral values, sportsmanship, and creative expression.
        </p>

        {/* Dual Tables for Scholastic & Co-Scholastic */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-200 rounded overflow-hidden shadow-sm bg-white">
            <div className="bg-[#2F5187] text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-[#E87737]" />
              <span>Scholastic Assessment Components</span>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-2.5">Milestone</th>
                  <th className="p-2.5">Weightage & Purpose</th>
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

          <div className="border border-slate-200 rounded overflow-hidden shadow-sm bg-white">
            <div className="bg-[#E87737] text-white p-3 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Co-Scholastic Domains</span>
            </div>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-2.5">Domain</th>
                  <th className="p-2.5">Parameters Evaluated</th>
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

        {/* CBSE 8-Point Grading Scale Table */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-lg text-[#2F5187] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#E87737]" />
            <span>Standardized 8-Point Grading Scale</span>
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
                {gradingScale.map((row, idx) => (
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
            Promotion to the subsequent grade is granted on the cumulative performance of both terms. A minimum of 75% attendance throughout the academic session is mandatory to be eligible for terminal evaluations.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Learn more about curriculum milestones or discuss your child's profile.
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
