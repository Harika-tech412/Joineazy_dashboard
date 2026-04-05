import { useState } from 'react';
import ProgressBar from '../ui/ProgressBar';
import SubmissionConfirmFlow from './SubmissionConfirmFlow';

function formatDue(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function StudentAssignmentCard({ assignment, submitted, onConfirmed }) {
  const [flowOpen, setFlowOpen] = useState(false);
  const done = submitted;

  return (
    <>
      <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{assignment.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{assignment.description}</p>
            <p className="mt-2 text-xs text-slate-500">
              Due <span className="font-medium text-slate-700 dark:text-slate-300">{formatDue(assignment.dueDate)}</span>
            </p>
          </div>
          <span
            className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              done
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
            }`}
          >
            {done ? 'Submitted' : 'Not submitted'}
          </span>
        </div>

        <div className="mt-4">
          <ProgressBar
            value={done ? 100 : 0}
            max={100}
            label="Your progress for this task"
            fillClass={done ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}
          />
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <a
            href={assignment.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Open Drive folder
            <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          {!done ? (
            <button
              type="button"
              onClick={() => setFlowOpen(true)}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              I finished — confirm submission
            </button>
          ) : null}
        </div>
      </article>

      {flowOpen ? (
        <SubmissionConfirmFlow
          assignmentTitle={assignment.title}
          onCancel={() => setFlowOpen(false)}
          onConfirm={() => {
            onConfirmed();
            setFlowOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
