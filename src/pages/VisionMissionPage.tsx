import React from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { VISION_MISSION_DATA } from "../data/schoolData";
import { Target, Compass, Sparkles, CheckCircle2, Shield, Heart } from "lucide-react";

interface VisionMissionPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const VisionMissionPage: React.FC<VisionMissionPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const { vision, mission, principles } = VISION_MISSION_DATA;

  return (
    <InternalPageLayout
      title="Mission & Vision"
      category="ABOUT US"
      activePageId="vision-mission"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[{ label: "Mission & Vision" }]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Our Guiding Philosophy
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Mission, Vision & Core Principles
          </h2>
        </div>

        {/* Foundational Golden Rule Callout Banner (Signature School Creed) */}
        <div className="bg-[#2F5187] text-white p-6 rounded border-l-4 border-[#E87737] shadow-sm space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#E87737] block">
            The Lotus Global School Principle
          </span>
          <blockquote className="font-serif italic text-base sm:text-lg text-white leading-relaxed">
            "{mission.goldenRule}"
          </blockquote>
          <p className="text-xs text-slate-300">
            A child's developmental pathway is unique. We honor individual learning styles by adapting instruction to suit the learner.
          </p>
        </div>

        {/* Vision Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Target className="w-5 h-5 text-[#E87737]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              {vision.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {vision.statement}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {vision.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded border border-slate-200 bg-[#F8FAFC] space-y-2"
              >
                <div className="w-7 h-7 rounded bg-[#FFF5EE] text-[#E87737] flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[#2F5187]">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Compass className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              {mission.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {mission.statement}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {mission.commitments.map((com, idx) => (
              <div
                key={idx}
                className="p-4 rounded border border-slate-200 bg-[#F8FAFC] space-y-2"
              >
                <div className="w-7 h-7 rounded bg-[#EEF3FA] text-[#2F5187] flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[#2F5187]">
                  {com.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {com.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Four Foundational Pillars */}
        <div className="pt-4 space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2">
            Institutional Principles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {principles.map((pr, idx) => (
              <div
                key={idx}
                className="p-4 rounded border border-slate-200 bg-white flex items-start gap-3 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E87737] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#E87737]">
                    {pr.badge}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#2F5187] mt-0.5">
                    {pr.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    {pr.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Prompt */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-medium">
            Learn more about our academic stages or register for upcoming sessions.
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
