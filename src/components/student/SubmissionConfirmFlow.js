import { useState } from 'react';

/**
 * Double verification: step 1 — acknowledge upload; step 2 — final confirm.
 */
export default function SubmissionConfirmFlow({ assignmentTitle, onCancel, onConfirm }) {
  const [step, setStep] = useState(1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submission-flow-title"
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900 dark:ring-1 dark:ring-slate-700">
        <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <h2 id="submission-flow-title" className="text-lg font-semibold text-slate-900 dark:text-white">
            Confirm submission
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{assignmentTitle}</p>
          <div className="mt-3 flex gap-1">
            <span
              className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`}
            />
            <span
              className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`}
            />
          </div>
        </div>

        <div className="px-5 py-5">
          {step === 1 ? (
            <>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                Have you already uploaded your work to the Google Drive folder linked for this assignment?
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                You will be asked to confirm one more time on the next screen.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Final confirmation</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                Please confirm that you have <strong className="font-semibold">submitted</strong> your work
                to the external Drive location. This updates your progress for your instructor.
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end dark:border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          {step === 1 ? (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Yes, I have submitted
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Go back
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                Confirm submission
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
