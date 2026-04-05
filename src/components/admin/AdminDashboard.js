import { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import ProgressBar from '../ui/ProgressBar';
import AdminAssignmentCard from './AdminAssignmentCard';
import AssignmentFormModal from './AssignmentFormModal';

export default function AdminDashboard() {
  const {
    currentUser,
    users,
    adminAssignments,
    getSubmission,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  } = useApp();

  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const rosterById = useMemo(() => {
    const m = new Map();
    users.forEach((u) => m.set(u.id, u));
    return m;
  }, [users]);

  const overview = useMemo(() => {
    let totalSlots = 0;
    let submittedSlots = 0;
    adminAssignments.forEach((a) => {
      a.studentIds.forEach((sid) => {
        totalSlots += 1;
        if (getSubmission(a.id, sid).submitted) submittedSlots += 1;
      });
    });
    const pct = totalSlots === 0 ? 0 : Math.round((submittedSlots / totalSlots) * 100);
    return { totalSlots, submittedSlots, pct };
  }, [adminAssignments, getSubmission]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  const openCreate = () => {
    setFormMode('create');
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (assignment) => {
    setFormMode('edit');
    setEditing(assignment);
    setFormOpen(true);
  };

  const handleSaved = (form) => {
    if (formMode === 'edit' && editing) {
      updateAssignment(editing.id, form);
    } else {
      createAssignment(form);
    }
  };

  const sorted = [...adminAssignments].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Your assignments</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage tasks and Drive links. You only see assignments you created and students on your roster.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          New assignment
        </button>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/80">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Class submission overview</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Aggregated across all student–assignment pairs for your courses.
        </p>
        <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
          {overview.submittedSlots} / {overview.totalSlots} submissions
        </p>
        <div className="mt-3">
          <ProgressBar value={overview.submittedSlots} max={overview.totalSlots} label="Overall" />
        </div>
      </section>

      <ul className="space-y-6">
        {sorted.length === 0 ? (
          <li className="rounded-2xl border border-dashed border-slate-300 bg-white/50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/40">
            <p className="text-sm text-slate-600 dark:text-slate-400">No assignments yet. Create one to get started.</p>
            <button
              type="button"
              onClick={openCreate}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Create assignment
            </button>
          </li>
        ) : (
          sorted.map((a) => {
            const students = a.studentIds.map((id) => rosterById.get(id)).filter(Boolean);
            return (
              <li key={a.id}>
                <AdminAssignmentCard
                  assignment={a}
                  students={students}
                  getSubmission={getSubmission}
                  onEdit={openEdit}
                  onDelete={setDeleteTarget}
                />
              </li>
            );
          })
        )}
      </ul>

      {formOpen ? (
        <AssignmentFormModal
          mode={formMode}
          assignment={editing}
          onClose={() => setFormOpen(false)}
          onSaved={handleSaved}
        />
      ) : null}

      {deleteTarget ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="del-title"
        >
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 dark:ring-1 dark:ring-slate-700">
            <h2 id="del-title" className="text-lg font-semibold text-slate-900 dark:text-white">
              Delete assignment?
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              &ldquo;{deleteTarget.title}&rdquo; will be removed and related submission flags cleared from this device.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteAssignment(deleteTarget.id);
                  setDeleteTarget(null);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
