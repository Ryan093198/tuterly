'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Thin top-of-page progress bar that gives immediate feedback when a
// navigation starts and completes when the URL actually changes.
//
// Starts on:
//   - left-click of a same-origin <a> / <Link>
//   - programmatic router.push / router.replace (which Next routes
//     through history.pushState / history.replaceState in App Router)
//
// Completes on: pathname or searchParams change after a start.
//
// We hold the 'loading' phase for at least MIN_VISIBLE_MS so the bar
// is actually visible even when pathname updates synchronously with
// the click (e.g. prefetched routes), since opacity 0 → 0 doesn't
// animate.
const MIN_VISIBLE_MS = 300;

export default function NavProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState('idle'); // 'idle' | 'loading' | 'done'
  const startedAtRef = useRef(0);
  const finishTimerRef = useRef(null);
  const resetTimerRef = useRef(null);

  useEffect(() => {
    const start = () => {
      if (startedAtRef.current) return;
      startedAtRef.current = performance.now();
      clearTimeout(resetTimerRef.current);
      setPhase('loading');
    };

    const onClick = (e) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = e.target.closest?.('a');
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;
      const raw = anchor.getAttribute('href');
      if (!raw) return;
      if (raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      } catch {
        return;
      }
      start();
    };

    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function patchedPushState(...args) {
      start();
      return origPush.apply(this, args);
    };
    history.replaceState = function patchedReplaceState(...args) {
      start();
      return origReplace.apply(this, args);
    };

    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      history.pushState = origPush;
      history.replaceState = origReplace;
      clearTimeout(finishTimerRef.current);
      clearTimeout(resetTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!startedAtRef.current) return;
    const elapsed = performance.now() - startedAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    startedAtRef.current = 0;
    finishTimerRef.current = setTimeout(() => {
      setPhase('done');
      resetTimerRef.current = setTimeout(() => setPhase('idle'), 400);
    }, remaining);
  }, [pathname, searchParams]);

  return <div aria-hidden className={`nav-progress nav-progress-${phase}`} />;
}
