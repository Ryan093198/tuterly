import Link from "next/link";
import { GUARANTEE } from "@/lib/guarantee";
import { Eyebrow } from "@/components/brand";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import { LAUNCH_SPECIAL_LINE, FULL_PRICE_FROM } from "@/lib/study-launch";
import "./price-trial.css";

// The price, shown the way subscription apps that convert well show it:
// the trial up front, a plain timeline of when billing starts, and the
// price broken down so it's easy to compare. Every line must stay true of
// the App Store subscription (STUDY_APP in lib/study-app.js). Two plans
// at the launch price, 50% off until 31 March 2027, with the full price
// struck through next to each; the free trial is on the monthly plan
// only. Never "usually" or "was" (lib/study-launch.js).
const perDay = (STUDY_APP.priceWeek / 7).toFixed(2); // 8.99 / 7 = 1.28

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
          <span className="pt__perday">With a {STUDY_APP.trialDays}-day free trial.</span>
        </p>
        <p className="pt__price">
          <span className="pt__plan">Weekly</span>
          <s className="pt__full">${STUDY_APP.fullPriceWeek}</s> <span className="pt__amount">${STUDY_APP.priceWeek}</span> a week
          <span className="pt__perday">About ${perDay} a day. {STUDY_APP.priceVsTutor}</span>
        </p>
      </div>
      <ol className="pt__steps" aria-label="How the free trial on the monthly plan works">
        <li>
          <span className="pt__when">Today</span>
          <span className="pt__what">Start the monthly plan free: snap questions, upload a test, take a topic test.</span>
        </li>
        <li>
          <span className="pt__when">Day 1 to 7</span>
          <span className="pt__what">Cancel in your phone’s subscription settings before the week ends and you pay nothing.</span>
        </li>
        <li>
          <span className="pt__when">Day 8</span>
          <span className="pt__what">${STUDY_APP.priceMonth} a month starts. Cancel any time.</span>
        </li>
      </ol>
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
