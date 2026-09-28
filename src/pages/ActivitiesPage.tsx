import React, { useState } from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import {
  Trophy,
  Palette,
  Music,
  Users,
  Sparkles,
  Flame,
  Wind,
  Droplets,
  Mountain,
  Award,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Target,
  Heart,
  Theater,
  Lightbulb,
  Leaf,
  BookOpen,
  Shield,
  Eye,
  Download,
} from "lucide-react";
import { useSiteData } from "../data/siteDataService";
import { PdfViewerModal } from "../components/PdfViewerModal";

interface ActivitiesPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const { siteData } = useSiteData();
  const banner = siteData.pageBanners?.activities || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1600&q=80";

  const [activeTab, setActiveTab] = useState<"all" | "sports" | "arts" | "clubs" | "houses">("all");
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [isCalendarViewerOpen, setIsCalendarViewerOpen] = useState(false);
  const [isCalendarDownloading, setIsCalendarDownloading] = useState(false);

  const calendarPdfUrl = "/uploads/documents/academic-calendar-2026-27.pdf";

  const handleDownloadCalendar = async () => {
    setIsCalendarDownloading(true);
    try {
      const fileUrl = `/api/files?id=academic-calendar-2026-27.pdf&download=1`;
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error("Fetch failed");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = "Lotus_Global_School_Annual_Planner_2026-27.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 3000);
    } catch {
      window.open(calendarPdfUrl, "_blank");
    } finally {
      setTimeout(() => setIsCalendarDownloading(false), 800);
    }
  };

  const scrollToSection = (
    sectionId: string,
    tab?: "all" | "sports" | "arts" | "clubs" | "houses"
  ) => {
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab("all");
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  const customSidebarLinks = [
    {
      label: "Co-Curricular Overview",
      pageId: "activities",
      isActive: activeSection === "overview",
      onClick: () => {
        setActiveSection("overview");
        scrollToSection("overview-section", "all");
      },
    },
    {
      label: "Sports Competitions & Tournaments",
      pageId: "activities",
      isActive: activeSection === "sports",
      onClick: () => {
        setActiveSection("sports");
        scrollToSection("sports-section", "sports");
      },
    },
    {
      label: "Visual & Performing Arts",
      pageId: "activities",
      isActive: activeSection === "arts",
      onClick: () => {
        setActiveSection("arts");
        scrollToSection("arts-section", "arts");
      },
    },
    {
      label: "Student Clubs & Societies",
      pageId: "activities",
      isActive: activeSection === "clubs",
      onClick: () => {
        setActiveSection("clubs");
        scrollToSection("clubs-section", "clubs");
      },
    },
    {
      label: "Four-House System & Council",
      pageId: "activities",
      isActive: activeSection === "houses",
      onClick: () => {
        setActiveSection("houses");
        scrollToSection("houses-section", "houses");
      },
    },
    {
      label: "Annual Cultural Calendar",
      pageId: "activities",
      isActive: activeSection === "calendar",
      onClick: () => {
        setActiveSection("calendar");
        scrollToSection("calendar-section", "all");
      },
    },
    {
      label: "Photo & Event Gallery",
      pageId: "gallery",
      isActive: false,
      onClick: () => {
        onNavigate("gallery");
      },
    },
  ];

  const sportsTournaments = siteData.coCurricular?.sportsTournaments || [
    {
      title: "Annual Sports Day & Athletic Meet",
      season: "Winter Term (December)",
      desc: "Track sprints (100m, 200m, 400m), 4x100m relay, long jump, shot put, March Past by all Four Houses, and grand torch lightning ceremony.",
      highlight: "Inter-House Championship Trophy",
      badge: "Athletics",
    },
    {
      title: "LGS Premier Cricket Cup",
      season: "Autumn Championship (October)",
      desc: "Limited-overs tournament played on the turf practice pitches, featuring team captains, leather-ball technique, and Fair Play honors.",
      highlight: "Best Batsman & Bowler Medals",
      badge: "Outdoor",
    },
    {
      title: "Inter-House Football League",
      season: "Monsoon / Winter League",
      desc: "Fast-paced 7-a-side and 11-a-side inter-house football fixtures emphasizing tactical formations, positional discipline, and endurance.",
      highlight: "Golden Boot & Best Goalkeeper",
      badge: "Outdoor",
    },
    {
      title: "Lotus Chess & Mind Sports Trophy",
      season: "Bi-Annual Championship",
      desc: "Swiss-system tournament testing spatial reasoning, opening masteries, blitz clocks, and strategic composure under time pressure.",
      highlight: "Junior & Senior Grandmaster Badges",
      badge: "Indoor Strategy",
    },
    {
      title: "Badminton & Table Tennis Open",
      season: "Spring Tournament (February)",
      desc: "Singles and doubles knockout brackets across age divisions, building rapid reflexes, agility, and precision stroke-play.",
      highlight: "Singles & Doubles Laurels",
      badge: "Court Games",
    },
    {
      title: "Morning Yoga & Wellness Assembly",
      season: "Year-Round Daily Practice",
      desc: "Pranayama breath regulation, Surya Namaskar, postural alignment, and mindfulness sessions to enhance focus and emotional poise.",
      highlight: "International Yoga Day Showcase",
      badge: "Mindfulness",
    },
  ];

  const artsDisciplines = siteData.coCurricular?.artsDisciplines || [
    {
      name: "Vocal & Instrumental Music Ensemble",
      icon: Music,
      desc: "Indian classical sargam, devotional hymns, patriotic chorales, and western keyboard & percussion harmony.",
      outcomes: "Ear training, rhythmic sense (Taal), and multi-part choral coordination.",
    },
    {
      name: "Classical & Contemporary Dance",
      icon: Sparkles,
      desc: "Foundations of Kathak, Bharatnatyam mudras, folk regional dances of Gujarat, and energetic contemporary choreography.",
      outcomes: "Physical balance, rhythmic grace, expressive storytelling, and stage poise.",
    },
    {
      name: "Theater & Dramatics Guild",
      icon: Theater,
      desc: "Annual dramatic productions, street plays (Nukkad Natak) on social themes, bilingual dialogue delivery, and backstage lighting/set management.",
      outcomes: "Public speaking courage, empathy, impromptu improvisation, and articulation.",
    },
    {
      name: "Visual Arts, Sketching & Pottery",
      icon: Palette,
      desc: "Acrylic canvas painting, charcoal sketching, clay sculpture, origami, and eco-friendly recycled crafts for campus displays.",
      outcomes: "Spatial aesthetic sense, fine motor control, and creative self-expression.",
    },
  ];

  const studentClubs = siteData.coCurricular?.studentClubs || [
    {
      name: "STEM & Young Innovators Club",
      icon: Lightbulb,
      tag: "Science & Technology",
      description: "Hands-on robotics kits, simple electronic circuits, model rocketry, and working models for the Annual Science Fair.",
    },
    {
      name: "Eco-Warriors Green Society",
      icon: Leaf,
      tag: "Environmental Stewardship",
      description: "Organic campus composting, native tree sapling drives in Vatar, plastic-free campaigns, and conservation awareness.",
    },
    {
      name: "Literary & Debating Society",
      icon: BookOpen,
      tag: "Elocution & Model UN",
      description: "Parliamentary debates, extempore speaking, creative prose writing, bilingual elocution, and English poetry slams.",
    },
    {
      name: "Mathletes & Logic Guild",
      icon: Target,
      tag: "Analytical Thinking",
      description: "Vedic mathematics shortcuts, logic puzzles, Rubik's cube speed-cubing, and preparatory drills for National Olympiads.",
    },
  ];

  const defaultHouses = [
    {
      name: "Agni",
      element: "Fire",
      color: "bg-red-500",
      border: "border-red-500",
      text: "text-red-600",
      lightBg: "bg-red-50",
      icon: Flame,
      motto: "Courage, Radiance & Initiative",
      description: "Characterized by boldness, radiant passion, and pioneering leadership in every athletic and intellectual challenge.",
    },
    {
      name: "Prithvi",
      element: "Earth",
      color: "bg-emerald-600",
      border: "border-emerald-600",
      text: "text-emerald-700",
      lightBg: "bg-emerald-50",
      icon: Mountain,
      motto: "Stability, Diligence & Integrity",
      description: "Grounded in dependable perseverance, ethical strength, resilience under pressure, and enduring character.",
    },
    {
      name: "Vayu",
      element: "Wind",
      color: "bg-blue-600",
      border: "border-blue-600",
      text: "text-blue-700",
      lightBg: "bg-blue-50",
      icon: Wind,
      motto: "Agility, Intellect & Freedom",
      description: "Inspiring intellectual velocity, inventive adaptability, swift strategic thinking, and boundless exploration.",
    },
    {
      name: "Jal",
      element: "Water",
      color: "bg-cyan-600",
      border: "border-cyan-600",
      text: "text-cyan-700",
      lightBg: "bg-cyan-50",
      icon: Droplets,
      motto: "Compassion, Fluidity & Harmony",
      description: "Embodying emotional intelligence, adaptability in shifting currents, collaborative empathy, and creative depth.",
    },
  ];

  const houseStyles = [
    { color: "bg-red-500", border: "border-red-500", text: "text-red-600", lightBg: "bg-red-50", icon: Flame },
    { color: "bg-emerald-600", border: "border-emerald-600", text: "text-emerald-700", lightBg: "bg-emerald-50", icon: Mountain },
    { color: "bg-blue-600", border: "border-blue-600", text: "text-blue-700", lightBg: "bg-blue-50", icon: Wind },
    { color: "bg-cyan-600", border: "border-cyan-600", text: "text-cyan-700", lightBg: "bg-cyan-50", icon: Droplets },
    { color: "bg-purple-600", border: "border-purple-600", text: "text-purple-700", lightBg: "bg-purple-50", icon: Sparkles },
    { color: "bg-amber-600", border: "border-amber-600", text: "text-amber-700", lightBg: "bg-amber-50", icon: Trophy },
  ];

  const houses = (siteData.coCurricular?.houses && siteData.coCurricular.houses.length > 0)
    ? siteData.coCurricular.houses.map((h, i) => {
        const style = houseStyles[i % houseStyles.length];
        return {
          ...h,
          color: (h as any).color || style.color,
          border: (h as any).border || style.border,
          text: (h as any).text || style.text,
          lightBg: (h as any).lightBg || style.lightBg,
          icon: (h as any).icon || style.icon,
        };
      })
    : defaultHouses;

  const annualCalendar = [
    {
      month: "June 2026",
      event: "Environment Day (Plantation & Conservation Awareness), Islamic New Year, International Yoga Day & Father's Day, Muharram Assembly",
      category: "Awareness & Ethics",
    },
    {
      month: "July 2026",
      event: "Quiz Competition (III-VIII), Best out of Waste (I-II), G.K Quiz (I-II), Scipotech Science Quiz (III-VIII), Guru Purnima",
      category: "Science & Literary",
    },
    {
      month: "August 2026",
      event: "Show and Tell (I-II), Creative Writing (III-VIII), Unit Test-1 (3-7 Aug), Independence Day & Parsi New Year, Onam, Rakhi Making, Extempore & Debate",
      category: "National Pride & UT-1",
    },
    {
      month: "September 2026",
      event: "Janmashtami & Matki Decoration, Teacher's Day, Ganesh Chaturthi, Hindi Diwas, Community Helpers Fancy Dress (I-II), Logo Making",
      category: "Cultural & Creative",
    },
    {
      month: "October 2026",
      event: "Handwriting Competition (I-II), Extempore Speech, Navratri Celebration, Durga Ashtami, Dussehra, Semester Exam-1 (26 Oct - 4 Nov)",
      category: "Semester Exam 1",
    },
    {
      month: "November 2026",
      event: "Diwali Vacation Break (5 Nov - 23 Nov 2026), School Re-opens, Guru Nanak Jayanti Celebration in Assembly",
      category: "Festival Break",
    },
    {
      month: "December 2026",
      event: "Non-Fire Cooking (I-VIII), Beat the Clock Rapid-Fire Tasks, Mathematics Day Activities & Projects, Christmas Holidays",
      category: "Math & Life Skills",
    },
    {
      month: "January 2027",
      event: "Slogan Making, Unit Test-2 (4-8 Jan), Makar Sankranti, Pongal, Read & Act, Spell Bee, Constitution Quiz, Republic Day, Extempore",
      category: "Unit Test-2 & Republic",
    },
    {
      month: "February 2027",
      event: "My Magic Bag (I-II), Current Affairs Analysis (III-VIII), Vasant Panchami, Shivaji Maharaj Jayanti, Grand Science Exhibition (20-Feb-2027)",
      category: "Science Exhibition",
    },
    {
      month: "March 2027",
      event: "Annual Final Academic Revisions & Semester Exam-2 (5 March 2027 – 20 March 2027)",
      category: "Semester Exam 2",
    },
  ];

  return (
    <InternalPageLayout
      title="Co-Curricular & Activities"
      category="ACTIVITIES"
      activePageId="activities"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      customSidebarLinks={customSidebarLinks}
      bannerImage={banner}
      breadcrumbs={[
        { label: "Activities & Co-Curricular" },
      ]}
    >
      <div className="space-y-10">
        {/* Page Title & Vision Header */}
        <div className="border-b-2 border-[#2F5187] pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
                Holistic Pedagogy & Student Life
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
                Co-Curricular Life & Creative Pursuits
              </h2>
            </div>
            <button
              onClick={() => onNavigate("gallery")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#2F5187] bg-slate-100 hover:bg-slate-200 rounded border border-slate-300 transition-colors"
            >
              <span>View Photo Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E87737]" />
            </button>
          </div>
        </div>

        {/* Lead Showcase Hero Card */}
        <div id="overview-section" className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded-lg border border-slate-200 items-center scroll-mt-24">
          <div className="md:col-span-5 rounded-lg overflow-hidden border border-slate-300 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
              alt="Students participating in co-curricular activities at Lotus Global School"
              className="w-full h-60 object-cover"
            />
          </div>
          <div className="md:col-span-7 space-y-3 text-xs sm:text-sm text-slate-700">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#2F5187]/10 text-[#2F5187] text-[11px] font-bold rounded-full">
              <Award className="w-3.5 h-3.5 text-[#E87737]" />
              <span>Nurturing Mind, Body & Character</span>
            </div>
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Beyond the Textbook: Education for the Whole Child
            </h3>
            <p className="leading-relaxed">
              At Lotus Global School, education extends far beyond the academic syllabus. Our co-curricular framework is intentionally designed to cultivate self-confidence, team camaraderie, creative imagination, and ethical leadership.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Every child is encouraged to explore an athletic discipline, find their creative voice in visual and performing arts, discover hands-on curiosity in student clubs, and build lifelong friendships through our historic Four-House system.
            </p>
          </div>
        </div>

        {/* Quick Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
            Jump to Section:
          </span>
          {[
            { id: "all", label: "All Activities" },
            { id: "sports", label: "Sports & Tournaments" },
            { id: "arts", label: "Arts & Culture" },
            { id: "clubs", label: "Student Clubs" },
            { id: "houses", label: "Four-House System" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-[#2F5187] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: SPORTS TOURNAMENTS & ATHLETIC EVENTS */}
        {(activeTab === "all" || activeTab === "sports") && (
          <div id="sports-section" className="space-y-5 scroll-mt-24">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87737] block">
                  Athletic Competitions & Tournaments
                </span>
                <h3 className="font-display font-bold text-xl text-[#2F5187] flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#E87737]" />
                  <span>Sports Competitions, Leagues & Championships</span>
                </h3>
              </div>
              <button
                onClick={() => onNavigate("facility-sports")}
                className="text-xs font-semibold text-[#2F5187] hover:text-[#E87737] flex items-center gap-1 transition-colors"
              >
                <span>View Sports Infrastructure & Grounds</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              While our campus provides extensive playing grounds, turf pitches, and indoor arenas, our athletic life comes alive through structured tournaments, seasonal leagues, and inter-house championships that teach students the dignity of victory and the resilience of defeat.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sportsTournaments.map((tourney, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-[#2F5187]/40 hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 bg-[#2F5187]/10 text-[#2F5187] text-[10px] font-bold rounded">
                      {tourney.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {tourney.season}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm sm:text-base text-[#2F5187]">
                      {tourney.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {tourney.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-[#E87737] font-semibold">
                    <Award className="w-4 h-4 shrink-0" />
                    <span>Honor: {tourney.highlight}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cross-Link Card for Sports Facilities */}
            <div className="p-4 bg-gradient-to-r from-[#2F5187]/5 to-[#E87737]/10 rounded-lg border border-[#2F5187]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h5 className="font-bold text-xs uppercase tracking-wider text-[#2F5187]">
                  Looking for Physical Courts, Pitches & Specifications?
                </h5>
                <p className="text-xs text-slate-600">
                  Read details about our cricket practice nets, football turf, volleyball courts, and indoor games facilities.
                </p>
              </div>
              <button
                onClick={() => onNavigate("facility-sports")}
                className="px-4 py-2 bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold rounded shadow transition-colors shrink-0"
              >
                Sports Infrastructure Page &rarr;
              </button>
            </div>
          </div>
        )}

        {/* SECTION 2: VISUAL & PERFORMING ARTS */}
        {(activeTab === "all" || activeTab === "arts") && (
          <div id="arts-section" className="space-y-5 scroll-mt-24">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87737] block">
                  Cultural Expression & Aesthetics
                </span>
                <h3 className="font-display font-bold text-xl text-[#2F5187] flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#E87737]" />
                  <span>Visual, Musical & Performing Arts</span>
                </h3>
              </div>
              <button
                onClick={() => onNavigate("facility-music")}
                className="text-xs font-semibold text-[#2F5187] hover:text-[#E87737] flex items-center gap-1 transition-colors"
              >
                <span>View Music Studio Facility</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {artsDisciplines.map((art, idx) => {
                const Icon = typeof art.icon === "function" ? (art.icon as any) : Sparkles;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E87737]/10 flex items-center justify-center text-[#E87737] shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#2F5187]">
                        {art.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {art.desc}
                    </p>
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-200 text-[11px] text-slate-700">
                      <strong className="text-[#2F5187]">Core Learning Outcome: </strong>
                      <span>{art.outcomes}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: STUDENT CLUBS & SOCIETIES */}
        {(activeTab === "all" || activeTab === "clubs") && (
          <div id="clubs-section" className="space-y-5 scroll-mt-24">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87737] block">
                Intellectual & Community Engagement
              </span>
              <h3 className="font-display font-bold text-xl text-[#2F5187] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#E87737]" />
                <span>Student Co-Curricular Clubs & Societies</span>
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every Friday afternoon, classrooms transform into innovation labs, literary circles, and ecological forums as students assemble for structured club sessions guided by passionate faculty mentors.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {studentClubs.map((club, idx) => {
                const Icon = typeof club.icon === "function" ? (club.icon as any) : Lightbulb;
                return (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm hover:border-[#2F5187] transition-all space-y-2.5 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-[#2F5187]/10 flex items-center justify-center text-[#2F5187]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87737] block">
                        {club.tag}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-[#2F5187]">
                        {club.name}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {club.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] text-[#2F5187] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Weekly Hands-on Projects</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 4: THE FOUR-HOUSE SYSTEM & LEADERSHIP */}
        {(activeTab === "all" || activeTab === "houses") && (
          <div id="houses-section" className="space-y-6 scroll-mt-24">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87737] block">
                Tradition, Loyalty & Brotherhood
              </span>
              <h3 className="font-display font-bold text-xl text-[#2F5187] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#E87737]" />
                <span>The Four-House System & Student Council</span>
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upon admission, every student is inducted into one of four historic Houses named after the foundational elements of nature. The House System creates an enduring vertical bond across grade levels, fostering mentorship, healthy rivalry, and collective responsibility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {houses.map((house, idx) => {
                const Icon = house.icon;
                return (
                  <div
                    key={idx}
                    className={`p-5 rounded-lg border-2 ${house.border} bg-white shadow-sm space-y-3 relative overflow-hidden`}
                  >
                    <div className={`absolute top-0 right-0 w-16 h-16 ${house.lightBg} rounded-bl-full flex items-start justify-end p-2`}>
                      <Icon className={`w-5 h-5 ${house.text}`} />
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${house.text}`}>
                        Element of {house.element}
                      </span>
                      <h4 className="font-display font-bold text-xl text-[#2F5187]">
                        House {house.name}
                      </h4>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        Motto:
                      </span>
                      <p className={`text-xs font-bold ${house.text}`}>
                        "{house.motto}"
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {house.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Student Council & Merit Points Mechanism */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#F8FAFC] p-5 rounded-lg border border-slate-200">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#2F5187] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#E87737]" />
                  <span>House Points & Cock-House Trophy</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Houses earn points throughout the academic year through sports victories, academic honor rolls, debate cups, cultural performances, and exemplary discipline. The prestigious Cock-House Trophy is presented at the Annual Day ceremony.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-sm text-[#2F5187] flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#E87737]" />
                  <span>Student Leadership Council</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Led by the Head Boy, Head Girl, Sports Captains, and House Captains, the Student Council takes an active role in campus morning assemblies, event organization, peer conflict resolution, and anti-bullying initiatives.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: ANNUAL CALENDAR HIGHLIGHTS */}
        <div id="calendar-section" className="space-y-4 scroll-mt-24">
          <div className="border-b border-slate-200 pb-2 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E87737] block">
                Campus Rhythm & Activity Planner
              </span>
              <h3 className="font-display font-bold text-xl text-[#2F5187] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#E87737]" />
                <span>Annual Co-Curricular & Academic Planner (2026–2027)</span>
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsCalendarViewerOpen(true)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#2F5187] font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 border border-slate-300"
              >
                <Eye className="w-3.5 h-3.5 text-[#2F5187]" />
                <span>View Full PDF</span>
              </button>
              <button
                onClick={handleDownloadCalendar}
                disabled={isCalendarDownloading}
                className="px-3.5 py-1.5 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isCalendarDownloading ? "..." : "Download Planner"}</span>
              </button>
            </div>
          </div>

          {/* Exam & Key Vacation Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3 rounded bg-amber-50 border border-amber-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-amber-800 tracking-wider">Unit Test 1</span>
              <div className="font-bold text-xs text-amber-950">3 Aug 2026 – 7 Aug 2026</div>
              <p className="text-[11px] text-amber-900/80">Diagnostic first terminal assessments (Grades I–VIII)</p>
            </div>

            <div className="p-3 rounded bg-sky-50 border border-sky-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-sky-800 tracking-wider">Semester Exam 1</span>
              <div className="font-bold text-xs text-sky-950">26 Oct 2026 – 4 Nov 2026</div>
              <p className="text-[11px] text-sky-900/80">Mid-term summative evaluations prior to Diwali break</p>
            </div>

            <div className="p-3 rounded bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Diwali Vacation</span>
              <div className="font-bold text-xs text-emerald-950">5 Nov 2026 – 23 Nov 2026</div>
              <p className="text-[11px] text-emerald-900/80">School re-opens on Monday, 23rd November 2026</p>
            </div>

            <div className="p-3 rounded bg-indigo-50 border border-indigo-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-indigo-800 tracking-wider">Semester Exam 2</span>
              <div className="font-bold text-xs text-indigo-950">5 Mar 2027 – 20 Mar 2027</div>
              <p className="text-[11px] text-indigo-900/80">Annual comprehensive examination & final promotion</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {annualCalendar.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white rounded border border-slate-200 text-xs space-y-1.5 shadow-sm hover:border-[#2F5187]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#2F5187] text-[11px]">
                    {item.month}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-slate-600">
                    {item.category}
                  </span>
                </div>
                <p className="font-medium text-slate-700 leading-snug">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Footer Box */}
        <div className="p-6 bg-gradient-to-r from-[#2F5187] to-[#1E375F] text-white rounded-lg shadow flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display font-bold text-lg text-white">
              Experience Student Life at Lotus Global School
            </h4>
            <p className="text-xs text-slate-200">
              Browse our dynamic media archives showcasing cultural celebrations, athletic triumphs, and campus life.
            </p>
          </div>
          <div>
            <button
              onClick={() => onNavigate("gallery")}
              className="px-5 py-2.5 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
            >
              Explore Photo Gallery
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={isCalendarViewerOpen}
        onClose={() => setIsCalendarViewerOpen(false)}
        title="Annual Academic Planner (2026–2027)"
        subtitle="Lotus Global School, Vata – Day-to-Day Activity & Examination Calendar"
        fileUrl={calendarPdfUrl}
        onDownload={handleDownloadCalendar}
        isDownloading={isCalendarDownloading}
      />
    </InternalPageLayout>
  );
};
