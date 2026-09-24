import nodemailer from "nodemailer";
import { ENV } from "../config/env";

export interface InquiryEmailData {
  parentName: string;
  studentName?: string;
  gradeSeeking: string;
  phone: string;
  email?: string;
  notes?: string;
  source?: string;
  inquiryId?: string;
  createdAt?: Date;
}

/**
 * Creates and returns the nodemailer transporter if configured
 */
function getTransporter() {
  if (!ENV.SMTP_USER || !ENV.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,
    secure: ENV.SMTP_SECURE,
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASS,
    },
  });
}

/**
 * Builds an elegant, responsive HTML email for Lotus Global School staff
 */
function buildInquiryHtml(data: InquiryEmailData): string {
  const formattedDate = (data.createdAt || new Date()).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const cleanPhone = data.phone.replace(/[^0-9+]/g, "");
  const waPhone = cleanPhone.startsWith("+") ? cleanPhone.replace("+", "") : `91${cleanPhone.replace(/^0+/, "")}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Admissions Inquiry - Lotus Global School</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F1F5F9; margin: 0; padding: 24px; color: #1E293B; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); border: 1px solid #E2E8F0; }
    .header { background-color: #2F5187; padding: 28px 24px; text-align: center; border-bottom: 4px solid #E87737; }
    .header h1 { color: #ffffff; margin: 0 0 6px 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
    .header p { color: #E87737; margin: 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .badge-bar { background-color: #FFF7ED; padding: 10px 24px; border-bottom: 1px solid #FED7AA; display: flex; justify-content: space-between; font-size: 12px; color: #C2410C; font-weight: 600; }
    .content { padding: 24px; }
    .inquiry-card { background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 18px; margin-bottom: 20px; }
    .field-row { margin-bottom: 12px; display: flex; flex-wrap: wrap; }
    .field-label { width: 140px; font-weight: 600; color: #64748B; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
    .field-val { flex: 1; font-weight: 600; color: #0F172A; font-size: 14px; }
    .notes-box { background: #ffffff; border: 1px solid #CBD5E1; border-left: 4px solid #2F5187; padding: 12px 16px; border-radius: 4px; font-size: 14px; line-height: 1.5; color: #334155; margin-top: 6px; font-style: italic; }
    .action-buttons { margin: 24px 0 16px 0; text-align: center; }
    .btn { display: inline-block; padding: 10px 18px; margin: 4px 6px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 13px; }
    .btn-call { background-color: #2F5187; color: #ffffff !important; }
    .btn-wa { background-color: #15803D; color: #ffffff !important; }
    .btn-mail { background-color: #E87737; color: #ffffff !important; }
    .footer { background-color: #F8FAFC; padding: 18px 24px; border-top: 1px solid #E2E8F0; text-align: center; font-size: 11px; color: #64748B; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p>Official Admissions Portal</p>
      <h1>Lotus Global School, Vatar, Vapi</h1>
    </div>

    <div class="badge-bar">
      <span>🔔 NEW ADMISSION INQUIRY</span>
      <span>${formattedDate}</span>
    </div>

    <div class="content">
      <p style="margin-top: 0; font-size: 14px; color: #475569;">
        A new student admission inquiry has been submitted through the school website. Details are provided below:
      </p>

      <div class="inquiry-card">
        <div class="field-row">
          <div class="field-label">Parent / Guardian:</div>
          <div class="field-val"><strong>${escapeHtml(data.parentName)}</strong></div>
        </div>
        
        <div class="field-row">
          <div class="field-label">Student Name:</div>
          <div class="field-val">${data.studentName ? escapeHtml(data.studentName) : '<em style="color:#94a3b8">Not specified</em>'}</div>
        </div>

        <div class="field-row">
          <div class="field-label">Grade Seeking:</div>
          <div class="field-val"><span style="display:inline-block; background-color:#EFF6FF; color:#1D4ED8; padding:3px 10px; border-radius:4px; font-weight:700;">${escapeHtml(data.gradeSeeking)}</span></div>
        </div>

        <div class="field-row">
          <div class="field-label">Phone Contact:</div>
          <div class="field-val"><a href="tel:${cleanPhone}" style="color:#2F5187; text-decoration:none; font-weight:700;">${escapeHtml(data.phone)}</a></div>
        </div>

        <div class="field-row">
          <div class="field-label">Email Address:</div>
          <div class="field-val">${data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color:#2F5187; text-decoration:none;">${escapeHtml(data.email)}</a>` : '<em style="color:#94a3b8">Not provided</em>'}</div>
        </div>

        <div class="field-row">
          <div class="field-label">Inquiry Channel:</div>
          <div class="field-val" style="color:#64748B;">${escapeHtml(data.source || 'Website Form')}</div>
        </div>

        ${data.notes ? `
        <div style="margin-top: 14px;">
          <div class="field-label" style="width:100%; margin-bottom:4px;">Parent Queries / Notes:</div>
          <div class="notes-box">"${escapeHtml(data.notes)}"</div>
        </div>
        ` : ''}
      </div>

      <div class="action-buttons">
        <a href="tel:${cleanPhone}" class="btn btn-call">📞 Call Parent</a>
        <a href="https://wa.me/${waPhone}" class="btn btn-wa" target="_blank">💬 WhatsApp Chat</a>
        ${data.email ? `<a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Lotus Global School Admission Inquiry - ${data.studentName || data.parentName}`)}" class="btn btn-mail">✉️ Reply Email</a>` : ''}
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 4px 0;">This email was automatically generated by the Lotus Global School Online Admissions Desk.</p>
      <p style="margin: 0;">School Campus: Near Hanuman Temple, Vatar, Post - Morai, Via - Vapi, Dist. Valsad - 396191 (Gujarat)</p>
      <p style="margin: 4px 0 0 0;">Official Desk: ${ENV.SCHOOL_OFFICIAL_EMAIL} | +91 9054592424 / 9054592425</p>
    </div>
  </div>
