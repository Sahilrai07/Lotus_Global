import React, { useState } from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { FACILITIES_DATA, FacilityItem } from "../data/schoolData";
import { CheckCircle2, Shield, Layers, Eye } from "lucide-react";

interface FacilitiesPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Explore", "Learn", "Create", "Perform"];

  const filteredFacilities =
    selectedCategory === "All"
      ? FACILITIES_DATA
      : FACILITIES_DATA.filter((f) => f.category === selectedCategory);

  return (
    <InternalPageLayout
      title="Campus Facilities & Labs"
      category="CAMPUS FACILITIES"
      activePageId="facilities"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[{ label: "Facilities" }]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
              Infrastructure & Learning Spaces
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
              Campus Facilities & Laboratories
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

        {/* Introductory note */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          At Lotus Global School, physical spaces are intentionally built to stimulate empirical inquiry and artistic creativity. Each laboratory adheres to strict safety protocols, equipped with child-friendly apparatus and supervised by dedicated faculty.
        </p>

        {/* Facilities Catalog (Reference style list with thumbnail + text) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFacilities.map((facility: FacilityItem) => (
            <div
              key={facility.id}
              className="bg-[#F8FAFC] border border-slate-200 rounded overflow-hidden shadow-sm hover:border-[#2F5187]/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Facility Image with Category Tag */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider bg-[#2F5187] text-white px-2 py-0.5 rounded shadow">
                    {facility.category}
                  </span>
                </div>

                {/* Facility Details */}
                <div className="p-5 space-y-2.5">
                  <h3 className="font-display font-bold text-base text-[#2F5187] group-hover:text-[#E87737] transition-colors">
                    {facility.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#E87737] italic">
                    {facility.tagline}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>

              {/* Key Features List */}
              <div className="px-5 pb-5 pt-2 border-t border-slate-200/80 bg-white">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1.5">
                  Key Specifications
                </span>
                <ul className="space-y-1 text-[11px] text-slate-700">
                  {facility.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#E87737] shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Supervision Notice */}
        <div className="p-4 bg-[#FFF5EE] border-l-4 border-[#E87737] rounded-r space-y-1 text-xs">
          <span className="font-bold text-[#2F5187] uppercase block">
            Campus Safety & Lab Hygiene Standards
          </span>
          <p className="text-slate-700">
            All laboratories are equipped with fire extinguishers, first-aid kits, eyewash stations, and emergency power cut-offs. Students perform empirical experiments under mandatory educator supervision.
          </p>
        </div>

        {/* Action Prompt */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Schedule a physical walkthrough of our campus laboratories in Vatar, Vapi.
          </span>
          <button
            onClick={openInquiry}
            className="px-5 py-2.5 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
          >
            Admissions Walkthrough Request
          </button>
        </div>
      </div>
    </InternalPageLayout>
  );
};
