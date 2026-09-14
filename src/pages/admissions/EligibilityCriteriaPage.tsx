import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { Award, CheckCircle2, AlertTriangle, Calendar, Info, Users, Sparkles } from "lucide-react";

interface EligibilityCriteriaPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const EligibilityCriteriaPage: React.FC<EligibilityCriteriaPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const ageMatrix = [
    { grade: "Nursery", minAge: "3 Years Completed", cutoff: "Born on or before 1st June 2023", stage: "Foundational (Early Years)" },
    { grade: "Junior KG (LKG)", minAge: "4 Years Completed", cutoff: "Born on or before 1st June 2022", stage: "Foundational" },
    { grade: "Senior KG (UKG)", minAge: "5 Years Completed", cutoff: "Born on or before 1st June 2021", stage: "Foundational" },
    { grade: "Grade 1", minAge: "6 Years Completed (Mandatory NEP)", cutoff: "Born on or before 1st June 2020", stage: "Preparatory Stage" },
    { grade: "Grade 2", minAge: "7 Years Completed", cutoff: "Pass certificate of Grade 1", stage: "Preparatory Stage" },
    { grade: "Grade 3 – 5", minAge: "8 – 10 Years", cutoff: "Promoted from previous recognized grade", stage: "Preparatory Stage" },
    { grade: "Grade 6 – 8", minAge: "11 – 13 Years", cutoff: "Scholastic transcript & TC from recognized board", stage: "Middle Stage" },
    { grade: "Grade 9", minAge: "14 Years Completed", cutoff: "Clearance of Grade 8 + CBSE registration", stage: "Secondary Stage" },
    { grade: "Grade 10", minAge: "15 Years Completed", cutoff: "Transfer from recognized CBSE school with Board approval", stage: "Secondary Stage" },
  ];

  return (
    <InternalPageLayout
      title="Eligibility & Age Criteria"
      category="ADMISSIONS"
      activePageId="admissions-eligibility"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Admissions", pageId: "admissions" },
        { label: "Eligibility Criteria" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Admissions Standards
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Age Benchmarks & Admission Eligibility
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Lotus Global School adheres to the National Education Policy (NEP 2020) and Gujarat State Education Department norms regarding age criteria for school admissions. Age is calculated as of <strong>1st June</strong> of the academic year for which admission is sought.
        </p>

        {/* Age Criteria Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="bg-[#2F5187] text-white p-4 font-display font-bold text-sm uppercase tracking-wider flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#E87737]" />
              <span>Grade-Wise Age Eligibility Chart (Academic Year 2026 – 2027)</span>
            </div>
            <span className="text-[11px] text-slate-200 font-normal">Cutoff Reference: 1st June</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">Class / Grade</th>
                  <th className="p-3">Minimum Age Requirement</th>
                  <th className="p-3">Qualifying Criterion / Cutoff</th>
                  <th className="p-3">Curricular Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                {ageMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-[#2F5187]">{row.grade}</td>
                    <td className="p-3 font-semibold text-slate-800">{row.minAge}</td>
                    <td className="p-3 text-slate-600">{row.cutoff}</td>
                    <td className="p-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {row.stage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Guidelines Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm">
            <div className="flex items-center gap-2 text-[#2F5187] font-display font-bold text-sm mb-3">
              <Sparkles className="w-4 h-4 text-[#E87737]" />
              <span>Foundational Stage (Nursery & KG) Readiness</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              For early childhood admissions, there are no written entrance examinations or testing. Admissions are based on pleasant, friendly informal interactions with the child and parents to observe social-emotional comfort and developmental readiness.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Basic toilet independence and verbal expression</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Comfortable with brief parental separation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Curiosity to interact with play objects & peers</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-5 bg-white shadow-sm">
            <div className="flex items-center gap-2 text-[#2F5187] font-display font-bold text-sm mb-3">
              <Award className="w-4 h-4 text-[#E87737]" />
              <span>Grades 1 to 10 Academic Screening</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              For students seeking lateral entry into Grade 1 and above, a diagnostic assessment in English, Mathematics, and Hindi/Science is conducted to evaluate prerequisite foundational competencies and design personalized learning plans.
            </p>
            <div className="space-y-1.5 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Clearance and promotion from previous grade</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Submission of genuine School Leaving Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verification of CBSE registration for Grades 9 & 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="bg-[#1E375F] text-white p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-bold text-base text-white mb-1">
              Have questions about your child's age eligibility?
            </h4>
            <p className="text-xs text-slate-300">
              Speak directly with our admissions counselor to verify DOB eligibility and syllabus alignment.
            </p>
          </div>
          <button
            onClick={openInquiry}
            className="btn-portal-primary py-2.5 px-5 text-xs font-bold uppercase tracking-wider shrink-0"
          >
            Check Child's Eligibility
          </button>
        </div>
      </div>
    </InternalPageLayout>
  );
};
