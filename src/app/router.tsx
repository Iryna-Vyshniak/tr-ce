import { createBrowserRouter } from "react-router-dom";

import { AppShell } from "../components/layout/AppShell";
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
            lazy: async () => {
              const { CaseOverview } =
                await import("../features/investigation/components/CaseOverview");

              return { Component: CaseOverview };
            },
          },
          {
            path: "evidence",
            lazy: async () => {
              const { CaseEvidence } =
                await import("../features/investigation/components/CaseEvidence");

              return { Component: CaseEvidence };
            },
          },
          {
            path: "people",
            lazy: async () => {
              const { CasePeople } =
                await import("../features/investigation/components/CasePeople");

              return { Component: CasePeople };
            },
          },
          {
            path: "timeline",
            lazy: async () => {
              const { CaseTimeline } =
                await import("../features/investigation/components/CaseTimeline");

              return { Component: CaseTimeline };
            },
          },
          {
            path: "board",
            lazy: async () => {
              const { CaseBoard } =
                await import("../features/investigation/components/CaseBoard");

              return { Component: CaseBoard };
            },
          },
        ],
      },
    ],
  },
]);
