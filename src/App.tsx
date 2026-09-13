import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { InquiryModal } from "./components/InquiryModal";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { VisionMissionPage } from "./pages/VisionMissionPage";
import { MessagePage } from "./pages/MessagePage";
import { AcademicsPage } from "./pages/AcademicsPage";
import { FacilitiesPage } from "./pages/FacilitiesPage";
import { FacultyPage } from "./pages/FacultyPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AdmissionsPage } from "./pages/AdmissionsPage";
import { ContactPage } from "./pages/ContactPage";
import { MessageSquare, ArrowUp } from "lucide-react";
import { SCHOOL_INFO } from "./data/schoolData";

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("home");
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync with window.location.hash for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        [
          "home",
          "about",
          "vision-mission",
          "mission-vision",
          "vision",
          "message",
          "academics",
          "facilities",
          "faculty",
          "gallery",
          "admissions",
          "contact",
        ].includes(hash)
      ) {
        if (hash === "mission-vision" || hash === "vision") {
          setActivePage("vision-mission");
        } else {
          setActivePage(hash);
        }
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activePage) {
      case "about":
        return (
          <AboutPage
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
      case "facilities":
        return (
          <FacilitiesPage
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
      case "contact":
        return (
          <ContactPage
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
      {/* Global Institutional Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        openInquiry={() => setIsInquiryOpen(true)}
      />

      {/* Main Page Content */}
      <div className="flex-1">{renderPage()}</div>

      {/* Institutional 3-Column Footer */}
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
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded bg-white text-[#2F5187] border border-slate-300 shadow-md hover:bg-slate-50 transition-all"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=Hello%20Lotus%20Global%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-center p-3.5 rounded bg-emerald-700 text-white shadow-lg hover:bg-emerald-600 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-semibold pl-0 group-hover:pl-2">
            Admissions WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
};
