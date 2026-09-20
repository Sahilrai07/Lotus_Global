import React from "react";
import { ChevronRight, Home, Phone, Mail, MapPin, Download, CheckCircle2 } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";

interface SidebarLink {
  label: string;
  pageId: string;
}

interface InternalPageLayoutProps {
  title: string;
  category: string;
  activePageId: string;
  onNavigate: (pageId: string) => void;
  openInquiry: () => void;
  children: React.ReactNode;
  bannerImage?: string;
  breadcrumbs?: { label: string; pageId?: string }[];
  hideSidebarContactOnMobile?: boolean;
}

export const InternalPageLayout: React.FC<InternalPageLayoutProps> = ({
  title,
  category,
  activePageId,
  onNavigate,
  openInquiry,
  children,
  bannerImage = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
  breadcrumbs = [],
  hideSidebarContactOnMobile = false,
}) => {
  // Navigation categories for sidebar
  const getCategoryLinks = (): SidebarLink[] => {
    switch (category) {
      case "ABOUT US":
        return [
          { label: "Overview & Campus", pageId: "about" },
          { label: "Mission & Vision", pageId: "vision-mission" },
          { label: "Principal's Desk", pageId: "message" },
          { label: "Core Values & Creed", pageId: "about-values" },
          { label: "Campus Location & Map", pageId: "about-location" },
        ];
      case "ACADEMICS":
        return [
          { label: "Curriculum Framework", pageId: "academics" },
          { label: "Academic Stages (Nursery - Gr 10)", pageId: "academics-stages" },
          { label: "Assessment & Scheme", pageId: "academics-assessment" },
          { label: "School Timings & Routine", pageId: "academics-timings" },
        ];
      case "CAMPUS FACILITIES":
        return [
          { label: "All Campus Facilities", pageId: "facilities" },
          { label: "Chemistry & Physics Labs", pageId: "facility-chem-phys" },
          { label: "Biology & Composite Lab", pageId: "facility-bio-composite" },
          { label: "Computer Laboratory", pageId: "facility-computer-lab" },
          { label: "Central Library", pageId: "facility-library" },
          { label: "Sports & Athletics Arena", pageId: "facility-sports" },
          { label: "Music & Cultural Studio", pageId: "facility-music" },
          { label: "Campus Infirmary", pageId: "facility-infirmary" },
        ];
      case "ADMISSIONS":
        return [
          { label: "Admissions Process (4 Steps)", pageId: "admissions" },
          { label: "Required Document Checklist", pageId: "admissions-documents" },
          { label: "Eligibility & Age Criteria", pageId: "admissions-eligibility" },
          { label: "Online Inquiry Desk", pageId: "admissions-inquiry" },
        ];
      case "FACULTY":
        return [
          { label: "Faculty Directory & Overview", pageId: "faculty" },
          { label: "Teaching Standards", pageId: "faculty-standards" },
          { label: "Professional Development", pageId: "faculty-development" },
          { label: "Student-Teacher Ratio", pageId: "faculty-ratio" },
        ];
      case "DOCUMENTS & DISCLOSURES":
      case "DOCUMENTS":
        return [
          { label: "Downloads & Documents Hub", pageId: "documents" },
          { label: "CBSE Mandatory Disclosure", pageId: "disclosure" },
          { label: "Admission Forms & Prospectus", pageId: "documents" },
          { label: "Safety & Compliance Certificates", pageId: "documents" },
          { label: "Transfer Certificate (TC) Info", pageId: "documents" },
        ];
      case "NEWS & EVENTS":
        return [
          { label: "All News & Announcements", pageId: "news-events" },
          { label: "Upcoming Events Calendar", pageId: "news-events" },
          { label: "School Circulars", pageId: "news-events" },
        ];
      default:
        return [
          { label: "Home", pageId: "home" },
          { label: "About Campus", pageId: "about" },
          { label: "Academics", pageId: "academics" },
          { label: "Facilities", pageId: "facilities" },
          { label: "Admissions", pageId: "admissions" },
          { label: "Documents", pageId: "documents" },
          { label: "Contact Us", pageId: "contact" },
        ];
    }
  };

  const sidebarLinks = getCategoryLinks();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Inner Page Hero Banner (Reference .about-inner inspiration) */}
      <div className="relative bg-[#1E375F] text-white py-12 sm:py-16 border-b border-[#2F5187] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={bannerImage}
            alt={title}
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#142540] via-[#1E375F]/90 to-[#2F5187]/70" />
        </div>

        <div className="relative z-10 wrap">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium mb-3">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#E87737] font-semibold">{category}</span>
            {breadcrumbs.map((b, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                {b.pageId ? (
                  <button
                    onClick={() => b.pageId && onNavigate(b.pageId)}
                    className="hover:text-white transition-colors"
                  >
                    {b.label}
                  </button>
                ) : (
                  <span className="text-white">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase">
            {title}
          </h1>
          <p className="text-sm text-slate-200 mt-2 max-w-2xl">
            Lotus Global School · Vatar, Vapi, Gujarat · Proposed CBSE Institution
          </p>
        </div>
      </div>

      {/* Main Content Area: Left Sidebar (lsidebar) + Right Content (cont) */}
      <div className="wrap py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar (Reference .lsidebar) */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="card-portal overflow-hidden">
              <div className="lsidebar-heading flex items-center justify-between">
                <span>{category}</span>
              </div>
              <div className="lsidebar-nav">
                {sidebarLinks.map((link, idx) => {
                  const isActive = activePageId === link.pageId;
                  return (
                    <button
                      key={idx}
                      onClick={() => onNavigate(link.pageId)}
                      className={`lsidebar-link w-full text-left ${
                        isActive ? "active" : ""
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          isActive ? "text-[#E87737]" : "text-slate-400"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Admissions & Contact Helpline Card in Sidebar (Desktop Only) */}
            <div className="hidden lg:block bg-[#2F5187] text-white p-5 rounded border border-[#1E375F] shadow-sm space-y-4">
              <div className="border-b border-white/20 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E87737]">
                  Admissions Office
                </span>
                <h4 className="font-display font-bold text-base text-white mt-0.5">
                  Lotus Global School
                </h4>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E87737] shrink-0 mt-0.5" />
                  <span>Near Vatar PHC, Vatar, Vapi, Gujarat 396191</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E87737] shrink-0" />
                  <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-[#E87737] font-semibold">
                    {SCHOOL_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E87737] shrink-0" />
                  <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-[#E87737] break-all">
                    {SCHOOL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={openInquiry}
                className="w-full py-2.5 px-3 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded text-center transition-colors shadow"
              >
                Inquire for Admission
              </button>
            </div>
          </aside>

          {/* Right Main Content Area (Reference .cont) */}
          <main className="lg:col-span-8 xl:col-span-9 bg-white p-6 sm:p-8 rounded border border-slate-200 shadow-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
