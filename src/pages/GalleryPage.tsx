import React, { useState, useEffect } from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { Lightbox, GalleryItem } from "../components/Lightbox";
import { Eye, Image as ImageIcon } from "lucide-react";
import { getSiteData, subscribeSiteData } from "../data/siteDataService";

interface GalleryPageProps {
  onNavigate?: (pageId: string) => void;
  openInquiry?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigate = () => {},
  openInquiry = () => {},
}) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(getSiteData().gallery);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    return subscribeSiteData((newData) => {
      setGalleryItems(newData.gallery);
    });
  }, []);

  // Compute unique categories dynamically from items
  const categories = [
    "All",
    ...Array.from(new Set(galleryItems.map((item) => item.category).filter(Boolean))),
  ];

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const handleNext = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currentIndex = filteredItems.findIndex((i) => i.id === activeItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveItem(filteredItems[prevIndex]);
  };

  return (
    <InternalPageLayout
      title="Photo Gallery"
      category="CAMPUS LIFE"
      activePageId="gallery"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "Home", pageId: "home" },
        { label: "Photo Gallery", pageId: "gallery" },
      ]}
    >
      <div className="space-y-8">
        {/* Gallery Intro Banner */}
        <div className="p-6 bg-white rounded-lg border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E87737]">
            <ImageIcon className="w-4 h-4" />
            <span>Visual Glimpses of Lotus Global School</span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[#2F5187]">
            Campus Life & Learning Environment
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Explore our state-of-the-art laboratories, creative arts studio, athletics arena, and collaborative classroom environments situated in Vatar, Vapi, Gujarat.
          </p>
        </div>

        {/* Filter Navigation Buttons (Reference .filters style) */}
        <div className="flex items-center flex-wrap gap-2 pb-2 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? "bg-[#2F5187] text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid (Reference .grid & .grid-item style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-[#E87737] text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-[#2F5187]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-xs">
                  {item.category}
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-display font-bold text-sm text-[#2F5187] group-hover:text-[#E87737] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <Lightbox
            item={activeItem}
            onClose={() => setActiveItem(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </div>
    </InternalPageLayout>
  );
};
