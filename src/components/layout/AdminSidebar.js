export default function AdminSidebar() {
  return (
    <nav className="space-y-4 text-sm" aria-label="Tips">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">Professor view</p>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Create assignments with a Drive link, assign students on your roster, and track who has confirmed
          submission.
        </p>
      </div>
      <div className="rounded-xl bg-slate-100 p-3 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
        <p className="text-xs font-semibold uppercase tracking-wide">Privacy (demo)</p>
        <p className="mt-1 text-xs leading-relaxed">
          You only see assignments you created. Submission data is stored in this browser via localStorage.
        </p>
      </div>
    </nav>
  );
}
