import React, { useState } from "react";
import { Compass, FileCheck, CheckCircle2, Plus, Trash2, Calendar } from "lucide-react";
import { SiteData } from "../../data/siteDataService";

interface AdmissionsEditorProps {
  data: SiteData;
  setData: (data: SiteData) => void;
}

export const AdmissionsEditor: React.FC<AdmissionsEditorProps> = ({ data, setData }) => {
  const [subTab, setSubTab] = useState<"steps" | "eligibility" | "documents">("steps");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-display text-[#2F5187]">Admissions Pathway & Guidance</h2>
        <p className="text-xs text-slate-500 mt-1">
          Control the 4-step admission journey, NEP-compliant age matrix, and mandatory document verification checklist.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: "steps", label: "Four-Step Admission Journey", icon: Compass },
          { id: "eligibility", label: "Grade-Wise Age Eligibility", icon: Calendar },
          { id: "documents", label: "Required Documents Checklist", icon: FileCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                active
                  ? "bg-[#2F5187] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: 4-STEP ADMISSION PROCESS */}
      {subTab === "steps" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#2F5187]">Admission Milestone Steps</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.admissionsPathway?.steps?.map((step, idx) => (
              <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <input
                    type="text"
                    value={step.step}
                    onChange={(e) => {
                      const updated = [...data.admissionsPathway.steps];
                      updated[idx].step = e.target.value;
                      setData({ ...data, admissionsPathway: { ...data.admissionsPathway, steps: updated } });
                    }}
                    className="w-20 text-xs font-extrabold text-[#E87737] p-1 border border-slate-200 rounded"
                  />
                  <span className="text-[10px] font-semibold text-slate-400">Step {idx + 1}</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Step Heading</label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const updated = [...data.admissionsPathway.steps];
                      updated[idx].title = e.target.value;
                      setData({ ...data, admissionsPathway: { ...data.admissionsPathway, steps: updated } });
                    }}
                    className="w-full text-xs p-2 rounded border border-slate-300 font-bold text-[#2F5187]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Action Summary</label>
                  <textarea
                    rows={2}
                    value={step.summary}
                    onChange={(e) => {
                      const updated = [...data.admissionsPathway.steps];
                      updated[idx].summary = e.target.value;
                      setData({ ...data, admissionsPathway: { ...data.admissionsPathway, steps: updated } });
                    }}
                    className="w-full text-xs p-2 rounded border border-slate-300 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Details & Turnaround</label>
                  <input
                    type="text"
                    value={step.details}
                    onChange={(e) => {
                      const updated = [...data.admissionsPathway.steps];
                      updated[idx].details = e.target.value;
                      setData({ ...data, admissionsPathway: { ...data.admissionsPathway, steps: updated } });
                    }}
                    className="w-full text-xs p-2 rounded border border-slate-300 text-slate-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: AGE ELIGIBILITY MATRIX */}
      {subTab === "eligibility" && (
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-[#2F5187]">Grade-Wise Minimum Age & NEP Cutoffs</h3>
            <button
              onClick={() => {
                const updated = [...(data.admissionsPathway?.ageEligibility || [])];
                updated.push({
                  grade: "New Grade",
                  minAge: "Appropriate Age",
                  cutoff: "Cutoff reference date",
                  stage: "Preparatory",
                  note: "Verification required",
                });
                setData({ ...data, admissionsPathway: { ...data.admissionsPathway, ageEligibility: updated } });
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#2F5187] rounded text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Grade Row</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Class / Grade</th>
                  <th className="p-2.5">Minimum Age Criteria</th>
                  <th className="p-2.5">Cutoff / Compliance Note</th>
                  <th className="p-2.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.admissionsPathway?.ageEligibility?.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.grade}
                        onChange={(e) => {
                          const updated = [...data.admissionsPathway.ageEligibility];
                          updated[idx].grade = e.target.value;
                          setData({ ...data, admissionsPathway: { ...data.admissionsPathway, ageEligibility: updated } });
                        }}
                        className="w-36 p-1.5 border border-slate-200 rounded font-bold text-[#2F5187]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.minAge}
                        onChange={(e) => {
                          const updated = [...data.admissionsPathway.ageEligibility];
                          updated[idx].minAge = e.target.value;
                          setData({ ...data, admissionsPathway: { ...data.admissionsPathway, ageEligibility: updated } });
                        }}
                        className="w-44 p-1.5 border border-slate-200 rounded font-semibold text-[#E87737]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.note}
                        onChange={(e) => {
                          const updated = [...data.admissionsPathway.ageEligibility];
                          updated[idx].note = e.target.value;
                          setData({ ...data, admissionsPathway: { ...data.admissionsPathway, ageEligibility: updated } });
                        }}
                        className="w-full p-1.5 border border-slate-200 rounded"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => {
                          const updated = data.admissionsPathway.ageEligibility.filter((_, i) => i !== idx);
                          setData({ ...data, admissionsPathway: { ...data.admissionsPathway, ageEligibility: updated } });
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: REQUIRED DOCUMENTS */}
      {subTab === "documents" && (
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-[#2F5187]">Registration Documents Checklist</h3>
            <button
              onClick={() => {
                const updated = [...(data.admissionsPathway?.requiredDocuments || [])];
                updated.push({
                  category: "General Documentation",
                  name: "Document Title",
                  spec: "Original + 2 copies",
                  description: "Document description and instructions",
                  grades: "All Grades",
                  required: true,
                });
                setData({ ...data, admissionsPathway: { ...data.admissionsPathway, requiredDocuments: updated } });
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#2F5187] rounded text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.admissionsPathway?.requiredDocuments?.map((doc, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={doc.required}
                      onChange={(e) => {
                        const updated = [...data.admissionsPathway.requiredDocuments];
                        updated[idx].required = e.target.checked;
                        setData({ ...data, admissionsPathway: { ...data.admissionsPathway, requiredDocuments: updated } });
                      }}
                      className="rounded text-red-600"
                    />
                    <span>{doc.required ? "Mandatory Document" : "Optional / Supporting"}</span>
                  </label>
                  <button
                    onClick={() => {
                      const updated = data.admissionsPathway.requiredDocuments.filter((_, i) => i !== idx);
                      setData({ ...data, admissionsPathway: { ...data.admissionsPathway, requiredDocuments: updated } });
                    }}
                    className="p-1 text-rose-500 hover:bg-rose-100 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Document Name</label>
                  <input
                    type="text"
                    value={doc.name}
                    onChange={(e) => {
                      const updated = [...data.admissionsPathway.requiredDocuments];
                      updated[idx].name = e.target.value;
                      setData({ ...data, admissionsPathway: { ...data.admissionsPathway, requiredDocuments: updated } });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Verification Instruction</label>
                  <textarea
                    rows={2}
                    value={doc.description}
                    onChange={(e) => {
                      const updated = [...data.admissionsPathway.requiredDocuments];
                      updated[idx].description = e.target.value;
                      setData({ ...data, admissionsPathway: { ...data.admissionsPathway, requiredDocuments: updated } });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded leading-relaxed text-slate-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
