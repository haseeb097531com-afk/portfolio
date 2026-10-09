import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-[var(--color-background)]">
      <div className="flex flex-col items-center text-center max-w-md">
        <FileQuestion size={48} className="text-[var(--color-accent)] opacity-50 mb-6" aria-hidden="true" />
        <h1 className="text-4xl font-heading font-bold text-[var(--color-text)] mb-3">
          404
        </h1>
        <h2 className="text-xl font-heading font-medium text-[var(--color-text)] mb-4">
          Page not found
        </h2>
        <p className="text-[var(--color-muted)] mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[var(--color-accent)] text-black font-semibold rounded-full hover:shadow-[0_0_15px_rgba(10,252,219,0.3)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
