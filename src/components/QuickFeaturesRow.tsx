import React from "react";
import { BookOpen, Building2, Palette, Award, ArrowRight } from "lucide-react";
import { useSiteData, getSiteData, QuickFeature } from "../data/siteDataService";

interface QuickFeaturesRowProps {
  onNavigate: (pageId: string) => void;
}

export const QuickFeaturesRow: React.FC<QuickFeaturesRowProps> = ({ onNavigate }) => {
  const { siteData } = useSiteData();
  const features = siteData.quickFeatures || getSiteData().quickFeatures;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-8 h-8 text-[#2F5187] group-hover:text-white transition-colors" />;
      case "Building2":
        return <Building2 className="w-8 h-8 text-[#2F5187] group-hover:text-white transition-colors" />;
      case "Palette":
        return <Palette className="w-8 h-8 text-[#2F5187] group-hover:text-white transition-colors" />;
      case "Award":
      default:
        return <Award className="w-8 h-8 text-[#2F5187] group-hover:text-white transition-colors" />;
    }
  };

  return (
    <section className="py-10 bg-[#EEF3FA] border-b border-slate-200" aria-label="Key Institutional Pillars">
      <div className="wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => onNavigate(feature.link)}
              className="group text-left p-6 bg-white rounded border border-slate-200 hover:border-[#E87737] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-lg bg-[#EEF3FA] group-hover:bg-[#2F5187] flex items-center justify-center transition-colors">
                  {getIcon(feature.icon)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#2F5187] group-hover:text-[#E87737] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#E87737] uppercase tracking-wider group-hover:text-[#D26425]">
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
