import React from "react";
import { FACULTY_PILLARS, SCHOOL_INFO } from "../data/schoolData";
import { 
  Award, 
  TrendingUp, 
  HeartHandshake, 
  UserCheck, 
  Sparkles, 
  BookOpen, 
  Compass, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Mail,
  ArrowRight
} from "lucide-react";

interface FacultyPageProps {
  openInquiry: () => void;
}

export const FacultyPage: React.FC<FacultyPageProps> = ({ openInquiry }) => {
  const iconMap: Record<string, React.ElementType> = {
    Award: Award,
    TrendingUp: TrendingUp,
    HeartHandshake: HeartHandshake,
  };

  const teachingPractices = [
    {
      title: "Inquiry-Led Mentorship",
      summary: "Replacing passive instruction with active questioning and discovery.",
      detail: "Educators guide students to hypothesize, test, and conclude independently, nurturing critical thinking from early grades.",
    },
    {
      title: "Conceptual Rigor",
      summary: "Deep understanding over rote memorization.",
      detail: "Subjects are introduced through tangible physical models, laboratory setups, and real-world problem scenarios.",
    },
    {
      title: "Empathetic Communication",
      summary: "Child psychology aligned with classroom dynamics.",
      detail: "Teachers are trained to recognize individual learning temperaments, emotional needs, and distinct paces of development.",
    },
    {
      title: "Collaborative Learning",
      summary: "Peer exploration and group synergy.",
      detail: "Structured group projects encourage mutual respect, shared responsibility, and effective communication skills.",
    },
  ];

  const trainingModules = [
    {
      badge: "Curriculum",
      title: "CBSE Guidelines & NCERT Benchmarks",
      desc: "Orientation sessions focusing on curriculum delivery, continuous assessment protocols, and periodic diagnostic tests.",
    },
    {
      badge: "Pedagogy",
      title: "Modern Pedagogy & NEP Practices",
      desc: "Workshops designed to implement experiential learning, competency-based assessments, and interdisciplinary problem-solving.",
    },
    {
      badge: "Innovation",
      title: "Educational Technology & Smart Tools",
      desc: "Hands-on training in multimedia smart boards, digital learning tools, and interactive science laboratory management.",
    },
    {
      badge: "Wellness",
      title: "Child Psychology & Student Welfare",
      desc: "Equipping teachers with pastoral care techniques, positive reinforcement strategies, and attentive student well-being protocols.",
    },
  ];

  const ratioBenefits = [
    {
      metric: "Focused Attention",
      desc: "Educators observe every student's cognitive grasp, ensuring no child is left behind in core competencies.",
    },
    {
      metric: "Tailored Guidance",
      desc: "Instructional pacing can be adapted dynamically to support both remedial needs and accelerated enrichment.",
    },
    {
      metric: "Meaningful Mentorship",
      desc: "Close student-mentor bonds foster confidence, curiosity, and high academic accountability.",
    },
    {
      metric: "Active Participation",
      desc: "Smaller cohort sizes guarantee that every student participates actively in classroom discussions and laboratory work.",
    },
  ];

  return (
    <div className="pt-28 pb-20 animate-fade-in bg-[#F8FAFC]">
      {/* Page Hero */}
      <section className="bg-[#0B1B3D] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider">
              <span>Pedagogical Mentorship</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
              Faculty & Staff
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Our educators are facilitators of learning, selected for their subject expertise, passion for teaching, and commitment to student welfare.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 1: INTRODUCTION & CORE FACULTY STANDARDS (Requested by User) */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Main Introduction Header */}
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Institutional Standards</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1B3D] tracking-tight">
              Faculty & Staff
            </h2>
            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
              Our educators are facilitators of learning, selected for their subject expertise, passion for teaching, and commitment to student welfare.
            </p>
            <div className="w-16 h-1 bg-[#E86A2C] rounded-full mt-2"></div>
          </div>

          {/* The Three Foundational Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FACULTY_PILLARS.map((pillar, idx) => {
              const Icon = iconMap[pillar.icon] || Award;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-5 hover:border-[#E86A2C]/40 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B1B3D] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#E86A2C]" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#0B1B3D] tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span>Pillar 0{idx + 1}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* NEW SECTION 2: FACILITATOR PEDAGOGY — FROM INSTRUCTION TO INSPIRATION */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                Classroom Dynamics
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1B3D] tracking-tight">
                Facilitators of Learning, Not Merely Instructors
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                At Lotus Global School, teaching is redefined as an interactive partnership. Rather than lecturing from behind a podium, educators structure experiential challenges where children formulate hypotheses, experiment, and articulate their conclusions.
              </p>
            </div>
            
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#0B1B3D]">
                <Compass className="w-5 h-5 text-[#E86A2C]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  The Mentorship Principle
                </span>
              </div>
              <p className="font-display font-semibold text-lg text-[#0B1B3D] leading-snug">
                "When an educator listens before instructing, a student learns to think before answering."
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Our pedagogical approach emphasizes critical inquiry, emotional intelligence, and resilient problem-solving across all grades.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachingPractices.map((practice, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#E86A2C] flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                  {practice.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  {practice.summary}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {practice.detail}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* NEW SECTION 3: CONTINUOUS PROFESSIONAL DEVELOPMENT & WORKSHOPS */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
              Continuous Faculty Growth
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1B3D] tracking-tight">
              Continuous Professional Development
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Regular training workshops keep faculty updated on CBSE guidelines, NEP practices, and educational technology, ensuring classroom standards stay dynamic and future-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingModules.map((module, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-3 hover:border-slate-300 transition-all"
              >
                <div className="inline-block px-2.5 py-1 rounded bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-wider text-[#E86A2C]">
                  {module.badge}
                </div>
                <h3 className="font-display font-bold text-xl text-[#0B1B3D]">
                  {module.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {module.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* NEW SECTION 4: LOW TEACHER-STUDENT RATIO & PERSONALIZED MENTORING */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="max-w-2xl mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
              Individualized Care
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1B3D] tracking-tight">
              Low Teacher-Student Ratio in Practice
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Ensures personalized attention, tailored guidance, and close mentoring for every child from Nursery to Grade 10.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ratioBenefits.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E86A2C]"></div>
                  <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                    {item.metric}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: INSTITUTIONAL FACULTY ROSTER NOTICE & CAREERS (Strict Rule #9 Compliance) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-[#E86A2C]" />
              <h3 className="font-display font-bold text-2xl text-[#0B1B3D]">
                Academic Faculty Roster
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Lotus Global School follows a rigorous educator selection protocol assessing subject mastery, modern pedagogical techniques, and empathetic student communication.
            </p>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#E86A2C]" />
                <span>Roster Status: Verification & Induction Phase</span>
              </div>
              <p>
                [Faculty Department Roster & Academic Profiles — The complete directory of certified primary, middle, and secondary school educators will be published following the formal induction ahead of the new academic session. No unverified credentials or names are displayed prior to official school appointment.]
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Interested in teaching opportunities at Lotus Global School?
              </div>
              <a
                href={`mailto:${SCHOOL_INFO.email}?subject=Teaching%20Career%20Inquiry%20-%20Lotus%20Global%20School`}
                className="px-5 py-2.5 bg-[#0B1B3D] text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-[#E86A2C] transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Submit Academic Resume</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Institutional Inquiry Callout */}
      <section className="py-16 bg-[#0B1B3D] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Have Questions for our Academic Coordination Team?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Our admissions and academic coordination desk is available to explain our pedagogical approach, syllabus benchmarks, and faculty mentoring standards.
          </p>
          <div className="pt-2">
            <button
              onClick={openInquiry}
              className="px-6 py-3 rounded-lg bg-[#E86A2C] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#D25619] transition-colors shadow-md"
            >
              Enquire with Admissions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
