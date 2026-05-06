export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-surface-soft px-6 py-12 text-center ${className}`}
    >
      {icon && (
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-brand-pale text-brand-dark flex items-center justify-center">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-muted max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
