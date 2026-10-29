import { getAppStats, COUNTER_MIN } from "@/lib/app-stats";

// "12,480 unique practice questions written so far…" under the three
// steps on the home page. Real, live count from the app; hidden if the
// number can't be read or is still small.
export default async function QuestionCounter() {
  const stats = await getAppStats();
  const n = stats?.questionsGenerated;
  if (!n || n < COUNTER_MIN) return null;
  // Round down to the nearest 10 so the number never overstates.
  const shown = (Math.floor(n / 10) * 10).toLocaleString("en-AU");
  return (
    <p className="sl-counter">
      <strong className="sl-counter__num">{shown}+</strong>
      <span className="sl-counter__text">
        unique practice questions written so far, each one based on a question a student found challenging.
      </span>
    </p>
  );
}
