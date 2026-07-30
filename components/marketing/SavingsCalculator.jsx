"use client";

import { useState } from "react";
import Fade from "./Fade";
import { c } from "./theme";
import { PRICING } from "@/lib/pricing";

// Interactive comparison slider: drag the months and watch the
// "save vs typical company" number update. Current model: all-inclusive
// session packs (Tuterly software included), compared against a typical
// agency per-session rate. Prices come from lib/pricing.js.
const LESSONS_PER_MONTH = PRICING.lessonsPerMonthAssumed;
const COMPANY_PER_SESSION = PRICING.agencyPerSession;
const TUTERLY_PER_SESSION = PRICING.sessionFrom;

export default function SavingsCalculator() {
  const [months, setMonths] = useState(1);
  const companyCost = COMPANY_PER_SESSION * LESSONS_PER_MONTH * months;
  const tuterlyCost = TUTERLY_PER_SESSION * LESSONS_PER_MONTH * months;
  const savings = companyCost - tuterlyCost;

  return (
    <Fade delay={0.05}>
      <style>{`
        input[type=range].savings-slider { -webkit-appearance: none; appearance: none; background: ${c.border}; height: 6px; border-radius: 3px; outline: none; }
        input[type=range].savings-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; background: ${c.teal}; cursor: pointer; box-shadow: 0 2px 8px rgba(10, 186, 181, 0.4); }
        input[type=range].savings-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: ${c.teal}; cursor: pointer; border: none; box-shadow: 0 2px 8px rgba(10, 186, 181, 0.4); }
      `}</style>
      <div style={{ background: c.offWhite, borderRadius: 20, padding: "32px 28px", border: `1px solid ${c.border}`, textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: c.teal, textTransform: "uppercase", letterSpacing: 2 }}>Your savings</p>
          <p style={{ fontSize: 13, color: c.textMuted }}>Assumes 4 lessons/month</p>
        </div>
        <p style={{ fontSize: 14, color: c.textLight, marginBottom: 18 }}>
          Over <strong style={{ color: c.navy, fontWeight: 700 }}>{months} {months === 1 ? "month" : "months"}</strong> of tutoring, you save
        </p>
        <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 48, color: c.teal, lineHeight: 1.1, marginBottom: 24 }}>
          ${savings.toLocaleString("en-AU")}
        </p>
        <input
          type="range"
          className="savings-slider"
          min={1}
          max={12}
          step={1}
          value={months}
          onChange={(e) => setMonths(parseInt(e.target.value, 10))}
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
            <p style={{ fontSize: 12, color: c.textLight, marginTop: 4 }}>${COMPANY_PER_SESSION} per session (typical agency rate) × {LESSONS_PER_MONTH * months} sessions</p>
          </div>
          <div style={{ background: c.tealPale, borderRadius: 12, padding: "16px 18px", border: `1px solid ${c.teal}` }}>
            <p style={{ fontSize: 11, color: c.tealDark, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>With Tuterly</p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: c.navy }}>${tuterlyCost.toLocaleString("en-AU")}</p>
            <p style={{ fontSize: 12, color: c.textLight, marginTop: 4 }}>${TUTERLY_PER_SESSION} per session, software included × {LESSONS_PER_MONTH * months} sessions</p>
          </div>
        </div>
      </div>
    </Fade>
  );
}
