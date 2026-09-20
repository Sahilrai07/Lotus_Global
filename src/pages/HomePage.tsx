import React from "react";
import { Hero } from "../components/Hero";
import { QuickFeaturesRow } from "../components/QuickFeaturesRow";
import { LeadershipDeskSection } from "../components/LeadershipDeskSection";
import { UpdatesSection } from "../components/UpdatesSection";
import { HomeGalleryPreview } from "../components/HomeGalleryPreview";
import { PreFooterStrip } from "../components/PreFooterStrip";
import { getSiteData } from "../data/siteDataService";
import {
  ArrowRight,
  Target,
  BookOpen,
  HeartHandshake,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";

interface HomePageProps {
  setActivePage: (page: string) => void;
  openInquiry: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage, openInquiry }) => {
  const siteData = getSiteData();
  const school = siteData.schoolInfo;
  const facilities = siteData.facilities.slice(0, 4);

  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      {/* 1. HERO SLIDER BANNER + MARQUEE TICKER (Reference .slider-front + .section-scroll) */}
      <Hero onNavigate={navigateTo} onOpenInquiry={openInquiry} />

      {/* 2. 4-CARD QUICK GATEWAY ROW (Reference .home-about.facilities 4-col row) */}
      <QuickFeaturesRow onNavigate={navigateTo} />

      {/* 3. WELCOME / ABOUT SECTION (Reference .home-about.about-section 1/3 + 2/3 layout) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* 1/3 Left Column: Feature Campus Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border-2 border-slate-200 shadow-lg group">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
                  alt="Lotus Global School Campus"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#142540] via-[#142540]/70 to-transparent p-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87737] block">
                    Vatar, Vapi Campus
                  </span>
                  <h4 className="font-display font-bold text-base sm:text-lg">
                    {school.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {school.grades} · {school.affiliationStatus}
                  </p>
                </div>
              </div>
            </div>

            {/* 2/3 Right Column: Narrative & Signature Dividers */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E87737]">
                  Welcome to Our Institution
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#2F5187] tracking-tight uppercase">
                  {school.name}
                </h2>
                <div className="flex items-center gap-2 pt-1 pb-2">
                  <span className="w-12 h-1 bg-[#E87737] rounded"></span>
                  <span className="w-24 h-0.5 bg-slate-300 rounded"></span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg text-slate-800 font-semibold leading-snug">
                {school.narrative.heroSubtext}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {school.narrative.leadParagraph}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {school.narrative.pedagogy}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo("about")}
                  className="px-6 py-2.5 rounded bg-[#2F5187] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1E375F] transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span>Read More »</span>
                </button>
                <button
                  onClick={openInquiry}
                  className="px-6 py-2.5 rounded bg-[#E87737] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#D26425] transition-colors shadow-sm"
                >
                  Apply for Admission
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 3-COLUMN LEADERSHIP DESK (Reference .section-admin: President, MD, Principal) */}
      <LeadershipDeskSection onNavigate={navigateTo} />

      {/* 5. 3-COLUMN UPDATES SECTION (Reference .content-front.updates: Events, News, Circulars) */}
      <UpdatesSection onNavigate={navigateTo} openInquiry={openInquiry} />

      {/* 6. CAMPUS FACILITIES CATALOG (Reference .content-bottom) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="wrap">
          <div className="section-title-wrap">
            <h2 className="section-title-institutional">
              CAMPUS FACILITIES & LABORATORIES
            </h2>
            <hr className="hr1" />
            <hr className="hr2" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              State-of-the-art empirical laboratories, modern computing center, central library, and athletic grounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility) => (
              <div
                key={facility.id}
                className="flex flex-col sm:flex-row gap-5 p-5 rounded-lg border border-slate-200 bg-[#F8FAFC] hover:border-[#2F5187]/50 transition-all shadow-sm group"
              >
                <div className="sm:w-48 sm:h-36 w-full h-48 shrink-0 overflow-hidden rounded border border-slate-200 bg-slate-100">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                      <span>Read more »</span>
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
              className="px-6 py-3 rounded border-2 border-[#2F5187] text-[#2F5187] hover:bg-[#2F5187] hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              View All Campus Laboratories & Infrastructure
            </button>
          </div>
        </div>
      </section>

      {/* 7. PHOTO GALLERY SHOWCASE (Reference .photo-gallery-list) */}
      <HomeGalleryPreview onNavigate={navigateTo} />

      {/* 8. CORE VALUES & MOTTO CREED */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="wrap">
          <div className="section-title-wrap">
            <h2 className="section-title-institutional">
              CORE VALUES & INSTITUTIONAL CREED
            </h2>
            <hr className="hr1" />
            <hr className="hr2" />
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Our three guiding pillars anchor intellectual curiosity, moral clarity, and lifelong discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dedication */}
            <div className="p-6 rounded-lg border-t-4 border-t-[#E87737] bg-[#F8FAFC] border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#FFF5EE] text-[#E87737] flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Dedication
              </h3>
              <div className="text-xs font-semibold text-[#E87737]">
                {school.mottoValues.dedication.short}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {school.mottoValues.dedication.full}
              </p>
            </div>

            {/* Diligence */}
            <div className="p-6 rounded-lg border-t-4 border-t-[#2F5187] bg-[#F8FAFC] border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#EEF3FA] text-[#2F5187] flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Diligence
              </h3>
              <div className="text-xs font-semibold text-[#2F5187]">
                {school.mottoValues.diligence.short}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {school.mottoValues.diligence.full}
              </p>
            </div>

            {/* Discipline */}
            <div className="p-6 rounded-lg border-t-4 border-t-[#F7A8D2] bg-[#F8FAFC] border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-lg bg-[#FDF2F8] text-[#E25B88] flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Discipline
              </h3>
              <div className="text-xs font-semibold text-[#E25B88]">
                {school.mottoValues.discipline.short}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {school.mottoValues.discipline.full}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRE-FOOTER CALLOUT STRIP (Reference .before-footer.before-footer-style2) */}
      <PreFooterStrip />
    </main>
  );
};
