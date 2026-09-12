import React from "react";
import { MapPin, Phone, Mail, MessageSquare, ArrowUpRight } from "lucide-react";
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
    <footer className="bg-[#071126] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: School Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Lotus Global School Crest"
                className="h-16 w-auto object-contain"
              />
              <div>
                <h3 className="font-display text-white font-bold text-lg tracking-tight">
                  LOTUS GLOBAL SCHOOL
                </h3>
                <p className="text-xs uppercase tracking-widest text-[#E86A2C] font-semibold">
                  Vatar, Vapi, Gujarat
                </p>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              An ambitious CBSE institution rising in Vatar, Vapi, designed to rethink modern education. Built on the belief that learning should inspire rather than instruct.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E86A2C]"></span>
                <span>Motto: <strong>Dedication · Diligence · Discipline</strong></span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Institution
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav("about")} className="text-slate-400 hover:text-white transition-colors">
                  About the Campus
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("vision-mission")} className="text-slate-400 hover:text-white transition-colors">
                  Vision & Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("message")} className="text-slate-400 hover:text-white transition-colors">
                  Principal's Message
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("academics")} className="text-slate-400 hover:text-white transition-colors">
                  Academics & Pedagogy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("facilities")} className="text-slate-400 hover:text-white transition-colors">
                  Campus Facilities
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("faculty")} className="text-slate-400 hover:text-white transition-colors">
                  Faculty Standards
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("gallery")} className="text-slate-400 hover:text-white transition-colors">
                  Digital Exhibition
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Admissions & Guidance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Admissions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => handleNav("admissions")} className="text-slate-400 hover:text-white transition-colors">
                  Admission Process
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("admissions")} className="text-slate-400 hover:text-white transition-colors">
                  Required Documents
                </button>
              </li>
              <li>
                <button onClick={openInquiry} className="text-[#E86A2C] hover:text-[#f0854e] transition-colors flex items-center gap-1 font-medium">
                  Online Inquiry <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button onClick={() => handleNav("contact")} className="text-slate-400 hover:text-white transition-colors">
                  Admissions Office Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Reach */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">
              Connect With Us
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E86A2C] shrink-0 mt-0.5" />
                <span>1836/1 TO 1836/3, Near Vatar PHC, Vatar, Vapi, Gujarat 396191</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E86A2C] shrink-0" />
                <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-white transition-colors">
                  {SCHOOL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E86A2C] shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white transition-colors">
                  {SCHOOL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/91${SCHOOL_INFO.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-slate-900 border border-slate-800 text-emerald-400 hover:bg-slate-800 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href={SCHOOL_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-slate-900 border border-slate-800 text-pink-400 hover:bg-slate-800 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Lotus Global School. All institutional rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">{SCHOOL_INFO.affiliationStatus} (NCERT Framework)</span>
            <span className="hidden md:inline">|</span>
            <button onClick={() => handleNav("contact")} className="hover:text-slate-300">
              Campus Directions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
