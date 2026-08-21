import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-accent text-ink-950 shadow-glow">
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden>
          <circle cx="4" cy="9" r="2" fill="currentColor" />
          <circle cx="14" cy="4" r="2" fill="currentColor" opacity="0.7" />
          <circle cx="14" cy="14" r="2" fill="currentColor" />
          <path d="M6 9h6M12.2 5.5L6.8 8.2M12.2 12.5L6.8 9.8" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </span>
      {!compact && (
        <span className="font-display text-xl font-semibold tracking-tight">Cognexa</span>
      )}
    </Link>
  );
}
