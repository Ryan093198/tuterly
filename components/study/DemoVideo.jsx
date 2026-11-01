"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import "./demo-video.css";

// The 22-second "Snap it, practise it, nail the test" demo (vertical,
// made from the real app screenshots). Plays muted on a loop like a
// moving screenshot. With reduced motion turned on it doesn't autoplay:
// it shows the poster with a play button instead.
export const DEMO_VIDEO = {
  src: "/videos/tuterly-snap-demo.mp4",
  poster: "/videos/tuterly-snap-demo-poster.jpg",
  label: "Tuterly demo: snap a question your child got wrong, see the worked solution, practise fresh questions until it's mastered, then test the whole topic.",
};

export default function DemoVideo({ width = 340, placement = "demo", className = "", priority = false }) {
  const ref = useRef(null);
  const [still, setStill] = useState(false);
  const seen = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStill(true);
      v.pause();
      return;
    }
    // Only play while it's on screen.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        v.play().catch(() => {});
        if (!seen.current) { seen.current = true; trackEvent("demo_video_view", { placement }); }
      } else v.pause();
    }, { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, [placement]);

  return (
    <div className={`dv ${className}`} style={{ "--dv-w": `${width}px` }}>
      <video
        ref={ref}
        className="dv__video"
        src={DEMO_VIDEO.src}
        poster={DEMO_VIDEO.poster}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-label={DEMO_VIDEO.label}
        controls={still}
      />
    </div>
  );
}
