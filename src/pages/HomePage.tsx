import React from "react";
import { Hero } from "../components/Hero";
import { MottoCards } from "../components/MottoCards";
import { FacilityExplorer } from "../components/FacilityExplorer";
import { SCHOOL_INFO, ACADEMIC_STAGES, ADMISSION_STEPS } from "../data/schoolData";
import { ArrowRight, BookOpen, Sparkles, ShieldCheck, CheckCircle2, ChevronRight, Compass } from "lucide-react";

interface HomePageProps {
  setActivePage: (page: string) => void;
  openInquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage, openInquiry }) => {
  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="animate-fade-in">
      {/* WOW Moment #1: Cinematic Hero */}
      <Hero
        onExploreAcademics={() => navigateTo("academics")}
        onOpenInquiry={openInquiry}
      />

      {/* WOW Moment #2: The Three Pillars */}
      <MottoCards />

      {/* About The School: Editorial Snapshot */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Institutional Vision</span>
              </div>
              
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1B3D] tracking-tight leading-snug">
                Replacing Passive Instruction with Active Discovery
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {SCHOOL_INFO.narrative.leadParagraph}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo("about")}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1B3D] hover:text-[#E86A2C] transition-colors group"
                >
                  <span>Read our complete philosophy</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0B1B3D] flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                  Immersive Discovery
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Through immersive STEM programs, experiential arts, tech-enabled smart classrooms, and dynamic sports infrastructure, we create an ecosystem where curiosity drives excellence.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-[#E86A2C] flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                  Global Perspectives
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our forward-thinking curriculum fosters critical inquiry, emotional intelligence, and global perspectives, ensuring every student acquires the agility and resilience needed in a shifting world.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#E25B88] flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                  Innovation Meets Purpose
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Here, innovation meets purpose—empowering young minds to explore limitlessly and lead with impact across academics and moral integrity.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#0B1B3D] text-white border border-[#0B1B3D] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#E86A2C] font-semibold mb-2">
                    Academic Scope
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    Nursery to Grade 10
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A seamless developmental continuum from early sensory exploration to high-school analytical rigor.
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => navigateTo("academics")}
                    className="text-xs font-semibold text-[#E86A2C] hover:text-white transition-colors flex items-center gap-1"
                  >
                    Curriculum Framework <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Academic Continuum Section */}
      <section className="py-24 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E86A2C] mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Structured Progression</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1B3D] tracking-tight">
              A Four-Stage Pedagogical Journey
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Following the NCERT curriculum, our academic structure prepares students for scholastic depth and co-scholastic character development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACADEMIC_STAGES.map((stage, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#F8FAFC] border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold font-mono text-[#E86A2C] mb-2">
                    Stage 0{idx + 1}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#0B1B3D] mb-1">
                    {stage.phase}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mb-3">
                    {stage.levels}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {stage.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200 text-[11px] font-semibold text-slate-700">
                  {stage.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WOW Moment #3: Interactive Campus Facilities */}
      <FacilityExplorer />

      {/* Admissions Pathway Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E86A2C] mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Admissions Guidance</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1B3D] tracking-tight">
                Your Child's Admissions Pathway
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                A structured, transparent four-step admission process designed to ensure mutual alignment and student readiness.
              </p>
            </div>

            <button
              onClick={() => navigateTo("admissions")}
              className="px-5 py-2.5 rounded-lg border border-[#0B1B3D] text-[#0B1B3D] text-xs font-bold uppercase tracking-wider hover:bg-[#0B1B3D] hover:text-white transition-all w-fit"
            >
              View Document Checklist
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMISSION_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative p-6 rounded-xl bg-[#F8FAFC] border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-display font-extrabold text-[#E86A2C] mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-base text-[#0B1B3D] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.summary}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                  Step {step.step} of 04
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Inquiry Callout (Calm, Prestigious, Restrained) */}
      <section className="py-20 bg-[#0B1B3D] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider">
            <span>Lotus Global School · Vatar, Vapi</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Preparing Minds for the Future
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Connect with our admissions desk to learn more about our proposed CBSE framework, campus facilities, and the upcoming registration process.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openInquiry}
              className="px-6 py-3 rounded-lg bg-[#E86A2C] text-white font-semibold text-sm hover:bg-[#D25619] transition-colors shadow-lg shadow-[#E86A2C]/20"
            >
              Enquire for Admissions
            </button>
            <button
              onClick={() => navigateTo("contact")}
              className="px-6 py-3 rounded-lg bg-white/10 text-white font-semibold text-sm hover:bg-white/15 border border-white/20 transition-colors"
            >
              Contact Campus Office
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
