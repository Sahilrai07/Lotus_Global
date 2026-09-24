import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { InquiryModal } from "./components/InquiryModal";
import { Preloader } from "./components/Preloader";
import { HomePage } from "./pages/HomePage";
// Route-level code splitting for secondary pages (keeps initial homepage bundle minimal)
const AboutPage = React.lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const VisionMissionPage = React.lazy(() => import("./pages/VisionMissionPage").then((m) => ({ default: m.VisionMissionPage })));
const MessagePage = React.lazy(() => import("./pages/MessagePage").then((m) => ({ default: m.MessagePage })));
const AcademicsPage = React.lazy(() => import("./pages/AcademicsPage").then((m) => ({ default: m.AcademicsPage })));
const FacilitiesPage = React.lazy(() => import("./pages/FacilitiesPage").then((m) => ({ default: m.FacilitiesPage })));
const ChemPhysLabsPage = React.lazy(() => import("./pages/facilities/ChemPhysLabsPage").then((m) => ({ default: m.ChemPhysLabsPage })));
const BioCompositeLabsPage = React.lazy(() => import("./pages/facilities/BioCompositeLabsPage").then((m) => ({ default: m.BioCompositeLabsPage })));
const ComputerLabPage = React.lazy(() => import("./pages/facilities/ComputerLabPage").then((m) => ({ default: m.ComputerLabPage })));
const CentralLibraryPage = React.lazy(() => import("./pages/facilities/CentralLibraryPage").then((m) => ({ default: m.CentralLibraryPage })));
const SportsArenaPage = React.lazy(() => import("./pages/facilities/SportsArenaPage").then((m) => ({ default: m.SportsArenaPage })));
const IndoorGamesPage = React.lazy(() => import("./pages/facilities/IndoorGamesPage").then((m) => ({ default: m.IndoorGamesPage })));
const MusicStudioPage = React.lazy(() => import("./pages/facilities/MusicStudioPage").then((m) => ({ default: m.MusicStudioPage })));
const CampusInfirmaryPage = React.lazy(() => import("./pages/facilities/CampusInfirmaryPage").then((m) => ({ default: m.CampusInfirmaryPage })));
const CoreValuesPage = React.lazy(() => import("./pages/about/CoreValuesPage").then((m) => ({ default: m.CoreValuesPage })));
const LocationPage = React.lazy(() => import("./pages/about/LocationPage").then((m) => ({ default: m.LocationPage })));
const DevelopmentalStagesPage = React.lazy(() => import("./pages/academics/DevelopmentalStagesPage").then((m) => ({ default: m.DevelopmentalStagesPage })));
const AssessmentSchemePage = React.lazy(() => import("./pages/academics/AssessmentSchemePage").then((m) => ({ default: m.AssessmentSchemePage })));
const SchoolTimingsPage = React.lazy(() => import("./pages/academics/SchoolTimingsPage").then((m) => ({ default: m.SchoolTimingsPage })));
const DocumentsChecklistPage = React.lazy(() => import("./pages/admissions/DocumentsChecklistPage").then((m) => ({ default: m.DocumentsChecklistPage })));
const EligibilityCriteriaPage = React.lazy(() => import("./pages/admissions/EligibilityCriteriaPage").then((m) => ({ default: m.EligibilityCriteriaPage })));
const InquiryDeskPage = React.lazy(() => import("./pages/admissions/InquiryDeskPage").then((m) => ({ default: m.InquiryDeskPage })));
const TeachingStandardsPage = React.lazy(() => import("./pages/faculty/TeachingStandardsPage").then((m) => ({ default: m.TeachingStandardsPage })));
const ProfessionalDevelopmentPage = React.lazy(() => import("./pages/faculty/ProfessionalDevelopmentPage").then((m) => ({ default: m.ProfessionalDevelopmentPage })));
const StudentTeacherRatioPage = React.lazy(() => import("./pages/faculty/StudentTeacherRatioPage").then((m) => ({ default: m.StudentTeacherRatioPage })));
const FacultyPage = React.lazy(() => import("./pages/FacultyPage").then((m) => ({ default: m.FacultyPage })));
const GalleryPage = React.lazy(() => import("./pages/GalleryPage").then((m) => ({ default: m.GalleryPage })));
const ActivitiesPage = React.lazy(() => import("./pages/ActivitiesPage").then((m) => ({ default: m.ActivitiesPage })));
const AdmissionsPage = React.lazy(() => import("./pages/AdmissionsPage").then((m) => ({ default: m.AdmissionsPage })));
const ContactPage = React.lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const DocumentsPage = React.lazy(() => import("./pages/DocumentsPage").then((m) => ({ default: m.DocumentsPage })));
const MandatoryDisclosurePage = React.lazy(() => import("./pages/MandatoryDisclosurePage").then((m) => ({ default: m.MandatoryDisclosurePage })));
const NewsEventsPage = React.lazy(() => import("./pages/NewsEventsPage").then((m) => ({ default: m.NewsEventsPage })));
import { MessageSquare, ArrowUp, Settings } from "lucide-react";
import { getSiteData, subscribeSiteData } from "./data/siteDataService";

