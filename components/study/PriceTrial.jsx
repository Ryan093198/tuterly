import Link from "next/link";
import { GUARANTEE } from "@/lib/guarantee";
import { Eyebrow } from "@/components/brand";
import { STUDY_APP } from "@/lib/study-app";
import { LAUNCH_SPECIAL_LINE, FULL_PRICE_FROM } from "@/lib/study-launch";
import "./price-trial.css";

// The price: two plans at the launch price, 50% off until 31 March 2027,
// with the full price struck through next to each. No free trial since
// 11 Nov 2026 (Ryan). Every line must stay true of the App Store
// subscription (STUDY_APP in lib/study-app.js). Never "usually" or "was"
// (lib/study-launch.js).
const perDay = (STUDY_APP.priceWeek / 7).toFixed(2); // 8.99 / 7 = 1.28
const perDayMonth = (STUDY_APP.priceMonth / 30).toFixed(2); // 29.99 / 30 = 1.00

export default function PriceTrial({ id = "price", children }) {
  return (
    <div className="pt tb-card">
      <Eyebrow>Price</Eyebrow>
      <h2 id={id} className="tb-h2 pt__title">{LAUNCH_SPECIAL_LINE}</h2>
      <div className="pt__plans">
        {[
          { name: "Monthly", full: STUDY_APP.fullPriceMonth, now: STUDY_APP.priceMonth, per: "a month", day: perDayMonth },
          { name: "Weekly", full: STUDY_APP.fullPriceWeek, now: STUDY_APP.priceWeek, per: "a week", day: perDay },
        ].map((p) => (
          <div key={p.name} className="pt__plan-card">
            <p className="pt__plan">{p.name}</p>
            <p className="pt__amounts">
              <s className="pt__full">${p.full}</s>
              <span className="pt__amount">${p.now}</span>
              <span className="pt__per">{p.per}</span>
            </p>
            <p className="pt__perday">About ${p.day} a day</p>
          </div>
        ))}
      </div>
      <p className="pt__note">
        Cancel any time. From {FULL_PRICE_FROM}: ${STUDY_APP.fullPriceWeek} a week or ${STUDY_APP.fullPriceMonth} a month.
      </p>
      <p className="pt__guarantee">
        <strong>{GUARANTEE.headline}.</strong> Use it every week for {GUARANTEE.months} months, and if their school maths marks haven’t improved, we refund what you paid. <Link href="/guarantee">Conditions apply</Link>.
      </p>
      {children}
    </div>
  );
}
