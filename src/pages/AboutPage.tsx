import React from "react";
import { SCHOOL_INFO } from "../data/schoolData";
import { ShieldCheck, Compass, Target, Sparkles, Award } from "lucide-react";

interface AboutPageProps {
  openInquiry: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ openInquiry }) => {
  return (
    <div className="pt-28 pb-20 animate-fade-in bg-[#F8FAFC]">
      {/* Dedicated Page Hero */}
      <section className="bg-[#0B1B3D] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80"
            alt="Campus Architecture Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider">
              <span>Institutional Identity & Vision</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
              About Lotus Global School
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              An ambitious CBSE institution rising in Vatar, Vapi, designed to rethink modern education through active discovery and enduring values.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative & Philosophy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Core Creed */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                  Foundational Creed
                </span>
                <h2 className="font-display font-bold text-3xl text-[#0B1B3D] tracking-tight leading-tight">
                  "Learning Should Inspire Rather Than Instruct"
                </h2>
                <div className="w-16 h-1 bg-[#E86A2C] rounded-full"></div>
              </div>

              <div className="prose prose-slate max-w-none text-slate-700 space-y-5 text-sm sm:text-base leading-relaxed">
                <p className="font-medium text-[#0B1B3D]">
                  {SCHOOL_INFO.narrative.leadParagraph}
                </p>
                <p>
                  {SCHOOL_INFO.narrative.pedagogy}
                </p>
                <p>
                  {SCHOOL_INFO.narrative.outlook}
                </p>
                <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm border-l-4 border-l-[#E86A2C]">
                  <p className="text-base font-semibold text-[#0B1B3D] italic">
                    "{SCHOOL_INFO.narrative.closing}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Institutional Pillars */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <img src="/assets/logo.png" alt="Crest" className="h-12 w-auto object-contain" />
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                      Lotus Global School
                    </h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Vatar, Vapi, Gujarat
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#E86A2C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#0B1B3D]">Proposed CBSE Affiliation</h4>
                      <p className="text-xs text-slate-600 mt-0.5">Strict adherence to NCERT syllabus guidelines and structured assessment systems.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Compass className="w-5 h-5 text-[#0B1B3D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#0B1B3D]">Three Core Principles</h4>
                      <p className="text-xs text-slate-600 mt-0.5">Dedication to purpose, Diligence in study, and Discipline in character.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-[#E25B88] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase text-[#0B1B3D]">Integrated Curriculum</h4>
                      <p className="text-xs text-slate-600 mt-0.5">Holistic synthesis of STEM laboratories, music, physical agility, and computer sciences.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={openInquiry}
                    className="w-full py-3 px-4 bg-[#0B1B3D] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E86A2C] transition-colors text-center"
                  >
                    Connect with Admissions Desk
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0B1B3D] to-[#162B5E] text-white space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#E86A2C]">
                  Location & Community
                </div>
                <h4 className="font-display font-bold text-lg text-white">
                  Strategically Situated in Vatar, Vapi
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Located near Vatar PHC, our campus provides a focused, secure, and accessible learning sanctuary for families across the Vapi region seeking forward-thinking CBSE schooling.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
