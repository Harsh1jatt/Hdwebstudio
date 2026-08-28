"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en-IN">
      <body className="flex min-h-screen items-center justify-center bg-slate-50 font-sans text-slate-900">
        <div className="mx-auto max-w-md p-6 text-center">
          <h2 className="text-2xl font-bold text-slate-950">A critical error occurred</h2>
          <p className="mt-2 text-sm text-slate-600">
            Please reload the application or try again later.
          </p>
          <button
            onClick={() => reset()}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Reload application
          </button>
        </div>
      </body>
    </html>
  );
}
