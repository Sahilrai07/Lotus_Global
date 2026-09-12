import React, { useState } from "react";
import { Sparkles, Compass, Shield, ArrowRight } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";

export const MottoCards: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const pillars = [
    {
      id: "dedication",
      number: "01",
      title: SCHOOL_INFO.mottoValues.dedication.title,
      short: SCHOOL_INFO.mottoValues.dedication.short,
      full: SCHOOL_INFO.mottoValues.dedication.full,
      icon: Compass,
      accent: "border-l-4 border-l-[#E86A2C]",
      badgeColor: "bg-orange-50 text-[#E86A2C] border-orange-200/60",
    },
    {
      id: "diligence",
      number: "02",
      title: SCHOOL_INFO.mottoValues.diligence.title,
      short: SCHOOL_INFO.mottoValues.diligence.short,
      full: SCHOOL_INFO.mottoValues.diligence.full,
      icon: Sparkles,
      accent: "border-l-4 border-l-[#0B1B3D]",
      badgeColor: "bg-blue-50 text-[#0B1B3D] border-blue-200/60",
    },
    {
      id: "discipline",
      number: "03",
      title: SCHOOL_INFO.mottoValues.discipline.title,
      short: SCHOOL_INFO.mottoValues.discipline.short,
      full: SCHOOL_INFO.mottoValues.discipline.full,
      icon: Shield,
      accent: "border-l-4 border-l-[#E25B88]",
      badgeColor: "bg-pink-50 text-[#E25B88] border-pink-200/60",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E86A2C] mb-2">
            <span>Institutional DNA</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1B3D] tracking-tight">
            The Three Pillars of Excellence
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Derived directly from the Lotus Global School crest, our motto forms the ethical and academic foundation guiding every student's journey.
          </p>
        </div>

        {/* The 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isHovered = activeCard === pillar.id;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActiveCard(pillar.id)}
                onMouseLeave={() => setActiveCard(null)}
                onClick={() => setActiveCard(activeCard === pillar.id ? null : pillar.id)}
                className={`relative rounded-xl p-8 bg-[#F8FAFC] border border-slate-200/80 transition-all duration-300 cursor-pointer overflow-hidden group ${
                  pillar.accent
                } ${
                  isHovered
                    ? "bg-white shadow-xl shadow-slate-900/5 -translate-y-1.5 border-slate-300"
                    : "hover:border-slate-300"
                }`}
              >
                {/* Top Row: Number + Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold font-mono tracking-wider text-slate-400">
                    {pillar.number}
                  </span>
                  <div className={`p-2.5 rounded-lg border ${pillar.badgeColor} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="font-display font-bold text-2xl text-[#0B1B3D] tracking-tight mb-2 group-hover:text-[#E86A2C] transition-colors">
                  {pillar.title}
                </h3>

                {/* Subtitle / Focus */}
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                  {pillar.short}
                </div>

                {/* Educational Philosophy (Expands smoothly) */}
                <p className="text-sm text-slate-600 leading-relaxed transition-all duration-300">
                  {pillar.full}
                </p>

                {/* Subtle Interactive Prompt */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-[#0B1B3D] transition-colors">
                  <span className="uppercase tracking-wider">Core Principle</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-[#E86A2C]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
