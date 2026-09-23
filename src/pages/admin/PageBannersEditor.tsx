import React from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { SiteData } from "../../data/siteDataService";

interface PageBannersEditorProps {
  data: SiteData;
  setData: (data: SiteData) => void;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    folder: "images" | "documents" | "gallery",
    onUploaded: (url: string, fileName?: string, fileSize?: string) => void
  ) => void;
}

export const PageBannersEditor: React.FC<PageBannersEditorProps> = ({
  data,
  setData,
  handleFileUpload,
}) => {
  const bannerKeys: Array<{
    key: keyof typeof data.pageBanners;
    label: string;
    description: string;
  }> = [
    { key: "about", label: "About Us & Vision Pages", description: "/about, /about/vision, /about/core-values" },
    { key: "academics", label: "Academics & Curricular Stages", description: "/academics, /academics/stages, /academics/assessment, /academics/timings" },
    { key: "facilities", label: "Campus Facilities & Labs", description: "/facilities and all 8 facility detail pages" },
    { key: "faculty", label: "Faculty & Mentorship Pages", description: "/faculty, /faculty/standards, /faculty/development, /faculty/ratio" },
    { key: "admissions", label: "Admissions Pathway & Desk", description: "/admissions, /admissions/documents, /admissions/eligibility, /admissions/inquiry" },
    { key: "activities", label: "Activities & Co-Curricular", description: "/activities (Sports, Arts, Clubs, Houses)" },
    { key: "newsEvents", label: "News & Campus Events", description: "Notices and school announcements" },
    { key: "disclosure", label: "Public Mandatory Disclosure", description: "/mandatory-disclosure (Appendix IX)" },
    { key: "documents", label: "Documents & Downloads", description: "/documents" },
    { key: "gallery", label: "Media & Event Gallery", description: "/gallery" },
    { key: "contact", label: "Contact Us & Campus Reach", description: "/contact" },
  ];

  const updateBanner = (key: keyof typeof data.pageBanners, url: string) => {
    setData({
      ...data,
      pageBanners: {
        ...data.pageBanners,
        [key]: url,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-display text-[#2F5187]">Category & Page Header Banners</h2>
        <p className="text-xs text-slate-500 mt-1">
          Customize high-resolution hero banners displayed at the top of every internal page section.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bannerKeys.map((item) => {
          const currentUrl = data.pageBanners?.[item.key] || "";
          return (
            <div key={item.key} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#2F5187]">{item.label}</h3>
                  <span className="text-[10px] text-slate-400 block">{item.description}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {item.key}
                </span>
              </div>

              {/* Preview Thumbnail */}
              <div className="h-28 rounded overflow-hidden border border-slate-200 bg-slate-100 relative group">
                {currentUrl ? (
                  <img
                    src={currentUrl}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1">
                    <ImageIcon className="w-6 h-6" />
                    <span className="text-[11px]">No Banner Set</span>
                  </div>
                )}
              </div>

              {/* Input & Upload */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={currentUrl}
                    onChange={(e) => updateBanner(item.key, e.target.value)}
                    placeholder="https://images.unsplash.com/... or /uploads/images/..."
                    className="flex-1 text-xs p-2 rounded border border-slate-300 focus:outline-none focus:border-[#2F5187]"
                  />
                  <label className="px-3 py-2 bg-[#2F5187] hover:bg-[#1E375F] text-white rounded text-xs font-bold cursor-pointer shrink-0 flex items-center gap-1.5 transition-colors shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, "images", (url) => updateBanner(item.key, url))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
