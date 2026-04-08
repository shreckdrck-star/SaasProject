"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-white">Something went wrong</h2>
          <p className="mb-6 text-gray-400">{error.message || "An unexpected error occurred."}</p>
          <button
            onClick={reset}
            className="rounded-lg bg-purple-600 px-6 py-2 font-medium text-white hover:bg-purple-700 transition"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
