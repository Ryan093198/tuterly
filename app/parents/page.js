"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ContactCTA from "@/components/marketing/ContactCTA";
import Testimonials from "@/components/marketing/Testimonials";

// ─────────────────────────────────────────────────────────────────────────
// Tuterly parents landing — v2 "evolved teal" identity.
//
// Design system notes:
//   Display type  : Fraunces (warm editorial serif) — headlines only.
//   Body type     : DM Sans.
//   Palette       : ink navy + warm paper/sand neutrals, teal as the single
//                   confident accent (deepened from the old bright teal).
//   No uppercase-tracked eyebrows, no emoji icons, no fake ratings.
//
// TRUST CONTENT — PLACEHOLDERS TO REPLACE (search "PLACEHOLDER"):
//   • Trust-strip stats (years operating / students taught) need Ryan's real
//     Bayside Academics figures.
//   • Testimonial quotes are placeholders; swap with real Google reviews
//     (keep first name + suburb/year-level attribution style).
// ─────────────────────────────────────────────────────────────────────────

const c = {
  // accent (teal kept as the brand signal)
  teal: "#0D9488",
  tealDeep: "#0F766E",
  tealBright: "#14B8A6",
  tealPale: "#ECFDFB",
  // ink + text (cool)
  ink: "#0F172A",
  inkMid: "#1E293B",
  navy: "#0B1220",
  text: "#334155",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  // cool neutrals
  white: "#FFFFFF",
  paper: "#F7F9FC",
  sand: "#F1F5F9",
  borderWarm: "#E6EAF0",
  border: "#E6EAF0",
  // status
  success: "#10B981",
  amber: "#F59E0B",
  rose: "#E05B6D",
};

// Modern identity: Inter sans throughout. `serif` is kept as an alias to
// the sans stack so existing heading styles resolve to Inter; headings
// carry their own weight/tracking inline.
const sans = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const serif = sans;

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Fade({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// Shared section heading — sentence-case kicker with a rule, serif title.
function SectionHead({ kicker, title, sub, align = "center", light = false }) {
  const alignment = align === "left" ? "flex-start" : "center";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: alignment, textAlign: align, marginBottom: sub ? 20 : 44 }}>
      {kicker && (
        <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: light ? c.tealBright : c.tealDeep, marginBottom: 14 }}>{kicker}</p>
      )}
      <h2 style={{ fontFamily: serif, fontWeight: 800, fontSize: 40, letterSpacing: "-1px", color: light ? c.white : c.ink, lineHeight: 1.16, maxWidth: 640 }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, color: light ? "rgba(255,255,255,0.55)" : c.textLight, lineHeight: 1.75, maxWidth: 560, marginTop: 14, marginBottom: 28 }}>{sub}</p>}
    </div>
  );
}

// Minimal stroke icon set (replaces emoji).
function Ic({ name, size = 22, color = c.tealDeep }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    users: <><circle cx="9" cy="8" r="3.4" /><path d="M2.8 19c.7-3.2 3.3-5.4 6.2-5.4s5.5 2.2 6.2 5.4" /><circle cx="17" cy="9" r="2.4" /><path d="M15.2 14.4c1.6.4 2.9 1.7 3.4 3.4" /></>,
    report: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 8.5h6M9 12h6M9 15.5h3.5" /></>,
    chart: <><path d="M4 20V6M4 20h16" /><path d="m7.5 14 3.4-3.4 2.6 2.6L18 8.5" /></>,
    pencil: <><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z" /><path d="M14.5 6.5l3 3" /></>,
    book: <><path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v14H5.5A1.5 1.5 0 0 0 4 18.5V4.5z" /><path d="M4 18.5A1.5 1.5 0 0 0 5.5 20H19" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4.2" /><circle cx="12" cy="12" r="1" fill={color} /></>,
    calendar: <><rect x="4" y="5" width="16" height="15.5" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /></>,
    mic: <><rect x="9.2" y="3.5" width="5.6" height="10" rx="2.8" /><path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21" /></>,
    bell: <><path d="M18 16H6c1.2-1.4 1.8-2.4 1.8-5.2 0-3 1.7-5.3 4.2-5.3s4.2 2.3 4.2 5.3c0 2.8.6 3.8 1.8 5.2z" /><path d="M10.3 19a1.8 1.8 0 0 0 3.4 0" /></>,
    flag: <><path d="M6 21V4.5" /><path d="M6 5c4-2.3 8 2.3 12 0v8c-4 2.3-8-2.3-12 0" /></>,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  };
  return <svg {...common} aria-hidden="true">{paths[name] || paths.check}</svg>;
}

const galleryTutors = [
  { name: "Sarah T.", initials: "ST", atar: "99.45", subject: "Maths / VCE Methods", color: "#5A6ACF" },
  { name: "James W.", initials: "JW", atar: "98.90", subject: "English / VCE English", color: "#C4587E" },
  { name: "Emily K.", initials: "EK", atar: "99.10", subject: "Science / VCE Biology", color: "#C98F42" },
  { name: "Tom R.", initials: "TR", atar: "99.80", subject: "Maths / VCE Specialist", color: "#0E9A94" },
  { name: "Lisa M.", initials: "LM", atar: "98.50", subject: "English / Humanities", color: "#7C5CBF" },
  { name: "Daniel C.", initials: "DC", atar: "99.30", subject: "Maths / VCE Physics", color: "#C75B4A" },
  { name: "Priya S.", initials: "PS", atar: "99.55", subject: "Maths / VCE Methods", color: "#0F9D6C" },
  { name: "Alex N.", initials: "AN", atar: "98.70", subject: "English Language / Media", color: "#3D74C7" },
  { name: "Wei L.", initials: "WL", atar: "99.00", subject: "Maths / Science (Bilingual)", color: "#C77E3D" },
  { name: "Sophie H.", initials: "SH", atar: "99.25", subject: "VCE Chemistry / Biology", color: "#9A56B8" },
  { name: "Marcus D.", initials: "MD", atar: "98.85", subject: "VCE Methods / Physics", color: "#3E8FA8" },
  { name: "Anika R.", initials: "AR", atar: "99.60", subject: "English / VCE Literature", color: "#B85684" },
];

