"use client";
import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in dev
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--color-background)]">
      <div className="flex flex-col items-center text-center max-w-md">
        <AlertCircle size={48} className="text-red-400 mb-6" aria-hidden="true" />
        <h1 className="text-2xl font-heading font-semibold text-[var(--color-text)] mb-3">
          Something went wrong
        </h1>
        <p className="text-[var(--color-muted)] mb-8">
          We couldn't load this page. Please try again or return home.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full hover:border-[var(--color-accent)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
