import React, { useState } from "react";
import { ADMISSION_STEPS, REQUIRED_DOCUMENTS, SCHOOL_INFO } from "../data/schoolData";
import { FileText, CheckCircle2, ChevronRight, HelpCircle, Send, MessageSquare, ShieldCheck } from "lucide-react";

interface AdmissionsPageProps {
  openInquiry: () => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ openInquiry }) => {
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    gradeSeeking: "Nursery",
    phone: "",
    email: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `*Lotus Global School Admission Inquiry*\n\n` +
      `Parent: ${formData.parentName || "Parent"}\n` +
      `Student: ${formData.studentName || "Prospective Student"}\n` +
      `Seeking Grade: ${formData.gradeSeeking}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email || "N/A"}\n` +
      `Note: ${formData.notes || "Inquiry regarding admissions process."}`
    );
    window.open(`https://wa.me/91${SCHOOL_INFO.whatsapp}?text=${text}`, "_blank");
  };

  const faqs = [
    {
      q: "What classes are offered at Lotus Global School?",
      a: "Lotus Global School is establishing classes from Nursery up to Grade 10 under the proposed CBSE framework with the NCERT curriculum.",
    },
    {
      q: "What is the primary medium of instruction?",
      a: "The medium of instruction is English, supplemented with strong linguistic development in Hindi and regional languages.",
    },
    {
      q: "When can parents interact with the academic team?",
      a: "Parents who submit an online inquiry or contact the campus office will be scheduled for an interaction and guidance session with the admissions coordination team.",
    },
    {
      q: "What documents must be submitted during registration?",
      a: "The mandatory documents include the official Birth Certificate, Transfer Certificate (TC from Grade 1 onwards), previous report cards/transcripts, and recent passport-sized photographs.",
    },
  ];

  return (
    <div className="pt-28 pb-20 animate-fade-in bg-[#F8FAFC]">
      {/* Page Hero */}
      <section className="bg-[#0B1B3D] text-white py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E86A2C] uppercase tracking-wider">
              <span>Enrollment Pathway</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
              Admissions Process
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Transparent, student-centric guidance designed to introduce families to the academic vision and community of Lotus Global School.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Step Pathway Journey */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-20">
          
          <div className="space-y-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                Step-by-Step Pathway
              </span>
              <h2 className="font-display font-bold text-3xl text-[#0B1B3D] tracking-tight mt-1">
                The Four Stages of Admission
              </h2>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Structured to ensure every family receives personal attention and comprehensive academic clarity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ADMISSION_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl font-display font-extrabold text-[#E86A2C] mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-display font-bold text-xl text-[#0B1B3D] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                      {step.summary}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-bold text-slate-400 uppercase">
                    Stage {step.step} / 04
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Section */}
          <div className="space-y-8 pt-8 border-t border-slate-200">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                Documentation Checklist
              </span>
              <h2 className="font-display font-bold text-3xl text-[#0B1B3D] tracking-tight mt-1">
                Required Documents for Registration
              </h2>
              <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                Please prepare the following verification documents as supplied for formal enrollment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REQUIRED_DOCUMENTS.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-4"
                >
                  <div className="p-3 rounded-lg bg-orange-50 text-[#E86A2C] shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#0B1B3D]">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {doc.description}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Mandatory Document
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Inquiry Form + Direct Contact Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-slate-200">
            
            {/* Left: Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                  Direct Inquiry
                </span>
                <h3 className="font-display font-bold text-2xl text-[#0B1B3D] mt-1">
                  Submit an Online Admission Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Our admissions office will contact you directly to schedule an interaction session.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-display font-bold text-lg text-[#0B1B3D]">Inquiry Received</h4>
                  <p className="text-xs text-slate-600">
                    Thank you. The admissions office at Lotus Global School has logged your details and will call {formData.phone} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        placeholder="Full name"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                        Student Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        placeholder="Child's name"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                        Grade Seeking Admission *
                      </label>
                      <select
                        value={formData.gradeSeeking}
                        onChange={(e) => setFormData({ ...formData, gradeSeeking: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] bg-white"
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
                      <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                        Primary Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit mobile"
                        className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                      Query or Comments
                    </label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any specific questions regarding curriculum, facilities or transportation..."
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:border-[#E86A2C] focus:ring-1 focus:ring-[#E86A2C] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="w-full sm:flex-1 py-3 bg-[#0B1B3D] text-white font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-[#E86A2C] transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit Inquiry
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full sm:w-auto py-3 px-5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs uppercase tracking-wider rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: FAQs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E86A2C]">
                  Frequently Asked Questions
                </span>
                <h3 className="font-display font-bold text-2xl text-[#0B1B3D]">
                  Admissions Guidance
                </h3>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-[#E86A2C] shrink-0 mt-0.5" />
                      <h4 className="text-xs font-bold text-[#0B1B3D] leading-tight">
                        {faq.q}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600">
                <div className="font-bold text-[#0B1B3D] mb-1">Admissions Help Desk</div>
                Call: <a href={`tel:${SCHOOL_INFO.phone}`} className="font-bold text-[#0B1B3D]">{SCHOOL_INFO.phone}</a> | Email: <a href={`mailto:${SCHOOL_INFO.email}`} className="text-slate-700 underline">{SCHOOL_INFO.email}</a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
