import React, { useState } from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { useSiteData } from "../../data/siteDataService";
import { SCHOOL_INFO } from "../../data/schoolData";
import {
  CreditCard,
  Download,
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  Calendar,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  Building,
} from "lucide-react";
import { PdfViewerModal } from "../../components/PdfViewerModal";

interface FeeStructurePageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const FeeStructurePage: React.FC<FeeStructurePageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const { siteData } = useSiteData();
  const banner =
    siteData.pageBanners?.admissions ||
    "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80";

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const feePdfUrl = "/uploads/documents/fee-structure-2026-27.pdf";

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const fileUrl = `/api/files?id=fee-structure-2026-27.pdf&download=1`;
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error("Fetch failed");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = "Lotus_Global_School_Fee_Structure_2026-27.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 3000);
    } catch {
      window.open(feePdfUrl, "_blank");
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const prePrimaryFees = [
    { std: "Nursery", total: "₹31,500", inst1: "₹11,500", inst2: "₹10,000", inst3: "₹10,000" },
    { std: "Junior KG", total: "₹33,500", inst1: "₹13,500", inst2: "₹10,000", inst3: "₹10,000" },
    { std: "Senior KG", total: "₹35,500", inst1: "₹15,500", inst2: "₹10,000", inst3: "₹10,000" },
  ];

  const primaryMiddleFees = [
    { std: "STD 1 to 3", total: "₹34,000", q1: "₹16,500", q2: "₹6,500", q3: "₹6,500", q4: "₹6,500" },
    { std: "STD 4 & 5", total: "₹36,400", q1: "₹16,750", q2: "₹6,750", q3: "₹6,750", q4: "₹7,000" },
    { std: "STD 6 to 8", total: "₹38,800", q1: "₹17,250", q2: "₹7,250", q3: "₹7,250", q4: "₹7,250" },
  ];

  return (
    <InternalPageLayout
      title="Approved Fee Structure"
      category="ADMISSIONS"
      activePageId="admissions-fee"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={banner}
      breadcrumbs={[
        { label: "Admissions", pageId: "admissions" },
        { label: "Fee Structure (2026–27)" },
      ]}
    >
      <div className="space-y-10">
        {/* Header Title & Actions */}
        <div className="border-b-2 border-[#2F5187] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
              Official Institutional Schedule
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
              Fee Structure – Academic Year 2026–27
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Transparent, regulated installment schedules approved for Lotus Global School, Vata (Vapi).
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsViewerOpen(true)}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#2F5187] font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 border border-slate-300"
            >
              <Eye className="w-4 h-4 text-[#2F5187]" />
              <span>View PDF</span>
            </button>
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-4 py-2.5 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "Downloading..." : "Download Official PDF"}</span>
            </button>
          </div>
        </div>

        {/* SECTION A: PRE-PRIMARY FEE STRUCTURE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E87737]" />
              <h3 className="font-display font-bold text-xl text-[#2F5187]">
                A. Pre-Primary Fee Structure
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
              3 Instalments
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                    <th className="p-3 border-r border-[#3d65a3] w-[20%]">STD</th>
                    <th className="p-3 border-r border-[#3d65a3] w-[20%]">Total Fee</th>
                    <th className="p-3 border-r border-[#3d65a3] w-[20%]">1st Instalment</th>
                    <th className="p-3 border-r border-[#3d65a3] w-[20%]">2nd Instalment</th>
                    <th className="p-3 w-[20%]">3rd Instalment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {prePrimaryFees.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-[#F8FAFC] hover:bg-slate-50"}
                    >
                      <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                        {row.std}
                      </td>
                      <td className="p-3 font-extrabold text-[#E87737] border-r border-slate-200">
                        {row.total}
                      </td>
                      <td className="p-3 font-medium text-slate-800 border-r border-slate-200">
                        {row.inst1}
                      </td>
                      <td className="p-3 font-medium text-slate-800 border-r border-slate-200">
                        {row.inst2}
                      </td>
                      <td className="p-3 font-medium text-slate-800">
                        {row.inst3}
                      </td>
                    </tr>
                  ))}
                  {/* Due Dates Row */}
                  <tr className="bg-amber-50/80 font-semibold text-amber-900 border-t-2 border-amber-200">
                    <td className="p-3 font-bold border-r border-amber-200 text-amber-950">
                      Last Date of Fee Payment
                    </td>
                    <td className="p-3 border-r border-amber-200 text-slate-500 italic text-[11px]">
                      Quarterly / Term
                    </td>
                    <td className="p-3 border-r border-amber-200 font-bold text-amber-900">
                      10th July 2026
                    </td>
                    <td className="p-3 border-r border-amber-200 font-bold text-amber-900">
                      10th Aug 2026
                    </td>
                    <td className="p-3 font-bold text-amber-900">
                      10th Dec 2026
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* School Kit Note */}
          <div className="p-3.5 rounded bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Note: The Pre-Primary fee includes the official School Kit.</span>
          </div>
        </div>

        {/* SECTION B: SCHOOL FEE STRUCTURE (STD. 1 TO 8) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-[#2F5187]" />
              <h3 className="font-display font-bold text-xl text-[#2F5187]">
                B. School Fee Structure (Std. 1 to 8)
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
              4 Quarters
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                    <th className="p-3 border-r border-[#3d65a3] w-[18%]">STD</th>
                    <th className="p-3 border-r border-[#3d65a3] w-[18%]">Total Fee</th>
                    <th className="p-3 border-r border-[#3d65a3] w-[16%]">
                      1st Quarter
                      <span className="block text-[10px] font-normal text-slate-300 normal-case">(Jun, July, Aug)</span>
                    </th>
                    <th className="p-3 border-r border-[#3d65a3] w-[16%]">
                      2nd Quarter
                      <span className="block text-[10px] font-normal text-slate-300 normal-case">(Sep, Oct, Nov)</span>
                    </th>
                    <th className="p-3 border-r border-[#3d65a3] w-[16%]">
                      3rd Quarter
                      <span className="block text-[10px] font-normal text-slate-300 normal-case">(Dec, Jan, Feb)</span>
                    </th>
                    <th className="p-3 w-[16%]">
                      4th Quarter
                      <span className="block text-[10px] font-normal text-slate-300 normal-case">(Mar, Apr)</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  {primaryMiddleFees.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white hover:bg-slate-50" : "bg-[#F8FAFC] hover:bg-slate-50"}
                    >
                      <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                        {row.std}
                      </td>
                      <td className="p-3 font-extrabold text-[#E87737] border-r border-slate-200">
                        {row.total}
                      </td>
                      <td className="p-3 font-medium text-slate-800 border-r border-slate-200">
                        {row.q1}
                      </td>
                      <td className="p-3 font-medium text-slate-800 border-r border-slate-200">
                        {row.q2}
                      </td>
                      <td className="p-3 font-medium text-slate-800 border-r border-slate-200">
                        {row.q3}
                      </td>
                      <td className="p-3 font-medium text-slate-800">
                        {row.q4}
                      </td>
                    </tr>
                  ))}
                  {/* Due Dates Row */}
                  <tr className="bg-amber-50/80 font-semibold text-amber-900 border-t-2 border-amber-200">
                    <td className="p-3 font-bold border-r border-amber-200 text-amber-950">
                      Last Date of Fee Payment
                    </td>
                    <td className="p-3 border-r border-amber-200 text-slate-500 italic text-[11px]">
                      Quarterly Schedule
                    </td>
                    <td className="p-3 border-r border-amber-200 font-bold text-amber-900">
                      10th June 2026
                    </td>
                    <td className="p-3 border-r border-amber-200 font-bold text-amber-900">
                      10th Sep 2026
                    </td>
                    <td className="p-3 border-r border-amber-200 font-bold text-amber-900">
                      10th Dec 2026
                    </td>
                    <td className="p-3 font-bold text-amber-900">
                      10th Mar 2026
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SECTION C: FEE PAYMENT GUIDELINES */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <CreditCard className="w-5 h-5 text-[#E87737]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              C. Fee Payment Guidelines & Instructions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#E87737]" />
                <span>Office Working Hours</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                8:00 AM to 2:00 PM (Monday to Saturday)
              </p>
              <p className="text-[11px] text-slate-500">
                School administration desk is available during these hours for in-person receipts and fee queries.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Prescribed Payment Modes</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fees are to be deposited through the school’s prescribed payment modes, as communicated by the school office.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>Returned Cheque Norms</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                For returned cheque payments, a cheque return charge of <strong>₹500</strong> will be strictly applicable.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
                <span>Contact Details Update</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Parents are requested to promptly inform the school office of any change in their residential address or telephone numbers.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase tracking-wider">
                <FileText className="w-4 h-4 text-[#2F5187]" />
                <span>Payment Receipts</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Parents are requested to retain all official payment receipts safely for their records and year-end documentation.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#2F5187] text-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#E87737]">Official Endorsement</span>
                <h4 className="font-display font-bold text-sm text-white mt-1">Lotus Global School, Vata</h4>
                <p className="text-[11px] text-slate-200 mt-1">
                  Issued and certified under institutional governance by School Management.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-right">
                <span className="text-xs font-semibold text-amber-300">— Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONNECT WITH ADMISSIONS CTA */}
        <div className="p-6 bg-gradient-to-r from-[#2F5187] to-[#1E375F] text-white rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-lg text-white">
              Have Questions Regarding Admissions or Fee Installments?
            </h4>
            <p className="text-xs text-slate-200">
              Our dedicated admissions counselors are available on weekdays to guide you through registration.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={openInquiry}
              className="px-4 py-2 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
            >
              Enquire Now
            </button>
            <a
              href={`tel:${SCHOOL_INFO.phone}`}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded border border-white/20 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#E87737]" />
              <span>Call Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        title="Approved Fee Structure – Academic Year 2026–27"
        subtitle="Lotus Global School, Vata – Official Fee Schedule & Guidelines"
        fileUrl={feePdfUrl}
        onDownload={handleDownloadPdf}
        isDownloading={isDownloading}
      />
    </InternalPageLayout>
  );
};
