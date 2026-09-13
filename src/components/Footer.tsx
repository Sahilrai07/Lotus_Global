import React from "react";
import { MapPin, Phone, Mail, MessageSquare, ChevronRight, ExternalLink } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";
import { InstagramIcon } from "./InstagramIcon";

interface FooterProps {
  setActivePage: (page: string) => void;
  openInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, openInquiry }) => {
  const handleNav = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#142540] text-slate-200 border-t-4 border-[#E87737]">
      {/* Main Footer Body - Reference .footer-bottom-bg 3-Column Layout */}
      <div className="wrap py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Column 1: School Identity & Direct Contact */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Lotus Global School Crest"
                className="h-16 w-auto object-contain bg-white/5 p-1 rounded border border-white/10"
              />
              <div>
                <h3 className="font-display text-white font-bold text-lg tracking-tight">
                  LOTUS GLOBAL SCHOOL
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#E87737] font-semibold">
                  Vatar, Vapi, Gujarat
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              An ambitious institution rising in Vatar, Vapi, designed to rethink modern education through active discovery, cutting-edge labs, and enduring values.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E87737] shrink-0 mt-0.5" />
                <span>
                  1836/1 TO 1836/3, Near Vatar PHC, Vatar, Vapi, Gujarat 396191
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E87737] shrink-0" />
                <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-[#E87737] font-semibold text-white">
                  +91 {SCHOOL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E87737] shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-[#E87737] text-slate-300">
                  {SCHOOL_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-1 text-[11px] text-[#E87737] font-semibold">
              Status: {SCHOOL_INFO.affiliationStatus} (NCERT Curriculum)
            </div>
          </div>

          {/* Column 2: Quick Links (Institutional Directory) */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b-2 border-[#E87737] pb-2 inline-block mb-4">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-300 list-none m-0 p-0">
              <li>
                <button
                  onClick={() => handleNav("home")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>HOME</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("about")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>ABOUT US</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("vision-mission")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>MISSION & VISION</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("message")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>PRINCIPAL'S DESK</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("academics")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>ACADEMICS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("facilities")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>FACILITIES</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("faculty")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>FACULTY</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("admissions")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>ADMISSIONS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("gallery")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>GALLERY</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("contact")}
                  className="flex items-center gap-1 hover:text-[#E87737] transition-colors"
                >
                  <ChevronRight className="w-3 h-3 text-[#E87737]" />
                  <span>CONTACT US</span>
                </button>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                onClick={openInquiry}
                className="w-full py-2.5 px-4 bg-[#E87737] text-white font-bold text-xs uppercase tracking-wider rounded text-center hover:bg-[#D26425] transition-colors shadow"
              >
                Online Admissions Inquiry
              </button>
            </div>
          </div>

          {/* Column 3: Social & Campus Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white border-b-2 border-[#E87737] pb-2 inline-block mb-4">
              Institutional Connect
            </h4>

            <div className="p-4 bg-white/5 rounded border border-white/10 space-y-2 text-xs">
              <span className="font-bold text-white uppercase block">
                Admissions Office Hours
              </span>
              <p className="text-slate-300">
                Monday – Saturday: 9:00 AM – 4:00 PM
              </p>
              <p className="text-slate-400 text-[11px]">
                Parents may schedule guided campus walk-throughs by appointment.
              </p>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                Official Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=Hello%20Lotus%20Global%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded bg-emerald-700/80 hover:bg-emerald-600 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>
                <a
                  href={SCHOOL_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded bg-pink-700/80 hover:bg-pink-600 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400">
              Campus Motto: <strong className="text-white">Dedication · Diligence · Discipline</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar - Reference .footer-bottom */}
      <div className="bg-[#0D1829] py-4 border-t border-white/5 text-xs text-slate-400">
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} <strong>Lotus Global School</strong>, Vatar, Vapi. All institutional rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Nursery to Grade 10</span>
            <span>·</span>
            <span>Proposed CBSE Affiliation</span>
            <span>·</span>
            <button onClick={() => handleNav("contact")} className="hover:text-white underline">
              Campus Directions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
