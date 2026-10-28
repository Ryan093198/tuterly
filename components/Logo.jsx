import TuterlyMark from "@/components/brand/TuterlyMark";

// Dashboard, auth, onboarding and report logo: the tʸ mark followed by the
// "Tuterly" wordmark. Mark is about 1.3 times the wordmark's cap height.
const SIZES = {
  sm: { text: "text-base", mark: 22 },
  md: { text: "text-xl", mark: 27 },
  lg: { text: "text-2xl", mark: 32 },
};

export default function Logo({ size = "md", onTeal = false, className = "" }) {
  const s = SIZES[size] || SIZES.md;
  return (
    <span className={`inline-flex items-center gap-2 font-semibold tracking-tight ${s.text} ${className}`}>
      <TuterlyMark height={s.mark} onTeal={onTeal} />
      <span>Tuterly</span>
    </span>
  );
}
