import React from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { FACULTY_PILLARS } from "../data/schoolData";
import { Award, TrendingUp, HeartHandshake, CheckCircle2, GraduationCap, BookOpen, Users } from "lucide-react";
import { useSiteData } from "../data/siteDataService";

interface FacultyPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const FacultyPage: React.FC<FacultyPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const { siteData } = useSiteData();
  const banner = siteData.pageBanners?.faculty || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80";
  const departments = siteData.facultyStandards?.departments || [
    {
      name: "STEM & Natural Sciences",
      scope: "Physics, Chemistry, Biology & Composite Experiments",
      focus: "Hands-on empirical investigation and scientific reasoning.",
    },
    {
      name: "Mathematics & Computational Thinking",
      scope: "Foundational Numeracy, Logic & Problem Solving",
      focus: "Bridging abstract theorem with concrete real-world application.",
    },
    {
      name: "Languages & Humanistic Inquiries",
      scope: "English, Hindi, Regional Language & Social Sciences",
      focus: "Expressive storycraft, critical reading, and cultural empathy.",
    },
    {
      name: "Information Technology & Media",
      scope: "Computer Labs, Coding Fundamentals & Cyber Safety",
      focus: "Digital literacy and responsible technological exploration.",
    },
    {
      name: "Physical Education & Performing Arts",
      scope: "Athletics Arena, Music Studio, Visual Design & Yoga",
      focus: "Physical endurance, teamwork, rhythm, and aesthetic appreciation.",
    },
  ];
  const pillars = siteData.facultyStandards?.pillars || FACULTY_PILLARS;

  return (
    <InternalPageLayout
      title="Faculty Standards"
      category="FACULTY"
      activePageId="faculty"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={banner}
      breadcrumbs={[{ label: "Faculty Standards" }]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Academic Mentorship
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Teaching Standards & Pedagogical Excellence
          </h2>
        </div>

        {/* Narrative Lead */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          At Lotus Global School, educators are not merely instructors of syllabus content—they are facilitators of intellectual curiosity and moral character. We recruit professionals who embody empathy, conceptual mastery, and passion for child-centric development.
        </p>

        {/* Faculty Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const icons = [Award, TrendingUp, HeartHandshake];
            const Icon = icons[idx % icons.length];

            return (
              <div
                key={idx}
                className="p-5 rounded border border-slate-200 bg-[#F8FAFC] shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded bg-white text-[#2F5187] border border-slate-200 flex items-center justify-center shadow-sm">
                  <Icon className="w-5 h-5 text-[#E87737]" />
                </div>
                <h3 className="font-display font-bold text-base text-[#2F5187]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Academic Departments Overview */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <GraduationCap className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Academic Faculty Departments
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3]">Department</th>
                  <th className="p-3 border-r border-[#3d65a3]">Subject Coverage</th>
                  <th className="p-3">Educational Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {departments.map((dept, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC] hover:bg-slate-50"}
                  >
                    <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200 whitespace-nowrap">
                      {dept.name}
                    </td>
                    <td className="p-3 text-slate-600 border-r border-slate-200">
                      {dept.scope}
                    </td>
                    <td className="p-3 text-slate-800 font-medium">
                      {dept.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Continuous Professional Development */}
        <div className="p-5 rounded bg-[#FFF5EE] border-l-4 border-[#E87737] space-y-2 text-xs">
          <span className="font-bold text-[#2F5187] uppercase block text-sm">
            Continuous Professional Development (CPD)
          </span>
          <p className="text-slate-700 leading-relaxed">
            In compliance with CBSE and NEP 2020 guidelines, our educators undergo regular pedagogical workshops, modern educational technology integration seminars, and child psychology training to constantly elevate classroom interaction.
          </p>
        </div>
      </div>
    </InternalPageLayout>
  );
};
