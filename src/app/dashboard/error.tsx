"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg bg-gray-900 p-8 text-center">
      <h2 className="mb-2 text-xl font-bold text-white">Something went wrong</h2>
      <p className="mb-6 text-gray-400">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={reset}
        className="rounded-lg bg-purple-600 px-6 py-2 font-medium text-white hover:bg-purple-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
