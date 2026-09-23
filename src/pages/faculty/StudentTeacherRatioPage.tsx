import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { HeartHandshake, CheckCircle2, Users, Target, ShieldCheck, Sparkles } from "lucide-react";

interface StudentTeacherRatioPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const StudentTeacherRatioPage: React.FC<StudentTeacherRatioPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const ratioBreakdown = [
    {
      stage: "Foundational (Nursery, LKG, UKG)",
      ratio: "1 : 15",
      support: "Lead Educator + Full-Time Classroom Care Attendant",
      focus: "Close sensory monitoring, language acquisition, and individualized care.",
    },
    {
      stage: "Preparatory (Grade 1 to 3)",
      ratio: "1 : 20",
      support: "Class Teacher + Dedicated Subject Instructors",
      focus: "Foundational literacy, numeracy diagnostics, and activity-based learning.",
    },
    {
      stage: "Middle Stage (Grade 4 to 7)",
      ratio: "1 : 25",
      support: "Specialized Subject Faculty + Laboratory Demonstrators",
      focus: "In-depth conceptual feedback, lab supervision, and project mentoring.",
    },
    {
      stage: "Secondary Stage (Grade 8 to 10)",
      ratio: "1 : 25",
      support: "Senior CBSE Educators + Career & Academic Mentors",
      focus: "Board examination preparation, doubt resolution, and analytical rigor.",
    },
  ];

  return (
    <InternalPageLayout
      title="Student-Teacher Ratio"
      category="FACULTY"
      activePageId="faculty-ratio"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Faculty", pageId: "faculty" },
        { label: "Student-Teacher Ratio" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Personalized Academic Care
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Low Student-Teacher Ratio & Individual Mentoring
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200 items-center">
          <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
              alt="Individual Attention in Classroom"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Every Child Deserves to be Seen and Mentored
            </h3>
            <p className="leading-relaxed font-medium">
              Overcrowded classrooms dilute learning. At Lotus Global School, our intentional commitment to maintaining a low student-teacher ratio ensures that no child is lost in the crowd.
            </p>
            <p className="text-slate-600 leading-relaxed">
              With capped batch sizes across all developmental stages, teachers observe subtle cognitive cues, provide on-the-spot remediation, and maintain transparent, regular communication with parents.
            </p>
          </div>
        </div>

        {/* Ratio Breakdown Table */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#E87737]" />
            <span>Classroom Ratio Structure by Developmental Stage</span>
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3]">Developmental Stage</th>
                  <th className="p-3 border-r border-[#3d65a3]">Teacher-Student Ratio</th>
                  <th className="p-3 border-r border-[#3d65a3]">Classroom Staffing</th>
                  <th className="p-3">Mentorship Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {ratioBreakdown.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC] hover:bg-slate-50"}
                  >
                    <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                      {row.stage}
                    </td>
                    <td className="p-3 font-bold text-[#E87737] border-r border-slate-200 whitespace-nowrap">
                      {row.ratio}
                    </td>
                    <td className="p-3 text-slate-700 font-medium border-r border-slate-200">
                      {row.support}
                    </td>
                    <td className="p-3 text-slate-600">
                      {row.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded space-y-2 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-[#E87737]" />
            <h4 className="font-bold text-xs uppercase text-[#2F5187]">
              Early Gap Remediation
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conceptual hurdles are detected and resolved immediately during daily classroom activities rather than waiting for term exams.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded space-y-2 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-[#2F5187]" />
            <h4 className="font-bold text-xs uppercase text-[#2F5187]">
              Active Participation
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Smaller batches ensure every student participates actively in classroom discussions, board presentations, and lab experiments.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded space-y-2 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-[#E25B88]" />
            <h4 className="font-bold text-xs uppercase text-[#2F5187]">
              Emotional Safety
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Teachers build warm, trusting bonds with students, nurturing personal confidence, moral clarity, and peer collaboration.
            </p>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
