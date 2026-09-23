import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import {
  Trophy,
  Activity,
  CheckCircle2,
  Target,
  Brain,
  Sparkles,
  Shield,
  ArrowRight,
} from "lucide-react";

interface IndoorGamesPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const IndoorGamesPage: React.FC<IndoorGamesPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const indoorOfferings = [
    {
      sport: "Table Tennis Arena",
      equipment: "Tournament Stag / Stiga tables with anti-glare tops",
      flooring: "Non-slip cushioned sports flooring",
      focus: "Lightning reflexes, hand-eye coordination, rapid spin calculation.",
    },
    {
      sport: "Chess & Mind Sports Room",
      equipment: "Tournament Staunton weighted pieces & DGT digital clocks",
      flooring: "Acoustically insulated quiet sanctum",
      focus: "Spatial visualization, positional strategy, analytical patience.",
    },
    {
      sport: "Carrom & Board Strategy Stations",
      equipment: "Champion-grade 3-inch English ply boards & precision coins",
      flooring: "Ergonomic seating & posture-aligned tables",
      focus: "Fine motor control, angle geometry, delicate touch.",
    },
    {
      sport: "Covered Badminton Arena",
      equipment: "Tournament-grade nets, lightweight carbon racquets",
      flooring: "Anti-skid synthetic court markings",
      focus: "Footwork agility, wrist snap, smash power, and recovery speed.",
    },
    {
      sport: "Yoga & Mindfulness Studio",
      equipment: "High-density non-toxic yoga mats, meditation blocks",
      flooring: "Polished hardwood studio with posture-alignment mirrors",
      focus: "Flexibility, core strength, Pranayama breathwork, and inner calm.",
    },
  ];

  return (
    <InternalPageLayout
      title="Indoor Games & Sports Arena"
      category="CAMPUS FACILITIES"
      activePageId="facility-indoor-games"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Facilities", pageId: "facilities" },
        { label: "Indoor Games & Arena" },
      ]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Reflexes, Strategy & Year-Round Fitness
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Indoor Games & Sports Arena
          </h2>
        </div>

        {/* Lead Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded-lg border border-slate-200 items-center">
          <div className="md:col-span-5 rounded-lg overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
              alt="Indoor Sports Arena at Lotus Global School"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              All-Weather Athletic Excellence & Intellectual Strategy
            </h3>
            <p className="leading-relaxed font-medium">
              Physical education at Lotus Global School is not limited by weather conditions or seasonal monsoons.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our campus in Vatar, Vapi incorporates a dedicated Indoor Games & Sports Arena fitted with international-specification Table Tennis boards, chess and carrom stations, indoor court facilities, and a tranquil yoga studio. Under professional physical education mentors, students hone rapid motor reflexes and strategic problem-solving skills.
            </p>
          </div>
        </div>

        {/* Indoor Offerings Table */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#E87737]" />
            <span>Indoor Athletic Disciplines & Arena Infrastructure</span>
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3]">Discipline</th>
                  <th className="p-3 border-r border-[#3d65a3]">Equipment & Specification</th>
                  <th className="p-3 border-r border-[#3d65a3]">Flooring & Environment</th>
                  <th className="p-3">Skill & Fitness Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {indoorOfferings.map((sp, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC] hover:bg-slate-50"}
                  >
                    <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                      {sp.sport}
                    </td>
                    <td className="p-3 text-slate-700 border-r border-slate-200">
                      {sp.equipment}
                    </td>
                    <td className="p-3 font-medium text-slate-600 border-r border-slate-200">
                      {sp.flooring}
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

        {/* Pillar Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2 shadow-sm">
            <Activity className="w-5 h-5 text-[#E87737]" />
            <h4 className="font-bold text-xs uppercase text-[#2F5187]">
              Reflexes & Motor Precision
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Table Tennis and badminton condition split-second neuromuscular responses, rapid peripheral vision, and hand agility.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2 shadow-sm">
            <Brain className="w-5 h-5 text-[#2F5187]" />
            <h4 className="font-bold text-xs uppercase text-[#2F5187]">
              Strategic Mind Sports
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chess and carrom promote contemplative foresight, emotional restraint under clock pressure, and geometric pattern recognition.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2 shadow-sm">
            <Sparkles className="w-5 h-5 text-[#E25B88]" />
            <h4 className="font-bold text-xs uppercase text-[#2F5187]">
              All-Weather Continuity
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ensures student fitness routines, inter-house matches, and mental wellness activities proceed seamlessly 365 days a year.
            </p>
          </div>
        </div>

        {/* Cross-Link Card to Outdoor Sports */}
        <div className="p-5 bg-gradient-to-r from-[#2F5187]/5 to-[#E87737]/10 rounded-lg border border-[#2F5187]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#2F5187]">
              Explore Outdoor Athletic Fields & Grounds
            </h5>
            <p className="text-xs text-slate-600">
              Looking for our cricket practice turf nets, full-size football field, 200m running track, or volleyball courts?
            </p>
          </div>
          <button
            onClick={() => onNavigate("facility-sports")}
            className="px-4 py-2 bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold rounded shadow transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Outdoor Sports Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </InternalPageLayout>
  );
};
