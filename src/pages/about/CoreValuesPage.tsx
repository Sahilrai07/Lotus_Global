import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { SCHOOL_INFO } from "../../data/schoolData";
import { Target, BookOpen, HeartHandshake, ShieldCheck, CheckCircle2, Award } from "lucide-react";

interface CoreValuesPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const CoreValuesPage: React.FC<CoreValuesPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const { dedication, diligence, discipline } = SCHOOL_INFO.mottoValues;

  return (
    <InternalPageLayout
      title="Core Values & Institutional Creed"
      category="ABOUT US"
      activePageId="about-values"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "About Us", pageId: "about" },
        { label: "Core Values & Creed" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Moral & Ethical Anchors
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            The Three Pillars: Dedication, Diligence & Discipline
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Education devoid of character is incomplete. At Lotus Global School, our foundational motto—<em>Dedication, Diligence, and Discipline</em>—is not simply a slogan; it is the daily compass that shapes our pedagogical choices, student conduct, and community relationships.
        </p>

        {/* 3 Detailed Value Deep Dives */}
        <div className="space-y-6">
          {/* 1. Dedication */}
          <div className="p-6 rounded border-l-4 border-[#E87737] bg-[#F8FAFC] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#FFF5EE] text-[#E87737] flex items-center justify-center font-bold">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Dedication: {dedication.title}
              </h3>
            </div>
            <div className="text-xs font-semibold text-[#E87737] uppercase tracking-wider">
              {dedication.short}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {dedication.full}
            </p>
            <div className="pt-2 text-xs text-slate-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
              <span>Demonstrated through community service, classroom teamwork, and personal accountability.</span>
            </div>
          </div>

          {/* 2. Diligence */}
          <div className="p-6 rounded border-l-4 border-[#2F5187] bg-[#F8FAFC] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#EEF3FA] text-[#2F5187] flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Diligence: {diligence.title}
              </h3>
            </div>
            <div className="text-xs font-semibold text-[#2F5187] uppercase tracking-wider">
              {diligence.short}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {diligence.full}
            </p>
            <div className="pt-2 text-xs text-slate-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2F5187]" />
              <span>Exemplified by intellectual curiosity, laboratory verification, and methodical homework habits.</span>
            </div>
          </div>

          {/* 3. Discipline */}
          <div className="p-6 rounded border-l-4 border-[#F7A8D2] bg-[#F8FAFC] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#FDF2F8] text-[#E25B88] flex items-center justify-center font-bold">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Discipline: {discipline.title}
              </h3>
            </div>
            <div className="text-xs font-semibold text-[#E25B88] uppercase tracking-wider">
              {discipline.short}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {discipline.full}
            </p>
            <div className="pt-2 text-xs text-slate-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E25B88]" />
              <span>Manifested in punctuality, respect for educators, peer kindness, and emotional composure.</span>
            </div>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
