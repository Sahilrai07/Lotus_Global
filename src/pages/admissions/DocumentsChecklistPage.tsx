import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { REQUIRED_DOCUMENTS } from "../../data/schoolData";
import { FileCheck, Download, AlertCircle, CheckCircle2, FileText, HelpCircle } from "lucide-react";

interface DocumentsChecklistPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const DocumentsChecklistPage: React.FC<DocumentsChecklistPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const extendedDocs = [
    {
      category: "Mandatory Identity & Age Proof",
      items: [
        {
          name: "Birth Certificate",
          spec: "Original + 2 self-attested photocopies",
          desc: "Issued by Municipal Corporation / Gram Panchayat / Registrar of Births. Mandatory for age verification.",
          grades: "All Grades (Nursery to Grade 10)",
        },
        {
          name: "Student Aadhar Card",
          spec: "1 photocopy (Original for spot verification)",
          desc: "Valid 12-digit Unique Identification Authority of India (UIDAI) card with updated biometric info.",
          grades: "All Grades",
        },
        {
          name: "Parents / Guardian Aadhar Cards",
          spec: "1 photocopy each of Mother & Father",
          desc: "Identity and permanent residential address verification for official school records.",
          grades: "All Grades",
        },
      ],
    },
    {
      category: "Academic & Transfer Records",
      items: [
        {
          name: "Transfer Certificate (TC / SLC)",
          spec: "Original hard copy only (Countersigned if interstate)",
          desc: "School Leaving Certificate from the last recognized CBSE / State Board / ICSE school attended.",
          grades: "Applicable for Grade 2 and above",
        },
        {
          name: "Previous 2 Years' Report Cards",
          spec: "Self-attested photocopies of cumulative records",
          desc: "Term-end progress reports reflecting scholastic grading, attendance records, and conduct.",
          grades: "Applicable for Grade 1 and above",
        },
        {
          name: "CBSE Registration Card / Enrolment Slip",
          spec: "Official printout verified by previous school",
          desc: "Applicable only for Grade 9 & 10 lateral admissions transferring within CBSE boards.",
          grades: "Grades 9 & 10",
        },
      ],
    },
    {
      category: "Medical & Miscellaneous Records",
      items: [
        {
          name: "Student Medical Fitness & Immunization Card",
          spec: "Signed by registered Pediatrician / MBBS Doctor",
          desc: "Blood group verification, immunization history, and disclosure of allergies or chronic ailments.",
          grades: "All Grades",
        },
        {
          name: "Recent Passport Sized Photographs",
          spec: "6 student photos + 2 photos of each parent",
          desc: "Recent color photographs with white background for ID cards, health records, and dossier.",
          grades: "All Grades",
        },
        {
          name: "Caste / Category Certificate (If Applicable)",
          spec: "Photocopy issued by competent government authority",
          desc: "For SC / ST / OBC / EWS documentation as mandated by state education regulations.",
          grades: "Optional / If Applicable",
        },
      ],
    },
  ];

  return (
    <InternalPageLayout
      title="Required Document Checklist"
      category="ADMISSIONS"
      activePageId="admissions-documents"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Admissions", pageId: "admissions" },
        { label: "Document Checklist" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Admissions Documentation
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Mandatory Registration & Verification Dossier
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          To ensure smooth enrolment and compliance with statutory education board regulations, parents are advised to keep the following original documents along with required photocopies ready at the time of the campus interaction and registration.
        </p>

        {/* Document Categories */}
        <div className="space-y-6">
          {extendedDocs.map((section, idx) => (
            <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="bg-[#2F5187] text-white p-3 sm:p-4 font-display font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#E87737]" />
                <span>{section.category}</span>
              </div>

              <div className="divide-y divide-slate-100">
                {section.items.map((doc, docIdx) => (
                  <div key={docIdx} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 font-display font-bold text-sm text-[#2F5187]">
                        <CheckCircle2 className="w-4 h-4 text-[#E87737] shrink-0" />
                        <span>{doc.name}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200">
                          {doc.spec}
                        </span>
                        <span className="text-[11px] font-bold bg-[#E87737]/10 text-[#E87737] px-2 py-0.5 rounded">
                          {doc.grades}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      {doc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Verification Guidelines & Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-blue-200 bg-blue-50/60 rounded-lg p-5">
            <div className="flex items-center gap-2 font-display font-bold text-sm text-[#2F5187] mb-2">
              <AlertCircle className="w-4 h-4 text-[#2F5187]" />
              <span>Original Document Verification Policy</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
              <li>Original Birth Certificate and Aadhar cards are inspected for instant on-spot verification and returned immediately.</li>
              <li>Original Transfer Certificates (TC) must be surrendered at the school office prior to final enrollment.</li>
              <li>Students coming from outside Gujarat or non-CBSE boards must have their TC countersigned by the District Education Officer (DEO).</li>
            </ul>
          </div>

          <div className="border border-amber-200 bg-amber-50/60 rounded-lg p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-display font-bold text-sm text-amber-900 mb-2">
                <HelpCircle className="w-4 h-4 text-[#E87737]" />
                <span>Need Assistance with Documentation?</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                If you have recently relocated or are awaiting the issuance of a Transfer Certificate from your child's current school, our admissions coordinators can guide you on provisional admission procedures.
              </p>
            </div>
            <button
              onClick={openInquiry}
              className="btn-portal-primary py-2 text-xs font-bold uppercase tracking-wider justify-center"
            >
              Contact Admissions Counselor
            </button>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
