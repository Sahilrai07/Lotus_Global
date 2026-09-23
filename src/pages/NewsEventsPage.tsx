import React, { useState } from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { Calendar, Clock, Bell, FileText, ArrowRight, Tag } from "lucide-react";
import { getSiteData } from "../data/siteDataService";

interface NewsEventsPageProps {
  onNavigate?: (pageId: string) => void;
  openInquiry?: () => void;
}

export const NewsEventsPage: React.FC<NewsEventsPageProps> = ({
  onNavigate = () => {},
  openInquiry = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<"all" | "events" | "news" | "circulars">("all");
  const data = getSiteData();

  return (
    <InternalPageLayout
      title="News & Events Hub"
      category="NEWS & EVENTS"
      activePageId="news-events"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Home", pageId: "home" },
        { label: "News & Events", pageId: "news-events" },
      ]}
    >
      <div className="space-y-8">
        {/* Intro Banner */}
        <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E87737]">
            <Bell className="w-4 h-4" />
            <span>Campus Happenings & Official Bulletins</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#2F5187]">
            Lotus Global School News, Events & Circulars
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Stay updated with academic timelines, extracurricular exhibitions, inter-school tournaments, and administrative notices from Lotus Global School in Vatar, Vapi.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          {[
            { id: "all", label: "All Updates" },
            { id: "events", label: "Upcoming Events" },
            { id: "news", label: "School News" },
            { id: "circulars", label: "Notices & Circulars" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab.id
                  ? "bg-[#2F5187] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. UPCOMING EVENTS */}
        {(activeTab === "all" || activeTab === "events") && (
          <div className="space-y-4">
            <div className="border-b-2 border-[#2F5187] pb-2 flex items-center justify-between">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#2F5187] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#E87737]" />
                <span>Upcoming Institutional Events</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-[#2F5187]/40 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#E87737]">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </span>
                      <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {event.category}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-[#2F5187]">
                      {event.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. CAMPUS NEWS */}
        {(activeTab === "all" || activeTab === "news") && (
          <div className="space-y-4 pt-4">
            <div className="border-b-2 border-[#2F5187] pb-2 flex items-center justify-between">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#2F5187] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2F5187]" />
                <span>Campus News & Highlights</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div className="h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#E87737]" />
                        <span>{item.date}</span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-[#2F5187] group-hover:text-[#E87737] transition-colors leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-[#E87737] uppercase tracking-wider">
                        Lotus Global School Media
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. NOTICES & CIRCULARS */}
        {(activeTab === "all" || activeTab === "circulars") && (
          <div className="space-y-4 pt-4">
            <div className="border-b-2 border-[#2F5187] pb-2 flex items-center justify-between">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#2F5187] flex items-center gap-2">
                <Bell className="w-5 h-5 text-rose-600" />
                <span>Administrative Notices & Circulars</span>
              </h3>
            </div>

            <div className="space-y-3">
              {data.notices.map((notice) => (
                <div
                  key={notice.id}
                  className="bg-white p-4 rounded-lg border border-slate-200 hover:border-[#E87737] shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#E87737]"></span>
                      <span className="text-xs font-bold text-[#E87737] uppercase tracking-wider">
                        {notice.category}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-400 font-medium">
                        {notice.date}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-[#2F5187]">
                      {notice.title}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {notice.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => onNavigate(notice.link || "documents")}
                    className="shrink-0 px-4 py-2 rounded bg-[#2F5187] text-white hover:bg-[#1E375F] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </InternalPageLayout>
  );
};
