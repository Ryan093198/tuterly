"use client";
import { useState, useEffect, useRef } from "react";

const c = {
  teal: "#0ABAB5", tealLight: "#2DD4BF", tealDark: "#0D9488", tealPale: "#F0FDFA",
  navy: "#0F172A", navyMid: "#1E293B", navyLight: "#334155",
  text: "#1E293B", textLight: "#64748B", textMuted: "#94A3B8",
  white: "#FFFFFF", offWhite: "#F8FAFC", border: "#E2E8F0",
  success: "#10B981", amber: "#F59E0B",
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

export default function TutorsLanding() {
  const [expandedQ, setExpandedQ] = useState(null);
  const [students, setStudents] = useState(10);

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: c.text, background: c.white, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }
        ::selection { background: ${c.tealPale}; color: ${c.navy}; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 3px; background: ${c.border}; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: ${c.teal}; cursor: pointer; }
        @media(max-width:768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
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
            <a href="/parents" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>For Parents</a>
            <a href="/directory" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Find a Tutor</a>
            <a href="/centres" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>For Centres</a>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 16px", borderRadius: 8, fontSize: 14, fontWeight: 600, color: c.textLight, textDecoration: "none" }}>Log in</a>
            <a href="https://app.tuterly.com.au" style={{ padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: c.navy, color: c.white, textDecoration: "none" }}>Join as a tutor</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: "140px 40px 80px", background: `linear-gradient(180deg, ${c.navy} 0%, ${c.navyMid} 100%)` }}>
        <div className="hero-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 60, alignItems: "center" }}>
          <div style={{ animation: "fadeUp 0.8s ease" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>For Tutors</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 46, color: c.white, lineHeight: 1.15, marginBottom: 20 }}>Set your own rates. Equipped with the tools of a premium service.</h1>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 32, maxWidth: 500 }}>Join the Tuterly team, set your own hourly rate, and get access to professional tools that make you stand out. Session reports, progress tracking, and curriculum-aligned practice questions - all generated in under 2 minutes. We handle the invoicing, you focus on teaching.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
              <a href="https://app.tuterly.com.au" style={{ padding: "14px 28px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Join for free</a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }} style={{ padding: "14px 28px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>See how it works</a>
            </div>
          </div>
          <div style={{ animation: "fadeUp 0.8s ease 0.2s both" }}>
            <div style={{ background: c.navyMid, borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Your Tuterly Dashboard</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[{ n: "8", l: "Students" }, { n: "32", l: "Sessions this month" }, { n: "4.9", l: "Rating" }, { n: "100%", l: "Reports completed" }].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.white }}>{s.n}</p>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.l}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Recent sessions</p>
              {[{ name: "Julian M.", subject: "Year 10 Maths", status: "Report sent" }, { name: "Mia S.", subject: "Year 11 English", status: "Report sent" }, { name: "Lachlan D.", subject: "Year 9 Science", status: "Notes pending" }].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{s.name}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>{s.subject}</span>
                  </div>
                  <span style={{ fontSize: 11, color: s.status === "Report sent" ? c.success : c.amber }}>{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Why Tuterly</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Earn more. Do less admin.</h2>
          </Fade>
          <Fade delay={0.1}>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: c.offWhite, borderRadius: 18, border: `1px solid ${c.border}`, overflow: "hidden" }}>
                <div style={{ padding: "14px 22px", borderBottom: `1px solid ${c.border}` }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.textMuted }}>Working for a tutoring company</p>
                </div>
                <div style={{ padding: "22px" }}>
                  <div style={{ display: "grid", gap: 10 }}>
                    {[
                      { icon: "✕", text: "Parent pays $80-100/hr to the company", color: "#F43F5E" },
                      { icon: "✕", text: "You receive $30/hr", color: "#F43F5E" },
                      { icon: "✕", text: "Company controls your schedule", color: "#F43F5E" },
                      { icon: "✕", text: "No say in your rates", color: "#F43F5E" },
                      { icon: "✕", text: "Students belong to the company, not you", color: "#F43F5E" },
                      { icon: "✕", text: "You write reports manually for free", color: "#F43F5E" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: item.color, fontWeight: 700 }}>{item.icon}</span>
                        <p style={{ fontSize: 13, color: c.textLight }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ background: c.tealPale, borderRadius: 18, border: `2px solid ${c.teal}`, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", top: 12, right: 14, background: c.teal, borderRadius: 12, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: c.white, textTransform: "uppercase", letterSpacing: 1 }}>Tuterly</div>
                <div style={{ padding: "14px 22px", borderBottom: `1px solid ${c.teal}30` }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: c.navy }}>Tutoring with Tuterly</p>
                </div>
                <div style={{ padding: "22px" }}>
                  <div style={{ display: "grid", gap: 10 }}>
                    {[
                      { icon: "✓", text: "You set your own rate" },
                      { icon: "✓", text: "We handle invoicing and parent billing" },
                      { icon: "✓", text: "You control your schedule" },
                      { icon: "✓", text: "Professional reports generated in 2 minutes" },
                      { icon: "✓", text: "Small platform commission - you still earn significantly more" },
                      { icon: "✓", text: "We find students for you through our directory" },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: c.teal, fontWeight: 700 }}>{item.icon}</span>
                        <p style={{ fontSize: 13, color: c.navy, fontWeight: 500 }}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* INCOME CALCULATOR */}
      <section style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>The maths</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 40, lineHeight: 1.25 }}>See what you could be earning.</h2>
          </Fade>
          <Fade delay={0.1}>
            <div style={{ background: c.white, borderRadius: 20, padding: "36px 32px", border: `1px solid ${c.border}`, boxShadow: "0 8px 32px rgba(0,0,0,0.04)" }}>
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: c.navy }}>Number of weekly students</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.teal }}>{students}</p>
                </div>
                <input type="range" min="0" max="20" value={students} onChange={(e) => setStudents(parseInt(e.target.value))} style={{ width: "100%" }} />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: c.textMuted, marginTop: 4 }}>
                  <span>0</span><span>20</span>
                </div>
              </div>

              {students === 0 ? (
                <div style={{ background: c.tealPale, borderRadius: 12, padding: "24px 20px", textAlign: "center", border: `1px solid ${c.teal}30` }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: c.navy, marginBottom: 8 }}>$0/month</p>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>Create your profile, get listed in the directory, and start earning at your own rates!</p>
                </div>
              ) : (<>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                <div style={{ background: c.offWhite, borderRadius: 12, padding: "16px", textAlign: "center" }}>
                  <p style={{ fontSize: 11, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>At a tutoring company</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: c.textMuted }}>${(students * 30 * 4).toLocaleString()}</p>
                  <p style={{ fontSize: 11, color: c.textMuted }}>per month (at $30/hr - typical pay at a tutoring company)</p>
                </div>
                <div style={{ background: c.tealPale, borderRadius: 12, padding: "16px", textAlign: "center", border: `1px solid ${c.teal}30` }}>
                  <p style={{ fontSize: 11, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>With Tuterly</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: c.teal }}>${(students * 55 * 4).toLocaleString()}</p>
                  <p style={{ fontSize: 11, color: c.tealDark }}>per month (at $55/hr net after commission)</p>
                </div>
              </div>

              <div style={{ background: c.navy, borderRadius: 12, padding: "16px 20px", textAlign: "center" }}>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Extra income with Tuterly</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: c.success }}>+${(students * 55 * 4 - students * 30 * 4).toLocaleString()}/month</p>
              </div>
              </>)}
            </div>
          </Fade>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "80px 40px", background: c.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>How it works</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Start getting students in 3 steps.</h2>
          </Fade>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { num: "1", title: "Create your profile", desc: "Sign up for free. Add your subjects, year levels, qualifications, rate, and a short bio. We'll review and approve your profile within 24 hours." },
              { num: "2", title: "Get trained on the platform", desc: "We'll walk you through how Tuterly works - how to enter session notes, generate reports, and track student progress. Takes about 15 minutes." },
              { num: "3", title: "Start teaching", desc: "Parents find you in the directory and book sessions at your rate. After each session, enter your notes and Tuterly generates a professional report in seconds." },
            ].map((s, i) => (
              <Fade key={i} delay={i * 0.1}>
                <div style={{ background: c.offWhite, borderRadius: 16, padding: "32px 24px", border: `1px solid ${c.border}`, height: "100%" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${c.teal}, ${c.tealLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: c.white, marginBottom: 16 }}>{s.num}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: c.navy, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: c.textLight, lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ padding: "80px 40px", background: c.offWhite }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Fade>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>What you get</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 48, lineHeight: 1.25 }}>Everything you need to run a professional tutoring business.</h2>
          </Fade>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "🔍", title: "Listed in the Tuterly directory", desc: "Parents browse our directory and find you based on subject, year level, location, and rate. We market the directory so students come to you." },
              { icon: "📋", title: "Professional session reports", desc: "Type a few dot points or record a voice note after each session. Tuterly generates a detailed, curriculum-aligned report that gets sent to the parent automatically." },
              { icon: "📊", title: "Progress tracking", desc: "Confidence ratings per subtopic build up over time. Parents see their child improving. You have data to back up your value." },
              { icon: "📝", title: "Practice question generator", desc: "VCAA-aligned practice questions are generated and included in every report. Students can practise between sessions on exactly what they need." },
              { icon: "🎓", title: "Verified tutor badge", desc: "After 50+ sessions and a strong parent rating, earn a Verified badge on your profile. This builds trust and attracts more students." },
              { icon: "🎙️", title: "Voice-to-report", desc: "Record a quick voice note after the session. Our system transcribes it and generates the full report. Faster than typing." },
              { icon: "📅", title: "Assessment awareness", desc: "When parents upload school assessment schedules, you can see what tests are coming up and plan your sessions accordingly." },
              { icon: "💬", title: "Parent communication handled", desc: "Reports are sent automatically. No more awkward end-of-session summaries or forgotten follow-up texts." },
            ].map((f, i) => (
              <Fade key={i} delay={i * 0.06}>
                <div style={{ display: "flex", gap: 16, padding: "24px 20px", borderRadius: 14, border: `1px solid ${c.border}`, background: c.white }}>
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

      {/* REFERRAL */}
      <section style={{ padding: "60px 40px", background: c.white }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Fade>
            <div style={{ background: `linear-gradient(135deg, ${c.navy}, ${c.navyMid})`, borderRadius: 20, padding: "36px 32px", textAlign: "center" }}>
              <span style={{ fontSize: 32 }}>🎁</span>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: c.white, marginTop: 12, marginBottom: 8 }}>Refer a tutor, earn $10</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 450, margin: "0 auto" }}>Know another tutor who'd benefit from Tuterly? Refer them to the platform, and once they sign their first student, you'll receive a $10 bonus. No limit on referrals.</p>
            </div>
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
            { q: "Do I need to pay anything to join?", a: "No. Signing up, creating your profile, and getting listed in the directory is completely free. We take a small commission per session once you start teaching, but you'll still earn significantly more than you would at a tutoring company. We handle all invoicing so you never have to chase payments." },
            { q: "Do I set my own rates?", a: "Yes. You choose your hourly rate and parents pay you directly. Tuterly doesn't take a percentage of your tutoring income. If you're not sure what to charge, our education adviser can help recommend a suitable rate based on your experience, qualifications, and the subjects you teach." },
            { q: "Can I still work for other companies?", a: "Yes, absolutely. Tuterly is not exclusive. You're free to work with other tutoring companies, take on private students, or use any other platform alongside Tuterly. We're here to give you tools and help you find students, not to restrict how you run your business." },
            { q: "Can I bring my existing students onto the platform?", a: "Absolutely. You can invite your current students' parents to Tuterly so they get session reports and progress tracking. This makes your existing service more premium without extra effort." },
            { q: "What subjects can I tutor?", a: "All subjects from Prep to Year 12, including VCE. The platform supports Mathematics, English, Sciences, Humanities, and all VCE subjects. Reports are aligned to the VCAA Victorian Curriculum." },
            { q: "How do parents find me?", a: "Parents browse the Tuterly directory and filter by subject, year level, location, and rate. We also market the directory through ads and content. As you complete more sessions and earn ratings, your profile becomes more visible." },
            { q: "What's the referral program?", a: "Refer another tutor to join Tuterly. Once they sign their first student, you receive a $10 bonus. There's no limit on how many tutors you can refer." },
            { q: "Can I tutor online or in-person?", a: "Both. You choose your availability and format. Many tutors offer both options and adjust their rates accordingly." },
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

      {/* CTA */}
      <section style={{ padding: "80px 40px", background: c.navy, textAlign: "center" }}>
        <Fade>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.white, marginBottom: 12, lineHeight: 1.25 }}>Ready to take control of your tutoring business?</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 24px", lineHeight: 1.7 }}>Join for free, set your rates, and let Tuterly handle the reporting, tracking, and parent communication.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
            <a href="tel:0426787978" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>📱 0426 787 978</a>
            <a href="mailto:admin@baysideacademics.com.au" style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.6)", fontSize: 14, textDecoration: "none" }}>📧 admin@baysideacademics.com.au</a>
          </div>
          <a href="https://app.tuterly.com.au" style={{ display: "inline-block", padding: "14px 32px", borderRadius: 10, background: c.teal, color: c.white, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Join as a tutor - it's free</a>
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
