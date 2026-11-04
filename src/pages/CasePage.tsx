import { Suspense } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

import { activeCase } from "../features/cases/data/activeCase";
import { CaseWorkspaceHeader } from "../features/investigation/components/CaseWorkspaceHeader";

export function CasePage() {
  const { caseId } = useParams();

  if (caseId !== activeCase.id) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <CaseWorkspaceHeader caseData={activeCase} />

      <div className="layout-container section-spacing-compact">
        <Suspense
          fallback={
            <div
              className="flex min-h-48 items-center font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
              role="status"
            >
              Завантаження матеріалів // Loading case files
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
