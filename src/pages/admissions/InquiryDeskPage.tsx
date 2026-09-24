import React, { useState } from "react";
import { InternalPageLayout } from "../../components/InternalPageLayout";
import { SCHOOL_INFO } from "../../data/schoolData";
import { Send, Phone, Mail, MapPin, MessageSquare, CheckCircle2, HelpCircle, Clock, ShieldCheck, Loader2, AlertCircle } from "lucide-react";
import { useSiteData } from "../../data/siteDataService";
import { submitInquiry, SubmitInquiryResult } from "../../services/inquiryService";

interface InquiryDeskPageProps {
  openInquiry: () => void;
  onNavigate?: (pageId: string) => void;
}

export const InquiryDeskPage: React.FC<InquiryDeskPageProps> = ({
  openInquiry,
  onNavigate = () => {},
}) => {
  const { siteData } = useSiteData();
  const banner = siteData.pageBanners?.admissions || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80";

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    grade: "Grade 1",
    phone: "",
    email: "",
    locality: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitInquiryResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    const notesCombined = [
      formData.locality ? `Locality: ${formData.locality}` : "",
      formData.message ? `Query: ${formData.message}` : "",
    ].filter(Boolean).join("\n");

    const result = await submitInquiry({
      parentName: formData.parentName,
      studentName: formData.childName,
      gradeSeeking: formData.grade,
      phone: formData.phone,
      email: formData.email,
      notes: notesCombined,
      source: "Online Admissions Desk Page",
    });

    setSubmitting(false);

    if (result.success) {
      setSubmitResult(result);
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || "Failed to submit inquiry. Please try again or reach out directly on WhatsApp.");
    }
  };


  return (
    <InternalPageLayout
      title="Online Admissions Inquiry Desk"
      category="ADMISSIONS"
      activePageId="admissions-inquiry"
      onNavigate={onNavigate}
      openInquiry={openInquiry}
      hideSidebarContactOnMobile={true}
      bannerImage={banner}
      breadcrumbs={[
        { label: "Admissions", pageId: "admissions" },
        { label: "Inquiry Desk" },
      ]}
    >
      <div className="space-y-8">
        <div className="border-b-2 border-[#2F5187] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Admissions Cell
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#2F5187]">
            Connect with Lotus Global School Admissions
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          Welcome to the Lotus Global School Admissions Portal. Whether you are exploring enrollment for our joyful early childhood programs or seeking admission for primary, middle, or secondary grades, our counselors are here to provide tailored guidance.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Inquiry Form Column */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-display font-bold text-xl text-[#2F5187]">
                  Inquiry Successfully Registered!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.parentName}</strong>. Your inquiry for <strong>{formData.childName || "your child"}</strong> ({formData.grade}) has been officially registered and queued for admissions review.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800 max-w-md mx-auto flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Official Notification Dispatched to: <strong>{SCHOOL_INFO.email}</strong>
                  </span>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        parentName: "",
                        childName: "",
                        grade: "Grade 1",
                        phone: "",
                        email: "",
                        locality: "",
                        message: "",
                      });
                    }}
                    className="btn-portal-secondary text-xs uppercase font-bold py-2.5 px-6"
                  >
                    Submit Another Inquiry
                  </button>
                  <a
                    href={`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=${encodeURIComponent(`Hello Lotus Global School Admissions, I submitted an inquiry for ${formData.childName || formData.parentName} (${formData.grade}). Phone: ${formData.phone}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Admissions</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <h3 className="font-display font-bold text-base text-[#2F5187] flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#E87737]" />
                    <span>Admissions Registration Form</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Fields marked with an asterisk (*) are mandatory.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g., Rajesh Sharma"
                      className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Child / Student Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      placeholder="e.g., Aarav Sharma"
                      className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Seeking Grade / Class *
                    </label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] bg-white"
                    >
                      <option value="Nursery">Nursery (Age 3+)</option>
                      <option value="Junior KG">Junior KG / LKG</option>
                      <option value="Senior KG">Senior KG / UKG</option>
                      <option value="Grade 1">Grade 1 (Age 6+)</option>
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

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Contact Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g., 9054592424"
                      className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g., rajesh@example.com"
                      className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Current City / Residential Locality
                    </label>
                    <input
                      type="text"
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      placeholder="e.g., Vatar, Vapi GIDC, Chala, Daman Road"
                      className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Questions or Special Inquiries (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about previous schooling, bus transport requirements, or questions..."
                    className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187]"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                    <div>
                      <span className="font-semibold">Notice:</span> {errorMessage}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-portal-primary py-3 text-xs font-bold uppercase tracking-wider justify-center shadow-md flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting & Dispatching Email...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Official Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Details & Direct Hotline Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1E375F] text-white p-6 rounded-lg shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-[#E87737] mb-1">
                Direct Admissions Line
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Admissions Helpdesk
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Feel free to call or WhatsApp our counselors directly for quick questions regarding seat availability or school fee structure.
              </p>

              <div className="space-y-3 text-xs text-slate-200">
                <a
                  href={`tel:${SCHOOL_INFO.phone}`}
                  className="flex items-center gap-3 p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#E87737]" />
                  <div>
                    <div className="text-[10px] text-slate-400">Helpline Phone</div>
                    <div className="font-bold text-white text-sm">{SCHOOL_INFO.phone}</div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=Hello%20Lotus%20Global%20School%2C%20I%20would%20like%20to%20enquire%20about%20admissions.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-2 rounded bg-emerald-600/30 border border-emerald-500/30 hover:bg-emerald-600/50 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-emerald-300">Instant WhatsApp Chat</div>
                    <div className="font-bold text-emerald-100 text-sm">+{SCHOOL_INFO.whatsapp}</div>
                  </div>
                </a>

                <a
                  href={`mailto:${SCHOOL_INFO.email}`}
                  className="flex items-center gap-3 p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#E87737]" />
                  <div>
                    <div className="text-[10px] text-slate-400">Official Admissions Email</div>
                    <div className="font-medium text-white">{SCHOOL_INFO.email}</div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-2 rounded bg-white/10">
                  <MapPin className="w-4 h-4 text-[#E87737] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] text-slate-400">Campus Location</div>
                    <div className="font-medium text-white leading-relaxed">
                      Near Vatar PHC, Vatar, Vapi, Gujarat – 396191
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admissions Office Card (Mobile View: placed below Direct Admissions Line and above Timings) */}
            <div className="lg:hidden bg-[#2F5187] text-white p-5 rounded-lg border border-[#1E375F] shadow-sm space-y-4">
              <div className="border-b border-white/20 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E87737]">
                  Admissions Office
                </span>
                <h4 className="font-display font-bold text-base text-white mt-0.5">
                  Lotus Global School
                </h4>
              </div>

              <div className="space-y-2.5 text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E87737] shrink-0 mt-0.5" />
                  <span>Near Vatar PHC, Vatar, Vapi, Gujarat 396191</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#E87737] shrink-0" />
                  <a href={`tel:${SCHOOL_INFO.phone}`} className="hover:text-[#E87737] font-semibold">
                    {SCHOOL_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#E87737] shrink-0" />
                  <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-[#E87737] break-all">
                    {SCHOOL_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-[#2F5187] mb-2">
                <Clock className="w-4 h-4 text-[#E87737]" />
                <span>Admissions Office Timings</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                The admissions desk is open six days a week for in-person campus walk-throughs and counseling sessions:
              </p>
              <div className="text-xs text-slate-700 font-semibold space-y-1">
                <div>Monday – Friday: 08:30 AM – 03:30 PM</div>
                <div>Saturday: 08:30 AM – 01:30 PM</div>
                <div className="text-slate-400 font-normal">Sunday: Closed for routine inquiries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InternalPageLayout>
  );
};
