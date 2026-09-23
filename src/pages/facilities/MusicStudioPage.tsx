import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { Music, CheckCircle2, Sparkles, Mic2, Radio, Heart } from "lucide-react";

interface MusicStudioPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const MusicStudioPage: React.FC<MusicStudioPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  return (
    <InternalPageLayout
      title="Music & Cultural Studio"
      category="CAMPUS FACILITIES"
      activePageId="facility-music"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Facilities", pageId: "facilities" },
        { label: "Music & Cultural Studio" },
      ]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Aesthetic Harmony & Performing Arts
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Music, Dance & Cultural Expression Studio
          </h2>
        </div>

        {/* Lead Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200 items-center">
          <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80"
              alt="Music Studio at Lotus Global School"
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Harmonizing Mind, Rhythm & Creative Expression
            </h3>
            <p className="leading-relaxed font-medium">
              Art and cultural training unlock children's inherent aesthetic sensibilities, auditory discrimination, and emotional maturity.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our acoustically treated music studio is fitted with Indian classical and contemporary instruments. Led by dedicated instructors, children explore vocal solfege, rhythm cycles (taal), choral arrangements, and theatrical dramatics.
            </p>
          </div>
        </div>

        {/* Facilities & Instruments Showcase */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Music className="w-5 h-5 text-[#E87737]" />
            <span>Studio Capabilities & Instrumentation</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <Radio className="w-4 h-4 text-[#E87737]" />
                <span>Indian Classical Instruments</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Harmoniums, tabla sets, tanpura, and dholak provide a strong grounding in classical Indian melody and rhythm.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <Music className="w-4 h-4 text-[#2F5187]" />
                <span>Western Keyboards & Strings</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Electronic synthesisers, acoustic guitars, and percussion kits foster global musical literacy and hand coordination.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <Mic2 className="w-4 h-4 text-[#E87737]" />
                <span>Vocal Training & Choirs</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Breathing exercises, pitch alignment, patriotic hymns, folk melodies, and school anthems rehearsed in group resonance.
              </p>
            </div>
          </div>
        </div>

        {/* Cultural Performance Opportunities */}
        <div className="p-5 rounded bg-[#FFF5EE] border-l-4 border-[#E87737] space-y-2 text-xs">
          <span className="font-bold text-[#2F5187] uppercase block text-sm">
            Annual Day, Exhibitions & Stage Presentations
          </span>
          <p className="text-slate-700 leading-relaxed">
            Students showcase their musical, dance, and dramatic accomplishments during the school's Annual Day celebrations, festival assemblies, and inter-school cultural meets, instilling poise, self-assurance, and public speaking courage.
          </p>
        </div>
      </div>
    </InternalPageLayout>
  );
};
