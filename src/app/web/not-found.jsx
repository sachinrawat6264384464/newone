import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="mb-4 text-6xl font-display font-bold text-gradient-gold">404</h1>
        <p className="mb-6 text-xl text-muted-foreground font-body">Oops! Page not found</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 border border-primary/50 text-primary hover:bg-primary/10 rounded-lg font-display transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
