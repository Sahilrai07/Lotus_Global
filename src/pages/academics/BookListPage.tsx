import React, { useState } from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { useSiteData } from "../../data/siteDataService";
import {
  BookOpen,
  Download,
  Eye,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";
import { PdfViewerModal } from "../../components/PdfViewerModal";

interface BookListPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

interface TextbookEntry {
  classLevel: string;
  subject: string;
  textbook: string;
  category: string;
}

export const BookListPage: React.FC<BookListPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const { siteData } = useSiteData();
  const bannerImage =
    siteData.pageBanners?.academics ||
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80";

  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const bookPdfUrl = "/uploads/documents/prescribed-book-list.pdf";

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const fileUrl = `/api/files?id=prescribed-book-list.pdf&download=1`;
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error("Fetch failed");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = "Lotus_Global_School_NCERT_Book_List_Classes_6_to_8_2026-27.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 3000);
    } catch {
      window.open(bookPdfUrl, "_blank");
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const textbooks: TextbookEntry[] = [
    // Class VI
    { classLevel: "VI", subject: "English", textbook: "Poorvi", category: "Languages" },
    { classLevel: "VI", subject: "Hindi", textbook: "Malhar", category: "Languages" },
    { classLevel: "VI", subject: "Mathematics", textbook: "Ganita Prakash", category: "Mathematics" },
    { classLevel: "VI", subject: "Science", textbook: "Curiosity", category: "Science" },
    { classLevel: "VI", subject: "Social Science", textbook: "Exploring Society: India and Beyond", category: "Social Sciences" },
    { classLevel: "VI", subject: "Sanskrit", textbook: "Deepakam", category: "Languages" },

    // Class VII
    { classLevel: "VII", subject: "English", textbook: "Poorvi", category: "Languages" },
    { classLevel: "VII", subject: "Hindi", textbook: "Malhar", category: "Languages" },
    { classLevel: "VII", subject: "Mathematics", textbook: "Ganita Prakash", category: "Mathematics" },
    { classLevel: "VII", subject: "Science", textbook: "Curiosity", category: "Science" },
    { classLevel: "VII", subject: "Social Science", textbook: "Exploring Society: India and Beyond", category: "Social Sciences" },
    { classLevel: "VII", subject: "Sanskrit", textbook: "Deepakam", category: "Languages" },

    // Class VIII
    { classLevel: "VIII", subject: "English", textbook: "Poorvi", category: "Languages" },
    { classLevel: "VIII", subject: "Hindi", textbook: "Malhar", category: "Languages" },
    { classLevel: "VIII", subject: "Mathematics", textbook: "Ganita Prakash", category: "Mathematics" },
    { classLevel: "VIII", subject: "Science", textbook: "Curiosity", category: "Science" },
    { classLevel: "VIII", subject: "Social Science", textbook: "Exploring Society: India and Beyond", category: "Social Sciences" },
    { classLevel: "VIII", subject: "Sanskrit", textbook: "Deepakam", category: "Languages" },
  ];

  const filteredBooks = textbooks.filter((book) => {
    const matchesClass = selectedClass === "All" || book.classLevel === selectedClass;
    const matchesQuery =
      searchQuery.trim() === "" ||
      book.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.textbook.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.classLevel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesQuery;
  });

  return (
    <InternalPageLayout
      title="Prescribed Book List"
      category="ACADEMICS"
      activePageId="academics-books"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[
        { label: "Academics", pageId: "academics" },
        { label: "Prescribed Book List" },
      ]}
    >
      <div className="space-y-10">
        {/* Header Title & Actions */}
        <div className="border-b-2 border-[#2F5187] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
              Official Curriculum Textbooks
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
              NCERT Textbook List – Classes VI to VIII
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Academic Session 2026–27 | Lotus Global School
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsViewerOpen(true)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#2F5187] font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 border border-slate-300"
            >
              <Eye className="w-4 h-4 text-[#2F5187]" />
              <span>View PDF</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-4 py-2 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "..." : "Download Official PDF"}</span>
            </button>
          </div>
        </div>

        {/* Lead Narrative */}
        <div className="p-5 rounded-lg bg-[#F8FAFC] border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p className="font-semibold text-[#2F5187]">
            In strict adherence to the National Curriculum Framework (NCF) and CBSE affiliation norms, Lotus Global School prescribes official NCERT publication textbooks for middle school classes (Grades VI to VIII).
          </p>
          <p>
            Parents may acquire these standardized textbooks from any authorized book depot, school stationery supplier, or directly through the official NCERT publications portal.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Class Tabs */}
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            {["All", "VI", "VII", "VIII"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedClass(lvl)}
                className={`px-3.5 py-1.5 rounded text-xs font-bold tracking-wide transition-all ${
                  selectedClass === lvl
                    ? "bg-[#2F5187] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {lvl === "All" ? "All Classes (VI–VIII)" : `Class ${lvl}`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search subject or book title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:border-[#2F5187] bg-slate-50 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Textbook Table */}
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3] w-[18%]">Class / Grade</th>
                  <th className="p-3 border-r border-[#3d65a3] w-[26%]">Subject</th>
                  <th className="p-3 border-r border-[#3d65a3] w-[36%]">Prescribed NCERT Textbook</th>
                  <th className="p-3 w-[20%]">Academic Domain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filteredBooks.map((item, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-[#F8FAFC] hover:bg-slate-50"}
                  >
                    <td className="p-3 font-extrabold text-[#2F5187] border-r border-slate-200">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-sky-100 text-sky-900 border border-sky-200 font-bold">
                        Class {item.classLevel}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-slate-800 border-r border-slate-200">
                      {item.subject}
                    </td>
                    <td className="p-3 font-bold text-[#E87737] text-sm border-r border-slate-200">
                      {item.textbook}
                    </td>
                    <td className="p-3 text-slate-600">
                      <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium border border-slate-200">
                        {item.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Official Notes and Guidelines Card */}
        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-lg border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Info className="w-4 h-4 text-[#E87737]" />
            <span>Important Institutional Note</span>
          </div>
          <p className="text-xs text-amber-950 leading-relaxed font-medium">
            This list covers the main NCERT textbooks for Classes VI–VIII. Additional subjects such as Computer/IT, General Knowledge, Art, or Physical Education may use school-selected resources and supplementary workbooks, and are therefore not included here.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://ncert.nic.in/textbook.php"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-white hover:bg-slate-100 text-[#2F5187] font-bold text-xs uppercase tracking-wider border border-amber-300 transition-colors shadow-xs"
            >
              <span>Visit Official NCERT Digital Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        title="NCERT Textbook List – Classes VI to VIII"
        subtitle="Lotus Global School – Academic Session 2026–27"
        fileUrl={bookPdfUrl}
        onDownload={handleDownloadPdf}
        isDownloading={isDownloading}
      />
    </InternalPageLayout>
  );
};
