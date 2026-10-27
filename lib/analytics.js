// Thin wrapper over the GA4 gtag snippet loaded in app/layout.js. No new
// analytics vendor: if GA isn't configured (local dev, previews without
// NEXT_PUBLIC_GA_MEASUREMENT_ID) the event is a no-op.
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
    // Lets tests (and anyone debugging in the console) see events without GA.
    window.__tuterlyEvents = window.__tuterlyEvents || [];
    window.__tuterlyEvents.push({ name, ...params });
  } catch {}
}
