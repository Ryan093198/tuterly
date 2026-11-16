"use client";

import { useEffect, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";
import "./teacher-signup.css";

// Tuterly for Teachers sign-up (Ryan, 16 Nov 2026: "We should have a sign up
// form for teachers as well, not just book a demo"). Accounts are set up by
// the team, so this sends the details to learn@tuterly.com.au. Links to
// #teacher-signup pick "A teacher account"; links to #book-demo pick "A demo".
const WANTS = [
  { v: "account", t: "A teacher account", x: "For my own classes" },
  { v: "demo", t: "A demo first", x: "See a class set marked" },
  { v: "school", t: "Our school", x: "A department or whole school" },
];
const ROLES = ["Maths teacher", "Head of maths", "School leader", "Other"];
const YEARS = ["7", "8", "9", "10"];

const DONE = {
  account: "We’ll set up your teacher account and email you how to get started.",
  demo: "We’ll email you to find a time for your demo.",
  school: "We’ll email you to talk about setting it up in your school.",
};

export default function TeacherSignup({ title = "Sign up for Tuterly for Teachers" }) {
  const [want, setWant] = useState("account");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [role, setRole] = useState("");
  const [years, setYears] = useState([]);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState(""); // honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === "#book-demo") setWant("demo");
      else if (window.location.hash === "#teacher-signup") setWant("account");
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const toggleYear = (y) => setYears((ys) => (ys.includes(y) ? ys.filter((v) => v !== y) : [...ys, y]));

  async function submit(e) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Please add your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Please enter a valid email address.");
    if (school.trim().length < 2) return setError("Please add your school.");
    setBusy(true);
    try {
      const res = await fetch("/api/teachers/account-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          want,
          name: name.trim(),
          email: email.trim(),
          school: school.trim(),
          role,
          years: years.length ? "Year " + YEARS.filter((y) => years.includes(y)).join(", ") : "",
          phone: phone.trim(),
          message: message.trim(),
          company_website: companyWebsite,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not send.");
      setSent(true);
    } catch (err) {
      setError(err.message || `Could not send right now. Please email ${CONTACT_EMAIL}.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tsu" id="teacher-signup">
      <span id="book-demo" className="tsu-anchor" aria-hidden="true" />
      {sent ? (
        <div className="tsu-done" role="status">
          <p className="tsu-k">Thanks, {name.trim().split(/\s+/)[0]}</p>
          <p className="tsu-done__t">We&rsquo;ve got your details.</p>
          <p className="tsu-done__p">{DONE[want]} We&rsquo;ll write to {email.trim()}.</p>
          <p className="tsu-done__p">Questions in the meantime? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <p className="tsu-k">Tuterly for Teachers</p>
          <h3 className="tsu-title">{title}</h3>
          <p className="tsu-lead">Tell us a little about you and we&rsquo;ll get you set up. Setting up your school&rsquo;s copier is free.</p>

          <fieldset className="tsu-want">
            <legend>I&rsquo;d like</legend>
            {WANTS.map((w) => (
              <label key={w.v} className={`tsu-want__opt${want === w.v ? " is-on" : ""}`}>
                <input type="radio" name="want" value={w.v} checked={want === w.v} onChange={() => setWant(w.v)} />
                <span className="tsu-want__t">{w.t}</span>
                <span className="tsu-want__x">{w.x}</span>
              </label>
            ))}
          </fieldset>

          <div className="tsu-grid">
            <label className="tsu-f">
              <span>Your name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" required />
            </label>
            <label className="tsu-f">
              <span>School email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" required />
            </label>
            <label className="tsu-f">
              <span>School</span>
              <input value={school} onChange={(e) => setSchool(e.target.value)} autoComplete="organization" required />
            </label>
            <label className="tsu-f">
              <span>Your role</span>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose one</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
          </div>

          <fieldset className="tsu-years">
            <legend>Year levels you teach <em>(optional)</em></legend>
            <div>
              {YEARS.map((y) => (
                <label key={y} className={`tsu-chip${years.includes(y) ? " is-on" : ""}`}>
                  <input type="checkbox" checked={years.includes(y)} onChange={() => toggleYear(y)} />
                  Year {y}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="tsu-grid">
            <label className="tsu-f">
              <span>Phone <em>(optional)</em></span>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" />
            </label>
            <label className="tsu-f tsu-f--wide">
              <span>Anything else? <em>(optional)</em></span>
              <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="For example, how many classes, or when your next test is." />
            </label>
          </div>

          <label className="tsu-hp" aria-hidden="true">
            Company website
            <input tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} />
          </label>

          {error && <p className="tsu-err" role="alert">{error}</p>}
          <button type="submit" className="tb-btn tb-btn--primary tsu-go" disabled={busy}>
            {busy ? "Sending…" : want === "demo" ? "Book my demo" : "Sign up"}
          </button>
          <p className="tsu-fine">We&rsquo;ll only use your details to set you up and reply to you. Or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </form>
      )}
    </div>
  );
}
