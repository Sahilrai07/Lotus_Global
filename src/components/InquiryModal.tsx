import React, { useState } from "react";
import { X, Send, CheckCircle2, MessageSquare, Mail, Loader2, AlertCircle } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";
import { submitInquiry, SubmitInquiryResult } from "../services/inquiryService";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    gradeSeeking: "Nursery",
    phone: "",
    email: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitInquiryResult | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await submitInquiry({
      parentName: formData.parentName,
      studentName: formData.studentName,
      gradeSeeking: formData.gradeSeeking,
      phone: formData.phone,
      email: formData.email,
      notes: formData.notes,
      source: "Admissions Modal Form",
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitResult(result);
      setSubmitted(true);
    } else {
      setErrorMessage(result.error || "Failed to submit inquiry. Please try again or reach out on WhatsApp.");
    }
  };

  const handleEmailDirectSend = () => {
    const subject = encodeURIComponent(`Admission Inquiry for ${formData.gradeSeeking} - ${formData.studentName || formData.parentName}`);
    const body = encodeURIComponent(
      `Respected Admissions Coordinator,\n\n` +
      `I am writing to inquire regarding admission into ${formData.gradeSeeking} for the upcoming academic session.\n\n` +
      `Details:\n` +
      `- Parent Name: ${formData.parentName}\n` +
      `- Student Name: ${formData.studentName || "N/A"}\n` +
      `- Grade: ${formData.gradeSeeking}\n` +
      `- Contact Phone: ${formData.phone}\n` +
      `- Query: ${formData.notes || "Please provide curriculum, fee details, and admission timeline."}\n\n` +
      `Regards,\n${formData.parentName}`
    );
    window.location.href = `mailto:${SCHOOL_INFO.email}?subject=${subject}&body=${body}`;
  };


  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `*Lotus Global School Admission Inquiry*\n\n` +
      `Parent Name: ${formData.parentName || "Parent"}\n` +
      `Student Name: ${formData.studentName || "Prospective Student"}\n` +
      `Seeking Grade: ${formData.gradeSeeking}\n` +
      `Contact Phone: ${formData.phone}\n` +
      `Email: ${formData.email || "N/A"}\n` +
      `Query: ${formData.notes || "I would like more information regarding the admission process."}`
    );
    window.open(`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded shadow-2xl border border-slate-300 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2F5187] text-white p-6 relative border-b-2 border-[#E87737] shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-slate-300 hover:text-white rounded hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <picture>
              <source srcSet="/assets/logo.webp" type="image/webp" />
              <img
                src="/assets/logo.png"
                alt="Crest"
                width="38"
                height="48"
                loading="lazy"
                decoding="async"
                className="h-12 w-auto object-contain bg-white/10 p-1 rounded"
              />
            </picture>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E87737]">
                Admissions Guidance
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                Admissions Inquiry Form
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-200">
            Submit your details to connect directly with the Lotus Global School admissions desk in Vatar, Vapi.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-xl text-[#2F5187]">
                Inquiry Successfully Registered
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in Lotus Global School. Your inquiry for <strong className="text-slate-800">{formData.gradeSeeking}</strong> has been saved and forwarded to the school admissions cell.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800 max-w-md mx-auto flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Official Notification Dispatched to: <strong>{SCHOOL_INFO.email}</strong>
                </span>
              </div>
              
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-600 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Connect on WhatsApp
                </button>
                <button
                  onClick={handleEmailDirectSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#2F5187] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#254270] transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  Email Copy
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Child's full name"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Grade Seeking Admission *
                  </label>
                  <select
                    value={formData.gradeSeeking}
                    onChange={(e) => setFormData({ ...formData, gradeSeeking: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none bg-white"
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
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Contact Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9054592424"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Any Specific Queries or Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ask about curriculum, school bus transport, or campus visits..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:border-[#2F5187] focus:ring-1 focus:ring-[#2F5187] outline-none"
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

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#E87737] hover:bg-[#D26425] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting & Dispatching Mail...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
