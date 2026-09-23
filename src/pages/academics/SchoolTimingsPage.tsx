import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { getSiteData } from "../../data/siteDataService";
import { Clock, Calendar, Bell, Sun, BookOpen, Coffee, Activity, CheckCircle2, AlertCircle } from "lucide-react";

interface SchoolTimingsPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

const scheduleIcons: Record<string, React.FC<{ className?: string }>> = {
  Sun,
  BookOpen,
  Coffee,
  Activity,
  Bell,
};

export const SchoolTimingsPage: React.FC<SchoolTimingsPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const siteData = getSiteData();
  const timings = siteData.schoolTimings;
  const bannerImage = siteData.pageBanners?.academics || "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80";

  const wingsList = timings?.wings || [];
  const scheduleList = timings?.dailySchedule || [];

  return (
    <InternalPageLayout
      title={timings?.heading || "School Timings & Routine"}
      category="ACADEMICS"
      activePageId="academics-timings"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[
        { label: "Academics", pageId: "academics" },
        { label: "School Timings" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            {timings?.subheading || "Academic Schedule"}
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            {timings?.heading || "Daily Timings & Instructional Routine"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {timings?.leadText || "A disciplined, well-balanced daily schedule is fundamental to student productivity and mental vitality. At Lotus Global School, our bell schedule is engineered to optimize concentration spans, alternate intensive academic periods with physical and creative refreshers, and guarantee sufficient time for healthy dining and assembly."}
        </p>

        {/* Wing Timings Cards */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#E87737]" />
            <span>Wing-Wise Operating Hours</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {wingsList.map((wing, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <span className={`inline-block px-2.5 py-0.5 text-[11px] font-bold rounded border ${wing.badgeColor} mb-3`}>
                    {wing.badge}
                  </span>
                  <h4 className="font-display font-bold text-sm text-slate-900 mb-2">
                    {wing.wing}
                  </h4>
                  <div className="text-xl font-bold text-[#E87737] mb-2 font-display">
                    {wing.timing}
                  </div>
                  <p className="text-xs text-slate-600 mb-3 font-medium">
                    {wing.highlights}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#2F5187]" />
                  <span>{wing.days}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Schedule Breakdown Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="bg-[#2F5187] text-white p-4 font-display font-bold text-sm uppercase tracking-wider flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#E87737]" />
              <span>Standard Daily Bell Schedule (Grades 1 – 10)</span>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {scheduleList.map((item, idx) => {
              const IconComp = scheduleIcons[item.icon] || Clock;
              return (
                <div
                  key={idx}
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-[#FFF5EE] text-[#E87737] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-[#2F5187]">
                        {item.event}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#E87737] shrink-0 sm:text-right font-display pl-11 sm:pl-0">
                    {item.time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
