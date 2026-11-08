"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import "./demo-video.css";

// Vertical app demos that play muted on a loop, like a moving screenshot.
//
// Built for phones arriving from TikTok and Instagram (8 Nov 2026):
// - autoplay + muted + playsinline + webkit-playsinline, set as real
//   attributes, so iPhones and in-app browsers play it inline, never full
//   screen;
// - no native controls: a tap pauses or plays it in place;
// - if a browser won't autoplay (Android in-app browsers, iPhone Low Power
//   Mode), an animated WebP of the same demo is shown instead, which plays
//   everywhere;
// - with reduced motion turned on it stays on the poster, with a play button.

export const DEMO_VIDEO = {
  src: "/videos/tuterly-snap-demo.mp4",
  poster: "/videos/tuterly-snap-demo-poster.jpg",
  anim: "/videos/tuterly-snap-demo.webp",
  label: "Tuterly demo: snap a question your child got wrong, see the worked solution, practise fresh questions until it's mastered, then test the whole topic.",
};

// The 26-second Exam Zone demo (8 Nov 2026), from real app screens of a
// demo student and made-up test materials (marketing/exam-zone-demo).
export const EXAM_ZONE_VIDEO = {
  src: "/videos/tuterly-exam-zone-demo.mp4",
  poster: "/videos/tuterly-exam-zone-demo-poster.jpg",
  anim: "/videos/tuterly-exam-zone-demo.webp",
  label: "Tuterly Exam Zone demo: add your test outline, a past paper and your teacher's notes, Tuterly analyses your test and writes a practice exam in your school's style, then marks it by topic so you can fix what you missed.",
};

export default function DemoVideo({ width = 340, placement = "demo", className = "", priority = false, video = DEMO_VIDEO }) {
  const ref = useRef(null);
  const [mode, setMode] = useState("video"); // video | anim | still
  const [paused, setPaused] = useState(false);
  const seen = useRef(false);
  const visible = useRef(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Belt and braces for iOS and in-app browsers: set the flags as both
    // properties and attributes before any play() call.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      setMode("still");
      setPaused(true);
      return;
    }

    let started = false;
    const onPlaying = () => {
      started = true;
      setPaused(false);
    };
    v.addEventListener("playing", onPlaying);

    const tryPlay = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => { if (!started) setMode("anim"); });
    };

    // Only play while it's on screen.
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
      if (e.isIntersecting) {
        if (!seen.current) { seen.current = true; trackEvent("demo_video_view", { placement }); }
        if (!userPaused.current) tryPlay();
      } else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);

    // If it's on screen and still hasn't started after a few seconds, the
    // browser is blocking it: switch to the animated image.
    const timer = setTimeout(() => {
      if (!started && visible.current && !userPaused.current) setMode("anim");
    }, 3500);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      v.removeEventListener("playing", onPlaying);
    };
  }, [placement]);

  function toggle() {
    const v = ref.current;
    if (!v || mode === "anim") return;
    if (v.paused) {
      userPaused.current = false;
      if (mode === "still") setMode("video");
      v.play().then(() => setPaused(false)).catch(() => setMode("anim"));
      trackEvent("demo_video_play", { placement });
    } else {
      userPaused.current = true;
      v.pause();
      setPaused(true);
    }
  }

  return (
    <div className={`dv ${className}`} style={{ "--dv-w": `${width}px` }}>
      {mode === "anim" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="dv__video" src={video.anim} alt={video.label} width={360} height={640} />
      ) : (
        <>
          <video
            ref={ref}
            className="dv__video"
            src={video.src}
            poster={video.poster}
            autoPlay={mode === "video"}
            muted
            loop
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload nofullscreen noremoteplayback"
            preload={priority ? "auto" : "metadata"}
            aria-label={video.label}
            onClick={toggle}
          />
          {paused && (
            <button type="button" className="dv__play" onClick={toggle} aria-label="Play the demo">
              <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
            </button>
          )}
        </>
      )}
    </div>
  );
}
