"use client";

import { useState } from "react";
import { c } from "@/components/marketing/theme";

// Reusable contact CTA block. Drop into any marketing page where
// you want a "talk to us" prompt. Renders two side-by-side actions:
//   1. A tel: link with the Tuterly phone number, always visible
//   2. A "Message us" button that opens a contact modal
//
// Props:
//   variant:   'card' (default - rounded card with heading)
//            | 'inline' (compact strip without heading)
//            | 'dark' (navy background, white text - bottom CTAs)
//   headline:  optional override for the card title
//   subhead:   optional override for the supporting line
//   context:   short string sent to admin email so we know which
//              page the enquiry came from ("Year 7 Algebra worksheet")
const PHONE = "0426 787 978";
const PHONE_TEL = "tel:+61426787978";

export default function ContactCTA({
  variant = "card",
  headline,
  subhead,
  context,
}) {
  const [open, setOpen] = useState(false);

  const isDark = variant === "dark";
  const isInline = variant === "inline";

  const bg = isDark ? c.navy : c.white;
  const fg = isDark ? c.white : c.navy;
  const muted = isDark ? "rgba(255,255,255,0.65)" : c.textLight;
  const border = isDark ? "rgba(255,255,255,0.1)" : c.border;

  return (
    <>
      <div
        style={{
          background: bg,
          border: isInline ? "none" : `1px solid ${border}`,
          borderRadius: isInline ? 0 : 16,
          padding: isInline ? "16px 0" : "26px 28px",
          display: "flex",
          flexDirection: isInline ? "row" : "column",
          alignItems: isInline ? "center" : "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        {!isInline && (
          <div style={{ flex: 1, minWidth: 240 }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: isDark ? c.teal : c.tealDark,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 8,
              }}
            >
              Talk to a human
            </p>
            <p
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 24,
                color: fg,
                lineHeight: 1.25,
                marginBottom: 6,
              }}
            >
              {headline || "Not sure where to start? Talk to us."}
            </p>
            <p style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>
              {subhead ||
                "Call or message us about your child's year level and what they need help with - we'll point you in the right direction."}
            </p>
          </div>
        )}

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignSelf: isInline ? "center" : "stretch",
          }}
        >
          <a
            href={PHONE_TEL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 22px",
              borderRadius: 10,
              background: isDark ? c.teal : c.navy,
              color: c.white,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            <span aria-hidden="true">📞</span>
            <span>{PHONE}</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{
              padding: "13px 22px",
              borderRadius: 10,
              background: isDark ? "rgba(255,255,255,0.08)" : c.tealPale,
              color: isDark ? c.white : c.tealDark,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              border: `1px solid ${isDark ? "rgba(255,255,255,0.18)" : c.teal}`,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Message us
          </button>
        </div>
      </div>

      {open && <ContactModal context={context} onClose={() => setOpen(false)} />}
    </>
  );
}

export function ContactModal({ context, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot (audit H2): hidden from humans; bots fill it and get silently dropped.
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Please add your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          year_level: yearLevel.trim(),
          message: message.trim(),
          page_context: context || null,
          company_website: companyWebsite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not send.");
      setSent(true);
    } catch (err) {
      setError(err.message || "Could not send right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact Tuterly"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 520,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          background: c.white,
          borderRadius: 18,
          padding: "28px 28px 24px",
          boxShadow: "0 24px 64px rgba(15, 23, 42, 0.3)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            float: "right",
            background: "none",
            border: "none",
            color: c.textMuted,
            fontSize: 22,
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {sent ? (
          <div style={{ paddingTop: 8 }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: c.tealDark,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 10,
              }}
            >
              Got it
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 26,
                color: c.navy,
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              Thanks - we&apos;ll be in touch within a day.
            </h2>
            <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6, marginBottom: 18 }}>
              In the meantime feel free to call us at{" "}
              <a href={PHONE_TEL} style={{ color: c.tealDark, fontWeight: 600 }}>
                {PHONE}
              </a>{" "}
              - we usually answer between 9am and 8pm.
            </p>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "12px 22px",
                borderRadius: 10,
                background: c.navy,
                color: c.white,
                border: "none",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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
                fontSize: 12,
                fontWeight: 600,
                color: c.tealDark,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                marginBottom: 10,
              }}
            >
              Talk to Tuterly
            </p>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 26,
                color: c.navy,
                lineHeight: 1.25,
                marginBottom: 8,
              }}
            >
              Message us about your child.
            </h2>
            <p
              style={{
                fontSize: 14,
                color: c.textLight,
                lineHeight: 1.6,
                marginBottom: 18,
              }}
            >
              Tell us a bit about what they need and we&apos;ll get back to you within a day. Or call{" "}
              <a href={PHONE_TEL} style={{ color: c.tealDark, fontWeight: 600 }}>
                {PHONE}
              </a>
              .
            </p>

            <div style={{ display: "grid", gap: 10 }}>
              <Field
                label="Your name"
                value={name}
                onChange={setName}
                required
                autoComplete="name"
              />
              <Field
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                required
                autoComplete="email"
              />
              <Field
                label="Phone"
                type="tel"
                value={phone}
                onChange={setPhone}
                autoComplete="tel"
                placeholder="Optional"
              />
              <Field
                label="Year level"
                value={yearLevel}
                onChange={setYearLevel}
                placeholder="e.g. Year 9, Year 11 Methods"
              />
              <label style={{ display: "block" }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 12,
                    fontWeight: 600,
                    color: c.textLight,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  What they need help with
                </span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Brief description - subject, year level, anything specific."
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: `1px solid ${c.border}`,
                    fontSize: 14,
                    fontFamily: "'DM Sans', sans-serif",
                    background: c.white,
                    color: c.text,
                    resize: "vertical",
                    outline: "none",
                  }}
                />
              </label>
            </div>

            {error && (
              <p
                style={{
                  fontSize: 13,
                  color: "#B45309",
                  marginTop: 10,
                  fontWeight: 600,
                }}
              >
                {error}
              </p>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: "13px 24px",
                  borderRadius: 10,
                  background: submitting ? c.border : c.navy,
                  color: c.white,
                  border: "none",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: submitting ? "not-allowed" : "pointer",
                }}
              >
                {submitting ? "Sending..." : "Send message →"}
              </button>
              <a
                href={PHONE_TEL}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "13px 22px",
                  borderRadius: 10,
                  background: c.tealPale,
                  color: c.tealDark,
                  border: `1px solid ${c.teal}`,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Or call {PHONE}
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required, placeholder, autoComplete }) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          color: c.textLight,
          textTransform: "uppercase",
          letterSpacing: 1,
          display: "block",
          marginBottom: 4,
        }}
      >
        {label}
        {required && <span style={{ color: c.rose, marginLeft: 4 }}>*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        style={{
          width: "100%",
          padding: "11px 14px",
          borderRadius: 10,
          border: `1px solid ${c.border}`,
          fontSize: 14,
          fontFamily: "'DM Sans', sans-serif",
          background: c.white,
          color: c.text,
          outline: "none",
        }}
      />
    </label>
  );
}
