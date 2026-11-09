import { Resend } from "resend";
import { SITE_URL } from "@/lib/site";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = process.env.RESEND_FROM_EMAIL || "Tuterly <noreply@tuterly.com.au>";

function appUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

// Strip CR/LF and other control chars from anything that lands in a mail
// header (audit L1: subjects interpolate user-supplied name/tutorName/etc.).
// Resend's JSON API isn't classic SMTP, but this is cheap defence-in-depth.
function headerSafe(value) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, 200)
    : value;
}

async function send({ to, subject, html, attachments }) {
  subject = headerSafe(subject);
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

// In-app "get matched with a tutor" request, sent from the parent dashboard
// onboarding. Emails the team inbox so a human can match the family. Mirrors
// the enquiry pattern (email is the system of record — no DB table). replyTo is
// the parent's email so the team can respond directly.
export async function sendMatchRequestEmail({
  to,
  replyTo,
  parentName,
  parentEmail,
  childName,
  childYearLevel,
  subject: childSubject,
  availability,
  notes,
  submittedByUserId,
}) {
  const escape = (s) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const subject = `Tutor match request from ${parentName || parentEmail || "a parent"}`;
  const body = `
  <h1 style="font-size:24px;line-height:1.25;margin:0 0 16px;">New tutor match request</h1>
  <p style="font-size:14px;color:#71717a;margin:0 0 16px;">A parent asked to be matched with a tutor from their dashboard.</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;color:#3f3f46;margin:0 0 18px;">
    <tr><td style="padding:6px 0;color:#71717a;width:140px;">Parent</td><td style="padding:6px 0;font-weight:600;">${escape(parentName) || "&mdash;"}</td></tr>
    <tr><td style="padding:6px 0;color:#71717a;">Email</td><td style="padding:6px 0;"><a href="mailto:${escape(parentEmail)}" style="color:#0d9488;">${escape(parentEmail)}</a></td></tr>
    <tr><td style="padding:6px 0;color:#71717a;">Child</td><td style="padding:6px 0;">${escape(childName) || "&mdash;"} ${childYearLevel ? `<span style="color:#71717a;">(${escape(childYearLevel)})</span>` : ""}</td></tr>
    ${childSubject ? `<tr><td style="padding:6px 0;color:#71717a;">Subject</td><td style="padding:6px 0;">${escape(childSubject)}</td></tr>` : ""}
    ${availability ? `<tr><td style="padding:6px 0;color:#71717a;">Availability</td><td style="padding:6px 0;">${escape(availability)}</td></tr>` : ""}
  </table>
  ${notes ? `<p style="font-size:13px;color:#71717a;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 6px;">Notes</p>
  <div style="font-size:14px;line-height:1.65;color:#18181b;background:#fafaf9;border:1px solid #e4e4e7;border-radius:8px;padding:14px 16px;margin:0 0 18px;white-space:pre-wrap;">${escape(notes)}</div>` : ""}
  ${submittedByUserId ? `<p style="font-size:11px;color:#a1a1aa;margin:0;">Submitter user id: ${escape(submittedByUserId)}</p>` : ""}`;
  const html = shellHtml({ title: subject, body });
  const payload = { from: FROM, to, subject, html };
  if (replyTo) payload.reply_to = replyTo;
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set - would have sent match request:", { to, subject });
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

// Welcome email for a direct credit-pack purchase made without an existing
// account (the /get-started direct-buy flow). The webhook creates the account
// from the Stripe email, then sends this magic-link so they can sign in, add
// their child, and get matched with a tutor.
export async function sendPackWelcomeEmail({ to, magicLink }) {
  const body = `
  <h1 style="font-size:26px;line-height:1.25;margin:0 0 16px;">Welcome to Tuterly</h1>
  <p style="font-size:15px;line-height:1.65;color:#3f3f46;margin:0 0 16px;">
    Thanks for your purchase, your session credits are ready to go. Click
    below to sign in, add your child, and we'll match them with a tutor.
  </p>
  <p style="margin:24px 0;">${button(magicLink, "Sign in &amp; get started")}</p>
  <p style="font-size:13px;color:#71717a;line-height:1.6;margin:0;">
    This link signs you in automatically. Your credits, receipt, and full
    Tuterly software access are all waiting in your dashboard.
  </p>`;
  return send({ to, subject: "Welcome to Tuterly, your credits are ready", html: shellHtml({ title: "Welcome to Tuterly", body }) });
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

// Tuterly waitlist confirmation. Sent once per address (the route
// checks study_waitlist.confirmation_sent_at). Nothing else goes to this
// list without Ryan's OK.
export async function sendStudyWaitlistEmail({ to, appName, interest }) {
  const name = escapeHtmlLite(appName || "Tuterly");
  const next =
    interest === "pilot"
      ? `We're running a small pilot with a limited number of students. If a spot opens up we'll email you an invite, and we'll also let you know when ${name} launches on the App Store.`
      : interest === "android"
        ? `${name} is on iPhone at launch, and Android is coming soon. We'll email you once, when ${name} is on Android.`
        : `We'll email you once, when ${name} is on the App Store.`;
  const body = `
  <h1 style="font-size:24px;line-height:1.3;margin:0 0 16px;">You're on the ${name} ${interest === "android" ? "Android " : ""}list</h1>
  <p style="font-size:15px;line-height:1.65;color:#3f3f46;margin:0 0 16px;">
    Thanks for signing up. ${next}
  </p>
  <p style="font-size:15px;line-height:1.65;color:#3f3f46;margin:0 0 16px;">
    ${name} is for Years 7 to 10 maths, on iPhone, with Android coming soon. Students snap a photo of a question they got wrong, see a full worked solution, then practise fresh versions of it until it's mastered.
  </p>
  <p style="font-size:15px;line-height:1.65;color:#3f3f46;margin:0 0 16px;">
    <strong>Launch price: 50% off until 31 March 2027.</strong> <s>$17.99</s> $8.99 a week or <s>$59.99</s> $29.99 a month, with a 7-day free trial on the monthly plan only. From 1 April 2027 it's $17.99 a week or $59.99 a month. You can cancel any time.
  </p>
  <p style="font-size:13px;color:#71717a;line-height:1.6;margin:24px 0 0;">
    You're getting this because this address was entered on tuterly.com.au. If that wasn't you, or you'd like to be removed, just reply to this email and we'll take you off the list.
  </p>`;
  return send({
    to,
    subject: `You're on the ${appName || "Tuterly"} list`,
    html: shellHtml({ title: `${name} waitlist`, body }),
  });
}

// Tuterly Scholarship waitlist confirmation (app/api/scholarship-waitlist).
export async function sendScholarshipWaitlistEmail({ to, provider }) {
  const names = { acer: "ACER", edutest: "Edutest", aas: "AAS" };
  const forTest = names[provider] ? ` for the ${names[provider]} test` : "";
  const body = `
  <h1 style="font-size:24px;line-height:1.3;margin:0 0 16px;">You're on the Tuterly Scholarship list</h1>
  <p style="font-size:15px;line-height:1.65;color:#3f3f46;margin:0 0 16px;">
    Thanks for signing up. We'll email you once, when Tuterly Scholarship is ready${forTest}.
  </p>
  <p style="font-size:15px;line-height:1.65;color:#3f3f46;margin:0 0 16px;">
    It starts with a 40-question numerical reasoning diagnostic. The first 10 questions are free, and a one-off Scholarship Pass for your child's entry level unlocks the rest. Every question your child gets wrong goes into their own practice bank with a worked solution, and they practise fresh versions of it until it's mastered. You can see their progress as they go.
  </p>
  <p style="font-size:15px;line-height:1.65;color:#3f3f46;margin:0 0 16px;">
    <strong>Because you're on the list, you'll get a launch discount</strong> when it opens.
  </p>
  <p style="font-size:13px;color:#71717a;line-height:1.6;margin:24px 0 0;">
    You're getting this because this address was entered on tuterly.com.au. If that wasn't you, or you'd like to be removed, just reply to this email and we'll take you off the list.
  </p>`;
  return send({
    to,
    subject: "You're on the Tuterly Scholarship list",
    html: shellHtml({ title: "Tuterly Scholarship waitlist", body }),
  });
}

function escapeHtmlLite(s) {
  return String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
}

// "Try it" result: the question, its worked solution and the fresh version
// (answer further down so they can have a go first). Sent to the address
// the visitor entered for that try. Nothing is stored. Maths is rewritten
// as readable text because email apps can't render LaTeX.
export async function buildTryResultEmail({ result, siteUrl }) {
  const { mdToEmailHtml } = await import("./try-email.js");
  const h2 = (t) => `<h2 style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#0e7490;margin:28px 0 10px;">${t}</h2>`;
  const box = (inner, border = "#e4e4e7") =>
    `<div style="border:2px solid ${border};border-radius:14px;padding:16px 18px;background:#ffffff;">${inner}</div>`;
  const tryUrl = `${siteUrl}/try`;
  const body = `
  <h1 style="font-size:22px;line-height:1.3;margin:0 0 8px;">Your question, and a fresh one to try</h1>
  <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:0;">
    Here's what you tried on Tuterly${result.topic ? ` (${escapeHtmlLite(result.topic)})` : ""}. Keep it for later, or pass it on to your child.
  </p>
  ${h2("Your question")}
  ${box(mdToEmailHtml(result.question))}
  ${h2("Worked solution")}
  ${box(mdToEmailHtml(result.solution))}
  ${h2("Now try this one")}
  ${box(mdToEmailHtml(result.new_question), "#0ea5c4")}
  <p style="font-size:14px;color:#71717a;margin:14px 0 0;">Have a go first. The answer is further down.</p>
  <div style="height:220px;"></div>
  ${h2("Answer")}
  ${box(mdToEmailHtml(result.new_answer) + mdToEmailHtml(result.new_solution))}
  <p style="font-size:15px;line-height:1.6;color:#3f3f46;margin:28px 0 16px;">
    In the Tuterly app, every question your child gets wrong works like this, with fresh versions until it's mastered.
  </p>
  <p style="margin:0 0 8px;">${button(tryUrl, "Try another question")}</p>
  <p style="font-size:13px;color:#71717a;line-height:1.6;margin:24px 0 0;">
    You're getting this because this address was entered to try Tuterly on tuterly.com.au. We don't keep a copy of your question.
    To stop all emails from us, reply to this email and we'll take you off the list.
  </p>`;
  return {
    subject: `Your Tuterly question${result.topic ? `: ${result.topic}` : ""}`,
    html: shellHtml({ title: "Your Tuterly question", body }),
  };
}

export async function sendTryResultEmail({ to, result, siteUrl }) {
  const { subject, html } = await buildTryResultEmail({ result, siteUrl });
  return send({ to, subject, html });
}

// Tuterly Study Plus bought on the website: a link to Stripe's customer
// portal to change plan or card, or cancel. The portal link is short-lived,
// so the email says to use it soon.
export async function sendStudyManageEmail({ to, url }) {
  const body = `
    <p style="font-size:16px;line-height:1.5;">Here's the link to manage your Tuterly Study Plus subscription. You can change your plan or card, see invoices, or cancel.</p>
    <p style="margin:24px 0;">${button(url, "Manage my subscription")}</p>
    <p style="font-size:14px;color:#71717a;line-height:1.5;">The link works for a little while. If it's expired, ask for a new one at tuterly.com.au/study/manage. Didn't ask for this? You can ignore it.</p>`;
  return send({ to, subject: "Manage your Tuterly Study Plus", html: shellHtml({ title: "Manage your subscription", body }) });
}

// Weekly organic search report (app/api/cron/search-console). Goes to Ryan,
// not to customers. SEARCH_REPORT_TO overrides the recipient.
export async function sendSearchReportEmail(r) {
  const to = process.env.SEARCH_REPORT_TO || "learning@baysideacademics.com.au";
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const n = (v) => Math.round(v || 0).toLocaleString("en-AU");
  const pos = (v) => (v == null ? "–" : v.toFixed(1));
  const delta = (v) => (v > 0 ? `<span style="color:#15803d;">+${n(v)}</span>` : v < 0 ? `<span style="color:#b91c1c;">−${n(-v)}</span>` : "0");
  const pct = (a, b) => (b ? ` (${a >= b ? "+" : "−"}${Math.abs(Math.round(((a - b) / b) * 100))}%)` : "");
  const th = `style="text-align:left;font-size:12px;color:#71717a;font-weight:600;padding:6px 8px 6px 0;border-bottom:1px solid #e4e4e7;"`;
  const td = `style="font-size:13px;padding:6px 8px 6px 0;border-bottom:1px solid #f4f4f5;vertical-align:top;"`;
  const table = (head, rows) => rows.length
    ? `<table style="width:100%;border-collapse:collapse;margin:8px 0 24px;"><tr>${head.map((h) => `<th ${th}>${h}</th>`).join("")}</tr>${rows.map((cells) => `<tr>${cells.map((c) => `<td ${td}>${c}</td>`).join("")}</tr>`).join("")}</table>`
    : `<p style="font-size:13px;color:#71717a;margin:8px 0 24px;">Nothing this week.</p>`;
  const h = (t, sub) => `<h2 style="font-size:16px;margin:24px 0 2px;">${t}</h2>${sub ? `<p style="font-size:13px;color:#71717a;margin:0;">${sub}</p>` : ""}`;
  const { now, prev } = r.totals;

  const body = `
    <p style="font-size:14px;color:#71717a;margin:0 0 4px;">Google search, ${esc(r.week.start)} to ${esc(r.week.end)}</p>
    <p style="font-size:22px;font-weight:700;margin:0;">${n(now.clicks)} clicks${pct(now.clicks, prev.clicks)}</p>
    <p style="font-size:14px;margin:4px 0 0;">${n(now.impressions)} times shown${pct(now.impressions, prev.impressions)}. Last week: ${n(prev.clicks)} clicks, ${n(prev.impressions)} shown.</p>
    ${r.funnel?.rows ? `${h("Sign-ups this week", "Last 7 days, with the 7 days before. A step at 0 is worth checking.")}
    ${table(["Step", "This week", "Week before"], r.funnel.rows.map((x) => [esc(x.label), x.now == null ? "?" : `<strong>${n(x.now)}</strong>`, x.prev == null ? "?" : n(x.prev)]))}
    ${r.funnel.stuckTopicTests ? `<p style="font-size:13px;color:#b91c1c;margin:-12px 0 24px;">${n(r.funnel.stuckTopicTests)} topic test request(s) this week never sent. Worth a look.</p>` : ""}` : ""}
    ${h("Top pages", "By clicks, with the change on last week")}
    ${table(["Page", "Clicks", "Shown", "Position"], r.topPages.map((x) => [esc(x.page), `${n(x.clicks)} ${delta(x.clicksChange)}`, `${n(x.impressions)} ${delta(x.impressionsChange)}`, pos(x.position)]))}
    ${h("Close to page 1", "Searches where we sit at positions 8 to 20 (last 28 days). Improving or splitting these pages is the quickest win.")}
    ${table(["Search", "Shown", "Clicks", "Position"], r.nearPage1.map((x) => [esc(x.query), n(x.impressions), n(x.clicks), pos(x.position)]))}
    ${h("New searches this week", "Not seen in the 4 weeks before. Ideas for new pages.")}
    ${table(["Search", "Shown", "Position"], r.newSearches.map((x) => [esc(x.query), n(x.impressions), pos(x.position)]))}
    ${h("Rising pages", "Shown more often than last week")}
    ${table(["Page", "Shown", "Position"], r.risers.map((x) => [esc(x.page), `${n(x.impressions)} ${delta(x.impressionsChange)}`, pos(x.position)]))}
    ${h("Falling pages", "Shown less often than last week")}
    ${table(["Page", "Shown", "Position"], r.fallers.map((x) => [esc(x.page), `${n(x.impressions)} ${delta(x.impressionsChange)}`, pos(x.position)]))}
    <p style="font-size:12px;color:#a1a1aa;">Tutoring searches from the old marketplace are left out of the search lists. Google hides rare searches, so search totals are lower than page totals.</p>`;

  return send({
    to,
    subject: `Tuterly search: ${n(now.clicks)} clicks this week${pct(now.clicks, prev.clicks)}`,
    html: shellHtml({ title: "Weekly search report", body }),
  });
}

// Full topic test from the worksheet generator's free-limit box
// (app/api/topic-test/request). Links to /topic-test/[id] and its two PDFs.
// Doubles as the Tuterly waitlist confirmation when the address is new.
export async function sendTopicTestEmail({ to, test, newOnWaitlist }) {
  // Question count, as in lib/topic-test.js (counted here so every email
  // route doesn't pull in the test writer).
  const qn = (String(test.questions_md || "").match(/^\*\*Question \d+\*\*/gm) || []).length || 20;
  const year = escapeHtmlLite(test.year_level);
  const topic = escapeHtmlLite(test.topic_label);
  const page = `${SITE_URL}/topic-test/${test.id}`;
  const pdf = (part) => `${SITE_URL}/api/topic-test/${test.id}/pdf?part=${part}`;
  const p = 'style="font-size:15px;line-height:1.65;color:#3f3f46;margin:0 0 16px;"';
  const body = `
  <h1 style="font-size:24px;line-height:1.3;margin:0 0 16px;">Your ${year} ${topic} practice test</h1>
  <p ${p}>Here's the full test you asked for: ${qn} questions on ${topic}, starting with the basics and building up to harder questions, with an answer key to mark it.</p>
  <p style="margin:0 0 12px;">${button(page, "Open the test")}</p>
  <p ${p}>Or download it to print: <a href="${pdf("test")}" style="color:#18181b;">the test (PDF)</a> and <a href="${pdf("answers")}" style="color:#18181b;">the answer key (PDF)</a>.</p>
  <p ${p}><strong>How to use it:</strong> set aside about ${qn > 20 ? "45" : "30 to 35"} minutes, have your child do it without notes, then mark it together. The questions they get wrong are the ones worth practising before the real test.</p>
  <div style="background:#f4f4f5;border-radius:12px;padding:16px 18px;margin:24px 0 16px;">
    <p style="font-size:15px;line-height:1.65;color:#18181b;margin:0 0 8px;"><strong>${newOnWaitlist ? "You're also on the Tuterly early list" : "Tuterly is coming soon"}</strong></p>
    <p style="font-size:14px;line-height:1.6;color:#3f3f46;margin:0;">Tuterly is for Years 7 to 10 maths. Your child snaps a question they got wrong, sees a full worked solution, then practises fresh versions until it sticks. Built by experienced Australian educators, following the Australian Curriculum. ${newOnWaitlist ? "We'll email you when it's on the App Store, with 50% off at launch." : "Launch price is 50% off until 31 March 2027."}</p>
  </div>
  <p style="font-size:13px;color:#71717a;line-height:1.6;margin:24px 0 0;">
    You're getting this because this address asked for a practice test on tuterly.com.au${newOnWaitlist ? " and joined the Tuterly early list" : ""}. If that wasn't you, or you'd like to be removed, just reply to this email and we'll take you off.<br />Tuterly by Bayside Academics · 240 Bay Street, Brighton VIC 3186
  </p>`;
  return send({
    to,
    subject: `Your ${test.year_level} ${test.topic_label} practice test`,
    html: shellHtml({ title: `${year} ${topic} practice test`, body }),
  });
}

// The maths exam study planner (9 Nov 2026): the private link to the plan.
export async function sendStudyPlanEmail({ to, role, year, examDateLabel, nightsCount, url }) {
  const forParent = role === "parent";
  const body = `
  <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;">${forParent ? "Your child's" : "Your"} ${escapeHtmlLite(year)} maths exam plan is ready</h1>
  <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">
    ${nightsCount} study nights, ending the night before the exam on ${escapeHtmlLite(examDateLabel)}. Each night says exactly what to do, with free practice questions, worked solutions and a full practice exam.
  </p>
  <p style="margin:0 0 20px;">${button(url, "Open the plan")}</p>
  <p style="font-size:14px;line-height:1.6;color:#52525b;margin:0 0 8px;">
    ${forParent ? "Share this link with your child. You'll both see each night as it's ticked off, and there's a parent view with a quick check-in for each week." : "Tick off each night as you go. If a parent opens the same link, they'll see your progress too."}
  </p>
  <p style="font-size:13px;line-height:1.6;color:#a1a1aa;margin:16px 0 0;">Keep this email: the link is private to you and is how you get back to the plan.</p>`;
  return send({ to, subject: `${forParent ? "Your child's" : "Your"} ${year} maths exam plan`, html: shellHtml({ title: "Your maths exam plan", body }) });
}
