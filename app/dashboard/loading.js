// Dashboard-wide loading skeleton. Next.js renders this instantly while
// the matched route's server component fetches data, so a click goes
// from "nothing happens for 200ms" to "shell appears immediately, body
// fills in." Lives one level above the role dashboards so it covers
// every segment by default; individual routes can override with their
// own loading.js if they want a more tailored skeleton.

export default function DashboardLoading() {
  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto animate-pulse">
      <header className="mb-8 space-y-2">
        <div className="h-7 w-56 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
        <div className="h-3 w-72 rounded bg-zinc-200/60 dark:bg-zinc-800/50" />
      </header>

      <ul className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <li
            key={i}
            className="h-32 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-card p-6 space-y-3"
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-zinc-200/70 dark:bg-zinc-800/60" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
                <div className="h-3 w-44 rounded bg-zinc-200/60 dark:bg-zinc-800/50" />
                <div className="h-3 w-24 rounded bg-zinc-200/50 dark:bg-zinc-800/40" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
