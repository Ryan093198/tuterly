"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readJsonOrFallback } from "@/lib/practice-client";
import {
  CONTACT_EMAIL,
  HONEYPOT,
  MODE_OPTIONS,
  SENT_KEY,
  YEAR_OPTIONS,
  validateTutorRequest,
  yearLabel,
  yearToNumber,
} from "@/lib/tutor-request";

const WORKSHEET_EMAIL_KEY = "tuterly:worksheet_email";
const WORKSHEET_YEAR_KEY = "tuterly:worksheet_year";

const c = {
  teal: "#0D9488",
  tealPale: "#ECFDFB",
  navy: "#0F172A",
  text: "#334155",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
  border: "#E6EAF0",
  rose: "#E11D48",
  roseBg: "#FFF1F2",
  success: "#10B981",
};

// "Want help from a local tutor?" request form. Posts to
// /api/tutor-request, which forwards to Tuterly Match. Modal on desktop,
// full screen on mobile. Styling follows EnquiryFormModal / EmailGateModal.
//
// Props:
//   source         worksheet | suburb_page | parents_page
//   initialYear    "Year 8" etc (optional; falls back to the gate's year)
//   initialSuburb  prefill for /tutoring/[suburb]
//   onClose        close handler
//   onSent         called once the request has gone through
export default function TutorRequestModal({
  source = "worksheet",
  initialYear,
  initialSuburb,
  onClose,
  onSent,
}) {
  // Only ever mounted client-side (opened by a click), so reading
  // localStorage in the initialiser is safe. Prefills from the worksheet gate.
  const [form, setForm] = useState(() => ({
    parent_name: "",
    mobile: "",
    email: readLocal(WORKSHEET_EMAIL_KEY),
    student_name: "",
    year: yearToNumber(initialYear) ?? yearToNumber(readLocal(WORKSHEET_YEAR_KEY)) ?? "",
    subjects_text: "",
    suburb: initialSuburb || "",
    postcode: "",
    mode: "",
    preferred_times: "",
    notes: "",
    consent: false,
    [HONEYPOT]: "",
  }));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  // Escape closes; lock background scroll while open.
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && !pending) onClose?.();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [pending, onClose]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function toBody() {
    return {
      ...form,
      year: form.year === "" ? null : yearLabel(Number(form.year)),
      source,
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    const body = toBody();
    const clientErrors = validateTutorRequest(body);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      focusFirstError(clientErrors);
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/tutor-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await readJsonOrFallback(res);
      if (res.status === 400 && data?.errors && Object.keys(data.errors).length) {
        setErrors(data.errors);
        focusFirstError(data.errors);
        return;
      }
      if (!res.ok) throw new Error(data?.error || "Sorry, something went wrong. Please try again later.");
      try {
        window.localStorage.setItem(SENT_KEY, new Date().toISOString());
      } catch {}
      setDone(true);
      onSent?.();
    } catch (err) {
      setFormError(err.message || "Sorry, something went wrong. Please try again later.");
    } finally {
      setPending(false);
    }
  }

  const firstName = form.parent_name.trim().split(/\s+/)[0] || "";

  return (
    <div className="tr-overlay" onClick={pending ? undefined : onClose}>
      <style>{css}</style>
      <div
        className="tr-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tr-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="tr-close"
          aria-label="Close"
          onClick={onClose}
          disabled={pending}
        >
          ×
        </button>

        {done ? (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div className="tr-tick" aria-hidden="true">✓</div>
            <h2 id="tr-title" className="tr-h2">Thanks, {firstName}!</h2>
            <p className="tr-p">
              We&apos;ve shared your request with tutoring centres near {form.suburb.trim()}.
              Expect a text or call within a day or two. You can ask us to delete
              your details any time:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: c.teal }}>{CONTACT_EMAIL}</a>.
            </p>
            <button type="button" className="tr-primary" onClick={onClose} style={{ marginTop: 8 }}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Honeypot: hidden from people, bots fill it and get silently dropped. */}
            <input
              type="text"
              name={HONEYPOT}
              tabIndex={-1}
              autoComplete="off"
              value={form[HONEYPOT]}
              onChange={(e) => set(HONEYPOT, e.target.value)}
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            <p className="tr-kicker">Free, no obligation</p>
            <h2 id="tr-title" className="tr-h2">Find a local tutor</h2>
            <p className="tr-p">
              Tell us what your child needs and up to 3 tutoring centres near you
              can get in touch.
            </p>

            <div className="tr-grid">
              <Field id="parent_name" label="Your name" error={errors.parent_name}>
                <input id="parent_name" type="text" autoComplete="name" maxLength={100}
                  value={form.parent_name} onChange={(e) => set("parent_name", e.target.value)}
                  disabled={pending} className="tr-input" aria-invalid={!!errors.parent_name} />
              </Field>

              <div className="tr-two">
                <Field id="mobile" label="Mobile" error={errors.mobile}>
                  <input id="mobile" type="tel" inputMode="tel" autoComplete="tel" maxLength={30}
                    placeholder="0412 345 678"
                    value={form.mobile} onChange={(e) => set("mobile", e.target.value)}
                    disabled={pending} className="tr-input" aria-invalid={!!errors.mobile} />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input id="email" type="email" autoComplete="email" maxLength={200}
                    value={form.email} onChange={(e) => set("email", e.target.value)}
                    disabled={pending} className="tr-input" aria-invalid={!!errors.email} />
                </Field>
              </div>

              <div className="tr-two">
                <Field id="student_name" label="Child's first name" error={errors.student_name}>
                  <input id="student_name" type="text" maxLength={100}
                    value={form.student_name} onChange={(e) => set("student_name", e.target.value)}
                    disabled={pending} className="tr-input" aria-invalid={!!errors.student_name} />
                </Field>
                <Field id="year" label="Year level" error={errors.year}>
                  <select id="year" value={form.year}
                    onChange={(e) => set("year", e.target.value === "" ? "" : Number(e.target.value))}
                    disabled={pending} className="tr-input" aria-invalid={!!errors.year}>
                    <option value="" disabled>Choose…</option>
                    {YEAR_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field id="subjects_text" label="Subjects" optional error={errors.subjects_text}>
                <input id="subjects_text" type="text" maxLength={300} placeholder="e.g. Maths, English"
                  value={form.subjects_text} onChange={(e) => set("subjects_text", e.target.value)}
                  disabled={pending} className="tr-input" aria-invalid={!!errors.subjects_text} />
              </Field>

              <div className="tr-two tr-suburb">
                <Field id="suburb" label="Suburb" error={errors.suburb}>
                  <SuburbInput
                    value={form.suburb}
                    invalid={!!errors.suburb}
                    disabled={pending}
                    onChange={(v) => set("suburb", v)}
                    onPick={(name, postcode) => {
                      set("suburb", name);
                      set("postcode", postcode);
                    }}
                  />
                </Field>
                <Field id="postcode" label="Postcode" optional error={errors.postcode}>
                  <input id="postcode" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={4}
                    placeholder="3188"
                    value={form.postcode} onChange={(e) => set("postcode", e.target.value.replace(/\D/g, ""))}
                    disabled={pending} className="tr-input" aria-invalid={!!errors.postcode} />
                </Field>
              </div>

              <fieldset className="tr-fieldset" aria-invalid={!!errors.mode}>
                <legend className="tr-label">Lessons</legend>
                <div className="tr-radios">
                  {MODE_OPTIONS.map((m) => (
                    <label key={m.value} className={`tr-radio${form.mode === m.value ? " on" : ""}`}>
                      <input type="radio" name="mode" id={m.value === MODE_OPTIONS[0].value ? "mode" : undefined}
                        value={m.value} checked={form.mode === m.value}
                        onChange={() => set("mode", m.value)} disabled={pending} />
                      {m.label}
                    </label>
                  ))}
                </div>
                {errors.mode && <p className="tr-err">{errors.mode}</p>}
              </fieldset>

              <Field id="preferred_times" label="Best days or times" optional error={errors.preferred_times}>
                <input id="preferred_times" type="text" maxLength={200} placeholder="e.g. Weekdays after 4pm"
                  value={form.preferred_times} onChange={(e) => set("preferred_times", e.target.value)}
                  disabled={pending} className="tr-input" aria-invalid={!!errors.preferred_times} />
              </Field>

              <Field id="notes" label="Anything else?" optional error={errors.notes}>
                <textarea id="notes" rows={3} maxLength={2000} placeholder="e.g. Struggling with fractions"
                  value={form.notes} onChange={(e) => set("notes", e.target.value)}
                  disabled={pending} className="tr-input tr-textarea" aria-invalid={!!errors.notes} />
              </Field>

              <div>
                <label className="tr-consent">
                  <input id="consent" type="checkbox" checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)} disabled={pending} />
                  <span>
                    I agree to Tuterly sharing these details with up to 3 tutoring centres
                    near me so they can contact me about tutoring. See our{" "}
                    <Link href="/privacy" target="_blank" style={{ color: c.teal }}>privacy policy</Link>.
                  </span>
                </label>
                {errors.consent && <p className="tr-err">{errors.consent}</p>}
              </div>
            </div>

            {formError && <p className="tr-form-err" role="alert">{formError}</p>}

            <button type="submit" className="tr-primary" disabled={pending || !form.consent}
              style={{ width: "100%", marginTop: 18 }}>
              {pending ? "Sending…" : "Find me a tutor"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className="tr-field">
      <label htmlFor={id} className="tr-label">
        {label}
        {optional && <span className="tr-opt"> (optional)</span>}
      </label>
      {children}
      {error && <p className="tr-err" id={`${id}-err`}>{error}</p>}
    </div>
  );
}

