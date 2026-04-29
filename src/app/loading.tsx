export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-[var(--cyber-green)] border-t-transparent rounded-full animate-spin" />
        <p className="font-mono text-xs text-[var(--text-muted)] tracking-widest uppercase animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
