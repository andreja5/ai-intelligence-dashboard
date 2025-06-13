import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReportProvider } from "./context/report/ReportContext.tsx";
import { ThemeModeProvider } from "./context/theme/ThemeContext.tsx";
import { ModalProvider } from "./context/modal/ModalContext.tsx";
import ReportModal from "./components/report-modal/ReportModal.tsx";
import { ToastProvider } from "./context/notifications/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeModeProvider>
      <ModalProvider>
        <ToastProvider>
          <ReportProvider>
            <App />
            <ReportModal />
          </ReportProvider>
        </ToastProvider>
      </ModalProvider>
    </ThemeModeProvider>
  </StrictMode>
);
