import React from "react";
import { ArrowRight, Compass, ShieldCheck, Award, BookOpen, MapPin } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";

interface HeroProps {
  onExploreAcademics: () => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreAcademics, onOpenInquiry }) => {
  return (
    <section className="relative bg-[#1E375F] text-white border-b-4 border-[#E87737] overflow-hidden">
      {/* Background Architectural Canvas with Navy Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=2000&q=80"
          alt="Lotus Global School Campus Architecture"
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#142540] via-[#1E375F]/90 to-[#2F5187]/70" />
      </div>

      <div className="relative z-10 wrap py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl space-y-6">
          {/* Institutional Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-white">
            <span className="w-2 h-2 rounded-full bg-[#E87737]"></span>
            <span>{SCHOOL_INFO.affiliationStatus}</span>
            <span className="text-slate-400">·</span>
            <span>Nursery to Grade 10</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            A New Generation of Learning <br className="hidden sm:inline" />
            <span className="text-[#E87737]">Begins at Lotus Global School.</span>
          </h1>

          {/* Institutional Lead Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
            Rising in <strong>Vatar, Vapi</strong>, Lotus Global School bridges modern academic innovation with enduring moral values. Built on the conviction that learning should inspire rather than instruct.
          </p>

          {/* Motto Banner */}
          <div className="inline-flex items-center gap-2 py-1 px-3 rounded bg-[#2F5187]/80 border-l-4 border-[#E87737] text-xs sm:text-sm font-semibold text-slate-100">
            <span>Motto:</span>
            <span className="text-[#E87737] font-bold">Dedication</span>
            <span>·</span>
            <span className="text-white font-bold">Diligence</span>
            <span>·</span>
            <span className="text-[#F7A8D2] font-bold">Discipline</span>
          </div>

          {/* Institutional CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenInquiry}
              className="px-6 py-3 rounded bg-[#E87737] text-white font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#D26425] transition-all shadow-md flex items-center gap-2"
            >
              <span>Admissions Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreAcademics}
              className="px-6 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#E87737]" />
              <span>Explore Academics</span>
            </button>
          </div>

          {/* Institutional Highlights Micro-Strip */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/15 text-xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#E87737] shrink-0" />
              <div>
                <span className="font-bold text-white block">NCERT Framework</span>
                <span className="text-slate-300 text-[11px]">Proposed CBSE Standards</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#F7A8D2] shrink-0" />
              <div>
                <span className="font-bold text-white block">Active Discovery</span>
                <span className="text-slate-300 text-[11px]">Replacing passive learning</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#E87737] shrink-0" />
              <div>
                <span className="font-bold text-white block">Vatar, Vapi Campus</span>
                <span className="text-slate-300 text-[11px]">Near Vatar PHC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
