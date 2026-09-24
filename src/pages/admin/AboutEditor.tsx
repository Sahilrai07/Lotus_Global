import React, { useState } from "react";
import { Info, Target, Compass, MapPin, Upload, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { SiteData, UploadFolder } from "../../data/siteDataService";

interface AboutEditorProps {
  data: SiteData;
  setData: (data: SiteData) => void;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    folder: UploadFolder,
    onUploaded: (url: string, fileName?: string, fileSize?: string) => void
  ) => void;
}

export const AboutEditor: React.FC<AboutEditorProps> = ({
  data,
  setData,
  handleFileUpload,
}) => {
  const [subTab, setSubTab] = useState<"about" | "vision" | "values" | "location">("about");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-display text-[#2F5187]">About Us, Vision & Campus Location</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage institutional profile, mission commitments, core values, and campus location transit narratives.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: "about", label: "About Overview & Distinctions", icon: Info },
          { id: "vision", label: "Vision & Mission Statement", icon: Target },
          { id: "values", label: "Core Values (Dedication, Diligence, Discipline)", icon: Compass },
          { id: "location", label: "Location, Landmark & Hours", icon: MapPin },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = subTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
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

      {/* SUB-TAB 1: ABOUT OVERVIEW */}
      {subTab === "about" && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#2F5187] border-b border-slate-100 pb-2">
              Main About Page Headings & Lead Quote
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Page Heading</label>
                <input
                  type="text"
                  value={data.aboutPage?.heading || ""}
                  onChange={(e) =>
                    setData({ ...data, aboutPage: { ...data.aboutPage, heading: e.target.value } })
                  }
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sub-heading</label>
                <input
                  type="text"
                  value={data.aboutPage?.subheading || ""}
                  onChange={(e) =>
                    setData({ ...data, aboutPage: { ...data.aboutPage, subheading: e.target.value } })
                  }
                  className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lead Quote</label>
              <textarea
                rows={2}
                value={data.aboutPage?.leadQuote || ""}
                onChange={(e) =>
                  setData({ ...data, aboutPage: { ...data.aboutPage, leadQuote: e.target.value } })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Lead Showcase Photo</label>
              <div className="flex items-center gap-3">
                <div className="w-24 h-16 rounded overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
                  {data.aboutPage?.leadImage ? (
                    <img src={data.aboutPage.leadImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  value={data.aboutPage?.leadImage || ""}
                  onChange={(e) =>
                    setData({ ...data, aboutPage: { ...data.aboutPage, leadImage: e.target.value } })
                  }
                  className="flex-1 text-xs p-2 rounded border border-slate-300 focus:border-[#2F5187]"
                />
                <label className="px-3 py-2 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e, "images", (url) =>
                        setData({ ...data, aboutPage: { ...data.aboutPage, leadImage: url } })
                      )
                    }
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Institutional Narrative */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#2F5187] border-b border-slate-100 pb-2">
              School Founding Story & Narrative Paragraphs
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Welcome Paragraph</label>
              <textarea
                rows={3}
                value={data.schoolInfo?.narrative?.leadParagraph || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    schoolInfo: {
                      ...data.schoolInfo,
                      narrative: { ...data.schoolInfo.narrative, leadParagraph: e.target.value },
                    },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pedagogical Philosophy</label>
              <textarea
                rows={3}
                value={data.schoolInfo?.narrative?.pedagogy || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    schoolInfo: {
                      ...data.schoolInfo,
                      narrative: { ...data.schoolInfo.narrative, pedagogy: e.target.value },
                    },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Future Outlook</label>
              <textarea
                rows={3}
                value={data.schoolInfo?.narrative?.outlook || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    schoolInfo: {
                      ...data.schoolInfo,
                      narrative: { ...data.schoolInfo.narrative, outlook: e.target.value },
                    },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 leading-relaxed"
              />
            </div>
          </div>

          {/* Institutional Distinctions */}
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#2F5187] border-b border-slate-100 pb-2">
              Four Core Distinctions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.aboutPage?.distinctions?.map((dist, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
                  <span className="text-[10px] font-bold text-[#E87737] uppercase">Pillar {idx + 1}</span>
                  <input
                    type="text"
                    value={dist.title}
                    onChange={(e) => {
                      const updated = [...data.aboutPage.distinctions];
                      updated[idx].title = e.target.value;
                      setData({ ...data, aboutPage: { ...data.aboutPage, distinctions: updated } });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                  />
                  <textarea
                    rows={2}
                    value={dist.description}
                    onChange={(e) => {
                      const updated = [...data.aboutPage.distinctions];
                      updated[idx].description = e.target.value;
                      setData({ ...data, aboutPage: { ...data.aboutPage, distinctions: updated } });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-slate-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: VISION & MISSION */}
      {subTab === "vision" && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#2F5187] border-b border-slate-100 pb-2">
              Vision & Golden Educational Rule
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Golden Rule Statement</label>
              <textarea
                rows={2}
                value={data.visionMissionPage?.goldenRule || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    visionMissionPage: { ...data.visionMissionPage, goldenRule: e.target.value },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 font-bold text-[#2F5187]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Vision Statement</label>
              <textarea
                rows={3}
                value={data.visionMissionPage?.visionStatement || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    visionMissionPage: {
                      ...data.visionMissionPage,
                      visionStatement: e.target.value,
                    },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 leading-relaxed"
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#2F5187] border-b border-slate-100 pb-2">
              Mission Statement & Commitments
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mission Statement</label>
              <textarea
                rows={3}
                value={data.visionMissionPage?.missionStatement || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    visionMissionPage: {
                      ...data.visionMissionPage,
                      missionStatement: e.target.value,
                    },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 leading-relaxed"
              />
            </div>
            <div className="space-y-3">
              {data.visionMissionPage?.missionCommitments?.map((comm, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
                  <span className="text-[10px] font-bold text-[#E87737] uppercase">Commitment {idx + 1}</span>
                  <input
                    type="text"
                    value={comm.title}
                    onChange={(e) => {
                      const updated = [...data.visionMissionPage.missionCommitments];
                      updated[idx].title = e.target.value;
                      setData({
                        ...data,
                        visionMissionPage: {
                          ...data.visionMissionPage,
                          missionCommitments: updated,
                        },
                      });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                  />
                  <textarea
                    rows={2}
                    value={comm.description}
                    onChange={(e) => {
                      const updated = [...data.visionMissionPage.missionCommitments];
                      updated[idx].description = e.target.value;
                      setData({
                        ...data,
                        visionMissionPage: {
                          ...data.visionMissionPage,
                          missionCommitments: updated,
                        },
                      });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-slate-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CORE VALUES */}
      {subTab === "values" && (
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-[#2F5187] border-b border-slate-100 pb-2">
            Motto & Three Founding Pillars
          </h3>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Motto Text</label>
            <input
              type="text"
              value={data.schoolInfo?.motto || ""}
              onChange={(e) =>
                setData({ ...data, schoolInfo: { ...data.schoolInfo, motto: e.target.value } })
              }
              className="w-full text-xs p-2 rounded border border-slate-300 font-bold text-[#E87737]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-display font-bold text-sm text-[#2F5187] block">Dedication</span>
              <input
                type="text"
                value={data.schoolInfo?.mottoValues?.dedication?.short || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    schoolInfo: {
                      ...data.schoolInfo,
                      mottoValues: {
                        ...data.schoolInfo.mottoValues,
                        dedication: { ...data.schoolInfo.mottoValues.dedication, short: e.target.value },
                      },
                    },
                  })
                }
                className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-semibold text-[#E87737]"
              />
              <textarea
                rows={4}
                value={data.schoolInfo?.mottoValues?.dedication?.full || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    schoolInfo: {
                      ...data.schoolInfo,
                      mottoValues: {
                        ...data.schoolInfo.mottoValues,
                        dedication: { ...data.schoolInfo.mottoValues.dedication, full: e.target.value },
                      },
                    },
                  })
                }
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded leading-relaxed"
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-display font-bold text-sm text-[#2F5187] block">Diligence</span>
              <input
                type="text"
                value={data.schoolInfo?.mottoValues?.diligence?.short || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    schoolInfo: {
                      ...data.schoolInfo,
                      mottoValues: {
                        ...data.schoolInfo.mottoValues,
                        diligence: { ...data.schoolInfo.mottoValues.diligence, short: e.target.value },
                      },
                    },
                  })
                }
                className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-semibold text-[#E87737]"
              />
              <textarea
                rows={4}
                value={data.schoolInfo?.mottoValues?.diligence?.full || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    schoolInfo: {
                      ...data.schoolInfo,
                      mottoValues: {
                        ...data.schoolInfo.mottoValues,
                        diligence: { ...data.schoolInfo.mottoValues.diligence, full: e.target.value },
                      },
                    },
                  })
                }
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded leading-relaxed"
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
              <span className="font-display font-bold text-sm text-[#2F5187] block">Discipline</span>
              <input
                type="text"
                value={data.schoolInfo?.mottoValues?.discipline?.short || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    schoolInfo: {
                      ...data.schoolInfo,
                      mottoValues: {
                        ...data.schoolInfo.mottoValues,
                        discipline: { ...data.schoolInfo.mottoValues.discipline, short: e.target.value },
                      },
                    },
                  })
                }
                className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-semibold text-[#E87737]"
              />
              <textarea
                rows={4}
                value={data.schoolInfo?.mottoValues?.discipline?.full || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    schoolInfo: {
                      ...data.schoolInfo,
                      mottoValues: {
                        ...data.schoolInfo.mottoValues,
                        discipline: { ...data.schoolInfo.mottoValues.discipline, full: e.target.value },
                      },
                    },
                  })
                }
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded leading-relaxed"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: CAMPUS LOCATION */}
      {subTab === "location" && (
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-[#2F5187] border-b border-slate-100 pb-2">
            Campus Location & Transport Corridors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Prominent Landmark</label>
              <input
                type="text"
                value={data.locationPage?.landmark || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    locationPage: { ...data.locationPage, landmark: e.target.value },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 font-bold text-[#2F5187]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Administrative Visiting Hours</label>
              <input
                type="text"
                value={data.locationPage?.visitingHours || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    locationPage: { ...data.locationPage, visitingHours: e.target.value },
                  })
                }
                className="w-full text-xs p-2 rounded border border-slate-300 font-semibold text-[#E87737]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Campus Environment Description</label>
            <textarea
              rows={3}
              value={data.locationPage?.environmentDescription || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  locationPage: { ...data.locationPage, environmentDescription: e.target.value },
                })
              }
              className="w-full text-xs p-2 rounded border border-slate-300 leading-relaxed"
            />
          </div>

          {/* Transit Corridors */}
          <div className="space-y-3 pt-2">
            <span className="font-bold text-xs text-slate-700 block">Accessibility & Transit Corridors</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.locationPage?.transitCorridors?.map((corridor, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
                  <input
                    type="text"
                    value={corridor.corridor}
                    onChange={(e) => {
                      const updated = [...data.locationPage.transitCorridors];
                      updated[idx].corridor = e.target.value;
                      setData({ ...data, locationPage: { ...data.locationPage, transitCorridors: updated } });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded font-bold text-[#2F5187]"
                  />
                  <input
                    type="text"
                    value={corridor.distance}
                    onChange={(e) => {
                      const updated = [...data.locationPage.transitCorridors];
                      updated[idx].distance = e.target.value;
                      setData({ ...data, locationPage: { ...data.locationPage, transitCorridors: updated } });
                    }}
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded text-slate-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
