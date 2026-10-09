export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-background)] z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[var(--color-border)] border-t-[var(--color-accent)] rounded-full animate-spin" aria-label="Loading..." role="status" />
      </div>
    </div>
  );
}
