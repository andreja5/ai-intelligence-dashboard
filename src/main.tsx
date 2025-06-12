import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReportProvider } from "./context/report/ReportContext.tsx";
import { ThemeModeProvider } from "./context/theme/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <ReportProvider>
        <App />
      </ReportProvider>
    </ThemeModeProvider>
  </StrictMode>
);
