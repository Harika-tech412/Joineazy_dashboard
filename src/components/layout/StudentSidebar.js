export default function StudentSidebar() {
  return (
    <nav className="space-y-4 text-sm" aria-label="Tips">
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">How it works</p>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Open the Drive folder, upload your work, then use the two-step confirmation so your instructor sees
          you as submitted.
        </p>
      </div>
      <div className="rounded-xl bg-indigo-50 p-3 text-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-200">
        <p className="text-xs font-semibold uppercase tracking-wide">Tip</p>
        <p className="mt-1 text-xs leading-relaxed">
          You only see assignments assigned to your account — not other students&apos; tasks.
        </p>
      </div>
    </nav>
  );
}
