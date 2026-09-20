import React from "react";
import { ArrowRight, Eye, Image as ImageIcon } from "lucide-react";
import { getSiteData } from "../data/siteDataService";

interface HomeGalleryPreviewProps {
  onNavigate: (pageId: string) => void;
}

export const HomeGalleryPreview: React.FC<HomeGalleryPreviewProps> = ({ onNavigate }) => {
  const galleryItems = getSiteData().gallery.slice(0, 4);

  return (
    <section className="py-16 bg-[#F8FAFC] border-b border-slate-200" aria-label="Campus Photo Gallery Showcase">
      <div className="wrap">
        <div className="section-title-wrap">
          <h2 className="section-title-institutional">
            PHOTO GALLERY
          </h2>
          <hr className="hr1" />
          <hr className="hr2" />
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Glimpses of academic life, scientific discovery, cultural expressions, and sports activities at Lotus Global School.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate("gallery")}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#E87737] px-2.5 py-1 rounded">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Photo</span>
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-[#2F5187]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-xs">
                  {item.category}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-display font-bold text-sm text-[#2F5187] group-hover:text-[#E87737] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate("gallery")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#2F5187] text-white hover:bg-[#1E375F] font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            <ImageIcon className="w-4 h-4" />
            <span>Explore Full Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
