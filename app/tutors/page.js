"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import TutorApplicationForm from "@/components/TutorApplicationForm";

// Tutors ("Apply as a tutor") landing — modern identity, matching /parents.
// PAY MESSAGING: Tuterly sets the rate (tutors do NOT set their own). We pay
// above typical tutoring-company rates + superannuation, and pay scales up
// with experience / number of students. We deliberately do NOT publish the
// exact rate here.

const c = {
  teal: "#0D9488", tealDeep: "#0F766E", tealBright: "#14B8A6", tealPale: "#ECFDFB",
  ink: "#0F172A", inkMid: "#1E293B", navy: "#0B1220",
  text: "#334155", textLight: "#64748B", textMuted: "#94A3B8",
  white: "#FFFFFF", paper: "#F7F9FC", sand: "#F1F5F9",
  border: "#E6EAF0", success: "#10B981", amber: "#F59E0B", rose: "#E05B6D",
};
const sans = "'Inter', 'Helvetica Neue', Arial, sans-serif";

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
function SectionHead({ kicker, title, sub, light = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: sub ? 20 : 44 }}>
      {kicker && <p style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: light ? c.tealBright : c.tealDeep, marginBottom: 14 }}>{kicker}</p>}
      <h2 style={{ fontWeight: 800, fontSize: 40, letterSpacing: "-1px", color: light ? c.white : c.ink, lineHeight: 1.16, maxWidth: 640 }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, color: light ? "rgba(255,255,255,0.55)" : c.textLight, lineHeight: 1.75, maxWidth: 560, marginTop: 14 }}>{sub}</p>}
    </div>
  );
}
function Ic({ name, size = 22, color = c.tealDeep }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    report: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 8.5h6M9 12h6M9 15.5h3.5" /></>,
    chart: <><path d="M4 20V6M4 20h16" /><path d="m7.5 14 3.4-3.4 2.6 2.6L18 8.5" /></>,
    pencil: <><path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z" /><path d="M14.5 6.5l3 3" /></>,
    mic: <><rect x="9.2" y="3.5" width="5.6" height="10" rx="2.8" /><path d="M6 11.5a6 6 0 0 0 12 0M12 17.5V21" /></>,
    calendar: <><rect x="4" y="5" width="16" height="15.5" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /></>,
    badge: <><circle cx="12" cy="9" r="5.2" /><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" /></>,
    chat: <><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9A1.5 1.5 0 0 1 18.5 16H9l-4 4V5.5z" /></>,
    trend: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
    check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
    x: <path d="M6 6l12 12M18 6 6 18" />,
    star: <path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L3.5 9.7l5.9-.9z" />,
  };
  return <svg {...common}>{paths[name] || paths.check}</svg>;
}

