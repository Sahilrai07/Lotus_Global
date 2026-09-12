import React, { useState } from "react";
import { X, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { SCHOOL_INFO } from "../data/schoolData";

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

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071126]/75 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0B1B3D] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <img src="/assets/logo.png" alt="Crest" className="h-10 w-auto object-contain" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#E86A2C]">
                Admissions Guidance
              </span>
              <h3 className="font-display font-bold text-xl text-white">
                Admission Inquiry
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-300">
            Submit your details to connect with the Lotus Global School admissions desk in Vatar, Vapi.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-xl text-[#0B1B3D]">
                Inquiry Received
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in Lotus Global School. Our admissions coordinator will reach out to you at <strong className="text-slate-800">{formData.phone}</strong> shortly.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  Connect Instantly on WhatsApp
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="Enter full name"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Student Name
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Child's full name"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Grade Seeking Admission *
                  </label>
                  <select
                    value={formData.gradeSeeking}
                    onChange={(e) => setFormData({ ...formData, gradeSeeking: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] transition-colors bg-white"
                  >
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Primary Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Questions / Specific Requirements
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Optional details or specific questions regarding the curriculum or admission process..."
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-2.5 px-4 bg-[#0B1B3D] text-white font-semibold text-sm rounded-lg hover:bg-[#E86A2C] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Inquiry
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="w-full sm:w-auto py-2.5 px-4 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-sm rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Direct WhatsApp
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center pt-2">
                Your contact details are strictly kept confidential for institutional communication.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
