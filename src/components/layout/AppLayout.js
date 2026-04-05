import { useState } from 'react';
import Header from './Header';

export default function AppLayout({ children, sidebar }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header onMenuClick={() => setMobileNavOpen((o) => !o)} />
      <div className="mx-auto flex max-w-6xl gap-0 px-0 sm:gap-8 sm:px-6 lg:px-8">
        {sidebar ? (
          <>
            <aside
              className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-slate-200 bg-white pt-[4.25rem] transition-transform dark:border-slate-800 dark:bg-slate-950 md:relative md:z-0 md:block md:translate-x-0 md:border-0 md:bg-transparent md:pt-6 md:shadow-none ${
                mobileNavOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full md:translate-x-0'
              }`}
            >
              <div className="h-full overflow-y-auto px-4 pb-8 md:px-0 md:pb-0">{sidebar}</div>
            </aside>
            {mobileNavOpen ? (
              <button
                type="button"
                className="fixed inset-0 z-20 bg-slate-900/40 md:hidden"
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
              />
            ) : null}
          </>
        ) : null}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-0 md:py-8">{children}</main>
      </div>
    </div>
  );
}
