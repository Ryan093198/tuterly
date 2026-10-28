import { SITE_URL } from "@/lib/site";
import { STUDY_APP } from "@/lib/study-app";

// For students: send the parents page to a parent by text or email.
export default function ShareWithParent() {
  const url = `${SITE_URL}/parents`;
  const text = `Can we get ${STUDY_APP.name}? It's a maths app for Years 7 to 10 that turns the questions I get wrong into practice. If we sign up early it's 50% off: ${url}`;
  const sms = `sms:?&body=${encodeURIComponent(text)}`;
  const mail = `mailto:?subject=${encodeURIComponent(`Can we get ${STUDY_APP.name}?`)}&body=${encodeURIComponent(text)}`;
  return (
    <div className="swp">
      <p className="swp__label">Want a parent to sign up for you?</p>
      <div className="swp__btns">
        <a href={sms} className="tb-btn tb-btn--secondary swp__btn">Text a parent</a>
        <a href={mail} className="tb-btn tb-btn--secondary swp__btn">Email a parent</a>
      </div>
    </div>
  );
}
