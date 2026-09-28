import React from "react";
import { FileText, ShieldCheck, Upload, Download, Plus, Trash2, BookOpen } from "lucide-react";
import { SiteData, UploadFolder } from "../../data/siteDataService";

interface DisclosureEditorProps {
  data: SiteData;
  setData: (data: SiteData) => void;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    folder: UploadFolder,
    onUploaded: (url: string, fileName?: string, fileSize?: string) => void
  ) => void;
}

export const DisclosureEditor: React.FC<DisclosureEditorProps> = ({
  data,
  setData,
  handleFileUpload,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-display text-[#2F5187]">Mandatory Public Disclosures</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage regulatory CBSE Appendix-IX disclosure tables, safety compliance certificates, and academic governance records across all 3 sections (A, B, and C).
        </p>
      </div>

      {/* General Institutional Information */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-bold text-sm text-[#2F5187]">A. General Information Table</h3>
            <p className="text-xs text-slate-500">School affiliation number, school code, address, email, and principal details.</p>
          </div>
          <button
            onClick={() => {
              const updated = [...(data.mandatoryDisclosure?.generalInfo || [])];
              updated.push({
                label: `New Information Field ${updated.length + 1}`,
                value: "Information Details",
              });
              setData({
                ...data,
                mandatoryDisclosure: { ...data.mandatoryDisclosure, generalInfo: updated },
              });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2F5187] text-white hover:bg-[#233d66] rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Info Row Block</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.mandatoryDisclosure?.generalInfo?.map((info, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-2.5 bg-slate-50 rounded-lg border border-slate-200 items-center">
              <div className="sm:col-span-4">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Field Label / Title</label>
                <input
                  type="text"
                  value={info.label}
                  onChange={(e) => {
                    const updated = [...data.mandatoryDisclosure.generalInfo];
                    updated[idx].label = e.target.value;
                    setData({
                      ...data,
                      mandatoryDisclosure: { ...data.mandatoryDisclosure, generalInfo: updated },
                    });
                  }}
                  placeholder="e.g. CBSE Affiliation Number"
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                />
              </div>
              <div className="sm:col-span-7">
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Value / Disclosure Content</label>
                <input
                  type="text"
                  value={info.value}
                  onChange={(e) => {
                    const updated = [...data.mandatoryDisclosure.generalInfo];
                    updated[idx].value = e.target.value;
                    setData({
                      ...data,
                      mandatoryDisclosure: { ...data.mandatoryDisclosure, generalInfo: updated },
                    });
                  }}
                  placeholder="e.g. 430489 (Status: Applied / In Process)"
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded text-slate-700"
                />
              </div>
              <div className="sm:col-span-1 flex justify-end">
                <button
                  onClick={() => {
                    const updated = data.mandatoryDisclosure.generalInfo.filter((_, i) => i !== idx);
                    setData({
                      ...data,
                      mandatoryDisclosure: { ...data.mandatoryDisclosure, generalInfo: updated },
                    });
                  }}
                  className="p-1.5 text-rose-500 hover:bg-rose-100 rounded text-xs"
                  title="Delete Row"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Certificates Table */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="font-bold text-sm text-[#2F5187]">B. Compliance Documents & Safety Certificates</h3>
            <p className="text-xs text-slate-500">Building safety, fire safety, water sanitation, and recognition certificates.</p>
          </div>
          <button
            onClick={() => {
              const updated = [...(data.mandatoryDisclosure?.complianceDocuments || [])];
              const nextNum = (updated.length + 1).toString().padStart(2, "0");
              updated.push({
                sno: nextNum,
                title: "New Regulatory Certificate",
                status: "Certified & Active",
                link: "/uploads/documents/certificate.pdf",
              });
              setData({
                ...data,
                mandatoryDisclosure: { ...data.mandatoryDisclosure, complianceDocuments: updated },
              });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2F5187] text-white hover:bg-[#233d66] rounded-lg text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Compliance Document Block</span>
          </button>
        </div>

        <div className="space-y-3">
          {data.mandatoryDisclosure?.complianceDocuments?.map((doc, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 mr-4">
                  <span className="text-xs font-bold text-[#E87737]">#{doc.sno}</span>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Certificate / Document Title</label>
                    <input
                      type="text"
                      value={doc.title}
                      onChange={(e) => {
                        const updated = [...data.mandatoryDisclosure.complianceDocuments];
                        updated[idx].title = e.target.value;
                        setData({
                          ...data,
                          mandatoryDisclosure: { ...data.mandatoryDisclosure, complianceDocuments: updated },
                        });
                      }}
                      className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updated = data.mandatoryDisclosure.complianceDocuments.filter((_, i) => i !== idx);
                    setData({
                      ...data,
                      mandatoryDisclosure: { ...data.mandatoryDisclosure, complianceDocuments: updated },
                    });
                  }}
                  className="p-1 text-rose-500 hover:bg-rose-100 rounded"
                  title="Delete Certificate"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Verification Status</label>
                  <input
                    type="text"
                    value={doc.status}
                    onChange={(e) => {
                      const updated = [...data.mandatoryDisclosure.complianceDocuments];
                      updated[idx].status = e.target.value;
                      setData({
                        ...data,
                        mandatoryDisclosure: { ...data.mandatoryDisclosure, complianceDocuments: updated },
                      });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-emerald-700 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Document PDF / Download Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={doc.link}
                      onChange={(e) => {
                        const updated = [...data.mandatoryDisclosure.complianceDocuments];
                        updated[idx].link = e.target.value;
                        setData({
                          ...data,
                          mandatoryDisclosure: { ...data.mandatoryDisclosure, complianceDocuments: updated },
                        });
                      }}
                      className="flex-1 text-xs p-1.5 bg-white border border-slate-300 rounded"
                    />
                    {doc.link && (
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#2F5187] border border-slate-300 rounded text-xs font-bold shrink-0 flex items-center gap-1 transition-colors"
                        title="Preview attached document"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">View PDF</span>
                      </a>
                    )}
                    <label className="px-3 py-1.5 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload PDF</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, "documents", (url) => {
                            const updated = [...data.mandatoryDisclosure.complianceDocuments];
                            updated[idx].link = url;
                            setData({
                              ...data,
                              mandatoryDisclosure: { ...data.mandatoryDisclosure, complianceDocuments: updated },
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section C: Academic Disclosures Table */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E87737]" />
              <h3 className="font-bold text-sm text-[#2F5187]">C. Academic Disclosures & School Documents</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Approved fee structure, annual academic calendar, prescribed book list, and developmental assessment schemes.
            </p>
          </div>
          <button
            onClick={() => {
              const updated = [...(data.mandatoryDisclosure?.academicDisclosures || [])];
              const nextNum = (updated.length + 1).toString().padStart(2, "0");
              updated.push({
                sno: nextNum,
                title: "New Academic Disclosure Document",
                status: "Approved by Management (AY 2026–27)",
                link: "/uploads/documents/mandatory-disclosure-appendix-ix.pdf",
                pageId: "",
                pageLabel: "",
              });
              setData({
                ...data,
                mandatoryDisclosure: { ...data.mandatoryDisclosure, academicDisclosures: updated },
              });
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2F5187] text-white hover:bg-[#233d66] rounded-lg text-xs font-bold transition-all shadow-sm shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Academic Document Block</span>
          </button>
        </div>

        <div className="space-y-3">
          {(data.mandatoryDisclosure?.academicDisclosures || []).map((doc, idx) => (
            <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 mr-4">
                  <span className="text-xs font-bold text-[#E87737]">#{doc.sno}</span>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Academic Record Title</label>
                    <input
                      type="text"
                      value={doc.title}
                      onChange={(e) => {
                        const updated = [...(data.mandatoryDisclosure?.academicDisclosures || [])];
                        updated[idx].title = e.target.value;
                        setData({
                          ...data,
                          mandatoryDisclosure: { ...data.mandatoryDisclosure, academicDisclosures: updated },
                        });
                      }}
                      className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const updated = (data.mandatoryDisclosure?.academicDisclosures || []).filter((_, i) => i !== idx);
                    setData({
                      ...data,
                      mandatoryDisclosure: { ...data.mandatoryDisclosure, academicDisclosures: updated },
                    });
                  }}
                  className="p-1 text-rose-500 hover:bg-rose-100 rounded"
                  title="Delete Document"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Verification / Approval Status</label>
                  <input
                    type="text"
                    value={doc.status || ""}
                    onChange={(e) => {
                      const updated = [...(data.mandatoryDisclosure?.academicDisclosures || [])];
                      updated[idx].status = e.target.value;
                      setData({
                        ...data,
                        mandatoryDisclosure: { ...data.mandatoryDisclosure, academicDisclosures: updated },
                      });
                    }}
                    placeholder="e.g. Approved by Management (AY 2026–27)"
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-emerald-700 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Document PDF / Download Link</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={doc.link || ""}
                      onChange={(e) => {
                        const updated = [...(data.mandatoryDisclosure?.academicDisclosures || [])];
                        updated[idx].link = e.target.value;
                        setData({
                          ...data,
                          mandatoryDisclosure: { ...data.mandatoryDisclosure, academicDisclosures: updated },
                        });
                      }}
                      placeholder="/uploads/documents/... or /api/files?id=..."
                      className="flex-1 text-xs p-1.5 bg-white border border-slate-300 rounded"
                    />
                    {doc.link && (
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#2F5187] border border-slate-300 rounded text-xs font-bold shrink-0 flex items-center gap-1 transition-colors"
                        title="Preview attached document"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">View PDF</span>
                      </a>
                    )}
                    <label className="px-3 py-1.5 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload PDF</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, "documents", (url) => {
                            const updated = [...(data.mandatoryDisclosure?.academicDisclosures || [])];
                            updated[idx].link = url;
                            setData({
                              ...data,
                              mandatoryDisclosure: { ...data.mandatoryDisclosure, academicDisclosures: updated },
                            });
                          })
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Website Page Navigation Link (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Website Page Shortcut (Optional)
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={
                        ["", "admissions-fee", "activities", "academics-books", "academics-assessment", "documents"].includes(doc.pageId || "")
                          ? (doc.pageId || "")
                          : "custom"
                      }
                      onChange={(e) => {
                        const updated = [...(data.mandatoryDisclosure?.academicDisclosures || [])];
                        const val = e.target.value;
                        if (val !== "custom") {
                          updated[idx].pageId = val;
                          if (!updated[idx].pageLabel) {
                            if (val === "admissions-fee") updated[idx].pageLabel = "Fee Structure";
                            else if (val === "activities") updated[idx].pageLabel = "Activity Calendar";
                            else if (val === "academics-books") updated[idx].pageLabel = "Book List";
                            else if (val === "academics-assessment") updated[idx].pageLabel = "Assessment Scheme";
                            else if (val === "documents") updated[idx].pageLabel = "Documents";
                          }
                        }
                        setData({
                          ...data,
                          mandatoryDisclosure: { ...data.mandatoryDisclosure, academicDisclosures: updated },
                        });
                      }}
                      className="w-1/2 text-xs p-1.5 bg-white border border-slate-300 rounded text-slate-700"
                    >
                      <option value="">None (No Button)</option>
                      <option value="admissions-fee">Fee Structure</option>
                      <option value="activities">Activity Calendar</option>
                      <option value="academics-books">Book List</option>
                      <option value="academics-assessment">Assessment Scheme</option>
                      <option value="documents">Documents Page</option>
                      <option value="custom">Custom ID...</option>
                    </select>
                    <input
                      type="text"
                      value={doc.pageId || ""}
                      onChange={(e) => {
                        const updated = [...(data.mandatoryDisclosure?.academicDisclosures || [])];
                        updated[idx].pageId = e.target.value;
                        setData({
                          ...data,
                          mandatoryDisclosure: { ...data.mandatoryDisclosure, academicDisclosures: updated },
                        });
                      }}
                      placeholder="page-id"
                      className="w-1/2 text-xs p-1.5 bg-white border border-slate-300 rounded font-mono text-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Page Button Label
                  </label>
                  <input
                    type="text"
                    value={doc.pageLabel || ""}
                    onChange={(e) => {
                      const updated = [...(data.mandatoryDisclosure?.academicDisclosures || [])];
                      updated[idx].pageLabel = e.target.value;
                      setData({
                        ...data,
                        mandatoryDisclosure: { ...data.mandatoryDisclosure, academicDisclosures: updated },
                      });
                    }}
                    placeholder="e.g. Fee Structure, Activity Calendar"
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-slate-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

