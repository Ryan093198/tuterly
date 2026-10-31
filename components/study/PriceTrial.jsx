import Link from "next/link";
import { GUARANTEE } from "@/lib/guarantee";
import { Eyebrow } from "@/components/brand";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import "./price-trial.css";

// The price, shown the way subscription apps that convert well show it:
// the trial up front, a plain timeline of when billing starts, and the
// price broken down so it's easy to compare. Every line must stay true of
// the App Store subscription (STUDY_APP in lib/study-app.js). Two plans,
// both a launch special; the free trial is on the monthly plan only.
const perDay = (STUDY_APP.priceWeek / 7).toFixed(2); // 8.99 / 7 = 1.28

export default function PriceTrial({ id = "price", children }) {
  const live = isStudyAppLive();
  return (
    <div className="pt tb-card">
      <Eyebrow>Price</Eyebrow>
      <h2 id={id} className="tb-h2 pt__title">Launch special: 50% off.</h2>
      <div className="pt__plans">
        <p className="pt__price">
          <span className="pt__was">Usually ${STUDY_APP.usualPriceMonth} a month</span>
          <span className="pt__amount">${STUDY_APP.priceMonth}</span> a month
          <span className="pt__perday">With a {STUDY_APP.trialDays}-day free trial.</span>
        </p>
        <p className="pt__price">
          <span className="pt__was">Usually ${STUDY_APP.usualPriceWeek} a week</span>
          <span className="pt__amount">${STUDY_APP.priceWeek}</span> a week
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
          Not on the App Store or Google Play yet. The launch special is for a limited time, and there’s no yearly plan.
        </p>
      )}
      <p className="pt__guarantee">
        <strong>{GUARANTEE.headline}.</strong> Use it every week for {GUARANTEE.months} months, and if their school maths marks haven’t improved, we refund what you paid. <Link href="/guarantee">Conditions apply</Link>.
      </p>
      {children}
    </div>
  );
}
