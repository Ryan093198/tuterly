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
// Hidden during the first ~80ms so transitions fast enough not to need
// feedback never flash the bar.
export default function NavProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState('idle'); // 'idle' | 'loading' | 'done'
  const startedRef = useRef(false);
  const showTimerRef = useRef(null);
  const doneTimerRef = useRef(null);

  useEffect(() => {
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      clearTimeout(doneTimerRef.current);
      showTimerRef.current = setTimeout(() => setPhase('loading'), 80);
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
      clearTimeout(showTimerRef.current);
      clearTimeout(doneTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!startedRef.current) return;
    startedRef.current = false;
    clearTimeout(showTimerRef.current);
    setPhase('done');
    doneTimerRef.current = setTimeout(() => setPhase('idle'), 400);
  }, [pathname, searchParams]);

  return <div aria-hidden className={`nav-progress nav-progress-${phase}`} />;
}
