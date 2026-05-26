"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ContactCTA from "@/components/marketing/ContactCTA";

const c = {
  teal: "#0ABAB5",
  tealLight: "#2DD4BF",
  tealDark: "#0D9488",
  tealPale: "#F0FDFA",
  navy: "#0F172A",
  navyMid: "#1E293B",
  navyLight: "#334155",
  text: "#1E293B",
  textLight: "#64748B",
  textMuted: "#94A3B8",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
  cream: "#FFFBF5",
  border: "#E2E8F0",
  success: "#10B981",
  amber: "#F59E0B",
  rose: "#F43F5E",
};

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

const galleryTutors = [
  { name: "Sarah T.", initials: "ST", atar: "99.45", subject: "Maths / VCE Methods", color: "#6366F1" },
  { name: "James W.", initials: "JW", atar: "98.90", subject: "English / VCE English", color: "#EC4899" },
  { name: "Emily K.", initials: "EK", atar: "99.10", subject: "Science / VCE Biology", color: "#F59E0B" },
  { name: "Tom R.", initials: "TR", atar: "99.80", subject: "Maths / VCE Specialist", color: "#0ABAB5" },
  { name: "Lisa M.", initials: "LM", atar: "98.50", subject: "English / Humanities", color: "#8B5CF6" },
  { name: "Daniel C.", initials: "DC", atar: "99.30", subject: "Maths / VCE Physics", color: "#EF4444" },
  { name: "Priya S.", initials: "PS", atar: "99.55", subject: "Maths / VCE Methods", color: "#14B8A6" },
  { name: "Alex N.", initials: "AN", atar: "98.70", subject: "English Language / Media", color: "#3B82F6" },
  { name: "Wei L.", initials: "WL", atar: "99.00", subject: "Maths / Science (Bilingual)", color: "#F97316" },
  { name: "Sophie H.", initials: "SH", atar: "99.25", subject: "VCE Chemistry / Biology", color: "#A855F7" },
  { name: "Marcus D.", initials: "MD", atar: "98.85", subject: "VCE Methods / Physics", color: "#0EA5E9" },
  { name: "Anika R.", initials: "AR", atar: "99.60", subject: "English / VCE Literature", color: "#D946EF" },
];

