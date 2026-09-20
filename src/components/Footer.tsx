import React from "react";
import { MapPin, Phone, Mail, MessageSquare, ChevronRight, FileText, Clock, ExternalLink } from "lucide-react";
import { getSiteData } from "../data/siteDataService";
import { InstagramIcon } from "./InstagramIcon";

interface FooterProps {
  setActivePage: (page: string) => void;
  openInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, openInquiry }) => {
  const school = getSiteData().schoolInfo;

  const handleNav = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#142540] text-slate-200 border-t-4 border-[#E87737]" role="contentinfo">
      {/* 4-COLUMN INSTITUTIONAL FOOTER BODY (Reference .footer-style3) */}
      <div className="wrap py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: School Identity & Address */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Lotus Global School Crest"
                className="h-14 w-auto object-contain bg-white/5 p-1 rounded border border-white/10"
              />
              <div>
                <h3 className="font-display text-white font-bold text-base sm:text-lg tracking-tight">
                  LOTUS GLOBAL SCHOOL
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-[#E87737] font-semibold">
                  Vatar, Vapi, Gujarat
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              An ambitious educational institution in Vatar, Vapi, designed to rethink modern schooling through active discovery, empirical science labs, and enduring values.
            </p>

            <div className="text-xs text-slate-300 space-y-1.5 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E87737] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-300">
                  {school.address}
                </span>
              </div>
              <div className="text-[11px] text-[#E87737] font-semibold pt-1">
                Status: {school.affiliationStatus} (NCERT Framework)
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links / Navigation */}
          <div>
            <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white border-b-2 border-[#E87737] pb-2 inline-block mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 list-none m-0 p-0">
              <li>
                <button
                  onClick={() => handleNav("home")}
                  className="flex items-center gap-1.5 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("about")}
                  className="flex items-center gap-1.5 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>About Lotus Global School</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("vision-mission")}
                  className="flex items-center gap-1.5 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Our Vision & Mission</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("message")}
                  className="flex items-center gap-1.5 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>The Principal's Desk</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("academics")}
                  className="flex items-center gap-1.5 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Academics & Curriculum</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("facilities")}
                  className="flex items-center gap-1.5 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Campus Laboratories & Facilities</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("documents")}
                  className="flex items-center gap-1.5 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#E87737]" />
                  <span>Documents & Downloads</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("disclosure")}
                  className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors font-semibold"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>CBSE Mandatory Public Disclosure</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details & Desk Timings */}
          <div className="space-y-4">
            <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white border-b-2 border-[#E87737] pb-2 inline-block mb-1">
              Contact Details
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E87737] shrink-0" />
                <a href={`tel:${school.phone}`} className="hover:text-[#E87737] text-white font-semibold">
                  +91 {school.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E87737] shrink-0" />
                <a href={`mailto:${school.email}`} className="hover:text-[#E87737] text-slate-300">
                  {school.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/91${school.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-300 hover:text-emerald-200"
                >
                  WhatsApp: +91 {school.whatsapp}
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-slate-700/60">
                <Clock className="w-4 h-4 text-[#E87737] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Campus Visiting Hours:</span>
                  <span className="text-[11px] text-slate-400">Monday – Saturday: 8:00 AM – 3:00 PM</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={openInquiry}
                  className="w-full py-2 px-3 rounded bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm text-center"
                >
                  Online Admission Inquiry
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Find Us / Google Maps Embed (Reference Column 4) */}
          <div className="space-y-4">
            <h4 className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider text-white border-b-2 border-[#E87737] pb-2 inline-block mb-1">
              Find Us
            </h4>
            <div className="w-full h-44 rounded overflow-hidden border border-slate-700 bg-slate-800 shadow-inner">
              <iframe
                title="Lotus Global School Location Map"
                src="https://maps.google.com/maps?q=Lotus%20Global%20School%2C%20Vatar%2C%20Vapi%2C%20Gujarat&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Located conveniently near Vatar Primary Health Center (PHC), Vapi, Gujarat 396191.
            </p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT & SMALLPRINT BAR (Reference .smallprint) */}
      <div className="bg-[#0e1b2f] border-t border-slate-800 py-4 px-4 text-xs text-slate-400">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="m-0">
            &copy; {new Date().getFullYear()} Lotus Global School, Vatar, Vapi. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <button onClick={() => handleNav("disclosure")} className="hover:text-white">
              Public Mandatory Disclosure
            </button>
            <span>·</span>
            <button onClick={() => handleNav("documents")} className="hover:text-white">
              Documents
            </button>
            <span>·</span>
            <button onClick={() => handleNav("contact")} className="hover:text-white">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
