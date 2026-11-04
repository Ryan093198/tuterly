"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

// Meta (Facebook and Instagram) Pixel, marketing pages only. Off unless
// NEXT_PUBLIC_META_PIXEL_ID is set in Vercel. Sends a PageView on each page
// and, through lib/analytics.js trackEvent, a "Lead" on every sign-up
// (worksheet email, topic test, waitlist, weekly email, scholarship). No
// email or other personal details are sent, only the event and its type.
//
// Not loaded on the signed-in app, auth, onboarding, private test links or
// the unsubscribe page.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const SKIP = /^\/(dashboard|auth|onboarding|invite|topic-test|unsubscribed)(\/|$)/;

export default function MetaPixel() {
  const pathname = usePathname() || "/";
  const skip = SKIP.test(pathname);
  const first = useRef(true);

  // The snippet sends the first PageView; later client-side page changes send their own.
  useEffect(() => {
    if (!PIXEL_ID || skip) return;
    if (first.current) { first.current = false; return; }
    try { window.fbq?.("track", "PageView"); } catch {}
  }, [pathname, skip]);

  if (!PIXEL_ID || !/^\d+$/.test(PIXEL_ID) || skip) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
