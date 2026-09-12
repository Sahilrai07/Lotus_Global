import React from "react";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";

interface HeroProps {
  onExploreAcademics: () => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreAcademics, onOpenInquiry }) => {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-[#071126] text-white">
      {/* Background Architectural Atmosphere with Restrained Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=2000&q=80"
          alt="Modern Educational Campus Architecture"
          className="w-full h-full object-cover object-center opacity-25 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071126] via-[#071126]/85 to-[#071126]/60" />
        
        {/* Subtle decorative geometry inspired by logo rays */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#E86A2C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#E25B88]/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl space-y-6">
          
          {/* Institution Micro-Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium tracking-wider uppercase text-slate-200 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E86A2C]"></span>
            <span>Nursery to Grade 10 · Vatar, Vapi</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1]">
            A New Generation of Learning <span className="text-[#E86A2C]">Begins Here.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
            Welcome to <strong>Lotus Global School</strong>, an ambitious CBSE institution rising in Vatar, Vapi, designed to rethink modern education. Built on the belief that learning should inspire rather than instruct.
          </p>

          {/* Restrained Dual CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenInquiry}
              className="px-6 py-3.5 rounded-lg bg-[#E86A2C] text-white font-semibold text-sm hover:bg-[#D25619] transition-all duration-200 shadow-lg shadow-[#E86A2C]/20 flex items-center gap-2 group"
            >
              <span>Enquire for Admissions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreAcademics}
              className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition-all duration-200 flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-slate-300" />
              <span>Explore Academics</span>
            </button>
          </div>

          {/* Institutional Trust Highlights */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#E86A2C] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-white uppercase tracking-wider">Proposed CBSE</div>
                <div className="text-xs text-slate-400">NCERT Curriculum Framework</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E25B88] mt-2 shrink-0"></div>
              <div>
                <div className="text-xs font-semibold text-white uppercase tracking-wider">Active Discovery</div>
                <div className="text-xs text-slate-400">Replacing passive instruction</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[#E86A2C] mt-2 shrink-0"></div>
              <div>
                <div className="text-xs font-semibold text-white uppercase tracking-wider">Modern Campus</div>
                <div className="text-xs text-slate-400">Labs, Sports & Creative Arts</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
