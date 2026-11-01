import type { ReactNode } from "react";
import { AppHeader } from "./AppHeader";



interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AppHeader />

      <main id="main-content" className="min-h-[calc(100dvh-4rem)]">
        {children}
      </main>
    </div>
  );
}