"use client";

import { useState } from "react";
import { readJsonOrFallback } from "@/lib/practice-client";

const YEAR_LEVELS = [
  "Year 3",
  "Year 4",
  "Year 5",
  "Year 6",
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11",
  "Year 12",
];

const c = {
  teal: "#0ABAB5",
  navy: "#0F172A",
  text: "#1E293B",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
  border: "#E2E8F0",
  rose: "#F43F5E",
  success: "#10B981",
};

// Enquire-about-tutor form. Opens from a tutor detail card on /directory
// once the parent has signed in. Posts to /api/enquiry which forwards
// the details to our team inbox via Resend.
//
// Prefilled from the server-resolved viewer (parent name, email, child's
// year level captured during the worksheet email gate). Parent can edit
// any field before submitting.
export default function EnquiryFormModal({
  tutorName,
  parentName: initialParentName,
  parentEmail: initialParentEmail,
  childYearLevel: initialChildYear,
  onClose,
}) {
  const [parentName, setParentName] = useState(initialParentName || "");
  const [parentEmail, setParentEmail] = useState(initialParentEmail || "");
  const [childName, setChildName] = useState("");
  const [childYear, setChildYear] = useState(initialChildYear || "Year 7");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!parentName.trim()) return setError("Please add your name.");
    if (!parentEmail.trim()) return setError("Please add your email.");
    if (!childName.trim()) return setError("Please add your child's name.");
    if (!message.trim())
      return setError("Tell us what you're looking for in tutoring.");

    setPending(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tutor_name: tutorName,
          parent_name: parentName.trim(),
          parent_email: parentEmail.trim(),
          child_name: childName.trim(),
          child_year_level: childYear,
          message: message.trim(),
        }),
      });
      const data = await readJsonOrFallback(res);
      if (!res.ok) throw new Error(data?.error || "Could not send enquiry.");
      setDone(true);
    } catch (err) {
      setError(err.message || "Could not send enquiry.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 4000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "rgba(15, 23, 42, 0.55)",
      }}
      onClick={pending ? undefined : onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: c.white,
          borderRadius: 20,
          padding: 32,
          maxWidth: 520,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(15, 23, 42, 0.3)",
          border: `1px solid ${c.border}`,
        }}
      >
        {done ? (
          <div style={{ textAlign: "center" }}>
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
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 26,
                color: c.navy,
                lineHeight: 1.2,
                margin: "0 0 12px",
              }}
            >
              Enquiry sent
            </h2>
            <p style={{ color: c.textLight, fontSize: 15, lineHeight: 1.6, margin: "0 0 24px" }}>
              Thanks {parentName.split(" ")[0]}! Our team will be in touch
              within 1 business day to put you in contact with {tutorName}.
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "12px 24px",
                borderRadius: 10,
                background: c.navy,
                color: c.white,
                fontSize: 15,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: c.teal,
                textTransform: "uppercase",
                letterSpacing: 2,
                margin: 0,
              }}
            >
              Enquire about a tutor
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 24,
                color: c.navy,
                lineHeight: 1.2,
                margin: "8px 0 8px",
              }}
            >
              Get in touch about {tutorName}
            </h2>
            <p style={{ color: c.textLight, fontSize: 14, lineHeight: 1.6, margin: "0 0 20px" }}>
              Tell us a bit about your child and what you&apos;re looking
              for. We&apos;ll connect you with {tutorName} and help you
              get started.
            </p>

            <div style={{ display: "grid", gap: 14 }}>
              <Row label="Your name">
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  disabled={pending}
                  style={inputStyle}
                />
              </Row>
              <Row label="Your email">
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  disabled={pending}
                  style={inputStyle}
                />
              </Row>
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12 }}>
                <Row label="Child's name">
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="First name is fine"
                    disabled={pending}
                    style={inputStyle}
                  />
                </Row>
                <Row label="Child's year">
                  <select
                    value={childYear}
                    onChange={(e) => setChildYear(e.target.value)}
                    disabled={pending}
                    style={inputStyle}
                  >
                    {YEAR_LEVELS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </Row>
              </div>
              <Row label="What are you looking for?">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Year 9 maths support, exam prep for term 3, help building confidence..."
                  rows={5}
                  disabled={pending}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 110, padding: "10px 14px", lineHeight: 1.5 }}
                />
              </Row>
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

            <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={pending}
                style={{
                  flex: "1 1 auto",
                  padding: "12px 24px",
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
                {pending ? "Sending…" : "Send enquiry"}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={pending}
                style={{
                  padding: "12px 22px",
                  borderRadius: 10,
                  background: c.white,
                  color: c.text,
                  fontSize: 14,
                  fontWeight: 600,
                  border: `1px solid ${c.border}`,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13, fontWeight: 600, color: c.text }}>
      <span>{label}</span>
      {children}
    </label>
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
