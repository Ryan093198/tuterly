"use client";

import { useState } from "react";
import Fade from "./Fade";
import { c } from "./theme";

// Mock session-report card used on /parents and the suburb landing
// pages to show parents what they'll receive after every session.
// Self-contained: owns the practice-question expand/regenerate state
// internally so it can be dropped into any page without prop wiring.
//
// Two presets:
//   - "math-quadratics"     (default) factorising quadratics, used on
//                           /parents and the suburb pages
//   - "selective-numerical" numerical reasoning practice, used on the
//                           selective-entry / scholarship prep pages
//
// Each preset is a self-contained content block — change copy here
// without touching the rendering code.

const PRESETS = {
  "math-quadratics": {
    date: "April 28, 2026",
    studentInfo: [
      { l: "Student", v: "Julian M." },
      { l: "Year Level", v: "Year 10" },
      { l: "Subject", v: "Mathematics" },
      { l: "Tutor", v: "Ryan" },
    ],
    whatCoveredTitle: "What We Covered Today",
    whatCoveredBody:
      "Today's session focused on factorising quadratic expressions. We started by reviewing how to expand brackets, then moved into factorising monic quadratics where the leading coefficient is 1. We worked through several examples from Chapter 5 of the Cambridge Essential Maths 10 textbook, progressing from simple positive constant terms to expressions with negative constants.",
    howWentTitle: "How Julian Went",
    howWentBody:
      "Julian engaged well throughout the session and showed strong conceptual understanding. He was able to factorise standard monic quadratics independently by the end. He still needs practice with negative constant terms — specifically identifying factor pairs where one factor is negative.",
    topicConfidence: [
      { t: "Expanding brackets", r: 5 },
      { t: "Factorising monic (positive)", r: 4 },
      { t: "Factorising with negatives", r: 3 },
      { t: "Solving by factorising", r: 3 },
    ],
    areasToFocus: [
      "Review factor pairs for numbers up to 50 with one negative factor",
      "Practice factorising expressions with negative constant terms",
      "Attempt Exercise 5D Q1-10 in the Cambridge textbook",
    ],
    questionBank: {
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
    },
  },

  "selective-numerical": {
    date: "May 12, 2026",
    studentInfo: [
      { l: "Student", v: "Mia P." },
      { l: "Year Level", v: "Year 8" },
      { l: "Subject", v: "Selective entry prep" },
      { l: "Tutor", v: "Sarah" },
    ],
    whatCoveredTitle: "What We Covered Today",
    whatCoveredBody:
      "Today's session focused on numerical reasoning practice for the selective entry exam. We worked through ratio and proportion problems, percentage word problems, and number-sequence patterns. The emphasis was on speed — selective entry questions are time-pressured — and on recognising the underlying pattern even when the question is dressed up in unfamiliar language.",
    howWentTitle: "How Mia Went",
    howWentBody:
      "Mia worked confidently through the foundation and standard ratio questions and her speed has improved noticeably week-on-week. She still needs work on multi-step word problems where information has to be combined from two separate clues — she tends to focus on the most prominent number and miss the secondary constraint.",
    topicConfidence: [
      { t: "Ratio and proportion", r: 5 },
      { t: "Percentages", r: 4 },
      { t: "Number sequences", r: 4 },
      { t: "Multi-step word problems", r: 3 },
    ],
    areasToFocus: [
      "Daily timed practice — ten numerical-reasoning questions in twelve minutes",
      "Multi-step word problems: identify both clues before solving",
      "Past EduTest numerical reasoning paper, sections 3 and 4",
    ],
    questionBank: {
      foundation: [
        { q: "3, 7, 15, 31, ___ — what's the next number?", a: "Each term doubles the previous and adds 1.\n3 → 7 (×2 + 1), 7 → 15, 15 → 31, 31 → 63.\nAnswer: 63" },
        { q: "A jacket costs $80. It's marked down by 25%. What's the new price?", a: "25% of $80 = $20.\n$80 − $20 = $60.\nAnswer: $60" },
        { q: "If 4 pens cost $6, how much do 10 pens cost?", a: "Cost per pen = $6 ÷ 4 = $1.50.\n10 pens = 10 × $1.50 = $15.\nAnswer: $15" },
        { q: "The mean of 5 numbers is 12. The mean of the first 4 is 10. What is the 5th number?", a: "Total of 5 numbers = 5 × 12 = 60.\nTotal of first 4 = 4 × 10 = 40.\n5th number = 60 − 40 = 20.\nAnswer: 20" },
      ],
      standard: [
        { q: "A train travels 240 km in 3 hours. How long does it take to travel 400 km at the same speed?", a: "Speed = 240 ÷ 3 = 80 km/h.\nTime = 400 ÷ 80 = 5 hours.\nAnswer: 5 hours" },
        { q: "A box contains red and blue balls in the ratio 3:5. If there are 24 balls in total, how many are red?", a: "Total parts = 3 + 5 = 8.\nValue per part = 24 ÷ 8 = 3.\nRed = 3 × 3 = 9.\nAnswer: 9" },
        { q: "If x + y = 12 and x − y = 4, find x and y.", a: "Add the equations: 2x = 16, so x = 8.\nSubstitute back: 8 + y = 12, so y = 4.\nAnswer: x = 8, y = 4" },
        { q: "A class of 30 has 18 girls. What percentage of the class is boys?", a: "Boys = 30 − 18 = 12.\nPercentage = (12 ÷ 30) × 100 = 40%.\nAnswer: 40%" },
      ],
      extension: [
        { q: "A water tank fills at 12 L/min and drains at 4 L/min. With both taps open and starting empty, how long until it holds 96 litres?", a: "Net fill rate = 12 − 4 = 8 L/min.\nTime = 96 ÷ 8 = 12 minutes.\nAnswer: 12 minutes" },
        { q: "The angles of a triangle are in the ratio 2:3:5. What is the largest angle?", a: "Total parts = 2 + 3 + 5 = 10.\nDegrees per part = 180 ÷ 10 = 18°.\nLargest = 5 × 18 = 90°.\nAnswer: 90°" },
        { q: "5 workers complete a job in 12 days. How many workers are needed to finish the same job in 8 days?", a: "Total work = 5 × 12 = 60 worker-days.\nWorkers needed = 60 ÷ 8 = 7.5 → round up to 8.\nAnswer: 8 workers" },
        { q: "A shop offers 20% off, then a further 10% off the discounted price. What is the total discount on a $100 item?", a: "After 20% off: $100 × 0.8 = $80.\nAfter further 10% off: $80 × 0.9 = $72.\nTotal discount = $100 − $72 = $28 (28%).\nAnswer: $28 (28%)" },
      ],
    },
  },
};

