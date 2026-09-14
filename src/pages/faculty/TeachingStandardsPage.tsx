import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { Award, CheckCircle2, BookOpen, Compass, ShieldCheck, Target, HeartHandshake } from "lucide-react";

interface TeachingStandardsPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const TeachingStandardsPage: React.FC<TeachingStandardsPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const standards = [
    {
      title: "Pedagogical Qualification & Certification",
      desc: "All teaching staff possess qualified degrees in education (B.Ed / D.El.Ed / Master's disciplines) and undergo rigorous subject competency evaluation prior to induction.",
    },
    {
      title: "Inquiry-Driven Instructional Design",
      desc: "Lesson plans replace rote memorization with interactive questioning, empirical demonstrations, multi-sensory materials, and formative diagnostic checking.",
    },
    {
      title: "Child-Centric Learning Strategies",
      desc: "Adhering to our core motto ('If a child cannot learn the way we teach him, we must teach him the way he can learn'), educators adapt pace and presentation to individual aptitudes.",
    },
    {
      title: "Ethical & Values-Based Mentoring",
      desc: "Teachers model Dedication, Diligence, and Discipline, cultivating integrity, emotional safety, mutual respect, and collaborative camaraderie in every classroom.",
    },
  ];

  return (
    <InternalPageLayout
      title="Teaching Standards"
      category="FACULTY"
      activePageId="faculty-standards"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Faculty", pageId: "faculty" },
        { label: "Teaching Standards" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Pedagogical Excellence
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Teaching Standards & Educational Delivery
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200 items-center">
          <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
              alt="Teaching Standards at Lotus Global School"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Educators as Facilitators of Curiosity
            </h3>
            <p className="leading-relaxed font-medium">
              At Lotus Global School, teaching is defined by active engagement rather than passive recitation.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our educators establish structured classroom routines where children are encouraged to question, verify hypotheses in laboratories, and express themselves without fear of failure.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#E87737]" />
            <span>Four Pillars of Classroom Instruction</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {standards.map((std, idx) => (
              <div
                key={idx}
                className="p-5 rounded border border-slate-200 bg-white space-y-2 shadow-sm hover:border-[#2F5187]/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E87737] shrink-0" />
                  <h4 className="font-bold text-xs sm:text-sm text-[#2F5187]">
                    {std.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded bg-[#FFF5EE] border-l-4 border-[#E87737] space-y-2 text-xs">
          <span className="font-bold text-[#2F5187] uppercase block text-sm">
            Continuous Lesson Review & Feedback Loops
          </span>
          <p className="text-slate-700 leading-relaxed">
            Faculty peer reviews, collaborative departmental planning meetings, and regular student feedback sessions ensure that high academic benchmarks are consistently achieved across all grades.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Learn more about joining our faculty or enrolling your child in Vatar, Vapi.
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
