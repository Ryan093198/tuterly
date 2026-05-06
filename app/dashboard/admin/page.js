import EmptyState from "@/components/ui/EmptyState";

export default function AdminDashboard() {
  return (
    <div className="px-6 sm:px-8 py-8 sm:py-10 max-w-5xl mx-auto animate-fade-in-up">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Organisation</h1>
        <p className="text-sm text-muted mt-1">
          Tutors, students, and analytics for your tutoring company.
        </p>
      </header>
      <EmptyState
        icon={
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        }
        title="Coming with white-label"
        description="Custom branding, tutor seats, and org-wide analytics will live here in Phase 6."
      />
    </div>
  );
}
