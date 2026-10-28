import { Eyebrow } from "@/components/brand";
import { STUDY_APP, isStudyAppLive } from "@/lib/study-app";
import "./price-trial.css";

// The price, shown the way subscription apps that convert well show it:
// the trial up front, a plain timeline of when billing starts, and the
// price broken down so it's easy to compare. Every line must stay true of
// the App Store subscription (STUDY_APP in lib/study-app.js).
const perDay = (STUDY_APP.priceWeek / 7).toFixed(2); // 7.99 / 7 = 1.14

export default function PriceTrial({ id = "price", children }) {
  const live = isStudyAppLive();
  return (
    <div className="pt tb-card">
      <Eyebrow>Price</Eyebrow>
      <h2 id={id} className="tb-h2 pt__title">Try it free for a week.</h2>
      <p className="pt__price">
        <span className="pt__amount">${STUDY_APP.priceWeek}</span> a week after that
        <span className="pt__perday">About ${perDay} a day. {STUDY_APP.priceVsTutor}</span>
      </p>
      <ol className="pt__steps" aria-label="How the free trial works">
        <li>
          <span className="pt__when">Today</span>
          <span className="pt__what">Everything, free: snap questions, upload a test, take a topic test.</span>
        </li>
        <li>
          <span className="pt__when">Day 1 to 7</span>
          <span className="pt__what">Cancel in your phone’s subscription settings before the week ends and you pay nothing.</span>
        </li>
        <li>
          <span className="pt__when">Day 8</span>
          <span className="pt__what">${STUDY_APP.priceWeek} a week starts. Cancel any time.</span>
        </li>
      </ol>
      {!live && <p className="pt__note">Not on the App Store or Google Play yet. This is the price when it launches.</p>}
      {children}
    </div>
  );
}
