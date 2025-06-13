import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ReportProvider } from "./context/report/ReportContext.tsx";
import { ThemeModeProvider } from "./context/theme/ThemeContext.tsx";
import { ModalProvider } from "./context/modal/ModalContext.tsx";
import { ToastProvider } from "./context/notifications/ToastContext.tsx";
import { UserProvider } from "./context/user/UserContext.tsx";
import { ActivityProvider } from "./context/activity/ActivityContext.tsx";
import { ModalRenderer } from "./features/modal/ModalRenderer.tsx";

/**
 * Main entry point for the React application.
 * Initializes the app with various context providers for user, activity, theme mode,
 * modal, and report management.
 * Renders the main App component and the ReportModal component.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ActivityProvider>
        <ThemeModeProvider>
          <ModalProvider>
            <ToastProvider>
              <ReportProvider>
                <App />
                <ModalRenderer />
              </ReportProvider>
            </ToastProvider>
          </ModalProvider>
        </ThemeModeProvider>
      </ActivityProvider>
    </UserProvider>
  </StrictMode>
);
