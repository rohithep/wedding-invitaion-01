import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[var(--color-ivory)] px-6 text-center">
      <p className="type-label mb-3 text-[var(--color-olive-muted)]">404</p>
      <h1 className="type-h1 mb-4 text-[var(--color-olive)]">Page Not Found</h1>
      <Link
        href="/"
        className="type-label rounded-full border border-[var(--color-gold)]/70 px-6 py-3 text-[var(--color-olive)] transition-colors hover:border-[var(--color-gold)]"
      >
        Return to Invitation
      </Link>
    </main>
  );
}
