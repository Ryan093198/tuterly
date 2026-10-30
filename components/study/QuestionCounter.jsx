import { getQuestionTotal, COUNTER_MIN } from "@/lib/app-stats";

// "12,480+ practice questions written so far…" under the three steps on
// the home page. Real, live count: the app's questions plus the website's
// worksheets, Try it free questions and published examples. Hidden if the
// app's number can't be read or the total is still small.
export default async function QuestionCounter() {
  const stats = await getQuestionTotal();
  const n = stats?.total;
  if (!n || n < COUNTER_MIN) return null;
  // Round down to the nearest 10 so the number never overstates.
  const shown = (Math.floor(n / 10) * 10).toLocaleString("en-AU");
  return (
    <p className="sl-counter">
      <strong className="sl-counter__num">{shown}+</strong>
      <span className="sl-counter__text">
        maths practice questions written by Tuterly so far, all accessible via the app.
      </span>
    </p>
  );
}
