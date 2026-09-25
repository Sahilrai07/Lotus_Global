import React from "react";
import { ArrowRight, Quote } from "lucide-react";
import { useSiteData, LeadershipMember } from "../data/siteDataService";

interface LeadershipDeskSectionProps {
  onNavigate: (pageId: string) => void;
}

export const LeadershipDeskSection: React.FC<LeadershipDeskSectionProps> = ({ onNavigate }) => {
  const { siteData } = useSiteData();
  const leadership = (siteData.leadership || {}) as Record<string, LeadershipMember>;

  const cards: Array<{ key: string; data: LeadershipMember; pageId: string }> = Object.entries(leadership).map(
    ([key, data]) => {
      let pageId = "about";
      if (key === "principal") pageId = "message";
      return { key, data, pageId };
    }
  );

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-200" aria-label="Leadership Desk">
      <div className="wrap">
        <div className="section-title-wrap">
          <h2 className="section-title-institutional">
            INSTITUTIONAL LEADERSHIP
          </h2>
          <hr className="hr1" />
          <hr className="hr2" />
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Guiding our academic mission with visionary direction, experienced governance, and child-first pedagogical care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map(({ key, data, pageId }) => (
            <div
              key={key}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#2F5187]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="border-b-2 border-[#2F5187] pb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87737] block">
                    Leadership Desk
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#2F5187] uppercase tracking-wide">
                    {data.title}
                  </h3>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 overflow-hidden rounded border border-slate-200 shadow-sm bg-slate-100">
                    <img
                      src={data.photo}
                      alt={data.name}
                      loading="lazy"
                      decoding="async"
                      width="96"
                      height="112"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-display font-bold text-sm text-[#2F5187]">
                      {data.name}
                    </h4>
                    <div className="text-[11px] font-semibold text-[#E87737]">
                      {data.designation}
                    </div>
                    {data.quote && (
                      <p className="text-xs text-slate-600 italic font-serif leading-relaxed line-clamp-3">
                        "{data.quote}"
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                  {data.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate(pageId)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E87737] hover:text-[#D26425] uppercase tracking-wider transition-colors"
                >
                  <span>Read Complete Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