// Suburb text box with suggestions from all 3,509 Victorian suburbs.
// Picking one also fills the postcode. Free text is still accepted.
function SuburbInput({ value, invalid, disabled, onChange, onPick }) {
  const [list, setList] = useState(null);
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);

  useEffect(() => {
    let live = true;
    import("@/lib/suburb-suggestions").then((m) => {
      if (live) setList(m.VIC_SUBURBS);
    });
    return () => {
      live = false;
    };
  }, []);

  const q = value.trim().toLowerCase();
  let matches = [];
  if (open && list && q.length >= 2) {
    const starts = [];
    const contains = [];
    for (const row of list) {
      const n = row[0].toLowerCase();
      if (n.startsWith(q) || row[1].startsWith(q)) starts.push(row);
      else if (n.includes(q)) contains.push(row);
      if (starts.length >= 8) break;
    }
    matches = [...starts, ...contains].slice(0, 8);
  }

  function pick(row) {
    onPick(row[0], row[1]);
    setOpen(false);
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        id="suburb"
        type="text"
        autoComplete="off"
        maxLength={60}
        value={value}
        disabled={disabled}
        className="tr-input"
        aria-invalid={invalid}
        role="combobox"
        aria-expanded={matches.length > 0}
        aria-controls="tr-suburb-list"
        aria-autocomplete="list"
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setHi(0);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (!matches.length) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHi((h) => (h + 1) % matches.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHi((h) => (h - 1 + matches.length) % matches.length);
          } else if (e.key === "Enter") {
            e.preventDefault();
            pick(matches[hi]);
          } else if (e.key === "Escape") {
            e.stopPropagation();
            setOpen(false);
          }
        }}
      />
      {matches.length > 0 && (
        <ul id="tr-suburb-list" role="listbox" className="tr-sugg">
          {matches.map((row, i) => (
            <li key={`${row[0]}-${row[1]}`} role="option" aria-selected={i === hi}>
              <button
                type="button"
                tabIndex={-1}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(row);
                }}
                onMouseEnter={() => setHi(i)}
                className={i === hi ? "on" : ""}
              >
                {row[0]} <span>{row[1]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function readLocal(key) {
  try {
    return window.localStorage.getItem(key) || "";
  } catch {
    return "";
  }
}

function focusFirstError(errs) {
  const order = ["parent_name", "mobile", "email", "student_name", "year", "subjects_text",
    "suburb", "postcode", "mode", "preferred_times", "notes", "consent"];
  const first = order.find((k) => errs[k]);
  if (first) setTimeout(() => document.getElementById(first)?.focus(), 0);
}

const css = `
.tr-overlay { position: fixed; inset: 0; z-index: 9500; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(15,23,42,0.55); font-family: 'Inter','Helvetica Neue',Arial,sans-serif; }
.tr-panel { position: relative; background: ${c.white}; border-radius: 20px; padding: 32px; max-width: 540px; width: 100%; max-height: 92vh; overflow-y: auto; box-shadow: 0 24px 80px rgba(15,23,42,0.3); border: 1px solid ${c.border}; color: ${c.text}; text-align: left; }
.tr-close { position: absolute; top: 12px; right: 14px; width: 36px; height: 36px; border-radius: 50%; border: none; background: transparent; font-size: 26px; line-height: 1; color: ${c.textLight}; cursor: pointer; }
.tr-close:hover { background: #F1F5F9; }
.tr-kicker { font-size: 12px; font-weight: 700; color: ${c.teal}; text-transform: uppercase; letter-spacing: 1.5px; margin: 0; }
.tr-h2 { font-size: 24px; font-weight: 800; color: ${c.navy}; line-height: 1.2; margin: 8px 0; letter-spacing: -0.4px; }
.tr-p { color: ${c.textLight}; font-size: 14.5px; line-height: 1.6; margin: 0 0 20px; }
.tr-grid { display: grid; gap: 14px; }
.tr-two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.tr-suburb { grid-template-columns: 1.6fr 1fr; }
.tr-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.tr-label { font-size: 13px; font-weight: 600; color: ${c.navy}; padding: 0; }
.tr-opt { font-weight: 400; color: ${c.textMuted}; }
.tr-input { width: 100%; height: 42px; padding: 0 12px; border-radius: 10px; border: 1px solid ${c.border}; background: ${c.white}; font-size: 16px; color: ${c.navy}; font-family: inherit; outline: none; box-sizing: border-box; }
.tr-input:focus { border-color: ${c.teal}; box-shadow: 0 0 0 3px rgba(13,148,136,0.15); }
.tr-input[aria-invalid="true"] { border-color: ${c.rose}; }
.tr-textarea { height: auto; min-height: 84px; padding: 10px 12px; resize: vertical; line-height: 1.5; }
.tr-sugg { position: absolute; top: calc(100% + 4px); left: 0; right: 0; z-index: 5; list-style: none; margin: 0; padding: 4px; background: ${c.white}; border: 1px solid ${c.border}; border-radius: 10px; box-shadow: 0 10px 28px rgba(15,23,42,0.12); max-height: 260px; overflow-y: auto; }
.tr-sugg button { display: flex; justify-content: space-between; width: 100%; text-align: left; padding: 9px 10px; border: none; border-radius: 7px; background: transparent; font-size: 14px; color: ${c.navy}; cursor: pointer; font-family: inherit; }
.tr-sugg button span { color: ${c.textMuted}; }
.tr-sugg button.on { background: ${c.tealPale}; }
.tr-fieldset { border: none; margin: 0; padding: 0; min-width: 0; }
.tr-fieldset .tr-label { margin-bottom: 6px; display: block; }
.tr-radios { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.tr-radio { display: flex; align-items: center; justify-content: center; gap: 6px; height: 42px; border-radius: 10px; border: 1px solid ${c.border}; font-size: 14px; font-weight: 600; color: ${c.text}; cursor: pointer; }
.tr-radio input { accent-color: ${c.teal}; margin: 0; }
.tr-radio.on { border-color: ${c.teal}; background: ${c.tealPale}; color: ${c.navy}; }
.tr-fieldset[aria-invalid="true"] .tr-radio { border-color: ${c.rose}; }
.tr-consent { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; line-height: 1.5; color: ${c.text}; cursor: pointer; background: #F8FAFC; border: 1px solid ${c.border}; border-radius: 10px; padding: 12px; }
.tr-consent input { width: 18px; height: 18px; margin: 1px 0 0; flex: none; accent-color: ${c.teal}; }
.tr-err { color: ${c.rose}; font-size: 12.5px; margin: 2px 0 0; }
.tr-form-err { color: ${c.rose}; font-size: 13px; margin: 14px 0 0; background: ${c.roseBg}; padding: 8px 10px; border-radius: 8px; }
.tr-primary { padding: 13px 24px; border-radius: 10px; background: ${c.navy}; color: ${c.white}; font-size: 15px; font-weight: 700; border: none; cursor: pointer; font-family: inherit; }
.tr-primary:disabled { opacity: 0.45; cursor: not-allowed; }
.tr-tick { width: 56px; height: 56px; border-radius: 50%; background: #ECFDF5; color: ${c.success}; font-size: 28px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
@media (max-width: 640px) {
  .tr-overlay { padding: 0; align-items: stretch; }
  .tr-panel { max-width: none; max-height: none; height: 100%; border-radius: 0; border: none; padding: 24px 16px 32px; }
  .tr-two, .tr-suburb { grid-template-columns: 1fr; }
}
`;
