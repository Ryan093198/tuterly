const VARIANTS = {
  primary:
    "bg-brand text-white hover:bg-brand-dark shadow-sm shadow-brand/20 disabled:bg-zinc-300 disabled:text-zinc-500 disabled:shadow-none",
  secondary:
    "bg-foreground text-background hover:opacity-90 disabled:opacity-50",
  outline:
    "border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 disabled:opacity-50",
  ghost:
    "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 disabled:opacity-50",
  danger:
    "bg-danger text-white hover:bg-red-700 disabled:opacity-50",
};

const SIZES = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition disabled:cursor-not-allowed ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
      {...rest}
    />
  );
}
