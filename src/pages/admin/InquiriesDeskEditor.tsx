import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Download,
  RefreshCw,
  User,
  GraduationCap,
  Calendar,
  AlertCircle,
  ExternalLink,
  Info,
} from "lucide-react";
import {
  InquiryItem,
  fetchInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../../services/inquiryService";
import { SCHOOL_INFO } from "../../data/schoolData";

export const InquiriesDeskEditor: React.FC = () => {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [gradeFilter, setGradeFilter] = useState<string>("ALL");
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchInquiries();
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    const success = await updateInquiryStatus(id, newStatus);
    if (success) {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
      showActionMsg(`Status updated to "${newStatus}"`);
    } else {
      showActionMsg("Failed to update status", true);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry record?")) return;
    const success = await deleteInquiry(id);
    if (success) {
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      showActionMsg("Inquiry removed from record");
    } else {
      showActionMsg("Failed to delete inquiry", true);
    }
  };

  const showActionMsg = (text: string, isError = false) => {
    setActionMessage(text);
    setTimeout(() => setActionMessage(null), 3500);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ["ID", "Parent Name", "Student Name", "Grade Seeking", "Phone", "Email", "Status", "Source", "Date Received", "Parent Query"];
    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${inq.parentName.replace(/"/g, '""')}"`,
      `"${(inq.studentName || "").replace(/"/g, '""')}"`,
      `"${inq.gradeSeeking}"`,
      `"${inq.phone}"`,
      `"${(inq.email || "").replace(/"/g, '""')}"`,
      `"${inq.status}"`,
      `"${inq.source || "Website"}"`,
      `"${new Date(inq.createdAt).toLocaleString("en-IN")}"`,
      `"${(inq.notes || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lotus-inquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered inquiries
  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.studentName && inq.studentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.phone.includes(searchQuery) ||
      (inq.email && inq.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.notes && inq.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || inq.status === statusFilter;
    const matchesGrade = gradeFilter === "ALL" || inq.gradeSeeking === gradeFilter;

    return matchesSearch && matchesStatus && matchesGrade;
  });

  const countNew = inquiries.filter((i) => i.status === "NEW").length;
  const countContacted = inquiries.filter((i) => i.status === "CONTACTED").length;
  const countFollowUp = inquiries.filter((i) => i.status === "FOLLOW_UP").length;
  const countResolved = inquiries.filter((i) => i.status === "RESOLVED").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#E87737] block">
            Admissions Desk Management
          </span>
          <h2 className="text-xl font-bold font-display text-[#2F5187]">
            Online Inquiries & Lead Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            All prospective student admissions submitted on the website are recorded here and dispatched to <strong>{SCHOOL_INFO.email}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleExportCSV}
            disabled={inquiries.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#2F5187] hover:bg-[#233d66] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Action Notification */}
      {actionMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-emerald-600 hover:text-emerald-900 font-bold ml-2">
            ✕
          </button>
        </div>
      )}

      {/* Email Integration Status Notice */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-900">
        <div className="flex items-start gap-2.5">
          <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Official School Inbox: </span>
            <span className="underline">{SCHOOL_INFO.email}</span>
            <p className="text-[11px] text-blue-700 mt-0.5">
              Whenever a parent submits an inquiry form, an email notification containing student details and contact information is dispatched automatically.
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded font-semibold text-[10px] uppercase">
            Active Desk
          </span>
        </div>
      </div>

      {/* Status Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          onClick={() => setStatusFilter("ALL")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "ALL"
              ? "bg-[#2F5187] text-white border-[#2F5187] shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">All Inquiries</span>
          <div className="text-xl font-extrabold mt-1">{inquiries.length}</div>
        </div>

        <div
          onClick={() => setStatusFilter("NEW")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "NEW"
              ? "bg-[#E87737] text-white border-[#E87737] shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">New Unread</span>
          <div className="text-xl font-extrabold mt-1">{countNew}</div>
        </div>

        <div
          onClick={() => setStatusFilter("CONTACTED")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "CONTACTED"
              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">Contacted</span>
          <div className="text-xl font-extrabold mt-1">{countContacted}</div>
        </div>

        <div
          onClick={() => setStatusFilter("FOLLOW_UP")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "FOLLOW_UP"
              ? "bg-amber-600 text-white border-amber-600 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">Follow Up</span>
          <div className="text-xl font-extrabold mt-1">{countFollowUp}</div>
        </div>

        <div
          onClick={() => setStatusFilter("RESOLVED")}
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            statusFilter === "RESOLVED"
              ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
              : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider block opacity-80">Resolved / Enrolled</span>
          <div className="text-xl font-extrabold mt-1">{countResolved}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by parent, student, phone, or query..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-slate-200 focus:outline-none focus:border-[#2F5187]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="text-xs py-1.5 px-2.5 rounded border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-[#2F5187]"
          >
            <option value="ALL">All Grades</option>
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

          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-slate-500 hover:text-slate-800 underline px-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-lg border border-slate-200 text-slate-500 text-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-[#2F5187]" />
          <span>Loading inquiries...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border border-slate-200 text-slate-500 space-y-3">
          <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="font-bold text-sm text-slate-700">No Inquiries Found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery || statusFilter !== "ALL" || gradeFilter !== "ALL"
              ? "No admissions inquiries match the current search filters."
              : "No inquiries have been registered yet. Test forms on the public website will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inq) => {
            const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
            const waPhone = cleanPhone.startsWith("91") ? cleanPhone : `91${cleanPhone}`;
            const dateStr = new Date(inq.createdAt).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            });

            return (
              <div
                key={inq.id}
                className="bg-white p-5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3"
              >
                {/* Top Row: Parent, Grade, Status, Date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-sm text-[#2F5187]">
                      {inq.parentName}
                    </span>
                    {inq.studentName && (
                      <span className="text-xs text-slate-500">
                        (Child: <strong className="text-slate-700">{inq.studentName}</strong>)
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                      {inq.gradeSeeking}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        inq.status === "NEW"
                          ? "bg-amber-100 text-amber-800"
                          : inq.status === "CONTACTED"
                          ? "bg-blue-100 text-blue-800"
                          : inq.status === "FOLLOW_UP"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {dateStr}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]">
                      {inq.source || "Website"}
                    </span>
                  </div>
                </div>

                {/* Details & Notes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone Contact</span>
                    <a
                      href={`tel:${inq.phone}`}
                      className="font-bold text-[#2F5187] hover:underline flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#E87737]" />
                      <span>{inq.phone}</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                    {inq.email ? (
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-slate-700 hover:underline flex items-center gap-1.5 truncate"
                      >
                        <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{inq.email}</span>
                      </a>
                    ) : (
                      <span className="text-slate-400 italic">Not provided</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Status Actions</span>
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className="text-xs p-1 rounded border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-[#2F5187] w-full"
                    >
                      <option value="NEW">NEW - Pending Review</option>
                      <option value="CONTACTED">CONTACTED - Call Made</option>
                      <option value="FOLLOW_UP">FOLLOW UP - Pending Documents</option>
                      <option value="RESOLVED">RESOLVED - Enrolled / Closed</option>
                    </select>
                  </div>
                </div>

                {/* Query Notes */}
                {inq.notes && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-700 font-sans italic">
                    <span className="font-semibold text-slate-500 not-italic block text-[10px] uppercase tracking-wider mb-1">
                      Parent's Inquiry Message:
                    </span>
                    "{inq.notes}"
                  </div>
                )}

                {/* Quick Action Footer Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${inq.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2F5187] hover:bg-[#233d66] text-white text-[11px] font-bold uppercase transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call Now</span>
                    </a>
                    <a
                      href={`https://wa.me/${waPhone}?text=${encodeURIComponent(
                        `Hello ${inq.parentName}, this is the Admissions Desk from Lotus Global School, Vatar, Vapi regarding your inquiry for ${inq.studentName || inq.gradeSeeking}. How can we assist you?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-bold uppercase transition-colors"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                    {inq.email && (
                      <a
                        href={`mailto:${inq.email}?subject=${encodeURIComponent(
                          `Lotus Global School Admission Guidance - ${inq.studentName || inq.parentName}`
                        )}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold uppercase transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Email</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="inline-flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-800 font-semibold px-2 py-1 rounded hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Record</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
