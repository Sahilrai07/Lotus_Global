export interface InquiryItem {
  id: string;
  parentName: string;
  studentName?: string | null;
  gradeSeeking: string;
  phone: string;
  email?: string | null;
  notes?: string | null;
  source?: string;
  status: "NEW" | "CONTACTED" | "FOLLOW_UP" | "RESOLVED" | string;
  createdAt: string;
  updatedAt?: string;
}

export interface SubmitInquiryParams {
  parentName: string;
  studentName?: string;
  gradeSeeking: string;
  phone: string;
  email?: string;
  notes?: string;
  source?: string;
}

export interface SubmitInquiryResult {
  success: boolean;
  message?: string;
  inquiry?: InquiryItem;
  emailSent?: boolean;
  emailSimulated?: boolean;
  error?: string;
}

/**
 * Submits an admission inquiry.
 * This triggers both database/local storage AND dispatches an email notification
 * to the school's official email ID (lotusglobalschool@gmail.com).
 */
export async function submitInquiry(params: SubmitInquiryParams): Promise<SubmitInquiryResult> {
  try {
    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || "Submission failed");
    }

    return {
      success: true,
      message: data.message || "Inquiry submitted successfully",
      inquiry: data.inquiry,
      emailSent: data.emailSent,
      emailSimulated: data.emailSimulated,
    };
  } catch (err: any) {
    console.error("[Inquiry Service] Error submitting inquiry:", err);
    return {
      success: false,
      error: err?.message || "Could not connect to inquiry service. Please try again or reach out on WhatsApp.",
    };
  }
}

/**
 * Fetches all inquiries for the Admin Dashboard
 */
export async function fetchInquiries(): Promise<InquiryItem[]> {
  try {
    const res = await fetch("/api/inquiries");
    if (!res.ok) throw new Error("Failed to fetch inquiries");
    const data = await res.json();
    return data.inquiries || [];
  } catch (err) {
    console.error("[Inquiry Service] Error fetching inquiries:", err);
    return [];
  }
}

/**
 * Updates an inquiry's status (NEW, CONTACTED, FOLLOW_UP, RESOLVED)
 */
export async function updateInquiryStatus(id: string, status: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return res.ok;
  } catch (err) {
    console.error("[Inquiry Service] Error updating status:", err);
    return false;
  }
}

/**
 * Deletes an inquiry
 */
export async function deleteInquiry(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (err) {
    console.error("[Inquiry Service] Error deleting inquiry:", err);
    return false;
  }
}
