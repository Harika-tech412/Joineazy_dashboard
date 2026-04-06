import { useApp } from '../../context/AppContext';

export default function LoginScreen() {
  const { users, login } = useApp();
  const admins = users.filter((u) => u.role === 'admin');
  const students = users.filter((u) => u.role === 'student');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Joineazy</h1>
        <p className="mt-2 max-w-md text-sm text-slate-300">
          Assignment &amp; review dashboard. Choose a role to explore student
          or professor views.
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-8 sm:grid-cols-2">
        <section className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <h2 className="mb-1 text-lg font-semibold text-white">Professors</h2>
          <p className="mb-4 text-xs text-slate-400">Create assignments, Drive links, and track submissions.</p>
          <ul className="space-y-2">
            {admins.map((u) => (
              <li key={u.id}>
                <button
                  type="button"
                  onClick={() => login(u.id)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-3 text-left text-sm text-white transition hover:border-indigo-400 hover:bg-slate-800"
                >
                  <span className="font-medium">{u.name}</span>
                  <span className="mt-0.5 block text-xs text-slate-400">{u.email}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <h2 className="mb-1 text-lg font-semibold text-white">Students</h2>
          <p className="mb-4 text-xs text-slate-400">View your assignments and confirm submission in two steps.</p>
          <ul className="space-y-2">
            {students.map((u) => (
              <li key={u.id}>
                <button
                  type="button"
                  onClick={() => login(u.id)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-3 text-left text-sm text-white transition hover:border-emerald-400 hover:bg-slate-800"
                >
                  <span className="font-medium">{u.name}</span>
                  <span className="mt-0.5 block text-xs text-slate-400">{u.email}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
