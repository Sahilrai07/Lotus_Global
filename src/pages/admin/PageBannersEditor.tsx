import React, { useState } from "react";
import { Upload, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { SiteData, UploadFolder } from "../../data/siteDataService";

interface PageBannersEditorProps {
  data: SiteData;
  setData: (data: SiteData) => void;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    folder: UploadFolder,
    onUploaded: (url: string, fileName?: string, fileSize?: string) => void
  ) => void;
}

export const PageBannersEditor: React.FC<PageBannersEditorProps> = ({
  data,
  setData,
  handleFileUpload,
}) => {
  const standardBannerKeys = [
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

  const updateBanner = (key: string, url: string) => {
    setData({
      ...data,
      pageBanners: {
        ...data.pageBanners,
        [key]: url,
      } as any,
    });
  };

  const deleteCustomBanner = (key: string) => {
    const updated = { ...data.pageBanners };
    delete (updated as any)[key];
    setData({
      ...data,
      pageBanners: updated,
    });
  };

  // Find any custom keys in pageBanners that are not part of standardBannerKeys
  const standardKeySet = new Set(standardBannerKeys.map((s) => s.key));
  const customKeys = Object.keys(data.pageBanners || {}).filter((k) => !standardKeySet.has(k));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold font-display text-[#2F5187]">Category & Page Header Banners</h2>
          <p className="text-xs text-slate-500 mt-1">
            Customize high-resolution hero banners displayed at the top of every internal page section.
          </p>
        </div>
        <button
          onClick={() => {
            const newKey = `banner_${Date.now()}`;
            updateBanner(newKey, "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80");
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2F5187] hover:bg-[#1E375F] text-white text-xs font-bold uppercase transition-all shadow-sm shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Custom Banner Block</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {standardBannerKeys.map((item) => {
          const currentUrl = (data.pageBanners as any)?.[item.key] || "";
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
                        handleFileUpload(e, "banners", (url) => updateBanner(item.key, url))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {customKeys.length > 0 && (
        <div className="pt-6 border-t border-slate-200 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#2F5187]">Custom Route & Internal Page Banners</h3>
            <p className="text-xs text-slate-500">Additional banner blocks created for special sub-pages or seasonal campaigns.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customKeys.map((cKey) => {
              const currentUrl = (data.pageBanners as any)?.[cKey] || "";
              return (
                <div key={cKey} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-[#E87737] font-mono">{cKey}</span>
                    <button
                      onClick={() => deleteCustomBanner(cKey)}
                      className="text-rose-600 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold p-1 hover:bg-rose-50 rounded"
                      title="Delete Custom Banner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete Banner</span>
                    </button>
                  </div>

                  <div className="h-28 rounded overflow-hidden border border-slate-200 bg-slate-100 relative group">
                    {currentUrl ? (
                      <img
                        src={currentUrl}
                        alt={cKey}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-1">
                        <ImageIcon className="w-6 h-6" />
                        <span className="text-[11px]">No Banner Set</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={currentUrl}
                        onChange={(e) => updateBanner(cKey, e.target.value)}
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
                            handleFileUpload(e, "banners", (url) => updateBanner(cKey, url))
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
      )}
    </div>
  );
};
