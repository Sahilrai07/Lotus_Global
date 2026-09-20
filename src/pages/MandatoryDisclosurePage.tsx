import React from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { FileText, Download, CheckCircle2, ShieldCheck, ExternalLink, Building, Users, BookOpen } from "lucide-react";
import { getSiteData } from "../data/siteDataService";

interface MandatoryDisclosurePageProps {
  onNavigate?: (pageId: string) => void;
  openInquiry?: () => void;
}

export const MandatoryDisclosurePage: React.FC<MandatoryDisclosurePageProps> = ({
  onNavigate = () => {},
  openInquiry = () => {},
}) => {
  const school = getSiteData().schoolInfo;

  const generalInfo = [
    { label: "Name of the School", value: school.name },
    { label: "Affiliation Status", value: `${school.affiliationStatus} (Under NCERT Framework)` },
    { label: "School Address", value: school.address },
    { label: "Principal / Leadership Desk", value: "Principal Office (Qualified M.Sc / M.A., B.Ed.)" },
    { label: "Official Email ID", value: school.email },
    { label: "Contact Phone / WhatsApp", value: `+91 ${school.phone}` },
  ];

  const complianceDocuments = [
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
      bannerImage="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1600&q=80"
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
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5 w-16 text-center">S.No.</th>
                  <th className="p-3.5">Document / Compliance Certificate</th>
                  <th className="p-3.5 w-44">Verification Status</th>
                  <th className="p-3.5 w-36 text-center">Action</th>
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
                    <td className="p-3.5 font-semibold text-emerald-700">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{doc.status}</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => onNavigate("documents")}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#2F5187] text-white hover:bg-[#1E375F] font-bold text-[11px] uppercase tracking-wider transition-colors shadow-xs"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
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
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5 w-16 text-center">S.No.</th>
                  <th className="p-3.5">Academic Record</th>
                  <th className="p-3.5 w-36 text-center">View Online</th>
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
                    <td className="p-3.5 text-center">
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
            onClick={openInquiry}
            className="px-5 py-2.5 rounded bg-[#2F5187] text-white hover:bg-[#1E375F] font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-sm"
          >
            Contact Administration
          </button>
        </div>
      </div>
    </InternalPageLayout>
  );
};
