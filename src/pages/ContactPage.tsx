import React, { useState } from "react";
import { InternalPageLayout } from "../components/InternalPageLayout";
import { SCHOOL_INFO } from "../data/schoolData";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2, ShieldCheck } from "lucide-react";
import { InstagramIcon } from "../components/InstagramIcon";
import { useSiteData } from "../data/siteDataService";

interface ContactPageProps {
  onNavigate?: (pageId: string) => void;
  openInquiry?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate = () => {},
  openInquiry = () => {},
}) => {
  const { siteData } = useSiteData();
  const school = siteData.schoolInfo;
  const banner = siteData.pageBanners?.contact || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80";

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    gradeSeeking: "Grade 1",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <InternalPageLayout
      title="Contact Us"
      category="CONTACT US"
      activePageId="contact"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      bannerImage={banner}
      breadcrumbs={[{ label: "Contact Us" }]}
    >
      <div className="space-y-8">
        {/* Section Header */}
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Administrative & Campus Reach
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Get in Touch With Lotus Global School
          </h2>
        </div>

        {/* Contact Info Cards (Reference layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Official Campus Details */}
          <div className="p-6 rounded border border-slate-200 bg-[#F8FAFC] space-y-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <img
                src="/assets/logo.png"
                alt="Lotus Global School Crest"
                className="h-14 w-auto object-contain"
              />
              <div>
                <h3 className="font-display font-bold text-base text-[#2F5187]">
                  LOTUS GLOBAL SCHOOL
                </h3>
                <p className="text-xs text-[#E87737] font-semibold">
                  Vatar, Vapi, Gujarat
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E87737] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Campus Address:</strong>
                  <span>{SCHOOL_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#E87737] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Telephone / Admissions Desk:</strong>
                  <a href={`tel:${SCHOOL_INFO.phone}`} className="text-[#2F5187] font-semibold hover:underline">
                    +91 {SCHOOL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#E87737] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Official Electronic Mail:</strong>
                  <a href={`mailto:${SCHOOL_INFO.email}`} className="text-[#2F5187] hover:underline">
                    {SCHOOL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#E87737] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Office Visiting Hours:</strong>
                  <span>{siteData.locationPage?.visitingHours || "Monday to Saturday: 9:00 AM – 4:00 PM"}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#E87737] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Affiliation Status:</strong>
                  <span>{SCHOOL_INFO.affiliationStatus} (NCERT Framework)</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=Hello%20Lotus%20Global%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={SCHOOL_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-pink-700 hover:bg-pink-600 text-white rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>Follow Instagram</span>
              </a>
            </div>
          </div>

          {/* Interactive Contact & Inquiry Form */}
          <div className="p-6 rounded border border-slate-200 bg-white shadow-sm space-y-4">
            <div>
              <h3 className="font-display font-bold text-lg text-[#2F5187]">
                Send an Inquiry Message
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the details below and our admissions team will respond promptly.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-[#EEF3FA] border border-[#2F5187]/20 rounded text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#E87737] mx-auto" />
                <h4 className="font-bold text-base text-[#2F5187]">
                  Thank You for Your Inquiry!
                </h4>
                <p className="text-xs text-slate-600">
                  We have received your message. Our admissions desk will reach out to you via telephone shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-bold text-[#E87737] uppercase underline pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.parentName}
                    onChange={(e) =>
                      setFormData({ ...formData, parentName: e.target.value })
                    }
                    className="w-full p-2.5 border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9054592424"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full p-2.5 border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Grade Seeking Admission
                    </label>
                    <select
                      value={formData.gradeSeeking}
                      onChange={(e) =>
                        setFormData({ ...formData, gradeSeeking: e.target.value })
                      }
                      className="w-full p-2.5 border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none bg-white"
                    >
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">Junior KG (LKG)</option>
                      <option value="UKG">Senior KG (UKG)</option>
                      <option value="Grade 1">Grade 1</option>
                      <option value="Grade 2">Grade 2</option>
                      <option value="Grade 3">Grade 3</option>
                      <option value="Grade 4">Grade 4</option>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-2.5 border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Inquiry Message / Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter any questions regarding curriculum, timings, or transportation..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full p-2.5 border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#E87737] hover:bg-[#D26425] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Campus Location & Directions */}
        <div className="space-y-4 pt-4">
          <div className="border-b border-slate-200 pb-2">
            <h3 className="font-display font-bold text-xl text-[#2F5187]">
              Campus Geographical Map & Directions
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Located near Vatar PHC, Vatar, Vapi, Gujarat 396191
            </p>
          </div>

          <div className="w-full h-80 rounded border border-slate-200 overflow-hidden shadow-sm bg-slate-100">
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
      </div>
    </InternalPageLayout>
  );
};
