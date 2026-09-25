import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Sliders,
  Info,
  Users,
  Building2,
  GraduationCap,
  Image as ImageIcon,
  Bell,
  FileText,
  PhoneCall,
  Save,
  Plus,
  Trash2,
  Upload,
  Check,
  ExternalLink,
  Eye,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
  X,
  Layout,
  Columns2,
  Layers,
  LayoutGrid,
  Compass,
  ShieldCheck,
  Award,
  Mail,
  LogOut,
} from "lucide-react";
import {
  getSiteData,
  saveSiteData,
  uploadFile,
  SiteData,
  UploadFolder,
  HeroSlide,
  Facility,
  FacultyMember,
  GalleryItem,
  NoticeItem,
  EventItem,
  NewsItem,
  DocumentItem,
  QuickFeature,
  fetchFreshData,
} from "../../data/siteDataService";
import { PageBannersEditor } from "./PageBannersEditor";
import { AboutEditor } from "./AboutEditor";
import { AcademicsEditor } from "./AcademicsEditor";
import { AdmissionsEditor } from "./AdmissionsEditor";
import { ActivitiesEditor } from "./ActivitiesEditor";
import { DisclosureEditor } from "./DisclosureEditor";
import { FacultyStandardsEditor } from "./FacultyStandardsEditor";
import { InquiriesDeskEditor } from "./InquiriesDeskEditor";

interface AdminDashboardProps {
  onBackToSite: () => void;
  currentUser?: { id?: string; email?: string; name?: string; role?: string } | null;
  onLogout?: () => void;
}

type TabType =
  | "overview"
  | "inquiries"
  | "banners"
  | "hero"
  | "about"
  | "academics"
  | "leadership"
  | "facilities"
  | "faculty"
  | "admissions"
  | "activities"
  | "disclosure"
  | "gallery"
  | "notices"
  | "documents"
  | "contact";


