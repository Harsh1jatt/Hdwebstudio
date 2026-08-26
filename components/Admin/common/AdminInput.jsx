export default function AdminInput({
  label,
  id,
  icon,
  trailing,
  error,
  helperText,
  className = "",
  loading: _loading,
  multiline = false,
  rows = 4,
  ...props
}) {
  const hasError = Boolean(error);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="mb-1.5 block text-[13px] font-medium text-slate-600"
        >
          {label}
        </label>
      )}

      <div
        className={[
          "flex w-full items-center rounded-lg border bg-white px-3 transition-colors",
          hasError
            ? "border-red-300 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/15"
            : "border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/15",
        ].join(" ")}
      >
        {icon && (
          <span className="mr-2.5 flex h-4 w-4 shrink-0 items-center justify-center text-slate-400">
            {icon}
          </span>
        )}

        {multiline ? (
          <textarea
            {...props}
            id={id}
            rows={rows}
            aria-invalid={hasError || undefined}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className="w-full resize-y bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          />
        ) : (
          <input
            {...props}
            id={id}
            aria-invalid={hasError || undefined}
            aria-describedby={
              error ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className="w-full bg-transparent py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          />
        )}

        {trailing && (
          <div className="ml-2 flex shrink-0 items-center">{trailing}</div>
        )}
      </div>

      {helperText && !error && (
        <p id={`${id}-helper`} className="mt-1 text-xs text-slate-400">
          {helperText}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}