export const metadata = {
  title: {
    default: "Admin Portal | HD Web Studios",
    template: "%s | HD Web Studios",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminAuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="relative isolate min-h-screen overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-blue-100/60 blur-3xl" />

          <div className="absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan-100/50 blur-3xl" />

          <div className="absolute bottom-[-12rem] left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-indigo-100/40 blur-3xl" />
        </div>

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}