// Admin CMS and Login Portal
const AdminDashboard = React.lazy(() =>
  import("./pages/admin/AdminDashboard").then((m) => ({ default: m.AdminDashboard }))
);
const AdminLoginPage = React.lazy(() =>
  import("./pages/admin/AdminLoginPage").then((m) => ({ default: m.AdminLoginPage }))
);

const PAGE_SEO_META: Record<string, { title: string; description: string }> = {
  home: {
    title: "Lotus Global School | CBSE Pattern English Medium School in Vapi, Gujarat",
    description: "Lotus Global School is a premier CBSE pattern English medium school in Vapi, Gujarat, offering holistic development, smart digital classrooms, sports excellence, and experiential learning.",
  },
  about: {
    title: "About Us | Lotus Global School, Vapi",
    description: "Discover Lotus Global School's philosophy, management vision, and heritage of academic excellence nurturing global citizens in Vapi.",
  },
  "about-values": {
    title: "Core Values & Ethos | Lotus Global School, Vapi",
    description: "Explore the foundational core values, integrity, and ethical framework that shape character development at Lotus Global School.",
  },
  "about-location": {
    title: "Campus Location & Map | Lotus Global School, Vapi",
    description: "Find campus location details, address, route maps, and transport network connectivity for Lotus Global School in Vapi, Gujarat.",
  },
  "vision-mission": {
    title: "Vision & Mission | Lotus Global School, Vapi",
    description: "Learn about our vision to inspire innovative thinkers and compassionate leaders through holistic 21st-century education.",
  },
  message: {
    title: "Leadership Messages | Director & Principal | Lotus Global School",
    description: "Read inspiring messages from our School Director and Principal outlining our commitment to academic excellence and student well-being.",
  },
  academics: {
    title: "Academic Curriculum & Pedagogy | Lotus Global School, Vapi",
    description: "Comprehensive CBSE-aligned curriculum emphasizing experiential learning, NEP 2020 pedagogical integration, and STEM education.",
  },
  "academics-stages": {
    title: "Developmental Stages (Foundational to Secondary) | Lotus Global School",
    description: "Tailored pedagogical approaches across Foundational (Pre-Primary), Preparatory (Primary), Middle, and Secondary schooling stages.",
  },
  "academics-assessment": {
    title: "Assessment & Evaluation Scheme | Lotus Global School",
    description: "Continuous and comprehensive assessment framework, formative evaluations, and term-end criteria fostering holistic progress.",
  },
  "academics-timings": {
    title: "School Timings & Daily Routine | Lotus Global School",
    description: "Daily academic schedules, assembly hours, recess, and co-curricular timing breakdowns for all grades at Lotus Global School.",
  },
  facilities: {
    title: "World-Class Campus Facilities | Lotus Global School, Vapi",
    description: "Tour our modern infrastructure featuring composite science labs, high-tech computer labs, smart classrooms, library, and sports facilities.",
  },
  "facility-chem-phys": {
    title: "Physics & Chemistry Labs | Lotus Global School",
    description: "Equipped with modern scientific apparatus, safety measures, and hands-on experimental workstations for advanced STEM learning.",
  },
  "facility-bio-composite": {
    title: "Biology & Composite Science Lab | Lotus Global School",
    description: "State-of-the-art biological specimens, high-precision microscopes, and interactive models for experiential scientific study.",
  },
  "facility-computer-lab": {
    title: "Modern Computer & ICT Lab | Lotus Global School",
    description: "High-speed networked computing workstations, coding modules, AI tools, and digital literacy instruction for students.",
  },
  "facility-library": {
    title: "Central Library & Knowledge Hub | Lotus Global School",
    description: "Extensive repository of fiction, non-fiction, encyclopedias, journals, and digital periodicals cultivating lifelong reading habits.",
  },
  "facility-sports": {
    title: "Sports Complex & Athletic Grounds | Lotus Global School",
    description: "Dedicated courts and sports turf for football, cricket, basketball, athletics, yoga, and physical fitness development.",
  },
  "facility-indoor-games": {
    title: "Indoor Games & Recreational Arena | Lotus Global School",
    description: "Table tennis, chess, carrom, and recreational facilities fostering strategic thinking, focus, and peer camaraderie.",
  },
  "facility-music": {
    title: "Music & Performing Arts Studio | Lotus Global School",
    description: "Vocal and instrumental training, Indian classical and Western music, dance, and theatrical performance studio.",
  },
  "facility-infirmary": {
    title: "Campus Infirmary & Medical Care | Lotus Global School",
    description: "Full-time trained medical staff, emergency first-aid station, regular health checkups, and student wellness support.",
  },
  faculty: {
    title: "Distinguished Faculty & Mentors | Lotus Global School, Vapi",
    description: "Meet our qualified, passionate educators dedicated to personalized mentorship and innovative teaching methodologies.",
  },
  "faculty-standards": {
    title: "Teaching Standards & Qualifications | Lotus Global School",
    description: "Our rigorous teacher recruitment benchmarks, academic qualifications, and pedagogical excellence standards.",
  },
  "faculty-development": {
    title: "Faculty Professional Development (CPD) | Lotus Global School",
    description: "Continuous professional development programs, CBSE capacity-building workshops, and NEP 2020 training for our teaching staff.",
  },
  "faculty-ratio": {
    title: "Student-Teacher Ratio & Mentorship | Lotus Global School",
    description: "Optimal low student-teacher ratio ensuring individualized attention, proactive academic tracking, and personal guidance.",
  },
  admissions: {
    title: "Admissions Open 2026-27 | Lotus Global School, Vapi",
    description: "Enroll your child at Lotus Global School, Vapi. Clear admission guidelines, transparent fee structure, and step-by-step application process.",
  },
  "admissions-documents": {
    title: "Admissions Documents Checklist | Lotus Global School",
    description: "Complete list of required documents, verification forms, birth certificates, and photographs for hassle-free admission registration.",
  },
  "admissions-eligibility": {
    title: "Admissions Eligibility Criteria | Lotus Global School",
    description: "Grade-wise age criteria, entry norms, and prerequisites for Nursery to Grade 10 admissions at Lotus Global School.",
  },
  "admissions-inquiry": {
    title: "Admissions Inquiry & Application Desk | Lotus Global School",
    description: "Submit your admission inquiry or application for Lotus Global School, Vapi. Connect directly with our admissions counselor.",
  },
  activities: {
    title: "Co-Curricular Activities & Clubs | Lotus Global School",
    description: "Vibrant co-curricular clubs, debate societies, robotics, arts, cultural fests, and leadership opportunities.",
  },
  gallery: {
    title: "Campus Photo & Video Gallery | Lotus Global School",
    description: "Explore glimpses of campus life, annual functions, sports days, science fairs, and celebratory events at Lotus Global School.",
  },
  contact: {
    title: "Contact Us & Campus Visit | Lotus Global School, Vapi",
    description: "Get in touch with Lotus Global School. Schedule a campus tour, find contact phone numbers, email addresses, and school location.",
  },
  documents: {
    title: "School Documents & Affiliation Certifications | Lotus Global School",
    description: "Access official school certifications, affiliation documents, approvals, and regulatory compliance records.",
  },
  disclosure: {
    title: "Mandatory Public Disclosure (SARAS / CBSE) | Lotus Global School",
    description: "Official mandatory public disclosure as per CBSE guidelines including building safety, fire safety, and academic certificates.",
  },
  "news-events": {
    title: "Latest News, Circulars & Announcements | Lotus Global School",
    description: "Stay updated with school announcements, upcoming events, academic calendar, circulars, and student achievements.",
  },
};

