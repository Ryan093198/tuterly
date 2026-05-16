export default function ParentStudentLoading() {
  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto space-y-10 animate-pulse">
      <header className="space-y-2">
        <div className="h-4 w-28 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-zinc-200/70 dark:bg-zinc-800/60" />
          <div className="flex-1 space-y-2">
            <div className="h-8 w-64 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
            <div className="h-3 w-56 rounded bg-zinc-200/60 dark:bg-zinc-800/50" />
            <div className="h-3 w-44 rounded bg-zinc-200/50 dark:bg-zinc-800/40" />
          </div>
        </div>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="h-28 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-5 space-y-3"
          >
            <div className="h-3 w-16 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
            <div className="h-4 w-40 rounded bg-zinc-200/60 dark:bg-zinc-800/50" />
            <div className="h-3 w-32 rounded bg-zinc-200/50 dark:bg-zinc-800/40" />
          </div>
        ))}
      </div>

      <Section label="Reports" rows={3} />
      <Section label="Progress" rows={2} />
    </div>
  );
}

function Section({ label, rows }) {
  return (
    <section className="space-y-3">
      <div className="h-3 w-20 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
      <ul className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <li
            key={i}
            className="h-16 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card"
          />
        ))}
      </ul>
    </section>
  );
}
