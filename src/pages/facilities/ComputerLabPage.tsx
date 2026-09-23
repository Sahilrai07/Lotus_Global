import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { Monitor, ShieldCheck, CheckCircle2, Cpu, Terminal, Wifi } from "lucide-react";

import { getSiteData } from "../../data/siteDataService";

interface ComputerLabPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const ComputerLabPage: React.FC<ComputerLabPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const siteData = getSiteData();
  const lab = siteData.facilities.find((f) => f.id === "computer-lab");
  const bannerImage = siteData.pageBanners?.facilities || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80";

  return (
    <InternalPageLayout
      title={lab?.name || "Computer Laboratory"}
      category="CAMPUS FACILITIES"
      activePageId="facility-computer-lab"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[
        { label: "Facilities", pageId: "facilities" },
        { label: "Computer Laboratory" },
      ]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Digital Literacy & Computational Thinking
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            {lab?.name || "Computer Laboratory & Digital Media Studio"}
          </h2>
        </div>

        {/* Lead Narrative & Photo Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200 items-center">
          <div className="md:col-span-5 rounded overflow-hidden border border-slate-300 shadow-sm">
            <img
              src={lab?.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"}
              alt={lab?.name || "Computer Laboratory"}
              className="w-full h-56 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              Empowering 21st-Century Digital Problem Solvers
            </h3>
            <p className="leading-relaxed font-medium">
              Computer education at Lotus Global School is planned so children become comfortable, confident, and responsible with technology from early primary grades onwards.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Equipped with high-performance desktop stations, high-speed fiber-optic connectivity, and child-safe content filtering, our lab nurtures logical problem-solving through interactive block programming and structured coding.
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#E87737]" />
            <span>Infrastructure & Hardware Specifications</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <Monitor className="w-4 h-4 text-[#E87737]" />
                <span>1:1 Student Station Ratio</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every child is allocated an individual computer terminal during laboratory hours to maximize hands-on screen time and practice.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <Wifi className="w-4 h-4 text-[#2F5187]" />
                <span>Child-Safe Firewall</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitored network gateway equipped with enterprise content filtering, ensuring strict protection from non-educational web content.
              </p>
            </div>

            <div className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-[#2F5187] font-bold text-xs uppercase">
                <Terminal className="w-4 h-4 text-[#E87737]" />
                <span>Modern Coding Suites</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-configured environments for visual block coding (Scratch), algorithmic logic, Python programming, and productivity tools.
              </p>
            </div>
          </div>
        </div>

        {/* Curriculum Progression Table */}
        <div className="space-y-3">
          <h4 className="font-display font-bold text-base text-[#2F5187]">
            Grade-Wise Computer Science Learning Continuum
          </h4>
          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-2.5 border-r border-[#3d65a3]">Level</th>
                  <th className="p-2.5 border-r border-[#3d65a3]">Grade Span</th>
                  <th className="p-2.5 border-r border-[#3d65a3]">Core Modules</th>
                  <th className="p-2.5">Hands-on Outcomes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="bg-white">
                  <td className="p-2.5 font-bold text-[#2F5187] border-r border-slate-200">Foundational</td>
                  <td className="p-2.5 font-semibold text-[#E87737] border-r border-slate-200">Grade 1 to 3</td>
                  <td className="p-2.5 border-r border-slate-200">Mouse handling, typing agility, digital paint, basic OS navigation</td>
                  <td className="p-2.5">Confidence with digital inputs and visual problem solving.</td>
                </tr>
                <tr className="bg-[#F8FAFC]">
                  <td className="p-2.5 font-bold text-[#2F5187] border-r border-slate-200">Intermediate</td>
                  <td className="p-2.5 font-semibold text-[#E87737] border-r border-slate-200">Grade 4 to 7</td>
                  <td className="p-2.5 border-r border-slate-200">Block programming (Scratch), word processing, spreadsheets, cyber safety</td>
                  <td className="p-2.5">Creating animated stories, computational algorithms, and charts.</td>
                </tr>
                <tr className="bg-white">
                  <td className="p-2.5 font-bold text-[#2F5187] border-r border-slate-200">Secondary</td>
                  <td className="p-2.5 font-semibold text-[#E87737] border-r border-slate-200">Grade 8 to 10</td>
                  <td className="p-2.5 border-r border-slate-200">Text-based coding (Python), database fundamentals, HTML/CSS web logic</td>
                  <td className="p-2.5">Building structured software solutions and data analytics.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
