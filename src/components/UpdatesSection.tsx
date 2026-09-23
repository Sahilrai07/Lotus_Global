import React from "react";
import { Calendar, Clock, ArrowRight, Bell, FileText, ChevronRight } from "lucide-react";
import { getSiteData } from "../data/siteDataService";

interface UpdatesSectionProps {
  onNavigate: (pageId: string) => void;
  openInquiry: () => void;
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ onNavigate, openInquiry }) => {
  const data = getSiteData();
  const events = data.events.slice(0, 3);
  const news = data.news.slice(0, 3);
  const notices = data.notices.slice(0, 4);

  return (
    <section className="py-16 bg-white border-b border-slate-200" aria-label="Campus Updates, Events and News">
      <div className="wrap">
        <div className="section-title-wrap">
          <h2 className="section-title-institutional">
            CAMPUS HAPPENINGS & UPDATES
          </h2>
          <hr className="hr1" />
          <hr className="hr2" />
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Stay informed with the latest academic milestones, upcoming institutional events, and administrative circulars.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Column 1: Upcoming Events (Reference Col 1) */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#2F5187] pb-2 mb-4">
                <h3 className="font-display font-bold text-lg text-[#2F5187] uppercase tracking-wide flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#E87737]" />
                  <span>Upcoming Events</span>
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87737] bg-[#FFF5EE] px-2 py-0.5 rounded">
                  2026-27
                </span>
              </div>

              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-3.5 bg-white rounded border border-slate-200 hover:border-[#2F5187]/40 transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold text-[#E87737]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.date}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px]">
                        {event.category}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 leading-snug">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200">
              <button
                onClick={() => onNavigate("news-events")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E87737] hover:text-[#D26425] uppercase tracking-wider transition-colors"
              >
                <span>View Complete Calendar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: News (Reference Col 2 with thumbnail images) */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#2F5187] pb-2 mb-4">
                <h3 className="font-display font-bold text-lg text-[#2F5187] uppercase tracking-wide flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#2F5187]" />
                  <span>Campus News</span>
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F5187] bg-[#EEF3FA] px-2 py-0.5 rounded">
                  Latest
                </span>
              </div>

              <div className="space-y-4">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3 bg-white rounded border border-slate-200 hover:border-[#2F5187]/40 transition-all items-start group"
                  >
                    <div className="w-16 h-16 sm:w-18 sm:h-18 shrink-0 overflow-hidden rounded border border-slate-200 bg-slate-100">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <Clock className="w-3 h-3 text-[#E87737]" />
                        <span>{item.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-xs text-slate-800 leading-snug group-hover:text-[#2F5187] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200">
              <button
                onClick={() => onNavigate("news-events")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E87737] hover:text-[#D26425] uppercase tracking-wider transition-colors"
              >
                <span>Read All Campus News</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 3: Announcements & Circulars (Reference Col 3) */}
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between border-b-2 border-[#2F5187] pb-2 mb-4">
                <h3 className="font-display font-bold text-lg text-[#2F5187] uppercase tracking-wide flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#E87737]" />
                  <span>Circulars & Notices</span>
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  Official
                </span>
              </div>

              <div className="space-y-3">
                {notices.map((notice) => (
                  <button
                    key={notice.id}
                    onClick={() => onNavigate(notice.link || "documents")}
                    className="w-full text-left p-3 bg-white rounded border border-slate-200 hover:border-[#E87737] transition-all flex items-start justify-between gap-2 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E87737]"></span>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          {notice.date}
                        </span>
                      </div>
                      <h4 className="font-display font-semibold text-xs text-slate-800 group-hover:text-[#2F5187] transition-colors line-clamp-2">
                        {notice.title}
                      </h4>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#E87737] shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => onNavigate("documents")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2F5187] hover:text-[#1E375F] uppercase tracking-wider transition-colors"
              >
                <span>Download Circulars</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
