function App() {
  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <p className="font-mono text-sm tracking-widest text-signal">
        CASE // 001
      </p>

      <h1 className="mt-3 font-display text-7xl font-extrabold uppercase leading-none tracking-tight">
        The Glass Room
      </h1>

      <p className="mt-6 max-w-xl font-sans text-base leading-7 text-foreground-secondary">
        A locked room. Seven pieces of evidence. Four statements.
        One contradiction that changes the entire investigation.
      </p>

      <div className="mt-8 flex items-center gap-3 font-mono text-sm">
        <span className="text-evidence">EVIDENCE // 07</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-critical">CONTRADICTION // 01</span>
      </div>
    </main>
  );
}

export default App;