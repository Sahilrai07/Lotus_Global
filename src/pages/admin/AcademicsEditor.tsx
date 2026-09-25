import React, { useState } from "react";
import { GraduationCap, Calendar, Clock, Award, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { SiteData } from "../../data/siteDataService";

interface AcademicsEditorProps {
  data: SiteData;
  setData: (data: SiteData) => void;
}

export const AcademicsEditor: React.FC<AcademicsEditorProps> = ({ data, setData }) => {
  const [subTab, setSubTab] = useState<"stages" | "assessment" | "timings">("stages");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-display text-[#2F5187]">Academics & Curricular Framework</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage NEP 2020 developmental stages, CBSE assessment schemes, and wing-wise daily bell timings.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: "stages", label: "4 Curricular Stages & Overview", icon: GraduationCap },
          { id: "assessment", label: "Assessment Scheme & Grading Scale", icon: Award },
          { id: "timings", label: "School Timings & Daily Schedule", icon: Clock },
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

      {/* SUB-TAB 1: CURRICULAR STAGES & OVERVIEW */}
      {subTab === "stages" && (
        <div className="space-y-6">
          {/* Main Academics Page Overview Text */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#2F5187] border-b border-slate-100 pb-2">
              Main Academics Landing Page Text
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Page Heading</label>
                <input
                  type="text"
                  value={data.academicsPage?.heading || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      academicsPage: { ...data.academicsPage, heading: e.target.value },
                    })
                  }
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sub-heading</label>
                <input
                  type="text"
                  value={data.academicsPage?.subheading || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      academicsPage: { ...data.academicsPage, subheading: e.target.value },
                    })
                  }
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lead Curriculum Paragraph</label>
              <textarea
                rows={3}
                value={data.academicsPage?.leadParagraph || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    academicsPage: { ...data.academicsPage, leadParagraph: e.target.value },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187] leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Academic Sub-Text / Delivery Model</label>
              <textarea
                rows={2}
                value={data.academicsPage?.subText || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    academicsPage: { ...data.academicsPage, subText: e.target.value },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187] leading-relaxed"
              />
            </div>
          </div>

          {/* Stages Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#2F5187]">Developmental Stages (NEP 2020: 5+3+3+4)</h3>
              <button
                onClick={() => {
                  const updated = [...(data.academicStages || [])];
                  const nextNum = (updated.length + 1).toString();
                  updated.push({
                    stageNumber: nextNum,
                    phase: "New Curricular Stage",
                    levels: "Grades X to Y",
                    focus: "Stage learning goals and focus areas",
                    description: "Pedagogical model, experiential inquiry, and developmental outcomes for this stage.",
                  });
                  setData({ ...data, academicStages: updated });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Curricular Stage Block</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.academicStages?.map((stage, idx) => (
                <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase text-[#E87737]">Stage {stage.stageNumber || idx + 1}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {stage.levels}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const updated = data.academicStages.filter((_, i) => i !== idx);
                        setData({ ...data, academicStages: updated });
                      }}
                      className="text-rose-600 hover:text-rose-700 p-1 text-xs flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Stage</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Stage Number</label>
                      <input
                        type="text"
                        value={stage.stageNumber}
                        onChange={(e) => {
                          const updated = [...data.academicStages];
                          updated[idx].stageNumber = e.target.value;
                          setData({ ...data, academicStages: updated });
                        }}
                        className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-[#2F5187] mb-1">
                        Stage Title / Heading <span className="text-[#E87737] font-semibold">(e.g. Foundational Stage, Preparatory Stage)</span>
                      </label>
                      <input
                        type="text"
                        value={stage.phase}
                        onChange={(e) => {
                          const updated = [...data.academicStages];
                          updated[idx].phase = e.target.value;
                          setData({ ...data, academicStages: updated });
                        }}
                        placeholder="e.g. Foundational Stage"
                        className="w-full text-xs p-2 rounded border-2 border-amber-200/80 bg-amber-50/20 focus:border-[#2F5187] font-bold text-[#2F5187]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Levels / Grades</label>
                      <input
                        type="text"
                        value={stage.levels}
                        onChange={(e) => {
                          const updated = [...data.academicStages];
                          updated[idx].levels = e.target.value;
                          setData({ ...data, academicStages: updated });
                        }}
                        className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Core Focus Summary</label>
                      <input
                        type="text"
                        value={stage.focus}
                        onChange={(e) => {
                          const updated = [...data.academicStages];
                          updated[idx].focus = e.target.value;
                          setData({ ...data, academicStages: updated });
                        }}
                        className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Stage Description</label>
                    <textarea
                      rows={2}
                      value={stage.description}
                      onChange={(e) => {
                        const updated = [...data.academicStages];
                        updated[idx].description = e.target.value;
                        setData({ ...data, academicStages: updated });
                      }}
                      className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ASSESSMENT SCHEME */}
      {subTab === "assessment" && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#2F5187] border-b border-slate-100 pb-2">
              Scholastic & Co-Scholastic Assessment Policies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Scholastic Evaluation Summary</label>
                <textarea
                  rows={3}
                  value={data.assessmentScheme?.scholastic?.summary || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      assessmentScheme: {
                        ...data.assessmentScheme,
                        scholastic: {
                          ...data.assessmentScheme.scholastic,
                          summary: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Co-Scholastic Assessment Summary</label>
                <textarea
                  rows={3}
                  value={data.assessmentScheme?.coScholastic?.summary || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      assessmentScheme: {
                        ...data.assessmentScheme,
                        coScholastic: {
                          ...data.assessmentScheme.coScholastic,
                          summary: e.target.value,
                        },
                      },
                    })
                  }
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                />
              </div>
            </div>
          </div>

          {/* Grading Scale Table */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#2F5187]">Official CBSE 8-Point Grading Scale</h3>
              <button
                onClick={() => {
                  const updated = [...(data.assessmentScheme?.gradingScale || [])];
                  updated.push({ marksRange: "0-32%", grade: "E", remark: "Needs Targeted Remediation" });
                  setData({
                    ...data,
                    assessmentScheme: { ...data.assessmentScheme, gradingScale: updated },
                  });
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
                    <th className="p-2.5">Marks Range</th>
                    <th className="p-2.5">Grade</th>
                    <th className="p-2.5">Scholastic Remark</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.assessmentScheme?.gradingScale?.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.marksRange}
                          onChange={(e) => {
                            const updated = [...data.assessmentScheme.gradingScale];
                            updated[idx].marksRange = e.target.value;
                            setData({ ...data, assessmentScheme: { ...data.assessmentScheme, gradingScale: updated } });
                          }}
                          className="w-36 p-1.5 border border-slate-200 rounded"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.grade}
                          onChange={(e) => {
                            const updated = [...data.assessmentScheme.gradingScale];
                            updated[idx].grade = e.target.value;
                            setData({ ...data, assessmentScheme: { ...data.assessmentScheme, gradingScale: updated } });
                          }}
                          className="w-20 p-1.5 border border-slate-200 rounded font-bold text-[#E87737]"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.remark}
                          onChange={(e) => {
                            const updated = [...data.assessmentScheme.gradingScale];
                            updated[idx].remark = e.target.value;
                            setData({ ...data, assessmentScheme: { ...data.assessmentScheme, gradingScale: updated } });
                          }}
                          className="w-full p-1.5 border border-slate-200 rounded"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            const updated = data.assessmentScheme.gradingScale.filter((_, i) => i !== idx);
                            setData({ ...data, assessmentScheme: { ...data.assessmentScheme, gradingScale: updated } });
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
        </div>
      )}

      {/* SUB-TAB 3: SCHOOL TIMINGS */}
      {subTab === "timings" && (
        <div className="space-y-6">
          {/* Wing Timings */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#2F5187]">
                Wing-Wise Arrival & Departure Hours
              </h3>
              <button
                onClick={() => {
                  const updated = [...(data.schoolTimings?.wings || [])];
                  updated.push({
                    wing: "New Wing Name",
                    badge: "General Schedule",
                    badgeColor: "bg-blue-50 text-[#2F5187]",
                    timing: "08:00 AM – 02:00 PM",
                    days: "Monday – Friday",
                    highlights: "Core scholastic focus and co-curricular periods",
                  });
                  setData({ ...data, schoolTimings: { ...data.schoolTimings, wings: updated } });
                }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#2F5187] rounded text-xs font-bold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Wing Timing Block</span>
              </button>
            </div>

            <div className="space-y-3">
              {data.schoolTimings?.wings?.map((wing, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-[#E87737]">Wing #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = data.schoolTimings.wings.filter((_, i) => i !== idx);
                        setData({ ...data, schoolTimings: { ...data.schoolTimings, wings: updated } });
                      }}
                      className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Wing Name / Title</label>
                      <input
                        type="text"
                        value={wing.wing}
                        onChange={(e) => {
                          const updated = [...data.schoolTimings.wings];
                          updated[idx].wing = e.target.value;
                          setData({ ...data, schoolTimings: { ...data.schoolTimings, wings: updated } });
                        }}
                        className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-[#2F5187]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Daily Timings</label>
                      <input
                        type="text"
                        value={wing.timing}
                        onChange={(e) => {
                          const updated = [...data.schoolTimings.wings];
                          updated[idx].timing = e.target.value;
                          setData({ ...data, schoolTimings: { ...data.schoolTimings, wings: updated } });
                        }}
                        className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-[#E87737]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Operating Days</label>
                      <input
                        type="text"
                        value={wing.days}
                        onChange={(e) => {
                          const updated = [...data.schoolTimings.wings];
                          updated[idx].days = e.target.value;
                          setData({ ...data, schoolTimings: { ...data.schoolTimings, wings: updated } });
                        }}
                        className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Highlights & Focus</label>
                    <input
                      type="text"
                      value={wing.highlights}
                      onChange={(e) => {
                        const updated = [...data.schoolTimings.wings];
                        updated[idx].highlights = e.target.value;
                        setData({ ...data, schoolTimings: { ...data.schoolTimings, wings: updated } });
                      }}
                      className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Schedule Table */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-sm text-[#2F5187]">
                Daily Period-Wise Bell Schedule
              </h3>
              <button
                onClick={() => {
                  const updated = [...(data.schoolTimings?.dailySchedule || [])];
                  updated.push({
                    time: "10:00 AM – 10:45 AM",
                    event: "New Academic Period",
                    desc: "Subject instruction and hands-on classroom activities.",
                    icon: "Clock",
                  });
                  setData({ ...data, schoolTimings: { ...data.schoolTimings, dailySchedule: updated } });
                }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#2F5187] rounded text-xs font-bold transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Schedule Period</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2.5">Timing Duration</th>
                    <th className="p-2.5">Academic Event / Period</th>
                    <th className="p-2.5">Description</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.schoolTimings?.dailySchedule?.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.time}
                          onChange={(e) => {
                            const updated = [...data.schoolTimings.dailySchedule];
                            updated[idx].time = e.target.value;
                            setData({ ...data, schoolTimings: { ...data.schoolTimings, dailySchedule: updated } });
                          }}
                          className="w-48 p-1.5 border border-slate-200 rounded font-mono text-[#E87737]"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.event}
                          onChange={(e) => {
                            const updated = [...data.schoolTimings.dailySchedule];
                            updated[idx].event = e.target.value;
                            setData({ ...data, schoolTimings: { ...data.schoolTimings, dailySchedule: updated } });
                          }}
                          className="w-56 p-1.5 border border-slate-200 rounded font-bold text-[#2F5187]"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={row.desc}
                          onChange={(e) => {
                            const updated = [...data.schoolTimings.dailySchedule];
                            updated[idx].desc = e.target.value;
                            setData({ ...data, schoolTimings: { ...data.schoolTimings, dailySchedule: updated } });
                          }}
                          className="w-full p-1.5 border border-slate-200 rounded"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            const updated = data.schoolTimings.dailySchedule.filter((_, i) => i !== idx);
                            setData({ ...data, schoolTimings: { ...data.schoolTimings, dailySchedule: updated } });
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
        </div>
      )}
    </div>
  );
};
