"use client";

import { useState } from "react";

const c = {
  teal: "#0ABAB5",
  navy: "#0F172A",
  text: "#1E293B",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  border: "#E2E8F0",
  rose: "#F43F5E",
  success: "#10B981",
};

// Public application form on the /tutors page. Captures the
// must-haves (name, email, phone, subjects, year levels, experience),
// posts to /api/tutor-application which forwards to the recruiting
// inbox via Resend. On success we replace the form with a green-tick
// acknowledgement promising a call within a business day.
export default function TutorApplicationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subjects, setSubjects] = useState("");
  const [yearLevels, setYearLevels] = useState("");
  const [experience, setExperience] = useState("");
  // Honeypot (audit H2): hidden from humans; bots fill it and get silently dropped.
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Please add your name.");
    if (!email.trim()) return setError("Please add your email.");
    if (!phone.trim())
      return setError("Please add a phone number so we can call you back.");
    if (!subjects.trim()) return setError("Tell us which subjects you tutor.");
    if (!yearLevels.trim())
      return setError("Let us know which year levels you can tutor.");
    if (!experience.trim())
      return setError("A few sentences on your tutoring background helps us match you well.");

    setPending(true);
    try {
      const res = await fetch("/api/tutor-application", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          subjects: subjects.trim(),
          year_levels: yearLevels.trim(),
          experience: experience.trim(),
          company_website: companyWebsite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not send application.");
      setDone(true);
    } catch (err) {
      setError(err.message || "Could not send application.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div
        style={{
          background: c.white,
          borderRadius: 20,
          padding: "40px 32px",
          border: `1px solid ${c.border}`,
          textAlign: "center",
          boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#ECFDF5",
            color: c.success,
            fontSize: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 26,
            color: c.navy,
            lineHeight: 1.2,
            margin: "0 0 12px",
          }}
        >
          Application received
        </h3>
        <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.7, margin: "0 0 6px" }}>
          Thanks {name.split(" ")[0]}! Someone from our team will be in touch
          within 1 business day for a quick chat.
        </p>
        <p style={{ fontSize: 13, color: c.textMuted, margin: 0 }}>
          Want to fast-track? Call us on <a href="tel:0426787978" style={{ color: c.teal, fontWeight: 600 }}>0426 787 978</a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        background: c.white,
        borderRadius: 20,
        padding: "32px 28px",
        border: `1px solid ${c.border}`,
        boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      {/* Honeypot — hidden from real users; only bots fill it (audit H2). */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        value={companyWebsite}
        onChange={(e) => setCompanyWebsite(e.target.value)}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <p
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: c.teal,
          textTransform: "uppercase",
          letterSpacing: 2,
          margin: 0,
        }}
      >
        Apply as a tutor
      </p>
      <h3
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 28,
          color: c.navy,
          lineHeight: 1.2,
          margin: "8px 0 8px",
        }}
      >
        Tell us about yourself
      </h3>
      <p style={{ fontSize: 15, color: c.textLight, lineHeight: 1.65, margin: "0 0 24px" }}>
        Drop your details below. Someone from our team will reach out within
        a business day for a chat about your subjects, rates, and
        availability.
      </p>

      <div style={{ display: "grid", gap: 14 }}>
        <Two>
          <Field label="Your name">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={pending} style={inputStyle} />
          </Field>
          <Field label="Phone">
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={pending} placeholder="04XX XXX XXX" style={inputStyle} />
          </Field>
        </Two>
        <Field label="Email">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={pending} style={inputStyle} />
        </Field>
        <Two>
          <Field label="Subjects you tutor">
            <input type="text" value={subjects} onChange={(e) => setSubjects(e.target.value)} disabled={pending} placeholder="e.g. VCE Methods, Year 9 English" style={inputStyle} />
          </Field>
          <Field label="Year levels">
            <input type="text" value={yearLevels} onChange={(e) => setYearLevels(e.target.value)} disabled={pending} placeholder="e.g. Year 7-12" style={inputStyle} />
          </Field>
        </Two>
        <Field label="Your tutoring background">
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            disabled={pending}
            placeholder="ATAR, qualifications, years tutoring, anything you'd like us to know."
            rows={5}
            style={{ ...inputStyle, resize: "vertical", minHeight: 110, padding: "10px 14px", lineHeight: 1.5 }}
          />
        </Field>
      </div>

      {error && (
        <p
          style={{
            color: c.rose,
            fontSize: 13,
            margin: "14px 0 0",
            background: "#FFF1F2",
            padding: "8px 10px",
            borderRadius: 8,
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        style={{
          width: "100%",
          marginTop: 18,
          padding: "14px 24px",
          borderRadius: 10,
          background: c.navy,
          color: c.white,
          fontSize: 15,
          fontWeight: 700,
          border: "none",
          cursor: pending ? "wait" : "pointer",
          opacity: pending ? 0.7 : 1,
        }}
      >
        {pending ? "Sending…" : "Submit application"}
      </button>
      <p style={{ fontSize: 12, color: c.textMuted, textAlign: "center", margin: "10px 0 0" }}>
        Or call us directly on <a href="tel:0426787978" style={{ color: c.teal, fontWeight: 600, textDecoration: "none" }}>0426 787 978</a>.
      </p>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 600, color: c.text }}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Two({ children }) {
  return (
    <div className="tutor-app-two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  height: 42,
  padding: "0 14px",
  borderRadius: 10,
  border: `1px solid ${c.border}`,
  background: c.white,
  fontSize: 14,
  color: c.text,
  outline: "none",
  fontFamily: "inherit",
};
