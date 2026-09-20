import React, { useState, useEffect } from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { FileText, Download, Search, Filter, Calendar, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { getSiteData, subscribeSiteData, DocumentItem } from "../data/siteDataService";

interface DocumentsPageProps {
  onNavigate?: (pageId: string) => void;
  openInquiry?: () => void;
}

export const DocumentsPage: React.FC<DocumentsPageProps> = ({
  onNavigate = () => {},
  openInquiry = () => {},
}) => {
  const [documents, setDocuments] = useState<DocumentItem[]>(getSiteData().documents);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    return subscribeSiteData((newData) => {
      setDocuments(newData.documents);
    });
  }, []);

  const categories = ["All", "Admissions", "Academics", "Regulatory & Disclosures"];

  const filteredDocs = documents.filter((doc) => {
    if (doc.active === false) return false;
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc: DocumentItem) => {
    // If local file exists, trigger download or open PDF in new tab
    if (doc.fileUrl) {
      window.open(doc.fileUrl, "_blank");
    } else {
      openInquiry();
    }
  };

  return (
    <InternalPageLayout
      title="Documents & Downloads"
      category="DOCUMENTS"
      activePageId="documents"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Home", pageId: "home" },
        { label: "Documents & Downloads", pageId: "documents" },
      ]}
    >
      <div className="space-y-8">
        {/* Intro Banner */}
        <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E87737]">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Institutional Repository</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#2F5187]">
            Downloadable School Documents & Guidelines
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Access official registration application forms, curriculum guides, approved fee structures, safety certifications, and academic calendars for Lotus Global School, Vatar, Vapi.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-xs font-bold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-[#2F5187] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter documents..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:border-[#2F5187]"
            />
          </div>
        </div>

        {/* Documents Listing */}
        {filteredDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-5 rounded-lg border border-slate-200 hover:border-[#2F5187]/40 transition-all shadow-sm flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EEF3FA] text-[#2F5187] border border-[#2F5187]/20">
                      {doc.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {doc.date}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-[#2F5187] group-hover:text-[#E87737] transition-colors leading-snug">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {doc.fileSize || "PDF Document"}
                  </span>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#2F5187] text-white hover:bg-[#1E375F] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200 p-8 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-display font-bold text-base text-slate-700">
              No matching documents found
            </h3>
            <p className="text-xs text-slate-500">
              Try adjusting your category filter or search keywords.
            </p>
          </div>
        )}

        {/* Note on Public Mandatory Disclosure */}
        <div className="p-5 rounded-lg bg-[#EEF3FA] border border-[#2F5187]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-[#2F5187]">
              CBSE Public Mandatory Disclosure (Appendix-IX)
            </h4>
            <p className="text-xs text-slate-600">
              View our complete institutional compliance details, society/trust affiliation, and safety approvals.
            </p>
          </div>
          <button
            onClick={() => onNavigate("disclosure")}
            className="shrink-0 px-4 py-2 rounded bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            View Disclosure Table
          </button>
        </div>
      </div>
    </InternalPageLayout>
  );
};
