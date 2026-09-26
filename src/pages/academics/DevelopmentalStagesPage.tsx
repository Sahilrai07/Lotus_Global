import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { ACADEMIC_STAGES } from "../../data/schoolData";
import { BookOpen, CheckCircle2, Award, Sparkles, Layers, GraduationCap } from "lucide-react";

import { getSiteData } from "../../data/siteDataService";

interface DevelopmentalStagesPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const DevelopmentalStagesPage: React.FC<DevelopmentalStagesPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const bannerImage = getSiteData().pageBanners?.academics || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80";

  return (
    <InternalPageLayout
      title="Developmental Stages"
      category="ACADEMICS"
      activePageId="academics-stages"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[
        { label: "Academics", pageId: "academics" },
        { label: "Developmental Stages" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            NEP 2020 Pedagogical Framework
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            New Academic Structure (5+3+3+4)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            New pedagogical and curricular structure of school education (5+3+3+4): 3 years in Anganwadi/pre-school and 12 years in school
          </p>
        </div>

        {/* VISUAL DIAGRAM CARD: REPRODUCING THE CLIENT'S IMAGE */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-5 sm:p-7 shadow-sm">
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-10">
            {/* Left Graphic: 4 Stacked Stage Blocks */}
            <div className="w-full lg:w-[320px] shrink-0 flex flex-col justify-between">
              <div className="border-2 border-[#2F5187] rounded-md px-3 py-1.5 text-center mb-4 bg-white shadow-xs">
                <span className="font-bold text-sm sm:text-base text-[#2F5187] tracking-tight">
                  New Academic Structure
                </span>
              </div>

              <div className="relative pl-0 sm:pl-2 flex flex-col space-y-2">
                {/* 1. Secondary Block (Yellow/Gold) */}
                <div className="relative flex items-stretch">
                  <div className="flex-1 bg-[#FACC15] text-slate-950 rounded-lg p-3.5 shadow-md border-b-4 border-amber-500 text-center flex flex-col justify-center">
                    <span className="font-extrabold text-sm sm:text-base block">4 Years</span>
                    <span className="text-[11px] sm:text-xs font-semibold block text-slate-900">(Class 9 to 12)</span>
                    <span className="text-[10px] sm:text-[11px] font-medium block text-slate-800">(Age 14-18)</span>
                  </div>
                  <div className="w-10 sm:w-12 ml-2 flex items-center justify-center border-l-2 border-slate-700">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 [writing-mode:vertical-rl] rotate-180 py-1">
                      Secondary
                    </span>
                  </div>
                </div>

                {/* 2. Middle Block (Dark Slate/Charcoal) */}
                <div className="relative flex items-stretch">
                  <div className="flex-1 bg-slate-900 text-white rounded-lg p-3 shadow-md border-b-4 border-slate-950 text-center flex flex-col justify-center">
                    <span className="font-extrabold text-sm sm:text-base block text-amber-400">3 Years</span>
                    <span className="text-[11px] sm:text-xs font-semibold block text-slate-200">(Class 6 to 8)</span>
                    <span className="text-[10px] sm:text-[11px] font-medium block text-slate-400">(Age 11-14)</span>
                  </div>
                  <div className="w-10 sm:w-12 ml-2 flex items-center justify-center border-l-2 border-slate-700">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 [writing-mode:vertical-rl] rotate-180 py-1">
                      Middle
                    </span>
                  </div>
                </div>

                {/* 3. Preparatory Block (Green) */}
                <div className="relative flex items-stretch">
                  <div className="flex-1 bg-[#22C55E] text-white rounded-lg p-3 shadow-md border-b-4 border-emerald-700 text-center flex flex-col justify-center">
                    <span className="font-extrabold text-sm sm:text-base block">3 Years</span>
                    <span className="text-[11px] sm:text-xs font-semibold block text-emerald-50">(Class 3 to 5)</span>
                    <span className="text-[10px] sm:text-[11px] font-medium block text-emerald-100">(Age 8-11)</span>
                  </div>
                  <div className="w-10 sm:w-12 ml-2 flex items-center justify-center border-l-2 border-slate-700">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 [writing-mode:vertical-rl] rotate-180 py-1">
                      Preparatory
                    </span>
                  </div>
                </div>

                {/* 4. Foundational Block (Sky Blue - Split 2 + 3) */}
                <div className="relative flex items-stretch">
                  <div className="flex-1 bg-[#38BDF8] text-slate-950 rounded-lg p-2.5 shadow-md border-b-4 border-sky-600 text-center flex flex-col justify-center space-y-1">
                    <div className="pb-1">
                      <span className="font-extrabold text-xs sm:text-sm block text-slate-950">2 years</span>
                      <span className="text-[10px] sm:text-[11px] font-semibold block text-slate-900">(Class 1 & 2) (Ages 6-8)</span>
                    </div>
                    <div className="border-t-2 border-dashed border-sky-600/70 pt-1">
                      <span className="font-extrabold text-xs sm:text-sm block text-slate-950">3 years</span>
                      <span className="text-[10px] sm:text-[11px] font-semibold block text-slate-900 leading-tight">
                        (Anganwadi / pre-school / Balvatika)
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-medium block text-slate-800">(Ages 3-6)</span>
                    </div>
                  </div>
                  <div className="w-10 sm:w-12 ml-2 flex items-center justify-center border-l-2 border-slate-700">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 [writing-mode:vertical-rl] rotate-180 py-1">
                      Foundational
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Curricular Explanations Matching the Image */}
            <div className="flex-1 flex flex-col justify-center space-y-5">
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#2F5187] leading-snug">
                  New pedagogical and curricular structure of school education (5+3+3+4):
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
                  3 years in Anganwadi / pre-school and 12 years in school
                </p>
              </div>

              <div className="space-y-4">
                {/* Secondary Bullet */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/60 border border-amber-200">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FACC15] border border-amber-500 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong className="text-amber-900 font-bold">Secondary Stage (4):</strong> multidisciplinary study, greater critical thinking, flexibility and student choice of subjects.
                  </div>
                </div>

                {/* Middle Bullet */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-100/70 border border-slate-300">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-900 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong className="text-slate-950 font-bold">Middle Stage (3):</strong> experiential learning in the sciences, mathematics, arts, social sciences, and humanities.
                  </div>
                </div>

                {/* Preparatory Bullet */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#22C55E] border border-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong className="text-emerald-900 font-bold">Preparatory Stage (3):</strong> play, discovery, and activity-based and interactive classroom learning.
                  </div>
                </div>

                {/* Foundational Bullet */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-sky-50/60 border border-sky-200">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#38BDF8] border border-sky-500 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <strong className="text-sky-900 font-bold">Foundational stage (5):</strong> multilevel, play/activity-based learning.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARATIVE ACADEMIC STRUCTURE TABLE */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <BookOpen className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Curricular Stages Breakdown Table
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3] w-[20%]">Curricular Stage</th>
                  <th className="p-3 border-r border-[#3d65a3] w-[22%]">Grade Levels & Ages</th>
                  <th className="p-3 border-r border-[#3d65a3] w-[28%]">Pedagogical Focus (Image Aligned)</th>
                  <th className="p-3 w-[30%]">Curricular Model & Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {(getSiteData().academicStages || ACADEMIC_STAGES).map((stage, idx) => {
                  const stageStyles = [
                    { badge: "bg-sky-100 text-sky-800 border-sky-300", highlight: "border-l-4 border-l-sky-500" },
                    { badge: "bg-emerald-100 text-emerald-800 border-emerald-300", highlight: "border-l-4 border-l-emerald-500" },
                    { badge: "bg-slate-800 text-white border-slate-700", highlight: "border-l-4 border-l-slate-800" },
                    { badge: "bg-amber-100 text-amber-900 border-amber-300", highlight: "border-l-4 border-l-amber-400" },
                  ][idx % 4];

                  return (
                    <tr
                      key={idx}
                      className={`${idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"} ${stageStyles.highlight} hover:bg-slate-50 transition-colors`}
                    >
                      <td className="p-3 border-r border-slate-200 align-top">
                        <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded border ${stageStyles.badge}`}>
                          {stage.phase}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-[#2F5187] border-r border-slate-200 align-top">
                        <div className="leading-snug">{stage.levels}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-800 border-r border-slate-200 align-top leading-relaxed">
                        {stage.focus}
                      </td>
                      <td className="p-3 text-slate-600 leading-relaxed align-top">
                        {stage.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Stages Milestone Cards */}
        <div className="space-y-6 pt-2">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Detailed Developmental Milestone Cards
            </h3>
          </div>

          {(getSiteData().academicStages || ACADEMIC_STAGES).map((stage, idx) => (
            <div
              key={idx}
              className="p-6 rounded border border-slate-200 bg-[#F8FAFC] space-y-3 shadow-sm hover:border-[#2F5187]/40 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded bg-[#2F5187] text-white flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#2F5187]">
                      {stage.phase}
                    </h3>
                    <span className="text-xs font-semibold text-[#E87737]">
                      {stage.levels}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold uppercase bg-white px-2.5 py-1 rounded border border-slate-200 text-slate-700">
                  Focus: {stage.focus}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {stage.description}
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E87737] shrink-0" />
                  <span>Age-appropriate activity integration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2F5187] shrink-0" />
                  <span>Continuous diagnostic observation</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InternalPageLayout>
  );
};
