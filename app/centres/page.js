"use client";
import { useState, useEffect, useRef } from "react";

const c = {
  teal: "#0ABAB5", tealLight: "#2DD4BF", tealDark: "#0D9488", tealPale: "#F0FDFA",
  navy: "#0F172A", navyMid: "#1E293B", navyLight: "#334155",
  text: "#1E293B", textLight: "#64748B", textMuted: "#94A3B8",
  white: "#FFFFFF", offWhite: "#F8FAFC", border: "#E2E8F0",
  success: "#10B981", amber: "#F59E0B", rose: "#F43F5E",
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

const centresQuestionBank = [
  [
    { q: "Factorise: x\u00B2 + 9x + 20", level: "Foundation", color: "#10B981", a: "Find two numbers that multiply to 20 and add to 9: 4 and 5.\nAnswer: (x + 4)(x + 5)" },
    { q: "Factorise: x\u00B2 + 7x + 12", level: "Foundation", color: "#10B981", a: "Find two numbers that multiply to 12 and add to 7: 3 and 4.\nAnswer: (x + 3)(x + 4)" },
    { q: "Factorise: x\u00B2 + 11x + 30", level: "Foundation", color: "#10B981", a: "Find two numbers that multiply to 30 and add to 11: 5 and 6.\nAnswer: (x + 5)(x + 6)" },
    { q: "Factorise: x\u00B2 + 8x + 15", level: "Foundation", color: "#10B981", a: "Find two numbers that multiply to 15 and add to 8: 3 and 5.\nAnswer: (x + 3)(x + 5)" },
  ],
  [
    { q: "Factorise: x\u00B2 + 2x - 15", level: "Standard", color: "#0ABAB5", a: "Find two numbers that multiply to -15 and add to +2: 5 and -3.\nAnswer: (x + 5)(x - 3)" },
    { q: "Factorise: x\u00B2 - 3x - 18", level: "Standard", color: "#0ABAB5", a: "Find two numbers that multiply to -18 and add to -3: -6 and 3.\nAnswer: (x - 6)(x + 3)" },
    { q: "Factorise: x\u00B2 + x - 12", level: "Standard", color: "#0ABAB5", a: "Find two numbers that multiply to -12 and add to +1: 4 and -3.\nAnswer: (x + 4)(x - 3)" },
    { q: "Factorise: x\u00B2 - 5x - 14", level: "Standard", color: "#0ABAB5", a: "Find two numbers that multiply to -14 and add to -5: -7 and 2.\nAnswer: (x - 7)(x + 2)" },
  ],
  [
    { q: "Solve: x\u00B2 + 3x - 18 = 0", level: "Extension", color: "#F59E0B", a: "Factorise: (x + 6)(x - 3) = 0\nx = -6 or x = 3" },
    { q: "Solve: x\u00B2 - 2x - 8 = 0", level: "Extension", color: "#F59E0B", a: "Factorise: (x - 4)(x + 2) = 0\nx = 4 or x = -2" },
    { q: "Solve: x\u00B2 + 5x - 24 = 0", level: "Extension", color: "#F59E0B", a: "Factorise: (x + 8)(x - 3) = 0\nx = -8 or x = 3" },
    { q: "Solve: x\u00B2 - x - 20 = 0", level: "Extension", color: "#F59E0B", a: "Factorise: (x - 5)(x + 4) = 0\nx = 5 or x = -4" },
  ],
];

export default function CentresLanding() {
  const [expandedQ, setExpandedQ] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [reportExpanded, setReportExpanded] = useState({});
  const [reportQIndices, setReportQIndices] = useState({ 0: 0, 1: 0, 2: 0 });

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: c.text, background: c.white, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }
        ::selection { background: ${c.tealPale}; color: ${c.navy}; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media(max-width:768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .stats-row { grid-template-columns: 1fr 1fr !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          h1 { font-size: 32px !important; }
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
            <a href="/worksheets" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Free Worksheets</a>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Log in</a>
            <a href="#book-demo" onClick={(e) => { e.preventDefault(); document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: c.navy, color: c.white, textDecoration: "none" }}>Book a demo</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "140px 40px 80px", background: `linear-gradient(180deg, ${c.navy} 0%, ${c.navyMid} 100%)` }}>
        <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 60, alignItems: "center" }}>
          <div style={{ animation: "fadeUp 0.8s ease" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>For Tutoring Centres</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 46, color: c.white, lineHeight: 1.15, marginBottom: 20 }}>Know what every tutor on your team is actually doing.</h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 32, maxWidth: 500 }}>Tuterly gives your tutoring centre structured session reports, parent-facing dashboards, and quality visibility across your entire team. Your parents stay informed. Your tutors stay accountable. You keep growing.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <a href="#book-demo" onClick={(e) => { e.preventDefault(); document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: "14px 28px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Book a free demo</a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: "14px 28px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>See how it works</a>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Free 30-day trial. No setup cost. No lock-in.</p>
          </div>
          <div style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            {/* Admin dashboard preview */}
            <div style={{ background: c.navyMid, borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>Team Overview</p>
                <span style={{ fontSize: 11, color: c.teal, fontWeight: 600 }}>This week</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[{ n: "42", l: "Sessions" }, { n: "38", l: "Reports sent" }, { n: "94%", l: "Parent open rate" }].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: c.white }}>{s.n}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.l}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Tutor activity</p>
              {[{ name: "Sarah T.", sessions: 12, reports: 12, status: "All complete" }, { name: "James W.", sessions: 10, reports: 9, status: "1 pending" }, { name: "Emily K.", sessions: 8, reports: 8, status: "All complete" }].map((t, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: `${c.teal}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: c.teal }}>{t.name.charAt(0)}</div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{t.name}</span>
                  </div>
                  <span style={{ fontSize: 11, color: t.status === "All complete" ? c.success : c.amber }}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TUTERLY DOES */}
      <section style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>What Tuterly does for your centre</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Give your families something no other centre offers.</h2>
          </Fade>
          <div style={{ display: "grid", gap: 16 }}>
            {[
              { num: "1", title: "Parents stay because they can see it working", desc: "After every session, parents receive a detailed report covering what was taught, how their child performed, and what to focus on next. When parents can see progress, they stay.", icon: "📊" },
              { num: "2", title: "Offer a premium experience without extra admin", desc: "Session reports, progress tracking, and curriculum-aligned practice questions are generated automatically from your tutors' notes. It takes under 2 minutes per session and the output is professional.", icon: "⚡" },
              { num: "3", title: "Consistent quality across your entire team", desc: "Every tutor follows the same structured process. Every parent receives the same high-quality report. Your centre delivers a consistent experience regardless of which tutor the student sees.", icon: "✅" },
              { num: "4", title: "Real data to show your impact", desc: "Track student confidence across topics over time. Use aggregate improvement data in your marketing, parent information nights, and conversations with prospective families.", icon: "📈" },
              { num: "5", title: "Seamless onboarding for new tutors", desc: "When a new tutor joins your team, they can review past session reports for any student they're taking over. Full context from day one instead of starting blind.", icon: "🔄" },
            ].map((item, i) => (
              <Fade key={i} delay={i * 0.08}>
                <div style={{ background: c.white, borderRadius: 16, padding: "28px 28px", border: `1px solid ${c.border}`, display: "flex", gap: 20, alignItems: "start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: c.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: c.white, flexShrink: 0 }}>{item.num}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: c.navy }}>{item.title}</h3>
                    </div>
                    <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>How it works</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Set up in a day. Results from week one.</h2>
          </Fade>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { step: "1", title: "You sign up and invite your tutors", desc: "Create your centre's account, add your tutors via email. They each get their own login and student list." },
              { step: "2", title: "Tutors add their students", desc: "Each tutor adds their students with year level, school, and subjects. Parents can be invited to view reports." },
              { step: "3", title: "After each session, tutors enter notes", desc: "Record the session, type dot points, or upload photos of working out. Takes under 2 minutes." },
              { step: "4", title: "Reports generated and sent automatically", desc: "The system generates a curriculum-aligned report with confidence ratings and practice questions. Parents receive it instantly." },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.08}>
                <div style={{ background: c.offWhite, borderRadius: 16, padding: "28px 24px", border: `1px solid ${c.border}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: c.white, marginBottom: 14 }}>{s.step}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: c.navy, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ADMIN DASHBOARD FEATURES */}
      <section style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Your dashboard</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Everything you need to run a better centre.</h2>
          </Fade>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[
              { icon: "👥", title: "Team overview", desc: "See every tutor, their students, and session completion at a glance. Spot gaps instantly." },
              { icon: "📋", title: "All reports in one place", desc: "Read every report generated by every tutor. Search by student, date, or subject." },
              { icon: "📊", title: "Performance metrics", desc: "Which tutors generate the most thorough reports? Whose students improve the most? Now you know." },
              { icon: "🔔", title: "Automated reminders", desc: "Tutors get automatic nudges to submit their session notes. No more chasing." },
              { icon: "📈", title: "Aggregate analytics", desc: "'Our students improved an average of 35% this term.' Real stats for marketing and parent nights." },
              { icon: "🎨", title: "Your branding", desc: "Reports go out with your centre's name and colours. Parents see your brand, not ours." },
            ].map((f, i) => (
              <Fade key={i} delay={i * 0.06}>
                <div style={{ background: c.white, borderRadius: 14, padding: "24px 20px", border: `1px solid ${c.border}` }}>
                  <span style={{ fontSize: 26 }}>{f.icon}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: c.navy, marginTop: 10, marginBottom: 6 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>{f.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>The maths</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>It pays for itself with one student.</h2>
          </Fade>
          <Fade delay={0.1}>
            <div style={{ background: c.offWhite, borderRadius: 20, padding: "36px 32px", border: `1px solid ${c.border}` }}>
              <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy, marginBottom: 16 }}>Without Tuterly</p>
                  <div style={{ display: "grid", gap: 10 }}>
                    {[
                      { l: "Average student retention", v: "6 months" },
                      { l: "Lifetime value per student", v: "$3,840" },
                      { l: "Parents who leave without feedback", v: "Most" },
                      { l: "Premium tier revenue", v: "$0" },
                    ].map((r, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${c.border}` }}>
                        <span style={{ fontSize: 13, color: c.textLight }}>{r.l}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: c.textMuted }}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.teal, marginBottom: 16 }}>With Tuterly</p>
                  <div style={{ display: "grid", gap: 10 }}>
                    {[
                      { l: "Average student retention", v: "12+ months", highlight: true },
                      { l: "Lifetime value per student", v: "$7,680+", highlight: true },
                      { l: "Parents who feel informed", v: "100%" },
                      { l: "Premium tier revenue (10 students)", v: "$800/month", highlight: true },
                    ].map((r, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${c.border}` }}>
                        <span style={{ fontSize: 13, color: c.textLight }}>{r.l}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: r.highlight ? c.teal : c.text }}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 24, padding: "16px 20px", background: c.tealPale, borderRadius: 12, textAlign: "center" }}>
                <p style={{ fontSize: 14, color: c.navy, fontWeight: 600 }}>Tuterly costs less than one tutoring session per month. The extra retention and premium pricing pays for it many times over.</p>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* WHAT PARENTS SEE */}
      <section style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>What parents see</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>This is what keeps parents coming back.</h2>
            <p style={{ fontSize: 15, color: c.textLight, textAlign: "center", marginBottom: 40, lineHeight: 1.7 }}>A real session report generated from a tutor's quick notes. Try clicking the solutions and generating new questions.</p>
          </Fade>
          <Fade delay={0.15}>
            <div style={{ background: c.white, borderRadius: 20, border: `1px solid ${c.border}`, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.06)" }}>
              <div style={{ background: c.navy, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ color: c.teal, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>Session Report</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>powered by tuterly</p>
                </div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>May 5, 2026</p>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                  {[{ l: "Student", v: "Julian M." }, { l: "Year Level", v: "Year 10" }, { l: "Subject", v: "Mathematics" }, { l: "Tutor", v: "Sarah T." }].map((item, i) => (
                    <div key={i}><p style={{ fontSize: 10, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>{item.l}</p><p style={{ fontSize: 14, fontWeight: 600, color: c.navy }}>{item.v}</p></div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 14, marginBottom: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 6 }}>What We Covered</p>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>Today's session focused on factorising quadratic expressions, building on last week's work with expanding brackets. We reviewed the connection between expanding and factorising as inverse operations, then moved into monic quadratics. Julian worked through exercises from Cambridge Essential Maths 10, Chapter 5 (5C and 5D), progressing from positive constant terms to expressions with negative constants.</p>
                </div>
                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 14, marginBottom: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 6 }}>How Julian Went</p>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>Julian demonstrated strong conceptual understanding for positive constant terms and was able to work independently by the midpoint of the session. Negative constant terms still need more practice - he tends to forget that one factor must be negative when the constant term is negative. Good progress overall.</p>
                </div>
                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 14, marginBottom: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 10 }}>Topic Confidence</p>
                  {[{ t: "Expanding brackets (review)", r: 5 }, { t: "Factorising monic quadratics (positive)", r: 4 }, { t: "Factorising monic quadratics (negative)", r: 3 }, { t: "Solving quadratics by factorising", r: 3 }].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0" }}>
                      <span style={{ fontSize: 13, color: c.textLight }}>{item.t}</span>
                      <div style={{ display: "flex", gap: 3 }}>{[1, 2, 3, 4, 5].map(v => <div key={v} style={{ width: 10, height: 10, borderRadius: 3, background: v <= item.r ? c.teal : `${c.teal}20` }} />)}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 14, marginBottom: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 8 }}>Areas to Focus On</p>
                  {["Review factor pairs for numbers up to 50 with one negative factor", "Complete Exercise 5D Q1-10 and 5E Q1-5 in Cambridge textbook", "Practise identifying sign patterns: positive product = same signs, negative product = different signs"].map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, alignItems: "start", marginBottom: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.teal, marginTop: 6, flexShrink: 0 }} />
                      <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.5 }}>{a}</p>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 12 }}>Practice Questions</p>
                  <div style={{ display: "grid", gap: 8 }}>
                    {centresQuestionBank.map((bank, i) => {
                      const qi = reportQIndices[i] || 0;
                      const question = bank[qi];
                      return (
                        <div key={i} style={{ background: c.offWhite, borderRadius: 10, padding: "12px 14px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: c.navy }}>{question.q}</p>
                            <span style={{ fontSize: 10, fontWeight: 600, color: question.color, background: `${question.color}15`, padding: "2px 8px", borderRadius: 10, flexShrink: 0, marginLeft: 8 }}>{question.level}</span>
                          </div>
                          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <button onClick={() => setReportExpanded(p => ({ ...p, [i]: !p[i] }))} style={{ fontSize: 12, color: c.teal, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                              {reportExpanded[i] ? "Hide solution ▴" : "View solution ▾"}
                            </button>
                            <button onClick={() => { setReportQIndices(p => ({ ...p, [i]: ((p[i] || 0) + 1) % bank.length })); setReportExpanded(p => ({ ...p, [i]: false })); }} style={{ fontSize: 11, color: c.textMuted, fontWeight: 600, background: "none", border: `1px solid ${c.border}`, borderRadius: 6, cursor: "pointer", padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                              ↻ New question
                            </button>
                          </div>
                          {reportExpanded[i] && (
                            <div style={{ marginTop: 8, padding: "10px 12px", background: c.white, borderRadius: 6, border: `1px solid ${c.border}` }}>
                              <p style={{ fontSize: 12, color: c.textLight, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{question.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* TESTIMONIAL / CASE STUDY */}
      <section style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <Fade>
            <div style={{ background: c.offWhite, borderRadius: 20, padding: "40px 36px", border: `1px solid ${c.border}` }}>
              <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 16 }}>{[1, 2, 3, 4, 5].map(s => <span key={s} style={{ color: c.amber, fontSize: 18 }}>★</span>)}</div>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: c.navy, lineHeight: 1.5, marginBottom: 20, fontStyle: "italic" }}>"We introduced session reports to our families and saw parent retention increase significantly within the first term. Parents tell us it's the main reason they stay."</p>
              <p style={{ fontWeight: 700, fontSize: 15, color: c.navy }}>Bayside Academics</p>
              <p style={{ fontSize: 13, color: c.textMuted }}>Brighton, VIC - 20+ tutors</p>
            </div>
          </Fade>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Pricing</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Simple pricing that scales with your team.</h2>
          </Fade>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { name: "Starter", price: "$49", period: "/month", desc: "Up to 5 tutors", features: ["Session reports for all students", "Parent dashboard access", "Tutor reminders", "Basic analytics", "Email support"], cta: "Start free trial", primary: false },
              { name: "Growth", price: "$99", period: "/month", desc: "Up to 15 tutors", features: ["Everything in Starter", "Admin dashboard", "Tutor performance metrics", "Aggregate analytics", "Your branding on reports", "Priority support"], cta: "Start free trial", primary: true },
              { name: "Enterprise", price: "Custom", period: "", desc: "Unlimited tutors", features: ["Everything in Growth", "White-label platform", "Custom domain", "API access", "Dedicated account manager", "Custom integrations"], cta: "Book a demo", primary: false },
            ].map((plan, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div style={{ background: plan.primary ? c.navy : c.white, borderRadius: 18, padding: "32px 24px", border: plan.primary ? `2px solid ${c.teal}` : `1px solid ${c.border}`, position: "relative", height: "100%" }}>
                  {plan.primary && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: c.teal, borderRadius: 12, padding: "4px 14px", fontSize: 10, fontWeight: 700, color: c.white, textTransform: "uppercase", letterSpacing: 1 }}>Most popular</div>}
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: plan.primary ? c.teal : c.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{plan.name}</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: plan.primary ? c.white : c.navy }}>{plan.price}<span style={{ fontSize: 14, fontWeight: 400, color: plan.primary ? "rgba(255,255,255,0.5)" : c.textMuted }}>{plan.period}</span></p>
                  <p style={{ fontSize: 13, color: plan.primary ? "rgba(255,255,255,0.5)" : c.textLight, marginBottom: 20 }}>{plan.desc}</p>
                  <div style={{ display: "grid", gap: 8, marginBottom: 24 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: c.teal, fontWeight: 700 }}>✓</span>
                        <span style={{ fontSize: 13, color: plan.primary ? "rgba(255,255,255,0.7)" : c.textLight }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#book-demo" onClick={(e) => { e.preventDefault(); document.getElementById('book-demo')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ display: "block", textAlign: "center", padding: "12px", borderRadius: 10, background: plan.primary ? c.teal : "transparent", border: plan.primary ? "none" : `2px solid ${c.border}`, color: plan.primary ? c.white : c.navy, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>{plan.cta}</a>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.3}>
            <p style={{ textAlign: "center", fontSize: 13, color: c.textMuted, marginTop: 20 }}>All plans include a 30-day free trial. No credit card required. No lock-in contracts.</p>
          </Fade>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Questions</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 40, lineHeight: 1.25 }}>Frequently asked.</h2>
          </Fade>
          {[
            { q: "How long does it take to set up?", a: "Under an hour. Create your account, invite your tutors via email, and they can start adding session notes immediately. No technical setup required." },
            { q: "Will my tutors actually use it?", a: "It takes under 2 minutes per session. They record, type dot points, or snap a photo. Most tutors prefer it to writing manual notes because the system generates a professional report they'd never have time to write themselves." },
            { q: "Can parents see reports for free?", a: "Yes. Parents get free access to view their child's reports and progress dashboard. You decide whether to offer this as a free value-add or charge a premium for it." },
            { q: "What subjects and year levels are supported?", a: "All subjects from Prep to Year 12, aligned to the VCAA Victorian Curriculum. VCE subjects including Methods, Specialist, General Maths, and English are all covered." },
            { q: "Can I try it before committing?", a: "Absolutely. Every plan includes a 30-day free trial with full features. Pick 3-5 students, run it for a month, and see what your parents say." },
            { q: "Is my centre's data private?", a: "Yes. Each centre's data is completely isolated. Your tutors, students, and reports are only visible to your team and the relevant parents." },
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

      {/* BOOK DEMO CTA */}
      <section id="book-demo" style={{ padding: "80px 40px", background: c.navy, textAlign: "center" }}>
        <Fade>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Get started</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.white, marginBottom: 12, lineHeight: 1.25 }}>See what Tuterly can do for your centre.</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.7 }}>Book a free 15-minute demo. We'll show you the platform, answer your questions, and set you up with a 30-day trial.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
            <a href="tel:0426787978" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>📱 0426 787 978</a>
            <a href="mailto:admin@baysideacademics.com.au?subject=Tuterly Demo Request" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>📧 admin@baysideacademics.com.au</a>
          </div>
          <a href="mailto:admin@baysideacademics.com.au?subject=Tuterly Demo Request&body=Hi, I'd like to book a demo of Tuterly for my tutoring centre.%0A%0ACentre name:%0ANumber of tutors:%0APhone number:" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Book a free demo →</a>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 16 }}>Or start your 30-day free trial at <a href="https://app.tuterly.com.au" style={{ color: c.teal, textDecoration: "none" }}>app.tuterly.com.au</a></p>
        </Fade>
      </section>

      {/* FOOTER */}
      <footer style={{ background: c.navy, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: c.white }}>T</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>tuterly</span>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 Tuterly by Bayside Academics</p>
        </div>
      </footer>
    </div>
  );
}
