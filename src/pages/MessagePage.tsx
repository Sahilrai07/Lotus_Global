import React from "react";
import { Quote, Sparkles, Compass, ShieldCheck } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";

interface MessagePageProps {
  openInquiry: () => void;
}

export const MessagePage: React.FC<MessagePageProps> = ({ openInquiry }) => {
  return (
    <div className="pt-28 pb-20 animate-fade-in bg-[#F8FAFC]">
      {/* Page Hero */}
      <section className="bg-[#0B1B3D] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider">
              <span>Leadership Address</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
              Principal & Director's Message
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Guiding the educational paradigm of Lotus Global School with visionary leadership, academic rigor, and moral grounding.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Header / Portrait Placeholder */}
            <div className="p-8 sm:p-12 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex flex-col sm:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-2xl bg-[#0B1B3D]/5 border-2 border-dashed border-[#0B1B3D]/20 flex flex-col items-center justify-center text-center p-4 shrink-0">
                <img src="/assets/logo.png" alt="Crest" className="h-12 w-auto opacity-75 mb-1" />
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                  Office of the Principal
                </span>
              </div>

              <div className="text-center sm:text-left space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                  Institutional Leadership
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1B3D]">
                  Office of the Principal & Academic Directorate
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Lotus Global School · Vatar, Vapi, Gujarat
                </p>
              </div>
            </div>

            {/* Formal Address Section with Strict Content Integrity */}
            <div className="p-8 sm:p-12 space-y-8">
              <div className="relative pl-8 border-l-2 border-[#E86A2C]">
                <Quote className="w-8 h-8 text-[#E86A2C]/20 absolute -left-4 -top-2" />
                <p className="font-display text-lg sm:text-xl font-semibold text-[#0B1B3D] leading-snug">
                  "Education is not merely the transmission of syllabi; it is the ignition of an inquisitive spirit and the steadfast cultivation of character."
                </p>
              </div>

              {/* Dignified Institutional Placeholder (Strict compliance with User Rule #29 & #9) */}
              <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Sparkles className="w-3.5 h-3.5 text-[#E86A2C]" />
                  <span>Institutional Notice</span>
                </div>
                <div className="text-sm text-slate-600 leading-relaxed font-mono text-xs bg-white p-4 rounded border border-slate-200">
                  [Principal's Formal Inaugural Address — The detailed address and academic message will be published in this section upon formal commencement of the upcoming academic term. Inquiries regarding our academic framework and leadership approach can be directed to the campus office.]
                </div>
              </div>

              {/* Guiding Tenets of School Leadership */}
              <div className="pt-4 space-y-4">
                <h3 className="font-display font-bold text-lg text-[#0B1B3D]">
                  Our Leadership Framework
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-slate-200 bg-white">
                    <div className="text-xs font-bold uppercase text-[#0B1B3D] mb-1">Academic Mentorship</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ensuring teachers act as facilitators of inquiry rather than mere lecturers.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 bg-white">
                    <div className="text-xs font-bold uppercase text-[#0B1B3D] mb-1">Parental Partnership</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Maintaining transparent, continuous communication for each child's holistic growth.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 bg-white">
                    <div className="text-xs font-bold uppercase text-[#0B1B3D] mb-1">Ethical Integrity</div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Anchoring students in universal values of diligence, mutual respect, and social responsibility.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Have questions for our leadership team?
                </div>
                <button
                  onClick={openInquiry}
                  className="px-5 py-2.5 bg-[#0B1B3D] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E86A2C] transition-colors"
                >
                  Submit Institutional Inquiry
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
