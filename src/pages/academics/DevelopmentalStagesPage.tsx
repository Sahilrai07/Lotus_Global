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
            Pedagogical Progression
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Four Developmental Stages: Nursery to Grade 10
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          In alignment with the National Curriculum Framework (NCERT) and NEP 2020 pedagogical design, schooling at Lotus Global School is structured into four distinct developmental stages. Each phase meets children at their specific cognitive, motor, and emotional developmental milestones.
        </p>

        {/* Detailed Stages */}
        <div className="space-y-6">
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
