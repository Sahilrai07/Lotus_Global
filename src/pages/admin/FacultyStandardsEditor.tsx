import React, { useState } from "react";
import { Award, BookOpen, Calendar, Users, Plus, Trash2 } from "lucide-react";
import { SiteData } from "../../data/siteDataService";

interface FacultyStandardsEditorProps {
  data: SiteData;
  setData: (data: SiteData) => void;
}

export const FacultyStandardsEditor: React.FC<FacultyStandardsEditorProps> = ({ data, setData }) => {
  const [subTab, setSubTab] = useState<"pillars" | "departments" | "standards" | "workshops" | "ratio">("pillars");

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h3 className="font-bold text-sm text-[#2F5187]">Faculty Pedagogical Standards & Ratio Policies</h3>
        <p className="text-[11px] text-slate-500">
          Manage teacher recruitment pillars, departmental academic coverage, CPD training modules, and student-teacher ratio structures.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: "pillars", label: "Faculty Pillars", icon: Award },
          { id: "departments", label: "Departments", icon: BookOpen },
          { id: "standards", label: "Teaching Standards", icon: Award },
          { id: "workshops", label: "CPD Workshops", icon: Calendar },
          { id: "ratio", label: "Student-Teacher Ratio", icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                active
                  ? "bg-[#2F5187] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB 1: PILLARS */}
      {subTab === "pillars" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2F5187]">Core Faculty Mentorship Pillars</h4>
            <button
              onClick={() => {
                const updated = [...(data.facultyStandards?.pillars || [])];
                updated.push({
                  icon: "Award",
                  title: "New Faculty Pillar",
                  description: "Pedagogical commitment, educator qualifications, and mentorship standards.",
                });
                setData({ ...data, facultyStandards: { ...data.facultyStandards, pillars: updated } });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Pillar Block</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.facultyStandards?.pillars?.map((pillar, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-[10px] font-bold text-[#E87737] uppercase">Pillar #{idx + 1}</span>
                  <button
                    onClick={() => {
                      const updated = data.facultyStandards.pillars.filter((_, i) => i !== idx);
                      setData({ ...data, facultyStandards: { ...data.facultyStandards, pillars: updated } });
                    }}
                    className="text-rose-600 hover:text-rose-700 p-1 text-xs"
                    title="Delete Pillar"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#2F5187] mb-1">Pillar Title / Heading</label>
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => {
                      const updated = [...data.facultyStandards.pillars];
                      updated[idx].title = e.target.value;
                      setData({
                        ...data,
                        facultyStandards: { ...data.facultyStandards, pillars: updated },
                      });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={pillar.description}
                    onChange={(e) => {
                      const updated = [...data.facultyStandards.pillars];
                      updated[idx].description = e.target.value;
                      setData({
                        ...data,
                        facultyStandards: { ...data.facultyStandards, pillars: updated },
                      });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-slate-600 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: DEPARTMENTS */}
      {subTab === "departments" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2F5187]">Academic Departments & Faculty Wings</h4>
            <button
              onClick={() => {
                const updated = [...(data.facultyStandards?.departments || [])];
                updated.push({
                  name: "New Academic Department",
                  scope: "Grades and curriculum coverage scope",
                  focus: "Pedagogical methodology and conceptual focus.",
                });
                setData({ ...data, facultyStandards: { ...data.facultyStandards, departments: updated } });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Department Block</span>
            </button>
          </div>

          <div className="space-y-3">
            {data.facultyStandards?.departments?.map((dept, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-xs font-bold text-[#E87737]">Department #{idx + 1}</span>
                  <button
                    onClick={() => {
                      const updated = data.facultyStandards.departments.filter((_, i) => i !== idx);
                      setData({ ...data, facultyStandards: { ...data.facultyStandards, departments: updated } });
                    }}
                    className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#2F5187] uppercase">Department Name / Title</label>
                    <input
                      type="text"
                      value={dept.name}
                      onChange={(e) => {
                        const updated = [...data.facultyStandards.departments];
                        updated[idx].name = e.target.value;
                        setData({ ...data, facultyStandards: { ...data.facultyStandards, departments: updated } });
                      }}
                      className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Subject Scope</label>
                    <input
                      type="text"
                      value={dept.scope}
                      onChange={(e) => {
                        const updated = [...data.facultyStandards.departments];
                        updated[idx].scope = e.target.value;
                        setData({ ...data, facultyStandards: { ...data.facultyStandards, departments: updated } });
                      }}
                      className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Pedagogical Focus</label>
                    <input
                      type="text"
                      value={dept.focus}
                      onChange={(e) => {
                        const updated = [...data.facultyStandards.departments];
                        updated[idx].focus = e.target.value;
                        setData({ ...data, facultyStandards: { ...data.facultyStandards, departments: updated } });
                      }}
                      className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-slate-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TEACHING STANDARDS */}
      {subTab === "standards" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2F5187]">Pedagogical Teaching Standards</h4>
            <button
              onClick={() => {
                const updated = [...(data.facultyStandards?.teachingStandards || [])];
                updated.push({
                  title: "New Teaching Standard",
                  desc: "Criteria for active pedagogical delivery, formative assessment, and digital integration.",
                });
                setData({ ...data, facultyStandards: { ...data.facultyStandards, teachingStandards: updated } });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Standard Block</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.facultyStandards?.teachingStandards?.map((std, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-[10px] font-bold text-[#E87737] uppercase">Standard #{idx + 1}</span>
                  <button
                    onClick={() => {
                      const updated = data.facultyStandards.teachingStandards.filter((_, i) => i !== idx);
                      setData({ ...data, facultyStandards: { ...data.facultyStandards, teachingStandards: updated } });
                    }}
                    className="text-rose-600 hover:text-rose-700 p-1 text-xs"
                    title="Delete Standard"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#2F5187] mb-1">Standard Title / Heading</label>
                  <input
                    type="text"
                    value={std.title}
                    onChange={(e) => {
                      const updated = [...data.facultyStandards.teachingStandards];
                      updated[idx].title = e.target.value;
                      setData({ ...data, facultyStandards: { ...data.facultyStandards, teachingStandards: updated } });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">Standard Description</label>
                  <textarea
                    rows={3}
                    value={std.desc}
                    onChange={(e) => {
                      const updated = [...data.facultyStandards.teachingStandards];
                      updated[idx].desc = e.target.value;
                      setData({ ...data, facultyStandards: { ...data.facultyStandards, teachingStandards: updated } });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-slate-600 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: CPD WORKSHOPS */}
      {subTab === "workshops" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2F5187]">Continuous Professional Development (CPD) Workshops</h4>
            <button
              onClick={() => {
                const updated = [...(data.facultyStandards?.workshops || [])];
                updated.push({
                  domain: "New Professional Development Domain",
                  frequency: "Term-wise",
                  focus: "Pedagogical skill acquisition, digital rubrics, and child psychology.",
                });
                setData({ ...data, facultyStandards: { ...data.facultyStandards, workshops: updated } });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Workshop Block</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Training Domain / Title</th>
                  <th className="p-2.5">Schedule / Frequency</th>
                  <th className="p-2.5">Focus Outcomes</th>
                  <th className="p-2.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.facultyStandards?.workshops?.map((ws, idx) => (
                  <tr key={idx}>
                    <td className="p-2">
                      <input
                        type="text"
                        value={ws.domain}
                        onChange={(e) => {
                          const updated = [...data.facultyStandards.workshops];
                          updated[idx].domain = e.target.value;
                          setData({ ...data, facultyStandards: { ...data.facultyStandards, workshops: updated } });
                        }}
                        className="w-48 p-1.5 border border-slate-200 rounded font-bold text-[#2F5187]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={ws.frequency}
                        onChange={(e) => {
                          const updated = [...data.facultyStandards.workshops];
                          updated[idx].frequency = e.target.value;
                          setData({ ...data, facultyStandards: { ...data.facultyStandards, workshops: updated } });
                        }}
                        className="w-32 p-1.5 border border-slate-200 rounded text-[#E87737] font-semibold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={ws.focus}
                        onChange={(e) => {
                          const updated = [...data.facultyStandards.workshops];
                          updated[idx].focus = e.target.value;
                          setData({ ...data, facultyStandards: { ...data.facultyStandards, workshops: updated } });
                        }}
                        className="w-full p-1.5 border border-slate-200 rounded"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => {
                          const updated = data.facultyStandards.workshops.filter((_, i) => i !== idx);
                          setData({ ...data, facultyStandards: { ...data.facultyStandards, workshops: updated } });
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

      {/* SUB-TAB 5: STUDENT-TEACHER RATIO */}
      {subTab === "ratio" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#2F5187]">Stage-Wise Student-Teacher Ratio Structures</h4>
            <button
              onClick={() => {
                const updated = [...(data.facultyStandards?.ratioBreakdown || [])];
                updated.push({
                  stage: "New Stage Ratio",
                  ratio: "1:20",
                  support: "Co-teachers & support assistants",
                  focus: "Individual learning check-ins",
                });
                setData({ ...data, facultyStandards: { ...data.facultyStandards, ratioBreakdown: updated } });
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Ratio Stage Row</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Developmental Stage Name</th>
                  <th className="p-2.5">Ratio</th>
                  <th className="p-2.5">Staffing Support</th>
                  <th className="p-2.5">Mentorship Focus</th>
                  <th className="p-2.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.facultyStandards?.ratioBreakdown?.map((row, idx) => (
                  <tr key={idx}>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.stage}
                        onChange={(e) => {
                          const updated = [...data.facultyStandards.ratioBreakdown];
                          updated[idx].stage = e.target.value;
                          setData({ ...data, facultyStandards: { ...data.facultyStandards, ratioBreakdown: updated } });
                        }}
                        className="w-48 p-1.5 border border-slate-200 rounded font-bold text-[#2F5187]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.ratio}
                        onChange={(e) => {
                          const updated = [...data.facultyStandards.ratioBreakdown];
                          updated[idx].ratio = e.target.value;
                          setData({ ...data, facultyStandards: { ...data.facultyStandards, ratioBreakdown: updated } });
                        }}
                        className="w-20 p-1.5 border border-slate-200 rounded font-bold text-[#E87737]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.support}
                        onChange={(e) => {
                          const updated = [...data.facultyStandards.ratioBreakdown];
                          updated[idx].support = e.target.value;
                          setData({ ...data, facultyStandards: { ...data.facultyStandards, ratioBreakdown: updated } });
                        }}
                        className="w-56 p-1.5 border border-slate-200 rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={row.focus}
                        onChange={(e) => {
                          const updated = [...data.facultyStandards.ratioBreakdown];
                          updated[idx].focus = e.target.value;
                          setData({ ...data, facultyStandards: { ...data.facultyStandards, ratioBreakdown: updated } });
                        }}
                        className="w-full p-1.5 border border-slate-200 rounded"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => {
                          const updated = data.facultyStandards.ratioBreakdown.filter((_, i) => i !== idx);
                          setData({ ...data, facultyStandards: { ...data.facultyStandards, ratioBreakdown: updated } });
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
    </div>
  );
};
