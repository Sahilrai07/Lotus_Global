import React from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { FACULTY_PILLARS } from "../data/schoolData";
import {
  Award,
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  Users,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
  const banner =
    siteData.pageBanners?.faculty ||
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80";

  const facultyMembers = (siteData.faculty || [])
    .filter((f) => f.active !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

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

  const workshops = siteData.facultyStandards?.workshops || [
    {
      domain: "NEP 2020 & Competency-Based Education",
      frequency: "Quarterly",
      focus: "Designing experiential learning modules and competency-aligned assessment questions.",
    },
    {
      domain: "Ed-Tech & Smart Lab Integration",
      frequency: "Bi-Monthly",
      focus: "Utilizing digital computing simulations, data-loggers, and multimedia visual aids in classrooms.",
    },
    {
      domain: "Child Psychology & Emotional Safety",
      frequency: "Annual Intensive",
      focus: "Recognizing individual learning wavelengths, behavioral counseling, and anti-bullying protocols.",
    },
    {
      domain: "CBSE Assessment & Remedial Strategies",
      frequency: "Semester-wise",
      focus: "Formative diagnostic rubric generation and structured remedial programs for diverse learners.",
    },
  ];

  const pillars = siteData.facultyStandards?.pillars || FACULTY_PILLARS;

  return (
    <InternalPageLayout
      title="Faculty Directory & Standards"
      category="FACULTY"
      activePageId="faculty"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={banner}
      breadcrumbs={[{ label: "Faculty Directory & Standards" }]}
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Academic Mentorship
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Teaching Standards & Educator Profiles
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
            At Lotus Global School, educators are not merely instructors of syllabus content—they are facilitators of intellectual curiosity, scientific reasoning, and moral character. We recruit passionate professionals who embody empathy, conceptual mastery, and dedication to child-centric development.
          </p>
        </div>

        {/* SECTION 1: FACULTY DIRECTORY (Individual Profiles from CMS) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
                Our Educators & Mentors
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2F5187] flex items-center gap-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#2F5187]" />
                <span>Distinguished Faculty Directory</span>
              </h3>
            </div>
            <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start sm:self-auto">
              Academic Session 2026–27
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2F5187]/40 transition-all duration-300 flex flex-col group"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E87737] text-white shadow-sm mb-1">
                      {member.subject}
                    </span>
                    <h4 className="font-display font-bold text-base text-white drop-shadow-sm leading-tight">
                      {member.name}
                    </h4>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-[#2F5187] flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#E87737] shrink-0" />
                      <span>{member.designation}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: CPD WORKSHOPS (Continuous Professional Development) */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
                Lifelong Learning for Educators
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2F5187] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#2F5187]" />
                <span>Continuous Professional Development (CPD Workshops)</span>
              </h3>
            </div>
            <button
              onClick={() => onNavigate("faculty-development")}
              className="text-xs font-bold text-[#2F5187] hover:text-[#E87737] flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>View Full CPD Framework</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            In compliance with CBSE guidelines and National Education Policy (NEP 2020), every teacher at Lotus Global School completes a minimum of 50 mandatory hours of continuous professional development annually through certified pedagogy workshops, technology integration seminars, and child wellness symposiums.
          </p>

          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3] w-1/3">Training Domain</th>
                  <th className="p-3 border-r border-[#3d65a3] w-1/5 whitespace-nowrap">Schedule / Frequency</th>
                  <th className="p-3">Core Learning & Pedagogical Outcomes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {workshops.map((ws, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC] hover:bg-slate-50"}
                  >
                    <td className="p-3 font-bold text-[#2F5187] border-r border-slate-200">
                      {ws.domain}
                    </td>
                    <td className="p-3 font-semibold text-[#E87737] border-r border-slate-200 whitespace-nowrap">
                      {ws.frequency}
                    </td>
                    <td className="p-3 text-slate-700 leading-relaxed">
                      {ws.focus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: ACADEMIC FACULTY DEPARTMENTS */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <BookOpen className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Academic Faculty Departments
            </h3>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#2F5187] text-white uppercase text-[11px] tracking-wider">
                  <th className="p-3 border-r border-[#3d65a3] w-1/4">Department</th>
                  <th className="p-3 border-r border-[#3d65a3] w-1/3">Subject Coverage</th>
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

        {/* SECTION 4: FACULTY PILLARS */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <Award className="w-5 h-5 text-[#2F5187]" />
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Core Pillars of Teaching & Mentorship
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const icons = [Award, TrendingUp, HeartHandshake];
              const Icon = icons[idx % icons.length];

              return (
                <div
                  key={idx}
                  className="p-5 rounded-lg border border-slate-200 bg-[#F8FAFC] shadow-sm space-y-3 hover:border-[#2F5187]/40 transition-colors"
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
        </div>

        {/* Quick Navigation Footer Banner */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-[#2F5187] to-[#1E3A5F] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
              Explore Academic Policies
            </span>
            <h4 className="font-display font-bold text-lg">
              Explore Our Teaching Standards & Staffing Ratios
            </h4>
            <p className="text-xs text-slate-200 max-w-xl">
              Learn about our personalized 1:25 student-teacher mentorship ratio and CBSE instructional delivery frameworks.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate("faculty-standards")}
              className="px-4 py-2 rounded bg-white text-[#2F5187] text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Teaching Standards
            </button>
            <button
              onClick={() => onNavigate("faculty-ratio")}
              className="px-4 py-2 rounded bg-[#E87737] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#D26425] transition-colors cursor-pointer"
            >
              Student-Teacher Ratio
            </button>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
