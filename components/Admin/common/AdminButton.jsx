export default function AdminButton({
  children,
  loading = false,
  loadingText = "Loading...",
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-blue-600
        px-5
        py-3
        text-sm
        font-semibold
        text-white
        shadow-sm
        transition
        hover:bg-blue-700
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500/30
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}