import React, { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
  MessageSquare,
  MapPin,
  Search,
  FileText,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { getSiteData, subscribeSiteData, SiteData } from "../data/siteDataService";
import { InstagramIcon } from "./InstagramIcon";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  openInquiry: () => void;
}

interface SubMenuItem {
  label: string;
  pageId: string;
  badge?: string;
}

interface NavItem {
  id: string;
  label: string;
  hasDropdown?: boolean;
  subItems?: SubMenuItem[];
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, openInquiry }) => {
  const [siteData, setSiteData] = useState<SiteData>(getSiteData());
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return subscribeSiteData((newData) => setSiteData(newData));
  }, []);

  const school = siteData.schoolInfo;

  const navItems: NavItem[] = [
    { id: "home", label: "Home" },
    {
      id: "about",
      label: "About Us",
      hasDropdown: true,
      subItems: [
        { label: "About Lotus Global School", pageId: "about" },
        { label: "The Principal's Desk", pageId: "message" },
        { label: "Our Vision & Mission", pageId: "vision-mission" },
        { label: "Core Values & Creed", pageId: "about-values" },
        { label: "Campus Location & Map", pageId: "about-location" },
        { label: "Faculty & Educators", pageId: "faculty" },
      ],
    },
    {
      id: "admissions",
      label: "Admission",
      hasDropdown: true,
      subItems: [
        { label: "Admissions Pathway (4 Steps)", pageId: "admissions" },
        { label: "Mandatory Document Checklist", pageId: "admissions-documents" },
        { label: "Eligibility & Age Criteria", pageId: "admissions-eligibility" },
        { label: "Admissions Inquiry Desk", pageId: "admissions-inquiry" },
        { label: "Approved Fee Structure", pageId: "documents" },
      ],
    },
    {
      id: "academics",
      label: "Academics",
      hasDropdown: true,
      subItems: [
        { label: "NCERT Curriculum Framework", pageId: "academics" },
        { label: "Developmental Stages (Nursery - Grade 10)", pageId: "academics-stages" },
        { label: "Assessment & Examination Scheme", pageId: "academics-assessment" },
        { label: "Daily School Timings & Routine", pageId: "academics-timings" },
        { label: "Annual Academic Calendar", pageId: "documents" },
        { label: "Prescribed Book List", pageId: "documents" },
      ],
    },
    {
      id: "facilities",
      label: "Facilities",
      hasDropdown: true,
      subItems: [
        { label: "All Campus Laboratories & Facilities", pageId: "facilities" },
        { label: "Chemistry & Physics Labs", pageId: "facility-chem-phys" },
        { label: "Biology & Composite Science Lab", pageId: "facility-bio-composite" },
        { label: "Computer & Robotics Laboratory", pageId: "facility-computer-lab" },
        { label: "Central Library & Reading Sanctum", pageId: "facility-library" },
        { label: "Sports Arena & Athletic Ground", pageId: "facility-sports" },
        { label: "Music & Performing Arts Studio", pageId: "facility-music" },
        { label: "Campus Infirmary & Healthcare", pageId: "facility-infirmary" },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      hasDropdown: true,
      subItems: [
        { label: "Downloads & Documents Hub", pageId: "documents" },
        { label: "CBSE Mandatory Public Disclosure", pageId: "disclosure", badge: "Mandatory" },
        { label: "Admission Forms & Prospectus", pageId: "documents" },
        { label: "Building & Fire Safety Certificates", pageId: "documents" },
        { label: "Health & Sanitation Verification", pageId: "documents" },
        { label: "Transfer Certificate (TC) Format", pageId: "documents" },
      ],
    },
    {
      id: "news-events",
      label: "News & Events",
      hasDropdown: true,
      subItems: [
        { label: "Latest News & Updates", pageId: "news-events" },
        { label: "Upcoming Events Calendar", pageId: "news-events" },
        { label: "Official Announcements & Circulars", pageId: "news-events" },
      ],
    },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleNavigate = (pageId: string) => {
    setActivePage(pageId);
    setActiveDropdown(null);
    setIsMobileOpen(false);
    setIsSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseEnter = (itemId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isItemActive = (item: NavItem) => {
    if (activePage === item.id) return true;
    if (item.subItems?.some((sub) => sub.pageId === activePage)) return true;
    return false;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const query = searchQuery.toLowerCase();
    if (query.includes("admiss") || query.includes("form") || query.includes("apply")) {
      handleNavigate("admissions");
    } else if (query.includes("doc") || query.includes("pdf") || query.includes("download") || query.includes("cert")) {
      handleNavigate("documents");
    } else if (query.includes("disclos") || query.includes("cbse") || query.includes("mandat")) {
      handleNavigate("disclosure");
    } else if (query.includes("lab") || query.includes("librar") || query.includes("sport") || query.includes("facil")) {
      handleNavigate("facilities");
    } else if (query.includes("fee") || query.includes("cost") || query.includes("struct")) {
      handleNavigate("documents");
    } else if (query.includes("princip") || query.includes("head") || query.includes("direct")) {
      handleNavigate("message");
    } else if (query.includes("photo") || query.includes("pic") || query.includes("image") || query.includes("galler")) {
      handleNavigate("gallery");
    } else if (query.includes("event") || query.includes("news") || query.includes("notice")) {
      handleNavigate("news-events");
    } else if (query.includes("contact") || query.includes("phone") || query.includes("locat") || query.includes("address")) {
      handleNavigate("contact");
    } else {
      handleNavigate("about");
    }
    setSearchQuery("");
  };

  return (
    <header className="w-full bg-white shadow-md z-40 relative">
      {/* 1. TOPMOST INSTITUTIONAL MICRO-BAR */}
      <div className="bg-[#1E375F] text-white text-xs py-1.5 px-4 border-b border-[#2F5187]">
        <div className="wrap flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#E87737] animate-pulse"></span>
              {school.affiliationStatus} (NCERT Framework)
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-[#E87737]" />
              Near Vatar PHC, Vatar, Vapi, Gujarat
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs ml-auto">
            <a
              href={`tel:${school.phone}`}
              className="flex items-center gap-1 text-slate-200 hover:text-[#E87737] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E87737]" />
              <span className="font-semibold">{school.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-400">|</span>
            <a
              href={`mailto:${school.email}`}
              className="hidden sm:flex items-center gap-1 text-slate-200 hover:text-[#E87737] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#E87737]" />
              <span>{school.email}</span>
            </a>
            <span className="text-slate-400">|</span>
            <a
              href={`https://wa.me/91${school.whatsapp}?text=Hello%20Lotus%20Global%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. HEADER MIDDLE: LOGO, TITLE & REFERENCE-STYLE HEADER WIDGETS */}
      <div className="bg-white py-3 sm:py-4 border-b border-slate-100">
        <div className="wrap flex items-center justify-between gap-4">
          {/* Logo & School Title */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 sm:gap-4 text-left group focus:outline-none shrink-0"
            aria-label="Lotus Global School Homepage"
          >
            <div className="relative shrink-0">
              <img
                src="/assets/logo.png"
                alt="Lotus Global School Crest"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg sm:text-2xl md:text-2xl tracking-tight text-[#2F5187] group-hover:text-[#E87737] transition-colors">
                  LOTUS GLOBAL SCHOOL
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-[#E87737] uppercase">
                Vatar, Vapi, Gujarat · Nursery to Grade 10
              </span>
              <span className="hidden md:inline text-[11px] text-slate-500 font-medium italic mt-0.5">
                Motto: {school.motto}
              </span>
            </div>
          </button>

          {/* Reference Site Header-Widgets (Right Side) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Blinking Admission Alert (Styled exactly like reference a.blink) */}
            <button
              onClick={openInquiry}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2F5187] text-white font-bold text-xs uppercase tracking-wide border-l-4 border-r-4 border-[#E87737] shadow-sm hover:bg-[#1E375F] transition-all animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E87737]" />
              <span>Admissions 2026-27</span>
            </button>

            {/* Social Icons (Reference style) */}
            <div className="hidden md:flex items-center gap-1 text-slate-500">
              <a
                href={school.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-slate-100 hover:bg-[#E87737] hover:text-white flex items-center justify-center transition-colors text-slate-600"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={school.facebookUrl || "https://facebook.com"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-slate-100 hover:bg-[#2F5187] hover:text-white flex items-center justify-center transition-colors text-slate-600 font-bold text-xs"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href={school.youtubeUrl || "https://youtube.com"}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-slate-100 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors text-slate-600 font-bold text-xs"
                aria-label="YouTube"
              >
                ▶
              </a>
            </div>

            {/* Reference Style Action Buttons */}
            <button
              onClick={openInquiry}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded bg-[#E87737] text-white hover:bg-[#D26425] transition-all shadow-sm"
            >
              Online Admission
            </button>

            <button
              onClick={() => handleNavigate("disclosure")}
              className="hidden lg:inline-flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded border border-[#2F5187] text-[#2F5187] hover:bg-[#2F5187] hover:text-white transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Mandatory Disclosure</span>
            </button>

            {/* Search Toggle Button (Reference search-btn) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#2F5187] hover:bg-slate-100 rounded focus:outline-none transition-colors"
              aria-label="Toggle search bar"
            >
              {isSearchOpen ? <X className="w-5 h-5 text-rose-600" /> : <Search className="w-5 h-5" />}
            </button>

            {/* Mobile Drawer Hamburger Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-[#2F5187] hover:bg-slate-100 rounded focus:outline-none transition-colors"
              aria-label={isMobileOpen ? "Close Menu" : "Open Menu"}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expanding Search Bar (Reference .header-search style) */}
        {isSearchOpen && (
          <div className="border-t border-slate-200 bg-slate-50 py-3 px-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="wrap flex items-center gap-2 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Lotus Global School (e.g. Admission, Labs, Fee Structure, Documents)..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded focus:outline-none focus:border-[#2F5187] shadow-inner"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-[#2F5187] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1E375F] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 3. STYLISH RIBBON NAVIGATION BAR (Pointed Chevron Ends & Drop Shadow matching reference site) */}
      <div className="bg-white py-2 hidden lg:block relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Ribbon Background Layer with Pointed Chevron Ends and Drop Shadow */}
          <div className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 inset-y-0 pointer-events-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]">
            <div
              className="w-full h-full bg-gradient-to-r from-[#244270] via-[#2F5187] to-[#244270]"
              style={{
                clipPath:
                  "polygon(28px 0%, calc(100% - 28px) 0%, 100% 50%, calc(100% - 28px) 100%, 28px 100%, 0% 50%)",
              }}
            />
          </div>

          {/* Actual Interactive Navigation Items Layer (unclipped so dropdowns display freely) */}
          <nav className="relative z-10 px-10 xl:px-14 py-1" aria-label="Main Navigation">
            <ul className="flex items-center justify-center flex-wrap m-0 p-0 list-none gap-0.5 xl:gap-1">
              {navItems.map((item) => {
                const active = isItemActive(item);
                const isOpen = activeDropdown === item.id;

                return (
                  <li
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => handleNavigate(item.id)}
                      className={`flex items-center gap-1 px-3 xl:px-3.5 py-2.5 text-[13px] xl:text-[14px] font-bold tracking-wide transition-all focus:outline-none whitespace-nowrap rounded ${
                        active
                          ? "text-[#FDBA74] bg-white/15 shadow-inner"
                          : "text-white hover:text-[#FDBA74] hover:bg-white/10"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 opacity-80 ${
                            isOpen ? "rotate-180 text-[#FDBA74]" : ""
                          }`}
                        />
                      )}
                    </button>

                    {/* Dropdown Menu (Reference .sub-menu style) */}
                    {item.hasDropdown && item.subItems && (
                      <div
                        className={`absolute left-0 top-full min-w-[260px] bg-white border-t-2 border-[#E87737] shadow-xl py-2 z-50 rounded-b-md transition-all duration-200 ${
                          isOpen
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-1"
                        }`}
                      >
                        <ul className="m-0 p-0 list-none">
                          {item.subItems.map((subItem, idx) => (
                            <li key={idx}>
                              <button
                                onClick={() => handleNavigate(subItem.pageId)}
                                className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-[#EEF3FA] hover:text-[#2F5187] font-semibold transition-colors flex items-center justify-between border-b border-slate-50 last:border-none"
                              >
                                <span>{subItem.label}</span>
                                {subItem.badge ? (
                                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                                    {subItem.badge}
                                  </span>
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2F5187]" />
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-x-0 bottom-0 top-[110px] bg-black/50 z-50 flex flex-col justify-start">
          <div className="bg-white max-h-[80vh] overflow-y-auto shadow-2xl border-b-4 border-[#E87737] p-4">
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  openInquiry();
                }}
                className="w-full py-2.5 px-3 rounded bg-[#E87737] text-white font-bold text-xs uppercase tracking-wider text-center shadow-sm"
              >
                Inquire Now
              </button>
              <button
                onClick={() => handleNavigate("disclosure")}
                className="w-full py-2.5 px-3 rounded bg-[#2F5187] text-white font-bold text-xs uppercase tracking-wider text-center shadow-sm"
              >
                Disclosure
              </button>
            </div>

            {/* Mobile Nav Accordion Items */}
            <div className="divide-y divide-slate-100">
              {navItems.map((item) => {
                const isOpen = openMobileDropdown === item.id;
                const active = isItemActive(item);

                return (
                  <div key={item.id} className="py-2">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleNavigate(item.id)}
                        className={`text-xs font-bold uppercase tracking-wider py-1.5 ${
                          active ? "text-[#E87737]" : "text-[#2F5187]"
                        }`}
                      >
                        {item.label}
                      </button>

                      {item.hasDropdown && (
                        <button
                          onClick={() => setOpenMobileDropdown(isOpen ? null : item.id)}
                          className="p-2 text-slate-500 hover:text-[#2F5187]"
                          aria-label={`Toggle ${item.label} submenu`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>

                    {item.hasDropdown && isOpen && item.subItems && (
                      <div className="pl-3 pr-2 py-1 mt-1 bg-slate-50 rounded border-l-2 border-[#E87737] space-y-1">
                        {item.subItems.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleNavigate(sub.pageId)}
                            className="w-full text-left py-1.5 text-xs text-slate-700 hover:text-[#E87737] font-medium flex items-center justify-between"
                          >
                            <span>{sub.label}</span>
                            {sub.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                                {sub.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
