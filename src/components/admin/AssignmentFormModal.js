import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';

const emptyForm = {
  title: '',
  description: '',
  dueDate: '',
  driveLink: '',
  studentIds: [],
};

export default function AssignmentFormModal({ mode, assignment, onClose, onSaved }) {
  const { currentUser, users } = useApp();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  const roster = useMemo(
    () => users.filter((u) => u.role === 'student' && u.advisorAdminId === currentUser?.id),
    [users, currentUser?.id]
  );

  useEffect(() => {
    if (mode === 'edit' && assignment) {
      setForm({
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        driveLink: assignment.driveLink,
        studentIds: [...assignment.studentIds],
      });
    } else {
      setForm({
        ...emptyForm,
        dueDate: new Date().toISOString().slice(0, 10),
        studentIds: roster.map((s) => s.id),
      });
    }
  }, [mode, assignment, roster]);

  const toggleStudent = (id) => {
    setForm((f) => ({
      ...f,
      studentIds: f.studentIds.includes(id)
        ? f.studentIds.filter((x) => x !== id)
        : [...f.studentIds, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError('Title is required.');
      return;
    }
    if (!form.driveLink.trim()) {
      setError('Drive link is required.');
      return;
    }
    if (form.studentIds.length === 0) {
      setError('Select at least one student.');
      return;
    }
    onSaved(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="assignment-form-title"
    >
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-900 dark:ring-1 dark:ring-slate-700"
      >
        <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
          <h2 id="assignment-form-title" className="text-lg font-semibold text-slate-900 dark:text-white">
            {mode === 'edit' ? 'Edit assignment' : 'New assignment'}
          </h2>
        </div>

        <div className="space-y-4 px-5 py-4">
          {error ? (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-950/50 dark:text-red-200">
              {error}
            </p>
          ) : null}

          <div>
            <label htmlFor="af-title" className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Title
            </label>
            <input
              id="af-title"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            />
          </div>

          <div>
            <label htmlFor="af-desc" className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Description
            </label>
            <textarea
              id="af-desc"
              rows={3}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div>
            <label htmlFor="af-due" className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Due date
            </label>
            <input
              id="af-due"
              type="date"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              value={form.dueDate}
              onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            />
          </div>

          <div>
            <label htmlFor="af-drive" className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Google Drive link
            </label>
            <input
              id="af-drive"
              type="url"
              placeholder="https://drive.google.com/..."
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              value={form.driveLink}
              onChange={(e) => setForm((f) => ({ ...f, driveLink: e.target.value }))}
            />
          </div>

          <fieldset>
            <legend className="text-xs font-medium text-slate-600 dark:text-slate-400">Assigned students</legend>
            <ul className="mt-2 max-h-40 space-y-2 overflow-y-auto rounded-lg border border-slate-100 p-2 dark:border-slate-800">
              {roster.length === 0 ? (
                <li className="text-sm text-slate-500">No students linked to your account in the demo data.</li>
              ) : (
                roster.map((s) => (
                  <li key={s.id}>
                    <label className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <input
                        type="checkbox"
                        checked={form.studentIds.includes(s.id)}
                        onChange={() => toggleStudent(s.id)}
                        className="rounded border-slate-300 text-indigo-600"
                      />
                      <span className="text-sm text-slate-800 dark:text-slate-200">{s.name}</span>
                    </label>
                  </li>
                ))
              )}
            </ul>
          </fieldset>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            {mode === 'edit' ? 'Save changes' : 'Create assignment'}
          </button>
        </div>
      </form>
    </div>
  );
}
