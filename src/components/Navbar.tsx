import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, Menu, X, ChevronRight } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  openInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, openInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "vision-mission", label: "Mission & Vision" },
    { id: "message", label: "Message" },
    { id: "academics", label: "Academics" },
    { id: "facilities", label: "Facilities" },
    { id: "faculty", label: "Faculty" },
    { id: "gallery", label: "Gallery" },
    { id: "admissions", label: "Admissions" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top micro-bar for institutional trust and quick contacts */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="bg-[#071126] text-slate-300 text-xs py-1.5 px-3 sm:px-4 lg:px-4 xl:px-6 border-b border-white/5">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E86A2C]"></span>
                {SCHOOL_INFO.affiliationStatus}
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-slate-400">Nursery to Grade 10 · Vatar, Vapi</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${SCHOOL_INFO.phone}`}
                className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
              >
                <Phone className="w-3 h-3 text-[#E86A2C]" />
                <span className="tracking-wide">{SCHOOL_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=Hello%20Lotus%20Global%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-3 h-3 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main navigation bar */}
        <nav
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5"
              : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5"
          }`}
        >
          <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-4 xl:px-6 flex items-center justify-between gap-1.5 lg:gap-2 xl:gap-3">
            {/* Logo + Identity (shifted left) */}
            <button
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none shrink-0"
            >
              <div className="relative">
                <img
                  src="/assets/logo.png"
                  alt="Lotus Global School Crest"
                  className={`transition-all duration-300 object-contain ${
                    isScrolled ? "h-10 sm:h-11" : "h-11 sm:h-12"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-[#0B1B3D] text-sm sm:text-base leading-tight tracking-tight group-hover:text-[#E86A2C] transition-colors whitespace-nowrap">
                  LOTUS GLOBAL SCHOOL
                </span>
                <span className="hidden 2xl:inline text-[10px] font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap">
                  Vatar, Vapi, Gujarat
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links (strictly single-line with whitespace-nowrap) */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 shrink-0">
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`whitespace-nowrap px-1.5 xl:px-2 2xl:px-2.5 py-1.5 text-xs xl:text-[13px] 2xl:text-sm font-medium rounded-md transition-all relative ${
                      isActive
                        ? "text-[#0B1B3D] font-semibold bg-slate-100/80"
                        : "text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50"
                    }`}
                  >
                    <span className="whitespace-nowrap inline-block">{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1.5 right-1.5 xl:left-2 xl:right-2 h-0.5 bg-[#E86A2C] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pr-1 sm:pr-2 lg:pr-1">
              <button
                onClick={openInquiry}
                className="hidden sm:inline-flex items-center justify-center px-3 xl:px-3.5 py-2 text-xs uppercase tracking-wider font-semibold rounded-md bg-[#0B1B3D] text-white hover:bg-[#E86A2C] transition-all duration-200 shadow-sm shadow-[#0B1B3D]/10 whitespace-nowrap"
              >
                <span className="hidden xl:inline">Enquire for Admissions</span>
                <span className="xl:hidden">Enquire Now</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-[#0B1B3D] hover:bg-slate-100 rounded-md focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="fixed top-[92px] left-0 right-0 bottom-0 bg-white border-t border-slate-100 p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 pb-2">
                Institution Navigation
              </div>
              {navLinks.map((link) => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-base rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-[#0B1B3D] text-white font-semibold"
                        : "text-slate-700 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    <span className="whitespace-nowrap">{link.label}</span>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? "text-[#E86A2C]" : "text-slate-400"}`} />
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openInquiry();
                }}
                className="w-full py-3 px-4 bg-[#0B1B3D] text-white font-semibold text-center rounded-lg shadow-sm hover:bg-[#E86A2C] transition-colors"
              >
                Enquire for Admissions
              </button>
              <div className="text-center text-xs text-slate-500">
                Call Admissions: <a href={`tel:${SCHOOL_INFO.phone}`} className="font-semibold text-slate-800">{SCHOOL_INFO.phone}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
