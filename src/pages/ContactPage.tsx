import React, { useState } from "react";
import { SCHOOL_INFO } from "../data/schoolData";
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, CheckCircle2, Navigation } from "lucide-react";
import { InstagramIcon } from "../components/InstagramIcon";

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `*Lotus Global School Contact Query*\n\n` +
      `Name: ${formData.name || "Inquirer"}\n` +
      `Phone: ${formData.phone}\n` +
      `Subject: ${formData.subject}\n` +
      `Message: ${formData.message || "I would like to connect with the campus administrative desk."}`
    );
    window.open(`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <div className="pt-28 pb-20 animate-fade-in bg-[#F8FAFC]">
      {/* Page Hero */}
      <section className="bg-[#0B1B3D] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider">
              <span>Campus Office & Communication</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
              Contact Lotus Global School
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We welcome prospective parents, educators, and community members to connect with our campus administrative desk in Vatar, Vapi.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Address */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#E86A2C] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                Campus Address
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                1836/1 TO 1836/3, Near Vatar PHC, Vatar, Vapi, Gujarat 396191
              </p>
            </div>

            {/* Phone */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B1B3D] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                Phone / Calling
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <a href={`tel:${SCHOOL_INFO.phone}`} className="font-bold text-slate-800 hover:text-[#E86A2C]">
                  +91 {SCHOOL_INFO.phone}
                </a>
              </p>
              <span className="text-[10px] text-slate-400 block">Mon - Sat: 8:30 AM to 4:30 PM</span>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                Electronic Mail
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <a href={`mailto:${SCHOOL_INFO.email}`} className="font-semibold text-slate-800 hover:text-[#E86A2C] break-all">
                  {SCHOOL_INFO.email}
                </a>
              </p>
              <span className="text-[10px] text-slate-400 block">Official institutional correspondence</span>
            </div>

            {/* WhatsApp & Social */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#E25B88] flex items-center justify-center">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                Social & Messaging
              </h3>
              <div className="space-y-1 text-xs">
                <div>
                  WhatsApp: <a href={`https://wa.me/91${SCHOOL_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="font-bold text-emerald-600 hover:underline">{SCHOOL_INFO.whatsapp}</a>
                </div>
                <div>
                  Instagram: <a href={SCHOOL_INFO.instagramUrl} target="_blank" rel="noreferrer" className="text-pink-600 hover:underline font-semibold">@lotus.global.school</a>
                </div>
              </div>
            </div>

          </div>

          {/* Form + Map Placeholder Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                  Direct Dispatch
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1B3D] mt-1">
                  Send a Message to the Campus Office
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Our office administration team reviews all inquiries and responds within 24 operational hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-display font-bold text-lg text-[#0B1B3D]">Message Transmitted</h4>
                  <p className="text-xs text-slate-600">
                    Thank you, {formData.name}. Your correspondence has been logged by Lotus Global School.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit phone"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                        Subject / Nature of Inquiry
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] bg-white"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Admission Process">Admission Process</option>
                        <option value="Curriculum & NCERT Framework">Curriculum & NCERT Framework</option>
                        <option value="Campus Facilities">Campus Facilities</option>
                        <option value="Career & Faculty Opportunities">Career & Faculty Opportunities</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                      Your Message / Detailed Query *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe your query or request..."
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3 bg-[#0B1B3D] text-white font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#E86A2C] transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full sm:w-auto py-3 px-5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Quick WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Map Integration (Strict Compliance: User correction #5 - Marked as pending official link) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Campus Location Card */}
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3">
                  <Navigation className="w-6 h-6 text-[#E86A2C]" />
                  <h3 className="font-display font-bold text-xl text-[#0B1B3D]">
                    Campus Location & Directions
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="font-semibold text-slate-800">Physical Campus Coordinates:</div>
                  <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] text-[#0B1B3D]">
                    Lotus Global School<br />
                    1836/1 TO 1836/3, Near Vatar PHC,<br />
                    Vatar, Vapi, Gujarat 396191
                  </div>
                </div>

                {/* Map integration ready & marked pending per User Correction #5 */}
                <div className="p-6 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
                    <MapPin className="w-5 h-5 text-[#E86A2C]" />
                  </div>
                  <div className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider">
                    Interactive Google Map
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-mono">
                    [Map Integration Pending: Official Google Maps embed URL will be pinned upon final institutional coordinate submission by the school administration.]
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Clock className="w-4 h-4 text-[#E86A2C]" />
                    <span>Office Visiting Protocol</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Prior appointment is encouraged to ensure personalized interaction with the academic coordinator. Please call ahead at <strong>+91 {SCHOOL_INFO.phone}</strong>.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
