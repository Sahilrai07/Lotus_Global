import React from "react";
import { ACADEMIC_STAGES, ASSESSMENT_STRUCTURE, SCHOOL_INFO } from "../data/schoolData";
import { BookOpen, CheckCircle2, Award, Calendar, Layers } from "lucide-react";

interface AcademicsPageProps {
  openInquiry: () => void;
}

export const AcademicsPage: React.FC<AcademicsPageProps> = ({ openInquiry }) => {
  return (
    <div className="pt-28 pb-20 animate-fade-in bg-[#F8FAFC]">
      {/* Page Hero */}
      <section className="bg-[#0B1B3D] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider">
              <span>Curriculum & Methodology</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
              Academic Framework
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Proposed CBSE institution following the NCERT syllabus from Nursery to Grade 10. Designed to replace passive learning with active discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Overview Highlights */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
          
          {/* Institutional Curriculum Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E86A2C] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0B1B3D]">
                NCERT Curriculum
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured in accordance with NCERT national benchmarks, cultivating strong foundational literacy, scientific rigor, and mathematical reasoning.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B1B3D] flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0B1B3D]">
                Nursery to Grade 10
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A seamless academic trajectory starting from early sensory and motor development up to board examination readiness and conceptual mastery.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E25B88] flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-xl text-[#0B1B3D]">
                Active Discovery
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Empowering students to hypothesize, experiment, and conclude independently through hands-on laboratory sessions and interactive classrooms.
              </p>
            </div>
          </div>

          {/* 4-Stage Progressive Curriculum */}
          <div className="space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                Developmental Continuum
              </span>
              <h2 className="font-display font-bold text-3xl text-[#0B1B3D] tracking-tight mt-1">
                The Four Progressive Stages
              </h2>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Pedagogy tuned precisely to the neurological and cognitive milestones of growing children.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ACADEMIC_STAGES.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-600 uppercase">
                      Stage 0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#E86A2C]">
                      {stage.levels}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#0B1B3D]">
                    {stage.phase}
                  </h3>

                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Key Focus: {stage.focus}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment Structure (Scholastic + Co-Scholastic) */}
          <div className="space-y-8 pt-8 border-t border-slate-200">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                Institutional Evaluation
              </span>
              <h2 className="font-display font-bold text-3xl text-[#0B1B3D] tracking-tight mt-1">
                Scholastic & Co-Scholastic Assessment
              </h2>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                A balanced evaluation framework designed to track both academic proficiency and character development.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Scholastic */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B1B3D] flex items-center justify-center font-bold">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#0B1B3D]">
                      {ASSESSMENT_STRUCTURE.scholastic.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Curricular and subject-competency appraisal
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {ASSESSMENT_STRUCTURE.scholastic.summary}
                </p>

                <div className="space-y-3">
                  {ASSESSMENT_STRUCTURE.scholastic.components.map((comp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-[#0B1B3D]">{comp.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{comp.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Co-Scholastic */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-pink-50 text-[#E25B88] flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#0B1B3D]">
                      {ASSESSMENT_STRUCTURE.coScholastic.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Holistic personal, moral & physical growth
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {ASSESSMENT_STRUCTURE.coScholastic.summary}
                </p>

                <div className="space-y-3">
                  {ASSESSMENT_STRUCTURE.coScholastic.components.map((comp, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-[#0B1B3D]">{comp.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{comp.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Academic Inquiry CTA */}
          <div className="p-8 sm:p-12 rounded-2xl bg-[#0B1B3D] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="font-display font-bold text-2xl text-white">
                Learn More About Our Grade-Wise Syllabus
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Connect with our academic coordination desk for curriculum inquiries and academic calendar overviews.
              </p>
            </div>
            <button
              onClick={openInquiry}
              className="px-6 py-3 rounded-lg bg-[#E86A2C] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#D25619] transition-colors shrink-0"
            >
              Academic Inquiry
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};
