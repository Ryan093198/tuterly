// Tuterly Study Plus launch price (Ryan, 1 Nov 2026): 50% off until
// 31 March 2027, then the full price from 1 April 2027. Australian consumer
// law: wherever the end date is shown, the struck-through full price sits
// next to it, and copy never says "usually" or "was". Plain-text places
// (FAQ answers and their schema, table cells, share text) can't strike a
// price through, so they give the launch price and the price from
// 1 April 2027 instead, without the end date or "50% off". The Scholarship
// Pass has no discount yet: don't use these for it. Client-safe.
export const LAUNCH_ENDS = "31 March 2027";
export const FULL_PRICE_FROM = "1 April 2027";
export const LAUNCH_SPECIAL_LINE = `Launch price: 50% off until ${LAUNCH_ENDS}.`;
export const PLUS_PRICES = {
  week: { now: "$8.99", full: "$17.99" },
  month: { now: "$29.99", full: "$59.99" },
};
