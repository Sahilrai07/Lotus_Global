import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { Clock, Calendar, Bell, Sun, BookOpen, Coffee, Activity, CheckCircle2, AlertCircle } from "lucide-react";

interface SchoolTimingsPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const SchoolTimingsPage: React.FC<SchoolTimingsPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const timingsData = [
    {
      wing: "Foundational Stage (Nursery, Jr. KG, Sr. KG)",
      timing: "08:30 AM – 12:30 PM",
      days: "Monday to Friday",
      highlights: "Shorter hours tailored for early attention spans, sensory play, and gentle socialization.",
      badge: "Pre-Primary Wing",
      badgeColor: "bg-[#F7A8D2]/20 text-[#2F5187] border-[#F7A8D2]",
    },
    {
      wing: "Preparatory & Middle Stage (Grades 1 – 8)",
      timing: "07:50 AM – 01:50 PM",
      days: "Monday to Friday (1st & 3rd Sat: Activity Schedule)",
      highlights: "Full academic cycle covering core subjects, language mastery, science experiments, and sports.",
      badge: "Primary & Middle Wing",
      badgeColor: "bg-blue-50 text-[#2F5187] border-blue-200",
    },
    {
      wing: "Secondary Stage (Grades 9 – 10)",
      timing: "07:50 AM – 02:30 PM",
      days: "Monday to Friday + Scheduled Saturday Mentorship",
      highlights: "Extended academic immersion, CBSE laboratory practicals, Olympiad prep, and peer-coaching.",
      badge: "Secondary Wing",
      badgeColor: "bg-amber-50 text-amber-900 border-amber-200",
    },
  ];

  const dailySchedule = [
    { time: "07:50 AM – 08:15 AM", event: "Arrival & Morning Assembly", desc: "Prayer, inspiring thought for the day, news digest, and national anthem.", icon: Sun },
    { time: "08:15 AM – 09:35 AM", event: "Period 1 & 2: Scholastic Foundations", desc: "Mathematics and Science modules during peak morning alertness.", icon: BookOpen },
    { time: "09:35 AM – 09:55 AM", event: "Nutritional Breakfast & Fruit Break", desc: "Supervised dining promoting clean eating habits, hydration, and table manners.", icon: Coffee },
    { time: "09:55 AM – 11:55 AM", event: "Period 3, 4 & 5: Language & Humanities", desc: "English, Hindi, Gujarati / Sanskrit, Social Studies, and Environmental Sciences.", icon: BookOpen },
    { time: "11:55 AM – 12:20 PM", event: "Mid-Day Lunch Recess", desc: "Social interaction, balanced warm lunch, and relaxation in the dining commons.", icon: Coffee },
    { time: "12:20 PM – 01:50 PM", event: "Period 6 & 7: STEM Labs & Co-Scholastic", desc: "Computer lab, Science practicals, Arts, Music, and physical training rotations.", icon: Activity },
    { time: "01:50 PM – 02:30 PM", event: "Remedial Clinic & Advanced Enrichment", desc: "Targeted one-on-one doubt clarification and special interest clubs for senior grades.", icon: Bell },
  ];

  return (
    <InternalPageLayout
      title="School Timings & Routine"
      category="ACADEMICS"
      activePageId="academics-timings"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Academics", pageId: "academics" },
        { label: "School Timings" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Academic Schedule
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Daily Timings & Instructional Routine
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          A disciplined, well-balanced daily schedule is fundamental to student productivity and mental vitality. At Lotus Global School, our bell schedule is engineered to optimize concentration spans, alternate intensive academic periods with physical and creative refreshers, and guarantee sufficient time for healthy dining and assembly.
        </p>

        {/* Wing Timings Cards */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#E87737]" />
            <span>Wing-Wise Operating Hours</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {timingsData.map((wing, idx) => (
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
            <span className="text-[11px] text-slate-200 font-normal">Monday – Friday</span>
          </div>

          <div className="divide-y divide-slate-100">
            {dailySchedule.map((slot, i) => {
              const IconComp = slot.icon;
              return (
                <div key={i} className="p-3.5 sm:p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="sm:w-44 shrink-0 font-display font-bold text-xs text-[#2F5187] bg-slate-100 px-3 py-1.5 rounded flex items-center gap-2">
                    <IconComp className="w-3.5 h-3.5 text-[#E87737]" />
                    <span>{slot.time}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-xs sm:text-sm text-slate-900">
                      {slot.event}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {slot.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campus Administrative & Visiting Hours */}
        <div className="bg-gradient-to-r from-[#1E375F] to-[#2F5187] text-white rounded-lg p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#E87737] mb-1">
                Parent & Visitor Access
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                Administrative Office & Principal Meeting Hours
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed mb-4">
                Our front desk and admissions office operate throughout standard school working hours. Parents wishing to meet the Principal or class educators are requested to book an appointment in advance.
              </p>
              <div className="space-y-1.5 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
                  <span><strong>Office Hours:</strong> Monday – Saturday: 08:00 AM to 03:30 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
                  <span><strong>Principal Visiting:</strong> Mon & Thu: 10:00 AM – 12:00 PM (Prior Appointment)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
                  <span><strong>Educator Interaction:</strong> 2nd & 4th Saturdays by schedule</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-lg text-center">
              <AlertCircle className="w-8 h-8 text-[#E87737] mx-auto mb-2" />
              <div className="font-display font-bold text-sm text-white mb-1">
                Campus Punctuality & Security Policy
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                Gates close promptly at 07:55 AM. Late arrivals must report to the administrative supervisor. Safe pickup is strictly verified with authorized student security ID badges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
