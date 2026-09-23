import React from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { SCHOOL_INFO } from "../data/schoolData";
import { CheckCircle2, Quote, ArrowRight } from "lucide-react";

interface MessagePageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const MessagePage: React.FC<MessagePageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  return (
    <InternalPageLayout
      title="Principal's Desk"
      category="ABOUT US"
      activePageId="message"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[{ label: "Principal's Desk" }]}
    >
      <div className="space-y-8">
        {/* Section Heading */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Leadership Perspective
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Message From the Principal's Desk
          </h2>
        </div>

        {/* Principal Portrait & Introductory Creed Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200">
          <div className="md:col-span-4 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
              alt="Principal, Lotus Global School"
              className="w-full h-64 object-cover rounded border border-slate-300 shadow-sm"
            />
            <div className="mt-3 text-center sm:text-left">
              <h4 className="font-display font-bold text-base text-[#2F5187]">
                Office of the Principal
              </h4>
              <p className="text-xs text-[#E87737] font-semibold">
                Lotus Global School, Vatar, Vapi
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Proposed CBSE Institution
              </p>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            <div className="p-4 bg-white rounded border-l-4 border-[#E87737] shadow-sm">
              <Quote className="w-5 h-5 text-[#E87737] mb-1" />
              <p className="font-serif italic text-sm text-[#2F5187] font-medium leading-relaxed">
                "The greatest privilege of educational leadership is creating an ecosystem where every student feels seen, heard, and intellectually stimulated. If a child cannot learn the way we teach him, we must adapt and teach him the way he can learn."
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Dear Parents, Students, and Well-Wishers,
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              It is my distinct honor to welcome you to <strong>Lotus Global School</strong>, an ambitious institution founded in Vatar, Vapi with the explicit purpose of rethinking contemporary school education.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              We stand at a critical crossroads where conventional rote memorization is insufficient for the demands of the modern world. At Lotus Global School, our classrooms, science laboratories, and digital studios are built on active discovery. We encourage questions, celebrate creative experimentation, and instill emotional agility.
            </p>
          </div>
        </div>

        {/* Extended Narrative */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2">
            Our Commitments to Parents and Students
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-white border border-slate-200 rounded space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#2F5187]">
                <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
                <span>Pedagogical Agility</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emphasizing conceptual clarity under the NCERT framework, allowing each child to progress at a pace that inspires authentic mastery.
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#2F5187]">
                <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
                <span>Character & Values</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Grounded in our motto of <em>Dedication, Diligence, and Discipline</em>, ensuring intellectual prowess is paired with moral clarity and compassion.
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#2F5187]">
                <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
                <span>Parent-School Partnership</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe true education is a continuous collaboration between parents and educators through transparent reporting and open dialogue.
              </p>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#2F5187]">
                <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
                <span>Safety & Wellbeing</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A secure, hygienic, and emotionally nurturing campus sanctuary where children can express themselves fearlessly.
              </p>
            </div>
          </div>

          <p className="pt-2">
            I warmly invite you to visit our campus near Vatar PHC, interact with our admissions counsellors, and witness first-hand our vision for modern CBSE schooling.
          </p>
        </div>

        {/* Footer Signature */}
        <div className="pt-6 border-t border-slate-200">
          <div>
            <span className="font-display font-bold text-base text-[#2F5187] block">
              Principal
            </span>
            <span className="text-xs text-slate-500">
              Lotus Global School, Vatar, Vapi
            </span>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
