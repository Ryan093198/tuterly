"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// GA4 "purchase" on the checkout thank-you page, once per checkout (the
// transaction id stops repeats on refresh in GA). Mark "purchase" as a key
// event in GA4 and import it into Google Ads as the conversion. A free-week
// start comes through with value 0 and trial: true.
export default function PurchaseEvent({ id, value, item }) {
  useEffect(() => {
    try {
      const key = `tuterly:purchase:${id}`;
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {}
    trackEvent("purchase", {
      transaction_id: id,
      value,
      currency: "AUD",
      trial: value === 0,
      items: [{ item_id: item, item_name: item === "sch_pass" ? "Scholarship Pass" : "Tuterly Plus", price: value, quantity: 1 }],
    });
  }, [id, value, item]);
  return null;
}