function TutorGallery() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
    }
  };

  return (
    <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
      <button onClick={() => scroll(-1)} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 36, height: 36, borderRadius: "50%", border: `1px solid ${c.border}`, background: "rgba(255,255,255,0.95)", color: c.navy, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>←</button>
      <button onClick={() => scroll(1)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 36, height: 36, borderRadius: "50%", border: `1px solid ${c.border}`, background: "rgba(255,255,255,0.95)", color: c.navy, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>→</button>
      <div ref={scrollRef} style={{ display: "flex", gap: 16, overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none", padding: "8px 0", WebkitOverflowScrolling: "touch" }}>
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {galleryTutors.map((t, i) => (
          <a href={`/directory?tutor=${encodeURIComponent(t.name)}`} key={i} style={{ textDecoration: "none", flexShrink: 0, width: 130, textAlign: "center", cursor: "pointer" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 10px", overflow: "hidden", border: `3px solid ${c.border}`, background: t.color, display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = c.teal} onMouseLeave={e => e.currentTarget.style.borderColor = c.border}>
              <span style={{ fontSize: 24, fontWeight: 700, color: c.white, fontFamily: "'Space Grotesk', sans-serif" }}>{t.initials}</span>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: c.navy, marginBottom: 2 }}>{t.name}</p>
            <p style={{ fontSize: 11, fontWeight: 600, color: c.teal, marginBottom: 2 }}>ATAR {t.atar}</p>
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

const c2 = { success: "#10B981", teal: "#0ABAB5", amber: "#F59E0B" };

function PracticeQuestions({ expanded, setExpanded }) {
  const [indices, setIndices] = useState({ foundation: 0, standard: 0, extension: 0 });

  const regenerate = (level) => {
    setIndices(prev => ({ ...prev, [level]: (prev[level] + 1) % questionBank[level].length }));
    setExpanded(prev => ({ ...prev, [level]: false }));
  };

  const levels = [
    { key: "foundation", label: "Foundation", color: c2.success },
    { key: "standard", label: "Standard", color: c2.teal },
    { key: "extension", label: "Extension", color: c2.amber },
  ];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {levels.map((lvl) => {
        const question = questionBank[lvl.key][indices[lvl.key]];
        return (
          <div key={lvl.key} style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{question.q}</p>
              <span style={{ fontSize: 10, fontWeight: 600, color: lvl.color, background: `${lvl.color}15`, padding: "2px 8px", borderRadius: 10 }}>{lvl.label}</span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button onClick={() => setExpanded(p => ({ ...p, [lvl.key]: !p[lvl.key] }))} style={{ fontSize: 12, color: "#0ABAB5", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {expanded[lvl.key] ? "Hide solution ▴" : "View solution ▾"}
              </button>
              <button onClick={() => regenerate(lvl.key)} style={{ fontSize: 11, color: "#64748B", fontWeight: 600, background: "none", border: `1px solid #E2E8F0`, borderRadius: 6, cursor: "pointer", padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                ↻ New question
              </button>
            </div>
            {expanded[lvl.key] && (
              <div style={{ marginTop: 8, padding: "10px 12px", background: "#FFFFFF", borderRadius: 6, border: "1px solid #E2E8F0" }}>
                <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{question.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const comparisonQuestions = [
  { q: "Factorise: x² + 9x + 20", level: "Foundation", levelColor: "#10B981", a: "Find two numbers that multiply to 20 and add to 9: 4 and 5.\nAnswer: (x + 4)(x + 5)" },
  { q: "Factorise: x² - 3x - 18", level: "Foundation", levelColor: "#10B981", a: "Find two numbers that multiply to -18 and add to -3: -6 and 3.\nAnswer: (x - 6)(x + 3)" },
  { q: "Factorise: x² + 2x - 15", level: "Standard", levelColor: "#0ABAB5", a: "Find two numbers that multiply to -15 and add to +2: 5 and -3.\nAnswer: (x + 5)(x - 3)" },
  { q: "Solve: x² - 2x - 8 = 0", level: "Extension", levelColor: "#F59E0B", a: "Factorise: (x - 4)(x + 2) = 0\nSet each bracket to 0:\nx - 4 = 0 → x = 4\nx + 2 = 0 → x = -2\nAnswer: x = 4 or x = -2" },
  { q: "Solve: x² + 5x - 24 = 0", level: "Extension", levelColor: "#F59E0B", a: "Factorise: (x + 8)(x - 3) = 0\nSet each bracket to 0:\nx + 8 = 0 → x = -8\nx - 3 = 0 → x = 3\nAnswer: x = -8 or x = 3" },
];

function ComparisonReportCard() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState({});

  return (
    <div style={{ background: "#F0FDFA", borderRadius: 18, border: "2px solid #0ABAB5", overflow: "hidden", position: "relative", transition: "all 0.3s" }}>
      <div style={{ position: "absolute", top: 12, right: 14, background: "#0ABAB5", borderRadius: 12, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: 1 }}>Tuterly</div>
      <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(10,186,181,0.19)", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>{showQuestions ? "📝" : "📋"}</span>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{showQuestions ? "Practice questions" : "Tuterly session report"}</p>
      </div>

      {!showQuestions ? (
        <div style={{ padding: "22px" }}>
          <div style={{ background: "#FFFFFF", borderRadius: 12, padding: "16px 18px", border: "1px solid rgba(10,186,181,0.19)", marginBottom: 16 }}>
            <p style={{ fontSize: 11, color: "#0ABAB5", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>What We Covered</p>
            <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7 }}>Factorising quadratic expressions - monic quadratics with positive and negative constant terms. Worked through Cambridge Ch.5, exercises 5C and 5D...</p>
            <div style={{ display: "flex", gap: 3, marginTop: 8 }}>
              {[1, 2, 3, 4].map(v => <div key={v} style={{ width: 8, height: 8, borderRadius: 2, background: "#0ABAB5" }} />)}
              <div style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(10,186,181,0.13)" }} />
              <span style={{ fontSize: 10, color: "#94A3B8", marginLeft: 4 }}>4/5 confidence</span>
            </div>
          </div>
          <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
            {["Specific topics and subtopics identified", "Mapped to VCAA curriculum descriptors", "Confidence ratings tracked over time", "Practice questions with worked solutions", "Automatic reminders - reports every session", "Progress dashboard showing improvement"].map((text, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#0ABAB5", fontWeight: 700 }}>✓</span>
                <p style={{ fontSize: 13, color: "#0F172A", fontWeight: 500 }}>{text}</p>
              </div>
            ))}
          </div>
          <button onClick={() => { setShowQuestions(true); setExpandedSolutions({}); }} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "#0F172A", color: "#FFFFFF", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }} onMouseEnter={e => e.target.style.background = "#1E293B"} onMouseLeave={e => e.target.style.background = "#0F172A"}>
            📝 Show Practice Questions
          </button>
        </div>
      ) : (
        <div style={{ padding: "22px" }}>
          <p style={{ fontSize: 13, color: "#64748B", marginBottom: 14, lineHeight: 1.6 }}>Based on today's session, here are practice questions for Julian to work through before next time:</p>
          <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
            {comparisonQuestions.map((pq, i) => (
              <div key={i} style={{ background: "#FFFFFF", borderRadius: 10, padding: "12px 14px", border: "1px solid #E2E8F0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{pq.q}</p>
                  <span style={{ fontSize: 10, fontWeight: 600, color: pq.levelColor, background: `${pq.levelColor}15`, padding: "2px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 8 }}>{pq.level}</span>
                </div>
                <button onClick={() => setExpandedSolutions(p => ({ ...p, [i]: !p[i] }))} style={{ fontSize: 12, color: "#0ABAB5", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {expandedSolutions[i] ? "Hide solution ▴" : "View solution ▾"}
                </button>
                {expandedSolutions[i] && (
                  <div style={{ marginTop: 8, padding: "10px 12px", background: "#F8FAFC", borderRadius: 6, border: "1px solid #E2E8F0" }}>
                    <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{pq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button onClick={() => setShowQuestions(false)} style={{ width: "100%", padding: "12px", borderRadius: 10, border: "2px solid #E2E8F0", background: "#FFFFFF", color: "#0F172A", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
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
  // Savings calculator state. Slider drives a comparison between a typical
  // tutoring company ($100/hr) and Tuterly (avg $60/hr from the directory
  // plus $29/mo platform subscription), assuming 4 lessons per month.
  const [savingsMonths, setSavingsMonths] = useState(1);
  const LESSONS_PER_MONTH = 4;
  const COMPANY_HOURLY = 100;
  const TUTERLY_HOURLY = 60;
  const TUTERLY_SUB = 29;
  const companyCost = COMPANY_HOURLY * LESSONS_PER_MONTH * savingsMonths;
  const tuterlyCost =
    TUTERLY_HOURLY * LESSONS_PER_MONTH * savingsMonths +
    TUTERLY_SUB * savingsMonths;
  const savings = companyCost - tuterlyCost;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: c.text, background: c.white, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }
        ::selection { background: ${c.tealPale}; color: ${c.navy}; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px; background: ${c.border}; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: ${c.teal}; cursor: pointer; box-shadow: 0 2px 8px rgba(10, 186, 181, 0.4); }
        input[type=range]::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: ${c.teal}; cursor: pointer; border: none; box-shadow: 0 2px 8px rgba(10, 186, 181, 0.4); }
        @media(max-width:768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .report-mock { max-width: 100% !important; }
          .stats-row { grid-template-columns: 1fr !important; gap: 16px !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          h1 { font-size: 36px !important; }
          h2 { font-size: 28px !important; }
          nav { padding: 0 16px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${c.border}`, padding: "0 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 64 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: c.white }}>T</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: c.navy }}>tuterly</span>
          </a>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href="/parents" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.teal, textDecoration: "none" }}>For Parents</a>
            <a href="/worksheets" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Free Worksheets</a>
            <a href="/directory" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Find a Tutor</a>
            <a href="/tutors" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Apply as a Tutor</a>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Log in</a>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: c.navy, color: c.white, textDecoration: "none" }}>Sign up free</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "140px 40px 80px", background: `linear-gradient(180deg, ${c.white} 0%, ${c.tealPale} 100%)` }}>
        <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 60, alignItems: "center" }}>
          <div style={{ animation: "fadeUp 0.8s ease" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>For Parents</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: c.navy, lineHeight: 1.15, marginBottom: 20 }}>Find the right tutor. Track every session.</h1>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.8, marginBottom: 12, maxWidth: 480 }}>Browse our directory of vetted tutors and reach out directly, or let one of our education experts find the right match for your child. Every tutor is trained on our platform, so you get detailed session reports, progress tracking, and practice questions after every lesson.</p>
            <p style={{ fontSize: 17, color: c.textLight, lineHeight: 1.8, marginBottom: 32, maxWidth: 480 }}>Already have a tutor? Tuterly works with them too. Invite any tutor to start generating reports.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <a href="https://app.tuterly.com.au" style={{ padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>Start 7-day free trial →</a>
              <a href="#sample-report" onClick={(e) => { e.preventDefault(); document.getElementById('sample-report')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: "14px 28px", borderRadius: 10, border: `2px solid ${c.border}`, color: c.text, fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>See a sample report</a>
            </div>
            <p style={{ fontSize: 13, color: c.textMuted }}>7 days free. Then $29/month. Cancel anytime.</p>
          </div>
          <div style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            {/* Interactive report preview card */}
            <div style={{ transform: "rotate(1deg)" }}>
              <ComparisonReportCard />
            </div>
          </div>
        </div>
      </section>

      {/* TUTOR GALLERY */}
      <section style={{ padding: "40px 0 60px", background: c.white, overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <Fade>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>Our tutors</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: c.navy }}>Trained, verified, high-achieving.</p>
              </div>
              <a href="/directory" style={{ fontSize: 14, fontWeight: 600, color: c.teal, textDecoration: "none" }}>View all tutors →</a>
            </div>
          </Fade>
        </div>
        <TutorGallery />
      </section>

      {/* PAIN POINTS */}
      <section style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>The problem</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Most parents have no idea what their child's tutor actually covers.</h2>
          </Fade>
          <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
            {[
              { stat: "78%", label: "of parents say their tutor doesn't communicate enough about sessions" },
              { stat: "$6,600+", label: "average annual spend on tutoring per child in Australia" },
              { stat: "1 in 4", label: "Australian students use private tutoring" },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div style={{ background: c.offWhite, borderRadius: 16, padding: "32px 24px", textAlign: "center", border: `1px solid ${c.border}` }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{s.stat}</p>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.6 }}>{s.label}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>



      {/* WHAT YOU GET */}
      <section style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>What you get</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Everything you need to stay in the loop.</h2>
          </Fade>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              { icon: "🔍", title: "Browse tutors directly", desc: "Search our directory of vetted tutors by subject, year level, location, and budget. View their profiles, ratings, and session history, then reach out directly to whoever you think is the right fit." },
              { icon: "🤝", title: "Let us find the right tutor for you", desc: "Not sure where to start? Submit a request and one of our education experts will personally match your child with a suitable tutor based on their needs, year level, and learning style." },
              { icon: "📋", title: "Detailed session reports", desc: "After every lesson, see exactly what was covered. Stay in the loop on your child's progress, strengths, and areas that need attention." },
              { icon: "📊", title: "Progress tracking", desc: "Watch your child's confidence grow across every topic and subtopic. See trends over weeks and months, not just a single snapshot." },
              { icon: "📝", title: "Practice question generator", desc: "Generate unlimited VCAA-aligned practice questions in any topic. Your child can practise independently and flag questions they're stuck on for the next session." },
              { icon: "📚", title: "Lesson plans on demand", desc: "Build a week-by-week study plan in any topic and year level. Use it as holiday revision, exam prep, or a roadmap to share with your child's tutor." },
              { icon: "🎯", title: "Curriculum aligned", desc: "Every topic is mapped to the Victorian Curriculum (VCAA). You'll see the exact content descriptors your child is working on." },
              { icon: "📅", title: "Assessment aware", desc: "Upload your child's term planner and assessment schedule. Your tutor will plan sessions around upcoming tests and SACs." },
            ].map((f, i) => (
              <Fade key={i} delay={i * 0.06}>
                <div style={{ display: "flex", gap: 16, padding: "24px 20px", borderRadius: 14, border: `1px solid ${c.border}`, background: c.offWhite }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy, marginBottom: 4 }}>{f.title}</h3>
                    <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{f.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>


      {/* SAMPLE REPORT */}
      <section id="sample-report" style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Sample report</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>This is what you'll receive after every session.</h2>
            <p style={{ fontSize: 15, color: c.textLight, textAlign: "center", marginBottom: 40, lineHeight: 1.7 }}>A real example of a Tuterly report. Our tutors are all trained to use the platform, so that you&apos;re kept in the loop after every session. Practice questions, along with solutions, are sent after every tutoring lesson to reinforce concepts learnt.</p>
          </Fade>
          <Fade delay={0.15}>
            <div className="report-mock" style={{ background: c.white, borderRadius: 20, border: `1px solid ${c.border}`, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.06)" }}>
              <div style={{ background: c.navy, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ color: c.teal, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>Session Report</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>powered by tuterly</p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>April 28, 2026</p>
              </div>
              <div style={{ padding: "24px 28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                  {[{ l: "Student", v: "Julian M." }, { l: "Year Level", v: "Year 10" }, { l: "Subject", v: "Mathematics" }, { l: "Tutor", v: "Ryan" }].map((item, i) => (
                    <div key={i}><p style={{ fontSize: 10, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>{item.l}</p><p style={{ fontSize: 14, fontWeight: 600, color: c.navy }}>{item.v}</p></div>
                  ))}
                </div>

                {[
                  { title: "What We Covered Today", content: "Today's session focused on factorising quadratic expressions. We started by reviewing how to expand brackets, then moved into factorising monic quadratics where the leading coefficient is 1. We worked through several examples from Chapter 5 of the Cambridge Essential Maths 10 textbook, progressing from simple positive constant terms to expressions with negative constants." },
                  { title: "How Julian Went", content: "Julian engaged well throughout the session and showed strong conceptual understanding. He was able to factorise standard monic quadratics independently by the end. He still needs practice with negative constant terms - specifically identifying factor pairs where one factor is negative." },
                ].map((section, i) => (
                  <div key={i} style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 8 }}>{section.title}</h4>
                    <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>{section.content}</p>
                  </div>
                ))}

                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 10 }}>Topic Confidence</h4>
                  {[{ t: "Expanding brackets", r: 5 }, { t: "Factorising monic (positive)", r: 4 }, { t: "Factorising with negatives", r: 3 }, { t: "Solving by factorising", r: 3 }].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                      <span style={{ fontSize: 13, color: c.textLight }}>{item.t}</span>
                      <div style={{ display: "flex", gap: 3 }}>{[1, 2, 3, 4, 5].map(v => <div key={v} style={{ width: 10, height: 10, borderRadius: 3, background: v <= item.r ? c.teal : `${c.teal}20` }} />)}</div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 8 }}>Areas to Focus On</h4>
                  {["Review factor pairs for numbers up to 50 with one negative factor", "Practice factorising expressions with negative constant terms", "Attempt Exercise 5D Q1-10 in the Cambridge textbook"].map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "start", marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.teal, marginTop: 6, flexShrink: 0 }} />
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.5 }}>{a}</p>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 12 }}>Practice Questions</h4>
                  <PracticeQuestions expanded={reportExpanded} setExpanded={setReportExpanded} />
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Simple pricing</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, marginBottom: 16, lineHeight: 1.25 }}>Structured tutoring with feedback every session, for less.</h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.75, marginBottom: 40, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
              You get the structure of a top tutoring company. Detailed session reports, curriculum-aligned practice worksheets, custom lesson plans, and progress tracking on every topic, without paying the company markup.
            </p>
          </Fade>

          {/* SAVINGS CALCULATOR */}
          <Fade delay={0.05}>
            <div style={{ background: c.offWhite, borderRadius: 20, padding: "32px 28px", border: `1px solid ${c.border}`, marginBottom: 32, textAlign: "left" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2 }}>Your savings</p>
                <p style={{ fontSize: 13, color: c.textMuted }}>Assumes 4 lessons/month</p>
              </div>
              <p style={{ fontSize: 14, color: c.textLight, marginBottom: 18 }}>
                Over <strong style={{ color: c.navy, fontWeight: 700 }}>{savingsMonths} {savingsMonths === 1 ? "month" : "months"}</strong> of tutoring, you save
              </p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: c.teal, lineHeight: 1.1, marginBottom: 24 }}>
                ${savings.toLocaleString("en-AU")}
              </p>
              <input
                type="range"
                min={1}
                max={12}
                step={1}
                value={savingsMonths}
                onChange={(e) => setSavingsMonths(parseInt(e.target.value, 10))}
                style={{ width: "100%", marginBottom: 6 }}
                aria-label="Months of tutoring"
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: c.textMuted, marginBottom: 24 }}>
                <span>1 month</span>
                <span>6 months</span>
                <span>12 months</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ background: c.white, borderRadius: 12, padding: "16px 18px", border: `1px solid ${c.border}` }}>
                  <p style={{ fontSize: 11, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Typical company</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: c.navy }}>${companyCost.toLocaleString("en-AU")}</p>
                  <p style={{ fontSize: 12, color: c.textLight, marginTop: 4 }}>${COMPANY_HOURLY}/hr (typical agency rate) × {LESSONS_PER_MONTH * savingsMonths} lessons</p>
                </div>
                <div style={{ background: c.tealPale, borderRadius: 12, padding: "16px 18px", border: `1px solid ${c.teal}` }}>
                  <p style={{ fontSize: 11, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>With Tuterly</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: c.navy }}>${tuterlyCost.toLocaleString("en-AU")}</p>
                  <p style={{ fontSize: 12, color: c.textLight, marginTop: 4 }}>${TUTERLY_HOURLY}/hr (avg tutor on our directory) × {LESSONS_PER_MONTH * savingsMonths} lessons + ${TUTERLY_SUB}/mo subscription</p>
                </div>
              </div>
            </div>
          </Fade>

          {/* COMPARISON TABLE */}
          <Fade delay={0.1}>
            <div style={{ background: c.white, borderRadius: 20, padding: "32px 28px", border: `1px solid ${c.border}`, marginBottom: 32, textAlign: "left" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>Tuterly vs a typical tutoring company</p>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: c.navy, lineHeight: 1.3, marginBottom: 20 }}>Everything they offer, none of the inflated price.</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1.6fr 0.7fr 0.7fr", borderTop: `1px solid ${c.border}` }}>
                <div style={{ padding: "12px 6px", fontSize: 12, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }}></div>
                <div style={{ padding: "12px 6px", fontSize: 12, fontWeight: 700, color: c.teal, textAlign: "center", textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }}>Tuterly</div>
                <div style={{ padding: "12px 6px", fontSize: 12, fontWeight: 700, color: c.textMuted, textAlign: "center", textTransform: "uppercase", letterSpacing: 1, borderBottom: `1px solid ${c.border}` }}>Tutoring company</div>
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
                    <div style={{ padding: "12px 6px", fontSize: 18, textAlign: "center", borderBottom: `1px solid ${c.border}`, color: row.tuterly ? c.teal : "#cbd5e1" }}>{row.tuterly ? "✓" : "✕"}</div>
                    <div style={{ padding: "12px 6px", fontSize: 18, textAlign: "center", borderBottom: `1px solid ${c.border}`, color: row.company ? c.teal : "#cbd5e1" }}>{row.company ? "✓" : "✕"}</div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>

          <Fade delay={0.1}>
            <div style={{ background: c.offWhite, borderRadius: 20, padding: "40px 32px", border: `1px solid ${c.border}`, textAlign: "center" }}>
              <p style={{ fontSize: 48, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: c.navy }}>$29<span style={{ fontSize: 18, color: c.textMuted, fontWeight: 400 }}>/month</span></p>
              <p style={{ fontSize: 14, color: c.textLight, marginBottom: 24, marginTop: 8 }}>Everything included. Cancel anytime.</p>
              <div style={{ display: "grid", gap: 10, textAlign: "left", marginBottom: 28 }}>
                {["7-day free trial - full access to everything", "Browse and connect with tutors from our directory", "Detailed session report after every lesson", "Progress tracking across all topics over time", "Unlimited VCAA-aligned practice question generator", "Works with any tutor - ours or your own", "Curriculum-aligned content descriptors", "No sessions in a month = no charge"].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ color: c.teal, fontSize: 13, fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: 14, color: c.textLight }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="https://app.tuterly.com.au" style={{ display: "block", padding: "14px 28px", borderRadius: 10, background: c.navy, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start 7-day free trial</a>
              <p style={{ fontSize: 12, color: c.textMuted, marginTop: 12 }}>No credit card required to start. $29/month after trial.</p>
            </div>
          </Fade>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>How it works</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>Your tutor teaches. Tuterly handles the rest.</h2>
            <p style={{ fontSize: 15, color: c.textLight, textAlign: "center", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>Here's exactly what happens before, during, and after every tutoring session.</p>
          </Fade>

          <div style={{ display: "grid", gap: 20 }}>
            {/* DURING THE SESSION */}
            <Fade>
              <div style={{ background: c.white, borderRadius: 18, border: `1px solid ${c.border}`, overflow: "hidden" }}>
                <div style={{ background: c.navy, padding: "14px 24px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: c.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: c.white }}>1</div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.white }}>During the session</p>
                </div>
                <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="features-grid">
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>🎙️</span>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 4 }}>Audio recording</p>
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>Tutors can record the session with one click. Our system automatically transcribes the audio and turns it into a structured report.</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>✍️</span>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 4 }}>Live notes and uploads</p>
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>Tutors can also type notes during or after the session, or upload photos of any working out done on paper or a whiteboard.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>

            {/* AFTER THE SESSION */}
            <Fade delay={0.1}>
              <div style={{ background: c.white, borderRadius: 18, border: `1px solid ${c.border}`, overflow: "hidden" }}>
                <div style={{ background: c.navy, padding: "14px 24px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: c.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: c.white }}>2</div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.white }}>After the session</p>
                </div>
                <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="features-grid">
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>🔔</span>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 4 }}>Automatic reminders</p>
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>Tutors receive automatic reminders to complete their session notes. No reports fall through the cracks.</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>🎯</span>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 4 }}>Topic detection and confidence ratings</p>
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>Our system detects the exact topics covered and prompts the tutor to rate your child's confidence on each subtopic, giving you a clear picture of where they stand.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>

            {/* REPORT DELIVERED */}
            <Fade delay={0.2}>
              <div style={{ background: c.white, borderRadius: 18, border: `1px solid ${c.border}`, overflow: "hidden" }}>
                <div style={{ background: c.navy, padding: "14px 24px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: c.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: c.white }}>3</div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.white }}>Report delivered to you</p>
                </div>
                <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="features-grid">
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>📋</span>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 4 }}>Detailed session report</p>
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>You receive a full report covering what was taught, how your child performed, areas to focus on, and curriculum alignment - all in plain English.</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>📊</span>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 4 }}>Progress tracking</p>
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>Confidence ratings build up over time so you can see exactly how your child is improving across every topic and subtopic.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>

            {/* PRACTICE */}
            <Fade delay={0.3}>
              <div style={{ background: c.white, borderRadius: 18, border: `1px solid ${c.border}`, overflow: "hidden" }}>
                <div style={{ background: c.navy, padding: "14px 24px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 7, background: c.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: c.white }}>4</div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.white }}>Independent practice between sessions</p>
                </div>
                <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="features-grid">
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>📝</span>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 4 }}>Auto-generated practice questions</p>
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>Practice questions are automatically generated from our VCAA-aligned question bank, based on the exact topics covered in the session. Students can practise the types of questions they found difficult on their own.</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>🚩</span>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 4 }}>Generate more and flag for review</p>
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.6 }}>Students can generate more questions in specific areas they want to work on, and flag questions they're stuck on so they can go through them with their tutor in the next session.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>


      {/* WHY NOT JUST NOTES */}
      <section style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Why not just ask for notes?</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>There's a big difference between notes and a report.</h2>
          </Fade>
          <Fade delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="features-grid">
              {/* Tutor notes */}
              <div style={{ background: c.offWhite, borderRadius: 18, border: `1px solid ${c.border}`, overflow: "hidden" }}>
                <div style={{ padding: "14px 22px", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>💬</span>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.textMuted }}>Typical tutor notes</p>
                </div>
                <div style={{ padding: "22px" }}>
                  <div style={{ background: c.white, borderRadius: 12, padding: "16px 18px", border: `1px solid ${c.border}`, marginBottom: 16 }}>
                    <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7, fontStyle: "italic" }}>"Hi Sarah, we did factorising today. Julian did pretty well. He needs to practise more with negative numbers. See you next week!"</p>
                  </div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {[
                      { icon: "✕", text: "Vague - no specific topics or subtopics", color: c.rose },
                      { icon: "✕", text: "No curriculum alignment", color: c.rose },
                      { icon: "✕", text: "No confidence tracking over time", color: c.rose },
                      { icon: "✕", text: "No practice questions or solutions", color: c.rose },
                      { icon: "✕", text: "Inconsistent - stops after a few weeks", color: c.rose },
                      { icon: "✕", text: "No way to track long-term progress", color: c.rose },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: item.color, fontWeight: 700 }}>{item.icon}</span>
                        <p style={{ fontSize: 13, color: c.textLight }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tuterly report */}
              <ComparisonReportCard />
            </div>
          </Fade>
        </div>
      </section>


      {/* PROGRESS TRACKING */}
      <section style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Progress tracking</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>Watch your child improve over time.</h2>
            <p style={{ fontSize: 15, color: c.textLight, textAlign: "center", marginBottom: 40, maxWidth: 550, margin: "0 auto 40px", lineHeight: 1.7 }}>Not just one report - a complete picture of your child's progress across every topic, every term.</p>
          </Fade>
          <Fade delay={0.12}>
            <div style={{ background: c.offWhite, borderRadius: 20, padding: 32, border: `1px solid ${c.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy }}>Julian's Progress</p>
                  <p style={{ fontSize: 13, color: c.textMuted }}>Year 10 Mathematics - 6 months</p>
                </div>
                <div style={{ background: `${c.success}15`, borderRadius: 8, padding: "6px 14px" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: c.success }}>+41% improvement</p>
                </div>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { topic: "Algebra", subtopics: [{ n: "Linear equations", before: 2, after: 5 }, { n: "Quadratic factorising", before: 1, after: 4 }, { n: "Simultaneous equations", before: 1, after: 3 }] },
                  { topic: "Measurement", subtopics: [{ n: "Area and perimeter", before: 3, after: 5 }, { n: "Surface area", before: 2, after: 4 }] },
                ].map((t, i) => (
                  <div key={i} style={{ background: c.white, borderRadius: 12, padding: "18px 20px", border: `1px solid ${c.border}` }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 12 }}>{t.topic}</p>
                    {t.subtopics.map((st, j) => (
                      <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" }}>
                        <span style={{ fontSize: 13, color: c.textLight }}>{st.n}</span>
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

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>What parents say</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Parents love knowing.</h2>
          </Fade>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { q: "The session reports are incredible - I actually know what my son is learning and where he needs help. No other tutor has given us this level of detail.", p: "James L.", c: "Year 10, Brighton Grammar" },
              { q: "My daughter's confidence in maths has completely turned around. She went from dreading it to actually asking to do extra practice.", p: "Sarah M.", c: "Year 8, Firbank Grammar" },
              { q: "The fact that the tutor knows exactly what's coming up at school - tests, SACs, everything - means the sessions are always relevant.", p: "Michelle T.", c: "Year 11, Haileybury" },
            ].map((t, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div style={{ background: c.white, borderRadius: 16, padding: "28px 24px", border: `1px solid ${c.border}`, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>{[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: c.amber, fontSize: 14 }}>★</span>)}</div>
                    <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, fontStyle: "italic" }}>"{t.q}"</p>
                  </div>
                  <div style={{ marginTop: 16, paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
                    <p style={{ fontWeight: 700, fontSize: 13, color: c.navy }}>{t.p}</p>
                    <p style={{ fontSize: 12, color: c.textMuted }}>{t.c}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SUPPORT */}
      <section style={{ padding: "80px 40px", background: c.cream }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>Two ways to find a tutor</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, marginBottom: 36, lineHeight: 1.25 }}>Choose what works best for you.</h2>
          </Fade>
          <Fade delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="grid-2">
              <div style={{ background: c.white, borderRadius: 16, padding: "28px 24px", border: `1px solid ${c.border}`, textAlign: "left" }}>
                <span style={{ fontSize: 28 }}>🔍</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginTop: 12, marginBottom: 8 }}>Browse and choose yourself</h3>
                <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, marginBottom: 16 }}>Search our directory of vetted tutors. Filter by subject, year level, location, and budget. View profiles, ratings, and past session data, then reach out directly to whoever you think is the right fit for your child.</p>
                <a href="/directory" style={{ fontSize: 14, fontWeight: 600, color: c.teal, textDecoration: "none" }}>Browse tutors →</a>
              </div>
              <div style={{ background: c.white, borderRadius: 16, padding: "28px 24px", border: `1px solid ${c.border}`, textAlign: "left" }}>
                <span style={{ fontSize: 28 }}>🤝</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginTop: 12, marginBottom: 8 }}>Let us match you</h3>
                <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, marginBottom: 16 }}>Not sure where to start? Submit a request and one of our education experts will personally find a tutor for your child based on their year level, subjects, learning style, and goals. We handle everything.</p>
                <a href="https://app.tuterly.com.au" style={{ fontSize: 14, fontWeight: 600, color: c.teal, textDecoration: "none" }}>Submit a request →</a>
              </div>
            </div>
          </Fade>
          <Fade delay={0.2}>
            <p style={{ fontSize: 14, color: c.textLight, marginTop: 24, lineHeight: 1.7 }}>Either way, every tutor on Tuterly is trained on our platform. You'll receive detailed session reports, progress tracking, and practice questions from day one.</p>
          </Fade>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Questions</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 40, lineHeight: 1.25 }}>Frequently asked.</h2>
          </Fade>
          {[
            { q: "Do I have to use a tutor from your directory?", a: "No. You can browse and connect with tutors from our directory, or invite your existing tutor to the platform. Tuterly works with any tutor, anywhere." },
            { q: "How is this different from a tutoring agency?", a: "Tutoring companies typically charge $80-100/hour and take a large cut from the tutor. On Tuterly, tutors set their own rates and you pay them directly. Your $29/month subscription gives you access to our directory, session reports, progress tracking, and practice questions. Every tutor on Tuterly is a high achiever who is trained on our platform, so you get all the structure and accountability of a tutoring company - detailed reports, progress tracking, curriculum alignment - without the inflated hourly rates." },
            { q: "Does my tutor need to sign up too?", a: "Yes, but it's free for them and takes 2 minutes. When you add your tutor's details, our team will personally reach out to them with a summary pack and offer a free info session. You don't need to explain anything." },
            { q: "What if my tutor doesn't want to use it?", a: "Most tutors love it once they see what it does. It makes them look more professional and helps them retain students. Our team will walk them through it. If they're still not interested, you can find a new tutor through our directory who already uses Tuterly." },
            { q: "Can I use the practice question generator without a tutor?", a: "Yes. Your subscription includes unlimited access to our VCAA-aligned question generator. Your child can generate practice questions in any topic, at any difficulty level, with full worked solutions." },
            { q: "What subjects are covered?", a: "All subjects from Prep to Year 12, including Mathematics, English, Sciences, Humanities, and all VCE subjects. Reports and practice questions are aligned to the Victorian Curriculum (VCAA)." },
            { q: "What if we skip a month of tutoring?", a: "If no reports are generated in a given month, you won't be charged for that month. You still have access to the directory and practice question generator." },
            { q: "Is my child's data private?", a: "Absolutely. Only you and your child's tutor can see the reports. We never share data with third parties." },
          ].map((faq, i) => (
            <Fade key={i} delay={i * 0.05}>
              <div style={{ borderBottom: `1px solid ${c.border}`, padding: "18px 0", cursor: "pointer" }} onClick={() => setExpandedQ(expandedQ === i ? null : i)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: c.navy }}>{faq.q}</p>
                  <span style={{ fontSize: 18, color: c.textMuted, transform: expandedQ === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </div>
                {expandedQ === i && <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7, marginTop: 10 }}>{faq.a}</p>}
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* FREE WORKSHEETS */}
      <section style={{ padding: "80px 40px", background: c.tealPale }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12, textAlign: "center" }}>Free practice, no subscription</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, marginBottom: 14, lineHeight: 1.25, textAlign: "center" }}>
              Year 7-10 maths worksheets your child can use today.
            </h2>
            <p style={{ fontSize: 16, color: c.textLight, lineHeight: 1.7, marginBottom: 32, textAlign: "center", maxWidth: 540, margin: "0 auto 32px" }}>
              Generate a fresh 10-question worksheet on any Victorian Curriculum topic, with fully worked solutions. Free, no signup needed for the first one.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
              {[7, 8, 9, 10].map((yr) => (
                <Link
                  key={yr}
                  href={`/worksheets#year-${yr}`}
                  style={{
                    display: "block",
                    padding: "20px 22px",
                    background: c.white,
                    border: `1px solid ${c.border}`,
                    borderRadius: 14,
                    textDecoration: "none",
                  }}
                >
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>
                    Worksheets
                  </p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 700, color: c.navy, marginBottom: 4 }}>
                    Year {yr}
                  </p>
                  <p style={{ fontSize: 12, color: c.textMuted }}>
                    13 topics
                  </p>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 18, textAlign: "center" }}>
              <Link href="/worksheets" style={{ fontSize: 14, color: c.tealDark, fontWeight: 600, textDecoration: "none" }}>
                See every Year 3-10 topic →
              </Link>
            </p>
          </Fade>
        </div>
      </section>

      {/* TALK TO US */}
      <section style={{ padding: "60px 40px", background: c.white }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Fade>
            <ContactCTA
              variant="card"
              headline="Want us to point you to the right tutor?"
              subhead="Call or message us with your child's year level and subject - we'll match them to a tutor in your area or run you through how Tuterly works."
              context="Parents landing page"
            />
          </Fade>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: "80px 40px", background: c.navy, textAlign: "center" }}>
        <Fade>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.white, marginBottom: 12, lineHeight: 1.25 }}>Find the right tutor. Know what's happening every session.</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.7 }}>Start your 7-day free trial. Browse tutors, invite your own, and see what a real session report looks like.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <a href="tel:+61426787978" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>📱 0426 787 978</a>
            <a href="mailto:admin@baysideacademics.com.au" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>📧 admin@baysideacademics.com.au</a>
          </div>
          <a href="https://app.tuterly.com.au" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start 7-day free trial →</a>
        </Fade>
      </section>

      {/* FOOTER */}
      <footer style={{ background: c.navy, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: c.white }}>T</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>tuterly</span>
          </div>
          <Link href="/tutoring" style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Areas we serve</Link>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 Tuterly by Bayside Academics</p>
        </div>
      </footer>
    </div>
  );
}
