export default function ProgressBar({
  value,
  max = 100,
  className = '',
  trackClass = 'bg-slate-200 dark:bg-slate-700',
  fillClass = 'bg-emerald-500',
  label,
}) {
  const pct = max <= 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={className}>
      {label ? (
        <div className="mb-1 flex justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      ) : null}
      <div
        className={`h-2 w-full overflow-hidden rounded-full ${trackClass}`}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${fillClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
