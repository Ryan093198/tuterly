// Scroll-in fade and rise (12px), CSS only: see .tb-reveal in
// components/brand/brand.css. Content is visible at rest, so it renders
// correctly without JavaScript, in screenshots and with reduced motion.
// The delay prop is kept for existing callers.
import "@/components/brand/brand.css";

export default function Fade({ children, delay = 0 }) {
  return (
    <div className="tb-reveal" style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
