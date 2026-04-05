import { useApp } from '../../context/AppContext';

export default function Header({ onMenuClick }) {
  const { currentUser, logout } = useApp();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 md:hidden dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
            aria-label="Open menu"
            onClick={onMenuClick}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">Joineazy</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">Assignments &amp; review</p>
          </div>
        </div>
        {currentUser ? (
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{currentUser.name}</p>
              <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{currentUser.role}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
