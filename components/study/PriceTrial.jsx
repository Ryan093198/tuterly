import Link from "next/link";
import { GUARANTEE } from "@/lib/guarantee";
import { Eyebrow } from "@/components/brand";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
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
  const live = isStudyAppLive();
  return (
    <div className="pt tb-card">
      <Eyebrow>Price</Eyebrow>
      <h2 id={id} className="tb-h2 pt__title">{LAUNCH_SPECIAL_LINE}</h2>
      <div className="pt__plans">
        <p className="pt__price">
          <span className="pt__plan">Monthly</span>
          <s className="pt__full">${STUDY_APP.fullPriceMonth}</s> <span className="pt__amount">${STUDY_APP.priceMonth}</span> a month
          <span className="pt__perday">About ${perDayMonth} a day. Cancel any time.</span>
        </p>
        <p className="pt__price">
          <span className="pt__plan">Weekly</span>
          <s className="pt__full">${STUDY_APP.fullPriceWeek}</s> <span className="pt__amount">${STUDY_APP.priceWeek}</span> a week
          <span className="pt__perday">About ${perDay} a day. {STUDY_APP.priceVsTutor}</span>
        </p>
      </div>
      {!live && (
        <p className="pt__note">
          From {FULL_PRICE_FROM}: ${STUDY_APP.fullPriceWeek} a week or ${STUDY_APP.fullPriceMonth} a month. Not on the App Store yet. It’s on iPhone at launch, with Android coming soon. There’s no yearly plan.
        </p>
      )}
      <p className="pt__guarantee">
        <strong>{GUARANTEE.headline}.</strong> Use it every week for {GUARANTEE.months} months, and if their school maths marks haven’t improved, we refund what you paid. <Link href="/guarantee">Conditions apply</Link>.
      </p>
      {children}
    </div>
  );
}
