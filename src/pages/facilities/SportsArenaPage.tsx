import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { Trophy, CheckCircle2, Target, HeartHandshake, Shield, Activity } from "lucide-react";

interface SportsArenaPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const SportsArenaPage: React.FC<SportsArenaPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const sportsOfferings = [
    {
      sport: "Cricket Turf & Practice Nets",
      type: "Outdoor Turf Pitch",
      focus: "Batting technique, spin/pace bowling precision, slip catching drills.",
    },
    {
      sport: "Football Field",
      type: "Outdoor Grass Outfield",
      focus: "Cardiovascular stamina, team positioning, passing accuracy, tactical formations.",
    },
    {
      sport: "Athletics Track & Field",
      type: "200m Running Track",
      focus: "Sprint mechanics (100m, 200m, 400m), relay handovers, long jump runways.",
    },
    {
      sport: "Volleyball & Throwball Court",
      type: "Outdoor Clay Court",
      focus: "Hand-eye agility, blocking reflexes, jumping power, and team communication.",
    },
    {
      sport: "Basketball & Multi-Sport Arena",
      type: "Hard-court Surface",
      focus: "Dribbling agility, perimeter shooting, lateral defensive footwork.",
    },
  ];

  return (
    <InternalPageLayout
      title="Outdoor Sports & Playgrounds"
      category="CAMPUS FACILITIES"
      activePageId="facility-sports"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Facilities", pageId: "facilities" },
        { label: "Outdoor Sports & Playgrounds" },
      ]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Physical Conditioning & Outdoor Team Athletics
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Outdoor Sports Grounds & Playgrounds
          </h2>
        </div>

        {/* Lead Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200 items-center">
          <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
              alt="Outdoor Sports Infrastructure at Lotus Global School"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Building Resilience, Sportsmanship & Physical Endurance
            </h3>
            <p className="leading-relaxed font-medium">
              Outdoor physical education is an indispensable component of the school curriculum at Lotus Global School.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our campus in Vatar, Vapi incorporates expansive outdoor sports grounds, dedicated turf cricket practice nets, full-size football outfield, and athletic tracks. Trained sports coaches oversee structured training sessions, instilling fair play, mutual encouragement, and competitive grit.
            </p>
          </div>
        </div>

        {/* Sports Offerings Table */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#E87737]" />
            <span>Outdoor Athletic Disciplines & Infrastructure</span>
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3]">Discipline</th>
                  <th className="p-3 border-r border-[#3d65a3]">Field / Ground Type</th>
                  <th className="p-3">Skill & Fitness Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {sportsOfferings.map((sp, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC] hover:bg-slate-50"}
                  >
                    <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                      {sp.sport}
                    </td>
                    <td className="p-3 font-semibold text-[#E87737] border-r border-slate-200">
                      {sp.type}
                    </td>
                    <td className="p-3 text-slate-600">
                      {sp.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Core Values in Sports */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded space-y-2 shadow-sm">
            <Activity className="w-5 h-5 text-[#E87737]" />
            <h4 className="font-bold text-xs uppercase text-[#2F5187]">
              Physical Stamina
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Regular cardio conditioning, coordination drills, and motor skill routines build lifelong physical wellness.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded space-y-2 shadow-sm">
            <HeartHandshake className="w-5 h-5 text-[#2F5187]" />
            <h4 className="font-bold text-xs uppercase text-[#2F5187]">
              Camaraderie & Fair Play
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Learning to win with humility, lose with grace, and honor the contributions of teammates and opponents alike.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded space-y-2 shadow-sm">
            <Target className="w-5 h-5 text-[#E25B88]" />
            <h4 className="font-bold text-xs uppercase text-[#2F5187]">
              Intra-House Leagues
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Annual Sports Day, inter-house championships, and athletic track meets encourage healthy competitive spirit.
            </p>
          </div>
        </div>

        {/* Cross-Link Card for Indoor Games */}
        <div className="p-5 bg-gradient-to-r from-[#2F5187]/5 to-[#E87737]/10 rounded-lg border border-[#2F5187]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#2F5187]">
              Looking for Indoor Games & Sports Arena?
            </h5>
            <p className="text-xs text-slate-600">
              Check out our Table Tennis arena, Chess room, Carrom stations, and covered indoor courts.
            </p>
          </div>
          <button
            onClick={() => onNavigate("facility-indoor-games")}
            className="px-4 py-2 bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold rounded shadow transition-colors shrink-0"
          >
            Indoor Games Page &rarr;
          </button>
        </div>
      </div>
    </InternalPageLayout>
  );
};
