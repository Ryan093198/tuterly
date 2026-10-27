import { Icon } from "@/components/brand";
import { STUDY_RESULTS } from "@/lib/study-results";
import "./results-proof.css";

// The Bayside Academics result, with its fine print (lib/study-results.js).
export default function ResultsProof({ className = "" }) {
  return (
    <div className={`rp ${className}`}>
      <span className="rp__icon" aria-hidden="true"><Icon name="star" size={20} /></span>
      <div>
        <p className="rp__title">{STUDY_RESULTS.headline}</p>
        <p className="rp__line">{STUDY_RESULTS.line}</p>
        <p className="rp__fine">{STUDY_RESULTS.finePrint}</p>
      </div>
    </div>
  );
}
