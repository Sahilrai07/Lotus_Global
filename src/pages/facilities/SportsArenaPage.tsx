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
      sport: "Cricket & Net Practice",
      type: "Outdoor",
      focus: "Batting technique, bowling precision, fielding coordination.",
    },
    {
      sport: "Football & Athletics Track",
      type: "Outdoor",
      focus: "Cardiovascular stamina, team communication, tactical awareness.",
    },
    {
      sport: "Volleyball & Badminton",
      type: "Outdoor / Semi-Indoor",
      focus: "Hand-eye agility, reflex conditioning, quick decision making.",
    },
    {
      sport: "Table Tennis & Strategy Games",
      type: "Indoor Arena",
      focus: "Fine motor control, focus, spatial anticipation, and chess strategy.",
    },
    {
      sport: "Yoga & Physical Conditioning",
      type: "Wellness",
      focus: "Flexibility, breath regulation, mindfulness, and postural posture.",
    },
  ];

  return (
    <InternalPageLayout
      title="Sports & Athletics Arena"
      category="CAMPUS FACILITIES"
      activePageId="facility-sports"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Facilities", pageId: "facilities" },
        { label: "Sports Arena" },
      ]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Physical Conditioning & Team Athletics
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Sports Infrastructure & Athletic Arena
          </h2>
        </div>

        {/* Lead Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200 items-center">
          <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80"
              alt="Sports Infrastructure at Lotus Global School"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Building Resilience, Sportsmanship & Physical Agility
            </h3>
            <p className="leading-relaxed font-medium">
              Physical education is an indispensable component of the school curriculum at Lotus Global School.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our campus in Vatar, Vapi incorporates outdoor sports grounds, dedicated practice pitches, and an indoor strategy games arena. Trained sports coaches oversee structured training sessions, instilling fair play, mutual encouragement, and competitive grit.
            </p>
          </div>
        </div>

        {/* Sports Offerings Table */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#E87737]" />
            <span>Athletic Disciplines & Infrastructure</span>
          </h3>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3]">Discipline</th>
                  <th className="p-3 border-r border-[#3d65a3]">Environment</th>
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

        {/* Action Prompt */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Tour our sports arena and campus athletic grounds in Vatar, Vapi.
          </span>
          <button
            onClick={openInquiry}
            className="px-5 py-2.5 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
          >
            Admissions Inquiry
          </button>
        </div>
      </div>
    </InternalPageLayout>
  );
};