export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  currentUser,
  onLogout,
}) => {
  const [data, setData] = useState<SiteData>(getSiteData());
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Load fresh data from cloud database on mount
  useEffect(() => {
    fetchFreshData().then((fresh) => setData(fresh));
  }, []);

  const showStatus = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await saveSiteData(data);
    setIsSaving(false);
    if (result.success) {
      showStatus("All changes saved live to cloud database! Changes are now live on the school website.");
    } else {
      showStatus(result.message || "Failed to save data.", "error");
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    folder: UploadFolder,
    onUploaded: (url: string, fileName?: string, fileSize?: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const result = await uploadFile(file, folder);
    setIsUploading(false);

    if (result.success && result.url) {
      onUploaded(result.url, result.fileName, result.fileSize);
      showStatus(result.message || `File uploaded and optimized successfully! (${result.fileSize})`);
    } else {
      showStatus(result.message || "Upload failed", "error");
    }
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Admin Header Bar */}
      <header className="bg-[#142540] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-md border-b-2 border-[#E87737] sticky top-0 z-50">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Public Website</span>
          </button>
          <div className="h-5 w-px bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-display font-bold text-xs sm:text-sm tracking-wide text-white">
              Lotus Global School — CMS
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white uppercase tracking-wider shadow-sm">
              Live Cloud DB
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-white">{currentUser.name || currentUser.email}</span>
              <span className="text-[10px] uppercase font-bold text-[#E87737]">({currentUser.role || "ADMIN"})</span>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer"
          >
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Live Changes</span>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center gap-1 px-3 py-2 rounded bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              title="Sign Out of Admin CMS"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </header>

      {/* Status Toast Notification */}
      {statusMessage && (
        <div
          className={`fixed top-16 right-6 z-50 px-4 py-3 rounded-lg shadow-xl text-xs font-bold flex items-center gap-2 transition-all ${
            statusMessage.type === "success"
              ? "bg-emerald-700 text-white"
              : "bg-rose-700 text-white"
          }`}
        >
          {statusMessage.type === "success" ? (
            <Check className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          <span>{statusMessage.text}</span>
          <button onClick={() => setStatusMessage(null)} className="ml-2 hover:opacity-75">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main CMS Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-4 shrink-0 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Content Modules
          </div>
          <nav className="space-y-1">
            {[
              { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
              { id: "inquiries", label: "Admissions Inquiries Desk", icon: Mail },
              { id: "banners", label: "Category Header Banners", icon: ImageIcon },
              { id: "hero", label: "Hero & Banner Slides", icon: Sliders },
              { id: "about", label: "About, Vision & Values", icon: Info },
              { id: "academics", label: "Academics & Curricular", icon: GraduationCap },
              { id: "leadership", label: "Leadership Desks", icon: Users },
              { id: "facilities", label: "Facilities Manager", icon: Building2 },
              { id: "faculty", label: "Faculty Directory & Standards", icon: GraduationCap },
              { id: "admissions", label: "Admissions Pathway", icon: Compass },
              { id: "activities", label: "Co-Curricular & Clubs", icon: Award },
              { id: "disclosure", label: "Mandatory Disclosures", icon: ShieldCheck },
              { id: "gallery", label: "Gallery Manager", icon: ImageIcon },
              { id: "notices", label: "Notices & Events", icon: Bell },
              { id: "documents", label: "Documents & Downloads", icon: FileText },
              { id: "contact", label: "Campus Contact & Info", icon: PhoneCall },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs font-bold transition-all text-left ${
                    active
                      ? "bg-[#2F5187] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 p-3 rounded-lg bg-[#EEF3FA] border border-[#2F5187]/20 text-[11px] text-slate-600 space-y-1.5">
            <div className="font-bold text-[#2F5187] flex items-center gap-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct File Sync</span>
            </div>
            <p className="text-[10px] leading-relaxed">
              Uploaded files are saved to <code>/public/uploads/</code>. Data is written to <code>src/data/siteData.json</code>. Changes appear instantly on the live website.
            </p>
          </div>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 p-6 lg:p-8 max-w-5xl overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold font-display text-[#2F5187]">
                  Lotus Global School — Local Content Dashboard
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage website content, dummy images, faculty profiles, and school documents without editing JSX code.
                </p>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Banner Slides</span>
                  <div className="text-2xl font-extrabold text-[#2F5187] mt-1">{data.heroSlides.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Facilities</span>
                  <div className="text-2xl font-extrabold text-[#E87737] mt-1">{data.facilities.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Gallery Images</span>
                  <div className="text-2xl font-extrabold text-emerald-600 mt-1">{data.gallery.length}</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Documents & PDFs</span>
                  <div className="text-2xl font-extrabold text-purple-600 mt-1">{data.documents.length}</div>
                </div>
              </div>

              {/* Quick Jump Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab("inquiries")}
                  className="p-5 bg-gradient-to-br from-white to-blue-50/50 rounded-lg border-2 border-blue-200 hover:border-[#2F5187] text-left transition-all shadow-sm flex items-start gap-4 group col-span-1 md:col-span-2"
                >
                  <div className="p-3 rounded-lg bg-blue-100 text-[#2F5187]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#2F5187] group-hover:text-[#E87737] transition-colors">
                        Review Online Admission Inquiries
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                        Email Auto-Dispatch Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      View all inquiries submitted by prospective parents from the website. Direct call, WhatsApp, update review status, or export records to CSV.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("documents")}
                  className="p-5 bg-white rounded-lg border border-slate-200 hover:border-[#2F5187] text-left transition-all shadow-sm flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-lg bg-rose-50 text-rose-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#2F5187] group-hover:text-[#E87737] transition-colors">
                      Upload School Documents / Forms
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Upload admission applications, brochures, fee structures, or mandatory compliance PDFs.
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("gallery")}
                  className="p-5 bg-white rounded-lg border border-slate-200 hover:border-[#2F5187] text-left transition-all shadow-sm flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-lg bg-amber-50 text-[#E87737]">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#2F5187] group-hover:text-[#E87737] transition-colors">
                      Manage Photo Gallery
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Upload new school photographs, categorize them (Campus, Labs, Sports), or replace dummy images.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* TAB: ADMISSIONS INQUIRIES DESK */}
          {activeTab === "inquiries" && (
            <InquiriesDeskEditor />
          )}


          {/* TAB: CATEGORY HEADER BANNERS */}
          {activeTab === "banners" && (
            <PageBannersEditor data={data} setData={setData} handleFileUpload={handleFileUpload} />
          )}

          {/* TAB 2: HERO & BANNER SLIDES */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#2F5187]">Hero Banner Slides & Ticker</h2>
                  <p className="text-xs text-slate-500">Edit slides on the homepage carousel and the announcement marquee.</p>
                </div>
                <button
                  onClick={() => {
                    const newSlide: HeroSlide = {
                      id: `slide-${Date.now()}`,
                      title: "New Institutional Milestone",
                      subtitle: "Educational innovation in Vatar, Vapi",
                      tagline: "Lotus Global School",
                      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=2000&q=80",
                      ctaText: "Admissions Inquiry",
                      ctaLink: "admissions-inquiry",
                      secondaryCtaText: "Explore Academics",
                      secondaryCtaLink: "academics",
                    };
                    setData({ ...data, heroSlides: [...data.heroSlides, newSlide] });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2F5187] text-white text-xs font-bold uppercase shadow-sm hover:bg-[#1E375F] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New Slide Block</span>
                </button>
              </div>

              {/* HERO SECTION DISPLAY LAYOUT (Split Showcase vs Glass Card vs Bottom Tray) */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#2F5187] flex items-center gap-2">
                      <Layout className="w-4 h-4 text-[#E87737]" />
                      <span>Hero Section Display Layout</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select which layout is active on the homepage. Active:
                      <span className="ml-1.5 px-2 py-0.5 rounded bg-[#E87737]/15 text-[#E87737] font-bold text-[11px]">
                        {((data as any).heroDesignMode || "split") === "split"
                          ? "Option 1: Split Showcase (Client Selected)"
                          : (data as any).heroDesignMode === "glass"
                          ? "Option 2: Floating Glass Card"
                          : "Option 3: Bottom Tray"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {/* Option 1: Split Showcase */}
                  <div
                    onClick={() => setData({ ...data, heroDesignMode: "split" } as any)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      ((data as any).heroDesignMode || "split") === "split"
                        ? "border-[#E87737] bg-orange-50/50 shadow-sm ring-1 ring-[#E87737]/30"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2F5187] flex items-center gap-1.5">
                          <Columns2 className="w-3.5 h-3.5 text-[#E87737]" />
                          <span>1. Split Showcase</span>
                        </span>
                        {((data as any).heroDesignMode || "split") === "split" && (
                          <span className="p-0.5 rounded-full bg-[#E87737] text-white">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        <strong className="text-slate-800">Client Choice:</strong> Left column for headline, motto & buttons on deep navy; right column is a 100% clean, unobstructed photo showcase.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-bold uppercase text-[#E87737]">
                      {((data as any).heroDesignMode || "split") === "split" ? "✓ Currently Active" : "Click to Activate"}
                    </div>
                  </div>

                  {/* Option 2: Floating Glass Card */}
                  <div
                    onClick={() => setData({ ...data, heroDesignMode: "glass" } as any)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      (data as any).heroDesignMode === "glass"
                        ? "border-[#E87737] bg-orange-50/50 shadow-sm ring-1 ring-[#E87737]/30"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2F5187] flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#E87737]" />
                          <span>2. Floating Glass Card</span>
                        </span>
                        {(data as any).heroDesignMode === "glass" && (
                          <span className="p-0.5 rounded-full bg-[#E87737] text-white">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Full-bleed background photo with natural lighting, with text compact in a frosted glass card in the bottom-left corner and a "View Full Photo" toggle.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-bold uppercase text-[#E87737]">
                      {(data as any).heroDesignMode === "glass" ? "✓ Currently Active" : "Click to Activate"}
                    </div>
                  </div>

                  {/* Option 3: Bottom Tray */}
                  <div
                    onClick={() => setData({ ...data, heroDesignMode: "tray" } as any)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      (data as any).heroDesignMode === "tray"
                        ? "border-[#E87737] bg-orange-50/50 shadow-sm ring-1 ring-[#E87737]/30"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2F5187] flex items-center gap-1.5">
                          <LayoutGrid className="w-3.5 h-3.5 text-[#E87737]" />
                          <span>3. Bottom Tray</span>
                        </span>
                        {(data as any).heroDesignMode === "tray" && (
                          <span className="p-0.5 rounded-full bg-[#E87737] text-white">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Large full-width unobstructed photo showcase on top, with a solid institutional navy action tray below containing text, motto & CTAs.
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] font-bold uppercase text-[#E87737]">
                      {(data as any).heroDesignMode === "tray" ? "✓ Currently Active" : "Click to Activate"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticker Settings */}
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#2F5187]">Marquee Announcement Ticker</h3>
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.ticker.active}
                      onChange={(e) => setData({ ...data, ticker: { ...data.ticker, active: e.target.checked } })}
                      className="rounded text-[#E87737]"
                    />
                    <span>Active on Website</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data.ticker.text}
                  onChange={(e) => setData({ ...data, ticker: { ...data.ticker, text: e.target.value } })}
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded focus:border-[#2F5187]"
                  placeholder="Ticker message..."
                />
              </div>

              {/* Slide Cards */}
              <div className="space-y-4">
                {data.heroSlides.map((slide, idx) => (
                  <div key={slide.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-[#E87737] uppercase">Slide {idx + 1}</span>
                      {data.heroSlides.length > 1 && (
                        <button
                          onClick={() => {
                            const updated = data.heroSlides.filter((s) => s.id !== slide.id);
                            setData({ ...data, heroSlides: updated });
                          }}
                          className="text-rose-600 hover:text-rose-700 p-1 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Slide Heading</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => {
                            const updated = [...data.heroSlides];
                            updated[idx].title = e.target.value;
                            setData({ ...data, heroSlides: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Tagline / Badge</label>
                        <input
                          type="text"
                          value={slide.tagline || ""}
                          onChange={(e) => {
                            const updated = [...data.heroSlides];
                            updated[idx].tagline = e.target.value;
                            setData({ ...data, heroSlides: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Paragraph</label>
                      <textarea
                        rows={2}
                        value={slide.subtitle}
                        onChange={(e) => {
                          const updated = [...data.heroSlides];
                          updated[idx].subtitle = e.target.value;
                          setData({ ...data, heroSlides: updated });
                        }}
                        className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Hero Image URL / Path</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={slide.image}
                            onChange={(e) => {
                              const updated = [...data.heroSlides];
                              updated[idx].image = e.target.value;
                              setData({ ...data, heroSlides: updated });
                            }}
                            className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                          />
                          <label className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, "banners", (url) => {
                                  const updated = [...data.heroSlides];
                                  updated[idx].image = url;
                                  setData({ ...data, heroSlides: updated });
                                })
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-20 h-14 rounded overflow-hidden border border-slate-300 shrink-0 bg-slate-100">
                          <img src={slide.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Recommended size: 1920x800px or modern high-res school photography.
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Homepage Quick Features / Key Pillars */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#2F5187]">Homepage Key Institutional Pillars (Quick Features)</h3>
                    <p className="text-xs text-slate-500">Edit or add cards in the key features row directly below the homepage hero carousel.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newPillar: QuickFeature = {
                        id: `feat-${Date.now()}`,
                        title: "New Institutional Pillar",
                        description: "Empowering students with holistic curriculum, athletic infrastructure, and creative arts.",
                        icon: "Award",
                        link: "academics",
                      };
                      setData({ ...data, quickFeatures: [...(data.quickFeatures || []), newPillar] });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Pillar Tile</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(data.quickFeatures || []).map((feat, idx) => (
                    <div key={feat.id || idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-[#E87737]">Pillar #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const updated = data.quickFeatures.filter((_, i) => i !== idx);
                            setData({ ...data, quickFeatures: updated });
                          }}
                          className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Pillar Title / Heading</label>
                          <input
                            type="text"
                            value={feat.title}
                            onChange={(e) => {
                              const updated = [...data.quickFeatures];
                              updated[idx].title = e.target.value;
                              setData({ ...data, quickFeatures: updated });
                            }}
                            className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-bold text-[#2F5187]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Icon Style</label>
                          <select
                            value={feat.icon}
                            onChange={(e) => {
                              const updated = [...data.quickFeatures];
                              updated[idx].icon = e.target.value;
                              setData({ ...data, quickFeatures: updated });
                            }}
                            className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-medium"
                          >
                            <option value="BookOpen">BookOpen (Curriculum)</option>
                            <option value="Building2">Building2 (Campus)</option>
                            <option value="Palette">Palette (Arts & Studio)</option>
                            <option value="Award">Award (Sports & Values)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                        <textarea
                          rows={2}
                          value={feat.description}
                          onChange={(e) => {
                            const updated = [...data.quickFeatures];
                            updated[idx].description = e.target.value;
                            setData({ ...data, quickFeatures: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Navigation Target Page</label>
                        <select
                          value={feat.link}
                          onChange={(e) => {
                            const updated = [...data.quickFeatures];
                            updated[idx].link = e.target.value;
                            setData({ ...data, quickFeatures: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        >
                          <option value="academics">Academics & Pedagogy</option>
                          <option value="facilities">Campus Facilities & Labs</option>
                          <option value="activities">Co-Curricular & Arts</option>
                          <option value="admissions">Admissions Pathway</option>
                          <option value="about">About Us & Vision</option>
                          <option value="faculty">Faculty Directory</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ABOUT, VISION, VALUES & LOCATION */}
          {activeTab === "about" && (
            <AboutEditor data={data} setData={setData} handleFileUpload={handleFileUpload} />
          )}

          {/* TAB: ACADEMICS & CURRICULAR FRAMEWORK */}
          {activeTab === "academics" && (
            <AcademicsEditor data={data} setData={setData} />
          )}

          {/* TAB 4: LEADERSHIP DESKS */}
          {activeTab === "leadership" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#2F5187]">Institutional Leadership Desks</h2>
                  <p className="text-xs text-slate-500">Edit President, Managing Director, Principal, or add new custom leadership desks.</p>
                </div>
                <button
                  onClick={() => {
                    const newKey = `desk_${Date.now()}`;
                    const newDesk = {
                      name: "Executive Leader Name",
                      title: "From The Executive Desk",
                      designation: "Executive Director · Lotus Global School",
                      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                      quote: "Fostering academic excellence, moral integrity, and purposeful growth.",
                      excerpt: "Welcome message from our institutional leadership guiding our educational vision.",
                      fullMessage: "Welcome to Lotus Global School. Education stands as the single most transformative instrument in shaping character and societal progress.",
                    };
                    setData({
                      ...data,
                      leadership: {
                        ...data.leadership,
                        [newKey]: newDesk as any,
                      },
                    });
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New Leadership Desk Block</span>
                </button>
              </div>

              {Object.entries(data.leadership || {}).map(([key, member], idx) => {
                return (
                  <div key={key} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-[#E87737] uppercase">Leadership Desk #{idx + 1} ({key})</span>
                      {Object.keys(data.leadership || {}).length > 1 && (
                        <button
                          onClick={() => {
                            const updated = { ...data.leadership };
                            delete (updated as any)[key];
                            setData({ ...data, leadership: updated });
                          }}
                          className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold p-1 hover:bg-rose-50 rounded"
                          title="Delete Desk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Desk</span>
                        </button>
                      )}
                    </div>

                    <div className="border-b border-slate-100 pb-3">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Desk Title / Heading <span className="text-slate-400 font-normal">(e.g. From The President's Desk, From The Managing Director's Desk)</span>
                      </label>
                      <input
                        type="text"
                        value={member.title || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            leadership: {
                              ...data.leadership,
                              [key]: { ...member, title: e.target.value },
                            },
                          })
                        }
                        placeholder="Desk Title (e.g. From The President's Desk)"
                        className="w-full p-2 text-xs font-bold text-[#2F5187] uppercase tracking-wide bg-slate-50 border border-slate-200 rounded focus:border-[#2F5187] focus:bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) =>
                            setData({
                              ...data,
                              leadership: {
                                ...data.leadership,
                                [key]: { ...member, name: e.target.value },
                              },
                            })
                          }
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                        <input
                          type="text"
                          value={member.designation}
                          onChange={(e) =>
                            setData({
                              ...data,
                              leadership: {
                                ...data.leadership,
                                [key]: { ...member, designation: e.target.value },
                              },
                            })
                          }
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Quote / Inspiring Motto</label>
                      <input
                        type="text"
                        value={member.quote || ""}
                        onChange={(e) =>
                          setData({
                            ...data,
                            leadership: {
                              ...data.leadership,
                              [key]: { ...member, quote: e.target.value },
                            },
                          })
                        }
                        className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Excerpt (Homepage Preview)</label>
                      <textarea
                        rows={2}
                        value={member.excerpt}
                        onChange={(e) =>
                          setData({
                            ...data,
                            leadership: {
                              ...data.leadership,
                              [key]: { ...member, excerpt: e.target.value },
                            },
                          })
                        }
                        className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 rounded overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Photo URL / File</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={member.photo}
                            onChange={(e) =>
                              setData({
                                ...data,
                                leadership: {
                                  ...data.leadership,
                                  [key]: { ...member, photo: e.target.value },
                                },
                              })
                            }
                            className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                          />
                          <label className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Replace</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, "leadership", (url) => {
                                  setData({
                                    ...data,
                                    leadership: {
                                      ...data.leadership,
                                      [key]: { ...member, photo: url },
                                    },
                                  });
                                })
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 5: FACILITIES MANAGER */}
          {activeTab === "facilities" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#2F5187]">Campus Facilities & Labs</h2>
                  <p className="text-xs text-slate-500">Add, edit, or delete laboratories and sports infrastructure.</p>
                </div>
                <button
                  onClick={() => {
                    const newFacility: Facility = {
                      id: `facility-${Date.now()}`,
                      name: "New Campus Facility",
                      category: "Explore",
                      tagline: "Modern Educational Setup",
                      description: "Equipped with contemporary resources for student inquiry and hands-on learning.",
                      features: ["Safety Standards", "Modern Apparatus"],
                      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
                      active: true,
                      order: data.facilities.length + 1,
                    };
                    setData({ ...data, facilities: [...data.facilities, newFacility] });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Facility Block</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.facilities.map((facility, idx) => (
                  <div key={facility.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-[#2F5187]">Facility #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = data.facilities.filter((f) => f.id !== facility.id);
                          setData({ ...data, facilities: updated });
                        }}
                        className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#2F5187] mb-1">Facility Name / Title</label>
                        <input
                          type="text"
                          value={facility.name}
                          onChange={(e) => {
                            const updated = [...data.facilities];
                            updated[idx].name = e.target.value;
                            setData({ ...data, facilities: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Category Tag</label>
                        <input
                          type="text"
                          value={facility.category}
                          onChange={(e) => {
                            const updated = [...data.facilities];
                            updated[idx].category = e.target.value as any;
                            setData({ ...data, facilities: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={facility.description}
                        onChange={(e) => {
                          const updated = [...data.facilities];
                          updated[idx].description = e.target.value;
                          setData({ ...data, facilities: updated });
                        }}
                        className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-20 h-14 rounded overflow-hidden border border-slate-300 shrink-0 bg-slate-100">
                        <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Facility Image URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={facility.image}
                            onChange={(e) => {
                              const updated = [...data.facilities];
                              updated[idx].image = e.target.value;
                              setData({ ...data, facilities: updated });
                            }}
                            className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                          />
                          <label className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, "facilities", (url) => {
                                  const updated = [...data.facilities];
                                  updated[idx].image = url;
                                  setData({ ...data, facilities: updated });
                                })
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FACULTY & STANDARDS */}
          {activeTab === "faculty" && (
            <div className="space-y-8">
              <FacultyStandardsEditor data={data} setData={setData} />

              <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                <div>
                  <h3 className="font-bold text-sm text-[#2F5187]">Individual Educator Profiles</h3>
                  <p className="text-xs text-slate-500">Manage teacher profile cards, subjects, and biography.</p>
                </div>
                <button
                  onClick={() => {
                    const newFaculty: FacultyMember = {
                      id: `f-${Date.now()}`,
                      name: "Faculty Educator",
                      designation: "Subject Teacher",
                      subject: "General Disciplines",
                      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                      description: "Dedicated teaching faculty guiding students with interactive instruction.",
                      active: true,
                      order: data.faculty.length + 1,
                    };
                    setData({ ...data, faculty: [...data.faculty, newFaculty] });
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New Educator / Faculty Block</span>
                </button>
              </div>

              <div className="space-y-4">
                {data.faculty.map((f, idx) => (
                  <div key={f.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-[#2F5187]">Educator Profile #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = data.faculty.filter((item) => item.id !== f.id);
                          setData({ ...data, faculty: updated });
                        }}
                        className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Profile</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#2F5187] mb-1">Educator Name / Card Title</label>
                        <input
                          type="text"
                          value={f.name}
                          onChange={(e) => {
                            const updated = [...data.faculty];
                            updated[idx].name = e.target.value;
                            setData({ ...data, faculty: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-bold text-[#2F5187]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                        <input
                          type="text"
                          value={f.designation}
                          onChange={(e) => {
                            const updated = [...data.faculty];
                            updated[idx].designation = e.target.value;
                            setData({ ...data, faculty: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Subject / Department</label>
                        <input
                          type="text"
                          value={f.subject}
                          onChange={(e) => {
                            const updated = [...data.faculty];
                            updated[idx].subject = e.target.value;
                            setData({ ...data, faculty: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-16 rounded overflow-hidden border border-slate-300 shrink-0 bg-slate-100">
                        <img src={f.photo} alt={f.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Photo URL</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={f.photo}
                            onChange={(e) => {
                              const updated = [...data.faculty];
                              updated[idx].photo = e.target.value;
                              setData({ ...data, faculty: updated });
                            }}
                            className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                          />
                          <label className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, "faculty", (url) => {
                                  const updated = [...data.faculty];
                                  updated[idx].photo = url;
                                  setData({ ...data, faculty: updated });
                                })
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ADMISSIONS PATHWAY */}
          {activeTab === "admissions" && (
            <AdmissionsEditor data={data} setData={setData} />
          )}

          {/* TAB: CO-CURRICULAR & ACTIVITIES */}
          {activeTab === "activities" && (
            <ActivitiesEditor data={data} setData={setData} />
          )}

          {/* TAB: MANDATORY PUBLIC DISCLOSURES */}
          {activeTab === "disclosure" && (
            <DisclosureEditor data={data} setData={setData} handleFileUpload={handleFileUpload} />
          )}

          {/* TAB 7: GALLERY MANAGER */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#2F5187]">Photo Gallery Manager</h2>
                  <p className="text-xs text-slate-500">Upload school photographs, customize titles and captions, select categories, or add photo blocks.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newItem: GalleryItem = {
                        id: `g-${Date.now()}`,
                        title: "Campus Activity Photograph",
                        category: "Campus Architecture",
                        image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80",
                        caption: "Student activities at Lotus Global School campus.",
                        active: true,
                        order: data.gallery.length + 1,
                      };
                      setData({ ...data, gallery: [newItem, ...data.gallery] });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Photo Block</span>
                  </button>
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E87737] hover:bg-[#D26425] text-white text-xs font-bold uppercase cursor-pointer shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "gallery", (url) => {
                          const newItem: GalleryItem = {
                            id: `g-${Date.now()}`,
                            title: "Campus Activity Photograph",
                            category: "Campus Architecture",
                            image: url,
                            caption: "Student activities at Lotus Global School campus.",
                            active: true,
                            order: data.gallery.length + 1,
                          };
                          setData({ ...data, gallery: [newItem, ...data.gallery] });
                        })
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.gallery.map((item, idx) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                    <div className="h-44 w-full rounded overflow-hidden bg-slate-100 relative group">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <button
                        onClick={() => {
                          const updated = data.gallery.filter((g) => g.id !== item.id);
                          setData({ ...data, gallery: updated });
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-sm"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="block text-[11px] font-bold text-[#2F5187] mb-1">Photo Title / Card Heading</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...data.gallery];
                            updated[idx].title = e.target.value;
                            setData({ ...data, gallery: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-bold text-[#2F5187]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Category</label>
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...data.gallery];
                            updated[idx].category = e.target.value;
                            setData({ ...data, gallery: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        >
                          <option value="Campus Architecture">Campus Architecture</option>
                          <option value="Science & Discovery">Science & Discovery</option>
                          <option value="Creative Arts">Creative Arts</option>
                          <option value="Athletics">Athletics</option>
                          <option value="Classrooms">Classrooms</option>
                          <option value="Events">Events</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Caption / Description</label>
                        <input
                          type="text"
                          value={item.caption}
                          onChange={(e) => {
                            const updated = [...data.gallery];
                            updated[idx].caption = e.target.value;
                            setData({ ...data, gallery: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Image URL / Replace</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={item.image}
                            onChange={(e) => {
                              const updated = [...data.gallery];
                              updated[idx].image = e.target.value;
                              setData({ ...data, gallery: updated });
                            }}
                            className="flex-1 p-1.5 text-xs bg-slate-50 border border-slate-200 rounded font-mono"
                          />
                          <label className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Replace</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, "gallery", (url) => {
                                  const updated = [...data.gallery];
                                  updated[idx].image = url;
                                  setData({ ...data, gallery: updated });
                                })
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: NOTICES & CIRCULARS */}
          {activeTab === "notices" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#2F5187]">Notices, Announcements & Events</h2>
                  <p className="text-xs text-slate-500">Add or edit school circulars and upcoming institutional events.</p>
                </div>
                <button
                  onClick={() => {
                    const newNotice: NoticeItem = {
                      id: `n-${Date.now()}`,
                      title: "New Administrative Notice",
                      date: "March 2026",
                      category: "General Notice",
                      summary: "Official circular details from Lotus Global School campus.",
                      link: "documents",
                      active: true,
                      order: data.notices.length + 1,
                    };
                    setData({ ...data, notices: [newNotice, ...data.notices] });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Notice Block</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.notices.map((notice, idx) => (
                  <div key={notice.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-[#E87737]">Notice #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = data.notices.filter((n) => n.id !== notice.id);
                          setData({ ...data, notices: updated });
                        }}
                        className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Notice Title</label>
                        <input
                          type="text"
                          value={notice.title}
                          onChange={(e) => {
                            const updated = [...data.notices];
                            updated[idx].title = e.target.value;
                            setData({ ...data, notices: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                        <input
                          type="text"
                          value={notice.date}
                          onChange={(e) => {
                            const updated = [...data.notices];
                            updated[idx].date = e.target.value;
                            setData({ ...data, notices: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Summary / Description</label>
                      <textarea
                        rows={2}
                        value={notice.summary}
                        onChange={(e) => {
                          const updated = [...data.notices];
                          updated[idx].summary = e.target.value;
                          setData({ ...data, notices: updated });
                        }}
                        className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* SECTION: UPCOMING EVENTS */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#2F5187]">Upcoming Events & Academic Calendar</h3>
                    <p className="text-xs text-slate-500">Manage dates and descriptions for upcoming campus events and sports meets.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newEvent = {
                        id: `e-${Date.now()}`,
                        title: "New Campus Event",
                        date: "May 2026",
                        category: "Academics",
                        description: "Event schedule, participation details, and venue instructions.",
                      };
                      setData({ ...data, events: [newEvent, ...(data.events || [])] });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Event Block</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(data.events || []).map((ev, idx) => (
                    <div key={ev.id || idx} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-[#E87737]">Event #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const updated = data.events.filter((_, i) => i !== idx);
                            setData({ ...data, events: updated });
                          }}
                          className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-[#2F5187] mb-1">Event Title / Heading</label>
                          <input
                            type="text"
                            value={ev.title}
                            onChange={(e) => {
                              const updated = [...data.events];
                              updated[idx].title = e.target.value;
                              setData({ ...data, events: updated });
                            }}
                            className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-bold text-[#2F5187]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                          <input
                            type="text"
                            value={ev.date}
                            onChange={(e) => {
                              const updated = [...data.events];
                              updated[idx].date = e.target.value;
                              setData({ ...data, events: updated });
                            }}
                            className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                          <input
                            type="text"
                            value={ev.category}
                            onChange={(e) => {
                              const updated = [...data.events];
                              updated[idx].category = e.target.value;
                              setData({ ...data, events: updated });
                            }}
                            className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={ev.description}
                            onChange={(e) => {
                              const updated = [...data.events];
                              updated[idx].description = e.target.value;
                              setData({ ...data, events: updated });
                            }}
                            className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: CAMPUS NEWS & HIGHLIGHTS */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#2F5187]">Campus News & Feature Highlights</h3>
                    <p className="text-xs text-slate-500">Edit or add institutional achievements, sports triumphs, and festival celebrations.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newNews: NewsItem = {
                        id: `news-${Date.now()}`,
                        title: "New Campus News Story",
                        date: "March 2026",
                        summary: "Summary of new school event, academic milestone, or competition victory.",
                        thumbnail: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
                      };
                      setData({ ...data, news: [newNews, ...(data.news || [])] });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-colors shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add News Block</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(data.news || []).map((item, idx) => (
                    <div key={item.id || idx} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-[#E87737]">News Story #{idx + 1}</span>
                        <button
                          onClick={() => {
                            const updated = data.news.filter((_, i) => i !== idx);
                            setData({ ...data, news: updated });
                          }}
                          className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-[#2F5187] mb-1">News Headline / Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...data.news];
                              updated[idx].title = e.target.value;
                              setData({ ...data, news: updated });
                            }}
                            className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-bold text-[#2F5187]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                          <input
                            type="text"
                            value={item.date}
                            onChange={(e) => {
                              const updated = [...data.news];
                              updated[idx].date = e.target.value;
                              setData({ ...data, news: updated });
                            }}
                            className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Summary / Excerpt</label>
                        <textarea
                          rows={2}
                          value={item.summary}
                          onChange={(e) => {
                            const updated = [...data.news];
                            updated[idx].summary = e.target.value;
                            setData({ ...data, news: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded leading-relaxed"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 rounded overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                          {item.thumbnail ? (
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-slate-700 mb-1">Featured Photo URL / Upload</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={item.thumbnail || ""}
                              onChange={(e) => {
                                const updated = [...data.news];
                                updated[idx].thumbnail = e.target.value;
                                setData({ ...data, news: updated });
                              }}
                              className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                            />
                            <label className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, "gallery", (url) => {
                                    const updated = [...data.news];
                                    updated[idx].thumbnail = url;
                                    setData({ ...data, news: updated });
                                  })
                                }
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: DOCUMENTS & DOWNLOADS */}
          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-[#2F5187]">Documents & Downloads Manager</h2>
                  <p className="text-xs text-slate-500">Edit titles, upload PDF forms, brochures, fee structures, and add custom document blocks.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newDoc: DocumentItem = {
                        id: `doc-${Date.now()}`,
                        title: "School Prospectus & Information Brochure",
                        category: "Admissions",
                        description: "Comprehensive institutional overview of Lotus Global School, educational philosophy, and campus life.",
                        fileUrl: "/uploads/documents/lotus-school-prospectus.pdf",
                        fileName: "lotus-school-prospectus.pdf",
                        fileSize: "2.4 MB",
                        date: new Date().toISOString().split("T")[0],
                        active: true,
                        order: data.documents.length + 1,
                      };
                      setData({ ...data, documents: [newDoc, ...data.documents] });
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Document Block</span>
                  </button>
                  <label className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#E87737] hover:bg-[#D26425] text-white text-xs font-bold uppercase cursor-pointer shadow-sm">
                    <Upload className="w-4 h-4" />
                    <span>Upload New PDF</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "documents", (url, fileName, fileSize) => {
                          const newDoc: DocumentItem = {
                            id: `doc-${Date.now()}`,
                            title: fileName?.replace(/^[0-9]+-/, "").replace(/\.pdf$/i, "") || "New Document",
                            category: "Admissions",
                            description: "Official institutional downloadable document.",
                            fileUrl: url,
                            fileName: fileName || "document.pdf",
                            fileSize: fileSize || "PDF",
                            date: new Date().toISOString().split("T")[0],
                            active: true,
                            order: data.documents.length + 1,
                          };
                          setData({ ...data, documents: [newDoc, ...data.documents] });
                        })
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Documents Page Heading & Banner Introduction */}
              <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-xs text-[#2F5187] uppercase tracking-wider">
                    Documents Page Heading & Banner Introduction
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Page Section Heading</label>
                    <input
                      type="text"
                      value={(data as any).documentsPage?.heading || "Downloadable School Documents & Guidelines"}
                      onChange={(e) => {
                        setData({
                          ...data,
                          documentsPage: {
                            ...((data as any).documentsPage || {}),
                            heading: e.target.value,
                          },
                        } as any);
                      }}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-bold text-[#2F5187]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Page Description / Instructions</label>
                    <input
                      type="text"
                      value={(data as any).documentsPage?.subheading || "Access official registration application forms, curriculum guides, approved fee structures, safety certifications, and academic calendars for Lotus Global School, Vatar, Vapi."}
                      onChange={(e) => {
                        setData({
                          ...data,
                          documentsPage: {
                            ...((data as any).documentsPage || {}),
                            subheading: e.target.value,
                          },
                        } as any);
                      }}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded text-slate-600"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {data.documents.map((doc, idx) => (
                  <div key={doc.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#EEF3FA] text-[#2F5187] font-extrabold text-[11px] border border-[#2F5187]/20">
                          Block #{idx + 1}
                        </span>
                        <FileText className="w-4 h-4 text-rose-600" />
                        <span className="text-xs font-bold text-[#2F5187] truncate max-w-xs">{doc.title || "Untitled Document"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold cursor-pointer">
                          <input
                            type="checkbox"
                            checked={doc.active !== false}
                            onChange={(e) => {
                              const updated = [...data.documents];
                              updated[idx].active = e.target.checked;
                              setData({ ...data, documents: updated });
                            }}
                            className="rounded text-[#E87737]"
                          />
                          <span>Visible</span>
                        </label>
                        <button
                          onClick={() => {
                            const updated = data.documents.filter((d) => d.id !== doc.id);
                            setData({ ...data, documents: updated });
                          }}
                          className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Block</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2F5187] mb-1">
                        Document Title / Card Heading <span className="text-[#E87737] font-semibold">(e.g. School Prospectus & Information Brochure)</span>
                      </label>
                      <input
                        type="text"
                        value={doc.title}
                        onChange={(e) => {
                          const updated = [...data.documents];
                          updated[idx].title = e.target.value;
                          setData({ ...data, documents: updated });
                        }}
                        placeholder="e.g. School Prospectus & Information Brochure"
                        className="w-full p-2.5 text-xs font-bold text-[#2F5187] bg-amber-50/30 border-2 border-amber-200/80 focus:border-[#2F5187] focus:bg-white rounded"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                        <select
                          value={doc.category}
                          onChange={(e) => {
                            const updated = [...data.documents];
                            updated[idx].category = e.target.value;
                            setData({ ...data, documents: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-medium"
                        >
                          <option value="Admissions">Admissions</option>
                          <option value="Academics">Academics</option>
                          <option value="Regulatory & Disclosures">Regulatory & Disclosures</option>
                          <option value="Circulars">Circulars</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Publication / Release Date</label>
                        <input
                          type="text"
                          value={doc.date}
                          onChange={(e) => {
                            const updated = [...data.documents];
                            updated[idx].date = e.target.value;
                            setData({ ...data, documents: updated });
                          }}
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">File Size / Format Badge</label>
                        <input
                          type="text"
                          value={doc.fileSize || "PDF"}
                          onChange={(e) => {
                            const updated = [...data.documents];
                            updated[idx].fileSize = e.target.value;
                            setData({ ...data, documents: updated });
                          }}
                          placeholder="e.g. 2.4 MB or PDF"
                          className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Document Summary / Description</label>
                      <textarea
                        rows={2}
                        value={doc.description}
                        onChange={(e) => {
                          const updated = [...data.documents];
                          updated[idx].description = e.target.value;
                          setData({ ...data, documents: updated });
                        }}
                        placeholder="Comprehensive institutional overview and guidelines..."
                        className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">PDF File Path / Download URL</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={doc.fileUrl}
                          onChange={(e) => {
                            const updated = [...data.documents];
                            updated[idx].fileUrl = e.target.value;
                            setData({ ...data, documents: updated });
                          }}
                          placeholder="/uploads/documents/example.pdf or https://..."
                          className="flex-1 p-2 text-xs bg-slate-50 border border-slate-200 rounded font-mono"
                        />
                        <label className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Replace / Upload PDF</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, "documents", (url, fileName, fileSize) => {
                                const updated = [...data.documents];
                                updated[idx].fileUrl = url;
                                if (fileName) updated[idx].fileName = fileName;
                                if (fileSize) updated[idx].fileSize = fileSize;
                                setData({ ...data, documents: updated });
                              })
                            }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: CONTACT & ADMISSIONS */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#2F5187]">School Contact & Location Details</h2>
                <p className="text-xs text-slate-500">Preserve and edit Lotus Global School contact coordinates.</p>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">School Name</label>
                    <input
                      type="text"
                      value={data.schoolInfo.name}
                      onChange={(e) =>
                        setData({
                          ...data,
                          schoolInfo: { ...data.schoolInfo, name: e.target.value },
                        })
                      }
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Affiliation Status</label>
                    <input
                      type="text"
                      value={data.schoolInfo.affiliationStatus}
                      onChange={(e) =>
                        setData({
                          ...data,
                          schoolInfo: { ...data.schoolInfo, affiliationStatus: e.target.value },
                        })
                      }
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Campus Full Physical Address</label>
                  <input
                    type="text"
                    value={data.schoolInfo.address}
                    onChange={(e) =>
                      setData({
                        ...data,
                        schoolInfo: { ...data.schoolInfo, address: e.target.value },
                      })
                    }
                    className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={data.schoolInfo.phone}
                      onChange={(e) =>
                        setData({
                          ...data,
                          schoolInfo: { ...data.schoolInfo, phone: e.target.value },
                        })
                      }
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Admissions WhatsApp</label>
                    <input
                      type="text"
                      value={data.schoolInfo.whatsapp}
                      onChange={(e) =>
                        setData({
                          ...data,
                          schoolInfo: { ...data.schoolInfo, whatsapp: e.target.value },
                        })
                      }
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email ID</label>
                    <input
                      type="text"
                      value={data.schoolInfo.email}
                      onChange={(e) =>
                        setData({
                          ...data,
                          schoolInfo: { ...data.schoolInfo, email: e.target.value },
                        })
                      }
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Profile URL</label>
                    <input
                      type="text"
                      value={data.schoolInfo.instagramUrl}
                      onChange={(e) =>
                        setData({
                          ...data,
                          schoolInfo: { ...data.schoolInfo, instagramUrl: e.target.value },
                        })
                      }
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Motto</label>
                    <input
                      type="text"
                      value={data.schoolInfo.motto}
                      onChange={(e) =>
                        setData({
                          ...data,
                          schoolInfo: { ...data.schoolInfo, motto: e.target.value },
                        })
                      }
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