export default function TutorsLanding() {
  const [expandedQ, setExpandedQ] = useState(null);
  const scrollApply = (e) => { e.preventDefault(); document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" }); };

  const btnPrimary = { padding: "14px 28px", borderRadius: 12, background: c.teal, color: c.white, fontSize: 15, fontWeight: 700, textDecoration: "none", display: "inline-block", cursor: "pointer", border: "none", boxShadow: "0 8px 20px -6px rgba(13,148,136,0.5)" };
  const btnGhostDark = { padding: "14px 28px", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.92)", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" };

  return (
    <div style={{ fontFamily: sans, color: c.text, background: c.white, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }
        ::selection { background: ${c.tealPale}; color: ${c.ink}; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @media(max-width:768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          section { padding-left: 20px !important; padding-right: 20px !important; }
          h1 { font-size: 38px !important; }
          h2 { font-size: 30px !important; }
          nav { padding: 0 16px !important; }
          .nav-links a:not(.nav-cta) { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${c.border}`, padding: "0 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 66 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: c.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: c.tealBright }}>t</div>
            <span style={{ fontSize: 21, fontWeight: 800, color: c.ink, letterSpacing: "-0.8px" }}>tuterly</span>
          </a>
          <div className="nav-links" style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Link href="/parents" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>For parents</Link>
            <Link href="/directory" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>Find a tutor</Link>
            <Link href="/tutors" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 600, color: c.tealDeep, textDecoration: "none" }}>Become a tutor</Link>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 14px", borderRadius: 8, fontSize: 14.5, fontWeight: 500, color: c.textLight, textDecoration: "none" }}>Log in</a>
            <a className="nav-cta" href="#apply" onClick={scrollApply} style={{ padding: "10px 20px", borderRadius: 10, fontSize: 14.5, fontWeight: 600, background: c.ink, color: c.white, textDecoration: "none", marginLeft: 6 }}>Apply now</a>
          </div>
        </div>
      </nav>

      {/* HERO — dark, premium */}
      <section style={{ padding: "150px 40px 80px", background: `linear-gradient(180deg, ${c.navy} 0%, ${c.inkMid} 100%)` }}>
        <div className="hero-grid" style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: 60, alignItems: "center" }}>
          <div style={{ animation: "fadeUp 0.8s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "7px 16px", marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.tealBright }} />
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>For tutors · by Bayside Academics</p>
            </div>
            <h1 style={{ fontWeight: 800, fontSize: 52, color: c.white, lineHeight: 1.08, letterSpacing: "-1.4px", marginBottom: 22 }}>
              Better pay. Better tools.<br />Less admin.
            </h1>
            <p style={{ fontSize: 17.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 30, maxWidth: 500 }}>
              Join the Tuterly team and tutor with the tools of a premium service: session reports, progress tracking, and practice questions generated for you. We pay <strong style={{ color: "#fff" }}>above typical tutoring-company rates</strong>, your pay scales as you take on more students, and we handle all the invoicing.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#apply" onClick={scrollApply} style={btnPrimary}>Start your application →</a>
              <a href="tel:+61426787978" style={btnGhostDark}>Call 0426 787 978</a>
            </div>
          </div>
          <div style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }}>
              <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Your Tuterly dashboard</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[{ n: "8", l: "Students" }, { n: "32", l: "Sessions this month" }, { n: "4.9", l: "Rating" }, { n: "100%", l: "Reports completed" }].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                    <p style={{ fontSize: 19, fontWeight: 800, color: c.white }}>{s.n}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.l}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Recent sessions</p>
              {[{ name: "Julian M.", subject: "Year 10 Maths", status: "Report sent", ok: true }, { name: "Mia S.", subject: "Year 11 English", status: "Report sent", ok: true }, { name: "Lachlan D.", subject: "Year 9 Science", status: "Notes pending", ok: false }].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{s.name}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>{s.subject}</span>
                  </div>
                  <span style={{ fontSize: 11, color: s.ok ? c.tealBright : c.amber }}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section style={{ padding: "88px 40px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade><SectionHead kicker="Why Tuterly" title="Earn more. Do less admin." /></Fade>
          <Fade delay={0.1}>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {/* Company */}
              <div style={{ background: c.paper, borderRadius: 18, border: `1px solid ${c.border}`, overflow: "hidden" }}>
                <div style={{ padding: "14px 22px", borderBottom: `1px solid ${c.border}` }}>
                  <p style={{ fontSize: 13.5, fontWeight: 700, color: c.textMuted }}>Working for a tutoring company</p>
                </div>
                <div style={{ padding: "22px", display: "grid", gap: 11 }}>
                  {[
                    "Parent pays the company $80–100/hr",
                    "You receive around $30/hr",
                    "No pay progression",
                    "Students belong to the company, not you",
                    "You write reports manually, for free",
                    "You chase your own payments",
                  ].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 9, alignItems: "center" }}>
                      <Ic name="x" size={14} color={c.rose} />
                      <p style={{ fontSize: 13.5, color: c.textLight }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Tuterly */}
              <div style={{ background: c.ink, borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 50px -22px rgba(11,18,32,0.5)" }}>
                <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 13.5, fontWeight: 700, color: "#fff" }}>Tutoring with Tuterly</p>
                  <span style={{ background: "rgba(20,184,166,0.16)", color: c.tealBright, borderRadius: 6, padding: "2px 9px", fontSize: 10.5, fontWeight: 700 }}>YOU</span>
                </div>
                <div style={{ padding: "22px", display: "grid", gap: 11 }}>
                  {[
                    "Paid above typical tutoring-company rates",
                    "Superannuation paid on top",
                    "Your pay scales up as you take on more students",
                    "Reports generated for you in 2 minutes",
                    "We find students for you through the directory",
                    "We handle all invoicing, never chase a payment",
                  ].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 9, alignItems: "center" }}>
                      <Ic name="check" size={14} color={c.tealBright} />
                      <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* HOW PAY WORKS */}
      <section style={{ padding: "88px 40px", background: c.paper }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="How pay works" title="Paid well, and it grows." sub="We set a fair, competitive rate that's already higher than what most tutoring companies pay their tutors. From there, it goes up as you build a track record." />
          </Fade>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { icon: "check", tag: "From day one", title: "A strong starting rate", desc: "You start on a competitive hourly rate that's already above what most tutoring companies pay, plus superannuation on top." },
              { icon: "trend", tag: "As you grow", title: "Your rate scales up", desc: "Take on more students and build a track record of great sessions and happy families, and your rate increases." },
              { icon: "badge", tag: "Top tutors", title: "Our best earn our most", desc: "Our most experienced, best-rated tutors earn our highest rates, and get first pick of new students coming through the directory." },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div style={{ background: c.white, borderRadius: 18, padding: "28px 24px", border: `1px solid ${c.border}`, height: "100%" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: c.tealPale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Ic name={s.icon} size={21} />
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase", color: c.tealDeep, marginBottom: 6 }}>{s.tag}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: c.ink, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.15}>
            <div style={{ marginTop: 20, background: c.ink, borderRadius: 16, padding: "22px 26px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center", textAlign: "center" }}>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                <strong style={{ color: "#fff" }}>Superannuation is paid on top of every rate</strong>, and we handle all parent billing and invoicing, so you&apos;re paid on time and never chasing a payment.
              </p>
            </div>
          </Fade>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "88px 40px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade><SectionHead kicker="How it works" title="Start getting students in 3 steps." /></Fade>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { num: "1", title: "Apply and get verified", desc: "Send your details: subjects, year levels, qualifications, and a short bio. We review every applicant and complete the checks required to work with students." },
              { num: "2", title: "Get trained on the platform", desc: "We walk you through how Tuterly works: entering session notes, generating reports, and tracking student progress. Takes about 15 minutes." },
              { num: "3", title: "Start teaching", desc: "Parents find you in the directory and book sessions with you. After each session, enter your notes and Tuterly generates a professional report in seconds." },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div style={{ background: c.paper, borderRadius: 16, padding: "30px 24px", border: `1px solid ${c.border}`, height: "100%" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${c.teal}`, color: c.tealDeep, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, marginBottom: 16 }}>{s.num}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: c.ink, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ padding: "88px 40px", background: c.paper }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade><SectionHead kicker="What you get" title="Everything you need to run a professional tutoring business." /></Fade>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {[
              { icon: "search", title: "Listed in the Tuterly directory", desc: "Parents browse and find you by subject, year level, and location. We market the directory so students come to you." },
              { icon: "report", title: "Professional session reports", desc: "Type a few dot points or record a voice note after each session. Tuterly generates a detailed, curriculum-aligned report and sends it to the parent automatically." },
              { icon: "chart", title: "Progress tracking", desc: "Confidence ratings per subtopic build up over time. Parents see their child improving, and you have data to back up your value." },
              { icon: "pencil", title: "Practice question generator", desc: "VCAA-aligned practice questions are generated and included in every report, so students can practise exactly what they need between sessions." },
              { icon: "badge", title: "Verified tutor badge", desc: "After a run of sessions and strong parent ratings, earn a Verified badge on your profile, it builds trust and attracts more students." },
              { icon: "mic", title: "Voice-to-report", desc: "Record a quick voice note after a session; our system transcribes it and generates the full report. Faster than typing." },
              { icon: "calendar", title: "Assessment awareness", desc: "When parents upload school assessment schedules, you can see what tests are coming up and plan your sessions accordingly." },
              { icon: "chat", title: "Parent communication handled", desc: "Reports are sent automatically, no more awkward end-of-session summaries or forgotten follow-up texts." },
            ].map((f, i) => (
              <Fade key={i} delay={i * 0.05}>
                <div style={{ display: "flex", gap: 16, padding: "24px 22px", borderRadius: 16, border: `1px solid ${c.border}`, background: c.white, height: "100%" }}>
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

      {/* REFERRAL */}
      <section style={{ padding: "60px 40px", background: c.white }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade>
            <div style={{ background: c.ink, borderRadius: 20, padding: "38px 32px", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(20,184,166,0.14)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <Ic name="star" size={24} color={c.tealBright} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: c.white, marginBottom: 8, letterSpacing: "-0.4px" }}>Refer a tutor, earn a bonus</h3>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 460, margin: "0 auto" }}>Know another great tutor who&apos;d thrive on Tuterly? Refer them, and once they take on their first student, you receive a referral bonus. No limit on referrals.</p>
            </div>
          </Fade>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "88px 40px", background: c.paper }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade><SectionHead kicker="Questions" title="Frequently asked." /></Fade>
          {[
            { q: "How does pay work?", a: "Tuterly pays you a set hourly rate that's above what most tutoring companies pay their tutors, with superannuation on top. Your rate increases over time as you take on more students and build a strong track record of great sessions. We handle all parent billing and invoicing, so you're paid reliably and never have to chase a payment." },
            { q: "Do I need to pay anything to join?", a: "No. Applying, creating your profile, and getting listed in the directory is completely free. You're paid for the tutoring you do: we take care of the platform, the reports, and the invoicing." },
            { q: "Can I still work for other companies or private students?", a: "Yes. Tuterly is not exclusive. You're free to work with other tutoring companies, take on private students, or use any other platform alongside Tuterly. We're here to give you tools, better pay, and students, not to restrict how you work." },
            { q: "Can I bring my existing students onto the platform?", a: "Absolutely. You can invite your current students' parents to Tuterly so they get session reports and progress tracking. It makes your existing service feel more premium without any extra work." },
            { q: "What subjects can I tutor?", a: "All subjects from Prep to Year 12, including VCE: Mathematics, English, Sciences, Humanities, and all VCE subjects. Reports and practice are aligned to the VCAA Victorian Curriculum." },
            { q: "How do parents find me?", a: "Parents browse the Tuterly directory and filter by subject, year level, and location. We market the directory through ads and content, and as you complete more sessions and earn strong ratings, your profile becomes more visible." },
            { q: "Do you check tutors before they start?", a: "Yes. Every tutor is reviewed, and we complete the checks required to work with students (including a Working With Children Check) before you take on any student. It keeps families safe and the Tuterly bar high." },
            { q: "Can I tutor online or in person?", a: "Both. You choose your availability and format, many tutors offer both." },
          ].map((faq, i) => (
            <Fade key={i} delay={i * 0.04}>
              <div style={{ borderBottom: `1px solid ${c.border}`, padding: "18px 0", cursor: "pointer" }} onClick={() => setExpandedQ(expandedQ === i ? null : i)}>
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

      {/* APPLY */}
      <section id="apply" style={{ padding: "88px 40px", background: c.white }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Fade>
            <SectionHead kicker="Join the team" title="Apply to tutor with Tuterly" sub="Send us your details and someone from our team will reach out for a chat about your subjects, experience, and availability." />
          </Fade>
          <Fade delay={0.1}>
            <TutorApplicationForm />
          </Fade>
          <Fade delay={0.15}>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <p style={{ fontSize: 14, color: c.textLight, marginBottom: 10 }}>Prefer to talk first?</p>
              <a href="tel:+61426787978" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px", borderRadius: 12, background: c.ink, color: c.white, fontSize: 15, fontWeight: 700, textDecoration: "none" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                Call 0426 787 978
              </a>
            </div>
          </Fade>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: c.ink, borderTop: "1px solid rgba(255,255,255,0.07)", padding: "32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 7, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: c.tealBright }}>t</div>
            <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.45)" }}>tuterly</span>
          </div>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.25)" }}>© 2026 Tuterly by Bayside Academics</p>
        </div>
      </footer>
    </div>
  );
}
