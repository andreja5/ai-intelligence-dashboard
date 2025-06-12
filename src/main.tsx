import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReportProvider } from "./context/report/ReportContext.tsx";
import { ThemeModeProvider } from "./context/theme/ThemeContext.tsx";
import { ModalProvider } from "./context/modal/ModalContext.tsx";
import ReportModal from "./components/report-modal/ReportModal.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <ModalProvider>
        <ReportProvider>
          <App />
          <ReportModal />
        </ReportProvider>
      </ModalProvider>
    </ThemeModeProvider>
  </StrictMode>
);
