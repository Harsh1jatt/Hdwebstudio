export default function AdminButton({
  children,
  loading = false,
  loadingText = "Saving...",
  fullWidth = false,
  disabled = false,
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-4 py-2.5
        text-sm font-medium
        transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-blue-500/30
        disabled:cursor-not-allowed disabled:opacity-60
        ${variants[variant] || variants.primary}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}