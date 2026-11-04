import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/inter";

import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";

import "@fontsource/roboto-condensed/cyrillic-700.css";
import "@fontsource/roboto-condensed/cyrillic-800.css";
import "@fontsource/roboto-condensed/cyrillic-900.css";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";


import App from "./app/App";
import { case001 } from "./data/cases";
import { CaseProgressProvider } from "./features/cases/engine/CaseProgressProvider";
import { LocaleProvider } from "./features/localization/components/LocaleProvider";

import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/typography.css";
import "./styles/spacing.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <CaseProgressProvider caseFile={case001}>
        <App />
      </CaseProgressProvider>
    </LocaleProvider>
  </StrictMode>,
);