const isAdminRoute = () => {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  return (
    host.startsWith("admin.") ||
    host.startsWith("cms.") ||
    host.includes("admin-lotus") ||
    path === "/admin" ||
    path === "/admin/" ||
    path.startsWith("/admin/") ||
    hash === "#admin" ||
    hash === "#/admin"
  );
};

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>(() => {
    if (isAdminRoute()) return "admin";
    if (typeof window !== "undefined" && window.location.hash) {
      const h = window.location.hash.replace("#", "").replace(/^\//, "");
      if (h) return h;
    }
    return "home";
  });
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [siteData, setSiteData] = useState(getSiteData());

  // Admin authentication state
  const [adminUser, setAdminUser] = useState<{ id?: string; email?: string; name?: string; role?: string } | null>(() => {
    try {
      const token = localStorage.getItem("lotus_admin_token") || sessionStorage.getItem("lotus_admin_token");
      const userStr = localStorage.getItem("lotus_admin_user") || sessionStorage.getItem("lotus_admin_user");
      if (token && userStr) {
        return JSON.parse(userStr);
      }
    } catch {}
    return null;
  });

  const handleAdminLogout = () => {
    localStorage.removeItem("lotus_admin_token");
    localStorage.removeItem("lotus_admin_user");
    sessionStorage.removeItem("lotus_admin_token");
    sessionStorage.removeItem("lotus_admin_user");
    setAdminUser(null);
  };

  useEffect(() => {
    return subscribeSiteData((newData) => setSiteData(newData));
  }, []);

  // Dynamic SEO Page Title & Meta Description update on route change
  useEffect(() => {
    const meta = PAGE_SEO_META[activePage] || PAGE_SEO_META["home"];
    if (meta) {
      document.title = meta.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", meta.description);
      }
    }
  }, [activePage]);

  const school = siteData.schoolInfo;

  // Sync with window.location and hash for deep linking
  useEffect(() => {
    const handleLocationChange = () => {
      if (isAdminRoute()) {
        setActivePage("admin");
        return;
      }

      const hash = window.location.hash.replace("#", "").replace(/^\//, "");
      const validPages = [
        "home",
        "about",
        "about-values",
        "about-location",
        "vision-mission",
        "mission-vision",
        "vision",
        "message",
        "academics",
        "academics-stages",
        "academics-assessment",
        "academics-timings",
        "facilities",
        "facility-chem-phys",
        "facility-bio-composite",
        "facility-computer-lab",
        "facility-library",
        "facility-sports",
        "facility-indoor-games",
        "facility-music",
        "facility-infirmary",
        "faculty",
        "faculty-standards",
        "faculty-development",
        "faculty-ratio",
        "admissions",
        "admissions-documents",
        "admissions-eligibility",
        "admissions-inquiry",
        "activities",
        "gallery",
        "contact",
        "documents",
        "disclosure",
        "news-events",
        "admin",
      ];

      if (validPages.includes(hash)) {
        if (hash === "mission-vision" || hash === "vision") {
          setActivePage("vision-mission");
        } else {
          setActivePage(hash);
        }
      }
    };

    handleLocationChange();

    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render Protected Institutional CMS Portal
  if (activePage === "admin") {
    if (adminUser) {
      return (
        <React.Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-sm font-semibold">
              Loading CMS Dashboard...
            </div>
          }
        >
          <AdminDashboard
            currentUser={adminUser}
            onLogout={handleAdminLogout}
            onBackToSite={() => handlePageChange("home")}
          />
        </React.Suspense>
      );
    }

    return (
      <React.Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-sm font-semibold">
            Loading Login Portal...
          </div>
        }
      >
        <AdminLoginPage
          onLoginSuccess={(user) => setAdminUser(user)}
          onBackToSite={() => handlePageChange("home")}
        />
      </React.Suspense>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "about":
        return (
          <AboutPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "about-values":
        return (
          <CoreValuesPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "about-location":
        return (
          <LocationPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "vision-mission":
      case "mission-vision":
      case "vision":
        return (
          <VisionMissionPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "message":
        return (
          <MessagePage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "academics":
        return (
          <AcademicsPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "academics-stages":
        return (
          <DevelopmentalStagesPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "academics-assessment":
        return (
          <AssessmentSchemePage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "academics-timings":
        return (
          <SchoolTimingsPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "facilities":
        return (
          <FacilitiesPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "facility-chem-phys":
        return (
          <ChemPhysLabsPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "facility-bio-composite":
        return (
          <BioCompositeLabsPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "facility-computer-lab":
        return (
          <ComputerLabPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "facility-library":
        return (
          <CentralLibraryPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "facility-sports":
        return (
          <SportsArenaPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "facility-indoor-games":
        return (
          <IndoorGamesPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "facility-music":
        return (
          <MusicStudioPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "facility-infirmary":
        return (
          <CampusInfirmaryPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "faculty":
        return (
          <FacultyPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "faculty-standards":
        return (
          <TeachingStandardsPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "faculty-development":
        return (
          <ProfessionalDevelopmentPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "faculty-ratio":
        return (
          <StudentTeacherRatioPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "activities":
        return (
          <ActivitiesPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "gallery":
        return (
          <GalleryPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "admissions":
        return (
          <AdmissionsPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "admissions-documents":
        return (
          <DocumentsChecklistPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "admissions-eligibility":
        return (
          <EligibilityCriteriaPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "admissions-inquiry":
        return (
          <InquiryDeskPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "contact":
        return (
          <ContactPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "documents":
        return (
          <DocumentsPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "disclosure":
        return (
          <MandatoryDisclosurePage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "news-events":
        return (
          <NewsEventsPage
            openInquiry={() => setIsInquiryOpen(true)}
            onNavigate={handlePageChange}
          />
        );
      case "home":
      default:
        return (
          <HomePage
            setActivePage={handlePageChange}
            openInquiry={() => setIsInquiryOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#E87737]/20 selection:text-[#2F5187]">
      {/* Institutional Logo Zoom Preloader */}
      <Preloader />

      {/* Global Institutional Navigation (Reference-style) */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        openInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Main Page Content with Suspense for on-demand lazy secondary pages */}
      <div className="flex-1">
        <React.Suspense
          fallback={
            <div className="min-h-[40vh] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-[#2F5187] border-t-transparent animate-spin" />
            </div>
          }
        >
          {renderPage()}
        </React.Suspense>
      </div>

      {/* Institutional 4-Column Footer */}
      <Footer
        setActivePage={handlePageChange}
        openInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Global Admissions Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
      />

      {/* Floating Action Elements (WhatsApp Desk & Back to Top) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 sm:gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-2.5 sm:p-3 rounded-full sm:rounded bg-white text-[#2F5187] border border-slate-300 shadow-md hover:bg-slate-50 transition-all"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={`https://wa.me/91${school.whatsapp}?text=Hello%20Lotus%20Global%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center p-3 sm:p-3.5 rounded-full sm:rounded bg-emerald-700 text-white shadow-lg hover:bg-emerald-600 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 shrink-0" />
          <span className="hidden sm:inline max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold pl-0 group-hover:pl-2">
            Admissions WhatsApp
          </span>
        </a>
      </div>

      {/* Local-Only Developer CMS Floating Shortcut (Only shown when running on localhost in DEV mode) */}
      {import.meta.env.DEV && (
        <button
          onClick={() => handlePageChange("admin")}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/90 text-white hover:bg-[#E87737] shadow-xl border border-slate-700 text-xs font-bold transition-all"
          title="Open Local Developer Content Dashboard"
        >
          <Settings className="w-3.5 h-3.5 animate-spin text-[#E87737] hover:text-white" />
          <span className="hidden sm:inline">Local Admin CMS</span>
        </button>
      )}
    </div>
  );
};
