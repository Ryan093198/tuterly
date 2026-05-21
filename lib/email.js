import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM_EMAIL || "Tuterly <noreply@tuterly.com.au>";

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

async function send({ to, subject, html, attachments }) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set - would have sent:", { to, subject });
    return { id: null, skipped: true };
  }
  const payload = { from: FROM, to, subject, html };
  if (attachments?.length) payload.attachments = attachments;
  const { data, error } = await resend.emails.send(payload);
  if (error) throw error;
  return data;
}

function shellHtml({ title, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#18181b;">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;">
  <div style="font-size:20px;font-weight:600;letter-spacing:-0.01em;margin-bottom:24px;">Tuterly</div>
  ${body}
  <div style="margin-top:48px;font-size:12px;color:#a1a1aa;">
    Sent by Tuterly · <a href="${appUrl()}" style="color:#a1a1aa;">tuterly.com.au</a>
  </div>
</div>
</body>
</html>`;
}

function button(href, label) {
  return `<a href="${href}" style="display:inline-block;background:#18181b;color:#fafaf9;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:500;font-size:14px;">${label}</a>`;
}

export async function sendTutorApplicationEmail({
  to,
  replyTo,
  applicantName,
  applicantEmail,
  applicantPhone,
  subjects,
  yearLevels,
  experience,
}) {
  const escape = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const subject = `New tutor application - ${applicantName}`;
  const body = `
  <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:24px;line-height:1.25;margin:0 0 16px;">New tutor application</h1>
  <p style="font-size:14px;color:#71717a;margin:0 0 16px;">Submitted via the Apply as a Tutor page.</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;color:#3f3f46;margin:0 0 18px;">
    <tr><td style="padding:6px 0;color:#71717a;width:140px;">Name</td><td style="padding:6px 0;font-weight:600;">${escape(applicantName)}</td></tr>
    <tr><td style="padding:6px 0;color:#71717a;">Email</td><td style="padding:6px 0;"><a href="mailto:${escape(applicantEmail)}" style="color:#0d9488;">${escape(applicantEmail)}</a></td></tr>
    ${applicantPhone ? `<tr><td style="padding:6px 0;color:#71717a;">Phone</td><td style="padding:6px 0;"><a href="tel:${escape(applicantPhone)}" style="color:#0d9488;">${escape(applicantPhone)}</a></td></tr>` : ""}
    <tr><td style="padding:6px 0;color:#71717a;">Subjects</td><td style="padding:6px 0;">${escape(subjects)}</td></tr>
    <tr><td style="padding:6px 0;color:#71717a;">Year levels</td><td style="padding:6px 0;">${escape(yearLevels)}</td></tr>
  </table>
  <p style="font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 6px;">Experience &amp; background</p>
  <div style="font-size:14px;line-height:1.65;color:#18181b;background:#fafaf9;border:1px solid #e4e4e7;border-radius:8px;padding:14px 16px;margin:0 0 8px;white-space:pre-wrap;">${escape(experience)}</div>`;
  const html = shellHtml({ title: subject, body });
  const payload = { from: FROM, to, subject, html };
  if (replyTo) payload.reply_to = replyTo;
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set - would have sent tutor application:", { to, subject });
    return { id: null, skipped: true };
  }
  const { data, error } = await resend.emails.send(payload);
  if (error) throw error;
  return data;
}

export async function sendEnquiryEmail({
  to,
  replyTo,
  tutorName,
  parentName,
  parentEmail,
  childName,
  childYearLevel,
  message,
  submittedByUserId,
}) {
  const escape = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const subject = `Enquiry about ${tutorName} from ${parentName}`;
  const body = `
  <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:24px;line-height:1.25;margin:0 0 16px;">New tutor enquiry</h1>
  <p style="font-size:14px;color:#71717a;margin:0 0 16px;">Submitted via the Tuterly directory.</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;color:#3f3f46;margin:0 0 18px;">
    <tr><td style="padding:6px 0;color:#71717a;width:140px;">Tutor</td><td style="padding:6px 0;font-weight:600;">${escape(tutorName)}</td></tr>
    <tr><td style="padding:6px 0;color:#71717a;">Parent</td><td style="padding:6px 0;font-weight:600;">${escape(parentName)}</td></tr>
    <tr><td style="padding:6px 0;color:#71717a;">Email</td><td style="padding:6px 0;"><a href="mailto:${escape(parentEmail)}" style="color:#0d9488;">${escape(parentEmail)}</a></td></tr>
    <tr><td style="padding:6px 0;color:#71717a;">Child</td><td style="padding:6px 0;">${escape(childName)} ${childYearLevel ? `<span style="color:#71717a;">(${escape(childYearLevel)})</span>` : ""}</td></tr>
  </table>
  <p style="font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 6px;">What they're looking for</p>
  <div style="font-size:14px;line-height:1.65;color:#18181b;background:#fafaf9;border:1px solid #e4e4e7;border-radius:8px;padding:14px 16px;margin:0 0 18px;white-space:pre-wrap;">${escape(message)}</div>
  ${submittedByUserId ? `<p style="font-size:11px;color:#a1a1aa;margin:0;">Submitter user id: ${escape(submittedByUserId)}</p>` : `<p style="font-size:11px;color:#a1a1aa;margin:0;">Anonymous submission</p>`}`;
  const html = shellHtml({ title: subject, body });
  const payload = { from: FROM, to, subject, html };
  if (replyTo) payload.reply_to = replyTo;
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set - would have sent enquiry:", { to, subject });
    return { id: null, skipped: true };
  }
  const { data, error } = await resend.emails.send(payload);
  if (error) throw error;
  return data;
}

export async function sendContactEnquiryEmail({
  to,
  replyTo,
  name,
  email,
  phone,
  yearLevel,
  message,
  pageContext,
}) {
  const escape = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const subject = `Contact form: ${name}${
    pageContext ? " (" + pageContext + ")" : ""
  }`;
  const body = `
  <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:24px;line-height:1.25;margin:0 0 16px;">New contact enquiry</h1>
  <p style="font-size:14px;color:#71717a;margin:0 0 16px;">Submitted via the Tuterly marketing site${
    pageContext ? " on " + escape(pageContext) : ""
  }.</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;color:#3f3f46;margin:0 0 18px;">
    <tr><td style="padding:6px 0;color:#71717a;width:140px;">Name</td><td style="padding:6px 0;font-weight:600;">${escape(name)}</td></tr>
    <tr><td style="padding:6px 0;color:#71717a;">Email</td><td style="padding:6px 0;"><a href="mailto:${escape(email)}" style="color:#0d9488;">${escape(email)}</a></td></tr>
    ${phone ? `<tr><td style="padding:6px 0;color:#71717a;">Phone</td><td style="padding:6px 0;"><a href="tel:${escape(phone)}" style="color:#0d9488;">${escape(phone)}</a></td></tr>` : ""}
    ${yearLevel ? `<tr><td style="padding:6px 0;color:#71717a;">Year level</td><td style="padding:6px 0;">${escape(yearLevel)}</td></tr>` : ""}
  </table>
  ${message ? `<p style="font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 6px;">Message</p>
  <div style="font-size:14px;line-height:1.65;color:#18181b;background:#fafaf9;border:1px solid #e4e4e7;border-radius:8px;padding:14px 16px;margin:0 0 8px;white-space:pre-wrap;">${escape(message)}</div>` : ""}`;
  const html = shellHtml({ title: subject, body });
  const payload = { from: FROM, to, subject, html };
  if (replyTo) payload.reply_to = replyTo;
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set - would have sent contact enquiry:", { to, subject });
    return { id: null, skipped: true };
  }
  const { data, error } = await resend.emails.send(payload);
  if (error) throw error;
  return data;
}

export async function sendTrialWelcomeEmail({ to, magicLink }) {
  const body = `
  <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:26px;line-height:1.25;margin:0 0 16px;">Welcome to Tuterly</h1>
  <p style="font-size:15px;line-height:1.65;color:#3f3f46;margin:0 0 16px;">
    Your 7-day free trial is active. Click below to sign in and start
    generating unlimited worksheets, lesson plans, and progress reports
    for your child.
  </p>
  <p style="margin:24px 0;">${button(magicLink, "Sign in to Tuterly")}</p>
  <p style="font-size:13px;color:#71717a;line-height:1.6;margin:0;">
    This link will sign you in automatically. Your card won't be charged
    until your 7-day trial ends; cancel any time from the Settings tab.
  </p>`;
  return send({ to, subject: "Welcome to your Tuterly trial", html: shellHtml({ title: "Welcome to Tuterly", body }) });
}

export async function sendInviteEmail({ to, inviterName, studentName, role, token }) {
  const url = `${appUrl()}/invite/${token}`;
  const isParent = role === "parent";

  const subject = isParent
    ? `${inviterName} invited you to view ${studentName}'s tutoring reports`
    : `${inviterName} invited you to tutor ${studentName} on Tuterly`;

  const intro = isParent
    ? `<strong>${inviterName}</strong> has invited you to view tutoring session reports for <strong>${studentName}</strong> on Tuterly.`
    : `<strong>${inviterName}</strong> has invited you to tutor <strong>${studentName}</strong> on Tuterly.`;

  const html = shellHtml({
    title: subject,
    body: `
      <h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">You've been invited to Tuterly</h1>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 24px;">${intro}</p>
      <p style="margin:0 0 32px;">${button(url, "Accept invite")}</p>
      <p style="font-size:13px;color:#71717a;margin:0;">This invite expires in 7 days. If the button doesn't work, copy and paste this link: ${url}</p>
    `,
  });

  return send({ to, subject, html });
}

export async function sendReportEmail({
  to,
  recipientName,
  recipientRole = "parent",
  studentName,
  reportUrl,
  attachments,
}) {
  const isStudent = recipientRole === "student";
  const subject = isStudent
    ? `Your session report is ready`
    : `${studentName}'s session report is ready`;

  const heading = isStudent
    ? `Your session report is ready`
    : `A session report is ready for ${studentName}`;

  const html = shellHtml({
    title: subject,
    body: `
      <h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">${heading}</h1>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 24px;">${
        recipientName ? `Hi ${recipientName.split(" ")[0]},` : "Hi,"
      } the latest tutoring session report is available in your Tuterly dashboard, with a PDF copy attached.</p>
      <p style="margin:0 0 32px;">${button(reportUrl, "View report")}</p>
      <p style="font-size:13px;color:#71717a;margin:0;">If the button doesn't work, copy and paste: ${reportUrl}</p>
    `,
  });

  return send({ to, subject, html, attachments });
}

export async function sendLessonPlanEmail({
  to,
  parentName,
  studentName,
  tutorName,
  weeks,
  planUrl,
  attachments,
}) {
  const subject = `Lesson plan for ${studentName} - next ${weeks} ${
    weeks === 1 ? "week" : "weeks"
  }`;
  const greeting = parentName ? `Hi ${parentName.split(" ")[0]},` : "Hi,";
  const tutorLine = tutorName
    ? `<strong>${tutorName}</strong> has prepared`
    : "Your tutor has prepared";

  const html = shellHtml({
    title: subject,
    body: `
      <h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">A new lesson plan for ${studentName}</h1>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 16px;">${greeting}</p>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 24px;">${tutorLine} a ${weeks}-week tutoring plan for ${studentName}. A PDF copy is attached, and you can also view it any time in your Tuterly dashboard.</p>
      <p style="margin:0 0 32px;">${button(planUrl, "View in Tuterly")}</p>
      <p style="font-size:13px;color:#71717a;margin:0;">If the button doesn't work, copy and paste: ${planUrl}</p>
    `,
  });

  return send({ to, subject, html, attachments });
}

// Sent to the NEW address when a tutor initiates a parent email change.
// The link confirms the address belongs to them and swaps the auth email.
export async function sendEmailChangeConfirmation({
  to,
  parentName,
  initiatorName,
  studentName,
  token,
}) {
  const url = `${appUrl()}/auth/confirm-email-change?token=${encodeURIComponent(
    token
  )}`;
  const subject = "Confirm your new Tuterly email address";
  const greeting = parentName
    ? `Hi ${parentName.split(" ")[0]},`
    : "Hi,";
  const html = shellHtml({
    title: subject,
    body: `
      <h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">Confirm your new email</h1>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 16px;">${greeting}</p>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 24px;">${
        initiatorName ? `<strong>${initiatorName}</strong>` : "Your tutor"
      } updated the email on file for ${
        studentName ? `<strong>${studentName}</strong>'s` : "your"
      } Tuterly account to this address. Click below to confirm and you'll be able to sign in with this email from now on.</p>
      <p style="margin:0 0 32px;">${button(url, "Confirm new email")}</p>
      <p style="font-size:13px;color:#71717a;margin:0 0 8px;">This confirmation link expires in 24 hours.</p>
      <p style="font-size:13px;color:#71717a;margin:0;">If you didn't expect this, ignore this email - your sign-in won't change until you click the link. The full link: ${url}</p>
    `,
  });
  return send({ to, subject, html });
}

// Sent to the OLD address as a heads-up so the parent can flag any change
// they didn't authorise. Best-effort - failure here doesn't abort the change.
export async function sendEmailChangeNotice({
  to,
  parentName,
  newEmail,
  initiatorName,
}) {
  const subject = "Your Tuterly email is being changed";
  const greeting = parentName
    ? `Hi ${parentName.split(" ")[0]},`
    : "Hi,";
  const html = shellHtml({
    title: subject,
    body: `
      <h1 style="font-size:22px;font-weight:600;margin:0 0 16px;">Email change requested</h1>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 16px;">${greeting}</p>
      <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0 0 24px;">${
        initiatorName ? `<strong>${initiatorName}</strong>` : "Your tutor"
      } has requested that your Tuterly email be changed to <strong>${newEmail}</strong>. We've sent a confirmation link to that address; the change won't take effect until they click it.</p>
      <p style="font-size:13px;color:#71717a;margin:0;">If you didn't expect this, please reply to this email or contact your tutor - no action is needed unless you want to keep your current address.</p>
    `,
  });
  return send({ to, subject, html });
}
