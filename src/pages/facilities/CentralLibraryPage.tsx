import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { BookOpen, CheckCircle2, Bookmark, Library, Search, Compass } from "lucide-react";

interface CentralLibraryPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const CentralLibraryPage: React.FC<CentralLibraryPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  return (
    <InternalPageLayout
      title="Central Library & Reading Sanctum"
      category="CAMPUS FACILITIES"
      activePageId="facility-library"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Facilities", pageId: "facilities" },
        { label: "Central Library" },
      ]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Knowledge Sanctum & Literary Exploration
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Central Library & Knowledge Resource Centre
          </h2>
        </div>

        {/* Lead Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200 items-center">
          <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
              alt="Central Library at Lotus Global School"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Cultivating a Lifelong Habit of Reading & Inquiry
            </h3>
            <p className="leading-relaxed font-medium">
              The Central Library at Lotus Global School is a spacious, well-lit haven designed to inspire reflective thought and independent research.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Housing extensive academic reference sections, classic world literature, junior fiction, periodicals, and scientific publications, the library is an integral pillar of our educational ecosystem. Every student is allotted dedicated library periods in their weekly timetable.
            </p>
          </div>
        </div>

        {/* Key Features of Library */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Library className="w-5 h-5 text-[#E87737]" />
            <span>Library Sections & Collections</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <Bookmark className="w-4 h-4 text-[#E87737]" />
                <span>Academic Reference Bank</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive NCERT reference texts, CBSE exemplar questions, competitive olympiad manuals, and subject encyclopedias.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <BookOpen className="w-4 h-4 text-[#2F5187]" />
                <span>Junior Storycraft Nook</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A joyful, colorfully appointed reading corner for pre-primary and primary learners featuring illustrated storybooks, fable lore, and picture dictionaries.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <Search className="w-4 h-4 text-[#E87737]" />
                <span>Periodicals & Journals</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Current affairs magazines, scientific periodicals, newspapers in multiple languages, and educational newsletters.
              </p>
            </div>
          </div>
        </div>

        {/* Library Timings & Guidelines */}
        <div className="p-5 rounded bg-[#FFF5EE] border-l-4 border-[#E87737] space-y-2 text-xs">
          <span className="font-bold text-[#2F5187] uppercase block text-sm">
            Library Rules & Borrowing Guidelines
          </span>
          <ul className="space-y-1 text-slate-700 list-disc list-inside">
            <li>Open throughout school hours from 8:00 AM to 3:30 PM on all working days.</li>
            <li>Students are issued library cards for borrowing books for home study and review.</li>
            <li>Absolute silence and respect for library volumes are strictly maintained to foster deep contemplation.</li>
          </ul>
        </div>
      </div>
    </InternalPageLayout>
  );
};
