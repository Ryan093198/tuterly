// Thin wrapper over the GA4 gtag snippet loaded in app/layout.js (plus the
// Meta Pixel for sign-ups). If GA isn't configured (local dev, previews without
// NEXT_PUBLIC_GA_MEASUREMENT_ID) the event is a no-op.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
    // Every sign-up is also a Meta Pixel "Lead" (components/analytics/MetaPixel.jsx),
    // labelled with what was signed up for. Nothing personal is sent.
    if (name === "generate_lead" && typeof window.fbq === "function") {
      window.fbq("track", "Lead", { content_name: params.lead_type || "", content_category: params.source || "" });
    }
    // Lets tests (and anyone debugging in the console) see events without GA.
    window.__tuterlyEvents = window.__tuterlyEvents || [];
    window.__tuterlyEvents.push({ name, ...params });
  } catch {}
}