</body>
</html>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sends an email notification to the school's official email address
 */
export async function sendInquiryEmail(data: InquiryEmailData): Promise<{
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
}> {
  const transporter = getTransporter();

  // If SMTP is not yet configured, log cleanly and return simulated success
  if (!transporter) {
    console.warn(
      `[Lotus Email Service] Note: SMTP_USER/SMTP_PASS not fully configured in .env. ` +
      `Inquiry from "${data.parentName}" (Phone: ${data.phone}, Grade: ${data.gradeSeeking}) ` +
      `saved to database. To send actual emails to ${ENV.SCHOOL_OFFICIAL_EMAIL}, set SMTP_USER and SMTP_PASS in .env.`
    );
    return {
      success: true,
      simulated: true,
    };
  }

  try {
    const studentTitle = data.studentName ? `${data.studentName} (${data.gradeSeeking})` : `${data.gradeSeeking}`;
    const subject = `New Admission Inquiry: ${studentTitle} - ${data.parentName}`;

    const textContent = `
Lotus Global School - New Admission Inquiry
===========================================
Date: ${(data.createdAt || new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
Parent / Guardian: ${data.parentName}
Student Name: ${data.studentName || "Not specified"}
Grade Seeking: ${data.gradeSeeking}
Phone: ${data.phone}
Email: ${data.email || "Not provided"}
Channel: ${data.source || "Website Form"}

Specific Queries / Notes:
${data.notes || "None provided"}

-------------------------------------------
Lotus Global School Admissions Desk
Vatar, Vapi, Gujarat - 396191
    `.trim();

    const info = await transporter.sendMail({
      from: `"Lotus Global School Portal" <${ENV.SMTP_USER}>`,
      to: ENV.SCHOOL_OFFICIAL_EMAIL,
      replyTo: data.email || undefined,
      subject,
      text: textContent,
      html: buildInquiryHtml(data),
    });

    console.log(`[Lotus Email Service] Inquiry email successfully dispatched to ${ENV.SCHOOL_OFFICIAL_EMAIL}. Message ID: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      simulated: false,
    };
  } catch (error: any) {
    console.error("[Lotus Email Service Error]: Failed to send inquiry email:", error);
    return {
      success: false,
      error: error?.message || "Failed to send email via SMTP",
    };
  }
}
