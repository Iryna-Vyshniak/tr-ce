import { createBrowserRouter } from "react-router-dom";

import { AppShell } from "../components/layout/AppShell";
import { CaseOverview } from "../features/investigation/components/CaseOverview";
import { CasePage } from "../pages/CasePage";
import { DetectiveHQPage } from "../pages/DetectiveHQPage";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: <DetectiveHQPage />,
      },
      {
        path: "/cases/:caseId",
        element: <CasePage />,
        children: [
          {
            index: true,
            element: <CaseOverview />,
          },
        ],
      },
    ],
  },
]);