const TONES = {
  brand: "bg-brand-pale text-brand-foreground",
  neutral: "bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  danger: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400",
};

export default function Badge({ tone = "neutral", className = "", ...rest }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium tracking-tight ${TONES[tone]} ${className}`}
      {...rest}
    />
  );
}
