import Link from "next/link";
import { Icon } from "@/components/brand";
import "./try-question.css";

// A short, eye-catching pointer to the Try it demo (/try). Used on the
// parents, students, features, worksheets, exam prep and practice pages.
export default function TryCta({ title = "Got a question wrong? Try Tuterly on it now.", text, href = "/try", label = "Try it free" }) {
  return (
    <div className="tq-cta">
      <span className="tq-cta__icon" aria-hidden="true"><Icon name="snap" size={26} /></span>
      <div className="tq-cta__copy">
        <p className="tq-cta__title">{title}</p>
        <p className="tq-cta__text">
          {text || "Upload a photo of one maths question. You’ll get the worked solution and a fresh question on the same idea to practise. Free, 2 a day."}
        </p>
      </div>
      <Link href={href} className="tb-btn tb-btn--primary tq-cta__btn">{label}</Link>
    </div>
  );
}
