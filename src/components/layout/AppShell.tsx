import { Outlet } from "react-router-dom";

import { AppHeader } from "./AppHeader";

export function AppShell() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AppHeader />

      <main
        id="main-content"
        className="min-h-[calc(100dvh-4rem)]"
      >
        <Outlet />
      </main>
    </div>
  );
}