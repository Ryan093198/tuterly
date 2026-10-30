// Launch special for Tuterly Study Plus and the Scholarship Pass. Australian
// consumer law: a "usual" price is only honest if it is charged after the
// special ends, so the end date is shown wherever the discount is.
// Client-safe (no Stripe imports).
export const LAUNCH_SPECIAL_ENDS = "31 March 2027";
export const USUAL_PRICE_FROM = "1 April 2027";
export const LAUNCH_SPECIAL_LINE = `Launch special: 50% off until ${LAUNCH_SPECIAL_ENDS}. Usual price from ${USUAL_PRICE_FROM}.`;
