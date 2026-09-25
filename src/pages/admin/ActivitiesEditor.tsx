import React, { useState } from "react";
import { Trophy, Palette, Users, Shield, Plus, Trash2 } from "lucide-react";
import { SiteData } from "../../data/siteDataService";

interface ActivitiesEditorProps {
  data: SiteData;
  setData: (data: SiteData) => void;
}

export const ActivitiesEditor: React.FC<ActivitiesEditorProps> = ({ data, setData }) => {
  const [subTab, setSubTab] = useState<"sports" | "arts" | "clubs" | "houses">("sports");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-display text-[#2F5187]">Co-Curricular & Student Life</h2>
        <p className="text-xs text-slate-500 mt-1">
          Edit athletic tournaments, visual & performing arts disciplines, student innovation clubs, and four-house system.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: "sports", label: "Sports Tournaments", icon: Trophy },
          { id: "arts", label: "Arts & Culture", icon: Palette },
          { id: "clubs", label: "Student Clubs", icon: Users },
          { id: "houses", label: "Four-House System", icon: Shield },
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

      {/* SUB-TAB 1: SPORTS TOURNAMENTS */}
      {subTab === "sports" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#2F5187]">Athletic Competitions & Leagues</h3>
            <button
              onClick={() => {
                const updated = [...(data.coCurricular?.sportsTournaments || [])];
                updated.push({
                  title: "New Sports Tournament",
                  season: "Term / Season",
                  desc: "Tournament description and competitive scope.",
                  highlight: "Championship Trophy / Medals",
                  badge: "Sports",
                });
                setData({ ...data, coCurricular: { ...data.coCurricular, sportsTournaments: updated } });
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#2F5187] rounded text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Tournament</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.coCurricular?.sportsTournaments?.map((tourney, idx) => (
              <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold uppercase text-[#E87737]">Tournament {idx + 1}</span>
                  <button
                    onClick={() => {
                      const updated = data.coCurricular.sportsTournaments.filter((_, i) => i !== idx);
                      setData({ ...data, coCurricular: { ...data.coCurricular, sportsTournaments: updated } });
                    }}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Title</label>
                    <input
                      type="text"
                      value={tourney.title}
                      onChange={(e) => {
                        const updated = [...data.coCurricular.sportsTournaments];
                        updated[idx].title = e.target.value;
                        setData({ ...data, coCurricular: { ...data.coCurricular, sportsTournaments: updated } });
                      }}
                      className="w-full text-xs p-1.5 border border-slate-300 rounded font-bold text-[#2F5187]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Badge / Discipline</label>
                    <input
                      type="text"
                      value={tourney.badge}
                      onChange={(e) => {
                        const updated = [...data.coCurricular.sportsTournaments];
                        updated[idx].badge = e.target.value;
                        setData({ ...data, coCurricular: { ...data.coCurricular, sportsTournaments: updated } });
                      }}
                      className="w-full text-xs p-1.5 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Season / Schedule</label>
                    <input
                      type="text"
                      value={tourney.season}
                      onChange={(e) => {
                        const updated = [...data.coCurricular.sportsTournaments];
                        updated[idx].season = e.target.value;
                        setData({ ...data, coCurricular: { ...data.coCurricular, sportsTournaments: updated } });
                      }}
                      className="w-full text-xs p-1.5 border border-slate-300 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Award / Honor</label>
                    <input
                      type="text"
                      value={tourney.highlight}
                      onChange={(e) => {
                        const updated = [...data.coCurricular.sportsTournaments];
                        updated[idx].highlight = e.target.value;
                        setData({ ...data, coCurricular: { ...data.coCurricular, sportsTournaments: updated } });
                      }}
                      className="w-full text-xs p-1.5 border border-slate-300 rounded text-[#E87737] font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Description</label>
                  <textarea
                    rows={2}
                    value={tourney.desc}
                    onChange={(e) => {
                      const updated = [...data.coCurricular.sportsTournaments];
                      updated[idx].desc = e.target.value;
                      setData({ ...data, coCurricular: { ...data.coCurricular, sportsTournaments: updated } });
                    }}
                    className="w-full text-xs p-1.5 border border-slate-300 rounded leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ARTS & CULTURE */}
      {subTab === "arts" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#2F5187]">Visual & Performing Arts Disciplines</h3>
              <p className="text-xs text-slate-500">Add or edit fine arts, music, dance, and theatre programs.</p>
            </div>
            <button
              onClick={() => {
                const updated = [...(data.coCurricular?.artsDisciplines || [])];
                updated.push({
                  name: `Art Discipline ${updated.length + 1}`,
                  desc: "Curricular overview of this creative and artistic discipline.",
                  outcomes: "Creative expression, technical discipline and confidence.",
                  icon: "Sparkles",
                });
                setData({ ...data, coCurricular: { ...data.coCurricular, artsDisciplines: updated } });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2F5187] text-white hover:bg-[#233d66] rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add Art Discipline Block</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.coCurricular?.artsDisciplines?.map((art, idx) => (
              <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold uppercase text-[#E87737]">Art Stream #{idx + 1}</span>
                  <button
                    onClick={() => {
                      const updated = data.coCurricular.artsDisciplines.filter((_, i) => i !== idx);
                      setData({ ...data, coCurricular: { ...data.coCurricular, artsDisciplines: updated } });
                    }}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded text-xs flex items-center gap-1"
                    title="Delete Art Discipline"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Discipline Title / Card Heading
                  </label>
                  <input
                    type="text"
                    value={art.name}
                    onChange={(e) => {
                      const updated = [...data.coCurricular.artsDisciplines];
                      updated[idx].name = e.target.value;
                      setData({ ...data, coCurricular: { ...data.coCurricular, artsDisciplines: updated } });
                    }}
                    placeholder="e.g. Hindustani Classical Vocal & Instrumental"
                    className="w-full text-xs p-2 border border-slate-300 rounded font-bold text-[#2F5187] bg-slate-50 focus:bg-white focus:border-[#2F5187]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Training Curriculum</label>
                  <textarea
                    rows={2}
                    value={art.desc}
                    onChange={(e) => {
                      const updated = [...data.coCurricular.artsDisciplines];
                      updated[idx].desc = e.target.value;
                      setData({ ...data, coCurricular: { ...data.coCurricular, artsDisciplines: updated } });
                    }}
                    className="w-full text-xs p-1.5 border border-slate-300 rounded leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Core Learning Outcome</label>
                  <input
                    type="text"
                    value={art.outcomes}
                    onChange={(e) => {
                      const updated = [...data.coCurricular.artsDisciplines];
                      updated[idx].outcomes = e.target.value;
                      setData({ ...data, coCurricular: { ...data.coCurricular, artsDisciplines: updated } });
                    }}
                    className="w-full text-xs p-1.5 border border-slate-300 rounded text-slate-700"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: STUDENT CLUBS */}
      {subTab === "clubs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#2F5187]">Student Co-Curricular Clubs</h3>
            <button
              onClick={() => {
                const updated = [...(data.coCurricular?.studentClubs || [])];
                updated.push({
                  name: "New Student Club",
                  icon: "Lightbulb",
                  tag: "Special Interest",
                  description: "Club mission, project activities, and weekly schedule.",
                });
                setData({ ...data, coCurricular: { ...data.coCurricular, studentClubs: updated } });
              }}
              className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-[#2F5187] rounded text-xs font-bold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Club</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.coCurricular?.studentClubs?.map((club, idx) => (
              <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold uppercase text-[#E87737]">Club {idx + 1}</span>
                  <button
                    onClick={() => {
                      const updated = data.coCurricular.studentClubs.filter((_, i) => i !== idx);
                      setData({ ...data, coCurricular: { ...data.coCurricular, studentClubs: updated } });
                    }}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Club Name</label>
                    <input
                      type="text"
                      value={club.name}
                      onChange={(e) => {
                        const updated = [...data.coCurricular.studentClubs];
                        updated[idx].name = e.target.value;
                        setData({ ...data, coCurricular: { ...data.coCurricular, studentClubs: updated } });
                      }}
                      className="w-full text-xs p-1.5 border border-slate-300 rounded font-bold text-[#2F5187]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Theme / Category</label>
                    <input
                      type="text"
                      value={club.tag}
                      onChange={(e) => {
                        const updated = [...data.coCurricular.studentClubs];
                        updated[idx].tag = e.target.value;
                        setData({ ...data, coCurricular: { ...data.coCurricular, studentClubs: updated } });
                      }}
                      className="w-full text-xs p-1.5 border border-slate-300 rounded text-[#E87737]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Club Focus & Projects</label>
                  <textarea
                    rows={2}
                    value={club.description}
                    onChange={(e) => {
                      const updated = [...data.coCurricular.studentClubs];
                      updated[idx].description = e.target.value;
                      setData({ ...data, coCurricular: { ...data.coCurricular, studentClubs: updated } });
                    }}
                    className="w-full text-xs p-1.5 border border-slate-300 rounded leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: FOUR-HOUSE SYSTEM */}
      {subTab === "houses" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-[#2F5187]">Four-House System & Elements</h3>
              <p className="text-xs text-slate-500">Add or customize institutional house names, elemental values, and mottos.</p>
            </div>
            <button
              onClick={() => {
                const updated = [...(data.coCurricular?.houses || [])];
                updated.push({
                  name: `House ${updated.length + 1}`,
                  element: "Ether",
                  color: "#E87737",
                  border: "border-orange-500",
                  text: "text-orange-600",
                  motto: "Honor, Wisdom, and Harmony",
                  description: "Philosophy and cultural ethos representing this student house.",
                });
                setData({ ...data, coCurricular: { ...data.coCurricular, houses: updated } });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2F5187] text-white hover:bg-[#233d66] rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Add House Block</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.coCurricular?.houses?.map((house, idx) => (
              <div key={idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold uppercase text-[#E87737]">House #{idx + 1}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Element: {house.element}
                    </span>
                    <button
                      onClick={() => {
                        const updated = data.coCurricular.houses.filter((_, i) => i !== idx);
                        setData({ ...data, coCurricular: { ...data.coCurricular, houses: updated } });
                      }}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded text-xs flex items-center gap-1"
                      title="Delete House"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">House Name / Block Heading</label>
                    <input
                      type="text"
                      value={house.name}
                      onChange={(e) => {
                        const updated = [...data.coCurricular.houses];
                        updated[idx].name = e.target.value;
                        setData({ ...data, coCurricular: { ...data.coCurricular, houses: updated } });
                      }}
                      className="w-full text-xs p-2 border border-slate-300 rounded font-bold text-[#2F5187] bg-slate-50 focus:bg-white focus:border-[#2F5187]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Natural Element</label>
                    <input
                      type="text"
                      value={house.element}
                      onChange={(e) => {
                        const updated = [...data.coCurricular.houses];
                        updated[idx].element = e.target.value;
                        setData({ ...data, coCurricular: { ...data.coCurricular, houses: updated } });
                      }}
                      className="w-full text-xs p-2 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">House Motto</label>
                  <input
                    type="text"
                    value={house.motto}
                    onChange={(e) => {
                      const updated = [...data.coCurricular.houses];
                      updated[idx].motto = e.target.value;
                      setData({ ...data, coCurricular: { ...data.coCurricular, houses: updated } });
                    }}
                    className="w-full text-xs p-1.5 border border-slate-300 rounded font-semibold text-[#E87737]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">House Philosophy</label>
                  <textarea
                    rows={2}
                    value={house.description}
                    onChange={(e) => {
                      const updated = [...data.coCurricular.houses];
                      updated[idx].description = e.target.value;
                      setData({ ...data, coCurricular: { ...data.coCurricular, houses: updated } });
                    }}
                    className="w-full text-xs p-1.5 border border-slate-300 rounded leading-relaxed"
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
