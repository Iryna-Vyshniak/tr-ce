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

      <div className="mx-auto w-full max-w-[100rem] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
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
