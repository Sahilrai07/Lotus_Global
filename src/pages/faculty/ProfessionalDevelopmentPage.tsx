import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { TrendingUp, CheckCircle2, ShieldCheck, GraduationCap, Calendar, Sparkles } from "lucide-react";

interface ProfessionalDevelopmentPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const ProfessionalDevelopmentPage: React.FC<ProfessionalDevelopmentPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const workshops = [
    {
      domain: "NEP 2020 & Competency-Based Education",
      frequency: "Quarterly",
      focus: "Designing experiential learning modules and competency-aligned assessment questions.",
    },
    {
      domain: "Ed-Tech & Smart Lab Integration",
      frequency: "Bi-Monthly",
      focus: "Utilizing digital computing simulations, data-loggers, and multimedia visual aids in classrooms.",
    },
    {
      domain: "Child Psychology & Emotional Safety",
      frequency: "Annual Intensive",
      focus: "Recognizing individual learning wavelengths, behavioral counseling, and anti-bullying protocols.",
    },
    {
      domain: "CBSE Assessment & Remedial Strategies",
      frequency: "Semester-wise",
      focus: "Formative diagnostic rubric generation and structured remedial programs for diverse learners.",
    },
  ];

  return (
    <InternalPageLayout
      title="Professional Development"
      category="FACULTY"
      activePageId="faculty-development"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Faculty", pageId: "faculty" },
        { label: "Professional Development" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Continuous Faculty Growth
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Continuous Professional Development (CPD)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200 items-center">
          <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
              alt="Teacher Professional Training at Lotus Global School"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Committed to Lifelong Learning for Educators
            </h3>
            <p className="leading-relaxed font-medium">
              We firmly believe that inspired teachers inspire children. In alignment with CBSE guidelines and NEP 2020, each educator participates in a minimum of 50 hours of structured professional development every academic year.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Through expert seminars, interactive workshops, and pedagogical audits, our faculty stays ahead of global educational trends and emerging classroom technologies.
            </p>
          </div>
        </div>

        {/* Workshop Domains Table */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#E87737]" />
            <span>Structured Workshop Modules & Training Domains</span>
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3]">Training Domain</th>
                  <th className="p-3 border-r border-[#3d65a3]">Schedule</th>
                  <th className="p-3">Core Learning Outcomes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {workshops.map((ws, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC] hover:bg-slate-50"}
                  >
                    <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                      {ws.domain}
                    </td>
                    <td className="p-3 font-semibold text-[#E87737] border-r border-slate-200 whitespace-nowrap">
                      {ws.frequency}
                    </td>
                    <td className="p-3 text-slate-600">
                      {ws.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
