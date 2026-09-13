import React, { useState } from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { Lightbox, GalleryItem } from "../components/Lightbox";
import { Eye, Image as ImageIcon } from "lucide-react";

interface GalleryPageProps {
  onNavigate?: (pageId: string) => void;
  openInquiry?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigate = () => {},
  openInquiry = () => {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "g1",
      title: "Campus Architecture & Courtyard",
      category: "Campus Architecture",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80",
      caption: "Architectural visual study representing modern ventilated institutional design for Lotus Global School.",
    },
    {
      id: "g2",
      title: "Advanced Chemistry & Reagent Station",
      category: "Science & Discovery",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1600&q=80",
      caption: "Empirical discovery space equipped for chemical experimentation and analytical modeling.",
    },
    {
      id: "g3",
      title: "Physics Dynamics & Optics Bench",
      category: "Science & Discovery",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      caption: "Precision instrumentation designed for kinematic studies and wave optics.",
    },
    {
      id: "g4",
      title: "Central Library Reading Sanctum",
      category: "Campus Architecture",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
      caption: "Quiet reflection alcove housing NCERT reference literature and curated classical works.",
    },
    {
      id: "g5",
      title: "Digital Computing & Algorithmic Lab",
      category: "Science & Discovery",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
      caption: "Dedicated individual computing stations shielded with secure educational firewalls.",
    },
    {
      id: "g6",
      title: "Acoustic Music & Melodic Studio",
      category: "Creative Arts",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80",
      caption: "Acoustically treated studio space supporting Indian classical and global instrumentation.",
    },
    {
      id: "g7",
      title: "Indoor Physical Conditioning Arena",
      category: "Athletics",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1600&q=80",
      caption: "Sports infrastructure facilitating motor coordination, team athletics, and personal agility.",
    },
    {
      id: "g8",
      title: "Biological Specimen & Microscopy Bay",
      category: "Science & Discovery",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=80",
      caption: "High-resolution binocular microscopes enabling granular cell biology study.",
    },
  ];

  const categories = ["All", "Campus Architecture", "Science & Discovery", "Creative Arts", "Athletics"];

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
      category="GALLERY"
      activePageId="gallery"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[{ label: "Gallery" }]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
              Campus Photo Archive
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
              Campus Photography & Learning Spaces
            </h2>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#2F5187] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="bg-[#F8FAFC] border border-slate-200 rounded overflow-hidden shadow-sm hover:border-[#2F5187] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#2F5187]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 bg-white rounded-full text-[#2F5187] shadow">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
                <span className="absolute bottom-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-3">
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#2F5187] group-hover:text-[#E87737] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Visit our campus near Vatar PHC, Vatar, Vapi for an in-person orientation.
          </span>
          <button
            onClick={openInquiry}
            className="px-5 py-2.5 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
          >
            Admissions Inquiry
          </button>
        </div>
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
    </InternalPageLayout>
  );
};
