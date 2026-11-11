import { LAUNCH_SPECIAL_LINE, PLUS_PRICES } from "@/lib/study-launch";

// "Launch price: 50% off until 31 March 2027. $17.99 $8.99 a week or
// $59.99 $29.99 a month", with the full prices struck through. Use this
// wherever the end date shows (lib/study-launch.js has the rules).
// No free trial since 11 Nov 2026; the old `trial` prop is ignored.
export default function LaunchPrice() {
  const { week, month } = PLUS_PRICES;
  return (
    <>
      {LAUNCH_SPECIAL_LINE} <s>{week.full}</s> {week.now} a week or <s>{month.full}</s> {month.now} a month.
    </>
  );
}
