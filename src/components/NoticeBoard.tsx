import React, { useState } from "react";
import { Bell, Megaphone, FileText, ChevronRight, Calendar, ArrowRight, ExternalLink } from "lucide-react";

interface NoticeItem {
  id: string;
  title: string;
  date: string;
  category: "Academic" | "Admission" | "Circular" | "Event";
  isNew?: boolean;
}

interface NoticeBoardProps {
  onNavigate?: (pageId: string) => void;
  onOpenInquiry?: () => void;
}

export const NoticeBoard: React.FC<NoticeBoardProps> = ({ onNavigate, onOpenInquiry }) => {
  const [activeTab, setActiveTab] = useState<"notices" | "announcements">("notices");

  const notices: NoticeItem[] = [
    {
      id: "n1",
      title: "Admissions Open for Academic Year: Nursery to Grade 10.",
      date: "Ongoing",
      category: "Admission",
      isNew: true,
    },
    {
      id: "n2",
      title: "Scholastic Assessment: Formative & Term Diagnostic Schedule.",
      date: "Academic",
      category: "Academic",
      isNew: true,
    },
    {
      id: "n3",
      title: "Document Verification Protocols for New Student Registrations.",
      date: "Circular",
      category: "Circular",
    },
    {
      id: "n4",
      title: "Curriculum Alignment with NCERT Framework & NEP Guidelines.",
      date: "Update",
      category: "Academic",
    },
    {
      id: "n5",
      title: "Parent-Teacher Collaborative Interactions & Campus Walkthroughs.",
      date: "Campus",
      category: "Event",
    },
  ];

  const announcements: NoticeItem[] = [
    {
      id: "a1",
      title: "Composite Science & Computer Labs Readiness Inspection Complete.",
      date: "Facilities",
      category: "Circular",
      isNew: true,
    },
    {
      id: "a2",
      title: "Sports Arena & Physical Agility Program Timetable Finalized.",
      date: "Sports",
      category: "Event",
    },
    {
      id: "a3",
      title: "Library Book Sanctum: Curated NCERT Reference Sets Added.",
      date: "Library",
      category: "Academic",
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden flex flex-col h-full">
      {/* Institutional Header with Tab toggles */}
      <div className="bg-[#2F5187] text-white p-3 border-b-2 border-[#E87737]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#E87737]" />
            <h3 className="font-display font-bold text-sm tracking-wider uppercase text-white">
              Institutional Notice Board
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase bg-[#E87737] text-white px-2 py-0.5 rounded">
            Live Updates
          </span>
        </div>

        {/* Tabs for Notices vs Announcements */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/15">
          <button
            onClick={() => setActiveTab("notices")}
            className={`text-xs font-semibold px-3 py-1 rounded transition-colors ${
              activeTab === "notices"
                ? "bg-white text-[#2F5187] font-bold"
                : "text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Circulars & Notices
          </button>
          <button
            onClick={() => setActiveTab("announcements")}
            className={`text-xs font-semibold px-3 py-1 rounded transition-colors ${
              activeTab === "announcements"
                ? "bg-white text-[#2F5187] font-bold"
                : "text-slate-200 hover:text-white hover:bg-white/10"
            }`}
          >
            Announcements
          </button>
        </div>
      </div>

      {/* Notice List Area */}
      <div className="p-3 divide-y divide-slate-100 flex-1 overflow-y-auto max-h-[260px]">
        {(activeTab === "notices" ? notices : announcements).map((item) => (
          <div
            key={item.id}
            className="py-2.5 first:pt-1 last:pb-1 group cursor-pointer"
            onClick={() => onNavigate?.("academics")}
          >
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87737] mt-1.5 shrink-0 group-hover:scale-125 transition-transform" />
              <div className="flex-1">
                <p className="text-xs text-slate-800 font-semibold leading-snug group-hover:text-[#2F5187] transition-colors">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-medium text-slate-500 uppercase">
                    {item.date}
                  </span>
                  {item.isNew && (
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-700 px-1.5 py-0.2 rounded">
                      New
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Institutional Quick Disclosures & Action links (Reference column 3 inspiration) */}
      <div className="bg-[#F8FAFC] border-t border-slate-200 p-3 space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#2F5187]">
          Mandatory & Academic Links
        </div>

        <div className="grid grid-cols-1 gap-1.5 text-xs">
          <button
            onClick={() => onNavigate?.("admissions")}
            className="flex items-center justify-between text-left p-1.5 rounded hover:bg-white border border-transparent hover:border-slate-200 text-slate-700 hover:text-[#2F5187] transition-all"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <FileText className="w-3.5 h-3.5 text-[#E87737]" />
              Mandatory Public Disclosure & Framework
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => onNavigate?.("academics")}
            className="flex items-center justify-between text-left p-1.5 rounded hover:bg-white border border-transparent hover:border-slate-200 text-slate-700 hover:text-[#2F5187] transition-all"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-[#2F5187]" />
              School Timings & Assessment Scheme
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
