import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Sparkles,
  Eye,
  EyeOff,
  LayoutGrid,
  Layers,
  Columns2,
  Check,
  Play,
  X,
} from "lucide-react";
import { getSiteData, subscribeSiteData, HeroSlide } from "../data/siteDataService";
import { getResponsiveUnsplashProps } from "../utils/imageUtils";

interface HeroProps {
  onNavigate: (pageId: string) => void;
  onOpenInquiry: () => void;
}

type DesignMode = "split" | "glass" | "tray";

// Helper to convert standard YouTube URLs to privacy-enhanced embed URLs
const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;
  if (videoId) {
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
  }
  return url.includes("embed") ? url : "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0";
};

// Helper to detect local video files vs online streams
const isLocalVideo = (url?: string) => {
  if (!url) return false;
  return (
    url.endsWith(".mp4") ||
    url.endsWith(".webm") ||
    url.endsWith(".ogg") ||
    url.startsWith("/") ||
    url.includes("/assets/")
  );
};

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenInquiry }) => {
  const initialSiteData = getSiteData();
  const [slides, setSlides] = useState<HeroSlide[]>(initialSiteData.heroSlides);
  const [ticker, setTicker] = useState(initialSiteData.ticker);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Active hero layout design mode - controlled dynamically from Local Admin CMS (default: 'split')
  const [designMode, setDesignMode] = useState<DesignMode>(
    ((initialSiteData as any).heroDesignMode as DesignMode) || "split"
  );
  const [isGlassCardHidden, setIsGlassCardHidden] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    return subscribeSiteData((newData) => {
      setSlides(newData.heroSlides);
      setTicker(newData.ticker);
      if ((newData as any).heroDesignMode) {
        setDesignMode((newData as any).heroDesignMode as DesignMode);
      }
    });
  }, []);

  const activeSlide = slides[currentSlideIndex] || slides[0];

  // Auto-slide effect every 5.5 seconds unless paused, modal open, or on video slide
  useEffect(() => {
    if (isPaused || isVideoModalOpen || activeSlide?.isVideo || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, isVideoModalOpen, activeSlide?.isVideo, slides.length]);

  // ESC key listener to close video modal
  useEffect(() => {
    if (!isVideoModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVideoModalOpen]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = (link: string) => {
    if (link === "admissions-inquiry" || link === "inquiry") {
      onOpenInquiry();
    } else {
      onNavigate(link);
    }
  };

  const handleWatchVideoClick = () => {
    const videoIdx = slides.findIndex((s) => s.isVideo);
    if (videoIdx !== -1) {
      setCurrentSlideIndex(videoIdx);
    }
    setIsPaused(true);
    setIsVideoModalOpen(true);
  };

  const renderPhotoCard = (isMobile = false) => (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15 group aspect-[16/10] sm:aspect-[16/9] bg-slate-900 ${
        isMobile ? "my-3 sm:my-4" : ""
      }`}
    >
      {/* Clean School Photo Carousel - NO dark blue wash! */}
      {slides.map((slide, idx) => {
        const isLcp = idx === 0;
        const isActive = idx === currentSlideIndex;
        {
          const imgProps = getResponsiveUnsplashProps(slide.image, {
            widths: [480, 640, 768, 1024, 1280],
            defaultWidth: isLcp ? 768 : 640,
            sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 750px",
          });
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={imgProps.src}
                srcSet={imgProps.srcSet}
                sizes={imgProps.sizes}
                alt={slide.title}
                width="1280"
                height="800"
                fetchPriority={isLcp ? "high" : "low"}
                loading={isLcp ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* If this is the Video Slide, render the glowing centered play button */}
              {slide.isVideo && (
                <div
                  onClick={() => {
                    setIsPaused(true);
                    setIsVideoModalOpen(true);
                  }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/35 hover:bg-black/25 transition-colors cursor-pointer"
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E87737]/30 animate-ping pointer-events-none" />
                    <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E87737]/40 animate-pulse pointer-events-none" />
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#E87737] to-amber-500 text-white shadow-2xl shadow-[#E87737]/60 flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white ml-1" />
                    </div>
                  </div>
                  <span className="mt-3 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide shadow-lg group-hover:bg-[#E87737] transition-colors flex items-center gap-1.5">
                    <span>▶ Watch Full Campus Tour (2 Min)</span>
                  </span>
                </div>
              )}
            </div>
          );
        }
      })}

      {/* Top Floating Badge on Photo */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none">
        <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-white tracking-wide flex items-center gap-1.5 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#E87737] animate-pulse" />
          <span>
            {activeSlide.isVideo ? "🎬 Campus Video Tour" : "School Showcase"} · Slide {currentSlideIndex + 1} of {slides.length}
          </span>
        </span>
      </div>

      {/* Previous / Next Arrow Controls directly on Photo Card */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-[#E87737] text-white backdrop-blur-sm transition-all shadow-lg focus:outline-none"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/50 hover:bg-[#E87737] text-white backdrop-blur-sm transition-all shadow-lg focus:outline-none"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom subtle photo caption tag */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 sm:p-4 z-20 flex items-center justify-between">
        <span className="text-xs text-white/95 font-medium truncate max-w-[70%] hidden sm:inline">
          {activeSlide.title}
        </span>
        {activeSlide.isVideo ? (
          <button
            onClick={() => {
              setIsPaused(true);
              setIsVideoModalOpen(true);
            }}
            className="text-[11px] text-white bg-[#E87737] hover:bg-[#D26425] px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 shadow-md transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Play Video Tour</span>
          </button>
        ) : (
          <span className="text-[10px] text-[#E87737] font-bold uppercase tracking-wider hidden sm:inline">
            100% Clear View
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full relative">

      {/* =========================================================================
          DESIGN OPTION 1: SPLIT INSTITUTIONAL SHOWCASE (RECOMMENDED)
          - Left: Solid Lotus Navy container with headline, subtitle, motto, buttons.
          - Right: 100% unobstructed, vibrant school photo showcase (NO text covering).
         ========================================================================= */}
      {designMode === "split" && (
        <section
          className="relative bg-gradient-to-br from-[#142540] via-[#1E375F] to-[#142540] text-white min-h-[520px] lg:min-h-[560px] flex items-center overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Lotus Global School Featured Showcase - Split Layout"
        >
          {/* Subtle decorative background ambient glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2F5187]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/3 w-96 h-96 bg-[#E87737]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="wrap py-6 sm:py-14 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Value Proposition & Text (5 cols on lg) */}
              <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                {/* Tagline / Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E87737]/20 border border-[#E87737]/40 text-xs font-bold uppercase tracking-wider text-[#E87737] max-w-full">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeSlide.tagline || "Lotus Global School · Vatar, Vapi"}</span>
                </div>

                {/* Main Title */}
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-snug">
                  {activeSlide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed">
                  {activeSlide.subtitle}
                </p>

                {/* Motto Badge Strip */}
                <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 py-1.5 px-3 rounded bg-[#2F5187]/90 border-l-4 border-[#E87737] text-xs sm:text-sm font-semibold text-slate-100 shadow-sm max-w-full">
                  <span>Motto:</span>
                  <span className="text-[#E87737] font-bold">Dedication</span>
                  <span>·</span>
                  <span className="text-white font-bold">Diligence</span>
                  <span>·</span>
                  <span className="text-[#F7A8D2] font-bold">Discipline</span>
                </div>

                {/* Mobile-Only Photo-Forward Showcase: displays photo directly under title on mobile */}
                <div className="block lg:hidden">
                  {!isDesktop && renderPhotoCard(true)}
                </div>

                {/* Primary CTA Action Button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleWatchVideoClick}
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#E87737]/35 hover:scale-[1.02] active:scale-95 transition-all group cursor-pointer"
                    title="Watch Full Campus Walkthrough Video"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                    </div>
                    <span>Watch Campus Tour</span>
                  </button>
                </div>

                {/* Slide Counter & Dots in Text Panel */}
                <div className="pt-1 flex items-center gap-4 text-xs text-slate-300">
                  <span className="font-mono text-[#E87737] font-bold tracking-wider">
                    0{currentSlideIndex + 1} / 0{slides.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`transition-all rounded-full h-1.5 ${
                          idx === currentSlideIndex
                            ? "w-7 bg-[#E87737]"
                            : "w-2 bg-white/30 hover:bg-white/60"
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: 100% Unobstructed School Photo Showcase (7 cols on lg, hidden on mobile) */}
              <div className="hidden lg:block lg:col-span-7">
                {isDesktop && renderPhotoCard(false)}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          DESIGN OPTION 2: FLOATING FROSTED-GLASS CARD
          - Background: Full-width clear photo with subtle natural light.
          - Text: Grouped into a compact, frosted glass card docked to bottom-left.
          - 70%+ of photo is completely uncovered.
          - Includes toggle button to hide card and view 100% full photo.
         ========================================================================= */}
      {designMode === "glass" && (
        <section
          className="relative bg-slate-900 text-white min-h-[500px] sm:min-h-[560px] md:min-h-[600px] flex items-center overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Lotus Global School Featured Showcase - Glass Card Layout"
        >
          {/* Full-width School Photo - NO dark blue wash, natural colors */}
          {slides.map((slide, idx) => {
            const imgProps = getResponsiveUnsplashProps(slide.image, {
              widths: [640, 960, 1280, 1600],
              defaultWidth: idx === 0 ? 960 : 640,
              sizes: "100vw",
            });
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <img
                  src={imgProps.src}
                  srcSet={imgProps.srcSet}
                  sizes={imgProps.sizes}
                  alt={slide.title}
                  width="1600"
                  height="900"
                  fetchPriority={idx === 0 ? "high" : "low"}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
                {/* Very gentle subtle dark tint only to give card contrast */}
                <div className="absolute inset-0 bg-black/25" />

                {/* If this is the Video Slide, render the glowing centered play button */}
                {slide.isVideo && (
                  <div
                    onClick={() => {
                      setIsPaused(true);
                      setIsVideoModalOpen(true);
                    }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/35 hover:bg-black/25 transition-colors cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E87737]/30 animate-ping pointer-events-none" />
                      <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E87737]/40 animate-pulse pointer-events-none" />
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#E87737] to-amber-500 text-white shadow-2xl shadow-[#E87737]/60 flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white ml-1" />
                      </div>
                    </div>
                    <span className="mt-3 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide shadow-lg hover:bg-[#E87737] transition-colors flex items-center gap-1.5">
                      <span>▶ Watch Full Campus Tour (2 Min)</span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Floating Frosted Glass Card Container */}
          <div className="relative z-20 wrap py-12 sm:py-16 w-full flex items-center">
            <div
              className={`transition-all duration-500 transform ${
                isGlassCardHidden
                  ? "opacity-0 translate-y-6 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="max-w-xl bg-[#142540]/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 text-white shadow-2xl space-y-4">
                {/* Tagline / Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E87737]/20 border border-[#E87737]/40 text-xs font-bold uppercase tracking-wider text-[#E87737] max-w-full">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{activeSlide.tagline || "Lotus Global School · Vatar, Vapi"}</span>
                </div>

                {/* Main Title */}
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                  {activeSlide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm text-slate-200 font-normal leading-relaxed">
                  {activeSlide.subtitle}
                </p>

                {/* Motto Badge Strip */}
                <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 py-1.5 px-3 rounded bg-[#2F5187]/90 border-l-4 border-[#E87737] text-xs sm:text-sm font-semibold text-slate-100 shadow-sm max-w-full">
                  <span>Motto:</span>
                  <span className="text-[#E87737] font-bold">Dedication</span>
                  <span>·</span>
                  <span className="text-white font-bold">Diligence</span>
                  <span>·</span>
                  <span className="text-[#F7A8D2] font-bold">Discipline</span>
                </div>

                {/* Action Button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleWatchVideoClick}
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#E87737]/35 hover:scale-[1.02] active:scale-95 transition-all group cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                    </div>
                    <span>Watch Campus Tour</span>
                  </button>
                </div>


              </div>
            </div>
          </div>

          {/* Toggle Full Photo View button (Bottom-right) */}
          <button
            onClick={() => setIsGlassCardHidden(!isGlassCardHidden)}
            className="absolute bottom-4 right-4 z-30 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all flex items-center gap-2 shadow-lg"
          >
            {isGlassCardHidden ? <Eye className="w-4 h-4 text-[#E87737]" /> : <EyeOff className="w-4 h-4 text-slate-300" />}
            <span>{isGlassCardHidden ? "Show Card" : "View Full Photo"}</span>
          </button>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-[#E87737] text-white transition-colors"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-[#E87737] text-white transition-colors"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all rounded-full ${
                  idx === currentSlideIndex ? "w-8 h-2 bg-[#E87737]" : "w-2.5 h-2 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          DESIGN OPTION 3: FULL PHOTO WITH BOTTOM TRAY
          - Top: 100% full-width unobstructed photo showcase.
          - Bottom: Integrated institutional action tray with title, motto & CTAs.
         ========================================================================= */}
      {designMode === "tray" && (
        <section
          className="relative bg-slate-900 text-white overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Lotus Global School Featured Showcase - Bottom Tray Layout"
        >
          {/* Top Unobstructed Photo Slider */}
          <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] bg-slate-900 overflow-hidden">
            {slides.map((slide, idx) => {
              const imgProps = getResponsiveUnsplashProps(slide.image, {
                widths: [640, 960, 1280, 1600],
                defaultWidth: idx === 0 ? 960 : 640,
                sizes: "100vw",
              });
              return (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={imgProps.src}
                    srcSet={imgProps.srcSet}
                    sizes={imgProps.sizes}
                    alt={slide.title}
                    width="1600"
                    height="900"
                    fetchPriority={idx === 0 ? "high" : "low"}
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* If this is the Video Slide, render the glowing centered play button */}
                  {slide.isVideo && (
                    <div
                      onClick={() => {
                        setIsPaused(true);
                        setIsVideoModalOpen(true);
                      }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/35 hover:bg-black/25 transition-colors cursor-pointer"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#E87737]/30 animate-ping pointer-events-none" />
                        <span className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#E87737]/40 animate-pulse pointer-events-none" />
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#E87737] to-amber-500 text-white shadow-2xl shadow-[#E87737]/60 flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white ml-1" />
                        </div>
                      </div>
                      <span className="mt-3 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide shadow-lg hover:bg-[#E87737] transition-colors flex items-center gap-1.5">
                        <span>▶ Watch Full Campus Tour (2 Min)</span>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Slide badge floating on photo */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white tracking-wide flex items-center gap-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-[#E87737] animate-pulse" />
                <span>Facility Photo {currentSlideIndex + 1} of {slides.length}</span>
              </span>
            </div>

            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-[#E87737] text-white transition-colors"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-[#E87737] text-white transition-colors"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`transition-all rounded-full ${
                    idx === currentSlideIndex ? "w-8 h-2 bg-[#E87737]" : "w-2.5 h-2 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Institutional Content Tray */}
          <div className="bg-[#142540] text-white py-6 sm:py-8 border-t-4 border-[#E87737] shadow-xl">
            <div className="wrap">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Tagline, Title, Subtitle */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E87737]/20 border border-[#E87737]/40 text-xs font-bold uppercase tracking-wider text-[#E87737]">
                    <Sparkles className="w-3 h-3" />
                    <span>{activeSlide.tagline || "Lotus Global School · Vatar, Vapi"}</span>
                  </div>

                  <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-tight">
                    {activeSlide.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                    {activeSlide.subtitle}
                  </p>
                </div>

                {/* Right: Motto & Buttons */}
                <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3.5">
                  <div className="inline-flex flex-wrap items-center gap-1.5 py-1 px-2.5 rounded bg-[#2F5187]/90 border-l-4 border-[#E87737] text-xs font-semibold text-slate-100 shadow-sm">
                    <span>Motto:</span>
                    <span className="text-[#E87737] font-bold">Dedication</span>
                    <span>·</span>
                    <span className="text-white font-bold">Diligence</span>
                    <span>·</span>
                    <span className="text-[#F7A8D2] font-bold">Discipline</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleWatchVideoClick}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white text-white" />
                      <span>Watch Tour</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          ANNOUNCEMENTS TICKER MARQUEE (PRESERVED AS IN EXISTING DESIGN)
         ========================================================================= */}
      {ticker && ticker.active && (
        <section className="bg-[#2F5187] text-white py-2 sm:py-3 px-3 sm:px-4 border-b-2 border-[#E87737] overflow-hidden shadow-inner">
          <div className="wrap flex items-center gap-2.5 sm:gap-4">
            <span className="shrink-0 text-[10px] sm:text-xs font-bold uppercase tracking-tight sm:tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#E87737] text-white shadow-sm">
              Announcements
            </span>
            <div className="flex-1 overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee text-xs sm:text-sm font-medium tracking-wide">
                {ticker.text} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ★ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ticker.text}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          CAMPUS WALKTHROUGH VIDEO LIGHTBOX MODAL
         ========================================================================= */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Campus Walkthrough Video Modal"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => {
            setIsVideoModalOpen(false);
            setIsPaused(false);
          }}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#142540] border-b border-white/10">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E87737]/20 border border-[#E87737]/40 flex items-center justify-center text-[#E87737]">
                  <Play className="w-4 h-4 fill-[#E87737]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                    Lotus Global School · Campus Walkthrough Tour
                  </h3>
                  <p className="text-xs text-slate-300">
                    Vatar, Vapi · Nursery to Grade 10 · Proposed CBSE Institution
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  setIsPaused(false);
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Video Player (16:9 Aspect Ratio) */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {(() => {
                const targetUrl = (slides.find((s) => s.isVideo) || activeSlide).videoUrl || "/assets/Lotus_Global_School_Campus_Tour.mp4";
                if (isLocalVideo(targetUrl)) {
                  return (
                    <video
                      src={targetUrl}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    >
                      Your browser does not support HTML5 video.
                    </video>
                  );
                }
                return (
                  <iframe
                    src={getYouTubeEmbedUrl(targetUrl)}
                    title="Lotus Global School Campus Tour Video"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3 bg-[#142540] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-300 font-medium">
                Campus Walkthrough Tour · Lotus Global School, Vatar, Vapi
              </span>
              <div className="flex items-center gap-2 sm:gap-3">
                {(() => {
                  const targetUrl = (slides.find((s) => s.isVideo) || activeSlide).videoUrl || "/assets/Lotus_Global_School_Campus_Tour.mp4";
                  if (!isLocalVideo(targetUrl)) {
                    return (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Open on YouTube</span>
                      </a>
                    );
                  }
                  return (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Full HD Video (25 MB)</span>
                    </a>
                  );
                })()}
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    setIsPaused(false);
                    onOpenInquiry();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#E87737] hover:bg-[#D26425] text-white font-bold transition-colors cursor-pointer"
                >
                  Apply for Admission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

