import React from "react";
import { SCHOOL_INFO } from "../data/schoolData";
import { ShieldCheck, Compass, Target, CheckCircle2, Award, ArrowRight } from "lucide-react";
import { InternalPageLayout } from "../components/InternalPageLayout";

interface AboutPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ openInquiry, onNavigate = () => {} }) => {
  return (
    <InternalPageLayout
      title="About Lotus Global School"
      category="ABOUT US"
      activePageId="about"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[{ label: "About Us" }]}
    >
      <div className="space-y-8">
        {/* Page Section Heading */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Institutional Identity & Background
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Overview of Lotus Global School
          </h2>
        </div>

        {/* Lead Quote & Image Block (Reference style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-[#F8FAFC] p-6 rounded border border-slate-200">
          <div className="md:col-span-5 overflow-hidden rounded border border-slate-200 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80"
              alt="Lotus Global School Campus"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#E87737]">
              Core Educational Creed
            </div>
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              "Learning Should Inspire Rather Than Instruct"
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {SCHOOL_INFO.narrative.leadParagraph}
            </p>
          </div>
        </div>

        {/* Narrative Content Body */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            {SCHOOL_INFO.narrative.pedagogy}
          </p>

          <p>
            {SCHOOL_INFO.narrative.outlook}
          </p>

          <div className="p-4 bg-[#FFF5EE] border-l-4 border-[#E87737] rounded-r text-[#2F5187] font-semibold text-xs sm:text-sm">
            "{SCHOOL_INFO.narrative.closing}"
          </div>
        </div>

        {/* Institutional Pillars Grid */}
        <div className="pt-4 space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2">
            Institutional Distinctions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E87737]" />
                <h4 className="font-bold text-xs sm:text-sm text-[#2F5187] uppercase">
                  Proposed CBSE Institution
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured in accordance with the national NCERT curriculum framework, fostering rigorous academic foundations and continuous diagnostic assessment.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#2F5187]" />
                <h4 className="font-bold text-xs sm:text-sm text-[#2F5187] uppercase">
                  Low Student-Teacher Ratio
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ensuring individualized cognitive and emotional mentoring, proactive parent communication, and personal attention for every student.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#E25B88]" />
                <h4 className="font-bold text-xs sm:text-sm text-[#2F5187] uppercase">
                  Holistic Development
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Blending STEM laboratories, digital computer literacy, fine arts, music, and athletic physical conditioning into everyday schooling.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-[#F8FAFC] space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E87737]" />
                <h4 className="font-bold text-xs sm:text-sm text-[#2F5187] uppercase">
                  Strategic Campus in Vatar
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conveniently located near Vatar PHC in Vapi, providing a tranquil, safe, and academically focused learning haven for children from Nursery to Grade 10.
              </p>
            </div>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
