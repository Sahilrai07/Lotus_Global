import React, { useState } from "react";
import { Lightbox, GalleryItem } from "../components/Lightbox";
import { Eye, Sparkles, Image as ImageIcon } from "lucide-react";

export const GalleryPage: React.FC = () => {
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

  const featuredItem = filteredItems[0];
  const supportingItems = filteredItems.slice(1);

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
    <div className="pt-28 pb-20 animate-fade-in bg-[#F8FAFC]">
      {/* Page Hero */}
      <section className="bg-[#0B1B3D] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider">
              <span>Digital Exhibition</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
              Campus Exhibition
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Visualizing the architectural spaces, laboratory environments, and artistic facilities of Lotus Global School, Vatar, Vapi.
            </p>
          </div>
        </div>
      </section>

      {/* Main Exhibition Layout */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* Top Bar: Notice & Category Filter */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                Exhibition Gallery
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1B3D] tracking-tight">
                Architectural & Pedagogical Perspectives
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0B1B3D] text-white shadow-sm"
                      : "text-slate-600 hover:text-[#0B1B3D] hover:bg-white/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Exhibition Showcase: 1 Featured Piece + Grid */}
          {featuredItem && (
            <div
              onClick={() => setActiveItem(featuredItem)}
              className="relative aspect-[21/9] rounded-2xl overflow-hidden cursor-pointer group border border-slate-200 shadow-md bg-slate-900"
            >
              <img
                src={featuredItem.image}
                alt={featuredItem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/90 via-[#0B1B3D]/30 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded bg-[#E86A2C] text-white text-[11px] font-bold uppercase tracking-wider">
                  Featured Exhibition Piece
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#E86A2C]">
                    {featuredItem.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl mt-1">
                    {featuredItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                    {featuredItem.caption}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/20 backdrop-blur-md text-xs font-semibold">
                  <Eye className="w-4 h-4" />
                  <span>Inspect View</span>
                </div>
              </div>
            </div>
          )}

          {/* Supporting Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer border border-slate-200 bg-slate-900"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-display font-bold text-base group-hover:text-[#E86A2C] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Note on Live Photography */}
          <div className="p-6 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <ImageIcon className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800">Visual Exhibition Integrity:</strong> Visual assets displayed in this section are architectural and pedagogical previews curated for the school's registration phase. On-site campus documentation photographs will be updated progressively as school sessions commence.
            </div>
          </div>

        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        item={activeItem}
        onClose={() => setActiveItem(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};
