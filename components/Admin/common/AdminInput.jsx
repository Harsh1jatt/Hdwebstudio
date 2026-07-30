export default function AdminInput({
  label,
  id,
  icon,
  trailing,
  error,
  helperText,
  className = "",
  loading: _loading,
  ...inputProps
}) {
  const hasError = Boolean(error);

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={id}
        className="mb-2 block text-[13px] font-semibold text-slate-700"
      >
        {label}
      </label>

      <div
        className={[
          "group flex min-h-[54px] w-full items-center",
          "rounded-xl border bg-white px-3.5",
          "shadow-[0_2px_8px_rgba(15,23,42,0.03)]",
          "transition-all duration-200",
          hasError
            ? [
                "border-red-300",
                "hover:border-red-400",
                "focus-within:border-red-500",
                "focus-within:ring-4",
                "focus-within:ring-red-500/10",
              ].join(" ")
            : [
                "border-slate-200",
                "hover:border-slate-300",
                "focus-within:border-blue-500",
                "focus-within:ring-4",
                "focus-within:ring-blue-500/10",
              ].join(" "),
        ].join(" ")}
      >
        {icon && (
          <span
            className={[
              "mr-3 flex h-8 w-8 shrink-0 items-center justify-center",
              "rounded-lg transition-colors duration-200",
              hasError
                ? "bg-red-50 text-red-500"
                : "bg-slate-50 text-slate-400 group-focus-within:bg-blue-50 group-focus-within:text-blue-600",
            ].join(" ")}
          >
            {icon}
          </span>
        )}

        <input
          {...inputProps}
          id={id}
          aria-invalid={hasError || undefined}
          aria-describedby={
            error
              ? `${id}-error`
              : helperText
                ? `${id}-helper`
                : undefined
          }
          className="
            min-w-0
            flex-1
            bg-transparent
            py-1
            text-[14px]
            font-medium
            text-slate-900
            outline-none
            placeholder:font-normal
            placeholder:text-slate-400
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        />

        {trailing && (
          <div className="ml-2 flex shrink-0 items-center">
            {trailing}
          </div>
        )}
      </div>

      {helperText && !error && (
        <p
          id={`${id}-helper`}
          className="mt-2 text-xs text-slate-400"
        >
          {helperText}
        </p>
      )}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}