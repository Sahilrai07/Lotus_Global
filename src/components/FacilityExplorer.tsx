import React, { useState } from "react";
import { FACILITIES_DATA, FacilityItem } from "../data/schoolData";
import { ArrowUpRight, Sparkles, Check, X, Shield } from "lucide-react";

export const FacilityExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalItem, setActiveModalItem] = useState<FacilityItem | null>(null);

  const categories = ["All", "Learn", "Explore", "Create", "Perform"];

  const filteredFacilities =
    selectedCategory === "All"
      ? FACILITIES_DATA
      : FACILITIES_DATA.filter((f) => f.category === selectedCategory);

  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Heading & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E86A2C] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Infrastructure</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#0B1B3D] tracking-tight">
              Spaces Designed for Active Discovery
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our purpose-built learning environments across sciences, technology, arts, and physical education.
            </p>
          </div>

          {/* Interactive Editorial Category Filter */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-xl w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 ${
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

        {/* Editorial Facility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              onClick={() => setActiveModalItem(facility)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with editorial badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-2.5 py-1 rounded bg-[#0B1B3D]/80 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider">
                      {facility.category}
                    </span>
                  </div>

                  {/* Editorial Representation Notice */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-slate-200 text-[9px] uppercase tracking-wider font-mono">
                      Facility Preview
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-[#0B1B3D] group-hover:text-[#E86A2C] transition-colors">
                    {facility.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#E86A2C] mt-1 mb-3">
                    {facility.tagline}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {facility.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0B1B3D]">
                <span className="text-slate-500 group-hover:text-[#0B1B3D] transition-colors">
                  View Specifications
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#E86A2C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal Specification View */}
        {activeModalItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071126]/75 backdrop-blur-sm animate-fade-in"
            onClick={() => setActiveModalItem(null)}
          >
            <div
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Header */}
              <div className="relative aspect-[21/9] bg-slate-900">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/50 to-transparent" />
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-md bg-black/40 text-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-2.5 py-0.5 rounded bg-[#E86A2C] text-white text-[10px] font-bold uppercase tracking-wider">
                    {activeModalItem.category} Dimension
                  </span>
                  <h3 className="font-display font-bold text-2xl text-white mt-1">
                    {activeModalItem.name}
                  </h3>
                </div>
              </div>

              {/* Modal Details */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Pedagogical Purpose & Focus
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeModalItem.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                    Key Infrastructure Specifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeModalItem.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Shield className="w-3.5 h-3.5 text-[#E86A2C]" />
                    <span>Safety Protocols & Periodic Maintenance Adhered</span>
                  </div>
                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-4 py-2 bg-[#0B1B3D] text-white text-xs font-semibold rounded-lg hover:bg-[#E86A2C] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
