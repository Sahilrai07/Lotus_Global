import React from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { SCHOOL_INFO } from "../../data/schoolData";
import { MapPin, Navigation, Bus, Clock, Phone, ExternalLink } from "lucide-react";

interface LocationPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const transitRoutes = [
    {
      corridor: "Vapi Town Centre & GIDC",
      distance: "Approx. 10–12 Minutes",
      access: "Direct access via Chala–Vatar Link Road, smooth paved connectivity.",
    },
    {
      corridor: "Daman & Coastal Belts",
      distance: "Approx. 15–18 Minutes",
      access: "Well-connected through state highway arterial junctions.",
    },
    {
      corridor: "Silvassa & Dadra Junction",
      distance: "Approx. 20–25 Minutes",
      access: "Direct transit through national highway access roads.",
    },
  ];

  return (
    <InternalPageLayout
      title="Campus Location & Reach"
      category="ABOUT US"
      activePageId="about-location"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
      breadcrumbs={[
        { label: "About Us", pageId: "about" },
        { label: "Campus Location" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Geographical Setting
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Campus Location & Connectivity in Vatar, Vapi
          </h2>
        </div>

        {/* Location Narrative & Landmark Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8FAFC] p-6 rounded border border-slate-200">
          <div className="md:col-span-4 shrink-0 space-y-3">
            <div className="p-4 bg-white rounded border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E87737]">
                Official Landmark
              </span>
              <h4 className="font-display font-bold text-base text-[#2F5187]">
                Near Vatar PHC
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {SCHOOL_INFO.address}
              </p>
            </div>

            <div className="p-4 bg-white rounded border border-slate-200 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E87737]" />
                <span className="font-semibold">Visiting Hours:</span>
              </div>
              <p className="text-slate-500 pl-6">Mon–Sat: 9:00 AM – 4:00 PM</p>
            </div>
          </div>

          <div className="md:col-span-8 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="font-display font-bold text-lg text-[#2F5187]">
              A Peaceful Learning Sanctuary Away from Urban Congestion
            </h3>
            <p className="leading-relaxed font-medium">
              Strategically positioned in Vatar, Vapi, the Lotus Global School campus provides a secure, pollution-free, and distraction-free academic haven.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Situated near Vatar PHC, the campus is surrounded by open green horizons, allowing ample natural ventilation, generous daylight, and sprawling open-air athletic grounds while remaining easily reachable from major residential and commercial sectors across Vapi, Daman, and Silvassa.
            </p>
          </div>
        </div>

        {/* Road & Transit Accessibility */}
        <div className="space-y-4">
          <h3 className="font-display font-bold text-lg text-[#2F5187] border-b border-slate-200 pb-2 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#E87737]" />
            <span>Transit Corridors & Commute Times</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {transitRoutes.map((tr, idx) => (
              <div key={idx} className="p-4 rounded border border-slate-200 bg-white space-y-2 shadow-sm">
                <div className="text-xs font-bold text-[#2F5187] uppercase">
                  {tr.corridor}
                </div>
                <div className="text-xs font-semibold text-[#E87737]">
                  {tr.distance}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {tr.access}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Map */}
        <div className="space-y-2">
          <h4 className="font-display font-bold text-base text-[#2F5187]">
            Interactive Campus Map
          </h4>
          <div className="w-full h-80 rounded border border-slate-300 overflow-hidden shadow-sm">
            <iframe
              title="Lotus Global School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14966.721469085817!2d72.8800!3d20.3500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0d04c00000001%3A0x0!2sVatar%2C%20Vapi%2C%20Gujarat%20396191!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Need directions or assistance finding the campus?
          </span>
          <a
            href={`tel:${SCHOOL_INFO.phone}`}
            className="px-5 py-2.5 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow"
          >
            Call Campus Desk
          </a>
        </div>
      </div>
    </InternalPageLayout>
  );
};
