import { useApp } from '../../context/AppContext';
import ProgressBar from '../ui/ProgressBar';
import StudentAssignmentCard from './StudentAssignmentCard';

export default function StudentDashboard() {
  const {
    currentUser,
    studentAssignments,
    getSubmission,
    studentProgress,
    confirmStudentSubmission,
  } = useApp();

  if (!currentUser || currentUser.role !== 'student') return null;

  const sorted = [...studentAssignments].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Your assignments</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Only assignments assigned to you are listed. Confirm submission after uploading to Drive.
        </p>
      </div>

      <section className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 dark:border-indigo-900/50 dark:from-indigo-950/40 dark:to-slate-900/80">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-800 dark:text-indigo-300">
          Overall completion
        </h2>
        <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
          {studentProgress.completed} of {studentProgress.total} submitted
        </p>
        <div className="mt-4">
          <ProgressBar
            value={studentProgress.completed}
            max={studentProgress.total}
            label="Assignments completed"
            fillClass="bg-indigo-600"
            trackClass="bg-indigo-100 dark:bg-indigo-950/80"
          />
        </div>
      </section>

      <ul className="space-y-4">
        {sorted.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
            No assignments yet. Check back later.
          </li>
        ) : (
          sorted.map((a) => {
            const sub = getSubmission(a.id, currentUser.id);
            return (
              <li key={a.id}>
                <StudentAssignmentCard
                  assignment={a}
                  submitted={sub.submitted}
                  onConfirmed={() => confirmStudentSubmission(a.id, currentUser.id)}
                />
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}
