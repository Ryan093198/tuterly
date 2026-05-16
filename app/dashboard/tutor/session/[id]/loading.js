export default function SessionLoading() {
  return (
    <div className="px-4 sm:px-8 py-8 sm:py-10 max-w-4xl mx-auto space-y-10 animate-pulse">
      <header className="space-y-2">
        <div className="h-4 w-32 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
        <div className="h-8 w-72 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
        <div className="h-3 w-56 rounded bg-zinc-200/60 dark:bg-zinc-800/50" />
      </header>

      <Section label="Your notes">
        <div className="h-40 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card" />
      </Section>

      <Section label="Photos of working">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/60"
            />
          ))}
        </div>
      </Section>

      <Section label="Report">
        <div className="h-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-card" />
      </Section>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <section className="space-y-3">
      <div className="h-3 w-24 rounded bg-zinc-200/70 dark:bg-zinc-800/60" />
      {children}
    </section>
  );
}
