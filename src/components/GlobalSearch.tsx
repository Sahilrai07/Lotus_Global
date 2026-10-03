import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  BookOpen,
  FileText,
  GraduationCap,
  Building,
  Users,
  Phone,
  Calendar,
  Activity,
  Sparkles,
  ChevronRight,
  Clock,
  MapPin,
  SearchX,
  CornerDownLeft,
} from "lucide-react";
import { SiteData } from "../data/siteDataService";
import {
  searchSchoolContent,
  SearchResultItem,
  POPULAR_SEARCH_SUGGESTIONS,
} from "../utils/searchIndex";

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (pageId: string) => void;
  siteData: SiteData;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  isOpen,
  onClose,
  onNavigate,
  siteData,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      setSelectedIndex(-1);
    } else {
      setSearchQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  // Perform search whenever query or siteData changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }
    const matches = searchSchoolContent(searchQuery, siteData, 12);
    setResults(matches);
    setSelectedIndex(matches.length > 0 ? 0 : -1);
  }, [searchQuery, siteData]);

  // Handle global escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (results.length > 0) {
          setSelectedIndex((prev) => (prev + 1) % results.length);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (results.length > 0) {
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results.length > 0) {
          const target = selectedIndex >= 0 ? results[selectedIndex] : results[0];
          handleSelectResult(target);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Scroll active item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsContainerRef.current) {
      const activeElem = resultsContainerRef.current.querySelector(
        `[data-result-index="${selectedIndex}"]`
      ) as HTMLElement | null;
      if (activeElem) {
        activeElem.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const handleSelectResult = (item: SearchResultItem) => {
    onNavigate(item.pageId);
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length > 0) {
      const target = selectedIndex >= 0 ? results[selectedIndex] : results[0];
      handleSelectResult(target);
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case "Admissions":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          badgeBg: "bg-emerald-100 text-emerald-800",
        };
      case "Academics":
        return {
          bg: "bg-blue-50",
          text: "text-[#2F5187]",
          border: "border-blue-200",
          badgeBg: "bg-blue-100 text-[#2F5187]",
        };
      case "Facilities":
        return {
          bg: "bg-orange-50",
          text: "text-[#E87737]",
          border: "border-orange-200",
          badgeBg: "bg-orange-100 text-[#D26425]",
        };
      case "Faculty":
        return {
          bg: "bg-purple-50",
          text: "text-purple-700",
          border: "border-purple-200",
          badgeBg: "bg-purple-100 text-purple-800",
        };
      case "Documents":
        return {
          bg: "bg-rose-50",
          text: "text-rose-700",
          border: "border-rose-200",
          badgeBg: "bg-rose-100 text-rose-800",
        };
      case "Notices & News":
        return {
          bg: "bg-amber-50",
          text: "text-amber-800",
          border: "border-amber-200",
          badgeBg: "bg-amber-100 text-amber-900",
        };
      case "Contact":
        return {
          bg: "bg-teal-50",
          text: "text-teal-700",
          border: "border-teal-200",
          badgeBg: "bg-teal-100 text-teal-800",
        };
      default:
        return {
          bg: "bg-slate-50",
          text: "text-slate-700",
          border: "border-slate-200",
          badgeBg: "bg-slate-100 text-slate-700",
        };
    }
  };

  const renderIcon = (type: SearchResultItem["iconType"], className: string) => {
    switch (type) {
      case "book":
        return <BookOpen className={className} />;
      case "file":
        return <FileText className={className} />;
      case "facility":
        return <Building className={className} />;
      case "faculty":
        return <Users className={className} />;
      case "admission":
        return <GraduationCap className={className} />;
      case "calendar":
        return <Calendar className={className} />;
      case "phone":
        return <Phone className={className} />;
      case "activity":
        return <Activity className={className} />;
      case "about":
      default:
        return <Sparkles className={className} />;
    }
  };

  // Highlight matching terms in title
  const renderHighlightedText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.trim()})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.trim().toLowerCase() ? (
            <mark key={i} className="bg-amber-100 text-[#2F5187] font-bold rounded px-0.5">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 transition-opacity animate-in fade-in duration-150"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search Container Panel */}
      <div className="fixed inset-x-0 top-0 sm:top-14 md:top-20 z-50 max-w-3xl mx-auto px-3 sm:px-4 py-2 pointer-events-none">
        <div className="pointer-events-auto bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 slide-in-from-top-4 duration-200">
          {/* 1. Search Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-2 sm:gap-3 px-4 py-3 sm:py-3.5 border-b border-slate-200 bg-slate-50/80"
          >
            <Search className="w-5 h-5 text-[#2F5187] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Lotus Global School (e.g., Admissions, Fees, Labs, Books, Timings, CBSE)..."
              className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  inputRef.current?.focus();
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 rounded border border-slate-200 shadow-xs transition-colors shrink-0"
            >
              ESC
            </button>
          </form>

          {/* 2. Search Content Body */}
          <div
            ref={resultsContainerRef}
            className="overflow-y-auto divide-y divide-slate-100 p-2 sm:p-3 flex-1 focus:outline-none"
          >
            {/* STATE A: User has not typed anything -> Show Quick Links & Popular Searches */}
            {!searchQuery.trim() && (
              <div className="py-2 px-1">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E87737]" />
                    Popular Searches & Quick Access
                  </span>
                  <span className="text-[11px] text-slate-400">Click to jump directly</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                  {POPULAR_SEARCH_SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onNavigate(item.targetPageId);
                        onClose();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-lg text-left bg-slate-50 hover:bg-[#EEF3FA] border border-slate-100 hover:border-[#2F5187]/20 group transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-7 h-7 rounded-md bg-white shadow-xs border border-slate-100 flex items-center justify-center text-[#2F5187] group-hover:bg-[#2F5187] group-hover:text-white transition-colors shrink-0">
                          {item.category === "Admissions" ? (
                            <GraduationCap className="w-4 h-4" />
                          ) : item.category === "Academics" ? (
                            <BookOpen className="w-4 h-4" />
                          ) : item.category === "Facilities" ? (
                            <Building className="w-4 h-4" />
                          ) : item.category === "Documents" ? (
                            <FileText className="w-4 h-4" />
                          ) : item.category === "Faculty" ? (
                            <Users className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                        </span>
                        <div className="truncate">
                          <span className="text-xs font-semibold text-slate-700 group-hover:text-[#2F5187] block truncate">
                            {item.label}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#2F5187] transition-colors shrink-0" />
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 px-2 flex items-center justify-between text-xs text-slate-400">
                  <span>💡 Tip: Type keywords like "library", "exam", "uniform", "physics", or "contact"</span>
                </div>
              </div>
            )}

            {/* STATE B: User is searching and HAS results */}
            {searchQuery.trim() && results.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between px-2 py-1.5 text-xs text-slate-400 border-b border-slate-100 mb-1">
                  <span>
                    Found <strong className="text-[#2F5187]">{results.length}</strong> matching results for "{searchQuery}"
                  </span>
                  <span className="hidden sm:inline text-[11px]">Use ↑↓ to browse, Enter to open</span>
                </div>

                {results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  const styles = getCategoryStyles(item.category);

                  return (
                    <div
                      key={item.id}
                      data-result-index={index}
                      onClick={() => handleSelectResult(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#EEF3FA] border-l-4 border-[#2F5187] shadow-xs"
                          : "hover:bg-slate-50 border-l-4 border-transparent"
                      }`}
                    >
                      {/* Icon */}
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                          isSelected ? "bg-white border-[#2F5187]/20 shadow-xs" : `${styles.bg} ${styles.border}`
                        }`}
                      >
                        {renderIcon(
                          item.iconType,
                          `w-4 h-4 ${isSelected ? "text-[#2F5187]" : styles.text}`
                        )}
                      </div>

                      {/* Info & Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span
                            className={`text-xs sm:text-sm font-bold truncate ${
                              isSelected ? "text-[#2F5187]" : "text-slate-800"
                            }`}
                          >
                            {renderHighlightedText(item.title, searchQuery)}
                          </span>
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${styles.badgeBg}`}
                          >
                            {item.categoryBadge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Action indicator */}
                      <div className="shrink-0 self-center">
                        {isSelected ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-[#2F5187] bg-white px-2 py-1 rounded border border-[#2F5187]/20 shadow-xs">
                            <span>Open</span>
                            <CornerDownLeft className="w-3 h-3" />
                          </span>
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* STATE C: User typed something but NO matches were found */}
            {searchQuery.trim() && results.length === 0 && (
              <div className="py-8 px-4 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <SearchX className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
                  No results found for "<span className="text-[#E87737]">{searchQuery}</span>"
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-5 leading-relaxed">
                  We couldn't find any direct matches. Try checking your spelling, or explore these popular institutional sections:
                </p>

                {/* Helpful clickable fallback suggestions */}
                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                  {[
                    { label: "Admissions Pathway", pageId: "admissions" },
                    { label: "Fee Structure", pageId: "admissions-fee" },
                    { label: "Prescribed Books", pageId: "academics-books" },
                    { label: "Campus Facilities", pageId: "facilities" },
                    { label: "Central Library", pageId: "facility-library" },
                    { label: "CBSE Disclosure", pageId: "disclosure" },
                    { label: "School Timings", pageId: "academics-timings" },
                    { label: "Contact Us", pageId: "contact" },
                  ].map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        onNavigate(sug.pageId);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-100 hover:bg-[#2F5187] text-slate-700 hover:text-white transition-colors cursor-pointer"
                    >
                      {sug.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 3. Search Panel Footer */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-xs">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-xs">
                  ↓
                </kbd>
                <span className="text-slate-400">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-xs">
                  ↵
                </kbd>
                <span className="text-slate-400">Select</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono shadow-xs">
                  ESC
                </kbd>
                <span className="text-slate-400">Close</span>
              </span>
            </div>
            <span className="text-slate-400 font-medium">Lotus Global School Search</span>
          </div>
        </div>
      </div>
    </>
  );
};
