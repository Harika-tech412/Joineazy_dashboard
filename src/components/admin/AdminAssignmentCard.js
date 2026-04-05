import ProgressBar from '../ui/ProgressBar';

function formatDue(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function AdminAssignmentCard({
  assignment,
  students,
  getSubmission,
  onEdit,
  onDelete,
}) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">{assignment.title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{assignment.description}</p>
          <p className="mt-2 text-xs text-slate-500">
            Due <span className="font-medium text-slate-700 dark:text-slate-300">{formatDue(assignment.dueDate)}</span>
          </p>
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Drive folder
            <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onEdit(assignment)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(assignment)}
            className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Submission status by student
        </h4>
        <ul className="mt-3 space-y-4">
          {students.map((s) => {
            const sub = getSubmission(assignment.id, s.id);
            const pct = sub.submitted ? 100 : 0;
            return (
              <li key={s.id} className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{s.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      sub.submitted
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {sub.submitted ? 'Submitted' : 'Not submitted'}
                  </span>
                </div>
                <div className="mt-2">
                  <ProgressBar
                    value={pct}
                    max={100}
                    fillClass={sub.submitted ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}
                    trackClass="bg-white dark:bg-slate-900"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
