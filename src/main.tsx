
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Body typography
import "@fontsource-variable/inter";

// Latin display typography
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";

// Cyrillic display typography
import "@fontsource/roboto-condensed/cyrillic-700.css";
import "@fontsource/roboto-condensed/cyrillic-800.css";
import "@fontsource/roboto-condensed/cyrillic-900.css";

// Monospace typography
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";

// Application
import App from "./app/App";

// Case data
import { case001 } from "./data/cases";

// Providers
import { CaseProgressProvider } from "./features/cases/engine/CaseProgressProvider";
import { LocaleProvider } from "./features/localization/components/LocaleProvider";

// Core styles
import "./styles/variables.css";
import "./styles/globals.css";

// Responsive systems
import "./styles/typography.css";
import "./styles/spacing.css";

// Cinematic design
import "./styles/atmosphere.css";
import "./styles/components.css";
import "./styles/investigation.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <CaseProgressProvider caseFile={case001}>
        <App />
      </CaseProgressProvider>
    </LocaleProvider>
  </StrictMode>,
);
