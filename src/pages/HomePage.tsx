import React from "react";
import { Hero } from "../components/Hero";
import { NoticeBoard } from "../components/NoticeBoard";
import { SCHOOL_INFO, ACADEMIC_STAGES, FACILITIES_DATA } from "../data/schoolData";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Compass,
  Award,
  Users,
  Target,
  HeartHandshake
} from "lucide-react";

interface HomePageProps {
  setActivePage: (page: string) => void;
  openInquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage, openInquiry }) => {
  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4 Featured facilities for homepage showcase (matching reference site 2-column structure)
  const featuredFacilities = FACILITIES_DATA.slice(0, 4);

  const getFacilityPageId = (id: string) => {
    switch (id) {
      case "chemistry-lab":
      case "physics-lab":
        return "facility-chem-phys";
      case "biology-lab":
      case "composite-lab":
        return "facility-bio-composite";
      case "computer-lab":
        return "facility-computer-lab";
      case "library":
        return "facility-library";
      case "sports-room":
        return "facility-sports";
      case "music-room":
        return "facility-music";
      case "infirmary":
        return "facility-infirmary";
      default:
        return "facilities";
    }
  };

  return (
    <main className="animate-fade-in bg-[#F8FAFC]">
      {/* 1. HERO / BANNER SECTION */}
      <Hero
        onExploreAcademics={() => navigateTo("academics")}
        onOpenInquiry={openInquiry}
      />

      {/* 2. CONTENT-TOP: THE SIGNATURE 3-COLUMN INSTITUTIONAL GRID (Reference Blueprint) */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Column 1: Leadership / Principal's Message */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="border-b-2 border-[#2F5187] pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87737] block">
                    Leadership Insight
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#2F5187] uppercase tracking-wide">
                    From the Principal's Desk
                  </h3>
                </div>

                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                    alt="School Leadership"
                    className="w-24 h-28 object-cover rounded border border-slate-300 shadow-sm shrink-0"
                  />
                  <div className="space-y-2">
                    <p className="text-xs text-slate-700 italic font-serif leading-relaxed">
                      "If a child cannot learn the way we teach him, we must teach him the way he can learn."
                    </p>
                    <p className="text-[11px] text-slate-500 font-semibold">
                      – Lotus Global School Leadership
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Every child possesses an innate curiosity that deserves to be celebrated. At Lotus Global School, our educational framework in Vatar, Vapi ensures students transition from passive absorption to active intellectual discovery.
                </p>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-200">
                <button
                  onClick={() => navigateTo("message")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E87737] hover:text-[#D26425] uppercase tracking-wider transition-colors"
                >
                  <span>Read Complete Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Column 2: Mission & Vision Overview */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="border-b-2 border-[#2F5187] pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87737] block">
                    Institutional Purpose
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#2F5187] uppercase tracking-wide">
                    Mission & Vision
                  </h3>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  A child's physical, intellectual, and moral growth requires an intentional, supportive environment. Lotus Global School was conceived in Vatar, Vapi to provide such a comprehensive ecosystem.
                </p>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Offering education from <strong>Nursery to Grade 10</strong>, the school aligns with the <strong>NCERT curriculum framework</strong> under proposed CBSE affiliation. We encourage personal initiative and goal setting tuned to each child's individual strengths.
                </p>

                <div className="bg-white p-3 rounded border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-[#2F5187] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E87737]" />
                    <span>Values-Driven Education</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Grounded in <em>Dedication, Diligence, and Discipline</em> for lifelong leadership.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-200">
                <button
                  onClick={() => navigateTo("vision-mission")}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E87737] hover:text-[#D26425] uppercase tracking-wider transition-colors"
                >
                  <span>Read More About Our Vision</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Column 3: Notice Board & Announcements Component */}
            <div className="h-full">
              <NoticeBoard
                onNavigate={navigateTo}
                onOpenInquiry={openInquiry}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTENT-MIDDLE: WELCOME SECTION (With Signature Double Dividers) */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="wrap">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h2 className="section-title-institutional">
              Welcome to LOTUS GLOBAL SCHOOL
            </h2>
            {/* Signature Institutional Double Dividers */}
            <hr className="hr1" />
            <hr className="hr2" />

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {SCHOOL_INFO.narrative.leadParagraph}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {SCHOOL_INFO.narrative.pedagogy}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigateTo("about")}
                className="px-5 py-2.5 rounded bg-[#2F5187] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1E375F] transition-colors shadow-sm"
              >
                Learn More About Our School
              </button>
              <button
                onClick={openInquiry}
                className="px-5 py-2.5 rounded bg-[#E87737] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#D26425] transition-colors shadow-sm"
              >
                Admissions Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTENT-BOTTOM: CAMPUS FACILITIES CATALOG (Reference .content-bottom 2-Column List) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="wrap">
          <div className="section-title-wrap">
            <h2 className="section-title-institutional">
              CAMPUS FACILITIES
            </h2>
            <hr className="hr1" />
            <hr className="hr2" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Modern infrastructure engineered to facilitate hands-on experimentation, creative discovery, and physical fitness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredFacilities.map((facility) => (
              <div
                key={facility.id}
                className="flex flex-col sm:flex-row gap-5 p-5 rounded border border-slate-200 bg-[#F8FAFC] hover:border-[#2F5187]/40 transition-all shadow-sm group"
              >
                <div className="sm:w-48 sm:h-36 w-full h-48 shrink-0 overflow-hidden rounded border border-slate-200">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87737]">
                      {facility.category}
                    </span>
                    <h3
                      onClick={() => navigateTo(getFacilityPageId(facility.id))}
                      className="font-display font-bold text-base text-[#2F5187] group-hover:text-[#E87737] transition-colors cursor-pointer"
                    >
                      {facility.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-1">
                      {facility.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigateTo(getFacilityPageId(facility.id))}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#E87737] hover:text-[#D26425] transition-colors uppercase tracking-wider"
                    >
                      <span>Read more...</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigateTo("facilities")}
              className="px-6 py-2.5 rounded border-2 border-[#2F5187] text-[#2F5187] hover:bg-[#2F5187] hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              View All Campus Laboratories & Facilities
            </button>
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC CONTINUUM (Structured Educational Progression) */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="wrap">
          <div className="section-title-wrap">
            <h2 className="section-title-institutional">
              ACADEMIC STRUCTURE
            </h2>
            <hr className="hr1" />
            <hr className="hr2" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              A four-stage pedagogical progression aligned with the NCERT framework from foundational discovery to board readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACADEMIC_STAGES.map((stage, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded p-5 flex flex-col justify-between shadow-sm hover:border-[#E87737] transition-colors"
              >
                <div>
                  <div className="text-xs font-bold font-mono text-[#E87737] mb-1">
                    Stage 0{idx + 1}
                  </div>
                  <h3 className="font-display font-bold text-base text-[#2F5187] mb-1">
                    {stage.phase}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mb-3 bg-slate-100 px-2 py-0.5 rounded w-fit">
                    {stage.levels}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-semibold text-[#2F5187]">
                  Focus: {stage.focus}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigateTo("academics")}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#2F5187] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1E375F] transition-colors shadow"
            >
              <span>Explore Curriculum & Assessment Scheme</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. INSTITUTIONAL MOTTO PILLARS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="wrap">
          <div className="section-title-wrap">
            <h2 className="section-title-institutional">
              CORE VALUES & CREED
            </h2>
            <hr className="hr1" />
            <hr className="hr2" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Our three foundational anchors guide student conduct, academic inquiry, and leadership character.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded border-t-4 border-t-[#E87737] bg-[#F8FAFC] border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded bg-[#FFF5EE] text-[#E87737] flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Dedication
              </h3>
              <div className="text-xs font-semibold text-[#E87737]">
                {SCHOOL_INFO.mottoValues.dedication.short}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {SCHOOL_INFO.mottoValues.dedication.full}
              </p>
            </div>

            <div className="p-6 rounded border-t-4 border-t-[#2F5187] bg-[#F8FAFC] border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded bg-[#EEF3FA] text-[#2F5187] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Diligence
              </h3>
              <div className="text-xs font-semibold text-[#2F5187]">
                {SCHOOL_INFO.mottoValues.diligence.short}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {SCHOOL_INFO.mottoValues.diligence.full}
              </p>
            </div>

            <div className="p-6 rounded border-t-4 border-t-[#F7A8D2] bg-[#F8FAFC] border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded bg-[#FDF2F8] text-[#E25B88] flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Discipline
              </h3>
              <div className="text-xs font-semibold text-[#E25B88]">
                {SCHOOL_INFO.mottoValues.discipline.short}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {SCHOOL_INFO.mottoValues.discipline.full}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ADMISSIONS DESK CALLOUT BAR */}
      <section className="py-12 bg-[#2F5187] text-white">
        <div className="wrap">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E87737]">
                Admissions Open · Nursery to Grade 10
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                Begin Your Child's Journey at Lotus Global School
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Connect with our admissions desk in Vatar, Vapi to register an inquiry or schedule a campus walkthrough.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={openInquiry}
                className="px-6 py-3 rounded bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                Inquire for Admission
              </button>
              <button
                onClick={() => navigateTo("contact")}
                className="px-5 py-3 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/25 transition-colors"
              >
                Contact Campus
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