function TutorGallery() {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  };
  const navBtn = { position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 38, height: 38, borderRadius: "50%", border: `1px solid ${c.borderWarm}`, background: "rgba(255,255,255,0.97)", color: c.ink, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(15,27,45,0.08)" };
  return (
    <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
      <button aria-label="Scroll left" onClick={() => scroll(-1)} style={{ ...navBtn, left: 16 }}>←</button>
      <button aria-label="Scroll right" onClick={() => scroll(1)} style={{ ...navBtn, right: 16 }}>→</button>
      <div ref={scrollRef} style={{ display: "flex", gap: 16, overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", padding: "8px 0", WebkitOverflowScrolling: "touch" }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {galleryTutors.map((t, i) => (
          <a href={`/directory?tutor=${encodeURIComponent(t.name)}`} key={i} style={{ textDecoration: "none", flexShrink: 0, width: 132, textAlign: "center", cursor: "pointer" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 10px", overflow: "hidden", border: `3px solid ${c.borderWarm}`, background: t.color, display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = c.teal} onMouseLeave={e => e.currentTarget.style.borderColor = c.borderWarm}>
              <span style={{ fontSize: 24, fontWeight: 700, color: c.white, fontFamily: sans }}>{t.initials}</span>
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: c.ink, marginBottom: 2 }}>{t.name}</p>
            <p style={{ fontSize: 11, fontWeight: 600, color: c.tealDeep, marginBottom: 2 }}>ATAR {t.atar}</p>
            <p style={{ fontSize: 10, color: c.textMuted, lineHeight: 1.3 }}>{t.subject}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

const questionBank = {
  foundation: [
    { q: "Factorise: x² + 9x + 20", a: "Find two numbers that multiply to 20 and add to 9: 4 and 5.\nAnswer: (x + 4)(x + 5)" },
    { q: "Factorise: x² + 7x + 12", a: "Find two numbers that multiply to 12 and add to 7: 3 and 4.\nAnswer: (x + 3)(x + 4)" },
    { q: "Factorise: x² + 11x + 30", a: "Find two numbers that multiply to 30 and add to 11: 5 and 6.\nAnswer: (x + 5)(x + 6)" },
    { q: "Factorise: x² + 8x + 15", a: "Find two numbers that multiply to 15 and add to 8: 3 and 5.\nAnswer: (x + 3)(x + 5)" },
  ],
  standard: [
    { q: "Factorise: x² + 2x - 15", a: "Find two numbers that multiply to -15 and add to +2: 5 and -3.\nAnswer: (x + 5)(x - 3)" },
    { q: "Factorise: x² - 3x - 18", a: "Find two numbers that multiply to -18 and add to -3: -6 and 3.\nAnswer: (x - 6)(x + 3)" },
    { q: "Factorise: x² + x - 12", a: "Find two numbers that multiply to -12 and add to +1: 4 and -3.\nAnswer: (x + 4)(x - 3)" },
    { q: "Factorise: x² - 5x - 14", a: "Find two numbers that multiply to -14 and add to -5: -7 and 2.\nAnswer: (x - 7)(x + 2)" },
  ],
  extension: [
    { q: "Solve: x² + 3x - 18 = 0", a: "Factorise: (x + 6)(x - 3) = 0\nx = -6 or x = 3" },
    { q: "Solve: x² - 2x - 8 = 0", a: "Factorise: (x - 4)(x + 2) = 0\nx = 4 or x = -2" },
    { q: "Solve: x² + 5x - 24 = 0", a: "Factorise: (x + 8)(x - 3) = 0\nx = -8 or x = 3" },
    { q: "Solve: x² - x - 20 = 0", a: "Factorise: (x - 5)(x + 4) = 0\nx = 5 or x = -4" },
  ],
};

function PracticeQuestions({ expanded, setExpanded }) {
  const [indices, setIndices] = useState({ foundation: 0, standard: 0, extension: 0 });
  const regenerate = (level) => {
    setIndices(prev => ({ ...prev, [level]: (prev[level] + 1) % questionBank[level].length }));
    setExpanded(prev => ({ ...prev, [level]: false }));
  };
  const levels = [
    { key: "foundation", label: "Foundation", color: c.success },
    { key: "standard", label: "Standard", color: c.teal },
    { key: "extension", label: "Extension", color: c.amber },
  ];
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {levels.map((lvl) => {
        const question = questionBank[lvl.key][indices[lvl.key]];
        return (
          <div key={lvl.key} style={{ background: c.paper, borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: c.ink }}>{question.q}</p>
              <span style={{ fontSize: 10, fontWeight: 600, color: lvl.color, background: `${lvl.color}15`, padding: "2px 8px", borderRadius: 10 }}>{lvl.label}</span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button onClick={() => setExpanded(p => ({ ...p, [lvl.key]: !p[lvl.key] }))} style={{ fontSize: 12, color: c.tealDeep, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {expanded[lvl.key] ? "Hide solution ▴" : "View solution ▾"}
              </button>
              <button onClick={() => regenerate(lvl.key)} style={{ fontSize: 11, color: c.textLight, fontWeight: 600, background: "none", border: `1px solid ${c.border}`, borderRadius: 6, cursor: "pointer", padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                ↻ New question
              </button>
            </div>
            {expanded[lvl.key] && (
              <div style={{ marginTop: 8, padding: "10px 12px", background: c.white, borderRadius: 6, border: `1px solid ${c.border}` }}>
                <p style={{ fontSize: 12, color: c.textLight, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{question.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const comparisonQuestions = [
  { q: "Factorise: x² + 9x + 20", level: "Foundation", levelColor: "#0F9D6C", a: "Find two numbers that multiply to 20 and add to 9: 4 and 5.\nAnswer: (x + 4)(x + 5)" },
  { q: "Factorise: x² - 3x - 18", level: "Foundation", levelColor: "#0F9D6C", a: "Find two numbers that multiply to -18 and add to -3: -6 and 3.\nAnswer: (x - 6)(x + 3)" },
  { q: "Factorise: x² + 2x - 15", level: "Standard", levelColor: "#0E9A94", a: "Find two numbers that multiply to -15 and add to +2: 5 and -3.\nAnswer: (x + 5)(x - 3)" },
  { q: "Solve: x² - 2x - 8 = 0", level: "Extension", levelColor: "#D9962B", a: "Factorise: (x - 4)(x + 2) = 0\nSet each bracket to 0:\nx - 4 = 0 → x = 4\nx + 2 = 0 → x = -2\nAnswer: x = 4 or x = -2" },
  { q: "Solve: x² + 5x - 24 = 0", level: "Extension", levelColor: "#D9962B", a: "Factorise: (x + 8)(x - 3) = 0\nSet each bracket to 0:\nx + 8 = 0 → x = -8\nx - 3 = 0 → x = 3\nAnswer: x = -8 or x = 3" },
];

function ComparisonReportCard() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState({});
  return (
    <div style={{ background: c.white, borderRadius: 18, border: `1px solid ${c.borderWarm}`, boxShadow: "0 20px 60px rgba(15,27,45,0.10)", overflow: "hidden", position: "relative", transition: "all 0.3s" }}>
      <div style={{ padding: "14px 22px", background: c.ink, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Ic name={showQuestions ? "pencil" : "report"} size={16} color={c.tealBright} />
          <p style={{ fontSize: 13.5, fontWeight: 700, color: c.white }}>{showQuestions ? "Practice questions" : "Tuterly session report"}</p>
        </div>
        <span style={{ background: "rgba(10,186,181,0.18)", border: "1px solid rgba(10,186,181,0.4)", borderRadius: 12, padding: "2px 10px", fontSize: 10, fontWeight: 700, color: c.tealBright, letterSpacing: 0.5 }}>LIVE PREVIEW</span>
      </div>

      {!showQuestions ? (
        <div style={{ padding: "22px" }}>
          <div style={{ background: c.paper, borderRadius: 12, padding: "16px 18px", border: `1px solid ${c.borderWarm}`, marginBottom: 16 }}>
            <p style={{ fontSize: 11.5, color: c.tealDeep, fontWeight: 700, marginBottom: 6 }}>What we covered</p>
            <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>Factorising quadratic expressions, monic quadratics with positive and negative constant terms. Worked through Cambridge Ch.5, exercises 5C and 5D…</p>
            <div style={{ display: "flex", gap: 3, marginTop: 8, alignItems: "center" }}>
              {[1, 2, 3, 4].map(v => <div key={v} style={{ width: 8, height: 8, borderRadius: 2, background: c.teal }} />)}
              <div style={{ width: 8, height: 8, borderRadius: 2, background: `${c.teal}22` }} />
              <span style={{ fontSize: 10, color: c.textMuted, marginLeft: 4 }}>4/5 confidence</span>
            </div>
          </div>
          <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
            {["Specific topics and subtopics identified", "Mapped to VCAA curriculum descriptors", "Confidence ratings tracked over time", "Practice questions with worked solutions", "Automatic reminders, reports every session", "Progress dashboard showing improvement"].map((text, i) => (
              <div key={i} style={{ display: "flex", gap: 9, alignItems: "center" }}>
                <Ic name="check" size={14} color={c.teal} />
                <p style={{ fontSize: 13, color: c.text, fontWeight: 500 }}>{text}</p>
              </div>
            ))}
          </div>
          <button onClick={() => { setShowQuestions(true); setExpandedSolutions({}); }} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: c.ink, color: c.white, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = c.inkMid} onMouseLeave={e => e.currentTarget.style.background = c.ink}>
            Show practice questions →
          </button>
        </div>
      ) : (
        <div style={{ padding: "22px" }}>
          <p style={{ fontSize: 13, color: c.textLight, marginBottom: 14, lineHeight: 1.6 }}>Based on today&apos;s session, here are practice questions for Julian to work through before next time:</p>
          <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
            {comparisonQuestions.map((pq, i) => (
              <div key={i} style={{ background: c.paper, borderRadius: 10, padding: "12px 14px", border: `1px solid ${c.borderWarm}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: c.ink }}>{pq.q}</p>
                  <span style={{ fontSize: 10, fontWeight: 600, color: pq.levelColor, background: `${pq.levelColor}15`, padding: "2px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 8 }}>{pq.level}</span>
                </div>
                <button onClick={() => setExpandedSolutions(p => ({ ...p, [i]: !p[i] }))} style={{ fontSize: 12, color: c.tealDeep, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {expandedSolutions[i] ? "Hide solution ▴" : "View solution ▾"}
                </button>
                {expandedSolutions[i] && (
                  <div style={{ marginTop: 8, padding: "10px 12px", background: c.white, borderRadius: 6, border: `1px solid ${c.border}` }}>
                    <p style={{ fontSize: 12, color: c.textLight, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{pq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setShowQuestions(false)} style={{ width: "100%", padding: "12px", borderRadius: 10, border: `2px solid ${c.border}`, background: c.white, color: c.ink, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            ← Back to report
          </button>
        </div>
      )}
    </div>
  );
}

export default function ParentsLanding() {
  const [expandedQ, setExpandedQ] = useState(null);
  const [reportExpanded, setReportExpanded] = useState({});
  const [trialPending, setTrialPending] = useState(false);

  // "Software-only" CTA → $29/mo Tuterly subscription checkout (7-day trial).
  // Stripe collects email + card on its hosted page; the billing webhook
  // creates the account and emails a magic-link welcome.
  async function startTrial() {
    if (trialPending) return;
    setTrialPending(true);
    try {
      const res = await fetch("/api/billing/checkout-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.url) throw new Error(data?.error || "Could not start checkout.");
      window.location.href = data.url;
    } catch (e) {
      setTrialPending(false);
      window.location.href = "https://app.tuterly.com.au";
    }
  }

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Savings calculator — new model: sessions are all-inclusive (software
  // included in the pack price), compared against a typical agency rate.
  const [savingsMonths, setSavingsMonths] = useState(3);
  const LESSONS_PER_MONTH = 4;
  const COMPANY_HOURLY = 100;
  const TUTERLY_SESSION = 75; // Term pack per-session rate, software included
  const companyCost = COMPANY_HOURLY * LESSONS_PER_MONTH * savingsMonths;
  const tuterlyCost = TUTERLY_SESSION * LESSONS_PER_MONTH * savingsMonths;
  const savings = companyCost - tuterlyCost;

  const btnPrimary = { padding: "15px 30px", borderRadius: 12, background: c.ink, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block", border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(15,27,45,0.18)" };
  const btnGhost = { padding: "15px 30px", borderRadius: 12, border: `1.5px solid ${c.borderWarm}`, background: c.white, color: c.ink, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block", cursor: "pointer" };

  return (
    <div style={{ fontFamily: sans, color: c.text, background: c.white, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }
        ::selection { background: ${c.tealPale}; color: ${c.ink}; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px; background: ${c.borderWarm}; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: ${c.teal}; cursor: pointer; box-shadow: 0 2px 8px rgba(14,154,148,0.4); }
        input[type=range]::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: ${c.teal}; cursor: pointer; border: none; box-shadow: 0 2px 8px rgba(14,154,148,0.4); }
        @media(max-width:768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .packs-grid { grid-template-columns: 1fr !important; }
          .report-mock { max-width: 100% !important; }
          .stats-row { grid-template-columns: 1fr !important; gap: 16px !important; }
          .trust-strip { flex-direction: column !important; gap: 14px !important; align-items: flex-start !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          h1 { font-size: 38px !important; }
          h2 { font-size: 30px !important; }
          nav { padding: 0 16px !important; }
          .nav-links a:not(.nav-cta) { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${c.borderWarm}`, padding: "0 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 66 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: c.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: c.tealBright }}>t</div>
            <span style={{ fontSize: 21, fontWeight: 800, color: c.ink, letterSpacing: "-0.8px" }}>tuterly</span>
          </a>
          <div className="nav-links" style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Link href="/worksheets" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>Free worksheets</Link>
            <Link href="/directory" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>Find a tutor</Link>
            <Link href="/tutors" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>Become a tutor</Link>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>Log in</a>
            <Link className="nav-cta" href="/get-started" style={{ padding: "10px 20px", borderRadius: 10, fontSize: 14.5, fontWeight: 600, background: c.ink, color: c.white, textDecoration: "none", marginLeft: 6 }}>Get started</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "150px 40px 60px", background: "linear-gradient(180deg, #FFFFFF 0%, #F7F9FC 100%)" }}>
        <div className="hero-grid" style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 64, alignItems: "center" }}>
          <div style={{ animation: "fadeUp 0.8s ease" }}>
            {/* Provenance badge. Deliberately NOT a star rating — we do not
                have an aggregate review score, and implying one would be a
                misleading representation under ACL s29. Only add stars here
                when there is a real, linkable Google Business rating. */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 26, padding: "7px 14px 7px 10px", background: c.tealPale, border: `1px solid ${c.borderWarm}`, borderRadius: 999 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: "50%", background: c.tealDeep }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
              </span>
              <p style={{ fontSize: 12.5, color: c.inkMid, fontWeight: 600 }}>
                Built by <strong style={{ color: c.ink }}>Bayside Academics</strong> · tutoring Melbourne families in person for years
              </p>
            </div>
            <h1 style={{ fontWeight: 800, fontSize: 54, color: c.ink, lineHeight: 1.08, letterSpacing: "-1.6px", marginBottom: 22 }}>
              Tutoring you can actually <span style={{ color: c.teal }}>see</span> working.
            </h1>
            <p style={{ fontSize: 17.5, color: c.textLight, lineHeight: 1.75, marginBottom: 30, maxWidth: 470 }}>
              High-achieving tutors, matched to your child. After every session you get a detailed report: what was covered, how they went, and exactly what to practise next. No more guessing what you&apos;re paying for.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
              <Link href="/get-started" style={btnPrimary}>Find your child&apos;s tutor →</Link>
              <a href="#sample-report" onClick={scrollTo("sample-report")} style={btnGhost}>See a sample report</a>
            </div>
            <p style={{ fontSize: 13.5, color: c.textMuted }}>Sessions from $75/hr, all-inclusive · No lock-in contracts</p>
          </div>
          <div style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            <ComparisonReportCard />
          </div>
        </div>

        {/* TRUST STRIP — figures confirmed against Bayside records (10 Aug 2026).
            Any change to these numbers must stay substantiable on request. */}
        <div className="trust-strip" style={{ maxWidth: 1120, margin: "64px auto 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, borderTop: `1px solid ${c.borderWarm}`, paddingTop: 28 }}>
          <p style={{ fontSize: 14, color: c.textLight, maxWidth: 300, lineHeight: 1.6 }}>
            Built by the team behind <strong style={{ color: c.ink }}>Bayside Academics</strong>, tutoring Melbourne families in person for years.
          </p>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[
              { n: "1,000+", l: "sessions delivered" },
              { n: "98+", l: "average tutor ATAR" },
              { n: "VCAA", l: "curriculum aligned" },
            ].map((s, i) => (
              <div key={i}>
                <p style={{ fontFamily: serif, fontSize: 26, fontWeight: 600, color: c.ink }}>{s.n}</p>
                <p style={{ fontSize: 12.5, color: c.textMuted }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TUTOR GALLERY */}
      <section style={{ padding: "56px 0 64px", background: c.white, overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <Fade>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 26, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontFamily: serif, fontSize: 30, fontWeight: 600, color: c.ink, letterSpacing: "-0.5px", marginBottom: 6 }}>Tutors who topped the subjects your child is sitting.</h2>
                <p style={{ fontSize: 15, color: c.textLight }}>Every tutor is vetted, trained on Tuterly, and rated by families.</p>
              </div>
              <Link href="/directory" style={{ fontSize: 14.5, fontWeight: 600, color: c.tealDeep, textDecoration: "none", whiteSpace: "nowrap" }}>View all tutors →</Link>
            </div>
          </Fade>
        </div>
        <TutorGallery />
      </section>

      {/* PAIN POINTS */}
      <section style={{ padding: "88px 40px", background: c.sand }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="The problem" title="Most parents have no idea what their child's tutor actually covers." />
          </Fade>
          <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {[
              { stat: "78%", label: "of parents say their tutor doesn't communicate enough about sessions" },
              { stat: "$6,600+", label: "average annual spend on tutoring per child in Australia" },
              { stat: "1 in 4", label: "Australian students use private tutoring" },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div style={{ background: c.white, borderRadius: 16, padding: "32px 24px", textAlign: "center", border: `1px solid ${c.borderWarm}` }}>
                  <p style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-1px", color: c.ink, marginBottom: 8 }}>{s.stat}</p>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{s.label}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ padding: "88px 40px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="What you get" title="Everything you need to stay in the loop." />
          </Fade>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {[
              { icon: "search", title: "Browse tutors directly", desc: "Search our directory of vetted tutors by subject, year level, location, and budget. View their profiles, ratings, and session history, then reach out directly." },
              { icon: "users", title: "Or let us match you", desc: "Submit a request and one of our education team will personally match your child with a suitable tutor based on their needs, year level, and learning style." },
              { icon: "report", title: "Detailed session reports", desc: "After every lesson, see exactly what was covered. Stay in the loop on your child's progress, strengths, and areas that need attention." },
              { icon: "chart", title: "Progress tracking", desc: "Watch your child's confidence grow across every topic and subtopic. See trends over weeks and months, not just a single snapshot." },
              { icon: "pencil", title: "Practice question generator", desc: "Generate unlimited VCAA-aligned practice questions in any topic. Your child can practise independently and flag questions for the next session." },
              { icon: "book", title: "Lesson plans on demand", desc: "Build a week-by-week study plan in any topic and year level. Use it as holiday revision, exam prep, or a roadmap to share with your child's tutor." },
              { icon: "target", title: "Curriculum aligned", desc: "Every topic is mapped to the Victorian Curriculum (VCAA). You'll see the exact content descriptors your child is working on." },
              { icon: "calendar", title: "Assessment aware", desc: "Upload your child's term planner and assessment schedule. Your tutor will plan sessions around upcoming tests and SACs." },
            ].map((f, i) => (
              <Fade key={i} delay={i * 0.05}>
                <div style={{ display: "flex", gap: 16, padding: "24px 22px", borderRadius: 16, border: `1px solid ${c.borderWarm}`, background: c.paper, height: "100%" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: c.tealPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ic name={f.icon} size={21} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15.5, fontWeight: 700, color: c.ink, marginBottom: 5 }}>{f.title}</h3>
                    <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{f.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE REPORT */}
      <section id="sample-report" style={{ padding: "88px 40px", background: c.paper }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="Sample report" title="This is what you'll receive after every session." sub="A real example of a Tuterly report. Our tutors are trained on the platform, so you're kept in the loop after every session, practice questions and worked solutions included." />
          </Fade>
          <Fade delay={0.15}>
            <div className="report-mock" style={{ background: c.white, borderRadius: 20, border: `1px solid ${c.borderWarm}`, overflow: "hidden", boxShadow: "0 16px 56px rgba(15,27,45,0.08)" }}>
              <div style={{ background: c.ink, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ color: c.tealBright, fontSize: 13, fontWeight: 700 }}>Session report</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>powered by tuterly</p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>April 28, 2026</p>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[{ l: "Student", v: "Julian M." }, { l: "Year level", v: "Year 10" }, { l: "Subject", v: "Mathematics" }, { l: "Tutor", v: "Ryan" }].map((item, i) => (
                    <div key={i}><p style={{ fontSize: 10.5, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>{item.l}</p><p style={{ fontSize: 14, fontWeight: 600, color: c.ink }}>{item.v}</p></div>
                  ))}
                </div>
                {[
                  { title: "What we covered today", content: "Today's session focused on factorising quadratic expressions. We started by reviewing how to expand brackets, then moved into factorising monic quadratics where the leading coefficient is 1. We worked through several examples from Chapter 5 of the Cambridge Essential Maths 10 textbook, progressing from simple positive constant terms to expressions with negative constants." },
                  { title: "How Julian went", content: "Julian engaged well throughout the session and showed strong conceptual understanding. He was able to factorise standard monic quadratics independently by the end. He still needs practice with negative constant terms, specifically identifying factor pairs where one factor is negative." },
                ].map((section, i) => (
                  <div key={i} style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: c.tealDeep, marginBottom: 8 }}>{section.title}</h4>
                    <p style={{ fontSize: 13.5, color: c.textLight, lineHeight: 1.7 }}>{section.content}</p>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: c.tealDeep, marginBottom: 10 }}>Topic confidence</h4>
                  {[{ t: "Expanding brackets", r: 5 }, { t: "Factorising monic (positive)", r: 4 }, { t: "Factorising with negatives", r: 3 }, { t: "Solving by factorising", r: 3 }].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                      <span style={{ fontSize: 13.5, color: c.textLight }}>{item.t}</span>
                      <div style={{ display: "flex", gap: 3 }}>{[1, 2, 3, 4, 5].map(v => <div key={v} style={{ width: 10, height: 10, borderRadius: 3, background: v <= item.r ? c.teal : `${c.teal}20` }} />)}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: c.tealDeep, marginBottom: 8 }}>Areas to focus on</h4>
                  {["Review factor pairs for numbers up to 50 with one negative factor", "Practice factorising expressions with negative constant terms", "Attempt Exercise 5D Q1-10 in the Cambridge textbook"].map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "start", marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.teal, marginTop: 6, flexShrink: 0 }} />
                      <p style={{ fontSize: 13.5, color: c.textLight, lineHeight: 1.5 }}>{a}</p>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: c.tealDeep, marginBottom: 12 }}>Practice questions</h4>
                  <PracticeQuestions expanded={reportExpanded} setExpanded={setReportExpanded} />
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* PRICING — session packs (software included) + software-only */}
      <section id="packages" style={{ padding: "88px 40px", background: c.white }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Fade>
            <SectionHead
              kicker="Simple pricing"
              title="One price per session. Everything included."
              sub="Your session price covers the tutor, the session report, progress tracking, and full access to the Tuterly software: no separate platform fees, no lock-in contracts."
            />
          </Fade>

          {/* Package cards */}
          <Fade delay={0.05}>
            <div className="packs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
              {[
                {
                  name: "Starter pack",
                  price: 400, sessions: 5, per: 80, badge: null,
                  blurb: "Five one-hour sessions with your matched tutor. A great way to start and see the reports for yourself.",
                },
                {
                  name: "Term pack",
                  price: 750, sessions: 10, per: 75, badge: "Best value, save $50",
                  blurb: "Ten one-hour sessions, a full school term of weekly tutoring at our lowest per-session rate.",
                },
              ].map((p, i) => (
                <div key={i} style={{ position: "relative", background: p.badge ? c.ink : c.paper, borderRadius: 20, padding: "34px 30px", border: `1px solid ${p.badge ? c.ink : c.borderWarm}`, textAlign: "left", display: "flex", flexDirection: "column" }}>
                  {p.badge && (
                    <span style={{ position: "absolute", top: -13, left: 28, background: c.tealBright, color: c.ink, borderRadius: 100, padding: "5px 14px", fontSize: 12, fontWeight: 700 }}>{p.badge}</span>
                  )}
                  <p style={{ fontSize: 14.5, fontWeight: 700, color: p.badge ? c.tealBright : c.tealDeep, marginBottom: 10 }}>{p.name}</p>
                  <p style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-1.6px", color: p.badge ? c.white : c.ink, lineHeight: 1 }}>
                    ${p.price}
                  </p>
                  <p style={{ fontSize: 14, color: p.badge ? "rgba(255,255,255,0.55)" : c.textLight, marginTop: 8, marginBottom: 18 }}>
                    {p.sessions} sessions · ${p.per} per session
                  </p>
                  <p style={{ fontSize: 14, color: p.badge ? "rgba(255,255,255,0.65)" : c.textLight, lineHeight: 1.7, marginBottom: 20 }}>{p.blurb}</p>
                  <div style={{ display: "grid", gap: 9, marginBottom: 26 }}>
                    {["Report after every session", "Progress tracking over time", "Tuterly software included, $29/mo value", "Credits never expire"].map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: 9, alignItems: "center" }}>
                        <Ic name="check" size={14} color={p.badge ? c.tealBright : c.teal} />
                        <span style={{ fontSize: 13.5, color: p.badge ? "rgba(255,255,255,0.8)" : c.text }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/get-started" style={{ marginTop: "auto", textAlign: "center", padding: "14px 24px", borderRadius: 12, background: p.badge ? c.tealBright : c.ink, color: p.badge ? c.ink : c.white, fontSize: 14.5, fontWeight: 700, textDecoration: "none", display: "block" }}>
                    Get matched with a tutor →
                  </Link>
                </div>
              ))}
            </div>
          </Fade>

          {/* Software-only option */}
          <Fade delay={0.1}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, background: c.white, borderRadius: 16, padding: "24px 28px", border: `1px dashed ${c.borderWarm}`, marginBottom: 56, flexWrap: "wrap" }}>
              <div style={{ maxWidth: 520 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: c.ink, marginBottom: 4 }}>Just want the software?</p>
                <p style={{ fontSize: 13.5, color: c.textLight, lineHeight: 1.65 }}>
                  Use Tuterly alongside school work, your own study, or a tutor you already have: reports, progress tracking, and the practice generator. <strong style={{ color: c.ink }}>$29/month</strong>, 7-day free trial, cancel anytime.
                </p>
              </div>
              <button type="button" onClick={startTrial} disabled={trialPending} style={{ ...btnGhost, padding: "12px 22px", fontSize: 14 }}>
                {trialPending ? "Redirecting…" : "Start free trial →"}
              </button>
            </div>
          </Fade>

          {/* SAVINGS CALCULATOR */}
          <Fade delay={0.05}>
            <div style={{ background: c.paper, borderRadius: 20, padding: "32px 28px", border: `1px solid ${c.borderWarm}`, marginBottom: 32, textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                <p style={{ fontSize: 14.5, fontWeight: 700, color: c.tealDeep }}>Your savings vs a typical agency</p>
                <p style={{ fontSize: 13, color: c.textMuted }}>Assumes 4 lessons/month</p>
              </div>
              <p style={{ fontSize: 14, color: c.textLight, marginBottom: 16 }}>
                Over <strong style={{ color: c.ink, fontWeight: 700 }}>{savingsMonths} {savingsMonths === 1 ? "month" : "months"}</strong> of tutoring, you save
              </p>
              <p style={{ fontSize: 50, fontWeight: 800, letterSpacing: "-1.6px", color: c.tealDeep, lineHeight: 1.1, marginBottom: 24 }}>
                ${savings.toLocaleString("en-AU")}
              </p>
              <input type="range" min={1} max={12} step={1} value={savingsMonths} onChange={(e) => setSavingsMonths(parseInt(e.target.value, 10))} style={{ width: "100%", marginBottom: 6 }} aria-label="Months of tutoring" />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: c.textMuted, marginBottom: 24 }}>
                <span>1 month</span><span>6 months</span><span>12 months</span>
              </div>
              <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ background: c.white, borderRadius: 12, padding: "16px 18px", border: `1px solid ${c.borderWarm}` }}>
                  <p style={{ fontSize: 11.5, color: c.textMuted, marginBottom: 6, fontWeight: 600 }}>Typical agency</p>
                  <p style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.6px", color: c.ink }}>${companyCost.toLocaleString("en-AU")}</p>
                  <p style={{ fontSize: 12.5, color: c.textLight, marginTop: 4 }}>${COMPANY_HOURLY}/hr agency rate × {LESSONS_PER_MONTH * savingsMonths} lessons, often with little to no session feedback</p>
                </div>
                <div style={{ background: c.tealPale, borderRadius: 12, padding: "16px 18px", border: `1px solid ${c.teal}` }}>
                  <p style={{ fontSize: 11.5, color: c.tealDeep, marginBottom: 6, fontWeight: 700 }}>With Tuterly</p>
                  <p style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.6px", color: c.ink }}>${tuterlyCost.toLocaleString("en-AU")}</p>
                  <p style={{ fontSize: 12.5, color: c.textLight, marginTop: 4 }}>${TUTERLY_SESSION}/session (Term pack) × {LESSONS_PER_MONTH * savingsMonths} lessons: reports, tracking and software included</p>
                </div>
              </div>
            </div>
          </Fade>

          {/* COMPARISON TABLE */}
          <Fade delay={0.1}>
            <div style={{ background: c.white, borderRadius: 20, padding: "32px 28px", border: `1px solid ${c.borderWarm}`, textAlign: "left" }}>
              <p style={{ fontSize: 14.5, fontWeight: 700, color: c.tealDeep, marginBottom: 8 }}>Tuterly vs a typical tutoring company</p>
              <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 600, color: c.ink, lineHeight: 1.3, marginBottom: 20 }}>The structure of a top agency, with proof it&apos;s working.</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr", borderTop: `1px solid ${c.border}` }}>
                <div style={{ padding: "12px 6px", borderBottom: `1px solid ${c.border}` }}></div>
                <div style={{ padding: "12px 6px", fontSize: 12.5, fontWeight: 700, color: c.tealDeep, textAlign: "center", borderBottom: `1px solid ${c.border}` }}>Tuterly</div>
                <div style={{ padding: "12px 6px", fontSize: 12.5, fontWeight: 700, color: c.textMuted, textAlign: "center", borderBottom: `1px solid ${c.border}` }}>Typical company</div>
                {[
                  { label: "Trained, vetted tutors", tuterly: true, company: true },
                  { label: "Detailed post-session reports", tuterly: true, company: false },
                  { label: "Progress tracking across topics", tuterly: true, company: false },
                  { label: "VCAA-aligned practice worksheets", tuterly: true, company: false },
                  { label: "Custom lesson plans on demand", tuterly: true, company: false },
                  { label: "Transparent ratings + reviews on tutors", tuterly: true, company: false },
                  { label: "No long-term contracts or lock-ins", tuterly: true, company: false },
                ].map((row, i) => (
                  <div key={i} style={{ display: "contents" }}>
                    <div style={{ padding: "12px 6px", fontSize: 14, color: c.text, borderBottom: `1px solid ${c.border}` }}>{row.label}</div>
                    <div style={{ padding: "12px 6px", fontSize: 16, textAlign: "center", borderBottom: `1px solid ${c.border}`, color: row.tuterly ? c.teal : "#cbd5e1" }}>{row.tuterly ? "✓" : "✕"}</div>
                    <div style={{ padding: "12px 6px", fontSize: 16, textAlign: "center", borderBottom: `1px solid ${c.border}`, color: row.company ? c.teal : "#cbd5e1" }}>{row.company ? "✓" : "✕"}</div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>

          {/* Last-look reassurance at the point of price. Prefers quotes
              tagged "value" or "pricing"; renders nothing if none exist. */}
          <div style={{ marginTop: 28 }}>
            <Testimonials
              variant="strip"
              tags={["pricing", "value"]}
              limit={3}
              palette={c}
              bodyFont={sans}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "88px 40px", background: c.paper }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="How it works" title="Your tutor teaches. Tuterly handles the rest." sub="Here's exactly what happens before, during, and after every tutoring session." />
          </Fade>
          <div style={{ display: "grid", gap: 20 }}>
            {[
              {
                n: 1, title: "During the session",
                items: [
                  { icon: "mic", t: "Audio recording", d: "Tutors can record the session with one click. Our system automatically transcribes the audio and turns it into a structured report." },
                  { icon: "pencil", t: "Live notes and uploads", d: "Tutors can also type notes during or after the session, or upload photos of any working out done on paper or a whiteboard." },
                ],
              },
              {
                n: 2, title: "After the session",
                items: [
                  { icon: "bell", t: "Automatic reminders", d: "Tutors receive automatic reminders to complete their session notes. No reports fall through the cracks." },
                  { icon: "target", t: "Topic detection and confidence ratings", d: "Our system detects the exact topics covered and prompts the tutor to rate your child's confidence on each subtopic." },
                ],
              },
              {
                n: 3, title: "Report delivered to you",
                items: [
                  { icon: "report", t: "Detailed session report", d: "You receive a full report covering what was taught, how your child performed, areas to focus on, and curriculum alignment, in plain English." },
                  { icon: "chart", t: "Progress tracking", d: "Confidence ratings build up over time so you can see exactly how your child is improving across every topic and subtopic." },
                ],
              },
              {
                n: 4, title: "Independent practice between sessions",
                items: [
                  { icon: "pencil", t: "Auto-generated practice questions", d: "Practice questions are generated from our VCAA-aligned question bank, based on the exact topics covered in the session." },
                  { icon: "flag", t: "Generate more and flag for review", d: "Students can generate more questions in areas they want to work on, and flag anything they're stuck on for the next session." },
                ],
              },
            ].map((step, i) => (
              <Fade key={i} delay={i * 0.08}>
                <div style={{ background: c.white, borderRadius: 18, border: `1px solid ${c.borderWarm}`, overflow: "hidden" }}>
                  <div style={{ padding: "15px 24px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${c.borderWarm}`, background: c.paper }}>
                    <div style={{ width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${c.teal}`, color: c.tealDeep, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13.5, fontWeight: 700, fontFamily: serif }}>{step.n}</div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: c.ink }}>{step.title}</p>
                  </div>
                  <div className="features-grid" style={{ padding: "22px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                    {step.items.map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: 14 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: c.tealPale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Ic name={item.icon} size={19} />
                        </div>
                        <div>
                          <p style={{ fontSize: 14.5, fontWeight: 700, color: c.ink, marginBottom: 4 }}>{item.t}</p>
                          <p style={{ fontSize: 13.5, color: c.textLight, lineHeight: 1.65 }}>{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOT JUST NOTES */}
      <section style={{ padding: "88px 40px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="Why not just ask for notes?" title="There's a big difference between notes and a report." />
          </Fade>
          <Fade delay={0.1}>
            <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: c.paper, borderRadius: 18, border: `1px solid ${c.borderWarm}`, overflow: "hidden" }}>
                <div style={{ padding: "14px 22px", borderBottom: `1px solid ${c.borderWarm}` }}>
                  <p style={{ fontSize: 13.5, fontWeight: 700, color: c.textMuted }}>Typical tutor notes</p>
                </div>
                <div style={{ padding: "22px" }}>
                  <div style={{ background: c.white, borderRadius: 12, padding: "16px 18px", border: `1px solid ${c.borderWarm}`, marginBottom: 16 }}>
                    <p style={{ fontSize: 13.5, color: c.textLight, lineHeight: 1.7, fontStyle: "italic" }}>&quot;Hi Sarah, we did factorising today. Julian did pretty well. He needs to practise more with negative numbers. See you next week!&quot;</p>
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {[
                      "Vague, no specific topics or subtopics",
                      "No curriculum alignment",
                      "No confidence tracking over time",
                      "No practice questions or solutions",
                      "Inconsistent, stops after a few weeks",
                      "No way to track long-term progress",
                    ].map((text, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: c.rose, fontWeight: 700 }}>✕</span>
                        <p style={{ fontSize: 13.5, color: c.textLight }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <ComparisonReportCard />
            </div>
          </Fade>
        </div>
      </section>

      {/* PROGRESS TRACKING */}
      <section style={{ padding: "88px 40px", background: c.sand }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="Progress tracking" title="Watch your child improve over time." sub="Not just one report: a complete picture of your child's progress across every topic, every term." />
          </Fade>
          <Fade delay={0.12}>
            <div style={{ background: c.white, borderRadius: 20, padding: 32, border: `1px solid ${c.borderWarm}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
                <div>
                  <p style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: c.ink }}>Julian&apos;s progress</p>
                  <p style={{ fontSize: 13, color: c.textMuted }}>Year 10 Mathematics · 6 months</p>
                </div>
                <div style={{ background: `${c.success}14`, borderRadius: 100, padding: "6px 16px" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.success }}>+41% improvement</p>
                </div>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { topic: "Algebra", subtopics: [{ n: "Linear equations", before: 2, after: 5 }, { n: "Quadratic factorising", before: 1, after: 4 }, { n: "Simultaneous equations", before: 1, after: 3 }] },
                  { topic: "Measurement", subtopics: [{ n: "Area and perimeter", before: 3, after: 5 }, { n: "Surface area", before: 2, after: 4 }] },
                ].map((t, i) => (
                  <div key={i} style={{ background: c.paper, borderRadius: 12, padding: "18px 20px", border: `1px solid ${c.borderWarm}` }}>
                    <p style={{ fontSize: 14.5, fontWeight: 700, color: c.ink, marginBottom: 12 }}>{t.topic}</p>
                    {t.subtopics.map((st, j) => (
                      <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" }}>
                        <span style={{ fontSize: 13.5, color: c.textLight }}>{st.n}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ display: "flex", gap: 2 }}>{[1, 2, 3, 4, 5].map(v => <div key={v} style={{ width: 8, height: 8, borderRadius: 2, background: v <= st.before ? c.textMuted : `${c.textMuted}20` }} />)}</div>
                          <span style={{ fontSize: 11, color: c.textMuted }}>→</span>
                          <div style={{ display: "flex", gap: 2 }}>{[1, 2, 3, 4, 5].map(v => <div key={v} style={{ width: 8, height: 8, borderRadius: 2, background: v <= st.after ? c.teal : `${c.teal}20` }} />)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* TESTIMONIALS — real, consented quotes only. Content lives in
          lib/testimonials.js; this section renders nothing while that list
          is empty, which is the intended behaviour. Never hard-code a quote
          back into this file. */}
      <Testimonials
        variant="feature"
        tags={["home", "parents"]}
        limit={4}
        palette={c}
        background={c.white}
        headingFont={serif}
        bodyFont={sans}
        kicker="From our families"
        heading="Parents finally know what's happening."
      />

      {/* TWO WAYS TO FIND A TUTOR */}
      <section style={{ padding: "88px 40px", background: c.paper }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <SectionHead kicker="Two ways to find a tutor" title="Choose what works best for you." />
          </Fade>
          <Fade delay={0.1}>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div style={{ background: c.white, borderRadius: 18, padding: "30px 26px", border: `1px solid ${c.borderWarm}`, textAlign: "left" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: c.tealPale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Ic name="search" size={21} />
                </div>
                <h3 style={{ fontSize: 16.5, fontWeight: 700, color: c.ink, marginBottom: 8 }}>Browse and choose yourself</h3>
                <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, marginBottom: 16 }}>Search our directory of vetted tutors. Filter by subject, year level, location, and budget. View profiles, ratings, and past session data, then reach out directly.</p>
                <Link href="/directory" style={{ fontSize: 14.5, fontWeight: 600, color: c.tealDeep, textDecoration: "none" }}>Browse tutors →</Link>
              </div>
              <div style={{ background: c.white, borderRadius: 18, padding: "30px 26px", border: `1px solid ${c.borderWarm}`, textAlign: "left" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: c.tealPale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Ic name="users" size={21} />
                </div>
                <h3 style={{ fontSize: 16.5, fontWeight: 700, color: c.ink, marginBottom: 8 }}>Let us match you</h3>
                <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, marginBottom: 16 }}>Not sure where to start? Tell us your child&apos;s year level, subjects, and goals, our education team will personally match them with the right tutor. We handle everything.</p>
                <Link href="/get-started" style={{ fontSize: 14.5, fontWeight: 600, color: c.tealDeep, textDecoration: "none" }}>Request a match →</Link>
              </div>
            </div>
          </Fade>
          <Fade delay={0.2}>
            <p style={{ fontSize: 14, color: c.textLight, marginTop: 24, lineHeight: 1.7 }}>Either way, every tutor on Tuterly is trained on our platform. You&apos;ll receive detailed session reports, progress tracking, and practice questions from day one.</p>
          </Fade>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "88px 40px", background: c.white }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="Questions" title="Frequently asked." />
          </Fade>
          {[
            { q: "What does a session cost?", a: "Sessions are sold in packs: 5 sessions for $400 ($80/session) or 10 sessions for $750 ($75/session). That price is all-inclusive: the tutor, the session report, progress tracking, and full access to the Tuterly software. There are no lock-in contracts, and your session credits never expire." },
            { q: "How is this different from a tutoring agency?", a: "Typical agencies charge $90–110/hour and give you little visibility into what happens in each session. Tuterly sessions are $75–80 all-in, taught by high-achieving tutors we vet and train, and every single session produces a detailed report, confidence ratings, and practice questions, so you can see the value you're paying for." },
            { q: "Do I have to use a tutor from your directory?", a: "No. If you already have a tutor you love, the Tuterly software works with them too: the $29/month software plan gives you reports, progress tracking, and the practice generator with any tutor, or for your child's own independent study." },
            { q: "Does my tutor need to sign up too?", a: "If you're using your own tutor: yes, but it's free for them and takes 2 minutes. When you add your tutor's details, our team will personally reach out with a summary pack and offer a free info session. You don't need to explain anything." },
            { q: "Can my child use the practice generator without a tutor?", a: "Yes. The software includes unlimited access to our VCAA-aligned question generator: any topic, any difficulty, with full worked solutions. Many families use it alongside school work even in weeks with no tutoring." },
            { q: "What subjects are covered?", a: "All subjects from Prep to Year 12, including Mathematics, English, Sciences, Humanities, and all VCE subjects. Reports and practice questions are aligned to the Victorian Curriculum (VCAA)." },
            { q: "What if we take a break from tutoring?", a: "Your session credits never expire, so a quiet month costs you nothing. If you're on the software-only plan, you can cancel or restart the $29/month subscription anytime from your dashboard." },
            { q: "Is my child's data private?", a: "Absolutely. Only you and your child's tutor can see the reports. We never share data with third parties." },
          ].map((faq, i) => (
            <Fade key={i} delay={i * 0.04}>
              <div style={{ borderBottom: `1px solid ${c.borderWarm}`, padding: "18px 0", cursor: "pointer" }} onClick={() => setExpandedQ(expandedQ === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: c.ink }}>{faq.q}</p>
                  <span style={{ fontSize: 18, color: c.textMuted, transform: expandedQ === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}>+</span>
                </div>
                {expandedQ === i && <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.75, marginTop: 10 }}>{faq.a}</p>}
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* FREE WORKSHEETS */}
      <section style={{ padding: "88px 40px", background: c.tealPale }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="Free practice, no signup" title="Year 7–10 maths worksheets your child can use today." sub="Generate a fresh practice worksheet on any Victorian Curriculum topic, with fully worked solutions. Free, no signup needed for the first one." />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
              {[7, 8, 9, 10].map((yr) => (
                <Link key={yr} href={`/worksheets#year-${yr}`} style={{ display: "block", padding: "20px 22px", background: c.white, border: `1px solid ${c.borderWarm}`, borderRadius: 14, textDecoration: "none" }}>
                  <p style={{ fontSize: 11.5, fontWeight: 700, color: c.tealDeep, marginBottom: 6 }}>Worksheets</p>
                  <p style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, color: c.ink, marginBottom: 4 }}>Year {yr}</p>
                  <p style={{ fontSize: 12, color: c.textMuted }}>13 topics</p>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 18, textAlign: "center" }}>
              <Link href="/worksheets" style={{ fontSize: 14.5, color: c.tealDeep, fontWeight: 600, textDecoration: "none" }}>See every Year 3–10 topic →</Link>
            </p>
          </Fade>
        </div>
      </section>

      {/* TALK TO US */}
      <section id="talk" style={{ padding: "64px 40px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <ContactCTA
              variant="card"
              headline="Want us to point you to the right tutor?"
              subhead="Call or message us with your child's year level and subject, we'll match them to a tutor in your area or run you through how Tuterly works."
              context="Parents landing page"
            />
          </Fade>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: "88px 40px", background: c.ink, textAlign: "center" }}>
        <Fade>
          <h2 style={{ fontSize: 38, fontWeight: 800, color: c.white, marginBottom: 14, lineHeight: 1.14, letterSpacing: "-1px" }}>Know what&apos;s happening, every session.</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.7 }}>Get matched with a high-achieving tutor, or bring your own: either way, you&apos;ll see the progress.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 26 }}>
            <Link href="/get-started" style={{ display: "inline-block", padding: "15px 32px", borderRadius: 12, background: c.tealBright, color: c.ink, fontSize: 15, fontWeight: 700, textDecoration: "none", cursor: "pointer" }}>Find your child&apos;s tutor →</Link>
            <button type="button" onClick={startTrial} disabled={trialPending} style={{ display: "inline-block", padding: "15px 32px", borderRadius: 12, background: "transparent", color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.25)", cursor: "pointer" }}>{trialPending ? "Redirecting…" : "Try the software free"}</button>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:+61426787978" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none" }}>0426 787 978</a>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
            <a href="mailto:admin@baysideacademics.com.au" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none" }}>admin@baysideacademics.com.au</a>
          </div>
        </Fade>
      </section>

      {/* FOOTER */}
      <footer style={{ background: c.ink, borderTop: "1px solid rgba(255,255,255,0.07)", padding: "32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: c.tealBright, fontFamily: serif }}>t</div>
            <span style={{ fontFamily: serif, fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>tuterly</span>
          </div>
          <Link href="/tutoring" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Areas we serve</Link>
          <a href="https://baysideacademics.com.au" style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Bayside Academics</a>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.25)" }}>© 2026 Tuterly by Bayside Academics</p>
        </div>
      </footer>
    </div>
  );
}
