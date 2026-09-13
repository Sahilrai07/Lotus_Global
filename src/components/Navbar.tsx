import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail, ChevronDown, Menu, X, ChevronRight, MessageSquare, Clock, MapPin } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";

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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItems: NavItem[] = [
    { id: "home", label: "HOME" },
    {
      id: "about",
      label: "ABOUT US",
      hasDropdown: true,
      subItems: [
        { label: "Overview & Campus", pageId: "about" },
        { label: "Mission & Vision", pageId: "vision-mission" },
        { label: "Principal's Desk", pageId: "message" },
        { label: "Core Values & Pillars", pageId: "about" },
        { label: "Location & Directions", pageId: "contact" },
      ],
    },
    {
      id: "academics",
      label: "ACADEMICS",
      hasDropdown: true,
      subItems: [
        { label: "Curriculum Framework", pageId: "academics" },
        { label: "Developmental Stages (Nursery - Grade 10)", pageId: "academics" },
        { label: "Assessment & Examination", pageId: "academics" },
        { label: "School Timings & Routine", pageId: "academics" },
      ],
    },
    {
      id: "facilities",
      label: "CAMPUS FACILITIES",
      hasDropdown: true,
      subItems: [
        { label: "All Facilities Overview", pageId: "facilities" },
        { label: "Chemistry & Physics Labs", pageId: "facilities" },
        { label: "Biology & Composite Science Lab", pageId: "facilities" },
        { label: "Computer Laboratory", pageId: "facilities" },
        { label: "Central Library & Sanctum", pageId: "facilities" },
        { label: "Sports Arena & Athletics", pageId: "facilities" },
        { label: "Music & Performing Arts Studio", pageId: "facilities" },
        { label: "Campus Infirmary & First-Aid", pageId: "facilities" },
      ],
    },
    {
      id: "admissions",
      label: "ADMISSIONS",
      hasDropdown: true,
      subItems: [
        { label: "Admissions Pathway (4 Steps)", pageId: "admissions" },
        { label: "Document Checklist", pageId: "admissions" },
        { label: "Eligibility & Age Criteria", pageId: "admissions" },
        { label: "Admissions Inquiry Form", pageId: "admissions" },
      ],
    },
    {
      id: "faculty",
      label: "FACULTY",
      hasDropdown: true,
      subItems: [
        { label: "Faculty Standards", pageId: "faculty" },
        { label: "Pedagogical Excellence", pageId: "faculty" },
        { label: "Professional Development", pageId: "faculty" },
      ],
    },
    { id: "gallery", label: "GALLERY" },
    { id: "contact", label: "CONTACT US" },
  ];

  const handleNavigate = (pageId: string) => {
    setActivePage(pageId);
    setActiveDropdown(null);
    setIsMobileOpen(false);
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

  // Close mobile drawer on resize to desktop
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

  return (
    <header className="w-full bg-white shadow-sm z-50 sticky top-0">
      {/* Topmost Institutional Micro-bar */}
      <div className="bg-[#1E375F] text-white text-xs py-1.5 px-4 border-b border-[#2F5187]">
        <div className="wrap flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#E87737]"></span>
              {SCHOOL_INFO.affiliationStatus} (NCERT Framework)
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-[#E87737]" />
              Near Vatar PHC, Vatar, Vapi, Gujarat
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs ml-auto">
            <a
              href={`tel:${SCHOOL_INFO.phone}`}
              className="flex items-center gap-1 text-slate-200 hover:text-[#E87737] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E87737]" />
              <span className="font-semibold">{SCHOOL_INFO.phone}</span>
            </a>
            <span className="text-slate-400">|</span>
            <a
              href={`mailto:${SCHOOL_INFO.email}`}
              className="hidden sm:flex items-center gap-1 text-slate-200 hover:text-[#E87737] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#E87737]" />
              <span>{SCHOOL_INFO.email}</span>
            </a>
            <a
              href={`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=Hello%20Lotus%20Global%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
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

      {/* Header Middle: School Brand, Logo & Identity Area */}
      <div className="bg-white py-3 sm:py-4 border-b border-slate-100">
        <div className="wrap flex items-center justify-between gap-4">
          {/* Logo & School Title */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-3 sm:gap-4 text-left group focus:outline-none"
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
                Motto: Dedication · Diligence · Discipline
              </span>
            </div>
          </button>

          {/* Quick Institutional Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openInquiry}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded bg-[#E87737] text-white hover:bg-[#D26425] transition-all shadow-sm"
            >
              Admissions Inquiry
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-[#2F5187] hover:bg-slate-100 rounded focus:outline-none"
              aria-label={isMobileOpen ? "Close Menu" : "Open Menu"}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Institutional Navy Bar inspired by reference site) */}
      <nav className="bg-[#2F5187] border-t border-[#1E375F] border-b-2 border-[#E87737] hidden lg:block">
        <div className="wrap">
          <ul className="flex items-center flex-wrap m-0 p-0 list-none">
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
                    className={`flex items-center gap-1.5 px-3.5 xl:px-4 py-3.5 text-[13px] xl:text-[14px] font-bold tracking-wider transition-all uppercase border-r border-[#3d65a3] focus:outline-none whitespace-nowrap ${
                      active
                        ? "bg-[#E87737] text-white"
                        : "text-white hover:bg-[#264371] hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && item.subItems && isOpen && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-b shadow-xl border-t-2 border-[#E87737] z-50 animate-fade-in">
                      <ul className="py-1 list-none m-0 p-0 divide-y divide-slate-100">
                        {item.subItems.map((sub, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => handleNavigate(sub.pageId)}
                              className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors flex items-center justify-between ${
                                activePage === sub.pageId
                                  ? "bg-[#FFF5EE] text-[#E87737] font-bold"
                                  : "text-slate-700 hover:bg-slate-50 hover:text-[#2F5187]"
                              }`}
                            >
                              <span>{sub.label}</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
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
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-auto bottom-0 z-40 bg-black/40 backdrop-blur-sm h-[calc(100vh-100px)]">
          <div className="bg-white h-full overflow-y-auto flex flex-col justify-between border-t border-slate-200 p-4">
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#2F5187] px-2 py-1 border-b border-slate-200 mb-2">
                School Navigation Menu
              </div>

              {navItems.map((item) => {
                const active = isItemActive(item);
                const isExpanded = openMobileDropdown === item.id;

                if (!item.hasDropdown) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded font-semibold text-left transition-colors ${
                        active
                          ? "bg-[#2F5187] text-white"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className={`w-4 h-4 ${active ? "text-[#E87737]" : "text-slate-400"}`} />
                    </button>
                  );
                }

                return (
                  <div key={item.id} className="border-b border-slate-100 pb-1">
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(isExpanded ? null : item.id)
                      }
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded font-semibold text-left transition-colors ${
                        active
                          ? "text-[#2F5187] bg-slate-50"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isExpanded ? "rotate-180 text-[#E87737]" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {isExpanded && item.subItems && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded mt-1">
                        {item.subItems.map((sub, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleNavigate(sub.pageId)}
                            className={`w-full text-left px-3 py-2 text-xs font-medium rounded flex items-center justify-between ${
                              activePage === sub.pageId
                                ? "bg-[#2F5187] text-white font-bold"
                                : "text-slate-600 hover:text-[#2F5187]"
                            }`}
                          >
                            <span>{sub.label}</span>
                            <ChevronRight className="w-3 h-3 text-slate-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Actions Footer */}
            <div className="pt-4 mt-6 border-t border-slate-200 space-y-3">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  openInquiry();
                }}
                className="w-full py-3 px-4 bg-[#E87737] text-white font-bold text-xs uppercase tracking-wider rounded shadow text-center hover:bg-[#D26425]"
              >
                Submit Admissions Inquiry
              </button>
              <div className="text-center text-xs text-slate-500">
                Admissions Desk:{" "}
                <a href={`tel:${SCHOOL_INFO.phone}`} className="font-bold text-[#2F5187]">
                  {SCHOOL_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
