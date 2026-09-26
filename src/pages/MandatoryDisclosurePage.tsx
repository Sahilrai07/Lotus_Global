import React, { useState } from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { FileText, Download, CheckCircle2, ShieldCheck, ExternalLink, Building, Users, BookOpen, RefreshCw, Eye } from "lucide-react";
import { useSiteData } from "../data/siteDataService";
import { PdfViewerModal } from "../components/PdfViewerModal";

interface MandatoryDisclosurePageProps {
  onNavigate?: (pageId: string) => void;
  openInquiry?: () => void;
}

export const MandatoryDisclosurePage: React.FC<MandatoryDisclosurePageProps> = ({
  onNavigate = () => {},
  openInquiry = () => {},
}) => {
  const { siteData } = useSiteData();
  const school = siteData.schoolInfo;
  const banner = siteData.pageBanners?.disclosure || "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80";
  const [downloadingSno, setDownloadingSno] = useState<string | null>(null);
  const [viewingDoc, setViewingDoc] = useState<{
    sno: string;
    title: string;
    link?: string;
    status?: string;
  } | null>(null);

  const resolveDocUrl = (doc: { sno: string; link?: string; title?: string }) => {
    if (doc.link && doc.link.trim()) {
      return doc.link.trim();
    }
    if (doc.sno === "05" || doc.title?.toLowerCase().includes("building")) {
      return "/api/files?id=building-safety-certificate.pdf";
    }
    if (doc.sno === "06" || doc.sno === "01" || doc.title?.toLowerCase().includes("fire")) {
      return "/api/files?id=fire-safety-certificate.pdf";
    }
    if (doc.sno === "07" || doc.title?.toLowerCase().includes("water") || doc.title?.toLowerCase().includes("health") || doc.title?.toLowerCase().includes("sanitation")) {
      return "/api/files?id=health-sanitation-certificate.pdf";
    }
    return "/api/files?id=mandatory-disclosure-appendix-ix.pdf";
  };

  const handleDownload = async (e: React.MouseEvent, docLink?: string, docTitle?: string, sno?: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (sno) setDownloadingSno(sno);

    const safeTitle = (docTitle || "Certificate")
      .trim()
      .replace(/[^a-zA-Z0-9_\-\s]/g, "")
      .replace(/\s+/g, "_");
    const targetFilename = safeTitle.endsWith(".pdf") ? safeTitle : `${safeTitle}.pdf`;

    try {
      let resolvedUrl = docLink || "/api/files?id=mandatory-disclosure-appendix-ix.pdf";

      // If it's a data URI (base64)
      if (resolvedUrl.startsWith("data:")) {
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = resolvedUrl;
        a.download = targetFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }

      // Route static /uploads/documents paths through /api/files?id=... to ensure attachment headers
      if (resolvedUrl.startsWith("/uploads/documents/")) {
        const fileParam = resolvedUrl.replace("/uploads/documents/", "");
        resolvedUrl = `/api/files?id=${encodeURIComponent(fileParam)}`;
      }

      // Append ?download=1 to signal server to send attachment headers
      const downloadUrl = resolvedUrl.includes("?")
        ? `${resolvedUrl}&download=1`
        : `${resolvedUrl}?download=1`;

      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const blob = await response.blob();
      const pdfBlob = blob.type === "application/pdf" ? blob : new Blob([blob], { type: "application/pdf" });

      // Create object URL and trigger programmatic device download
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = targetFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up memory
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 3000);
    } catch {
      // Fallback: browser direct anchor download
      const a = document.createElement("a");
      a.style.display = "none";
      let fallbackUrl = docLink || "/api/files?id=mandatory-disclosure-appendix-ix.pdf";
      if (!fallbackUrl.startsWith("data:")) {
        fallbackUrl = fallbackUrl.includes("?") ? `${fallbackUrl}&download=1` : `${fallbackUrl}?download=1`;
      }
      a.href = fallbackUrl;
      a.download = targetFilename;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      setTimeout(() => {
        if (sno) setDownloadingSno(null);
      }, 800);
    }
  };

  const generalInfo = siteData.mandatoryDisclosure?.generalInfo || [
    { label: "Name of the School", value: school.name },
    { label: "Affiliation Status", value: `${school.affiliationStatus} (Under NCERT Framework)` },
    { label: "School Address", value: school.address },
    { label: "Principal / Leadership Desk", value: "Principal Office (Qualified M.Sc / M.A., B.Ed.)" },
    { label: "Official Email ID", value: school.email },
    { label: "Contact Phone / WhatsApp", value: `+91 ${school.phone}` },
  ];

  const complianceDocuments = siteData.mandatoryDisclosure?.complianceDocuments || [
    {
      sno: "01",
      title: "Copies of Affiliation / Upgradation Documentation",
      status: "Available for Inspection",
      link: "/uploads/documents/mandatory-disclosure-appendix-ix.pdf",
    },
    {
      sno: "02",
      title: "Copies of Society / Trust Registration Certificate",
      status: "Registered Institutional Trust",
      link: "/uploads/documents/mandatory-disclosure-appendix-ix.pdf",
    },
    {
      sno: "03",
      title: "Copy of No Objection Certificate (NOC) by State Government",
      status: "Issued / In Compliance",
      link: "/uploads/documents/mandatory-disclosure-appendix-ix.pdf",
    },
    {
      sno: "04",
      title: "Copies of Recognition Certificate Under RTE Act, 2009",
      status: "Compliant Under Relevant Provisions",
      link: "/uploads/documents/mandatory-disclosure-appendix-ix.pdf",
    },
    {
      sno: "05",
      title: "Copy of Valid Building Safety Certificate as per National Building Code",
      status: "Municipal / Civil Engineer Certified",
      link: "/uploads/documents/building-safety-certificate.pdf",
    },
    {
      sno: "06",
      title: "Copy of Valid Fire Safety Certificate Issued by Competent Authority",
      status: "Verified & Fire Clearance Active",
      link: "/uploads/documents/fire-safety-certificate.pdf",
    },
    {
      sno: "07",
      title: "Copies of Valid Water, Health & Sanitation Certificates",
      status: "Potable Water & Hygiene Certified",
      link: "/uploads/documents/health-sanitation-certificate.pdf",
    },
  ];

  const academicDisclosures = [
    {
      sno: "01",
      title: "Approved Fee Structure for Academic Year 2026-27",
      pageId: "documents",
    },
    {
      sno: "02",
      title: "Annual Academic Calendar 2026-27",
      pageId: "documents",
    },
    {
      sno: "03",
      title: "List of Prescribed NCERT Books & Stationary",
      pageId: "documents",
    },
    {
      sno: "04",
      title: "Developmental Stages & Assessment Scheme",
      pageId: "academics-assessment",
    },
  ];

  return (
    <InternalPageLayout
      title="Public Mandatory Disclosure"
      category="DOCUMENTS & DISCLOSURES"
      activePageId="disclosure"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={banner}
      breadcrumbs={[
        { label: "Home", pageId: "home" },
        { label: "Documents", pageId: "documents" },
        { label: "Mandatory Disclosure", pageId: "disclosure" },
      ]}
    >
      <div className="space-y-8">
        {/* Institutional Notice Header */}
        <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E87737]">
            <ShieldCheck className="w-4 h-4" />
            <span>CBSE Regulatory Compliance · Appendix-IX</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#2F5187]">
            Public Mandatory Disclosure Information
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            In accordance with educational regulatory norms, Lotus Global School provides complete transparency regarding institutional governance, safety certifications, infrastructure parameters, and academic calendars.
          </p>
        </div>

        {/* Section A: General Information Table */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-[#2F5187] text-white px-5 py-3 border-b-2 border-[#E87737] flex items-center gap-2">
            <Building className="w-4 h-4 text-[#E87737]" />
            <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider">
              A. General Institutional Information
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {generalInfo.map((info, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-3 p-4 text-xs sm:text-sm hover:bg-slate-50 transition-colors"
              >
                <div className="font-bold text-slate-700 sm:col-span-1">
                  {info.label}
                </div>
                <div className="text-slate-600 sm:col-span-2 mt-1 sm:mt-0 font-medium">
                  {info.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Documents and Compliance Verification */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-[#2F5187] text-white px-5 py-3 border-b-2 border-[#E87737] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#E87737]" />
            <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider">
              B. Documents & Regulatory Compliance Certificates
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[580px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5 w-16 text-center">S.No.</th>
                  <th className="p-3.5">Document / Compliance Certificate</th>
                  <th className="p-3.5 w-48 whitespace-nowrap">Verification Status</th>
                  <th className="p-3.5 w-44 sm:w-52 text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {complianceDocuments.map((doc) => (
                  <tr key={doc.sno} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 text-center font-bold text-[#E87737]">
                      {doc.sno}
                    </td>
                    <td className="p-3.5 font-medium leading-relaxed">
                      {doc.title}
                    </td>
                    <td className="p-3.5 font-semibold text-emerald-700 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{doc.status}</span>
                      </span>
                    </td>
                    <td className="p-3 sm:p-3.5 text-center whitespace-nowrap">
                      <div className="inline-flex items-center justify-center gap-1.5 flex-nowrap">
                        <button
                          type="button"
                          onClick={() => setViewingDoc(doc)}
                          className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all shadow-xs cursor-pointer shrink-0"
                          title={`View ${doc.title} online`}
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleDownload(e, resolveDocUrl(doc), doc.title, doc.sno)}
                          disabled={downloadingSno === doc.sno}
                          className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded bg-[#2F5187] hover:bg-[#1E375F] text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-75 shrink-0"
                          title={`Save ${doc.title} to device`}
                        >
                          {downloadingSno === doc.sno ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin text-amber-300" />
                              <span className="text-amber-200">Saving...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section C: Result and Academics */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-[#2F5187] text-white px-5 py-3 border-b-2 border-[#E87737] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#E87737]" />
            <h3 className="font-display font-bold text-sm sm:text-base uppercase tracking-wider">
              C. Academic Disclosures & School Documents
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[480px]">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5 w-16 text-center">S.No.</th>
                  <th className="p-3.5">Academic Record</th>
                  <th className="p-3.5 w-36 text-center whitespace-nowrap">View Online</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {academicDisclosures.map((record) => (
                  <tr key={record.sno} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 text-center font-bold text-[#E87737]">
                      {record.sno}
                    </td>
                    <td className="p-3.5 font-medium leading-relaxed">
                      {record.title}
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <button
                        onClick={() => onNavigate(record.pageId)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#E87737] text-white hover:bg-[#D26425] font-bold text-[11px] uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Callout */}
        <div className="p-5 rounded-lg bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-sm text-[#2F5187]">
              Need Additional Physical Copies or Institutional Inquiries?
            </h4>
            <p className="text-xs text-slate-600">
              Our campus administration office at Vatar, Vapi maintains certified inspection dossiers during official school hours.
            </p>
          </div>
          <button
            onClick={() => onNavigate("contact")}
            className="px-5 py-2.5 rounded bg-[#2F5187] text-white hover:bg-[#1E375F] font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm"
          >
            Contact Campus Office
          </button>
        </div>
      </div>

      {/* Online PDF Viewer Modal */}
      {viewingDoc && (
        <PdfViewerModal
          isOpen={!!viewingDoc}
          onClose={() => setViewingDoc(null)}
          title={viewingDoc.title}
          subtitle={viewingDoc.status ? `Verification Status: ${viewingDoc.status}` : "CBSE Regulatory Compliance Certificate"}
          fileUrl={resolveDocUrl(viewingDoc)}
          onDownload={() => {
            handleDownload(
              { preventDefault: () => {}, stopPropagation: () => {} } as any,
              resolveDocUrl(viewingDoc),
              viewingDoc.title,
              viewingDoc.sno
            );
          }}
          isDownloading={downloadingSno === viewingDoc.sno}
        />
      )}
    </InternalPageLayout>
  );
};
