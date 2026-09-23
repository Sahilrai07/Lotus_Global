import React from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { getSiteData } from "../data/siteDataService";
import { CheckCircle2, Quote, ArrowRight } from "lucide-react";

interface MessagePageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const MessagePage: React.FC<MessagePageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const siteData = getSiteData();
  const principal = siteData.leadership.principal;
  const bannerImage = siteData.pageBanners?.about || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80";

  return (
    <InternalPageLayout
      title={principal.title || "Principal's Desk"}
      category="ABOUT US"
      activePageId="message"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={bannerImage}
      breadcrumbs={[{ label: "Principal's Desk" }]}
    >
      <div className="space-y-8">
        {/* Section Heading */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Leadership Perspective
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            {principal.title || "Message From the Principal's Desk"}
          </h2>
        </div>

        {/* Principal Portrait & Introductory Creed Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200">
          <div className="md:col-span-4 shrink-0">
            <img
              src={principal.photo || "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80"}
              alt={principal.name || "Principal, Lotus Global School"}
              className="w-full h-64 object-cover rounded border border-slate-300 shadow-sm"
            />
            <div className="mt-3 text-center sm:text-left">
              <h4 className="font-display font-bold text-base text-[#2F5187]">
                {principal.name || "Office of the Principal"}
              </h4>
              <p className="text-xs text-[#E87737] font-semibold">
                {principal.designation || "Principal, Lotus Global School"}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {siteData.schoolInfo.affiliationStatus} · {siteData.schoolInfo.location}
              </p>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4">
            {principal.quote && (
              <div className="p-4 bg-white rounded border-l-4 border-[#E87737] shadow-sm">
                <Quote className="w-5 h-5 text-[#E87737] mb-1" />
                <p className="font-serif italic text-sm text-[#2F5187] font-medium leading-relaxed">
                  "{principal.quote}"
                </p>
              </div>
            )}

            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p className="font-semibold text-slate-900">
                Dear Parents, Students, and Well-Wishers,
              </p>
              <p>{principal.fullMessage || principal.excerpt}</p>
            </div>
          </div>
        </div>

        {/* Extended Narrative & Commitments */}
        {principal.commitments && principal.commitments.length > 0 && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2">
              Our Commitments to Parents and Students
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {principal.commitments.map((com, idx) => (
                <div key={idx} className="p-4 bg-white border border-slate-200 rounded space-y-2">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#2F5187]">
                    <CheckCircle2 className="w-4 h-4 text-[#E87737]" />
                    <span>{com.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {com.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Signature */}
        <div className="pt-6 border-t border-slate-200">
          <div>
            <span className="font-display font-bold text-base text-[#2F5187] block">
              {principal.name || "Principal"}
            </span>
            <span className="text-xs text-slate-500">
              {principal.designation || "Principal, Lotus Global School, Vatar, Vapi"}
            </span>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
