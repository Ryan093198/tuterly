export default function Logo({ size = "md", className = "" }) {
  const dim = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";
  const dot = size === "lg" ? "w-2.5 h-2.5" : size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";
  return (
    <span
      className={`inline-flex items-center gap-2 font-semibold tracking-tight ${dim} ${className}`}
    >
      <span className={`${dot} rounded-full bg-brand`} aria-hidden="true" />
      <span>Tuterly</span>
    </span>
  );
}
