import React from "react";
import { VISION_MISSION_DATA, SCHOOL_INFO } from "../data/schoolData";
import {
  Compass,
  Target,
  Sparkles,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Smile,
  Users,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Quote,
} from "lucide-react";

interface VisionMissionPageProps {
  openInquiry: () => void;
}

export const VisionMissionPage: React.FC<VisionMissionPageProps> = ({ openInquiry }) => {
  const { vision, mission, principles } = VISION_MISSION_DATA;

  return (
    <div className="pt-28 pb-20 animate-fade-in bg-[#F8FAFC]">
      {/* Page Hero */}
      <section className="bg-[#0B1B3D] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#E86A2C] blur-3xl" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-[#E25B88] blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider backdrop-blur-sm border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#E86A2C]" />
              <span>Foundational Directives & Philosophy</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
              Vision & Mission
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Empowering today’s children to become tomorrow’s innovators and leaders through adaptive teaching, joyful discovery, and unconditional care in Vatar, Vapi.
            </p>
          </div>
        </div>
      </section>

      {/* Core Dual Spotlight: Vision & Mission Cards */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          {/* Main Dual Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            
            {/* VISION CARD */}
            <div className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-8 sm:p-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0B1B3D] to-[#E86A2C]" />
              
              <div className="space-y-6">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-50 text-[#E86A2C] text-xs font-bold uppercase tracking-wider border border-orange-100">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Our Vision</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    Future-Oriented
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1B3D] tracking-tight">
                    {vision.subtitle}
                  </h2>
                  <div className="w-12 h-1 bg-[#E86A2C] rounded-full" />
                </div>

                {/* Primary Vision Statement Quote */}
                <div className="relative p-6 rounded-xl bg-slate-50/80 border border-slate-200/70">
                  <Quote className="w-8 h-8 text-[#E86A2C]/20 absolute top-3 right-4" />
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    "{vision.statement}"
                  </p>
                </div>

                {/* Strategic Vision Pillars */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Key Vision Pillars
                  </span>
                  <div className="space-y-3">
                    {vision.pillars.map((pillar, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white border border-slate-100 hover:border-slate-200 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-md bg-[#0B1B3D] text-[#E86A2C] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          0{idx + 1}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#0B1B3D]">
                            {pillar.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Inspiring Lifelong Curiosity</span>
                <span className="font-semibold text-[#0B1B3D]">Nursery to Grade 10</span>
              </div>
            </div>

            {/* MISSION CARD */}
            <div className="flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow p-8 sm:p-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E86A2C] to-[#E25B88]" />
              
              <div className="space-y-6">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#0B1B3D] text-xs font-bold uppercase tracking-wider border border-blue-100">
                    <Target className="w-3.5 h-3.5 text-[#E86A2C]" />
                    <span>Our Mission</span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                    Action-Driven
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1B3D] tracking-tight">
                    {mission.subtitle}
                  </h2>
                  <div className="w-12 h-1 bg-[#0B1B3D] rounded-full" />
                </div>

                {/* Primary Mission Statement Quote */}
                <div className="relative p-6 rounded-xl bg-slate-50/80 border border-slate-200/70">
                  <Quote className="w-8 h-8 text-[#0B1B3D]/15 absolute top-3 right-4" />
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                    "{mission.statement}"
                  </p>
                </div>

                {/* The Golden Pedagogical Law Callout */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-[#0B1B3D] to-[#162B5E] text-white space-y-2 shadow-sm border border-slate-800">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#E86A2C]">
                    <Lightbulb className="w-4 h-4 text-[#E86A2C]" />
                    <span>Our Core Pedagogical Belief</span>
                  </div>
                  <p className="text-sm sm:text-base font-semibold leading-snug italic text-slate-100">
                    "{mission.goldenRule}"
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Every child learns differently; great educators transform their teaching to unlock each child's potential.
                  </p>
                </div>

                {/* Mission Commitments */}
                <div className="space-y-3 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Core Commitments to Every Child
                  </span>
                  <div className="space-y-3">
                    {mission.commitments.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white border border-slate-100 hover:border-slate-200 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-md bg-orange-100 text-[#E86A2C] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-[#0B1B3D]">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Child-Centered Educational Model</span>
                <span className="font-semibold text-[#E86A2C]">NCERT Framework</span>
              </div>
            </div>

          </div>

          {/* Translating Vision & Mission into Daily School Life */}
          <div className="space-y-8 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                Living Our Purpose
              </span>
              <h3 className="font-display font-bold text-3xl text-[#0B1B3D]">
                How We Bring Our Vision & Mission to Life
              </h3>
              <p className="text-sm text-slate-600">
                A vision is only as powerful as the everyday reality inside the classrooms, science laboratories, playgrounds, and arts studios.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all">
                <div className="w-10 h-10 rounded-lg bg-orange-50 text-[#E86A2C] flex items-center justify-center">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#0B1B3D]">
                  Tomorrow's Innovators
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Early exposure to Physics, Chemistry, Biology, and Computer Science laboratories, encouraging empirical thinking and coding logic.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#0B1B3D] flex items-center justify-center">
                  <Smile className="w-5 h-5 text-[#0B1B3D]" />
                </div>
                <h4 className="font-display font-bold text-base text-[#0B1B3D]">
                  Fun & Joyful Learning
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Classrooms designed to spark excitement through cooperative games, performing arts, musical expression, and athletic teamwork.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#0B1B3D]">
                  Safe & Nurturing Campus
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  24/7 CCTV surveillance, on-campus health infirmary, child-safe infrastructure, and proactive emotional support systems.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all">
                <div className="w-10 h-10 rounded-lg bg-pink-50 text-[#E25B88] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-display font-bold text-base text-[#0B1B3D]">
                  Community Relationships
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Continuous, open dialogue with parents through conferences, progress reviews, and collaborative school events in Vatar, Vapi.
                </p>
              </div>
            </div>
          </div>

          {/* Alignment with School Motto: Dedication, Diligence, Discipline */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-[#0B1B3D] to-[#11234F] text-white border border-slate-800 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E86A2C]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Institutional Motto</span>
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  Dedication · Diligence · Discipline
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Our motto operates as the moral and behavioral bedrock that guides our vision and mission every single day.
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E86A2C]">
                    Dedication
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unwavering commitment to community, ethical character, and child empowerment.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E86A2C]">
                    Diligence
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Rigorous inquiry, sustained effort, and perseverance across every academic milestone.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#E86A2C]">
                    Discipline
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Internal focus, consistency of action, and deep mutual respect for peers and mentors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive CTA Banner */}
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                Partner With Us
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1B3D]">
                Experience Our Mission in Action
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Admissions are open for Nursery through Grade 10 for the upcoming academic session. Connect with our admissions counselors or schedule a campus visit.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={openInquiry}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#0B1B3D] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E86A2C] transition-colors shadow-sm shadow-[#0B1B3D]/10 flex items-center justify-center gap-2"
              >
                <span>Enquire for Admissions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`tel:${SCHOOL_INFO.phone}`}
                className="w-full sm:w-auto px-5 py-3.5 border border-slate-200 text-[#0B1B3D] text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-colors text-center"
              >
                Call: {SCHOOL_INFO.phone}
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