const levelMeta = { foundation: { label: "Foundation", color: c.success }, standard: { label: "Standard", color: c.teal }, extension: { label: "Extension", color: c.amber } };

function PracticeQuestions({ questionBank }) {
  const [indices, setIndices] = useState({ foundation: 0, standard: 0, extension: 0 });
  const [expanded, setExpanded] = useState({});

  const regenerate = (key) => {
    setIndices((p) => ({ ...p, [key]: (p[key] + 1) % questionBank[key].length }));
    setExpanded((p) => ({ ...p, [key]: false }));
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {Object.keys(questionBank).map((key) => {
        const meta = levelMeta[key];
        const question = questionBank[key][indices[key]];
        return (
          <div key={key} style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>{question.q}</p>
              <span style={{ fontSize: 10, fontWeight: 600, color: meta.color, background: `${meta.color}15`, padding: "2px 8px", borderRadius: 10 }}>{meta.label}</span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button type="button" onClick={() => setExpanded((p) => ({ ...p, [key]: !p[key] }))} style={{ fontSize: 12, color: c.teal, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {expanded[key] ? "Hide solution ▴" : "View solution ▾"}
              </button>
              <button type="button" onClick={() => regenerate(key)} style={{ fontSize: 11, color: c.textLight, fontWeight: 600, background: "none", border: `1px solid ${c.border}`, borderRadius: 6, cursor: "pointer", padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                ↻ New question
              </button>
            </div>
            {expanded[key] && (
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

export default function SampleReport({
  background = c.offWhite,
  padding = "80px 40px",
  preset = "math-quadratics",
  heading = "This is what you'll receive after every session.",
  sub = "A real example of a Tuterly report. Our tutors are trained to use the platform so you're kept in the loop after every session — and practice questions with worked solutions land in your inbox to reinforce what was covered.",
}) {
  const content = PRESETS[preset] ?? PRESETS["math-quadratics"];

  return (
    <section id="sample-report" style={{ padding, background }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <Fade>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2, textAlign: "center", marginBottom: 12 }}>Sample report</p>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: c.navy, textAlign: "center", marginBottom: 12, lineHeight: 1.25 }}>
            {heading}
          </h2>
          <p style={{ fontSize: 15, color: c.textLight, textAlign: "center", marginBottom: 40, lineHeight: 1.7 }}>
            {sub}
          </p>
        </Fade>
        <Fade delay={0.15}>
          <div style={{ background: c.white, borderRadius: 20, border: `1px solid ${c.border}`, overflow: "hidden", boxShadow: "0 12px 48px rgba(0,0,0,0.06)" }}>
            <div style={{ background: c.navy, padding: "22px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: c.teal, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>Session Report</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2 }}>powered by tuterly</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{content.date}</p>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {content.studentInfo.map((item, i) => (
                  <div key={i}>
                    <p style={{ fontSize: 10, color: c.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>{item.l}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: c.navy }}>{item.v}</p>
                  </div>
                ))}
              </div>

              {[
                { title: content.whatCoveredTitle, content: content.whatCoveredBody },
                { title: content.howWentTitle, content: content.howWentBody },
              ].map((section, i) => (
                <div key={i} style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                  <h4 style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 8 }}>{section.title}</h4>
                  <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.7 }}>{section.content}</p>
                </div>
              ))}

              <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 10 }}>Topic Confidence</h4>
                {content.topicConfidence.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
                    <span style={{ fontSize: 13, color: c.textLight }}>{item.t}</span>
                    <div style={{ display: "flex", gap: 3 }}>
                      {[1, 2, 3, 4, 5].map((v) => <div key={v} style={{ width: 10, height: 10, borderRadius: 3, background: v <= item.r ? c.teal : `${c.teal}20` }} />)}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16, marginBottom: 16 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 8 }}>Areas to Focus On</h4>
                {content.areasToFocus.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "start", marginBottom: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.teal, marginTop: 6, flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: c.textLight, lineHeight: 1.5 }}>{a}</p>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 16 }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: c.teal, marginBottom: 12 }}>Practice Questions</h4>
                <PracticeQuestions questionBank={content.questionBank} />
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}
