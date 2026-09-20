import React from "react";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { getSiteData } from "../data/siteDataService";

export const PreFooterStrip: React.FC = () => {
  const school = getSiteData().schoolInfo;

  return (
    <section className="bg-[#2F5187] text-white py-10 px-4 border-t-4 border-[#E87737] border-b border-[#1E375F]">
      <div className="wrap text-center space-y-6">
        <h3 className="font-display font-bold text-lg sm:text-2xl uppercase tracking-wider text-slate-100 max-w-2xl mx-auto">
          Any question? Just give us a call or send us an email
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Phone Action */}
          <a
            href={`tel:${school.phone}`}
            className="flex items-center justify-center gap-3 p-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white group"
          >
            <div className="w-12 h-12 rounded-full bg-[#E87737] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
                Direct Admissions Desk
              </span>
              <span className="font-display font-bold text-lg sm:text-xl text-white">
                +91 {school.phone}
              </span>
            </div>
          </a>

          {/* Email Action */}
          <a
            href={`mailto:${school.email}`}
            className="flex items-center justify-center gap-3 p-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white group"
          >
            <div className="w-12 h-12 rounded-full bg-white text-[#2F5187] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block">
                Official Campus Email
              </span>
              <span className="font-display font-semibold text-sm sm:text-base text-white break-all">
                {school.email}
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
