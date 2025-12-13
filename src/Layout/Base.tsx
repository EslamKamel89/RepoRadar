export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-xl font-semibold text-primary">RepoRadar</h1>
          <p className="text-sm text-muted">GitHub repository explorer</p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <p className="text-sm text-muted">
            Built with React, TypeScript, and TanStack Query
          </p>
        </div>
      </footer>
    </div>
  );
}
